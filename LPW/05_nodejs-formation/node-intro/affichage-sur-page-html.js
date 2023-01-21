const http = require('http');


const server = http.createServer((req, res) => {
  res.end("hello word")
})

server.listen(9999, () => {
  console.log('server listening on port 9999')
})
