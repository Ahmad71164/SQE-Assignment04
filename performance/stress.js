import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 20 },  // ramp up to 20 users
    { duration: '20s', target: 50 },  // ramp up to 50 users
    { duration: '20s', target: 100 }, // ramp to 100 users
    { duration: '10s', target: 0 },   // ramp down
  ],
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 800ms': (r) => r.timings.duration < 800,
  });

  sleep(1);
}
