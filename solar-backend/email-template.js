const generateEmailTemplate = (results) => {
  const appliances = results.appliances || [];

  // Separate AM and PM appliances
  const amAppliances = appliances.filter((app) => app.period === "AM");
  const pmAppliances = appliances.filter((app) => app.period === "PM");

  // Generate HTML for AM appliances table
  const amAppliancesHtml = amAppliances.length
    ? `
      <h3 style="font-size: 1.1em; color: #222; margin-bottom: 8px; text-align: left;">📝 AM Appliances</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Name</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Watts</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Qty</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Hours/Day</th>
          </tr>
        </thead>
        <tbody>
          ${amAppliances
            .map(
              (app) => `
            <tr>
              <td style="border: 1px solid #eee; padding: 6px;">${app.name}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.watts}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.quantity}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.hoursPerDay}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `
    : "";

  // Generate HTML for PM appliances table
  const pmAppliancesHtml = pmAppliances.length
    ? `
      <h3 style="font-size: 1.1em; color: #222; margin-bottom: 8px; text-align: left;">📝 PM Appliances</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Name</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Watts</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Qty</th>
            <th style="border: 1px solid #eee; padding: 6px; background: #f8f9fa;">Hours/Day</th>
          </tr>
        </thead>
        <tbody>
          ${pmAppliances
            .map(
              (app) => `
            <tr>
              <td style="border: 1px solid #eee; padding: 6px;">${app.name}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.watts}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.quantity}</td>
              <td style="border: 1px solid #eee; padding: 6px;">${app.hoursPerDay}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `
    : "";

  // Generate HTML for battery information
  const batteryInfoHtml =
    results.batteryConfig && results.batteryConfig.type !== "none"
      ? `
      <h3 style="font-size: 1.1em; color: #222; margin-bottom: 8px; text-align: left;">🔋 Battery Configuration</h3>
      <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0;"><strong>Type:</strong> ${results.batteryConfig.type}</p>
        <p style="margin: 0;"><strong>Quantity:</strong> ${results.batteryConfig.quantity}</p>
      </div>
    `
      : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px;">
      <h2 style="font-size: 1.7em; color: #222; margin-bottom: 24px; text-align: center;">
        ⚡ Solar System Estimation Results
      </h2>
      ${amAppliancesHtml}
      ${pmAppliancesHtml}
      ${batteryInfoHtml}
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; margin-bottom: 32px;">
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #facc15;">⚡</div>
          <div style="color: #666; font-size: 1em;">Total Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.totalWattage} W</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #fb923c;">🌞</div>
          <div style="color: #666; font-size: 1em;">Daily Usage</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.dailyEnergyUse} kWh</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #3b82f6;">🔋</div>
          <div style="color: #666; font-size: 1em;">Battery Charging Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.batteryChargingWattage} W</div>
        </div>
        <div style="flex: 1 1 120px; text-align: center; min-width: 120px;">
          <div style="font-size: 2em; color: #22c55e;">⚡</div>
          <div style="color: #666; font-size: 1em;">Total System Load</div>
          <div style="font-weight: bold; font-size: 1.3em;">${results.totalSystemWattage} W</div>
        </div>
      </div>
      <h3 style="font-size: 1.3em; color: #222; margin-bottom: 16px; text-align: left;">🔧 Recommended Solar System</h3>
      ${results.recommendedSystems
        .map(
          (system) => `
        <div style="background: #fafbfc; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 24px 20px; margin: 0 auto 24px 0; text-align: left;">
          <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">Inverter: ${system.inverterModel}</div>
          <ul style="margin: 0 0 0 1.2em; padding: 0; color: #222;">
            <li>Max Load Capacity: ${system.maxLoadCapacity} W</li>
            <li>Battery: ${system.battery}</li>
            <li>Battery Capacity: ${system.batteryCapacity}</li>
            <li>Solar Panels: ${system.solarPanels} × ${system.inverterModel.includes("3kW") ? "585W" : "600W"}</li>
            <li>Total Solar Capacity: ${system.solarCapacity}</li>
            <li>System Quantity: ${system.quantity}</li>
          </ul>
          ${system.battery.toLowerCase().includes("24v 280ah") ? `<div style='color: #dc2626; font-size: 0.95em; margin-top: 8px;'>This Battery supports 3kW system only</div>` : ""}
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
};

module.exports = { generateEmailTemplate };
