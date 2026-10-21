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

//Post
app.post("/biodata", (req, res) => {
  const { id, nama, nim, kelas } = req.body;

  pool
    .query(
      "INSERT INTO biodata (id, nama, nim, kelas) VALUES ($1,$2,$3,$4) RETURNING *",
      [id, nama, nim, kelas],
    )
    .then((result) => res.json(result.rows[0]))
    .catch((err) => console.error(err));
});

//put
app.put("/biodata/:id", (req, res) => {
  const { id } = req.params;
  const { nama, nim, kelas } = req.body;

  pool
    .query(
      "UPDATE biodata SET nama=$1, nim=$2, kelas=$3 WHERE id=$4 RETURNING *",
      [nama, nim, kelas, id],
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Data Tidak ditemukan",
        });
      }

      res.json({
        message: "Resource berhasil diupdate",
        data: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Internal Error");
    });
});

//delete
app.delete("/biodata/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM biodata WHERE id=$1 RETURNING *", [id])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Resource Not Found",
        });
      }

      res.json({
        message: "Resource dihapus",
        data: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Internal Error");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
