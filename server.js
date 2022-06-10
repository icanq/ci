const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`this app is running on ${process.env.NODE_ENV} mode`)
	console.log(`listening on ${PORT}`)
});
