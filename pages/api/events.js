import { query } from "../../src/app/utils/db";

const getEventsHandler = async (req, res) => {  //GET function
  const status = req.query.status || "all";
  const limit = parseInt(req.query.limit, 10) || 10;

  const sql = "SELECT * FROM events ORDER BY created_at DESC";
  const { rows } = await query(sql, []);

  const updatedRows = await Promise.all(rows.map(updateEventStatus));

  const filteredRows = updatedRows
    .filter((row) => (status === "all" ? true : row.status === status))
    .slice(0, limit);

  res.status(200).json(filteredRows);
};

const postEventsHandler = async (req, res) => { //POST function
  const { title, date, description, hosts } = req.body;
  const { rows } = await query(
    "INSERT INTO events(title, date, description, hosts) VALUES($1, $2, $3, $4) RETURNING *",
    [title, date || null, description || null, JSON.stringify(hosts)]
  );
  res.status(201).json(rows[0]);
};

const updateEventStatus = async (row) => { //update status by the current date every time when its fetch something
  let newStatus = "Draft";
  if (row.date) {
    const eventDate = new Date(row.date);
    const currentDate = new Date();
    newStatus = eventDate > currentDate ? "Upcoming" : "Past";
  }

  if (newStatus !== row.status) {
    const updateSQL = "UPDATE events SET status = $1 WHERE id = $2";
    await query(updateSQL, [newStatus, row.id]);
    row.status = newStatus;
  }

  return row;
};

export default async function handler(req, res) { //the whole handler
  try {
    if (req.method === "GET") {
      await getEventsHandler(req, res);
    } else if (req.method === "POST") {
      await postEventsHandler(req, res);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
