const User = require('../models/userModel');
const transporter = require('../configs/email');
const jwt = require('jsonwebtoken');

class UserService {
  static async registerUser(userData) {
    userData.verificationCode = Math.floor(100000 + Math.random() * 900000);
    const newUser = await User.create(userData);

    // Send verification email
    await sendVerificationEmail(newUser.email, newUser.verificationCode);
    return newUser;
  }

  static async verifyUser(email, verificationCode) {
    const user = await User.findOne({ where: { email, verificationCode } });

    if (!user) {
      throw new Error('Invalid verification code');
    }

    user.verified = true;
    await user.save();
    return user;
  }

  static async loginUser(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    const userJson = user.toJSON();
    const token = jwt.sign(userJson, 'key', { expiresIn: '1h' });
    userJson.token = token;
    return userJson;
  }
}

async function sendVerificationEmail(email, verificationCode) {
  try {
    await transporter.sendMail({
      from: 'your_email@example.com', // Your email address
      to: email,
      subject: 'Verify Your Email Address',
      text: `Your verification code: ${verificationCode}`
    });
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

module.exports = UserService;
