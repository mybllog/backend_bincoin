const express = require("express");
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)
const fs = require("fs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const authRoutes = require('./routes/auth.routes')

  const db = require('./models');
  db.sequelize.sync();
  
  app.use('/auth', authRoutes)
  
  
  
  
  // Run the server!
  const start = async () => {
    try {
      const PORT = parseInt(config.PORT);
      await app.listen({ port: 5000 });
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  start();
  
  exports.default = app;
  