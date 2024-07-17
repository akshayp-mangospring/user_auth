const dotEnv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const { parsed: { TOKEN_KEY } } = dotEnv;
const db = require('../config/db');

const User = db.define('users', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true // Additional validation to ensure it's not empty
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100], // Minimum length of 8 characters
        msg: "Password must be at least 8 characters long"
      },
      isComplex(value) {
        // Custom validation for password complexity
        if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[^a-zA-Z0-9]/.test(value)) {
          throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true // Validation to ensure the value is a valid email address
    }
  }
});

// Can't use arrow functions here
User.prototype.generateHash = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

// Can't use arrow functions here
User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Can't use arrow functions here
User.prototype.createToken = function () {
  return jwt.sign({ id: this.id, username: this.username, email: this.email }, TOKEN_KEY);
};

// Can't use arrow functions here
User.prototype.validateToken = function (token) {
  return jwt.verify(token, TOKEN_KEY);
};

module.exports = User;
