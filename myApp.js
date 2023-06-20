require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    console.log(req.method +" " + req.path + " - " + req.ip);
    next();
} )

app.use('/public', express.static(__dirname + '/public'));

let absolutePath = __dirname + '/views/index.html';


app.get('/', function(req, res) {
    res.sendFile(absolutePath);
});

app.get('/:id/:name/:email/echo', (req, res, next) => {
    res.json({
                echo: {
                    "id": req.params.id,
                    "name": req.params.name,
                    "email": req.params.email
                }
            }
        );
    next();
})

app.get('/now', function (req, res, next) {   
    req.time = (new Date().toString());
    next(); 
}, function(req, res){
    res.json({time: req.time});

})

app.route('/name')
.get(function(req, res){
    const {first, last} = req.query;
    const newQuery = `${first} ${last}`;
    res.json({name: newQuery});
})
.post(function(req, res){
    const {first, last} = req.body;
    const newQuery = `${first} ${last}`;
    res.json({name: newQuery});
})

app.get('/json', function(req, res){
    let message = "Hello Json";
    
    res.json(
    (process.env.MESSAGE_STYLE==='uppercase') ? {"message ": message.toUpperCase()} : {"message ": message}
    );
})
// console.log('Hello World');




































 module.exports = app;
