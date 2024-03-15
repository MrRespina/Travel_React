const Sequelize = require('sequelize');

class Final extends Sequelize.Model {
    static initiate(sequelize) {
        Final.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user : {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            key: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            search: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            addr: {
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
            dDay: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            photo : {
                type: Sequelize.TEXT,
                allowNull: true
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Final',
            tableName: 'finals',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};

module.exports = Final;