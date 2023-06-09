const http = require('http');

const requestHandler = async (request, response) => {
  console.log(request.url);

  const url = process.env.TODS_URL;
  console.log(`GET time of day: url=${url}`);
  const r = await fetch(url);
  const body = await r.json();
  const tod = body.timeOfDay
  console.log(`response: tod=${tod}`);
  
  const html = `
  <html>
    <body>
      <p>TODS_URL: ${url}</p>
      <p>Time of day: ${tod}</p>
    </body>
  </html>
  `

  response.end(html);
}

const server = http.createServer(requestHandler);

const port = process.env.PORT || 8080;

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});

// Exit the process when signal is received (For docker)
process.on('SIGINT', () => {
  process.exit();
});