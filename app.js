const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const monitoringData = require('./monitoringData.json')




const server = http.createServer((req, res) => {
  let urlObject = req.url;
  const queryObject = url.parse(urlObject, true).query;

  res.statusCode = 200;
  if (urlObject.includes('/monitoring')) {
    res.setHeader('Content-Type', 'application/json');

    let start = 0;
    let end = 99;

    if (typeof queryObject.start !== 'undefined' && (queryObject.start > 0 && queryObject.start < 99)) {
      start = queryObject.start;
    }
    if (typeof queryObject.end !== 'undefined' && (queryObject.end > 0 && queryObject.end < 99)) {
      end = queryObject.end;
    }

    console.log("Getting results from: " + start + " to: " + end);

    res.end(
      JSON.stringify(monitoringData.slice(start, end))
    );
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('Hello World!');
    res.write('</br>');
    res.write(`Click <a href="http://${hostname}:${port}/monitoring?start=0&end=10">here to get data!`);
    res.end();
  }



});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});