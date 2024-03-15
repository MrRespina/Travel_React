const Sequelize = require('sequelize');

class DraftView extends Sequelize.Model {
    static initiate(sequelize) {
        DraftView.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            planId : {
                type: Sequelize.INTEGER,
                allowNull: false
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
            days: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            photo : {
                type: Sequelize.TEXT,
                allowNull: true
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'DraftView',
            tableName: 'draftViews',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};

module.exports = DraftView;