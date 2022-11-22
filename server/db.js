const { Pool } = require('pg');

const URI = 'postgres://tzxamkif:8liwamT4c8hgA-cXd-W_ahrfhT1DKiXL@heffalump.db.elephantsql.com/tzxamkif';

const pool = new Pool({
    connectionString: URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('query: ', text);
        return pool.query(text, params, callback);
    }
};