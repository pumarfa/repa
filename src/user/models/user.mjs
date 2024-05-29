import mongoose from 'mongoose';
import User from '../schemas/user.mjs';
//
// Configuración de database y permisos de usuario
// Una vez corriendo mongo_db, ejecutar el cliente del servidor:
//
// $> mongosh -u admin -p password
//
// Dentro de la consola de mongo:
//
// use Todo
// db.createUser({
//    user: 'usertodo',
//    pwd: 'pwdtodo',
//    roles: [
//        {role: 'readWrite', db:'Todo'}
//    ]
// })

const MONGO_URI = 'mongodb://usertodo:pwdtodo@mongo_db_user:27017/Users'; // Cambia esto por la URI de tu base de datos (?retryWrites=true&w=majority)

// Conexión a MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err.message);
});

class UserModel {
  // Crear un nuevo usuario
  static async createUser(data) {
    try {
      const newUser = new User(data);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Obtener todos los usuarios
  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Obtener un usuario específico por ID
  static async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Actualizar un usuario específico por ID
  static async updateUser(id, data) {
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Eliminar un usuario específico por ID
  static async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  // LogIn de usuario 
  static async validatePassword( email, candidatePassword ) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await user.comparePassword( candidatePassword );
      if (!isMatch) {
        throw new Error('Invalid password' );
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserModel;
