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
const { mailRouter } = require('./routes/mail');

const privateIp = process.env.PRIVATE_IP
const allowedOrigins = [
  'http://localhost:5173',
  `${privateIp}`
];

app.use(cors({
  origin: allowedOrigins
}));



app.use(express.json());
app.use("/v1/law/criminal", criminalLawsRouter);
app.use("/v1/law/civil", civilLawsRouter);
app.use("/v1/law/others", othersLawsRouter);
app.use("/v1/ai", lawProbeAiRouter);
app.use("/v1/user", userRouter);
app.use("/user", mailRouter)

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(port);
  console.log("Listining in port " + port);
}

main();