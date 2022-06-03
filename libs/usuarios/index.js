const DaoObject = require('../../dao/DaoObject');
module.exports = class Usuario {
  usuariosDao = null;
  constructor ( usuariosDao = null) {
    if (!(usuariosDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.usuariosDao = usuariosDao;
  }
  async init(){
    await this.usuariosDao.init();
    this.usuariosDao.setup();
  }
  async getVersion () {
    return {
      entity: 'Usuarios',
      version: '1.0.0',
      description: 'CRUD de Usuarios'
    };
  }

  async addUsuarios({
    email,
    nombre,
    avatar,
    password,
    estado
  }) {
    const result =  await this.usuariosDao.insertOne(
      {
        email,
        nombre,
        avatar,
        password,
        estado
      }
    );
    return {
        email,
        nombre,
        avatar,
        password,
        estado,
        id: result.lastID
    };
  };

  async getUsuarios () {
    return this.usuariosDao.getAll();
  }

  async getUsuarioById ({ codigo }) {
    return this.usuariosDao.getById({codigo});
  }

  async updateUsuario ({
        id,
        email,
        nombre,
        avatar,
        password,
        estado }) {
    const result = await this.usuariosDao.updateOne({
        id,
        email,
        nombre,
        avatar,
        password,
        estado });
    return {
      id: id,
      email:email,
      nombre:nombre,
      avatar:avatar,
      password:password,
      estado:estado,
      modified: result.changes
    }
  }

  async deleteUsuario({ codigo }) {
    const cateToDelete = await this.usuariosDao.getById({codigo});
    const result = await this.usuariosDao.deleteOne({ codigo });
    return {
      ...cateToDelete,
      deleted: result.changes
    };
  }
}