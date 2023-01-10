const fs = require('fs');
const handlerFunc = (req, res) => {
    if (req.url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1>Hello Greetings from Akhi...!</h1>")
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            '<body><form action="/create-users" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (req.url === "/users") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>');
        res.write('<body><h1>Users.!</h1><ul><li>Monish</li><li>Atharv</li><li>Ayansh</li><li>Abhi..</li></ul></body>');
        res.write('</html>');
        return res.end()

    }
    if (req.url === '/create-users' && req.method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk.toString());
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1].replaceAll("+", " ");
            console.log(user)
            // fs.writeFile('users.txt', user, err => {
            //     res.statusCode = 302;
            //     res.setHeader('Location', '/');
            //     return res.end();
            // });
            res.end()
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();

}

exports.handler = handlerFunc;