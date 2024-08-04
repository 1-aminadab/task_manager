# Task Management Boilerplate

This repo can be used as a starting point for backend development with Nodejs, Express, TypeScript and Posggress.

A few things to note in the project:

- **TypeScript** - It uses TypeScript.
- **JWT** - It uses JWT Token for Authentication.
- **POsgress Connection Helper** - A helper class to connect to Posggress reliably.
- **Joi** - For declarative payload validation
- **Middleware for easier async/await** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
- **.env file for configuration** - Change server config like app port, postgress url etc
- **Winston Logger** - Uses winston as the logger for the application.
- **ESLINT** - ESLINT is configured for linting.
- **Jest** - Using Jest for running test cases
- **Swagger** - Open API Specification

## Installation

### Manual Method

#### 1. Clone this repo

```
$ git clone https://github.com/kvvignesh/Node-TypeScript-Express-Posggress.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## Development

### Start dev server

```
$ npm run dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000`
- 🛢️**Postgress** running at `gres://localhost:27017`

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.sample` to start with.

| Var Name     | Type   | Default           | Description                               |
| ------------ | ------ | ----------------- | ----------------------------------------- |
| NODE_ENV     | string | `development`     | API runtime environment. eg: `production` |
| PORT         | number | `3000`            | Port to run the API server on             |
| POSTGRES_URL | string | URL for Postgress |
| SECRET       | string | `gyqslijqnddhqk`  | JWT Token's Secret Key                    |

## Logging

The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.

- All logs are saved in `./logs` directory.
- Console messages are prettified
- Each line in error log file is a stringified JSON.

## License

no licence yet
