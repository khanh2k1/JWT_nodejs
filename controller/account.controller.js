const brcypt = require("bcrypt");
const Account = require("../models/account.model");
const jwt = require('jsonwebtoken')
require("dotenv").config();


const accountController = {
  
  // get all account
  getAllAccount: async (req, res) => {
    try {
      const allAccount = await Account.find();
      if (allAccount) {
        
        const accounts_no_password = await allAccount.map((account)=>{
            const{password, ...others} = account['_doc']
            return others
        })

        console.log(accounts_no_password)
        
        
        return res.status(200).json(accounts_no_password);
      } else {
        console.log("khong tim thay !");
        return res.status(404).json("Khong tim thay !");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // deleteAccount
  deleteAccount: async (req, res) => {
    try {
        const account = await Account.findOne({name: req.params.id})
        if(account) {
            await account.deleteOne()
            console.log('Delete account success !')
        }
        else {
            console.log('Delete account fail !')
            return res.status(404).json("account not found !");

        }
    } catch (error) {
        return res.status(500).json(error);
    }
  }
};

module.exports = accountController;
