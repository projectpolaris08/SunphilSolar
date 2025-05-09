require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const app = express();

// CORS: Only allow your frontend domains
const corsOptions = {
  origin: ["https://sunphilsolar.com", "https://www.sunphilsolar.com"],
  methods: ["POST", "GET"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/send-estimate
app.post("/api/send-estimate", async (req, res) => {
  const { email, calculation_data } = req.body;

  // Debug logging
  console.log("Incoming /api/send-estimate request", {
    email,
    calculation_data,
  });
  console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_FROM:", process.env.RESEND_FROM);

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
    console.log("Supabase Insert Error:", dbError);
    return res.status(500).json({ error: "Failed to store lead in Supabase." });
  }

  // Defensive array checks
  const appliances = calculation_data.appliances || [];
  const results = calculation_data;
  const recommendedSystems = results.recommendedSystems || [];

  // Email HTML
  const appliancesHtml = appliances.length
    ? `
      <h3 style="font-size: 1.1em; color: #222; margin-bottom: 8px; text-align: left;">📝 Appliances Entered</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr>
            <th style="border: 1px solid #eee; padding: 6px;">Name</th>
            <th style="border: 1px solid #eee; padding: 6px;">Watts</th>
            <th style="border: 1px solid #eee; padding: 6px;">Qty</th>
            <th style="border: 1px solid #eee; padding: 6px;">Hours/Day</th>
            <th style="border: 1px solid #eee; padding: 6px;">Period</th>
          </tr>
        </thead>
        <tbody>
          ${appliances
            .map(
              (app) => `
            <tr>
              <td style="border: 1px solid #eee; padding: 6px;">${app.name}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.watts}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.quantity}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.hoursPerDay}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.period || ""}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `
    : "";

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
    console.log("About to send email via Resend", {
      from: process.env.RESEND_FROM,
      to: email,
    });
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: email,
      subject: "Your Solar System Estimation Results",
      html: htmlContent,
    });
    console.log("Email sent successfully");
    res.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Export for Vercel
module.exports = app;
