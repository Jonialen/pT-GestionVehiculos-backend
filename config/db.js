const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '52.20.16.17',
  user: 'movistarmysql',
  password: 'MovSoft2018',
  database: 'EXAMEN'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = db;

