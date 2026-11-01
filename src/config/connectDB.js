import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import dns from 'dns';
dotenv.config();

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const port = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306;
const isSSL = process.env.DATABASE_SSL === 'true' || port !== 3306;

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: port,
    user: process.env.DATABASE_USER || '99bigdaddy',
    password: process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : '99bigdaddy',
    database: process.env.DATABASE_NAME || '99bigdaddy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: isSSL ? { rejectUnauthorized: false } : undefined
});

// Configure session sql_mode to avoid ANSI_QUOTES conflicts with double-quoted queries
connection.on('connection', (conn) => {
    conn.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'");
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
