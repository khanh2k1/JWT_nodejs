const brcypt = require("bcrypt");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (account) => {
  return jwt.sign(
    {
      id: account._id,
      isAdmin: account.isAdmin,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "10h" }
  );
};

const generateRefreshToken = (account) => {
  return jwt.sign(
    {
      id: account._id,
      isAdmin: account.isAdmin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "10h" }
  );
};

const authController = {
  // register
  registerAccount: async (req, res) => {
    try {
      const salt = await brcypt.genSalt(10);
      const hashed = await brcypt.hash(req.body.password, salt);

      // create a account
      const newAccount = await new Account({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        isAdmin: req.body.isAdmin,
      });

      // check account is exist ?
      const existAccount = await Account.findOne({ name: req.body.name });
      if (existAccount) {
        const { password, ...others } = existAccount["_doc"];
        return res.status(401).json({
          message: "Existing !",
          others,
        });
      } else {
        // save account
        await newAccount.save();
        console.log("create account success !");
        console.table(newAccount);
        const { password, ...others } = newAccount["_doc"];
        return res.status(200).json({
          message: "create account success !",
          new_acount: others,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
  // login
  login: async (req, res) => {
    try {
      const account = await Account.findOne({ name: req.body.name });
      if (account) {
        const validPassword = await brcypt.compare(
          req.body.password,
          account.password
        );
        // khi dang nhap thanh cong
        if (validPassword) {
          const access_token = generateToken(account);
          const refresh_token = generateRefreshToken(account);
          const { password, ...others } = account["_doc"];

          // access_token => redux store
          // refresh_token => httponly_cookies
          res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: false,
            path: "/",
            samSite: "Strict",
          });
          req.headers.token = access_token;
          return res.status(200).json({ others, access_token });
        } else {
          return res.status(404).json("Wrong password !");
        }
      } else {
        return res.status(404).json("Khong tim thay Account");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  },
};

module.exports = authController;
