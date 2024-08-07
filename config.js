require('dotenv').config(
    process.env.NODE_ENV === 'production' ? { path: `.env.production` } : null
  );
  
  module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USERNAME: process.env.MYSQL_USERNAME,
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DOCKER_PORT: process.env.DOCKER_PORT,
  
  STMP_HOST:process.env.STMP_HOST ,
  STMP_HOST:process.env.STMP_HOS ,
  STMP_PORT:process.env.STMP_PORT,
  SMTP_USER:process.env.SMTP_USER ,
  SMTP_USE:process.env.SMTP_USE,
  SMTP_PASS:process.env.SMTP_PASS ,
  SMTP_PAS:process.env.SMTP_PAS,
  EMAIL_FRO:process.env.EMAIL_FRO ,
  EMAIL_FROM:process.env.EMAIL_FROM ,
  
  ACCESS_TOKEN_PRIVATE_KEY:process.env.ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY:process.env.REFRESH_TOKEN_PRIVATE_KEY,

  EMAIL_VERIFICATION_TOKEN:process.env.EMAIL_VERIFICATION_TOKEN,
  PAYSTACK_SECRET_KEY:process.env.PAYSACK_TOKEN,
  FLUTTERWAVE_SECRET_KEY:process.env.FLUTTERWAVE_SECRET_KEY,
  ADMIN_VERIFY_TOKEN: process.env.ADMIN_VERIFY_TOKEN,
  //CONF_ENV_FILE: process. env.CONF_ENV_FILE|| "/usr/local/etc/rabbitmq/rabbitmq-env.conf" /usr/local/opt/rabbitmq/sbin/rabbitmq-server, 
  rabbitMQ_URL: process.env.rabbitMQ_URL,
    
  
    BASE_URL: process.env.BASE_URL,
    BASE_TEST_URL: process.env.BASE_TEST_URL,
  };
  