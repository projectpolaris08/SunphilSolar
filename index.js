const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
