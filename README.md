# **K6 Load Testing Introduction**
K6 is a modern, developer-friendly load testing tool for testing the performance of APIs, microservices, and websites. Below is a simple tutorial that will guide you through the process of creating and running a basic load test using K6.
### **Step 1: Install K6**
First, you need to install K6 on your machine. You can download it from the official website or use a package manager like npm or brew.

\# Using npm

npm install -g k6

\# Using brew

brew install k6
### **Step 2: Create a Basic Script**
Create a new file named loadTest.js (attached) and add the following script. This example performs a basic load test on a sample API endpoint.

In this script:

- options: Configures the number of virtual users (vus) and the duration of the test (duration).
- createUserResponse: Sends a POST request to create a new user and checks if the response status code is 201 (Created).
- stages: Divide the load test into several condition. stage 1 running around 5 minutes, to ramp up and check initial condition of sample web test, stage 2 running around 20 minutes for main load testing part and stable condition running. Both stage here using 200 target virtual user to access. Stage 3 running around 5 minutes to ramp down testing with 0 target virtual user to be accessed.
- getUserResponse: Sends a GET request to retrieve the created user and checks if the response status code is 200 (OK).
- sleep(1): Introduces a 1-second delay between iterations to simulate a more realistic scenario.

Remember to replace the placeholder URL (https://example.com/api/users) with the actual URL of the API you want to test.

To run the script, save it to a file (e.g., loadTest.js) and execute the following command in the terminal:
### **Step 3: Run the Load Test**
Open a terminal and navigate to the directory where your script is located. Run the following command to execute the load test:

k6 run cobatest.js

You should see the results of the load test, including metrics such as response time, requests per second, and data transfer.

After run the load test several minutes, it is shown that the website starting down and not accesible.

We can see that from the result above, there is 0% scenario checks. This means the load test for this website was failed. The website can’t handle the load test with our scenario above.

Also the http request duration here always exceed 100ms. Even the maximum duration exceed exact 60s (1 minute duration). With the number of average 296.78ms here, shown that website not adjust or designed to handle such a request with quicker response.
