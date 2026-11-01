# BDG Online (99 Big Daddy / 92Lottery Platform)

A full-stack lottery, color prediction, and gaming platform built with Node.js, Express, Socket.IO, MySQL, and EJS.

---

## 🚀 Features

- **Lottery & Prediction Engines**:
  - **WinGo** (1-min, 3-min, 5-min, 10-min) color & number prediction.
  - **5D Lottery** (1-min, 3-min, 5-min, 10-min) 5-digit number rolls.
  - **K3 Dice** (1-min, 3-min, 5-min, 10-min) 3-dice lottery.
  - Real-time countdowns and result broadcasting powered by Socket.IO and node-cron.
- **Affiliate & Referral (MLM) System**:
  - 6-tier deep commission distribution (`f1` to `f6`).
  - Daily commission turnover calculations and bonus rewards.
- **Payment & Banking**:
  - Automated UPI gateway support.
  - WowPay payment gateway integration.
  - USDT (TRC20) deposit requests.
  - Manual banking & UPI deposit with UTR verification.
  - Withdrawal workflow with bank verification and daily withdrawal limits.
- **Role-Based Control**:
  - **Players**: Betting, recharge, withdrawal, referral stats, wallet transfers.
  - **Collaborators (CTV / Agents)**: Manage sub-members, view turnover, issue gift codes, balance adjustments.
  - **Super Admin**: Predetermine/rig game outcomes, ban users, approve deposits & withdrawals, manage bank accounts.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES Modules with Babel)
- **Realtime**: Socket.IO
- **Cron Jobs**: `node-cron`
- **Database**: MySQL 8 / MariaDB (`mysql2/promise` pool)
- **Frontend**: EJS Templates, jQuery, Bootstrap 4, Vant UI mobile styling

---

## 📦 Installation & Local Setup

### 1. Prerequisites
- Node.js (v16+)
- MySQL Server (v8.0+ or MariaDB)

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure your database and payment settings:
```bash
cp .env.example .env
```

Ensure MySQL has the database and user created:
```sql
CREATE DATABASE IF NOT EXISTS `99bigdaddy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '99bigdaddy'@'localhost' IDENTIFIED BY '99bigdaddy';
GRANT ALL PRIVILEGES ON `99bigdaddy`.* TO '99bigdaddy'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Initialize Database
Run the automated schema and seeding script:
```bash
npm run database
```
*(Alternatively, import `schema.sql` via MySQL CLI or phpMyAdmin)*

### 4. Start the Application
```bash
npm start
```
The server will start on [http://localhost:3015](http://localhost:3015).

---

## 🔑 Default Accounts

| Role | Mobile / Username | Password |
| :--- | :--- | :--- |
| **Super Admin** | `9999999999` | `admin123` |
| **Demo Player** | `9876543210` | `user123` |

---

## 📁 Project Structure

```
├── database/
│   └── schema.sql             # Complete database schema and initial seeds
├── src/
│   ├── config/
│   │   ├── configEngine.js    # View engine and static asset configurations
│   │   └── connectDB.js       # MySQL connection pool configuration
│   ├── controllers/           # Application controllers (game, user, admin, etc.)
│   ├── modal/
│   │   └── CreateDatabase.js  # Database initialization & migration script
│   ├── public/                # Static assets (CSS, JS, audio, images)
│   ├── routes/
│   │   └── web.js             # Web and API routing definitions
│   ├── views/                 # EJS templates (manage, daily, bet, wallet, etc.)
│   └── server.js              # Server entry point
├── .env.example               # Environment variables template
├── package.json
└── schema.sql                 # Root database schema dump
```

---

## 📄 License
ISC License
