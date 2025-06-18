import mongoose from 'mongoose'

async function conn() {
  const url = ""
  try {
    await mongoose.connect(url)
    console.log("Database Connected");
  } catch (error) {
    console.log(error);

  }
}
conn()
