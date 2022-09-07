const mongoose = require('mongoose')

module.exports = class Database {
  constructor() {
    this.mongoseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  }
  connectDB = async () => {
    try {
      const db = await mongoose.connect(process.env.DATABASE_URL, this.mongoseOptions)
      if (db.connections) console.log('DB connected')
    } catch (err) {
      console.log('db error connection', err)
    }
  }
}
