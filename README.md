**Pre-requisites** <br/>
Execute 
`npm install`
and
`npx playwright install`

**Configuration** <br />
1. Create `.env` file in the root repository folder
2. Cope the values from `.env.template` manually or using `cp .env.template .env`

P.S. I saved mine access token just for testing purposes.
1Password or the same should be using to share the values in the team.
For CI/CD it should using secret environment variables as parameters to setup.

**Execution** <br />
To run api tests:
`npm run tests:api`
To run ui tests: 
`npm run tests:ui`

**Report** <br />
To see the report of tests execution run the command:
`npx playwright show-report`