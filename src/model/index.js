import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: 'db',
    dialect: 'mysql',
    port: 3306,
});

export { sequelize };