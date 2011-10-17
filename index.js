var http = require('http'),
    HamlEngine = require("./hamlViewEngine.js").HamlEngine,
    viewEngine = new HamlEngine("./views"),
    path = require('path'),
    qs = require('querystring');

var handler = function(req, res) {
        var body = "";

        if(req.url !== '/favicon.ico') {
            req.on("data", function(data) {
                body += data;
            });

            req.on("end", function(){
                router(req.method.toLowerCase(), req.url, body, res);
            });
        }
    },
    server = http.createServer(handler),
    router = function(method, url, body, res) {
        try {
            var segments = url.substring(1).split('/'),
                moduleName = segments[0],
                arguments = segments.slice(1).concat(qs.parse(body)),
                modulePath = path.join(path.resolve('./modules'),moduleName + ".js"),
                data = require(modulePath)[method].apply(null, arguments);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(viewEngine.renderView(moduleName, data));
        }
        catch(exception) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("AW SNAP, my demo is already sucking: " + JSON.stringify(exception));
        }
        res.end();
    };

server.listen(8000);