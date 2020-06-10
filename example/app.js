const express   = require("express");
const path      = require("path");
const jwt       = require("jsonwebtoken");

const axios     = require("axios").default;

const app = express();

const SECRET = 'SECRET_HERE';

app.use("/", express.static(path.join(__dirname, "static")));
app.use("/", express.static(path.join(__dirname), "../dist/index.js"));

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

app.get("/api/login", function(req, res, next) {

    const access = jwt.sign({ 
        foo: 'bar', 
        exp: Math.floor(Date.now() / 1000) + 30 // 30 seconds
    }, SECRET);

    const refresh = jwt.sign({ 
        foo: 'bar', 
    }, SECRET);

    return res.json({
        access,
        refresh
    });
});

app.get("/api/access", function(req, res, next) {

    const refresh = req.query.refresh;

    jwt.verify(refresh, SECRET, function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: "Access Denied" });
        }

        const token = jwt.sign({
            foo: 'bar', 
            exp: Math.floor(Date.now() / 1000) + 30 // 30 seconds
        }, SECRET);

        return res.json({
            access: token
        });
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