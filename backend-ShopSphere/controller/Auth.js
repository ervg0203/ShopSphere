const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    username,
    phone,
    gender,
    birthDate,
    image,
    addresses,
    university,
    company,
  } = req.body;

  const user = new User({
    email,
    password,
    firstName,
    lastName,
    username,
    phone,
    gender,
    birthDate,
    image,
    university,
    company,
    role: "user",
    addresses: Array.isArray(addresses) ? addresses : [],
    name: [firstName, lastName].filter(Boolean).join(" ").trim(),
  });

  try {
    const doc = await user.save();
    res.status(201).json({
      id: doc.id,
      role: doc.role,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      username: doc.username,
      imageUrl: doc.image,
      phone: doc.phone,
      name: doc.name,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    // TODO: this is just temporary, we will use strong password auth
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password === req.body.password) {
      // TODO: We will make addresses independent of login
      res.status(200).json({
        id: user.id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        imageUrl: user.image,
        phone: user.phone,
        name: user.name,
      });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
