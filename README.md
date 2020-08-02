# Discord Bot - Node.js | Raspberry Pi

Discord bot built on Node.js running on Raspberry Pi OS

# Setup

## Create Discord Server

- Create server on Discord
- Input and note `server name`

## Create Bot

- Log into [Discord Developer Portal](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)
- Click `New Application`
- Input and note bot `name` and create the app
- Under Settings/General Information, note `CLIENT ID` and `CLIENT SECRET`
  > `CLIENT SECRET` will be used for auth token
- Under Settings/Bot, add a bot user with `Add Bot`

## Define Bot Permissions & Deploy

- Under Settings/OAuth2, define the scope of permissions for the bot. Select scope `bot`
- Select all bot permissions and copy the URL generated
  > `permissions=0` indicates no set permissions
- Copy generated URL or use this example to create URL: `https://discord.com/api/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID&permissions=DISCORD_BOT_PERMISSIONS&scope=bot`
- Paste the URL into the browser. This should prompt to add the bot to a server

## Install Postgres on Raspbian | Raspberry Pi OS

- `ssh` into raspberry pi: `ssh pi@IP_ADDRESS`
- Gain root access: `sudo -i`
- Install psql: `sudo apt install postgresql postgresql-contrib`
  > Issues: Postgres ‘buster-pgdg’ doesn’t support ARM architecture
  > Install older version of psql `sudo apt install postgresql-9.6`

## Setup Postgres database

- In the project's repo, navigate to `./server/config/db.seed.sql`
- Run the seed script to populate the DB structure

## Setup .env

- Create a `.env` in the root of the repo
- Setup the `.env` file for the project to access restricted information

```
DISCORD_BOT_NAME=your bot name
DISCORD_BOT_TOKEN=discord bot's token
ADMIN=discord username to be admin of this bot
PORT=api server's port
DB_NAME=database name
DB_PASSWORD=database password
```

## Project Setup

- Base project: `git clone https://github.com/sitepoint-editors/discord-bot-sitepoint`

## CDN Endpoints

https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints

### Technologies

- node
- discord.js
- dotenv
- express
- postgres
- axios
- dayjs
- novelcovid

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
