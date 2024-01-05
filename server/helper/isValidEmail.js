const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const consecutiveDotRegex = /\.{2,}/;

  return emailRegex.test(email) && !consecutiveDotRegex.test(email);
};

module.exports = isValidEmail;
