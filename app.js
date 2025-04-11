const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vehiculosRoutes = require('./routes/vehiculos');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Vehículos funcionando');
});

// Rutas de vehículos
app.use('/vehiculos', vehiculosRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

