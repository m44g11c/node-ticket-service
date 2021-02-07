'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ticket_permissions.init({
    ticket_uuid: DataTypes.STRING,
    permission_uuid: DataTypes.STRING,
    user_uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ticket_permissions',
  });
  return ticket_permissions;
};