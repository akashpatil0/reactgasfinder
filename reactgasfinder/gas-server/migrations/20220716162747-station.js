'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('stations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      zipcode:{
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      lat:{
          type: DataTypes.DOUBLE,
          allowNull: false
      },
      lng:{
          type: DataTypes.DOUBLE,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('stations')
  },
};
