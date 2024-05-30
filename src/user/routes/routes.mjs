import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.mjs'; // Ajusta la ruta según la ubicación de tu archivo UserModel.mjs

const router = Router();

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
  const { name, email, password, pwd, roles } = req.body;
  try {
    if ( password != pwd ){
      res.status(401).json({ message: 'Incorrect password' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.createUser({ name, email, password: hashedPassword, roles });// => req.body
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  const tocken = req.body;
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un usuario específico por ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Actualizar un usuario específico por ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un usuario específico por ID
router.delete('/users/:id', async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validar contraseña de un usuario
router.post('/login/', async (req, res) => {
  const { email, password } = req.body;
  try {
    if ( !email || !password ){
      res.status(401).json({ message: 'Incorrect user or password' });
    }
    await UserModel.validatePassword( email, password);
    //crear el Tocken para el usuario
    //res.status(200).send({ message: 'User is valid' });
    const accessToken = jwt.sign(user, 'secret_key');
    res.json({ accessToken: accessToken });
    res.status(500).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
