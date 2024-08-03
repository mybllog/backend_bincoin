const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../Controllers/auth/verifyToken");
const { sendEmail } = require('../Helpers/email');
const { DataTypes } = require("sequelize");
const db = require("../models/index");
const { v4: uuidv4 } = require('uuid');
const Withdraw = db.withdraw
const Wallet = db.wallet
const postWithdraw = async (req, res) => {
    try {
        const { amount , currency } = req.body;
        const walletID = req.params.id;
       
        if (!walletID) {
            return res.status(400).json({
                status: false,
                message: 'wallet_id not found'
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                status: false,
                message: 'Amount must be greater than zero'
            });
        }

        const userWallet = await Wallet.findOne({ where: { id: walletID } });

        if (!userWallet) {
            return res.status(400).send({
                status: false,
                message: 'Wallet not found or does not belong to the user'
            });
        }

        const userResult = userWallet.balances;

        // Check if the wallet has sufficient funds
        if (amount > userResult) {
            return res.status(400).send({
                status: false,
                message: 'Insufficient funds'
            });
        }

        // Deduct the amount from the wallet
        const balanceResult = userResult - amount; // Updated here
        await Wallet.update({
            balances: balanceResult,
            status: true
        }, {
            where: { id: walletID }
        });

        // Create the withdrawal record with the unique withdrawal_id and status set to true
        const result = await Withdraw.create({
            withdrawal_id: uuidv4(),
            user_id: userWallet.user_id,
            wallet_id: userWallet.id,
            amount: amount,
            currency: currency,
            status: true // Withdrawal is successful, so status is set to true
        });

        if (!result) {
            return res.status(400).send({
                status: false,
                message: "Unable to insert successfully"
            });
        }

        res.status(200).send({
            status: true,
            message: "Successfully inserted",
            result
        });

    } catch (error) {
        console.error("Error creating deposit:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};

const getWithdrawal = async(req,res) =>{
    try {
        
        const result = await Withdraw.findAll()

        if(!result){
            res.status(400).send({
                status:false,
                message:"widthdrawal not found"
            })
        }

        res.status(200).send({
            status:true,
            message:"widthdrawal fetched successfully",result
        })
    } catch (error) {
        console.error("Error creating deposit:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
}

module.exports = {
    postWithdraw ,
    getWithdrawal
};
