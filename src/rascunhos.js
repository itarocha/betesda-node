const express = require('express')

const Joi = require('joi')
const morgan = require('morgan')
const db = require('./database')

const app = express()

app.use(morgan('short'))
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM tipo_hospede';
    db.query(sql,(err, results) => {
        if (err) throw err
        return res.status(200).send(results)    
    })
})

app.get('/api/posts/:year/:month', (req, res) => {
    //res.send(req.query)
    //const course = courses.find(c => c.id === parseInt(req.params.id))
    //const name = req.body.name
    res.status(200).send(req.params)
})

app.get('/users', (req, res) => {
    res.send([{id:1, name:"Itamar"}, {id:2, name:"Fernanda"}])
})

app.post('/api/courses',(req, res) => {

    const {error} = validateCourse(req.body) // object destruction

    if (error) return res.status(400).send({message:error.details[0].message})

    const course = {
        id: 1,
        name: req.body.name
    }

    res.send(course)

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

require('./controllers/tipo-hospede-controller')(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}...`);
})