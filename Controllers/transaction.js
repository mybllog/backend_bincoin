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
const Deposit = db.deposit;
const Withdraw = db.withdraw
const Transaction = db.transaction
const postTransaction = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).send('User not found');
        }
          
        const userDeposit = await Deposit.findOne({ where: { id: userId } });
        const userWithdrawal = await Withdraw.findOne({ where: { id: userId } });

        if (!userDeposit && !userWithdrawal) {
            return res.status(400).send({
                status: false,
                message: 'User deposits and withdrawals not found'
            });
        }

        let amount, deposit_id, withdraw_id, account_type;

        if (userDeposit) {
            account_type = 'deposit'; // Set account_type based on where you find data
            amount = userDeposit.total;
            deposit_id = userDeposit.deposit_id;
        } else{
            return res.status(400).send({
                status: false,
                message: 'Unable to determine account type'
            });
        }
        
        
        
        if (userWithdrawal) {
            account_type = 'withdrawal'; // Set account_type based on where you find data
            amount = userWithdrawal.amount;
            withdraw_id = userWithdrawal. withdrawal_id;
        }  else{
            return res.status(400).send({
                status: false,
                message: 'Unable to determine account type'
            });
        }

        const result = await Transaction.create({
            deposit_id,
            withdraw_id,
            charge: userDeposit ? userDeposit.charge : null,
            currency: userDeposit ? userDeposit.currency : null,
            account_type,
            amount,
            status: true // Assuming withdrawal is successful, so status is set to true
        });

        if (!result) {
            return res.status(400).send({
                status: false,
                message: "Unable to insert transaction record"
            });
        }

        res.status(200).send({
            status: true,
            message: "Transaction successfully recorded",
            result
        });

    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};

const getTransaction = async(req,res) =>{
    try {
        
        const result = await Transaction.findAll()

        if(!result || result.length === 0){
            res.status(400).send({
                status:false,
                message:"Transaction not found"
            })
        }

        res.status(200).send({
            status:true,
            message:"widthdrawal fetched successfully"
        })
    } catch (error) {
        
    }
}

module.exports = {
    postTransaction,
    getTransaction
};
