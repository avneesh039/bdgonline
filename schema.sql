-- =====================================================================
-- 99 Big Daddy (92Lottery) Database Schema
-- Target Database: 99bigdaddy
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `99bigdaddy` 
    DEFAULT CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE `99bigdaddy`;

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Table structure for `users`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_user` VARCHAR(50) DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `name_user` VARCHAR(100) DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `plain_password` VARCHAR(255) DEFAULT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `total_money` DOUBLE NOT NULL DEFAULT 0,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `ctv` VARCHAR(50) DEFAULT '',
  `veri` TINYINT NOT NULL DEFAULT 1,
  `otp` VARCHAR(20) DEFAULT NULL,
  `token` VARCHAR(255) DEFAULT NULL,
  `ip_address` VARCHAR(50) DEFAULT NULL,
  `status` TINYINT NOT NULL DEFAULT 1,
  `time` VARCHAR(50) DEFAULT NULL,
  `time_otp` VARCHAR(50) DEFAULT NULL,
  `user_level` INT NOT NULL DEFAULT 0,
  `level` INT NOT NULL DEFAULT 0,
  `rank` INT NOT NULL DEFAULT 0,
  `roses_f` DOUBLE NOT NULL DEFAULT 0,
  `roses_f1` DOUBLE NOT NULL DEFAULT 0,
  `roses_today` DOUBLE NOT NULL DEFAULT 0,
  `free_bonus` DOUBLE NOT NULL DEFAULT 0,
  `first_deposit` TINYINT NOT NULL DEFAULT 0,
  INDEX `idx_users_phone` (`phone`),
  INDEX `idx_users_code` (`code`),
  INDEX `idx_users_invite` (`invite`),
  INDEX `idx_users_token` (`token`),
  INDEX `idx_users_level` (`level`),
  INDEX `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. Table structure for `point_list`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `point_list`;
CREATE TABLE `point_list` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `telegram` VARCHAR(255) DEFAULT '',
  `money` DOUBLE NOT NULL DEFAULT 0,
  `money_us` DOUBLE NOT NULL DEFAULT 0,
  `level` INT NOT NULL DEFAULT 0,
  `total1` DOUBLE NOT NULL DEFAULT 0,
  `total2` DOUBLE NOT NULL DEFAULT 0,
  `total3` DOUBLE NOT NULL DEFAULT 0,
  `total4` DOUBLE NOT NULL DEFAULT 0,
  `total5` DOUBLE NOT NULL DEFAULT 0,
  `total6` DOUBLE NOT NULL DEFAULT 0,
  `total7` DOUBLE NOT NULL DEFAULT 0,
  INDEX `idx_point_list_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. Table structure for `admin`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `wingo1` VARCHAR(255) NOT NULL DEFAULT '-1',
  `wingo3` VARCHAR(255) NOT NULL DEFAULT '-1',
  `wingo5` VARCHAR(255) NOT NULL DEFAULT '-1',
  `wingo10` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k5d` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k5d3` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k5d5` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k5d10` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k3d` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k3d3` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k3d5` VARCHAR(255) NOT NULL DEFAULT '-1',
  `k3d10` VARCHAR(255) NOT NULL DEFAULT '-1',
  `win_rate` INT NOT NULL DEFAULT 80,
  `telegram` VARCHAR(255) DEFAULT '',
  `cskh` VARCHAR(255) DEFAULT '',
  `app` VARCHAR(255) DEFAULT '',
  `recharge_bonus` INT NOT NULL DEFAULT 0,
  `recharge_bonus_2` INT NOT NULL DEFAULT 0,
  `bs1` VARCHAR(255) DEFAULT '-1',
  `bs3` VARCHAR(255) DEFAULT '-1',
  `bs5` VARCHAR(255) DEFAULT '-1',
  `bs10` VARCHAR(255) DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. Table structure for `wingo`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `wingo`;
CREATE TABLE `wingo` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `period` VARCHAR(50) NOT NULL,
  `amount` INT NOT NULL DEFAULT 0,
  `game` VARCHAR(20) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_wingo_period` (`period`),
  INDEX `idx_wingo_game` (`game`),
  INDEX `idx_wingo_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. Table structure for `minutes_1` (WinGo bet orders)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `minutes_1`;
