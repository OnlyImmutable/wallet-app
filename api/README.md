# api
The api project hosts our REST API to serve data to our other services

# configuration
To configure the API you must...

1. Clone `.env.example`
2. Rename `.env.example` that you cloned previously to `.env`
3. Configure the necessary environment variables you require

## api
There are API specific configuration variables that you need to remember when configuration `/app`.

- `PORT` represents the port the API is hosted on, as standard port `:3000` is selected and will host the API at `http://localhost:3000/`

## moralis
There is Moralis specific configuration that you need to bear in mind, for development purposes you can use the below configuration. For production, you will need to setup a Moralis account and collect production specific credentials.
```
MORALIS_API_KEY=5hJk3x5DrsMOb78jPbWhZTz0Nswg6YdO3vysZ196jfGL3zlfDqTiu9sozXeLQvDs
```

# development
To boot up the api in development mode, we use `nodemon`. You can run in watch mode using `yarn watch`.

Use the following commands in order:
- `yarn`
- `yarn watch`

# testing
You can run the test suite, Jest, using `yarn test`. 

More testing will be added including integration tests and mocking too.
