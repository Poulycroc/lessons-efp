const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  database: "efp-node-intro-backend",
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 8889,
});

app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      return res.json({ success: false, message: err });
    }
    res.json({ results });
  });
});

app.get("/tasks/:id", (req, res) => {
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    [req.params.id],
    function (err, results) {
      if (err) {
        return res.json({ success: false, message: err });
      }
      res.json({ results });
    }
  );
});

app.post("/tasks", (req, res) => {
  const data = req.body;

  connection.query(
    "INSERT INTO users (firstname, lastname) VALUES (?, ?)",
    [data.firstname, data.lastname],  
    function (err, results, fields) {
      if (err) {
        return res.json({ success: false, message: err });
      }
      res.json({ results });
    }
  );
});

app.listen(9999, () => {
  console.log("ça tourne 9999");
});
