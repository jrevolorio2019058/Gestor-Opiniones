'use strict'

import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import morgan from 'morgan';

import { dbConnection } from './mongo.js';

import userRoutes from '../src/users/user.routes.js';

import authRoutes from '../src/auth/auth.routes.js';

import publicationRoutes from '../src/publications/publication.routes.js';

import comentRoutes from '../src/coments/coment.routes.js';

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/gestorOpinionesApi/v1/users'
        this.authPath = '/gestorOpinionesApi/v1/auth'
        this.publicacionPath = '/gestorOpinionesApi/v1/publications'
        this.comentPath = '/gestorOpinionesApi/v1/coments'

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.publicacionPath, publicationRoutes);
        this.app.use(this.comentPath, comentRoutes);
    }

    listen(){

        this.app.listen(this.port, () =>{

            console.log('SERVER ONLINE | ON PORT: ', this.port);

        });

    }

}

export default Server;