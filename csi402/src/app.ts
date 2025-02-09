import { Request, Response } from "express";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


let totalPoints = 1000;

app.post("/accumulate-points", (req: Request, res: Response) => {
  const { studentId, amountPaid } = req.body;

  
  if (!studentId || !amountPaid) {
    return res.status(400).json({
      status: "ERROR",
      message: "Missing studentId or amountPaid",
    });
  }

  
  const pointsEarned = Math.floor(amountPaid / 100) * 10;

  
  totalPoints += pointsEarned;

  
  res.status(200).json({
    status: "SUCCESS",
    data: {
      studentId,
      pointsEarned,
      totalPoints,
    },
  });
});

app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

const PORT = process.env.PORT || 3030;
console.log("PORT from environment:", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});