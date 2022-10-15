import http from 'k6/http';
import { sleep } from 'k6';

export default function () {

  http.get(`https://plain-nextjs-data-proxy-test-1-o0wi2hyrf-nikolasburk.vercel.app/api/user`);
  sleep(1);

}

// Show current connection
// Terminal: $ heroku pg:info --app next-data-proxy-demo-test-1
// SQL: select count(*) from pg_stat_activity where pid <> pg_backend_pid() and usename = current_user;

// More on connection pooling
// https://devcenter.heroku.com/articles/postgres-connection-pooling
// 


// Load tests
// 
// FIRST batch (3 runs)
// ... waited before each run until all connections from previous
// run are free again (checked via Heroku UI, Terminal & SQL)
//
// r1
// $ k6 run --vus 40 --duration 10s loadtest.js
// http_req_failed................: 33.60% ✓ 81        ✗ 160 
//
// r2
// $ k6 run --vus 40 --duration 10s loadtest.js
// http_req_failed................: 30.83% ✓ 78        ✗ 175 
//
// r3
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.5s), 00/40 VUs, 245 complete and 0 interrupted iterations
// http_req_failed................: 39.59% ✓ 97        ✗ 148 

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// SECOND batch (3 runs)
// connection_limit=1 (set via Vercel UI and redeployed the app) 
//
// ... waited before each run until all connections from previous
// run are free again (checked via Heroku UI, Terminal & SQL)
//
// r1
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.5s), 00/40 VUs, 263 complete and 0 interrupted iterations
// http_req_failed................: 26.23% ✓ 69        ✗ 194 
// 
// r2
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.5s), 00/40 VUs, 248 complete and 0 interrupted iterations
// http_req_failed................: 33.87% ✓ 84        ✗ 164 
// 
// 
// r3
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.1s), 00/40 VUs, 265 complete and 0 interrupted iterations
// http_req_failed................: 28.67% ✓ 76        ✗ 189 


// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// THIRD batch (3 runs)
// connection_limit=1 (set via Vercel UI and redeployed the app) 
// call `await prisma.$disconnect()` at the end of handler
// 
// ... waited before each run until all connections from previous
// run are free again (checked via Heroku UI, Terminal & SQL)
//
// r1
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.5s), 00/40 VUs, 263 complete and 0 interrupted iterations
// http_req_failed................: 26.23% ✓ 69        ✗ 194 
// 
// r2
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.5s), 00/40 VUs, 248 complete and 0 interrupted iterations
// http_req_failed................: 33.87% ✓ 84        ✗ 164 
// 
// 
// r3
// $ k6 run --vus 40 --duration 10s loadtest.js
// running (12.1s), 00/40 VUs, 265 complete and 0 interrupted iterations
// http_req_failed................: 28.67% ✓ 76        ✗ 189 