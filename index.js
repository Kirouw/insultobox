const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
	console.log(`${bot.user.username} est démarré`);
	bot.user
		.setPresence({
			activity: { name: "les insultes | !helpinsulte", type: 2 },
			status: "online",
		})
		.catch(console.error);
});

const insulteArray = [
	"con",
	"connard",
	"pd",
	"fils de pute",
	"fils de putes",
	"fdp",
	"batard",
	"bâtard",
	"batards",
	"bâtards",
	"connasse",
	"connasses",
	"conne",
	"connes",
	"gros lard",
	"merdeux",
	"pute",
	"putes",
	"abruti",
	"abrutis",
	"sa mère",
	"ta mère",
	"nique",
	"enculer",
	"enculé",
	"enculés",
	"trou du cul",
	"trou duc",
	"trou d'uc",
	"putain",
	"sac à merde",
	"merde",
	"merdes",
	"bordel",
	"garce",
	"garces",
	"pédé",
	"pédés",
	"couillon",
	"couillons",
	"imbécile",
	"imbéciles",
	"foutre",
	"foutres",
	"suce ma bite",
	"suce ma queue",
	"fiote",
	"fiotes",
	"salop",
	"salops",
	"salope",
	"salopes",
];

let counterCagnotte = 0;
let counterInsulte = 0;

let newUser = new Array();

let found = false;

bot.on("message", (message) => {
	if (message.content === "!helpinsulte") {
		message.channel.send({
			embed: {
				color: 0xbf0707,
				fields: [
					{
						name: "!stats",
						value:
							"Affiche les statistiques personnel de chaque personnes qui ont écrit des insultes",
					},
					{
						name: "!tirelire",
						value: "Affiche le total de la tirelire dans la boîte à gros mots",
					},
					{
						name: "!insulte",
						value: "Affiche le total d'insulte écrite dans les divers channels",
					},
				],
				timestamp: new Date(),
				footer: {
					text: "InsultoBox",
				},
			},
		});
	} else if (message.content.includes("!addinsulte")) {
		if (
			message.author.id === "267763097215696896" ||
			message.author.id === "263155833934708736"
		) {
			const idUser = message.content.match(/(<@!)$|[0-9]+|(>)$/);
			const nbInsulte = message.content.match(/(>)^|[0-9]$/);
			if (idUser[0] && nbInsulte[0]) {
				if (newUser.length) {
					let user = newUser.find((result) => result.id === idUser[0]);
					if (user && user.id === idUser[0]) {
						user.insulte += 1;
						user.cagnotte += 0.01;
						counterCagnotte += 0.01;
						counterInsulte += 1;
					} else {
						bot.users.fetch(idUser[0]).then((result) => {
							newUser.push({
								id: result.id,
								name: result.username,
								avatar: `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.webp`,
								insulte: 1,
								cagnotte: 0.01,
							});
						});
					}
				} else {
					if (!message.author.bot) {
						bot.users.fetch(idUser[0]).then((result) => {
							newUser.push({
								id: result.id,
								name: result.username,
								avatar: `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.webp`,
								insulte: 1,
								cagnotte: 0.01,
							});
						});
					}
				}
			} else {
				message.channel.send({
					embed: {
						color: 0xbf0707,
						title: "Erreur",
						description:
							"Impossible de trouver l'indentifiant et le nombre d'insulte à ajouter",
						timestamp: new Date(),
						footer: {
							text: "InsultoBox",
						},
					},
				});
			}
		}
	} else if (message.content.includes("!removeinsulte")) {
		if (
			message.author.id === "267763097215696896" ||
			message.author.id === "263155833934708736"
		) {
			const idUser = message.content.match(/(<@!)$|[0-9]+|(>)$/);
			const nbInsulte = message.content.match(/(>)^|[0-9]$/);
			if (idUser[0] && nbInsulte[0]) {
				if (newUser.length) {
					let user = newUser.find((result) => result.id === idUser[0]);
					if (user && user.id === idUser[0]) {
						user.insulte -= nbInsulte[0];
						user.cagnotte -= 0.01 * nbInsulte[0];
						counterCagnotte -= 0.01;
						counterInsulte -= 1;
					}
				}
			}
		}
	} else if (message.content === "!tirelire") {
		message.channel.send({
			embed: {
				color: 0xbf0707,
				title: "Total de la tirelire",
				description: `La tirelire de la boîte à gros mots est de ${counterCagnotte}€`,
				timestamp: new Date(),
				footer: {
					text: "InsultoBox",
				},
			},
		});
	} else if (message.content === "!insulte") {
		message.channel.send({
			embed: {
				color: 0xbf0707,
				title: "Total d'insulte",
				description: `Il y a actuellement ${counterInsulte} insulte(s) au compteur !`,
				timestamp: new Date(),
				footer: {
					text: "InsultoBox",
				},
			},
		});
	} else if (message.content === "!stats") {
		if (newUser.length) {
			for (const key in newUser) {
				message.channel.send({
					embed: {
						color: 0xbf0707,
						thumbnail: {
							url: `${newUser[key].avatar}`,
						},
						fields: [
							{
								name: "Pseudo :",
								value: `${newUser[key].name}`,
							},
							{
								name: "Nombre d'insulte :",
								value: `${newUser[key].insulte}`,
							},
							{
								name: "Tirelire personnel :",
								value: `${newUser[key].cagnotte.toFixed(2)}€`,
							},
						],
						timestamp: new Date(),
						footer: {
							text: "InsultoBox",
						},
					},
				});
			}
		} else {
			message.channel.send({
				embed: {
					color: 0xbf0707,
					title: "Statistiques",
					description: `Aucun personne n'a dit d'insulte pour le moment !`,
					timestamp: new Date(),
					footer: {
						text: "InsultoBox",
					},
				},
			});
		}
	} else {
		insulteArray.forEach((insulte) => {
			// var rgx = new RegExp("(W|^)(" + insulte + ")(W|$)");
			var rgx = new RegExp("( |^)" + insulte + "( |$)", "g");
			if (rgx.test(message.content) && !message.author.bot) {
				counterCagnotte += 0.01;
				counterInsulte += 1;

				const embedMessage = message.channel.send({
					embed: {
						color: 0xbf0707,
						title: "Alerte au gros mots !",
						description: `Wow wow wow, **${insulte.toUpperCase()}** est une insulte **${
							message.author.username
						}** ! +0.01€ ajouté à la boîte à gros mot ! Merci !`,
						timestamp: new Date(),
						footer: {
							text: "InsultoBox",
						},
					},
				});

				if (newUser.length) {
					let user = newUser.find((result) => result.id === message.author.id);
					if (user && user.id === message.author.id) {
						user.insulte += 1;
						user.cagnotte += 0.01;
					} else {
						newUser.push({
							id: message.author.id,
							name: message.author.username,
							avatar: message.author.displayAvatarURL(),
							insulte: 1,
							cagnotte: 0.01,
						});
					}
				} else {
					if (!message.author.bot) {
						newUser.push({
							id: message.author.id,
							name: message.author.username,
							avatar: message.author.displayAvatarURL(),
							insulte: 1,
							cagnotte: 0.01,
						});
					}
				}
				return embedMessage;
			}
		});
	}
});
