const { Pool } = require('pg');

const URI = 'postgres://zzdurwqt:IlCrr8eWmWvN7Pcj_u-3X-B-qY8nNROL@heffalump.db.elephantsql.com/zzdurwqt';

const pool = new Pool({
    connectionString: URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('query: ', text);
        return pool.query(text, params, callback);
    }
};