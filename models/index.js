// 시퀄라이즈 패키지이자 생성자
const Sequelize = require('sequelize');
const First = require('./first');
const Plan = require('./plan');
const Category = require('./category');
const DraftView = require('./draftView');
const Final = require('./final');

const env = process.env.NODE_ENV || 'development';
// config.json에서 데이터베이스 설정을 불러온 후
const config = require('../config/config.json')[env];
const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.First = First;
db.Plan = Plan;
db.Category = Category;
db.DraftView = DraftView;
db.Final = Final;

First.initiate(sequelize);
Plan.initiate(sequelize);
Category.initiate(sequelize);
DraftView.initiate(sequelize);
Final.initiate(sequelize);

First.associate(db);
Plan.associate(db);
Category.associate(db);
DraftView.associate(db);
Final.associate(db);


module.exports = db;
