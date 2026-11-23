// Database configuration
const { Sequelize } = require('sequelize');
require('dotenv').config();

const useDatabaseUrl = Boolean(process.env.DATABASE_URL);
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  useDatabaseUrl
    ? process.env.DATABASE_URL
    : process.env.DB_NAME || 'hireready',
  useDatabaseUrl ? undefined : process.env.DB_USER || 'postgres',
  useDatabaseUrl ? undefined : process.env.DB_PASSWORD || 'postgres',
  {
    ...(useDatabaseUrl ? {} : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
    }),
    dialect: 'postgres',
    ...(isProduction ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } } : {}),
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = { sequelize };
