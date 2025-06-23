const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.routes");
const { frontendUrl } = require("./config");

const PORT =  process.env.PORT || 3000;
connectMongoDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);

app.get("/", (_req, res) => res.send("Server is healthy, its connected"));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
