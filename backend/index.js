const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const userRoutes = require("./routes/Users"); 
const empRoutes = require("./routes/Emps"); 

const app = express();
const PORT = 8089;

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://mlbano26:mlbano26@cluster0.mdgarfi.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

//Middleware for parsing JSON
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });