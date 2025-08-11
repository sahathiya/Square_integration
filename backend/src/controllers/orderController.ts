import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { SquareClient, SquareEnvironment } from "square";
import dotenv from "dotenv";

dotenv.config();

// Create Square client
const squareClient = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: process.env.SQUARE_ACCESS_TOKEN!, 
});

export const submitPayment = async (req: Request, res: Response) => {
  console.log("Processing payment...");

  try {
    const { sourceId } = req.body;

    if (!sourceId) {
      return res.status(400).json({ error: "Missing sourceId" });
    }

    const result = await squareClient.payments.create({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(100),
      },
    });

    // Convert BigInts to strings before sending to client
    const safeResult = JSON.parse(
      JSON.stringify(result, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.json(safeResult);
  } catch (error: any) {
    console.error("Square Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};
