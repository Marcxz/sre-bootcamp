const mysql = require('mysql');
const util = require( 'util' );

import Config from 'config';

export class DataBase {
    constructor() {
     }

    async connectdb() {
        const connection = mysql.createConnection({
            host     : Config.host,
            user     : Config.user,
            password : Config.password,
            database : Config.database
          } );
        return {
          query( sql, args ) {
            return util.promisify( connection.query )
              .call( connection, sql, args );
          },
          close() {
            return util.promisify( connection.end ).call( connection );
          }
        };
      }

      async query(query) {
        const db = this.connectdb();
        try {
            const rows = (await db).query(query);
            (await db).close();
            return rows;
        } catch(error) {
            console.log(error);
            (await db).close();
        }
      }
    }
