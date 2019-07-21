const mysql = require('mysql');
const sqlhelper = require('./sqlhelper');
const connection = mysql.createConnection(sqlhelper.connectionConfig);

const articleModel = {
    getArticle(callback) {
        let sql = 'select * from article';
        connection.query(sql, (err, results, fields) => {
            if (err) {
                callback(err)
            }
            callback(null, this.getRanmdon(results));

        })
    },
    getRanmdon(data, num = 2) {
        let ran = Math.floor(Math.random() * 5);
        return data.slice(ran, ran + 2);
    },
    getSearchArticle(search, callback) {
        let sql = "select * from article where title or content like '%" + search + "%'";
        connection.query(sql, (err, results, fields) => {
            if (err) {
                callback(err)
            }
            callback(null, results);

        })
    }
};
module.exports = articleModel;