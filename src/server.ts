import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'

// Routes
import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/WebApiDB'
        this.app.set('port', process.env.PORT || 3000);
        // Mongoose settings
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log('Base da datos conectada'));

        // Middlewares
        this.app.use(morgan('dev'));

        // Permite al servidor entender codigo Json (new bodyParaser)
        this.app.use(express.json());
        // Validacion para recibir datos de formulario (venia junto con badyParser)
        this.app.use(express.urlencoded({ extended: false }))

        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/users', userRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto :' + this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();