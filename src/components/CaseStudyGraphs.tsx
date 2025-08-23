import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "../data/caseStudies";

// Transform case studies data for charts
const transformCaseStudiesData = () => {
  return Object.entries(caseStudies).map(([key, data]) => ({
    name: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    monthlySavings: data.financialAnalysis.monthlySavings,
    totalInvestment: data.financialAnalysis.totalInvestment,
    paybackPeriod: data.financialAnalysis.paybackPeriod,
    annualROI: data.financialAnalysis.annualROI,
    lifetimeSavings: data.financialAnalysis.lifetimeSavings,
    co2Reduction: data.environmentalImpact.co2Reduction,
    treesEquivalent: data.environmentalImpact.treesEquivalent,
    annualEnergyProduction: data.environmentalImpact.annualEnergyProduction,
    systemEfficiency: data.performanceMetrics.systemEfficiency,
    uptime: data.performanceMetrics.uptime,
    peakOutput: data.performanceMetrics.peakOutput,
    averageDailyProduction: data.performanceMetrics.averageDailyProduction,
  }));
};

// Calculate summary statistics
const calculateSummaryStats = () => {
  const data = transformCaseStudiesData();
  const totalSystems = data.length;

  const totalMonthlySavings = data.reduce(
    (sum, item) => sum + item.monthlySavings,
    0
  );
  const totalInvestment = data.reduce(
    (sum, item) => sum + item.totalInvestment,
    0
  );
  const totalLifetimeSavings = data.reduce(
    (sum, item) => sum + item.lifetimeSavings,
    0
  );
  const totalCO2Reduction = data.reduce(
    (sum, item) => sum + item.co2Reduction,
    0
  );
  const totalTreesEquivalent = data.reduce(
    (sum, item) => sum + item.treesEquivalent,
    0
  );
  const totalAnnualEnergy = data.reduce(
    (sum, item) => sum + item.annualEnergyProduction,
    0
  );

  const avgPaybackPeriod =
    data.reduce((sum, item) => sum + item.paybackPeriod, 0) / totalSystems;
  const avgAnnualROI =
    data.reduce((sum, item) => sum + item.annualROI, 0) / totalSystems;
  const avgSystemEfficiency =
    data.reduce((sum, item) => sum + item.systemEfficiency, 0) / totalSystems;

  return {
    totalSystems,
    totalMonthlySavings,
    totalInvestment,
    totalLifetimeSavings,
    totalCO2Reduction,
    totalTreesEquivalent,
    totalAnnualEnergy,
    avgPaybackPeriod,
    avgAnnualROI,
    avgSystemEfficiency,
  };
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CaseStudyGraphs: React.FC = () => {
  const chartData = transformCaseStudiesData();
  const stats = calculateSummaryStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back to Case Studies Link */}
      <div className="mb-6">
        <Link
          to="/case-studies"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Case Studies
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Solar Case Studies Performance Dashboard
        </h2>
        <p className="text-xl text-gray-600">
          Comprehensive analysis of {stats.totalSystems} solar installations
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Monthly Savings
          </h3>
          <p className="text-3xl font-bold text-green-600">
            ₱{stats.totalMonthlySavings.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Investment
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            ₱{stats.totalInvestment.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Lifetime Savings
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            ₱{(stats.totalLifetimeSavings / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            CO₂ Reduction
          </h3>
          <p className="text-3xl font-bold text-emerald-600">
            {stats.totalCO2Reduction.toLocaleString()} kg/year
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Savings Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Savings by Project
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="monthlySavings" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROI vs Payback Period */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ROI vs Payback Period
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="paybackPeriod"
                name="Payback Period (years)"
                type="number"
              />
              <YAxis dataKey="annualROI" name="Annual ROI (%)" type="number" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter dataKey="annualROI" fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* System Efficiency */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            System Efficiency
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis domain={[85, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="systemEfficiency"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Environmental Impact
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="co2Reduction"
                stackId="1"
                stroke="#059669"
                fill="#10B981"
              />
              <Area
                type="monotone"
                dataKey="treesEquivalent"
                stackId="2"
                stroke="#047857"
                fill="#059669"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Investment vs Savings */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Investment vs Lifetime Savings
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="totalInvestment" fill="#3B82F6" name="Investment" />
              <Bar
                dataKey="lifetimeSavings"
                fill="#10B981"
                name="Lifetime Savings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Production */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Annual Energy Production
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="annualEnergyProduction" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics Summary */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stats.avgPaybackPeriod.toFixed(1)} years
            </p>
            <p className="text-gray-600">Average Payback Period</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.avgAnnualROI.toFixed(1)}%
            </p>
            <p className="text-gray-600">Average Annual ROI</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.avgSystemEfficiency.toFixed(1)}%
            </p>
            <p className="text-gray-600">Average System Efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGraphs;
