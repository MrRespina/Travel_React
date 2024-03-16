const Sequelize = require('sequelize');

class Plan extends Sequelize.Model {
    static initiate(sequelize) {
        Plan.init({
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
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            addr: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            lat: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            lng: {
                type: Sequelize.DOUBLE,
                allowNull: true
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
            modelName: 'Plan',
            tableName: 'plans',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};

module.exports = Plan;