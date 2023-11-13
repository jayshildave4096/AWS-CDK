"use strict";

// lambda/boards/createTable/index.js
var AWS = require("aws-sdk");
var mysql = require("mysql2/promise");
var headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,access-token",
};
exports.handler = async (event) => {
  console.log("starting query");
  const secretsManager = new AWS.SecretsManager({
    region: "us-east-1",
  });
  const response = await secretsManager
    .getSecretValue({
      SecretId: process.env.RDS_SECRET_NAME,
    })
    .promise();
  const { host, username, password } = JSON.parse(response.SecretString);
  const sql = `CREATE TABLE BOARD(
    id INT(10) NOT NULL AUTO_INCREMENT,
    TITLE VARCHAR(60) NOT NULL,
    STUDENT_COUNT INTEGER,
    FACULTY_COUNT INTEGER,
    DEPT_COUNT INTEGER,
    PHONE VARCHAR(60),
    ACHIEVEMENT VARCHAR(256),
    date DATETIME,
    CONSTRAINT board_PK PRIMARY KEY(id)
  );
  `;
  const sql2 = `
    INSERT INTO BOARD
    VALUES
    (NULL, 'OCKTANK University', 10000, 200, 10, '123-456-1233', 'hello', NOW())
  `;
  const connection = await mysql.createConnection({
    host: process.env.PROXY_ENDPOINT,
    user: username,
    password,
    database: process.env.DB_NAME,
  });
  const [rows, fields] = await connection.execute(sql);
  const [rows2, fields2] = await connection.execute(sql2);
  console.log([rows2]);
  console.log(JSON.stringify([rows]));
  console.log("parse");
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify([rows]),
  };
};
