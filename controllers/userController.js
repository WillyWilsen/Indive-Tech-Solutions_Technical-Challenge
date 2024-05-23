const UserService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Call the user service to register the user
    const newUser = await UserService.registerUser(userData);

    // Respond with the new user
    res.json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the user service to login the user
    const user = await UserService.loginUser(email, password);

    // Respond with the logged in user
    res.json(user);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.verifyUser = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Call the user service to verify the user
    const user = await UserService.verifyUser(email, verificationCode);

    // Respond with the verified user
    res.json(user);
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
