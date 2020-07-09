# discord-bot-node

Discord bot built on Node.js

# Setup

## Create Discord Server

- Create server on Discord
- Input and note `server name`

## Create Bot

- Log into Discord Developer Portal
  > https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications
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
