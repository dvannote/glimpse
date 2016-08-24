let mysql = require('mysql');

let databaseName = 'hellaFire';

let query = (queryString, next)=>{
    let conn = mysql.createConnection({
        user: 'dev',
        password: 'P@$$(0d3',
        database: databaseName
    });

    conn.connect(function (err) {
        if (err) next(err);
        else conn.query(queryString, function (err, data) {
            if (err) next(err);
            else conn.end(function (err) {
                if (err) next(err);
                else next(err, data);
            });
        });
    });
}

exports.module = {
    databaseName: databaseName,
    query: query,
    mysql: mysql
};