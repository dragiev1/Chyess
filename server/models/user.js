const con = require("./db_connect")
const bcrypt = require("bcrypt")

async function createUserTable() {
  let sql =   `CREATE TABLE IF NOT EXISTS User (
    userId INT AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT id PRIMARY KEY(userId)
  ); `

  await con.query(sql)
}

createUserTable()

// Login

async function login(user) {
  let cUser = await getUserByEmail(user.email)
  if(!cUser) throw Error("Email not found.")

  let match = await bcrypt.compare(user.password, cUser.password)
  if(!match) throw Error("Incorrect Password.")

  return cUser
}

async function getUserByEmail(email) {
  let sql = `
    SELECT * FROM User
    WHERE email=?
  `
  let cUser = await con.query(sql, [email])
  return cUser[0]
}

async function getAllUsers() {
  let sql = `
    SELECT * FROM User;
  `
  let users = await con.query(sql)
  return users
}


// Register

async function register(user) {
  let cUser = await getUserByEmail(user.email)
  if(cUser) throw Error("Email already in use!")
  
  let hashPass = await bcrypt.hash(user.password, 10)

  let sql = `
    INSERT INTO User(firstName, lastName, password, email)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [user.firstName, user.lastName, hashPass, user.email])
  return await login(user)
}

async function logout(userId, metadata = {}) {
  console.log(`User ${userId} logged out}`, metadata);  
  return { success: true, message: "Logout successful" };
}

module.exports = {getAllUsers, login, register}