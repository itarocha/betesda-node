var mysql = require('mysql')
 
var con = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'root',
  database: 'betesda',
  dateStrings: true
})
 
con.connect((err) => {
  if (err) throw err;

  const dados = {descricao: "Descricao Alterada", updated_by: 3}

  con.query("UPDATE tipo_hospede SET ? WHERE id = ?", [dados, 11], (err, result) => {
    if (err) throw err;

    console.log(result);
  })
})
