# JSP-Survive
Simple Game Functionality Created using Netbeans  JSP Servlets and MySql.

ScreenShots: https://github.com/morlinski/JSP-Survive/issues/1

(DataBase for MySQL)
--------------------------------
CREATE DATABASE Survive;
USE Survive;
CREATE TABLE HighScores (nickname VARCHAR(80) NOT NULL, class VARCHAR(50) NOT NULL, score INT NOT NULL);
INSERT INTO HighScores (nickname, class, score) VALUES ('jackie','Boxer',1000),('michael','Priest',1500),('jonathon','Handicapped',10);
