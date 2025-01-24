const http = require('http');

const requestListener = (request, response) => {
  response.writeHead(200);
  response.end('Hello, World!');
};

const server = http.createServer(requestListener);

const port = 8080;

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const handleError = (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying a different port...`);
    // Try a different port (e.g., increment by 1)
    startServerOnNewPort(port + 1);
  } else {
    console.error(`An unexpected error occurred: ${error}`);
  }
};

const startServerOnNewPort = (newPort) => {
  server.listen(newPort, () => {
    console.log(`Server is running on port ${newPort}`);
  }).on('error', (error) => handleError(error));
};

startServer().on('error', (error) => handleError(error));