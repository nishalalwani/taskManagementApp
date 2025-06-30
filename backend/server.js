const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(cors({
  origin: 'https://taskmanagementapp-1-m5ym.onrender.com',  
  credentials: true, 
}));
app.use(express.json());

// Routes
app.use("/", authRoutes);

// Error Handler Middleware
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
