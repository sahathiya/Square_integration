import { Client } from 'square';
import { randomUUID } from 'crypto';


const { paymentsApi } = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
  environment: 'sandbox'
});


// app/api/pay/route.js
export async function POST(req) {
  const body = await req.json();
  const { sourceId } = body;

  console.log("sourceId from client:", sourceId);

  const accessToken = process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN;
  console.log("accessToken", accessToken);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: 'USD',
        amount: 100
      }
    })
    console.log(result);
  return new Response(
    JSON.stringify({ message: "accesstoken", accessToken,result }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}


// export default async function POST(req, res) {
//     console.log("hhhhhhh");
    
//   if ( req.method === 'POST' ) {
//     const { result } = await paymentsApi.createPayment({
//       idempotencyKey: randomUUID(),
//       sourceId: req.body.sourceId,
//       amountMoney: {
//         currency: 'USD',
//         amount: 100
//       }
//     })
//     console.log(result);
//     res.status(200).json(result);
//   } else {
//     res.status(500).send();
//   }
// }