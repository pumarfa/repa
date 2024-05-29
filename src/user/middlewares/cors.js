import cors from 'cors'
/// Importante!!! La lista aquí de las variables ACCEPTED_ORIGINS es un
//ejemplo y deberá ajustarse al proyecto específico.
//"cors" sólamente lo utillizan los navegadores, y no es un parametro 
//que lo use un llamado a las API. 
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
