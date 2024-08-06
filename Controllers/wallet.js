const validator = require("validator"); // validating the form with validators
const bcrypt = require("bcrypt"); // for hashing passwords
const saltRounds = 10; // set saltrounds to 10
const jwt = require("jsonwebtoken"); // import jsonwebtoken
const config = require("../config");
const verifyToken = require("../Controllers/auth/verifyToken");
const { sendEmail } = require('../Helpers/email');
const { DataTypes, where } = require("sequelize");
const db = require("../models/index");
const email = require("../Helpers/email");
const Wallet = db.wallet;
const Deposit = db.deposit;

const Wallets = async (req, res) => {
    try {
        
       const  user_id = req.params.user_id

        // Input validation
      
        console.log('user_id:', user_id);
        

       

        const deposit = await Deposit.findOne({ where: { user_id: user_id } });

        if (!deposit) {
            return res.status(400).json({
                status: false,
                message: 'Deposit not found'
            });
        }

          // Fetch the existing wallet balance for the user
          const wallet = await Wallet.findOne({ where: { user_id } });

          // Calculate new total balance
          const newDepositAmount = parseFloat(deposit.total); // Replace with actual deposit amount if available
          const existingBalance = wallet ? parseFloat(wallet.balances ): 0.00;
          const newTotalBalance = existingBalance + newDepositAmount;
         
        

       
        if (newTotalBalance <= 0) {
            return res.status(400).json({
                status: false,
                message: "Total balances not valid"
            });
        }

        const status = true;

        // Update the deposit status to true if the deposit amount is valid
        await Deposit.update(
            {
                
                status: status
            },
            { where: { id: deposit.id } }
        );

        const result = await Wallet.create({
            deposit_id: deposit.id,
            user_id:deposit.user_id,
            balances: newTotalBalance,
            currency:deposit.currency,
            status: status
        });

        if (!result) {
            return res.status(400).json({
                status: false,
                message: "Unable to insert successfully"
            });
        }

        res.status(200).json({
            status: true,
            message: "Successfully inserted",
            result
        });

    } catch (error) {
        console.error("Error creating wallet:", error);
        res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};

const getWallet = async (req, res) => {
    try {
        const result = await Wallet.findAll();

        if (result.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No balances found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deposits fetched successfully",
            result
        });
    } catch (error) {
        console.error("Error fetching wallets:", error);
        res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};


module.exports = {
    getWallet,
    Wallets
};
