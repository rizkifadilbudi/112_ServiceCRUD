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
