import { group, check, sleep } from 'k6'
import http from 'k6/http'
import { Faker } from 'k6/x/faker'

export const options = {
  thresholds: {
    http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1s
  },
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        // Smoke tests (Tests to ensure basic functionality)
        { duration: '3s', target: 3 }, // Only 3 users for the first 3 seconds.

        // Load tests (Normal day traffic)
        { duration: '1m', target: 1000 }, // Simulate ramp-up of traffic from 3 to 1000 users over the next 1 minute.
        { duration: '2m', target: 1000 }, // Stay at 100 users for 10 minutes
        { duration: '3m', target: 0 }, // Ramp-down to 0 users

        // TODO: Stress tests (Finding the breaking point)
        // Assesses the availability and stability of the system under extremely heavy load.
        // TODO: Spike testing
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let res
  const f = new Faker()

  group('Home - http://localhost:3000', function () {
    let payload = JSON.stringify({
      email: f.email(),
      username: f.username(),
      password: 'Pa$$w0rd!',
    })

    const headers = {
      'content-type': 'application/json',
    }

    res = http.post('http://localhost:3000/api/auth/signup', payload, { headers })

    check(res, {
      'status is 201': (r) => r.status === 201,
    })

    res = http.get('http://localhost:3000/api/users/me', { headers })

    check(res, {
      'status is 200': (r) => r.status === 200,
    })

    res = http.patch('http://localhost:3000/api/users/me', null, { headers })

    check(res, {
      'status is 200': (r) => r.status === 200,
    })

    res = http.post('http://localhost:3000/api/auth/signout', null, { headers })

    check(res, {
      'status is 200': (r) => r.status === 200,
    })
  })

  sleep(1)
}
