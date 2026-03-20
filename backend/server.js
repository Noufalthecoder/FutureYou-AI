const express = require("express");
const cors = require("cors");
require("dotenv").config();

const simulationRoutes = require("./routes/simulation");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", simulationRoutes);
app.use("/api", aiRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`FutureYou AI backend running on http://localhost:${PORT}`);
});
