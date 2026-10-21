import express from "express";
import pg, { Result } from "pg";
const app = express();
const port = 3000;

const { Pool } = pg;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mahasiswa",
  password: "cikarang",
  port: 5432,
});

//Get all
app.get("/", (req, res) => {
  console.log("TEST DATA:");
  pool
    .query("SELECT * FROM biodata")
    .then((testData) => {
      console.log(testData);
      res.send(testData.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});
