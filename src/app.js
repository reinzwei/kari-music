import 'babel-polyfill'
import Koa from 'koa';
import Sequelize from 'sequelize';
import config from '../kari-config.json';


/*import models*/
import User from './models/user';

/*initialize modules*/
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

/*initialize models*/
var newuser = new User(sequelize,Sequelize);

/*define routes*/
newuser.sync({force: true}).then(function () {
    // Table created
    return newuser.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

app.use(async (ctx) => {

    ctx.body = 'Hello world';
});

app.listen(3000);
