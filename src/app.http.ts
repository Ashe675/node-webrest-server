import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

    console.log(req.url);

    if (req.url === '/') {

        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.write(`<h1>HOME URL: ${req.url} </h1>`);
        res.end();
    }

    if (req.url === '/data') {

        const data = { name: 'john Doe', age: 30 };

        res.writeHead(200, {
            "content-type": "application/json"
        })
        res.end(JSON.stringify(data));
    }

    if (req.url === '/html') {

        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.end(htmlFile);
    }

    if (req.url?.match(/\w.css/g)) {

        const cssFile = fs.readFileSync(`public/${ req.url }`, 'utf-8');

        res.writeHead(200, {
            "content-type": "text/css"
        })
        res.end(cssFile);
    }

    if (req.url?.match(/\w.js/g)) {

        const jsFile = fs.readFileSync(`public/${ req.url }`, 'utf-8');

        res.writeHead(200, {
            "content-type": "application/javascript"
        })
        res.end(jsFile);
    }

});


server.listen(8080, () => {
    console.log('Server running on port 8080');
});