const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});