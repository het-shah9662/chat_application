const { poolPromise } = require('../config/db');

async function addUser(username, socketId) {
  const pool = await poolPromise;
  await pool.request()
    .input('username', username)
    .input('socketId', socketId)
    .query('INSERT INTO Users (username, socketId) VALUES (@username, @socketId)');
}

async function removeUser(socketId) {
  const pool = await poolPromise;
  await pool.request()
    .input('socketId', socketId)
    .query('DELETE FROM Users WHERE socketId = @socketId');
}

async function getUsers() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
}

module.exports = { addUser, removeUser, getUsers };
