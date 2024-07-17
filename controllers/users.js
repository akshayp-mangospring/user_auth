const User = require('../models/User');
const { isEmail } = require('../utils');

const getLoginFilterFields = (field) => {
  let loginField = {};

  if (isEmail(field)) {
    loginField.email = field;
  } else {
    loginField.username = field;
  }

  return {
    where: loginField,
  };
};

const registerUser = async (r, w) => {
  try {
    const { username, password, email } = r.body;

    const user = await User.create({
      username,
      email,
      password: User.prototype.generateHash(password),
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      auth_token: user.createToken(),
    };
  } catch (err) {
    console.error('Error creating User:', err);
    throw err;
  }
};

const loginUser = async (r, w) => {
  try {
    const { login_field, password } = r.body;
    const user = await User.findOne(getLoginFilterFields(login_field));

    if (user.validatePassword(password)) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        auth_token: user.createToken(),
      };
    }
  } catch (err) {
    console.error('Error logging in the User:', err);
    throw err;
  }
};

const editUser = (r, w) => {

};

const deleteUser = (r, w) => { };

module.exports = {
  registerUser,
  loginUser,
  editUser,
  deleteUser
};
