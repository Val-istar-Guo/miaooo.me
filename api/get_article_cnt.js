var mine = require("../mine").types;
var pool = require("../mysql_pool");
var querystring = require('querystring');
var path = require("path");
var https = require('https');

/**
 * 读取远程文件
 *
 * @param {String} url
 * @param {Function} cb
 *   - {Error} err
 *   - {Buffer} buf
 */
function readRemoteFile(url, cb) {
    var callback = function() {
        // 回调函数，避免重复调用
        callback = function() {};
        cb.apply(null, arguments);
    };

    var req = https.get(url, function(res) {
        var b = [];
        res.on('data', function(c) {
            b.push(c);
        });
        res.on('end', function() {
            callback(null, Buffer.concat(b));
        });
        res.on('error', callback);
    });
    req.on('error', callback);
}

module.exports = function(url, success, fail) {

    var id = querystring.parse(url.query).id;

    if (!id) {
        fail();
        return;
    }


    pool.getConnection(function(err, conn) {

        if (err) {
            console.log("POOL ==> " + err);
            fail();
            return;
        }

        var sql = 'SELECT * FROM Article WHERE Id_A=' + id;

        conn.query(sql, function(err, rows) {

            if (err) {
                fail();
                return;
            }

            /** 读取文章
             * https://raw.githubusercontent.com/Val-istar-Guo/BlogArticle/dev/articles/*.md
             */
            var p = path.join("raw.githubusercontent.com/Val-istar-Guo/BlogArticle/dev/articles/", encodeURI(rows[0].path));

            readRemoteFile("https://" + p, function(err, data) {
                if (err) {
                    fail();
                    return;
                }

                // Finsh
                success(mine.json, JSON.stringify({
                    cnt: data.toString('utf8')
                }));
            });

            conn.release();
        });

    });

};
