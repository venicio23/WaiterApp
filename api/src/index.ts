import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on  http://localhost:${PORT}/`);
    });

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

  })
  .catch((err) => {
    console.error("Connecting Error:", err);
  });


