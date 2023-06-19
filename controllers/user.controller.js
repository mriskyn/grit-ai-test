const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({
      where: { email: data.email },
      password: data.password,
    });

    console.log({ user });
    if (!user) {
      res.status(400).json({
        message: "Wrong Email or Password",
      });
      return;
    }

    const token = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      process.env.SECRET_KEY
    );

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.register = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.create(data);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
