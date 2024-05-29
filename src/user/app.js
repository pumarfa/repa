import express from 'express';
import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
import routes from './routes/routes.mjs'; // Asegúrate de que la ruta a tu archivo routes.mjs sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware para parsear JSON en las solicitudes
app.use('/api', routes); // Prefijo "/api" para todas las rutas definidas en routes.mjs

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
