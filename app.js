import Koa from 'koa';

var app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hello world';
});

app.listen(3000);
