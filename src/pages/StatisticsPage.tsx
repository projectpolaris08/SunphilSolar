import React, { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { Helmet } from "react-helmet";
import {
  Home as HomeIcon,
  Gauge,
  Sun,
  BatteryCharging,
  Leaf,
  BarChart2,
  Info,
} from "lucide-react";
import BeamsBackground from "@/components/BeamsBackground";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Utility functions (reuse from ProjectsPage)
function extractKW(str: string): number {
  const match = str.match(/([0-9]+(?:\.[0-9]+)?)\s*kW/i);
  return match ? parseFloat(match[1]) : 0;
}
function extractPanelKW(str: string): number {
  const match = str.match(/([0-9]+)\s*[×x]\s*([0-9]+)W/i);
  if (match) {
    const count = parseInt(match[1], 10);
    const watt = parseInt(match[2], 10);
    return (count * watt) / 1000;
  }
  return extractKW(str);
}
function extractBatteryKW(str: string): number {
  const match = str.match(
    /([0-9]+)\s*[×x]\s*([0-9]+\.?[0-9]*)V\s*([0-9]+\.?[0-9]*)Ah/i
  );
  if (match) {
    const count = parseInt(match[1], 10);
    const voltage = parseFloat(match[2]);
    const ah = parseFloat(match[3]);
    return (count * voltage * ah) / 1000;
  }
  const match2 = str.match(/([0-9]+\.?[0-9]*)V\s*([0-9]+\.?[0-9]*)Ah/i);
  if (match2) {
    const voltage = parseFloat(match2[1]);
    const ah = parseFloat(match2[2]);
    return (voltage * ah) / 1000;
  }
  return 0;
}
function extractCO2(benefits: string[] = []): number {
  for (const benefit of benefits) {
    const match = benefit.match(
      /([0-9,.]+)(?:–|-)?([0-9,.]+)?\s*kg\s*(?:of)?\s*CO₂/i
    );
    if (match) {
      const low = parseFloat(match[1].replace(/,/g, ""));
      const high = match[2] ? parseFloat(match[2].replace(/,/g, "")) : low;
      return (low + high) / 2;
    }
    const matchTons = benefit.match(/([0-9,.]+)\s*tons?\s*CO₂/i);
    if (matchTons) {
      return parseFloat(matchTons[1].replace(/,/g, "")) * 1000;
    }
  }
  return 0;
}

const totalInverterKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /inverter/i.test(s))
      .reduce((s, spec) => s + extractKW(spec), 0),
  0
);
const totalPanelKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /panel/i.test(s))
      .reduce((s, spec) => s + extractPanelKW(spec), 0),
  0
);
const totalBatteryKW = projects.reduce(
  (sum, proj) =>
    sum +
    proj.specification
      .filter((s) => /batter/i.test(s))
      .reduce((s, spec) => s + extractBatteryKW(spec), 0),
  0
);
const totalCO2Kg = projects.reduce(
  (sum, proj) => sum + extractCO2(proj.benefits),
  0
);
const totalCO2Tons = totalCO2Kg / 1000;
const totalHomes = projects.length;

