import 'babel-polyfill'
import Koa from 'koa';
import Sequelize from 'sequelize';
import config from '../kari-config.json';

var app = new Koa();

var sequelize = new Sequelize(config.pg_database, config.pg_user, config.pg_password, {
    host: config.pg_host,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
    // Table created
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});


app.use(async (ctx) => {
    ctx.body = 'Hello world';
});

app.listen(3000);
