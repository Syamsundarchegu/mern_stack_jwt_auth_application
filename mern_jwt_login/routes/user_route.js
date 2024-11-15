const router = require("express").Router();
const registerSchema = require("../models/registerSchema");
const jwt = require("jsonwebtoken");
const jwt_middleware = require("../middleware/jwt_middleware");

router.post("/register", async function (req, res) {
  const { username, email, password, confirmpassword } = req.body;
  let exist = await registerSchema.findOne({ email: email });
  if (exist) {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (password !== confirmpassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  const newUser = new registerSchema({
    username: username,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  });
  await newUser.save();
  res.status(200).send({ message: "Sucesssfully new User is save into db" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exist = await registerSchema.findOne({ email: email });
  if (!exist) {
    return res.status(400).json({ error: "User not found" });
  }
  if (password !== exist.password) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const payload = {
    user: {
      id: exist._id,
    },
  };
  const secret = "jwt-secret";
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  res.status(200).send({ message: token });
});

router.get("/profile", jwt_middleware, async (req, res) => {
  try {
    let exist = await registerSchema.findById(req.user.id);
    if (!exist) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).send({ message: exist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/home", (req, res) => {
  res.status(200).send({ message: "Welcome to home componet" });
});

module.exports = router;
