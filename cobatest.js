import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  // vus: 1000, // Number of virtual users
  // duration: '60s', // Test duration
  stages: [
    { duration: '5m', target: 200 },
    { duration: '20m', target: 200 },
    { duration: '5m', target: 0 },
  ],
};

export default function () {
  // Generate a random username for each virtual user
  const username = `user_${Math.floor(Math.random() * 100000)}`;

  // Step 1: Create a new user
  const createUserResponse = http.post(
    'https://example.com/api/users',
    JSON.stringify({ username }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  sleep(1);

  // Check if the user creation was successful (status code 201)
  check(createUserResponse, {
    'Create User is successful': (res) => res.status === 201,
  });

  // Step 2: Retrieve the created user
  const userId = createUserResponse.json('id');
  const getUserResponse = http.get(`https://example.com/api/users/${userId}`);

  // Check if the user retrieval was successful (status code 200)
  check(getUserResponse, {
    'Get User is successful': (res) => res.status === 200,
  });

  // Introduce a delay between iterations
  sleep(1);
}
