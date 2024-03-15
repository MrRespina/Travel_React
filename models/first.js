const Sequelize = require('sequelize');

class First extends Sequelize.Model {
    static initiate(sequelize) {
        First.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lat: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            lng: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            start_day: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            end_day: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            search: {
                type:Sequelize.STRING(40),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'First',
            tableName: 'firsts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        
    }
};

module.exports = First;