const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate({ Task }) {
            this.hasMany(Task, { foreignKey: 'userId', as: 'tasks' })
          }
        
        toJSON() {
            return { ...this.get(), id: undefined }
          }
    }
    User.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            username:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { args: true, msg: "You must enter a name" }
                }
            },
            passhash:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { args: true, msg: "You must enter a passhash" }
                }
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                notNull: { msg: 'User must have a email' },
                notEmpty: { msg: 'email must not be empty' },
                isEmail: { msg: 'Must be a valid email address' },
              },
            }
        },
        {
            sequelize,
            tableName: 'users',
            modelName: 'User',
        }
    )
    return User
}