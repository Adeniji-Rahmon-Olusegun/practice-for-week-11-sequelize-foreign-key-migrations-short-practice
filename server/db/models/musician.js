'use strict';
const {
  Model
} = require('sequelize');
//const musicianinstrument = require('./musicianinstrument');
module.exports = (sequelize, DataTypes) => {
  class Musician extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Your code here
      Musician.belongsTo(
        models.Band,
        { foreignKey: 'bandId', onDelete: 'CASCADE', hooks: true}
      );

      Musician.belongsToMany(
        models.Instrument,
        { 
          through: models.MusicianInstrument, 
          foreignKey: 'musicianId',
          hooks: true 
        }
      )
    }
  };
  Musician.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Musician',
  });
  return Musician;
};