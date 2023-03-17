const express = require('express');
const mysql = require('mysql2')

const PORT = '9999';
const app = express();
const conn = mysql.createConnection({
  database: 'efp-nodejs-goldenbook',
  host: '127.0.0.1',
  user: 'root', 
  password: 'root',
  port: '8889',
})

app.use(express.json());

app.get("/test", (req, res) => {
  conn.query(
    "SELECT * FROM `guestbook`",
    function (err, results) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err,
        })
      }

      res.status(200).json({ results })
    }
  )
})

app.get("/test/:id", (req, res) => {
  conn.query(
    "SELECT * FROM `guestbook` WHERE `id` = ?",
    [req.params.id],
    function (err, results) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err,
        })
      }

      res.status(200).json(results[0])
    }
  )
})

app.post("/test", (req, res) => {
  const data = req.body
  const date = new Date()
  const createdAt = `${date.toISOString().split('T')[0]} ${date.toTimeString().split(" ")[0]}`

  conn.query(
    "INSERT INTO `guestbook` (pseudo, message, created_at) VALUES (?, ?, ?)",
    [data.pseudo, data.message, createdAt],
    function (err, results) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err,
        })
      }

      res.status(200).json({ results })
    }
  )
})
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
