[![Build Status](https://travis-ci.org/teampepe69/cryptomeme.svg?branch=master)](https://travis-ci.org/teampepe69/cryptomeme)
[![Coverage Status](https://coveralls.io/repos/github/teampepe69/cryptomeme/badge.svg?branch=master)](https://coveralls.io/github/teampepe69/cryptomeme?branch=master)

# cryptomeme

Hello pepe

# Pre-requisites

(TODO)

# Setting up

Install the trufflesuite by running `npm install -g truffle`

Install ganache by running `npm install -g ganache-cli`

Download the project via `git clone https://github.com/teampepe69/cryptomeme.git`

Go into the project root directory from your current directory by running `cd cryptomeme`

From the project root directory, install the blockchain dependencies by running `npm install`

Go into the `client` directory by running `cd client` from the project root directory

Install the web application dependencies by running `npm install`

# Running the web application

From the project root directory run `ganache-cli -p 8545 -d`

Opening a separate terminal on the same directory, run `truffle migrate`

Go into the `client` directory by running `cd client` and run `npm start`
