const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
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

// Rutas
app.get('/', (req, res) => {
  res.send('API de Vehículos funcionando');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Obtener todos los vehiculos
app.get('/vehiculos', (req, res) => {
  db.query('SELECT * FROM vehiculos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Añadir vehiculos
app.post('/vehiculos', (req, res) => {
  const { placa, marca, modelo, serie, color } = req.body;

  // Validar que todos los campos estén presentes
  if (!placa || !marca || !modelo || !serie || !color) {
    return res.status(400).send('Todos los campos son obligatorios: placa, marca, modelo, serie, color');
  }

  const sql = 'INSERT INTO vehiculos (placa, marca, modelo, serie, color) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [placa, marca, modelo, serie, color], (err, result) => {
    if (err) return res.status(500).send(err);

    const vehiculoGuardado = {
      id: result.insertId,
      placa,
      marca,
      modelo,
      serie,
      color
    };

    res.status(201).json(vehiculoGuardado);
  });
});

// Editar vehiculo
app.put('/vehiculos/:placa', (req, res) => {
  const { placa } = req.params;
  const { marca, modelo, serie, color } = req.body;

  // Validar campos requeridos
  if (!marca || !modelo || !serie || !color) {
    return res.status(400).send('Todos los campos son obligatorios: marca, modelo, serie, color');
  }

  const sql = 'UPDATE vehiculos SET marca=?, modelo=?, serie=?, color=? WHERE placa=?';
  db.query(sql, [marca, modelo, serie, color, placa], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).send('Vehículo no encontrado');
    }

    const vehiculoActualizado = {
      placa,
      marca,
      modelo,
      serie,
      color
    };

    res.status(200).json(vehiculoActualizado);
  });
});

// Eliminar vehiculo
app.delete('/vehiculos/:placa', (req, res) => {
  const { placa } = req.params;

  db.query('DELETE FROM vehiculos WHERE placa=?', [placa], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    }

    // Eliminado con éxito, sin contenido
    res.status(204).send(); // <- Angular lo interpreta bien
  });
});

// obtener un vehiculo
app.get('/vehiculos/:placa', (req, res) => {
  const { placa } = req.params;

  const sql = 'SELECT * FROM vehiculos WHERE placa = ?';
  db.query(sql, [placa], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Vehículo no encontrado');
    res.json(results[0]);
  });
});

