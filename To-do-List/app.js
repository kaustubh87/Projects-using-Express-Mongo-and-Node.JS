const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todoapp';

const port = 8089;

// Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// View Setup

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Connect to mongodb

MongoClient.connect(url, (err, db) => {
    console.log('MongoDb Connected . . .');
    if(err) throw err;

    Todos = db.collection('todos');


    app.listen(port, () => {
        console.log('Server running on ' +port);
    });
});

app.get('/', (req, res, next) => {
    Todos.find({}).toArray((err, todos) => {
        if(err){
            return console.log(err);
        }
        console.log(todos);
        res.render('index', {
            todos: todos
        });
    });
});





