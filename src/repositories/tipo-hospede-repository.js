const AbstractRepository = require('./abstract-repository') 

class TipoHospedeRepo extends AbstractRepository {

    constructor(con){
        super(con, 'tipo_hospede')
    }

}

module.exports = TipoHospedeRepo