// Get all years present in the data
const years = Array.from(
  new Set(projects.map((p) => new Date(p.date).getFullYear()))
).sort();
// Generate all 12 months for each year
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const allMonthYear = years.flatMap((year) =>
  Array.from({ length: 12 }, (_, i) => ({
    monthYear: `${String(i + 1).padStart(2, "0")}-${year}`,
    monthLabel: monthNames[i],
    year,
  }))
);
// Count projects for each month-year
const projectCounts = projects.reduce((acc, proj) => {
  const date = new Date(proj.date);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const key = `${month}-${year}`;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const projectsByMonthYear = allMonthYear.map(({ monthYear, monthLabel }) => ({
  monthYear,
  monthLabel,
  count: projectCounts[monthYear] || 0,
}));

const projectsBySystemSize = Object.entries(
  projects.reduce((acc, proj) => {
    const size = proj.system.match(/(\d+(\.\d+)?kW)/)?.[0] || "Other";
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([size, count]) => ({ size, count }));

// Sort projectsBySystemSize numerically by kW value ascending
const projectsBySystemSizeSorted = [...projectsBySystemSize].sort((a, b) => {
  const aKW = parseFloat(a.size);
  const bKW = parseFloat(b.size);
  return aKW - bKW;
});

// --- Helper functions to extract kW/kWh from specification strings ---
function parseInverterKW(specs: string[]): number {
  // e.g., "2 x 16kW Deye Hybrid Inverter" or "12kW Deye Hybrid Inverter"
  const inverterSpec = specs.find((s) => /inverter/i.test(s));
  if (!inverterSpec) return 0;
  const match = inverterSpec.match(
    /(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)kW|((\d+(?:\.\d+)?)kW)/i
  );
  if (match) {
    if (match[1] && match[2]) return parseInt(match[1]) * parseFloat(match[2]);
    if (match[3]) return parseFloat(match[4]);
  }
  return 0;
}
function parsePanelKW(specs: string[]): number {
  // e.g., "24 × 615W Canadian Bifacial Solar Panels"
  const panelSpec = specs.find((s) => /panel/i.test(s));
  if (!panelSpec) return 0;
  const match = panelSpec.match(/(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)W/i);
  if (match) {
    return (parseInt(match[1]) * parseFloat(match[2])) / 1000;
  }
  return 0;
}
function parseBatteryKWh(specs: string[]): number {
  // Sum all matches of (count) × (voltage)V (ah)Ah in any battery spec line
  let total = 0;
  for (const spec of specs) {
    if (/batter/i.test(spec)) {
      // Match all occurrences like '3 × 51.2V 314Ah' or '2 x 48V 200Ah'
      const regex =
        /(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)\s*V[^\d]*(\d+(?:\.\d+)?)\s*Ah/gi;
      let match;
      while ((match = regex.exec(spec)) !== null) {
        const count = parseInt(match[1]);
        const voltage = parseFloat(match[2]);
        const ah = parseFloat(match[3]);
        total += (count * voltage * ah) / 1000;
      }
      // Also match single battery: '51.2V 314Ah'
      const singleRegex = /(\d+(?:\.\d+)?)\s*V[^\d]*(\d+(?:\.\d+)?)\s*Ah/gi;
      while ((match = singleRegex.exec(spec)) !== null) {
        // Only count if not already counted as part of a multiplier
        if (!/(x|×)/i.test(spec)) {
          const voltage = parseFloat(match[1]);
          const ah = parseFloat(match[2]);
          total += (voltage * ah) / 1000;
        }
      }
    }
  }
  return total;
}
// --- Aggregate totals per month-year ---
const totalsByMonthYear: Record<
  string,
  { inverterKW: number; panelKW: number; batteryKWh: number }
> = {};
projects.forEach((proj) => {
  const date = new Date(proj.date);
  const monthYear = `${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
  if (!totalsByMonthYear[monthYear]) {
    totalsByMonthYear[monthYear] = { inverterKW: 0, panelKW: 0, batteryKWh: 0 };
  }
  totalsByMonthYear[monthYear].inverterKW += parseInverterKW(
    proj.specification
  );
  totalsByMonthYear[monthYear].panelKW += parsePanelKW(proj.specification);
  totalsByMonthYear[monthYear].batteryKWh += parseBatteryKWh(
    proj.specification
  );
});
// Ensure all months for all years are present, and round panelKW and batteryKWh to 2 decimal places
const allTotalsByMonthYear = allMonthYear.map(({ monthYear, monthLabel }) => ({
  monthYear,
  monthLabel,
  inverterKW: totalsByMonthYear[monthYear]?.inverterKW || 0,
  panelKW: totalsByMonthYear[monthYear]?.panelKW
    ? Number(totalsByMonthYear[monthYear].panelKW.toFixed(2))
    : 0,
  batteryKWh: totalsByMonthYear[monthYear]?.batteryKWh
    ? Number(totalsByMonthYear[monthYear].batteryKWh.toFixed(2))
    : 0,
}));

// --- CO₂ Reduction by Month-Year ---
function parseCO2Reduction(benefits?: string[]): number {
  if (!benefits) return 0;
  for (const benefit of benefits) {
    // Match 'xxxx kg' or 'xxxx–yyyy kg'
    const match = benefit.match(/([\d,]+)(?:–[\d,]+)?\s*kg/i);
    if (match) {
      return parseInt(match[1].replace(/,/g, ""));
    }
    // Match 'x ton'
    const tonMatch = benefit.match(/([\d,.]+)\s*ton/i);
    if (tonMatch) {
      return Math.round(parseFloat(tonMatch[1]) * 1000);
    }
  }
  return 0;
}
const co2ByMonthYear: Record<string, number> = {};
projects.forEach((proj) => {
  const date = new Date(proj.date);
  const monthYear = `${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
  co2ByMonthYear[monthYear] =
    (co2ByMonthYear[monthYear] || 0) + parseCO2Reduction(proj.benefits);
});
const allCO2ByMonthYear = allMonthYear.map(({ monthYear, monthLabel }) => ({
  monthYear,
  monthLabel,
  co2: co2ByMonthYear[monthYear] || 0,
}));

// --- Clean Energy Generated per Month-Year ---
function getDaysInMonth(monthYear: string): number {
  const [month, year] = monthYear.split("-").map(Number);
  return new Date(year, month, 0).getDate();
}
const SUN_HOURS_PER_DAY = 4.5;
const energyByMonthYear: Record<string, number> = {};
projects.forEach((proj) => {
  const date = new Date(proj.date);
  const monthYear = `${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
  // Estimate: panel kW × sun hours/day × days in month
  const panelKW = parsePanelKW(proj.specification);
  const days = getDaysInMonth(monthYear);
  const kWh = panelKW * SUN_HOURS_PER_DAY * days;
  energyByMonthYear[monthYear] = (energyByMonthYear[monthYear] || 0) + kWh;
});
const allEnergyByMonthYear = allMonthYear.map(({ monthYear, monthLabel }) => ({
  monthYear,
  monthLabel,
  kWh: Math.round(energyByMonthYear[monthYear] || 0),
}));

// --- Trees Planted Equivalent per Month-Year ---
const treesByMonthYear = allCO2ByMonthYear.map(
  ({ monthYear, monthLabel, co2 }) => ({
    monthYear,
    monthLabel,
    trees: co2 ? Math.round(co2 / 21) : 0,
  })
);

// Responsive hook for mobile detection
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const StatisticsPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <BeamsBackground intensity="medium">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <Helmet>
          <title>Statistics | Sunphil Solar</title>
        </Helmet>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
          Sunphil Project Statistics
        </h1>
        {/* Summary Cards */}
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          <div className="w-full bg-blue-100/80 border border-blue-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="text-gray-700 text-sm font-medium">
                Total Homes
              </span>
              <HomeIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {totalHomes.toLocaleString()}
            </div>
          </div>
          <div className="w-full bg-yellow-100/80 border border-yellow-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="text-gray-700 text-sm font-medium">
                Total Inverter kW
              </span>
              <Gauge className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-extrabold text-yellow-600">
              {totalInverterKW.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              <span className="font-bold">kW</span>
            </div>
          </div>
          <div className="w-full bg-green-100/80 border border-green-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="text-gray-700 text-sm font-medium">
                Total Solar Panel kW
              </span>
              <Sun className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-extrabold text-green-600">
              {totalPanelKW.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              <span className="font-bold">kW</span>
            </div>
          </div>
          <div className="w-full bg-purple-100/80 border border-purple-100 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="text-gray-700 text-sm font-medium">
                Total Battery kWh
              </span>
              <BatteryCharging className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-purple-600">
              {totalBatteryKW.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              <span className="font-bold">kWh</span>
            </div>
          </div>
          <div className="w-full bg-green-100 border border-green-200 rounded-xl p-4 flex flex-col items-start shadow min-w-[120px] min-h-[80px] transition-all">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="text-gray-700 text-sm font-medium">
                Total CO₂ Reduction
              </span>
              <Leaf className="h-6 w-6 text-green-700" />
            </div>
            <div className="text-2xl font-extrabold text-green-700">
              {totalCO2Tons.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              <span className="font-bold">tons</span>
            </div>
          </div>
        </section>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projects by Month-Year */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart2 /> Projects by Month-Year
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={projectsByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="projectsMonthGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#1CB5E0" />
                    <stop offset="100%" stopColor="#000851" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(label: string) => {
                    const idx = monthNames.indexOf(label);
                    return idx !== -1 ? `${monthNames[idx]} 2025` : label;
                  }}
                />
                <Bar dataKey="count" fill="url(#projectsMonthGradient)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* System Size Distribution */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              System Size Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={projectsBySystemSizeSorted}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="systemSizeGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#FC466B" />
                    <stop offset="100%" stopColor="#3F5EFB" />
                  </linearGradient>
                </defs>
                <XAxis
                  type="number"
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <YAxis
                  type="category"
                  dataKey="size"
                  stroke="#fff"
                  width={80}
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="count" fill="url(#systemSizeGradient)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* Total Inverter kW per Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Total Inverter kW per Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={allTotalsByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="inverterKW" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* Total Solar Panel kW per Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Total Solar Panel kW per Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={allTotalsByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="panelKW" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* Total Battery kWh per Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Total Battery kWh per Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={allTotalsByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="purpleGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="batteryKWh" fill="url(#purpleGradient)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* Clean Energy Generated per Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Clean Energy Generated per Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={allEnergyByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="energyMonthGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#9ebd13" />
                    <stop offset="100%" stopColor="#008552" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="kWh" fill="url(#energyMonthGradient)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* Trees Planted Equivalent per Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Trees Planted Equivalent per Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={treesByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) => value}
                  formatter={(value, name) => {
                    if (name === "trees") {
                      return [Math.round(value as number), "trees"];
                    }
                    return [value, name];
                  }}
                />
                <Bar dataKey="trees" fill="#228B22" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
          {/* CO₂ Reduction by Month */}
          <div className="bg-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              CO₂ Reduction by Month
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={allCO2ByMonthYear}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="co2MonthGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#f8ff00" />
                    <stop offset="100%" stopColor="#3ad59f" />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="monthLabel"
                  stroke="#fff"
                  interval={0}
                  angle={isMobile ? -45 : 0}
                  textAnchor="middle"
                  height={60}
                />
                <YAxis
                  stroke="#fff"
                  allowDecimals={false}
                  tickFormatter={(v) =>
                    v.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  }
                />
                <Tooltip
                  labelFormatter={(value) =>
                    value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Bar dataKey="co2" fill="url(#co2MonthGradient)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-full text-center text-white text-base font-semibold mt-2">
              2025
            </div>
          </div>
        </div>
        {/* Project Analysis Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/90 rounded-2xl shadow-2xl p-8 mt-8 flex overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-400 via-green-400 to-yellow-400 rounded-l-2xl" />
            <div className="relative z-10 w-full">
              <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
                <span className="inline-block bg-blue-500/80 rounded-full p-2 align-middle">
                  <Info className="h-6 w-6 text-white" />
                </span>
                Project Analysis
              </h2>
              <div className="text-white text-lg leading-relaxed space-y-0 divide-y divide-white/10">
                <div className="flex items-start gap-3 py-4">
                  <span className="text-blue-400 text-2xl mt-1">📈</span>
                  <div>
                    <span className="font-bold text-blue-200 text-lg">
                      Project Growth:
                    </span>{" "}
                    The data shows a significant increase in the number of solar
                    projects from{" "}
                    <span className="text-blue-300 font-semibold">
                      March to June 2025
                    </span>
                    , with the highest number of installations occurring in{" "}
                    <span className="text-blue-300 font-semibold">June</span>.
                    This trend suggests growing awareness and adoption of solar
                    energy solutions, possibly driven by rising electricity
                    costs and increased marketing efforts.
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <span className="text-green-400 text-2xl mt-1">🔢</span>
                  <div>
                    <span className="font-bold text-green-200 text-lg">
                      System Size Trends:
                    </span>{" "}
                    The most common system sizes are{" "}
                    <span className="text-green-300 font-semibold">
                      6kW, 8kW, and 12kW
                    </span>
                    , indicating that residential and small commercial clients
                    are the primary market. The distribution also shows a few
                    larger installations, reflecting Sunphil Solar's capability
                    to handle both small and large-scale projects.
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <span className="text-lime-400 text-2xl mt-1">🌱</span>
                  <div>
                    <span className="font-bold text-lime-200 text-lg">
                      Environmental Impact:
                    </span>{" "}
                    The cumulative{" "}
                    <span className="text-lime-300 font-semibold">
                      CO₂ reduction
                    </span>{" "}
                    and{" "}
                    <span className="text-lime-300 font-semibold">
                      trees planted equivalent
                    </span>{" "}
                    highlight the substantial positive effect of these projects
                    on the environment. Each month, hundreds to thousands of
                    kilograms of CO₂ emissions are offset, contributing to
                    cleaner air and a greener community.
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <span className="text-yellow-300 text-2xl mt-1">🔋</span>
                  <div>
                    <span className="font-bold text-yellow-200 text-lg">
                      Energy Independence:
                    </span>{" "}
                    The steady increase in total inverter kW, solar panel kW,
                    and battery kWh per month demonstrates that more households
                    and businesses are investing in energy independence and
                    backup power, reducing their reliance on the grid and
                    protecting themselves from outages.
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <span className="text-orange-300 text-2xl mt-1">☀️</span>
                  <div>
                    <span className="font-bold text-orange-200 text-lg">
                      Seasonal Patterns:
                    </span>{" "}
                    The peak in installations during the summer months may be
                    influenced by higher solar irradiance and increased demand
                    for cooling, making solar energy solutions more attractive
                    during this period.
                  </div>
                </div>
                <div className="flex items-start gap-3 py-4">
                  <span className="text-pink-300 text-2xl mt-1">🏆</span>
                  <div>
                    <span className="font-bold text-pink-200 text-lg">
                      Conclusion:
                    </span>{" "}
                    Sunphil Solar's 2025 project data reflects a strong and
                    growing demand for solar energy in the Philippines, with
                    clear benefits for both customers and the environment. The
                    company is well-positioned to continue leading the
                    transition to clean, reliable, and cost-effective energy
                    solutions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </BeamsBackground>
  );
};

export default StatisticsPage;
