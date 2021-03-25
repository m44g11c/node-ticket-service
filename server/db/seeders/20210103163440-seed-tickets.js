'use strict';
const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ticketService_tickets', [
        {
            uuid: uuidv4(),
            object_uuid: uuidv4(),
            subject: 'Test ticket subject',
            body: 'Test ticket body',
            status_id: 1,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ticketService_tickets', [{
    }])
  }
};
