const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Station extends Model {
        toJSON() {
            return { ...this.get(), id: undefined }
          }
    }
    Station.init(
        {
            name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            location:{
                type: DataTypes.STRING,
                allowNull: false
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
            }
        },
        {
            sequelize,
            tableName: 'stations',
            modelName: 'Station',
        }
    )
    return Station
}