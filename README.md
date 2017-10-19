# code-test-api
Secondary code test for MeldCX


## The task
This test is designed to test your ability to create a very simple Node/Express app.
You should develop a REST api with 3 endpoints:
- GET /people
  - Returns a list of the fixture data under fixtures/people.json
- DELETE /people/:id
  - Updates the JSON file on the file system, and removes the person with the id
- POST /people
  - Creates a new person, and adds them to the JSON file
  
## Bonus
If you have extra time, implementing an authentication layer will score you extra points!

## Running the app
To run, install the dependencies, then run `yarn start`
