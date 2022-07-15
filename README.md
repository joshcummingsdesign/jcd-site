# Josh Cumming Design

My Website

## Requirements

- [Lando](https://lando.dev/) ^3.6.0
- [Node](https://nodejs.org) ^18.3.0

## Getting Started

1. Copy `.env.example` to `.env` and update the values

        cp .env.example .env

2. Start the services

        lando start

4. Install npm dependencies

        npm install

5. Install bundler dependencies

        npm run bundler

6. Run the Jekyll server in one terminal window

        npm run serve

7. Start the project watcher in another terminal window

        npm run dev

## Testing

Run tests

    npm run test

## Versioning

Releases use Calendar Versioning with the format `Year.Quarter.Index` where the index is zero-based. For example, the
first change in Q4 2020 would be `2020.4.0`.
