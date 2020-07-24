const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const constant = require("../../utils/constant");

const whoAmI = {
  name: "!whoami",
  description: "I am, who I say I am",
  execute: async (msg, args) => {
    const embededMessage = new MessageEmbed()
      .setColor(constant.theme.default)
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}`
      )
      .addFields(
        {
          name: "User",
          value: `Name: ${msg.author.username}#${msg.author.discriminator}`,
        },
        {
          name: `Channel`,
          value: `Name: ${
            msg.channel.guild.name
          }\nOwner: ${msg.channel.guild.member(
            msg.channel.guild.ownerID
          )}\nJoined: ${dayjs(msg.channel.guild.joinedTimestamp).format(
            "MM-DD-YYYY hh:mma"
          )}\nServer Location: ${msg.channel.guild.region}`,
        }
      )
      .setFooter(constant.author);
    await msg.channel.send(embededMessage);
  },
};

module.exports = whoAmI;

// Message {
//   channel: TextChannel {
//     type: 'text',
//     deleted: false,
//     id: '734441786826555514',
//     name: 'general',
//     rawPosition: 0,
//     parentID: '734441786826555512',
//     permissionOverwrites: Collection [Map] {},
//     topic: null,
//     nsfw: undefined,
//     lastMessageID: '736018168677662800',
//     rateLimitPerUser: 0,
//     lastPinTimestamp: null,
//     guild: Guild {
//       members: [GuildMemberManager],
//       channels: [GuildChannelManager],
//       roles: [RoleManager],
//       presences: [PresenceManager],
//       voiceStates: [VoiceStateManager],
//       deleted: false,
//       available: true,
//       id: '734441786163986555',
//       shardID: 0,
//       name: 'sugoidev',
//       icon: '4a8d86d974ed6897561479d30eb564f5',
//       splash: null,
//       region: 'us-west',
//       memberCount: 3,
//       large: false,
//       features: [],
//       applicationID: null,
//       afkTimeout: 300,
//       afkChannelID: null,
//       systemChannelID: '734441786826555514',
//       embedEnabled: undefined,
//       premiumTier: 0,
//       premiumSubscriptionCount: 0,
//       verificationLevel: 'NONE',
//       explicitContentFilter: 'DISABLED',
//       mfaLevel: 0,
//       joinedTimestamp: 1595197820056,
//       defaultMessageNotifications: 'ALL',
//       systemChannelFlags: [SystemChannelFlags],
//       vanityURLCode: null,
//       description: null,
//       banner: null,
//       rulesChannelID: null,
//       publicUpdatesChannelID: null,
//       ownerID: '382746048667451392',
//       emojis: [GuildEmojiManager]
//     },
//     messages: MessageManager {
//       cacheType: [Function: LimitedCollection],
//       cache: [LimitedCollection [Map]],
//       channel: [Circular]
//     },
//     _typing: Map { '382746048667451392' => [Object] }
//   },
//   deleted: false,
//   id: '736018168677662800',
//   type: 'DEFAULT',
//   content: '!whoami',
//   author: User {
//     id: '382746048667451392',
//     bot: false,
//     username: 'sugoisauce',
//     discriminator: '1862',
//     avatar: null,
//     lastMessageID: '736018168677662800',
//     lastMessageChannelID: '734441786826555514',
//     flags: UserFlags { bitfield: 0 }
//   },
//   pinned: false,
//   tts: false,
//   nonce: '736018173995778048',
//   system: false,
//   embeds: [],
//   attachments: Collection [Map] {},
//   createdTimestamp: 1595550805969,
//   editedTimestamp: null,
//   reactions: ReactionManager {
//     cacheType: [Function: Collection],
//     cache: Collection [Map] {},
//     message: [Circular]
//   },
//   mentions: MessageMentions {
//     everyone: false,
//     users: Collection [Map] {},
//     roles: Collection [Map] {},
//     _members: null,
//     _channels: null,
//     crosspostedChannels: Collection [Map] {}
//   },
//   webhookID: null,
//   application: null,
//   activity: null,
//   _edits: [],
//   flags: MessageFlags { bitfield: 0 },
//   reference: null
// }
