const express   = require("express");
const path      = require("path");
const jwt       = require("jsonwebtoken");

const app = express();

const SECRET = 'SECRET_HERE';

app.use("/", express.static(path.join(__dirname, "static")));

function auth(req, res, next) {

    if(!req.headers["authorization"])
        return res.status(400).json({ error: "Access Denied" });

    const header = req.headers["authorization"].split(" ");
    const type = header[0], credentials = header[1];

    jwt.verify(credentials, SECRET, function(err, decoded) {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: "Access Denied" });
        }
        
        req.auth = {
            exp: decoded.exp,
            foo: decoded.foo,
        };

        return next();
    });
}

app.get("/api/access", function(req, res, next) {
    const token = jwt.sign({ 
        foo: 'bar', 
        exp: Math.floor(Date.now() / 1000) + 30
    }, SECRET);

    return res.json({
        access: token
    });
});

app.get("/api/refresh", function(req, res, next) {
    const token = jwt.sign({ 
        foo: 'bar'
    }, SECRET);

    return res.json({
        refresh: token
    });
});

app.get("/api/protected", auth, function(req, res, next) {
    const token = jwt.sign({ 
        foo: 'bar'
    }, SECRET);

    return res.json({
        foo: req.auth.foo
    });
});


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});