const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
exports.registerAdmin = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const adminExists =
      await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message:
          "Admin already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Admin
exports.loginAdmin = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const admin =
      await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};