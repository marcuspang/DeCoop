# Crypto.com 2022 Hackathon Demo By Wen Lambo

Code taken from https://github.com/Uniswap/web3-react/tree/main/packages/example-next

## Problem
- People in less developed countries right now have access to the internet but they do not have access to financial services because of expensive bank fees and lack of infrastructure.

## Solution
- Giving rural communities access to financial services and forms of identity through the Internet. 
- Able to create pseudonymous banking accounts to exchange with one another and form groups (eg. as mini entities/organisations) to track expenses and treasury related manners. Includes lending/borrowing
- Empowers people with all the benefits of coop banking without of drawbacks like centralisation or maintaining a large tally system



## How to run our prototype
1. Add our telegram bot `@decoop_bot` to your telegram group that you want to start your community fund with.

2. Run `/start` for a list of commands.

3. Run `/create <fund name>` to create a fund.

4. Run `/lend <amount>` to deposit or lend money into the fund.

5. Run `/borrow <amount>` to withdraw money from the fund.

6. Run `/balance <address>` to check your balance.

7. Click on the link to connect your wallet.

8. Visit our website at `crypto-2022-hackathon.vercel.app/` to see the fund's balance and your transactions.

## Architecture

- Front end is located in this folder
- Contracts are located in `/contracts/`
- Our telegram bot is located in `/tele-bot`

## Front end

### Getting Started for Front End

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

