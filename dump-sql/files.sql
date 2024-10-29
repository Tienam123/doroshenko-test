-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: db:3306
-- Время создания: Окт 29 2024 г., 06:09
-- Версия сервера: 5.7.44
-- Версия PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `documents_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `files`
--

INSERT INTO `files` (`id`, `name`, `updated_at`, `created_at`) VALUES
(80, 'Galanta67207bfce22a1.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(81, 'Galanta67207bfce41df.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(82, 'Galanta67207bfce52e2.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(83, 'Galanta67207bfce5bae.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(84, 'Galanta67207bfce64ed.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(85, 'Galanta67207bfce74a4.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(86, 'Galanta67207bfce7cb8.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(87, 'Galanta67207bfce847f.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(88, 'Galanta67207bfce8c4e.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33'),
(89, 'Galanta67207bfce398a.jpeg', '2024-10-29 06:09:00', '2024-10-29 06:08:33');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
