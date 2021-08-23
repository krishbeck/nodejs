const http = require('http');
const url = require('url')

const requestListener = (req, res) => {
    const urlString = req.url;

    if (urlString === "/") {                                       // for /, print Hello World
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end("Hello World");
    } else if (urlString === "/welcome") {                         // for /welcome, print Welcome World
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end("Welcome World");
    } else if (urlString.startsWith('/welcome')) {                // starts with /welcome
        const queryParam = url.parse(req.url, true).query;
        const name = queryParam.name;
        res.writeHead(200, {'Content-Type': "text/html"});
        if (name === undefined || name === "") {                 // for /welcome and name missing, print Welcome Unknown
            res.end(`Welcome Unknown`);
        } else {                                                // for /welcome and name present, print Welcome name
            res.end(`Hello ${name}`);
        }
    } else {                                                     // for all other routes, 404
        res.writeHead(404, {'Content-Type': "text/html"})
        res.end(JSON.stringify({message: "404 NOT FOUND"}))
    }
}

//Create a server using http module
const server = http.createServer(requestListener);
server.listen(8080);