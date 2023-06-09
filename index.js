const http = require('http');

const requestHandler = async (request, response) => {
  console.log(request.url);

  const url = process.env.TODS_URL;
  console.log(`GET time of day: url=${url}`);
  const r = await fetch(url);
  const body = await r.json();
  const tod = body.timeOfDay
  console.log(`GET time of day: tod=${tod}`);
  
  const html = `
  <html>
    <body>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
      <div class="container text-center mt-5 pt-5">
        <p>TODS_URL: ${url}</p>
        <p>Time of day: ${tod}</p>
      </div>
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