const {currentTimestamp} = require('../util/date_time')

class AbstractRepository {

    constructor(con, table_name){
        this._connection = con
        this._table_name = table_name
    }

    list(){
        return new Promise((resolve,reject) => {
            this._connection.query(`SELECT * FROM ${this._table_name} ORDER BY descricao`, (err, data) => {
                
                if (err) {
                    reject(err)
                    return
                }

                resolve(data)
            })
        })
    }

    getById(id){
        return new Promise((resolve,reject) => {
            this._connection.query(`SELECT * FROM ${this._table_name} WHERE id = ?`, id, (err, data) => {
                
                if (err) {
                    reject(err)
                    return
                }

                resolve(JSON.parse(JSON.stringify(data))[0])
            })
        })
    }

    create(model, user_id){

        const CURRENT_TIMESTAMP = currentTimestamp()
        model.created_by = user_id
        model.updated_by = user_id
        model.created_at = CURRENT_TIMESTAMP
        model.updated_at = CURRENT_TIMESTAMP

        return new Promise((resolve, reject) => {
            this._connection.query(`INSERT INTO ${this._table_name} SET ?`, model, (err, data) => {
                
                if (err) {
                    const {sqlMessage} = err
                    if (sqlMessage) {
                        reject({message: sqlMessage})
                    } else {
                        reject(err)
                    }
                    return
                }
                if (data.insertId  && data.insertId > 0){
                    this.getById(data.insertId)
                        .then(data => {
                            resolve(data)
                        })
                        .catch(err => reject(err))
                }

            })
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {
            this._connection.query(`DELETE FROM ${this._table_name} WHERE id = ?`, [id], (err, data) => {
                if(err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }

    update(id, model, user_id){

        const CURRENT_TIMESTAMP = currentTimestamp()

        model.updated_by = user_id
        model.updated_at = CURRENT_TIMESTAMP

        return new Promise((resolve, reject) => {
            this._connection.query(`UPDATE ${this._table_name} SET ? WHERE id = ?`,[model, id], (err, data) => {
                if(err) {
                    reject(err)
                    return
                } 

                if (data.affectedRows > 0) {
                    this.getById(id).then(data => {
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                } else {
                    resolve(data)
                }
            })
        })
    }

}
module.exports = AbstractRepository