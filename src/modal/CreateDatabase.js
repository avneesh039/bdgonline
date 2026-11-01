import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

const timeNow = Date.now();

const host = process.env.DATABASE_HOST || 'localhost';
const user = process.env.DATABASE_USER || '99bigdaddy';
const password = process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : '99bigdaddy';
const database = process.env.DATABASE_NAME || '99bigdaddy';

async function initDatabase() {
    console.log(`Connecting to MySQL host: ${host}...`);
    
    // First connect without specifying database to ensure DB exists
    const rootConn = await mysql.createConnection({
        host,
        user,
        password
    });

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`Database '${database}' is ready.`);
    await rootConn.end();

    // Connect to the specific database
    const conn = await mysql.createConnection({
        host,
        user,
        password,
        database
    });

    console.log(`Connected to database '${database}'. Initializing schema...`);

    const tableQueries = [
        `CREATE TABLE IF NOT EXISTS \`users\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_user\` VARCHAR(50) DEFAULT NULL,
            \`phone\` VARCHAR(20) NOT NULL UNIQUE,
            \`name_user\` VARCHAR(100) DEFAULT NULL,
            \`password\` VARCHAR(255) NOT NULL,
            \`plain_password\` VARCHAR(255) DEFAULT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`total_money\` DOUBLE NOT NULL DEFAULT 0,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`ctv\` VARCHAR(50) DEFAULT '',
            \`veri\` TINYINT NOT NULL DEFAULT 1,
            \`otp\` VARCHAR(20) DEFAULT NULL,
            \`token\` VARCHAR(255) DEFAULT NULL,
            \`ip_address\` VARCHAR(50) DEFAULT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 1,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`time_otp\` VARCHAR(50) DEFAULT NULL,
            \`user_level\` INT NOT NULL DEFAULT 0,
            \`level\` INT NOT NULL DEFAULT 0,
            \`rank\` INT NOT NULL DEFAULT 0,
            \`roses_f\` DOUBLE NOT NULL DEFAULT 0,
            \`roses_f1\` DOUBLE NOT NULL DEFAULT 0,
            \`roses_today\` DOUBLE NOT NULL DEFAULT 0,
            \`free_bonus\` DOUBLE NOT NULL DEFAULT 0,
            \`first_deposit\` TINYINT NOT NULL DEFAULT 0,
            INDEX \`idx_users_phone\` (\`phone\`),
            INDEX \`idx_users_code\` (\`code\`),
            INDEX \`idx_users_invite\` (\`invite\`),
            INDEX \`idx_users_token\` (\`token\`),
            INDEX \`idx_users_level\` (\`level\`),
            INDEX \`idx_users_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`point_list\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`telegram\` VARCHAR(255) DEFAULT '',
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`money_us\` DOUBLE NOT NULL DEFAULT 0,
            \`level\` INT NOT NULL DEFAULT 0,
            \`total1\` DOUBLE NOT NULL DEFAULT 0,
            \`total2\` DOUBLE NOT NULL DEFAULT 0,
            \`total3\` DOUBLE NOT NULL DEFAULT 0,
            \`total4\` DOUBLE NOT NULL DEFAULT 0,
            \`total5\` DOUBLE NOT NULL DEFAULT 0,
            \`total6\` DOUBLE NOT NULL DEFAULT 0,
            \`total7\` DOUBLE NOT NULL DEFAULT 0,
            INDEX \`idx_point_list_phone\` (\`phone\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`admin\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`wingo1\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`wingo3\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`wingo5\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`wingo10\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k5d\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k5d3\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k5d5\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k5d10\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k3d\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k3d3\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k3d5\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`k3d10\` VARCHAR(255) NOT NULL DEFAULT '-1',
            \`win_rate\` INT NOT NULL DEFAULT 80,
            \`telegram\` VARCHAR(255) DEFAULT '',
            \`cskh\` VARCHAR(255) DEFAULT '',
            \`app\` VARCHAR(255) DEFAULT '',
            \`recharge_bonus\` INT NOT NULL DEFAULT 0,
            \`recharge_bonus_2\` INT NOT NULL DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`wingo\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`period\` VARCHAR(50) NOT NULL,
            \`amount\` INT NOT NULL DEFAULT 0,
            \`game\` VARCHAR(20) NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_wingo_period\` (\`period\`),
            INDEX \`idx_wingo_game\` (\`game\`),
            INDEX \`idx_wingo_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`minutes_1\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_product\` VARCHAR(50) DEFAULT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`stage\` VARCHAR(50) NOT NULL,
            \`level\` INT NOT NULL DEFAULT 0,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`amount\` INT NOT NULL DEFAULT 1,
            \`fee\` DOUBLE NOT NULL DEFAULT 0,
            \`get\` DOUBLE NOT NULL DEFAULT 0,
            \`game\` VARCHAR(20) NOT NULL,
            \`bet\` VARCHAR(20) NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`today\` VARCHAR(50) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`result\` VARCHAR(20) DEFAULT NULL,
            INDEX \`idx_min1_phone\` (\`phone\`),
            INDEX \`idx_min1_game\` (\`game\`),
            INDEX \`idx_min1_stage\` (\`stage\`),
            INDEX \`idx_min1_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`5d\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`period\` VARCHAR(50) NOT NULL,
            \`result\` VARCHAR(20) DEFAULT NULL,
            \`game\` INT NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_5d_period\` (\`period\`),
            INDEX \`idx_5d_game\` (\`game\`),
            INDEX \`idx_5d_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`result_5d\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_product\` VARCHAR(50) DEFAULT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`stage\` VARCHAR(50) NOT NULL,
            \`level\` INT NOT NULL DEFAULT 0,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`price\` DOUBLE NOT NULL DEFAULT 0,
            \`amount\` INT NOT NULL DEFAULT 1,
            \`fee\` DOUBLE NOT NULL DEFAULT 0,
            \`get\` DOUBLE NOT NULL DEFAULT 0,
            \`game\` INT NOT NULL,
            \`join_bet\` VARCHAR(20) DEFAULT NULL,
            \`bet\` VARCHAR(20) NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`result\` VARCHAR(20) DEFAULT NULL,
            INDEX \`idx_res5d_phone\` (\`phone\`),
            INDEX \`idx_res5d_game\` (\`game\`),
            INDEX \`idx_res5d_stage\` (\`stage\`),
            INDEX \`idx_res5d_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`k3\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`period\` VARCHAR(50) NOT NULL,
            \`result\` VARCHAR(20) DEFAULT NULL,
            \`game\` INT NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_k3_period\` (\`period\`),
            INDEX \`idx_k3_game\` (\`game\`),
            INDEX \`idx_k3_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`result_k3\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_product\` VARCHAR(50) DEFAULT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`stage\` VARCHAR(50) NOT NULL,
            \`level\` INT NOT NULL DEFAULT 0,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`price\` DOUBLE NOT NULL DEFAULT 0,
            \`amount\` INT NOT NULL DEFAULT 1,
            \`fee\` DOUBLE NOT NULL DEFAULT 0,
            \`get\` DOUBLE NOT NULL DEFAULT 0,
            \`game\` INT NOT NULL,
            \`join_bet\` VARCHAR(20) DEFAULT NULL,
            \`typeGame\` VARCHAR(50) DEFAULT NULL,
            \`bet\` VARCHAR(20) NOT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`result\` VARCHAR(20) DEFAULT NULL,
            INDEX \`idx_resk3_phone\` (\`phone\`),
            INDEX \`idx_resk3_game\` (\`game\`),
            INDEX \`idx_resk3_stage\` (\`stage\`),
            INDEX \`idx_resk3_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`recharge\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_order\` VARCHAR(100) NOT NULL,
            \`transaction_id\` VARCHAR(100) DEFAULT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`type\` VARCHAR(50) DEFAULT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`today\` VARCHAR(50) DEFAULT NULL,
            \`url\` TEXT DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`utr\` VARCHAR(100) DEFAULT NULL,
            INDEX \`idx_rec_phone\` (\`phone\`),
            INDEX \`idx_rec_id_order\` (\`id_order\`),
            INDEX \`idx_rec_status\` (\`status\`),
            INDEX \`idx_rec_type\` (\`type\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`withdraw\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_order\` VARCHAR(100) NOT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`stk\` VARCHAR(100) DEFAULT NULL,
            \`name_bank\` VARCHAR(100) DEFAULT NULL,
            \`name_user\` VARCHAR(100) DEFAULT NULL,
            \`ifsc\` VARCHAR(50) DEFAULT NULL,
            \`email\` VARCHAR(100) DEFAULT NULL,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`today\` VARCHAR(50) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            \`remark\` TEXT DEFAULT NULL,
            INDEX \`idx_wdr_phone\` (\`phone\`),
            INDEX \`idx_wdr_status\` (\`status\`),
            INDEX \`idx_wdr_id_order\` (\`id_order\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`user_bank\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`name_bank\` VARCHAR(100) DEFAULT NULL,
            \`name_user\` VARCHAR(100) DEFAULT NULL,
            \`stk\` VARCHAR(100) DEFAULT NULL,
            \`email\` VARCHAR(100) DEFAULT NULL,
            \`tinh\` VARCHAR(100) DEFAULT NULL,
            \`tp\` VARCHAR(100) DEFAULT NULL,
            \`sdt\` VARCHAR(100) DEFAULT NULL,
            \`chi_nhanh\` VARCHAR(100) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_ubank_phone\` (\`phone\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`bank_recharge\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`name_bank\` VARCHAR(100) DEFAULT NULL,
            \`name_user\` VARCHAR(100) DEFAULT NULL,
            \`stk\` VARCHAR(100) DEFAULT NULL,
            \`qr_code_image\` TEXT DEFAULT NULL,
            \`type\` VARCHAR(50) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_brec_type\` (\`type\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`level\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`level\` INT NOT NULL,
            \`f1\` DOUBLE NOT NULL DEFAULT 0,
            \`f2\` DOUBLE NOT NULL DEFAULT 0,
            \`f3\` DOUBLE NOT NULL DEFAULT 0,
            \`f4\` DOUBLE NOT NULL DEFAULT 0,
            INDEX \`idx_lvl_level\` (\`level\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`roses\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`f1\` DOUBLE NOT NULL DEFAULT 0,
            \`f2\` DOUBLE NOT NULL DEFAULT 0,
            \`f3\` DOUBLE NOT NULL DEFAULT 0,
            \`f4\` DOUBLE NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_roses_phone\` (\`phone\`),
            INDEX \`idx_roses_code\` (\`code\`),
            INDEX \`idx_roses_invite\` (\`invite\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`turn_over\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL UNIQUE,
            \`code\` VARCHAR(50) DEFAULT NULL,
            \`invite\` VARCHAR(50) DEFAULT NULL,
            \`daily_turn_over\` DOUBLE NOT NULL DEFAULT 0,
            \`total_turn_over\` DOUBLE NOT NULL DEFAULT 0,
            INDEX \`idx_turnover_phone\` (\`phone\`),
            INDEX \`idx_turnover_code\` (\`code\`),
            INDEX \`idx_turnover_invite\` (\`invite\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`salary\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`amount\` DOUBLE NOT NULL DEFAULT 0,
            \`type\` VARCHAR(50) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_salary_phone\` (\`phone\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`redenvelopes\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`id_redenvelope\` VARCHAR(100) NOT NULL,
            \`phone\` VARCHAR(20) NOT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`used\` INT NOT NULL DEFAULT 0,
            \`amount\` INT NOT NULL DEFAULT 1,
            \`status\` TINYINT NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_redenv_id\` (\`id_redenvelope\`),
            INDEX \`idx_redenv_phone\` (\`phone\`),
            INDEX \`idx_redenv_status\` (\`status\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`redenvelopes_used\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`phone_used\` VARCHAR(20) NOT NULL,
            \`id_redenvelops\` VARCHAR(100) DEFAULT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_redused_phone\` (\`phone\`),
            INDEX \`idx_redused_phone_used\` (\`phone_used\`),
            INDEX \`idx_redused_id\` (\`id_redenvelops\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`balance_transfer\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`sender_phone\` VARCHAR(20) NOT NULL,
            \`receiver_phone\` VARCHAR(20) NOT NULL,
            \`amount\` DOUBLE NOT NULL DEFAULT 0,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_btrans_sender\` (\`sender_phone\`),
            INDEX \`idx_btrans_receiver\` (\`receiver_phone\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS \`financial_details\` (
            \`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            \`phone\` VARCHAR(20) NOT NULL,
            \`phone_used\` VARCHAR(20) DEFAULT NULL,
            \`money\` DOUBLE NOT NULL DEFAULT 0,
            \`type\` VARCHAR(10) DEFAULT NULL,
            \`time\` VARCHAR(50) DEFAULT NULL,
            INDEX \`idx_fin_phone\` (\`phone\`),
            INDEX \`idx_fin_phone_used\` (\`phone_used\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
    ];

    for (const sql of tableQueries) {
        await conn.query(sql);
    }
    console.log("All 21 tables created successfully.");

    // Seed Admin settings
    const [adminRows] = await conn.query('SELECT * FROM admin');
    if (adminRows.length === 0) {
        await conn.execute("INSERT INTO `admin` (`id`, `wingo1`, `wingo3`, `wingo5`, `wingo10`, `k5d`, `k5d3`, `k5d5`, `k5d10`, `k3d`, `k3d3`, `k3d5`, `k3d10`, `win_rate`, `telegram`, `cskh`, `app`) VALUES (NULL, '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '80', 'https://t.me/99bigdaddy', 'https://t.me/99bigdaddy_support', '#')");
        console.log("Seeded admin settings.");
    }

    // Seed Level
    const [levelRows] = await conn.query('SELECT * FROM level');
    if (levelRows.length === 0) {
        await conn.execute("INSERT INTO level SET id = 7, level = 6, f1 = 1, f2 = 0.3, f3 = 0.09, f4 = 0.027");
        await conn.execute("INSERT INTO level SET id = 6, level = 5, f1 = 0.9, f2 = 0.27, f3 = 0.081, f4 = 0.0243");
        await conn.execute("INSERT INTO level SET id = 5, level = 4, f1 = 0.85, f2 = 0.255, f3 = 0.0765, f4 = 0.023");
        await conn.execute("INSERT INTO level SET id = 4, level = 3, f1 = 0.8, f2 = 0.24, f3 = 0.072, f4 = 0.0216");
        await conn.execute("INSERT INTO level SET id = 3, level = 2, f1 = 0.75, f2 = 0.225, f3 = 0.0675, f4 = 0.0203");
        await conn.execute("INSERT INTO level SET id = 2, level = 1, f1 = 0.7, f2 = 0.21, f3 = 0.063, f4 = 0.0189");
        await conn.execute("INSERT INTO level SET id = 1, level = 0, f1 = 0.6, f2 = 0.18, f3 = 0.054, f4 = 0.0162");
        console.log("Seeded MLM levels.");
    }

    // Seed Wingo initial periods
    const [wingoRows] = await conn.query('SELECT * FROM wingo');
    if (wingoRows.length === 0) {
        let arr = ['wingo10', 'wingo5', 'wingo3', 'wingo'];
        for (let i = 0; i < arr.length; i++) {
            await conn.execute("INSERT INTO wingo SET period = ?, game = ?, amount = 6, status = 1, time = ?", ['2026110110000', arr[i], String(timeNow)]);
            await conn.execute("INSERT INTO wingo SET period = ?, game = ?, amount = 0, status = 0, time = ?", ['2026110110001', arr[i], String(timeNow)]);
        }
        console.log("Seeded WinGo initial periods.");
    }

    // Seed 5D initial periods
    const [fiveDRows] = await conn.query('SELECT * FROM 5d');
    if (fiveDRows.length === 0) {
        let arr = [10, 5, 3, 1];
        for (let i = 0; i < arr.length; i++) {
            await conn.execute("INSERT INTO 5d SET period = ?, result = ?, game = ?, status = 1, time = ?", ['2026110110000', '23521', arr[i], String(timeNow)]);
            await conn.execute("INSERT INTO 5d SET period = ?, result = ?, game = ?, status = 0, time = ?", ['2026110110001', '0', arr[i], String(timeNow)]);
        }
        console.log("Seeded 5D initial periods.");
    }

    // Seed K3 initial periods
    const [k3Rows] = await conn.query('SELECT * FROM k3');
    if (k3Rows.length === 0) {
        let arr = [10, 5, 3, 1];
        for (let i = 0; i < arr.length; i++) {
            await conn.execute("INSERT INTO k3 SET period = ?, result = ?, game = ?, status = 1, time = ?", ['2026110110000', '235', arr[i], String(timeNow)]);
            await conn.execute("INSERT INTO k3 SET period = ?, result = ?, game = ?, status = 0, time = ?", ['2026110110001', '0', arr[i], String(timeNow)]);
        }
        console.log("Seeded K3 initial periods.");
    }

    // Seed bank recharge defaults
    const [bankRows] = await conn.query('SELECT * FROM bank_recharge');
    if (bankRows.length === 0) {
        await conn.execute("INSERT INTO `bank_recharge` (`name_bank`, `name_user`, `stk`, `type`, `time`) VALUES ('UPI PAY', '99 Big Daddy Admin', 'upiadmin@upi', 'momo', ?)", [String(timeNow)]);
        await conn.execute("INSERT INTO `bank_recharge` (`name_bank`, `name_user`, `stk`, `type`, `time`) VALUES ('STATE BANK OF INDIA', '99 Big Daddy', '12345678901234', 'bank', ?)", [String(timeNow)]);
        console.log("Seeded Bank Recharge.");
    }

    // Seed SuperAdmin account (Phone: 9999999999, Password: admin123, Level: 1)
    const [adminUser] = await conn.query("SELECT * FROM users WHERE phone = '9999999999'");
    if (adminUser.length === 0) {
        await conn.execute(
            "INSERT INTO users (id_user, phone, name_user, password, plain_password, money, total_money, code, invite, ctv, veri, otp, status, time, user_level, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            ['10001', '9999999999', 'SuperAdmin', md5('admin123'), 'admin123', 100000, 100000, 'ADMIN99', '0', '', 1, '123456', 1, String(timeNow), 6, 1]
        );
        await conn.execute("INSERT INTO point_list (phone, money, level) VALUES ('9999999999', 100000, 1)");
        console.log("Seeded SuperAdmin: Phone: 9999999999, Password: admin123");
    }

    // Seed Test normal player (Phone: 9876543210, Password: user123, Level: 0)
    const [normalUser] = await conn.query("SELECT * FROM users WHERE phone = '9876543210'");
    if (normalUser.length === 0) {
        await conn.execute(
            "INSERT INTO users (id_user, phone, name_user, password, plain_password, money, total_money, code, invite, ctv, veri, otp, status, time, user_level, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            ['10002', '9876543210', 'TestPlayer', md5('user123'), 'user123', 5000, 5000, 'PLAYER1', 'ADMIN99', '', 1, '123456', 1, String(timeNow), 1, 0]
        );
        await conn.execute("INSERT INTO point_list (phone, money, level) VALUES ('9876543210', 5000, 0)");
        console.log("Seeded Normal Player: Phone: 9876543210, Password: user123");
    }

    await conn.end();
    console.log("=== Database setup completed successfully! ===");
}

initDatabase().catch(err => {
    console.error("Database initialization failed:", err);
    process.exit(1);
});
