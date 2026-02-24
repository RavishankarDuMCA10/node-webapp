// IMPORTANT: load telemetry first
require("./telemetry");

const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health endpoint (Front Door + App Service)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Orders Web App running",
    hostname: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

// Simulate slow endpoint (for testing alerts)
app.get("/slow", async (req, res) => {
  await new Promise(r => setTimeout(r, 3000));
  res.json({ message: "Slow response completed" });
});

// Simulate error (for App Insights failures)
app.get("/error", (req, res) => {
  throw new Error("Simulated application error");
});

// Example using Key Vault env vars
app.get("/config", (req, res) => {
  res.json({
    hasDbConnection: !!process.env.DB_CONNECTION,
    hasBlobConnection: !!process.env.BLOB_CONNECTION
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
