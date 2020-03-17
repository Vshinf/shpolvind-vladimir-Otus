const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const server = http.createServer((req, res) => {
    setTimeout(() => {
        let url_parts = url.parse(req.url, true);
        let query = url_parts.query;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        if( query.num  ){
            res.end('Request num ' + query.num);
        }else{
            res.end('Not num');
        }
    }, 100);//getRandomInt(100, 5000)

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});