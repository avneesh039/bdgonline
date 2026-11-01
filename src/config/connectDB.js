import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || '99bigdaddy',
    password: process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : '99bigdaddy',
    database: process.env.DATABASE_NAME || '99bigdaddy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Database connection successful. Test query result:', rows[0].solution);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection();

export default connection;
