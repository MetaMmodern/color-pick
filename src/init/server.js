// Modules
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { promisify } = require('util');

// Constants
const PRIVATE_KEY_PATH = path.join(__dirname, '..', '..', 'ssl', 'key.pem');
const CERTIFICATE_PATH = path.join(__dirname, '..', '..', 'ssl', 'cert.pem');

// SSL
const SSL = {
	key: fs.readFileSync(PRIVATE_KEY_PATH),
	cert: fs.readFileSync(CERTIFICATE_PATH)
};

// Server init function
async function init(app) {
	const httpServer = http.createServer(app.callback()); // Http server
	const httpsServer = https.createServer(SSL, app.callback()); // Https server
	try {
		await promisify(httpServer.listen).call(httpServer, 80);		
		await promisify(httpsServer.listen).call(httpsServer, 443);		
		console.log(`=> Server was initialized!`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

// Exports
module.exports = {
	init
};