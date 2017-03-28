var mine = require("../mine").types;
var pool = require("../mysql_pool");
var querystring = require('querystring');

module.exports = function(url, success, fail) {

    pool.getConnection(function(err, conn) {

        if (err) {
            console.log("POOL ==> " + err);
            fail();
            return;
        }

        var sql = 'SELECT Id_A,time,title,des,keyword FROM Article';

        conn.query(sql, function(err, rows) {

            if (err) {
                fail();
                return;
            }

            // Finsh
            success(mine.json, JSON.stringify({
                artList: rows
            }));

            conn.release();
        });

    });

};
