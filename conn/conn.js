import mongoose from 'mongoose'

async function conn() {
  const url = "mongodb+srv://data:data123@cluster0.eag7v.mongodb.net/"
  try {
    await mongoose.connect(url)
    console.log("Database Connected");
  } catch (error) {
    console.log(error);

  }
}
conn()