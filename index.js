import express from 'express'
import fetch from "node-fetch"
import { dirname } from 'path';
import path from 'path';
const app = express()
import "./conn/conn.js"
import datamodel from "./conn/models/data.js"
const __filename = fileURLToPath(import.meta.url);
import { fileURLToPath } from 'url';

const __dirname = dirname(__filename);
app.use(express.json())
app.use(express.static('public'));
console.log(__dirname);

async function fetched() {

  const response = await fetch('https://api.wazirx.com/api/v2/tickers');
  const data = await response.json();


  const datavalue = Object.values(data).slice(0, 10);

  // console.log(datavalue);

  datavalue.map(async (elements, index) => {
    const { name, last, sell, buy, volume, base_unit } = elements
    const newdata = datamodel({
      name: name,
      last: last,
      sell: sell,
      buy: buy,
      volume: volume,
      base_unit: base_unit,

    });
    await newdata.save();
  })



}
fetched();

const deleteOldData = async () => {
  const expirationTime = new Date(Date.now() - 60000); // 1 minute ago
  await datamodel.deleteMany({ createdAt: { $lt: expirationTime } });
  console.log('Old data deleted');
};
setInterval(async () => {
  fetched();
  deleteOldData();  // Optional if not using the expires index
}, 60000);
// Define a route for the home page (optional)
app.get('/', async (req, res) => {
  res.sendFile("index.html")

});


app.get("/get-all-books", async (req, res) => {
  try {
    const data = await datamodel.find().sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/connect/telegram", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page', 'telegram.html'));
});

app.listen(4000, () => {
  console.log("Server is running on port 8000");
});
