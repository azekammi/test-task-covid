// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
var axios = require("axios");

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const clientID = '43a482a6fd792aa8ff10'
const clientSecret = '3ce52b21f72f36803f9b112c375cb0c5d99354b2'

// Local port.
const LOCAL_PORT = 8080;

var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//AUTH
app.get("/github/callback", function (req, res) {
    const requestToken = req.query.code
  
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        access_token = response.data.access_token;
        if(access_token){
            res.redirect('http://localhost:4200/success');
        }
        else{
            res.redirect('http://localhost:4200/fail');
        }
    })
});


// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}
