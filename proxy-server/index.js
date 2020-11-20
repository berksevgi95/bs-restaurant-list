 // Define the command line options
 const optionDefinitions = [
	{ name: "port", alias: "p", type: Number, defaultValue: 8000 },
	{ name: "target", alias: "t", type: String, defaultValue: "https://api.yelp.com/v3" }
];
commandLineArgs = require("command-line-args");
// parse command line options
const options = commandLineArgs(optionDefinitions);

// Start the proxy
console.log("Start proxy on port", options.port, "for", options.target);
var http = require("http"), httpProxy = require("http-proxy");
require('dotenv').config()

// Create a proxy server with custom application logic
var proxy = httpProxy.createProxyServer({
  headers: {
    Authorization: `Bearer ${process.env.APP_TOKEN}`
  },
  changeOrigin: true
});
var sendError = function(res, err) {
	return res.status(500).send({
		 error: err,
		 message: "An error occured in the proxy"
	});
};

// error handling
proxy.on("error", function (err, req, res) {
	sendError(res, err);
});

var enableCors = function(req, res) {
	if (req.headers['access-control-request-method']) {
		res.setHeader('access-control-allow-methods', req.headers['access-control-request-method']);
	}

	if (req.headers['access-control-request-headers']) {
		res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers']);
	}

	if (req.headers.origin) {
		res.setHeader('access-control-allow-origin', req.headers.origin);
		res.setHeader('access-control-allow-credentials', 'true');
	}
};

// set header for CORS
proxy.on("proxyRes", function(proxyRes, req, res) {
	enableCors(req, res);
});

var server = http.createServer(function(req, res) {
	// You can define here your custom logic to handle the request
	// and then proxy the request.
	if (req.method === 'OPTIONS') {
		enableCors(req, res);
		res.writeHead(200);
		res.end();
		return;
	}

	proxy.web(req, res, {
		target: options.target,
		secure: true,
		changeOrigin: true
	}, function(err) {
		sendError(res, err);
	});
});

server.listen(options.port);