CREATE TABLE `minutes_1` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_product` VARCHAR(50) DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `stage` VARCHAR(50) NOT NULL,
  `level` INT NOT NULL DEFAULT 0,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `amount` INT NOT NULL DEFAULT 1,
  `fee` DOUBLE NOT NULL DEFAULT 0,
  `get` DOUBLE NOT NULL DEFAULT 0,
  `game` VARCHAR(20) NOT NULL,
  `bet` VARCHAR(20) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `today` VARCHAR(50) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  `result` VARCHAR(20) DEFAULT NULL,
  INDEX `idx_min1_phone` (`phone`),
  INDEX `idx_min1_game` (`game`),
  INDEX `idx_min1_stage` (`stage`),
  INDEX `idx_min1_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. Table structure for `5d`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `5d`;
CREATE TABLE `5d` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `period` VARCHAR(50) NOT NULL,
  `result` VARCHAR(20) DEFAULT NULL,
  `game` INT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_5d_period` (`period`),
  INDEX `idx_5d_game` (`game`),
  INDEX `idx_5d_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. Table structure for `result_5d` (5D bet orders)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `result_5d`;
CREATE TABLE `result_5d` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_product` VARCHAR(50) DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `stage` VARCHAR(50) NOT NULL,
  `level` INT NOT NULL DEFAULT 0,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `price` DOUBLE NOT NULL DEFAULT 0,
  `amount` INT NOT NULL DEFAULT 1,
  `fee` DOUBLE NOT NULL DEFAULT 0,
  `get` DOUBLE NOT NULL DEFAULT 0,
  `game` INT NOT NULL,
  `join_bet` VARCHAR(20) DEFAULT NULL,
  `bet` VARCHAR(20) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  `result` VARCHAR(20) DEFAULT NULL,
  INDEX `idx_res5d_phone` (`phone`),
  INDEX `idx_res5d_game` (`game`),
  INDEX `idx_res5d_stage` (`stage`),
  INDEX `idx_res5d_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 8. Table structure for `k3`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `k3`;
CREATE TABLE `k3` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `period` VARCHAR(50) NOT NULL,
  `result` VARCHAR(20) DEFAULT NULL,
  `game` INT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_k3_period` (`period`),
  INDEX `idx_k3_game` (`game`),
  INDEX `idx_k3_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 9. Table structure for `result_k3` (K3 bet orders)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `result_k3`;
CREATE TABLE `result_k3` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_product` VARCHAR(50) DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `stage` VARCHAR(50) NOT NULL,
  `level` INT NOT NULL DEFAULT 0,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `price` DOUBLE NOT NULL DEFAULT 0,
  `amount` INT NOT NULL DEFAULT 1,
  `fee` DOUBLE NOT NULL DEFAULT 0,
  `get` DOUBLE NOT NULL DEFAULT 0,
  `game` INT NOT NULL,
  `join_bet` VARCHAR(20) DEFAULT NULL,
  `typeGame` VARCHAR(50) DEFAULT NULL,
  `bet` VARCHAR(20) NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  `result` VARCHAR(20) DEFAULT NULL,
  INDEX `idx_resk3_phone` (`phone`),
  INDEX `idx_resk3_game` (`game`),
  INDEX `idx_resk3_stage` (`stage`),
  INDEX `idx_resk3_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 10. Table structure for `recharge`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `recharge`;
CREATE TABLE `recharge` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_order` VARCHAR(100) NOT NULL,
  `transaction_id` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `type` VARCHAR(50) DEFAULT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `today` VARCHAR(50) DEFAULT NULL,
  `url` TEXT DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  `utr` VARCHAR(100) DEFAULT NULL,
  INDEX `idx_rec_phone` (`phone`),
  INDEX `idx_rec_id_order` (`id_order`),
  INDEX `idx_rec_status` (`status`),
  INDEX `idx_rec_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 11. Table structure for `withdraw`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `withdraw`;
CREATE TABLE `withdraw` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_order` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `stk` VARCHAR(100) DEFAULT NULL,
  `name_bank` VARCHAR(100) DEFAULT NULL,
  `name_user` VARCHAR(100) DEFAULT NULL,
  `ifsc` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `status` TINYINT NOT NULL DEFAULT 0,
  `today` VARCHAR(50) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  `remark` TEXT DEFAULT NULL,
  INDEX `idx_wdr_phone` (`phone`),
  INDEX `idx_wdr_status` (`status`),
  INDEX `idx_wdr_id_order` (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 12. Table structure for `user_bank`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `user_bank`;
CREATE TABLE `user_bank` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `name_bank` VARCHAR(100) DEFAULT NULL,
  `name_user` VARCHAR(100) DEFAULT NULL,
  `stk` VARCHAR(100) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `tinh` VARCHAR(100) DEFAULT NULL,
  `tp` VARCHAR(100) DEFAULT NULL,
  `sdt` VARCHAR(100) DEFAULT NULL,
  `chi_nhanh` VARCHAR(100) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_ubank_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 13. Table structure for `bank_recharge`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `bank_recharge`;
CREATE TABLE `bank_recharge` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name_bank` VARCHAR(100) DEFAULT NULL,
  `name_user` VARCHAR(100) DEFAULT NULL,
  `stk` VARCHAR(100) DEFAULT NULL,
  `qr_code_image` TEXT DEFAULT NULL,
  `type` VARCHAR(50) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_brec_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 14. Table structure for `level`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `level`;
