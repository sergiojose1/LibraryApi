    const routerLivros = require("./livrosRoute")

module.exports  = (app, express) => {
    app.use(routerLivros);
}