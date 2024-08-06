const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../Controllers/auth/verifyToken");
const { sendEmail } = require('../Helpers/email');
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const db = require("../models/index");
const Deposit = db.deposit;
const User = db.user;

const Deposits = async (req, res) => {
    try {
        const { amount , currency } = req.body;
        const userId = req.params.id
        

        

        if (!amount || amount <= 0) {
            return res.status(400).send({
                status: false,
                message: 'Invalid amount'
            });
        }

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(400).send({
                status: false,
                message: 'User not found'
            });
        }

        const charge = 1000;
        const totalAmount = amount * charge;
        const result = await Deposit.create({
            deposit_id: uuidv4(),
            user_id: user.id,
            amount: amount,
            total: totalAmount,
            currency:currency,
            status: false
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

const getDeposits = async (req, res) => {
    try {
        const result = await Deposit.findAll();

        if (result.length === 0) {
            return res.status(400).send({
                status: false,
                message: "No deposits found"
            });
        }

        res.status(200).send({
            status: true,
            message: "Deposits fetched successfully",
            result
        });
    } catch (error) {
        console.error("Error fetching deposits:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};

const getDepositsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;

        const result = await Deposit.findAll({
            where: { user_id: user_id }
        });

        if (!result || result.length === 0) {
            return res.status(400).send({
                status: false,
                message: "User deposits not found"
            });
        }

        res.status(200).send({
            status: true,
            message: "Details found",
            result
        });
    } catch (error) {
        console.error("Error fetching deposits by user ID:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};

module.exports = {
    Deposits,
    getDeposits,
    getDepositsByUserId
};
