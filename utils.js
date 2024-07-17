const isEmail = (s) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(s);
};

module.exports = {
  isEmail,
};
