const http = require('http');
const ngrok = require('@ngrok/ngrok');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

ngrok.connect({ addr: 3000, authtoken_from_env: true })
	.then(listener => console.log(`Ingress established at: ${listener.url()}`));

server.listen(port);

