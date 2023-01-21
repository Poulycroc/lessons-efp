const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.method === "GET") {
    const tasks = ["task1", "task2", "task3", "task4"];
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ tasks }));
  }

  if (req.method === "POST") {
    console.log({ req });
  }
});

server.listen(9999, () => {
  console.log("ça tourne 9999");
});
