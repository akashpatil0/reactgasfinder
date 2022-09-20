'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }
  }
  Task.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datetime: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'tasks',
      modelName: 'Task',
    }
  )
  return Task
}
