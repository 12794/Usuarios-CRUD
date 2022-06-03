const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class BitacoraDao extends DaoObject{
  constructor(db = null){
    console.log('BitacoraDao db: ', db);
    super(db);
  }
  setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS bitacora (id INTEGER PRIMARY KEY AUTOINCREMENT, type EXPENSES,description TEXT, date TEXT,amount decimal, category TEXT);';
      this.conn.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from bitacora;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from bitacora where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({type,description,amount,category}) {
    const fchIngreso = new Date().toDateString();
    const sqlstr = 'INSERT INTO bitacora (type,description,date,amount,category) values (?, ?, ?, ?, ?);';
    const sqlParamArr = [type,description,fchIngreso,amount,category];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({id,type,description,amount,category}){
    const sqlstr= 'UPDATE bitacora set type = ? ,description = ?,amount = ?,category = ? where id = ?;';
    const sqlParamArr = [type,description,amount,category, id];
    console.log(sqlParamArr);
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM bitacora where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }
}
