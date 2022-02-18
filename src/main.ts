import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import DatabaseConnection from './core/infra/database/connections/connections';
import { initServer } from './core/presentation/server/server';
import { RedisConnection } from './core/infra/database/connections/redis';
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(cors());

DatabaseConnection.initConnection()
   .then(() => {
      RedisConnection.initConnection();
      initServer();
   })
   .catch((error) => {
      console.log(error);
   });
