const {Pool} = require('pg');
const pool = new Pool({
    host:'db',
    port: 5432,
    user:'wgtadmin',
    password: '1234',
    database: 'wgt'
})

module.exports = pool;
