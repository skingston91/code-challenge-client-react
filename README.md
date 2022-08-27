# Pragmateam code challenge client (React)

## Available scripts

- `npm start` - Start the application (Port 3000)
- `npm test` - Runs available tests

## Techincal Test Documentation

### Improvements Made

- Extracted away the hard coded drinks data into a seperate file and passed it in as a param to enable easier testing. It keeps the code cleaner and more focused too.

- Reduced the reptition in table body in accessing the values table values

- Wrote tests covering Axios being triggered on load and with the correct urls
- Tests for the table headers and correct tempatures show row data
- Added chance for some randomisation in the tests

-- Created a helper getTemperatureStatus to extract away logic in the table body although I didn't get chance to implement it in the app as I decided it was key to ensure that the existing code was working as intended with tests, so I could then drop in the getTemperatureStatus function in (and the additonal code to reference the text to the status text returned) and then mock out the getTemperatureStatus function in App else it would be tested in two places twice. The tests would simply be do getTemperatureStatus get given the right params and given the mocks return value does the table show the right thing rather than having any logic inside of it.

### What I would do with more time

- Move server address .env file

- Add Typescript

- Add tests for api failures

- Add CI intergration checks on pre merge and block pushes to master

- Add backend tests, I started to write tests in the backend but I decided that the larger change I wanted to make wouldn't be possible in time and perhaps out of scope so I wouldn't need to touch the backend without it. But I feel lots of the complexity of the tests come from the parallel async calls in App. But if the client approved you could do all of them at once and pass an array of ids to back end and make it a single call which would remove lots of the front end complexity both in the tests and the logic and reduce load on the backend, but changes functionality of the app slightly.

-- Switched Fetch to Axios but it has an act error which really needs to be fixed
-- Remove my todo's and comments + unused code but there to show what I was planning

-- Missing testing for the Apis being triggered for more than one drink and mock api call always returns the same temp right now in the tests and isn't random

-- Create a helper for generating random drinks data

-- I created the start of a hook useGetTemperature for accessing single but didn't have enough time to handle many calls and then to move away from the rather messy api existing call, which immeditaly changes state on each response and is tightly tying the api calls and results to the code.

-- Add some depedency inversion to the external utils (axios/fetch + react testing library)

-- The data shape would be simplier if we had an array of 'values' rather than an object. We don't need to keep matching the id to the object in the table body, but perhaps thats question to learn what is planned in future for the application to decide on the data structures.

- Fix prettier as wasn't working for me

- Restructure the codebase (the new hook is in the wrong place)

- Split out the express into smaller chunks

- Remove the header from the app index file and make jsx application fragment + test the index file

### Questions to ask:

What is the intended timing of the updates? Is it acceptible to load all the results all at once on each timer call.

Is there a openapi docs for the https://temperature-sensor-service.herokuapp.com/sensor?

What is the expected behavior if the api errors out?
