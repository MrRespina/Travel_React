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
            f_id : {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: true,
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
            category: {
                type: Sequelize.STRING(50),
                allowNull: true,
                defaultValue: 'lanmark' 
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