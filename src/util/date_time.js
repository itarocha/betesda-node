const moment = require('moment')

function currentTimestamp(){
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {currentTimestamp}