'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
     uuid: {
         type: DataTypes.UUID,
         allowNull: false,
         validate: {
             isUUID: 4
         }
     },
     user_uuid: {
         type: DataTypes.UUID,
         allowNull: false,
         validate: {
             isUUID: 4
         }
     },
     subject: {
         type: DataTypes.TEXT,
         allowNull: false,
         validate: {
             len: [1, 100],
         }
     },
     body: {
         type: DataTypes.TEXT,
         allowNull: false,
         validate: {
             len: [1, 450],
         }
     },
     status_id: {
         type: DataTypes.UUID,
         allowNull: false,
         validate: {
             isUUID: 4
         }
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