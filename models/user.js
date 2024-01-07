const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "serverdb",
  password: "123qweasz",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database", err);
    return;
  }
});

const sql = ` 
  CREATE TABLE IF NOT EXISTS users( 
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    age INT NOT NULL, 
    isAdmin INT 
  ) 
`;

connection.query(sql, (err, results) => {
  if (err) {
    console.error("Error creating users table", err);
    return;
  }
});

class User {
  constructor() {}

  static create(dataForm, cb) {
    const { name, email, password, age, isAdmin } = dataForm;

    const sql =
      "INSERT INTO users (name, email, password, age, isAdmin) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [name, email, password, age, isAdmin],
      (err, results) => {
        if (err) {
          console.error("Error creating user", err);
          return cb(err);
        }
        cb(null, results.insertId);
      }
    );
  }

  static findByEmail(email, cb) {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], (err, rows) => {
      if (err) {
        console.error("Error finding user by email", err);
        return cb(err);
      }
      if (!rows || rows.length === 0) {
        return cb(null, null);
      }
      cb(null, rows[0]);
    });
  }

  static authentificate(dataForm, cb) {
    User.findByEmail(dataForm.email, (err, user) => {
      if (err) {
        console.error("Error authenticating user", err);
        return cb(err);
      }

      if (!user) {
        return cb();
      }

      if (dataForm.password === user.password) {
        cb(null, user);
      } else {
        cb();
      }
    });
  }
}

module.exports = User;