CREATE TABLE `level` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `level` INT NOT NULL,
  `f1` DOUBLE NOT NULL DEFAULT 0,
  `f2` DOUBLE NOT NULL DEFAULT 0,
  `f3` DOUBLE NOT NULL DEFAULT 0,
  `f4` DOUBLE NOT NULL DEFAULT 0,
  INDEX `idx_lvl_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 15. Table structure for `roses`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `roses`;
CREATE TABLE `roses` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `f1` DOUBLE NOT NULL DEFAULT 0,
  `f2` DOUBLE NOT NULL DEFAULT 0,
  `f3` DOUBLE NOT NULL DEFAULT 0,
  `f4` DOUBLE NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_roses_phone` (`phone`),
  INDEX `idx_roses_code` (`code`),
  INDEX `idx_roses_invite` (`invite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 16. Table structure for `turn_over`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `turn_over`;
CREATE TABLE `turn_over` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `code` VARCHAR(50) DEFAULT NULL,
  `invite` VARCHAR(50) DEFAULT NULL,
  `daily_turn_over` DOUBLE NOT NULL DEFAULT 0,
  `total_turn_over` DOUBLE NOT NULL DEFAULT 0,
  INDEX `idx_turnover_phone` (`phone`),
  INDEX `idx_turnover_code` (`code`),
  INDEX `idx_turnover_invite` (`invite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 17. Table structure for `salary`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `amount` DOUBLE NOT NULL DEFAULT 0,
  `type` VARCHAR(50) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_salary_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 18. Table structure for `redenvelopes`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `redenvelopes`;
CREATE TABLE `redenvelopes` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_redenvelope` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `used` INT NOT NULL DEFAULT 0,
  `amount` INT NOT NULL DEFAULT 1,
  `status` TINYINT NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_redenv_id` (`id_redenvelope`),
  INDEX `idx_redenv_phone` (`phone`),
  INDEX `idx_redenv_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 19. Table structure for `redenvelopes_used`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `redenvelopes_used`;
CREATE TABLE `redenvelopes_used` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `phone_used` VARCHAR(20) NOT NULL,
  `id_redenvelops` VARCHAR(100) DEFAULT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_redused_phone` (`phone`),
  INDEX `idx_redused_phone_used` (`phone_used`),
  INDEX `idx_redused_id` (`id_redenvelops`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 20. Table structure for `balance_transfer`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `balance_transfer`;
CREATE TABLE `balance_transfer` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sender_phone` VARCHAR(20) NOT NULL,
  `receiver_phone` VARCHAR(20) NOT NULL,
  `amount` DOUBLE NOT NULL DEFAULT 0,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_btrans_sender` (`sender_phone`),
  INDEX `idx_btrans_receiver` (`receiver_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 21. Table structure for `financial_details`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `financial_details`;
CREATE TABLE `financial_details` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `phone_used` VARCHAR(20) DEFAULT NULL,
  `money` DOUBLE NOT NULL DEFAULT 0,
  `type` VARCHAR(10) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_fin_phone` (`phone`),
  INDEX `idx_fin_phone_used` (`phone_used`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- SEED INITIAL DATA
-- =============================================================

-- Seed Admin Settings
INSERT INTO `admin` (`id`, `wingo1`, `wingo3`, `wingo5`, `wingo10`, `k5d`, `k5d3`, `k5d5`, `k5d10`, `k3d`, `k3d3`, `k3d5`, `k3d10`, `win_rate`, `telegram`, `cskh`, `app`)
VALUES (1, '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 80, 'https://t.me/99bigdaddy', 'https://t.me/99bigdaddy_support', '#')
ON DUPLICATE KEY UPDATE `id` = 1;

-- Seed Levels
INSERT INTO `level` (`id`, `level`, `f1`, `f2`, `f3`, `f4`) VALUES
(1, 0, 0.6, 0.18, 0.054, 0.0162),
(2, 1, 0.7, 0.21, 0.063, 0.0189),
(3, 2, 0.75, 0.225, 0.0675, 0.0203),
(4, 3, 0.8, 0.24, 0.072, 0.0216),
(5, 4, 0.85, 0.255, 0.0765, 0.023),
(6, 5, 0.9, 0.27, 0.081, 0.0243),
(7, 6, 1.0, 0.3, 0.09, 0.027)
ON DUPLICATE KEY UPDATE `level` = VALUES(`level`);

-- Seed Bank Recharge (UPI & Bank)
INSERT INTO `bank_recharge` (`id`, `name_bank`, `name_user`, `stk`, `qr_code_image`, `type`, `time`) VALUES
(1, 'UPI PAY', '99 Big Daddy Admin', 'upiadmin@upi', 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=upiadmin@upi', 'momo', '1730460000000'),
(2, 'STATE BANK OF INDIA', '99 Big Daddy', '12345678901234', '', 'bank', '1730460000000')
ON DUPLICATE KEY UPDATE `name_bank` = VALUES(`name_bank`);

-- Seed WinGo Active & Historical Rounds
INSERT INTO `wingo` (`period`, `amount`, `game`, `status`, `time`) VALUES
('2026110110000', 6, 'wingo', 1, '1730460000000'),
('2026110110001', 0, 'wingo', 0, '1730460000000'),
('2026110110000', 6, 'wingo3', 1, '1730460000000'),
('2026110110001', 0, 'wingo3', 0, '1730460000000'),
('2026110110000', 6, 'wingo5', 1, '1730460000000'),
('2026110110001', 0, 'wingo5', 0, '1730460000000'),
('2026110110000', 6, 'wingo10', 1, '1730460000000'),
('2026110110001', 0, 'wingo10', 0, '1730460000000');

-- Seed 5D Active & Historical Rounds
INSERT INTO `5d` (`period`, `result`, `game`, `status`, `time`) VALUES
('2026110110000', '23521', 1, 1, '1730460000000'),
('2026110110001', '0', 1, 0, '1730460000000'),
('2026110110000', '23521', 3, 1, '1730460000000'),
('2026110110001', '0', 3, 0, '1730460000000'),
('2026110110000', '23521', 5, 1, '1730460000000'),
('2026110110001', '0', 5, 0, '1730460000000'),
('2026110110000', '23521', 10, 1, '1730460000000'),
('2026110110001', '0', 10, 0, '1730460000000');

-- Seed K3 Active & Historical Rounds
INSERT INTO `k3` (`period`, `result`, `game`, `status`, `time`) VALUES
('2026110110000', '235', 1, 1, '1730460000000'),
('2026110110001', '0', 1, 0, '1730460000000'),
('2026110110000', '235', 3, 1, '1730460000000'),
('2026110110001', '0', 3, 0, '1730460000000'),
('2026110110000', '235', 5, 1, '1730460000000'),
('2026110110001', '0', 5, 0, '1730460000000'),
('2026110110000', '235', 10, 1, '1730460000000'),
('2026110110001', '0', 10, 0, '1730460000000');

-- Seed SuperAdmin Account (Phone: 9999999999, Password: admin123, Level: 1)
INSERT INTO `users` (`id_user`, `phone`, `name_user`, `password`, `plain_password`, `money`, `total_money`, `code`, `invite`, `ctv`, `veri`, `otp`, `status`, `time`, `user_level`, `level`)
VALUES ('10001', '9999999999', 'SuperAdmin', MD5('admin123'), 'admin123', 100000, 100000, 'ADMIN99', '0', '', 1, '123456', 1, '1730460000000', 6, 1)
ON DUPLICATE KEY UPDATE `level` = 1, `status` = 1;

INSERT INTO `point_list` (`phone`, `money`, `level`)
VALUES ('9999999999', 100000, 1)
ON DUPLICATE KEY UPDATE `phone` = '9999999999';

-- Seed Test Normal Player (Phone: 9876543210, Password: user123, Level: 0)
INSERT INTO `users` (`id_user`, `phone`, `name_user`, `password`, `plain_password`, `money`, `total_money`, `code`, `invite`, `ctv`, `veri`, `otp`, `status`, `time`, `user_level`, `level`)
VALUES ('10002', '9876543210', 'TestPlayer', MD5('user123'), 'user123', 5000, 5000, 'PLAYER1', 'ADMIN99', '', 1, '123456', 1, '1730460000000', 1, 0)
ON DUPLICATE KEY UPDATE `phone` = '9876543210';

INSERT INTO `point_list` (`phone`, `money`, `level`)
VALUES ('9876543210', 5000, 0)
ON DUPLICATE KEY UPDATE `phone` = '9876543210';

SET FOREIGN_KEY_CHECKS = 1;

