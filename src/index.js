const express = require('express')

const Joi = require('joi')
//const morgan = require('morgan')

const app = express()

//app.use(morgan('short'))
app.use(express.json())

require('./controllers/tipo-hospede-controller')(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}...`);
})