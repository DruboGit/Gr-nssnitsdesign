const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const PORT = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'MalteseMan',
    password: 'qwe123!!',
    database: 'restaurant'
  })

app.use(express.static('public'))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

connection.connect()

app.get('/', (req, res) => {
    connection.promise().query("SELECT * FROM restaurant.menu")
    .then(function([rows, fields]){  
        res.render('index.pug', {"items":rows})
    })
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})