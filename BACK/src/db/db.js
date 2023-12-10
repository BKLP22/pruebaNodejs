const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');

const pool = mysql.createPool(dbConfig);

module.exports = {
  query: async (sql, values) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release();
    }
  },
};
