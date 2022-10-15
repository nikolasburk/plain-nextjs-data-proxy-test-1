import http from 'k6/http';
import { sleep } from 'k6';

export default function () {

  http.get(`https://plain-nextjs-data-proxy-test-1-o0wi2hyrf-nikolasburk.vercel.app/api/user`);
  sleep(1);

}

// show current connection
// $ heroku pg:info --app next-data-proxy-demo-test-1

// load tests
// 
// $ k6 run --vus 40 --duration 10s loadtest.js
// http_req_failed................: 33.60% ✓ 81        ✗ 160 
//
//