const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


const monitoringData = require('./monitoringData.json')




const server = http.createServer((req, res) => {
  let url = req.url;
  res.statusCode = 200;
  if (url === '/monitoring') {
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify(monitoringData)
    );
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello World!');
    res.end();
  }



});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});