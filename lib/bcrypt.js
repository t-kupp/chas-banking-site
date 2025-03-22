const bcrypt = require("bcrypt");

const saltRounds = 10;

export async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function comparePasswords(clearPassword, storedPassword) {
  try {
    const isMatch = await bcrypt.compare(clearPassword, storedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}
