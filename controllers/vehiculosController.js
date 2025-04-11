const db = require('../config/db');

exports.obtenerTodos = (req, res) => {
  db.query('SELECT * FROM vehiculos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.obtenerPorPlaca = (req, res) => {
  const { placa } = req.params;
  db.query('SELECT * FROM vehiculos WHERE placa = ?', [placa], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Vehículo no encontrado');
    res.json(results[0]);
  });
};

exports.crear = (req, res) => {
  const { placa, marca, modelo, serie, color } = req.body;

  if (!placa || !marca || !modelo || !serie || !color) {
    return res.status(400).send('Todos los campos son obligatorios: placa, marca, modelo, serie, color');
  }

  const sql = 'INSERT INTO vehiculos (placa, marca, modelo, serie, color) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [placa, marca, modelo, serie, color], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, placa, marca, modelo, serie, color });
  });
};

exports.actualizar = (req, res) => {
  const { placa } = req.params;
  const { marca, modelo, serie, color } = req.body;

  if (!marca || !modelo || !serie || !color) {
    return res.status(400).send('Todos los campos son obligatorios: marca, modelo, serie, color');
  }

  const sql = 'UPDATE vehiculos SET marca=?, modelo=?, serie=?, color=? WHERE placa=?';
  db.query(sql, [marca, modelo, serie, color, placa], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Vehículo no encontrado');
    res.status(200).json({ placa, marca, modelo, serie, color });
  });
};

exports.eliminar = (req, res) => {
  const { placa } = req.params;
  db.query('DELETE FROM vehiculos WHERE placa=?', [placa], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
    res.status(204).send();
  });
};

