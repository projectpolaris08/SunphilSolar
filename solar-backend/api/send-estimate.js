import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://sunphilsolar.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, calculation_data } = req.body;

  if (!email || !calculation_data) {
    return res
      .status(400)
      .json({ error: "Email and calculation data are required." });
  }

  // Store in Supabase
  const { error: dbError } = await supabase
    .from("Leads")
    .insert([{ email, calculation_data }]);

  if (dbError) {
    return res.status(500).json({ error: "Failed to store lead in Supabase." });
  }

  // Defensive array checks
  const appliances = calculation_data.appliances || [];
  const amAppliances = appliances.filter((app) => app.period === "AM");
  const pmAppliances = appliances.filter((app) => app.period === "PM");

  function appliancesTableHtml(appliancesArr, label) {
    if (!appliancesArr.length) return "";
    return `
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.15em; color: #1e293b; margin-bottom: 16px; text-align: left; font-weight: 600;">
          📝 ${label} Appliances
        </h3>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left; color: #475569;">Name</th>
              <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left; color: #475569;">Watts</th>
              <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left; color: #475569;">Qty</th>
              <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left; color: #475569;">Hours/Day</th>
              <th style="border: 1px solid #e2e8f0; padding: 12px; text-align: left; color: #475569;">Period</th>
            </tr>
          </thead>
          <tbody>
            ${appliancesArr
              .map(
                (app) => `
              <tr>
                <td style="border: 1px solid #e2e8f0; padding: 12px; color: #334155;">${app.name}</td>
                <td style="border: 1px solid #e2e8f0; padding: 12px; color: #334155;">${app.watts} W</td>
                <td style="border: 1px solid #e2e8f0; padding: 12px; color: #334155;">${app.quantity}</td>
                <td style="border: 1px solid #e2e8f0; padding: 12px; color: #334155;">${app.hoursPerDay}</td>
                <td style="border: 1px solid #e2e8f0; padding: 12px; color: #334155;">${app.period || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  const appliancesHtml =
    appliances.length && (amAppliances.length || pmAppliances.length)
      ? `
        <div style="margin-bottom: 8px;">
          ${appliancesTableHtml(amAppliances, "AM")}
          ${appliancesTableHtml(pmAppliances, "PM")}
        </div>
      `
      : "";

  const results = calculation_data;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px;">
      <h2 style="font-size: 1.7em; color: #222; margin-bottom: 24px; text-align: center;">
        ⚡ Solar System Estimation Results
      </h2>
      ${appliancesHtml}
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; margin-bottom: 32px;">
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #facc15;">⚡</div>
          <div style="color: #666; font-size: 1em;">Total Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.totalWattage || "-"} W</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #fb923c;">🌞</div>
          <div style="color: #666; font-size: 1em;">Daily Usage</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.dailyEnergyUse || "-"} kWh</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #3b82f6;">🔋</div>
          <div style="color: #666; font-size: 1em;">Battery Charging Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.batteryChargingWattage || "-"} W</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #22c55e;">⚡</div>
          <div style="color: #666; font-size: 1em;">Total System Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.totalSystemWattage || "-"} W</div>
        </div>
      </div>
      <h3 style="font-size: 1.3em; color: #222; margin-bottom: 16px; text-align: left;">🔧 Recommended Solar System</h3>
      ${(results.recommendedSystems || [])
        .map(
          (system) => `
        <div style="background: #fafbfc; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 24px 20px; margin: 0 auto 24px 0; text-align: left;">
          <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">Inverter: ${system.inverterModel}</div>
          <ul style="margin: 0 0 0 1.2em; padding: 0; color: #222;">
            <li>Max Load Capacity: ${system.maxLoadCapacity} W</li>
            <li>Battery: ${system.battery}</li>
            <li>Battery Capacity: ${system.batteryCapacity}</li>
            <li>Solar Panels: ${system.solarPanels} × ${system.inverterModel && system.inverterModel.includes("3kW") ? "585W" : "600W"}</li>
            <li>Total Solar Capacity: ${system.solarCapacity}</li>
            <li>System Quantity: ${system.quantity}</li>
          </ul>
          ${system.battery && system.battery.toLowerCase().includes("24v 280ah") ? `<div style='color: #dc2626; font-size: 0.95em; margin-top: 8px;'>This Battery supports 3kW system only</div>` : ""}
          ${system.note ? `<div style='color: #dc2626; font-size: 0.95em; margin-top: 8px;'>${system.note}</div>` : ""}
        </div>
      `
        )
        .join("")}
      <p style="margin-top: 24px; text-align: center;">
        If you have any questions, reply to this email at
        <a href="mailto:sunphilsolarpowerinstallation@gmail.com">sunphilsolarpowerinstallation@gmail.com</a>
        <br>
        or contact us on
        <a href="https://www.facebook.com/profile.php?id=100094173168805" target="_blank" style="color: #2563eb; text-decoration: underline;">
          Facebook
        </a>.
      </p>
      <p style="color: #888; font-size: 12px; text-align: center;">Sunphil Solar &copy; ${new Date().getFullYear()}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: email,
      subject: "Your Solar System Estimation Results",
      html: htmlContent,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email." });
  }
}
