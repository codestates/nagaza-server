'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  group.init({
    name: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};