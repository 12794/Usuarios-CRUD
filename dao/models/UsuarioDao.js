const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CategoryDao extends DaoObject{
  constructor(db = null){
    console.log('UsersDao db: ', db);
    super(db);
  }
  setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT,fchIngreso TEXT, estado TEXT,avatar TEXT, nombre TEXT);';
      this.conn.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from usuarios;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from usuarios where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({email,password,nombre,avatar,estado}) {
    const fchIngreso = new Date().toDateString();
    const sqlstr = 'INSERT INTO usuarios (email,password,nombre,avatar,estado,fchIngreso) values (?, ?, ?, ?, ?,?);';
    const sqlParamArr = [email,password,nombre,avatar,estado,fchIngreso];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({id,
    email,
    password,
    estado,
    avatar,
    nombre}){
    const sqlstr= 'UPDATE usuarios set email = ? ,password = ?,nombre = ?,avatar = ?,estado = ? where id = ?;';
    const sqlParamArr = [email,password,nombre,avatar,estado, id];
    console.log(sqlParamArr);
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM usuarios where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }
}
