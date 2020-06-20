// Modules
const http = require("http");
const { promisify } = require("util");

const port = process.env.PORT || 3000;

// Server init function
async function init(app) {
  // Http server
  const httpServer = http.createServer(app.callback());
  try {
    await promisify(httpServer.listen).call(httpServer, port);
    console.log("=> Server was initialized!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Exports
module.exports = {
  init,
};
