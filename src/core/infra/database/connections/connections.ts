import { createConnection, Connection } from 'typeorm';

export default class DatabaseConnection {
   private static _connection: Connection;

   static getConnection() {
      if (!this._connection) {
         throw new Error('Falha de conexão.');
      }
      return this._connection;
   }

   static async initConnection() {
      !this._connection ? (this._connection = await createConnection()) : console.log('Conexão já estabelecida.');
   }
}
