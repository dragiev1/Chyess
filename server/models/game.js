import { query } from "./db_connect";

async function createGameRequestTable() {
  let sql = `CREATE TABLE IF NOT EXISTS GameRequest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requesterId INT NOT NULL,
    mode ENUM('singleplayer', 'multiplayer') NOT NULL,
    timeControl ENUM('bullet', 'blitz', 'rapid', 'classical') NOT NULL,
    playerColor ENUM('white', 'black', 'random') NOT NULL,
    status ENUM('pending', 'matched', 'cancelled', 'expired') DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    matchedAt DATETIME NULL,
    opponentId INT NULL,
    FOREIGN KEY (requesterId) REFERENCES User(userId),
    FOREIGN KEY (opponentId) REFERENCES User(userId),
    INDEX idx_pending (status, timeControl, mode)
  );`;
  await query(sql);
}

// Game Request

async function createGameRequest(request) {
  let sql = `
    INSERT INTO GameRequest (requesterId, mode, timeControl, playerColor, status)
    VALUES (?, ?, ?, ?, 'pending')
  `;
  let result = await query(sql, [
    request.requesterId,
    request.mode,
    request.timeControl,
    request.playerColor
  ]);
  return { id: result.insertId, ...request, status: 'pending' };
}

async function findMatch(gameRequest) {
  // Look for pending requests.
  let sql = `
    SELECT * FROM GameRequest
    WHERE id != ?
      AND status = 'pending'
      AND mode = ?
      AND timeControl = ?
      AND playerColor IN (?, 'random')
      AND requesterId != ?
    ORDER BY createdAt ASC
    LIMIT 1
  `;
  
  // Determine what color the opponent should get.
  const opponentColor = gameRequest.playerColor === 'random' 
    ? ['white', 'black'][Math.floor(Math.random() * 2)] 
    : (gameRequest.playerColor === 'white' ? 'black' : 'white');

  let matches = await query(sql, [
    gameRequest.id,
    gameRequest.mode,
    gameRequest.timeControl,
    opponentColor,
    gameRequest.requesterId
  ]);

  if (matches.length > 0) {
    const match = matches[0];
    // Mark both requests as matched.
    await query('UPDATE GameRequest SET status = ?, matchedAt = NOW(), opponentId = ? WHERE id = ?', 
      ['matched', match.requesterId, gameRequest.id]);
    await query('UPDATE GameRequest SET status = ?, matchedAt = NOW(), opponentId = ? WHERE id = ?', 
      ['matched', gameRequest.requesterId, match.id]);
    
    return {
      request1: { ...gameRequest, opponentId: match.requesterId },
      request2: { ...match, opponentId: gameRequest.requesterId }
    };
  }
  return null;
}

async function cancelGameRequest(requestId, userId) {
  let sql = `
    UPDATE GameRequest 
    SET status = 'cancelled' 
    WHERE id = ? AND requesterId = ? AND status = 'pending'
  `;
  let result = await query(sql, [requestId, userId]);
  return result.affectedRows > 0;
}

// Get pending requests for a user
async function getPendingRequests(userId) {
  let sql = `SELECT * FROM GameRequest WHERE requesterId = ? AND status = 'pending'`;
  return await query(sql, [userId]);
}

module.exports = {  
  createGameRequestTable,
  createGameRequest,
  findMatch,
  cancelGameRequest,
  getPendingRequests,
};