const DaoObject = require('../../dao/DaoObject');
module.exports = class Bitacora {
  bitacoraDao = null;
  constructor ( BitacoraDao = null) {
    if (!(BitacoraDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.BitacoraDao = BitacoraDao;
  }
  async init(){
    await this.BitacoraDao.init();
    this.BitacoraDao.setup();
  }
  async getVersion () {
    return {
      entity: 'Bitacora',
      version: '1.0.0',
      description: 'CRUD de Bitacora'
    };
  }

  async addBitacora({
    type,description,amount,category
  }) {
    const result =  await this.BitacoraDao.insertOne(
      {
        type,description,amount,category
      }
    );
    return {
        type,description,amount,category,
        id: result.lastID
    };
  };

  async getBitacora () {
    return this.BitacoraDao.getAll();
  }

  async getBitacoraById ({ codigo }) {
    return this.BitacoraDao.getById({codigo});
  }

  async updateBitacora ({
        id,
        type,description,amount,category }) {
    const result = await this.BitacoraDao.updateOne({
        id,
        type,description,amount,category });
    return {
      id: id,
      type:type,description:description,amount:amount,category:category,
      modified: result.changes
    }
  }

  async deleteBitacora({ codigo }) {
    const cateToDelete = await this.BitacoraDao.getById({codigo});
    const result = await this.BitacoraDao.deleteOne({ codigo });
    return {
      ...cateToDelete,
      deleted: result.changes
    };
  }
}