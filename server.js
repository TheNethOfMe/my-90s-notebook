const express = require("express");
const app = express();
// Connect DB
const connectDB = require("./config/db");
connectDB();
// Middleware
app.use(express.json({ extended: false }));
// Sample Home
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the new sample backend!" });
});
// Define Routes
app.use("/api/users", require("./database/api/users"));
app.use("/api/auth", require("./database/api/auth"));
app.use("/api/profiles", require("./database/api/profiles"));
app.use("/api/friends", require("./database/api/friends"));
app.use("/api/posts", require("./database/api/posts"));
app.use("/api/notification", require("./database/api/notifications"));
// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log("Listening on port 5000."));

// const seedDatabase = require("./seed");
// seedDatabase();
