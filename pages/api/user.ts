import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>
) {
  console.log(`Invoking /user (via ${req.method || "unknown"})`);
  const name = req.query.name as string | undefined;
  console.log(`Creating new user with name: ${name || "---"}`);

  const user = await prisma.user.create({
    data: {
      name,
    },
  });
  const userCount = await prisma.user.count();

  const message = `Created user with name: ${
    user.name || "---"
  }. There are ${userCount} users in the database.`;
  console.log(message);

  console.log(`Closing all connections in Prisma Client's connection pool ...`)
  await prisma.$disconnect();
  console.log(`Closed all connections.`)

  res.status(200).json(message);
}


// running (23.6s), 000/500 VUs, 6130 complete and 0 interrupted iterations
// default ✓ [======================================] 500 VUs  20s

//      data_received..................: 11 MB  481 kB/s
//      data_sent......................: 503 kB 21 kB/s
//      http_req_blocked...............: avg=116.96ms min=0s       med=1µs      max=2.23s   p(90)=2µs      p(95)=1.29s   
//      http_req_connecting............: avg=4.19ms   min=0s       med=0s       max=75.04ms p(90)=0s       p(95)=47.94ms 
//      http_req_duration..............: avg=1.61s    min=132.77ms med=2.19s    max=6.54s   p(90)=3.09s    p(95)=4.22s   
//        { expected_response:true }...: avg=194.74ms min=132.77ms med=153.43ms max=4.75s   p(90)=246.42ms p(95)=376.27ms
//      http_req_failed................: 51.35% ✓ 3148      ✗ 2982 
//      http_req_receiving.............: avg=279.38µs min=16µs     med=85µs     max=68.1ms  p(90)=336.2µs  p(95)=955.65µs
//      http_req_sending...............: avg=121.03µs min=14µs     med=96µs     max=6.39ms  p(90)=199µs    p(95)=251.55µs
//      http_req_tls_handshaking.......: avg=107.31ms min=0s       med=0s       max=2.1s    p(90)=0s       p(95)=1.18s   
//      http_req_waiting...............: avg=1.61s    min=132.62ms med=2.19s    max=6.54s   p(90)=3.09s    p(95)=4.22s   
//      http_reqs......................: 6130   259.94699/s
//      iteration_duration.............: avg=1.73s    min=132.95ms med=2.46s    max=7.7s    p(90)=3.83s    p(95)=4.29s   
//      iterations.....................: 6130   259.94699/s
//      vus............................: 4      min=4       max=500
//      vus_max........................: 500    min=500     max=500
