const mysql = require('mysql')


const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'betesda',
    dateStrings: true
})

db.connect((error) => {
    if (error) {throw error}
    console.log('Mysql conectado com sucesso')
})


module.exports = db