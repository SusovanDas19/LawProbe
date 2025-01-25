require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT;
const { criminalLawsRouter } = require("./routes/criminalLaw")
const { civilLawsRouter } = require("./routes/civilLaw")
const { userRouter } = require("./routes/user");
const { othersLawsRouter } = require('./routes/othersLaw');
const cors = require('cors');
const { lawProbeAiRouter } = require('./routes/ai');
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use("/v1/law/criminal", criminalLawsRouter);
app.use("/v1/law/civil", civilLawsRouter);
app.use("/v1/law/others", othersLawsRouter);
app.use("/v1/ai", lawProbeAiRouter);
app.use("/v1/user", userRouter)

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(port);
  console.log("Listining in port " + port);
}

main();