const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../../mongo/config/mongodb');

//signup controller
async function signup(req, res) {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    //email val checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }
    //username val checks
    if (username.length < 3 || username.length > 15) {
        return res.status(400).json({ message: 'Username must be between 3 and 15 characters long.' });
    }
    //Password val checks
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one uppercase letter.' });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one lowercase letter.' });
    }
    if (!/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one number.' });
    }
    if (!/[@$!%*?&]/.test(password)) {
        return res.status(400).json({ message: 'Password must include at least one special character (@$!%*?&).' });
    }

    const db = getDB();
    const usersCollection = db.collection('users');

    //check if user already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    //check if email already exists
    const existingEmail = await usersCollection.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email linked to another account' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //insert new user
    const newUser = { username: username, email: email, password: hashedPassword, createdAt: new Date() };
    await usersCollection.insertOne(newUser);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {

    //database fail :skull:
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



async function signin(req, res) {
  try {
      const {email, password} = req.body;

      //basic validation
      if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      //confirm password from db
      const db = getDB();
      const usersCollection = db.collection('users');
      //find user by email
      const user = await usersCollection.findOne({ email: email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      //successful login and generate JWT token
      const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'Strict', 
          maxAge: 3600000 
      });
      return res.status(200).json({ message: 'Signin successful' });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getuser(req, res) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ username: decoded.user });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { signup, signin, getuser };
