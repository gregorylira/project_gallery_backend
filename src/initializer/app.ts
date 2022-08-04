import 'express-async-errors';
import mongoose from 'mongoose';
import config from '../config';
import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import routes from '../api';
import { swaggerDocs } from '../api/utils/swagger';
import path from 'path';
import 'reflect-metadata';

export default class ConfigServer {
  private server?: Server;

  constructor(
    private port = config.port_server,
    public app = express()
  ) {}

  public async init() {
    this.setupServer();
    this.setupRoutes();
    await this.setupDatabase();
  }

  private setupServer() {
    const cors = require('cors');
    this.app.use(
      '/files',
      express.static(
        path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
      )
    );
    this.app.use(cors());
    this.app.use(express.json());
  }

  private async setupDatabase() {
    if (process.env.MONGO_URL)
      await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('connected to database');
      });
  }

  private setupRoutes() {
    this.app.use('/v1/api', routes());
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof Error) {
          return response.status(400).json({
            error: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }
    );
  }

  public start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
      swaggerDocs(this.app, this.port);
    });
  }
}
