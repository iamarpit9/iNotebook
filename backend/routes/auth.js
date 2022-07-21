const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // bcryptjs
const jwt = require("jsonwebtoken"); // jsonwebtoken
const { body, validationResult } = require("express-validator"); // express-validator
const getUser = require("../Middleware/getUser");

const JWT_SECRET = "App@Notebook";

// ROUTE1: Create a User using: POST "api/auth/createuser" No Login required

router.post(
  "/createuser",
  [
    // Express-Validator
    body("email", "Invalid email").isEmail(),
    body("name", "Invalid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // req--> Request ,res--> Response

    // Return Bad Request if errors occur
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = false;
    //Check wether user with same email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }

      // Password hashing using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET); // Creating token to send user as response
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// ROUTE2: Authenticate a User using: POST "api/auth/login" No Login required

router.post(
  "/login",
  [
    // Express-Validator
    body("email", "Invalid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    // Return Bad Request if errors occur
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Checking the email and password entered by user to login
    let success = false;

    try {
      let user = await User.findOne({ email });

      // If entered email doesn't exist in db
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct ceredentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      // If entered password is incorrect
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct ceredentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

// ROUTE3: Get loggedin user details using: POST "api/auth/getuser" Login required

router.post("/getuser", getUser, async (req, res) => {
  // getUser is a middleware

  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

module.exports = router;
