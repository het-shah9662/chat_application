const { poolPromise } = require('../config/db');

async function addMessage(username, text, time) {
  const pool = await poolPromise;
  await pool.request()
    .input('username', username)
    .input('text', text)
    .input('time', time)
    .query('INSERT INTO Messages (username, text, time) VALUES (@username, @text, @time)');
}

async function getAllMessages() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Messages ORDER BY id ASC');
  return result.recordset;
}

module.exports = { addMessage, getAllMessages };
