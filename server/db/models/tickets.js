'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
     uuid: {
         type: DataTypes.UUID,
         allowNull: false,
     },
     user_uuid: {
         type: DataTypes.UUID,
         allowNull: false,
     },
     subject: {
         type: DataTypes.TEXT,
         allowNull: false,
         // validate: {
         //     args: [1, 50],
         //     msg: "Subject max length is 50 characters"
         // }
     },
     body: {
         type: DataTypes.TEXT,
         allowNull: false,
     },
     status_id: {
         type: DataTypes.UUID,
         allowNull: false,
     }
  }, {});

  // ticket.associate = function(models) {
  //   ticket.hasMany(models.orderItem, {
  //     foreignKey: "ticket_uuid",
  //     as: "ticketItems"
  //   });
  // };

  return ticket;
};