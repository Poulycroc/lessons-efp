const http = require('http');
const PORT = 9999;

const server = http.createServer((req, res) => {
  console.log({ req })
  res.end("hello word")
})

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})
