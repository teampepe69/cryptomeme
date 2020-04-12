[![Build Status](https://travis-ci.org/teampepe69/cryptomeme.svg?branch=master)](https://travis-ci.org/teampepe69/cryptomeme)
[![Coverage Status](https://coveralls.io/repos/github/teampepe69/cryptomeme/badge.svg?branch=master)](https://coveralls.io/github/teampepe69/cryptomeme?branch=master)

# CryptoMeme

**CryptoMeme** aims to encourge meme creators to create memes and upload them onto a social media-like blockchain platform so as to spread the love and joy of memes all over the world. Currently, Meme creators are mostly paid by companies to come up with Memes as a form of advertisement for these companies.

**CryptoMeme** aims to resolve this issue by rewarding meme creators for uploading memes with our very own cryptocurrency **Peperonis**. We hope that through CryptoMeme, more meme creators would be encouraged in creating memes for people all over the world to enjoy the joy of memes and have their fill of laughter in today's depressing society.

![alt text](https://raw.githubusercontent.com/teampepe69/cryptomeme/master/docs/Sample1.png "CryptoMeme platform")

# Installation & Setup
## 1. Blockchain Environment

* Install the trufflesuite by running `npm install -g truffle`

* Install ganache by running `npm install -g ganache-cli`

## 2. Project Environment

* Download the project via `git clone https://github.com/teampepe69/cryptomeme.git`

* Go into the project root directory from your current directory by running `cd cryptomeme`

* From the project root directory, install the blockchain dependencies by running `npm install`

* Go into the `client` directory by running `cd client` from the project root directory

* Install the web application dependencies by running `npm install`

## 3. Browser Environment

* **CryptoMeme** requires its users to have [MetaMask](https://metamask.io/download.html) installed on their browser.

* Download [MetaMask](https://metamask.io/download.html) and set it up for your browser that you wish to run **CryptoMeme** from.

# Deploying the web application

## Local Deployment

* From the project root directory run `ganache-cli -p 8545 -d`. You'll get a list of accounts with 100 ether (for your ganache network) and their respective private keys as shown below:

```
    Available Accounts
    ==================
    (0) 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 (100 ETH)
    (1) 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 (100 ETH)
    (2) 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b (100 ETH)
    (3) 0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d (100 ETH)
    (4) 0xd03ea8624C8C5987235048901fB614fDcA89b117 (100 ETH)
    (5) 0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC (100 ETH)
    (6) 0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9 (100 ETH)
    (7) 0x28a8746e75304c0780E011BEd21C72cD78cd535E (100 ETH)
    (8) 0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E (100 ETH)
    (9) 0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e (100 ETH)

    Private Keys
    ==================
    (0) 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
    (1) 0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
    (2) 0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
    (3) 0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913
    (4) 0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743
    (5) 0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd
    (6) 0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52
    (7) 0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3
    (8) 0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4
    (9) 0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773
```

* Import these accounts into your MetaMask through the Private Key option.

* Ensure that your MetaMask is running on `Localhost 8545` and not any other network (i.e Mainnet, Ropsten)

* Opening a separate terminal on the same directory, run `truffle migrate`

* Go into the `client` directory by running `cd client` and run `npm start`

* Your browser would open up a tab on `localhost:3000`, and you can now start creating some memes!

* Note that the first account `0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1` is a default admin account. You can login with this account directly :)

## Ropsten Deployment
This application has been deployed onto the Ropsten Test Network at the following addresses:
```
Network: ropsten (id: 3)
  Meme: 0x7991D82800aEcfb4124183B08e10051289FFC820
  MemeketPlace: 0x131ace268A4CE8d6276F1cBDC019b7C6174a789F
  Migrations: 0xe31acEdC48Bf48E348A3D3dc7C56a52fDbdf60f1
  PepeCoin: 0x0B020B015931AE2c07Bd4AB44883Af1Ac05eBff0
  User: 0x50722B36b2D9d155E8D40054D2a5e70eF81C03c5
```

If you wish to connect to the ropsten network insted of your own localhost ganache client, simply run `npm start` from the `client` folder. Ensure that your **MetaMask** is configured to be on the **Ropsten Network** as well.

Alternatively, you can have a go with the web application over [here](http://13.229.147.209:3000/) :)

# Features

## User Related Features
1. Creating an Account
2. Logging into Account
3. Updating Profile

## Meme Related Features
1. Creating a Meme
2. Liking a Meme
3. Disliking a Meme
4. Flagging a Meme
5. Increasing Value for your Meme

## Admin Related Features
1. Approve Account
2. Reject Account
3. Promote Account to Admin
4. Reject Meme
5. Approve Meme

# FAQ
* Why is `secrets.js` pushed?
  * Yes we know it's insecure to do this but because this is for a school project so we would like to think our instructors would need to see every single file that was involved :) This would definitely be taken down once the semester is over.
  
* What's a meme?
    * A meme is an image, video, piece of text, etc., typically humorous in nature, that is copied and spread rapidly by Internet users, often with slight variations (taken from google).
  
* Why Pepe the Frog?
    * Pepe the Frog is actually more than a meme, it's a symbol of freedom, peace and love. 
    * [Reference](https://www.wired.com/story/pepe-the-frog-meme-hong-kong/)
  
* I love this platform! How can I help?
    * Currently this is actually a school project but I guess pull requests and issues are always welcomed :)

* Who are you guys?
    * We're a bunch of students from the National University of Singapore taking a Blockchain module. We're doing this project as part of our module.


# Feature Requests/ Bug Reporting
Kindly request for any features or report any bugs by opening an issue [here](https://github.com/teampepe69/cryptomeme/issues) :)

# License
[MIT](https://choosealicense.com/licenses/mit/)
