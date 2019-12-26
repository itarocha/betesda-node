const Joi = require('joi')

const {validate} = require('../util/validator')

const express = require('express')
const db = require('../database')


const TipoHospedeRepo = require('../repositories/tipo-hospede-repository')

const router = express.Router()

router.get('/', (req, res) => {

    new TipoHospedeRepo(db)
        .list()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send({error: err}))
})

router.get('/:id', (req, res) => {

    new TipoHospedeRepo(db)
        .getById(req.params.id)
        .then(data => {
                //console.log(data)
                if (data) {
                    res.status(200).send(data)
                } else {
                    res.status(404).send({error: "Tipo de Hóspede não encontrado"})
                }
            })
        .catch(err => res.status(500).send({error: err}))
})

router.post('/', (req, res) => {

    //console.log(req.body)

    const schema = {
        descricao: Joi.string().min(3).max(32).required()
    }

    const {error} =  validate(req.body, schema)
    if (error) return res.status(400).send({error: error.message})

    const user_id = 1
    new TipoHospedeRepo(db)
        .create(req.body, user_id)
        .then(data => {
            if (data){
                res.status(200).send(data)
            } else {
                res.status(400).send({error: "Não foi possível gravar registro"})
            }
        }).catch(err => res.status(500).send({error: err}))
})

router.put('/:id', (req, res) => {
    const user_id = 1

    new TipoHospedeRepo(db)
        .update(req.params.id, req.body, user_id)
        .then(data => {
            if (data){
                res.status(200).send(data)
            } else {
                res.status(400).send({error: "Não foi possível gravar registro"})
            }
        })
        .catch(err => res.status(500).send({error: err}))
})

router.delete('/:id', (req, res) => {

    new TipoHospedeRepo(db)
        .delete(req.params.id)
        .then(data => {
            if (data){
                res.status(200).send(data)
            } else {
                res.status(400).send({error: "Não foi possível excluir registro"})
            }

        }).catch(err => res.status(500).send({error: err}))
})


module.exports = app => app.use('/api/app/tipo_hospede', router)
