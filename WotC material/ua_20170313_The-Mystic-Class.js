var iFileName = "ua_20170313_The-Mystic-Class.js";
RequiredSheetVersion("13.1.14");
// This file adds the content from the Unearthed Arcana: The Mystic Class article to MPMB's Character Record Sheet
// WARNING: there are no published multiclassing rules for Mystic; the ones provided here are extrapolated from other classes

// Define the source
SourceList["UA:TMC"] = {
	name : "Unearthed Arcana: The Mystic Class",
	abbreviation : "UA:TMC",	
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2017/dnd/downloads/UAMystic3.pdf",
	date : "2017/03/13"
};

// Add spell schools
spellSchoolList["Avatar"] = "avatar";
spellSchoolList["Awake"]  = "awakened";
spellSchoolList["Immor"]  = "immortal";
spellSchoolList["Nomad"]  = "nomad";
spellSchoolList["Wu Jen"] = "wu jen";

// Adds a new class, the Mystic, with 6 subclasses
ClassList.mystic = {
	regExpSearch : /psion\b|mystic/i,
	name : "Mystic",
	source : [["UA:TMC", 1]],
	primaryAbility : "Intelligence",
	abilitySave : 4,
	prereqs : "Intelligence 13",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Wis", "Int"],
	skillstxt : {
		primary : "Choose two from Arcana, History, Insight, Medicine, Nature, Perception, and Religion"
	},
	armorProfs : {
		primary : [true, false, false, false]
	},
	weaponProfs : {
		primary : [true, false]
	},
	equipment : "Mystic starting equipment:\n \u2022 A spear -or- a mace;\n \u2022 Leather mail -or- studded leather armor;\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;\n \u2022 A scholar's pack -or- an explorer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Mystic Order", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "psionic0",
	spellcastingKnown : {
		cantrips : levels.map(function (n) { return n < 3 ? 1 : n < 10 ? 2 : n < 17 ? 3 : 4; }),
		spells : levels.map(function (n) { return n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8; })
	},
	spellcastingList : {
		"class" : "mystic",
		psionic : true
	},
	features : {
		"psi points" : {
			name : "Psi Points",
			source : [["UA:TMC", 3]],
			minlevel : 1,
			description : desc([
				"I use psi points to fuel my psionic disciplines, up to my psi limit per instance"
			]),
			usages : levels.map(function (n) {
				return n < 2 ? 4 : n < 3 ? 6 : n < 4 ? 14 : n < 5 ? 17 :
				n < 6 ? 27 : n < 7 ? 32 : n < 8 ? 38 : n < 9 ? 44 : n < 10 ? 57 :
				n < 18 ? 64 : 71;
			}),
			recovery : "long rest",
			additional : levels.map(function (n) {
				return (n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 5 : n < 9 ? 6 : 7) + " psi limit";
			})
		},
		"psionics" : {
			name : "Psionics",
			source : [["UA:TMC", 3]],
			minlevel : 1,
			description : desc([
				"I can use psionic talents/disciplines that I know, using Intelligence as my psionic ability"
			]),
			additional : levels.map(function (n) {
				var talent = n < 3 ? "1 talent" : (n < 10 ? 2 : n < 17 ? 3 : 4) + " talents";
				var discpl = n < 3 ? "1 discipline" : (n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " disciplines";
				return talent + " \u0026 " + discpl + " known";
			})
		},
		"psychic focus" : {
			name : "Psychic Focus",
			source : [["UA:TMC", 3]],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can choose one of my psionic disciplines and gain its focus benefit",
				"I can only focus on one at a time; It stays until I focus on another, or I'm incapacitated"
			]),
			action : [["bonus action", ""]]
		},
		"subclassfeature1" : {
			name : "Mystic Order",
			source : [["UA:TMC", 4]],
			minlevel : 1,
			description : desc([
				"Choose a Mystic Order that shapes the nature of your rage and put it in the \"Class\" field"
			])
		},
		"mystical recovery" : {
			name : "Mystical Recovery",
			source : [["UA:TMC", 4]],
			minlevel : 2,
			description : desc([
				"As a bonus action after using psi points on a discipline, I can regain HP per point spent"
			]),
			action : [["bonus action", ""]]
		},
		"telepathy" : {
			name : "Telepathy",
			source : [["UA:TMC", 4]],
			minlevel : 2,
			description : desc([
				"I can telepathically speak to creatures I can see within 120 ft, if they know a language" // 'to' not 'with', so one-way
			])
		},
		"strength of mind" : {
			name : "Strength of Mind",
			source : [["UA:TMC", 4]],
			minlevel : 4,
			description : desc([
				"After a short rest, I can change my Wisdom save proficiency to another ability score"
			])
		},
		"potent psionics" : {
			name : "Potent Psionics",
			source : [["UA:TMC", 4]],
			minlevel : 8,
			description : desc([
				"Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				"In addition, I add my Intelligence modifier to my psionic talent damage rolls"
			]),
			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 psychic damage";
			}),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.mystic && classes.known.mystic.level > 7 && !v.isSpell) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.mystic.level < 14 ? 1 : 2) + 'd8 psychic damage';
						};
					},
					"Once per turn, I can have one of my weapon attacks that hit do extra psychic damage.\n \u2022 My psionic talents get my Intelligence modifier added to their damage roll."
				],
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.mystic && classes.known.mystic.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('mystic') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Int Mod');
						};
					},
					""
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spellObj.psionic && spellObj.level == 0) {
							return genericSpellDmgEdit(spellKey, spellObj, "\\w+|Acid, Cold, Fire, Lightning, or Thunder", "Int", true);
						}
					},
					"My psionic talents get my Intelligence modifier added to their damage."
				]
			}
		},
		"consumptive power" : {
			name : "Consumptive Power",
			source : [["UA:TMC", 5]],
			minlevel : 10,
			description : desc([
				"Once per long rest, I can use my HP to fuel a psionic discipline instead of psi points",
				"I lose the HP; My HP max is reduced with the same until I finish my next long rest"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"psionic mastery" : {
			name : "Psionic Mastery",
			source : [["UA:TMC", 5]],
			minlevel : 11,
			description : desc([
				"As an action, I can gain a pool of special psi points that last until I finish a long rest",
				"I can use these, without psi limit, for disciplines that require an action or bonus action",
				"I can use either these or psi points from my normal pool for a discipline, but not both",
				"I can concentrate on all disciplines that use these special points at the same time",
				"I lose concentration if I cast a discipline requiring concentration from my normal pool"
			]),
			usages : levels.map(function (n) {
				if (n < 11) return "";
				return n < 13 ? 1 : n < 15 ? 2 : n < 17 ? 3 : 4;
			}),
			recovery : "long rest",
			additional : levels.map(function (n) {
				if (n < 11) return "";
				return "pool of " + (n < 15 ? 9 : 11) + " psi points";
			}),
			action : [["action", ""]]
		},
		"psionic body" : {
			name : "Psionic Body",
			source : [["UA:TMC", 5]],
			minlevel : 20,
			description : desc([
				"I no longer age and I have resistance to bludgeoning, piercing, and slashing damage",
				"I'm immune to disease, poison damage, and the poisoned condition",
				"If I die, I have a 55% chance of discorporating instead and returning 1d3 days later"
			]),
			savetxt : { immune : ["poison", "disease"] },
			dmgres : ["Bludgeoning", "Piercing", "Slashing"]
		}
	}
};
// Order of the Avatar subclass for the Mystic
AddSubClass("mystic", "avatar-ua", {
	regExpSearch : /^(?=.*(psion\b|mystic))(?=.*avatar).*$/i,
	subname : "Order of the Avatar",
	source : [["UA:TMC", 5]],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : [["UA:TMC", 5]],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, chosen from the avatar disciplines",
			spellcastingBonus : [{
				name : "Bonus Disciplines",
				"class" : "mystic",
				school : ["Avatar"],
				level : [1, 9],
				times : 2,
				psionic : true
			}]
		},
		"subclassfeature1.1" : {
			name : "Armor Training",
			source : [["UA:TMC", 5]],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with medium armor and shields.",
			armorProfs : [false, true, false, true]
		},
		"subclassfeature3" : {
			name : "Avatar of Battle",
			source : [["UA:TMC", 5]],
			minlevel : 3,
			description : "\n   " + "Allies within 30 ft of me gain +2 on initiative rolls while I'm not incapacitated"
		},
		"subclassfeature6" : {
			name : "Avatar of Healing",
			source : [["UA:TMC", 6]],
			minlevel : 6,
			description : desc([
				"Allies within 30 ft of me that get healed through a psionic discipline, get extra healing",
				"They add my Intelligence modifier to the HP regained, as long as I'm not incapacitated"
			]),
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (!What("Int Mod") || What("Int Mod") <= 0) return;
						switch (spellKey) {
							case "pr1-mend wounds" :
								spellObj.description = spellObj.description.replace("healed for ", "healed for " + What("Int Mod") + "+");
								return true;
							case "pr2-restore health" :
								spellObj.description = spellObj.description.replace("1 HP", (1 + What("Int Mod")) + " HP");
								return true;
						}
					},
					"I add my Intelligence modifier to the hit points I restore using my psionic disciplines."
				]
			}
		},
		"subclassfeature14" : {
			name : "Avatar of Speed",
			source : [["UA:TMC", 6]],
			minlevel : 14,
			description : "\n   " + "Allies within 30 ft of me can use Dash as a bonus action while I'm not incapacitated"
		}
	}
});
// Order of the Awakened subclass for the Mystic
AddSubClass("mystic", "awakened-ua", {
	regExpSearch : /^(?=.*(psion\b|mystic))(?=.*awakened).*$/i,
	subname : "Order of the Awakened",
	source : [["UA:TMC", 6]],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : [["UA:TMC", 6]],
			minlevel : 1,
			description : " [+2 awakened disciplines]",
			spellcastingBonus : [{
				name : "Bonus Disciplines",
				"class" : "mystic",
				school : ["Awake"],
				level : [1, 9],
				times : 2,
				psionic : true
			}]
		},
		"subclassfeature1.1" : {
			name : "Awakened Talent",
			source : [["UA:TMC", 6]],
			minlevel : 1,
			description : desc([
				"I gain proficiency with two skills of my choice, taken from the following list:",
				"Animal Handling, Deception, Insight, Intimidation, Investigation, Perception, Persuasion"
			]),
			skillstxt : "Choose two from: Animal Handling, Deception, Insight, Intimidation, Investigation, Perception, and Persuasion"
		},
		"subclassfeature3" : {
			name : "Psionic Investigation",
			source : [["UA:TMC", 6]],
			minlevel : 3,
			description : desc([
				"By concentrating on an object I'm holding for 10 minutes, I learn the object's history",
				"I see/hear its surroundings the previous hour and know who hold it in the last 24 hours",
				"Also, for the next 24 hours, I can use an action to locate it and see its surroundings"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature6" : {
			name : "Psionic Surge",
			source : [["UA:TMC", 6]],
			minlevel : 6,
			description : desc([
				"I can end my psychic focus to impose disadv. on a save vs. a discipline or talent I use",
				"Once I do this, I can't regain psychic focus in any discipline until I can use this again"
			]),
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature14" : {
			name : "Spectral Form",
			source : [["UA:TMC", 6]],
			minlevel : 14,
			description : desc([
				"As an action, I can become ghostly and move through objects and creatures for 10 min",
				"I also have resistance to all damage and move at half speed; I can end it as an action"
			]),
			usages : 1,
			recovery : "long rest",
			action : [["action", ""]]
		}
	}
});
// Order of the Immortal subclass for the Mystic
AddSubClass("mystic", "immortal-ua", {
	regExpSearch : /^(?=.*(psion\b|mystic))(?=.*immortal).*$/i,
	subname : "Order of the Immortal",
	source : [["UA:TMC", 6]],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : [["UA:TMC", 7]],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, taken from the immortal disciplines",
			spellcastingBonus : [{
				name : "Bonus Disciplines",
				"class" : "mystic",
				school : ["Immor"],
				level : [1, 9],
				times : 2,
				psionic : true
			}]
		},
		"subclassfeature1.1" : {
			name : "Immortal Durability",
			source : [["UA:TMC", 7]],
			minlevel : 1,
			description : desc([
				"My hit point maximum increases by an amount equal to my mystic level",
				"If not wearing armor or wielding a shield, my AC is 10 + my Dex mod + my Con mod"
			]),
			calcChanges : {
				hp : function (totalHD) {
					if (classes.known.mystic) {
						return [classes.known.mystic.level, "Immortal Durability (mystic level)"];
					}
				}
			},
			armorOptions : [{
				regExpSearch : /^(?=.*immortal)(?=.*durability).*$/i,
				name : "Immortal Durability",
				source : [["UA:TMC", 7]],
				ac : "10+Con",
				affectsWildShape : true,
				selectNow : true
			}]
		},
		"subclassfeature3" : {
			name : "Psionic Resilience",
			source : [["UA:TMC", 7]],
			minlevel : 3,
			description : desc([
				"At the start of each turn, I gain my Intelligence modifier in temporary HP (min 0)"
			])
		},
		"subclassfeature6" : {
			name : "Surge of Health",
			source : [["UA:TMC", 7]],
			minlevel : 6,
			description : desc([
				"As a reaction when I take damage, I can halve that damage, but end my psychic focus",
				"Once I do this, I can't regain psychic focus in any discipline until I can use this again"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature14" : {
			name : "Immortal Will",
			source : [["UA:TMC", 7]],
			minlevel : 14,
			description : desc([
				"If I end my turn at 0 HP, I can use 5 psi points to regain mystic level + Con mod in HP"
			]),
			additional : levels.map(function (n) {
				if (n < 14) return "";
				return "HP: " + n + " + Constitution modifier";
			})
		}
	}
});
// Order of the Nomad subclass for the Mystic
AddSubClass("mystic", "nomad-ua", {
	regExpSearch : /^(?=.*(psion\b|mystic))(?=.*nomad).*$/i,
	subname : "Order of the Nomad",
	source : [["UA:TMC", 7]],
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : [["UA:TMC", 7]],
			minlevel : 1,
			description : "\n   " + "I know two additional psionic disciplines, taken from the nomad disciplines",
			spellcastingBonus : [{
				name : "Bonus Disciplines",
				"class" : "mystic",
				school : ["Nomad"],
				level : [1, 9],
				times : 2,
				psionic : true
			}]
		},
		"subclassfeature1.1" : {
			name : "Breadth of Knowledge",
			source : [["UA:TMC", 7]],
			minlevel : 1,
			description : desc([
				"After I finish a long rest, I gain two proficiencies in chosen language, tool, or skill",
				"These proficiencies last until I finish my next long rest"
			])
		},
		"subclassfeature3" : {
			name : "Memory of One Thousand Steps",
			source : [["UA:TMC", 7]],
			minlevel : 3,
			description : desc([
				"As a reaction when hit by an attack, I can teleport away, causing the attack to miss",
				"I can teleport to any empty space that I had occupied since the start of my last turn"
			]),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Superior Teleportation",
			source : [["UA:TMC", 7]],
			minlevel : 6,
			description : desc([
				"When I use a psionic discipline to teleport, I can increase its distance by up to 10 ft"
			]),
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						switch (spellKey) {
							case "ns1-step of a dozen paces" :
								var addDist = What("Unit System") === "metric" ? 3 : 10;
								spellObj.description = spellObj.description.replace(/(\d+ (ft|m))/i, addDist + "+$1");
								return true;
							case "ns3-defensive step" :
							case "ns4-there and back again" :
								var addDist = What("Unit System") === "metric" ? 3 : 10;
								var theDist = Number(spellObj.description.replace(/.*(\d+) (ft|m).*/i, "$1"));
								spellObj.description = spellObj.description.replace(/(\d+) (ft|m)/i, (theDist + addDist) + " $2");
								return true;
						}
					},
					"My psionic disciplines that teleport have 10 ft added to the distance of their teleportation."
				]
			}
		},
		"subclassfeature14" : {
			name : "Effortless Journey",
			source : [["UA:TMC", 7]],
			minlevel : 14,
			description : desc([
				"Once during my turn, I can teleport instead of moving, up to my movement speed ",
				"I subtracting the distance teleported from my remaining speed"
			])
		}
	}
});
// Order of the Soul Knife subclass for the Mystic
AddSubClass("mystic", "soul knife-ua", {
	regExpSearch : /^(?=.*soul\b)(?=.*\bknife).*$/i,
	subname : "Order of the Soul Knife",
	source : [["UA:TMC", 7]],
	fullname : "Soul Knife",
	features : {
		"subclassfeature1" : {
			name : "Martial Training",
			source : [["UA:TMC", 7]],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with medium armor and martial weapons",
			armor : [false, true, false, false],
			weapons : [false, true]			
		},
		"subclassfeature1.1" : {
			name : "Soul Knife",
			source : [["UA:TMC", 8]],
			minlevel : 1,
			description : desc([
				"As a bonus action, I can create or dismiss my soul knives on both my fists",
				"As a bonus action, I can parry with these to get +2 AC until the start of my next turn"
			]),
			action : [["bonus action", " (create/dismiss)"], ['bonus action', ' Parry']],
			weaponOptions : [{
				regExpSearch : /^(?=.*\bsoul)(?=.*(knives|knife|weapon)\b).*$/i,
				name : "Soul Knife",
				source : [["UA:TMC", 8]],
				ability : 1,
				type : "Martial",
				damage : [1, 8, "psychic"],
				range : "Melee",
				description : "Finesse, light",
				abilitytodamage : true,
				selectNow : true
			}]
		},
		"subclassfeature3" : {
			name : "Hone the Blade",
			source : [["UA:TMC", 8]],
			minlevel : 3,
			description : desc([
				"I can spend psi points to give my soul knives a bonus to attack and damage for 10 min",
				"2 psi points: +1; 5 psi points: +2; 7 psi points: +4"
			])
		},
		"subclassfeature6" : {
			name : "Consumptive Knife",
			source : [["UA:TMC", 8]],
			minlevel : 6,
			description : desc([
				"Whenever I slay an enemy with a soul knife attack, I immediately regain 2 psi points"
			])
		},
		"subclassfeature14" : {
			name : "Phantom Knife",
			source : [["UA:TMC", 8]],
			minlevel : 14,
			description : desc([
				"As an action, I can make one attack with my soul knife, treating the target's AC as 10"
			]),
			action : [["action", ""]]
		}
	}
});
// Order of the Wu Jen subclass for the Mystic
AddSubClass("mystic", "wu jen-ua", {
	regExpSearch : /^(?=.*\bwu\b)(?=.*\bjen\b).*$/i,
	subname : "Order of the Wu Jen",
	source : [["UA:TMC", 8]],
	fullname : "Wu Jen",
	features : {
		"subclassfeature1" : {
			name : "Bonus Disciplines",
			source : [["UA:TMC", 8]],
			minlevel : 1,
			description : " [+2 wu jen disciplines]",
			spellcastingBonus : [{
				name : "Bonus Disciplines",
				"class" : "mystic",
				school : ["Wu Jen"],
				level : [1, 9],
				times : 2,
				psionic : true
			}]
		},
		"subclassfeature1.1" : {
			name : "Hermit's Study",
			source : [["UA:TMC", 8]],
			minlevel : 1,
			description : desc([
				"I gain proficiency with two skills of my choice, taken from the following list:",
				"Animal Handling|Arcana|History|Insight|Medicine|Nature|Perception|Religion|Survival"
			]),
			skillstxt : "Choose two from: Animal Handling, Arcana, History, Insight, Medicine, Nature, Perception, Religion, and Survival"
		},
		"subclassfeature3" : {
			name : "Elemental Attunement",
			source : [["UA:TMC", 8]],
			minlevel : 3,
			description : desc([
				"If a target's resistance reduces damage of one of my psionic disciplines, I can bypass it",
				"With 1 extra psi point for the discipline (psi limit permitting), the resistance is ignored"
			])
		},
		"subclassfeature6" : {
			name : "Arcane Dabbler",
			source : [["UA:TMC", 8]],
			minlevel : 6,
			description : desc([
				"I know 3 wizard spells (1-3 level); When I gain a mystic level, I can swap one of these",
				"As a bonus action, I can use psi points to make spell slots; Last until my next long rest",
				"2 PP: 1st-level; 3 PP: 2nd-level; 5 PP: 3rd-level; 6 PP: 4th-level; 7 PP: 5th-level"
			]),
			spellcastingBonus : [{
				name : "Arcane Dabbler",
				"class" : "wizard",
				level : [1, 3],
				times : 3
			}]
		},
		"subclassfeature14" : {
			name : "Elemental Mastery",
			source : [["UA:TMC", 8]],
			minlevel : 14,
			description : desc([
				"As a reaction when I take damage to which I have resistance, I can ignore that damage",
				"I gain immunity to that damage type until the start of my next turn"
			])
		}
	}
});

// The Psionic Talents for the Mystic (with contributions by rabidknave)
PsionicsList["beacon-ua-psy"] = {
	name : "Beacon",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 bns",
	range : "Self",
	duration : "1 h (D)",
	description : "My body sheds bright light 20-ft rad and dim light 20-ft, in chosen color; dismiss as a bonus action",
	descriptionFull : "As a bonus action, you cause bright light to radiate from your body in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. The light lasts for 1 hour, and you can extinguish it earlier as a bonus action."
};
PsionicsList["blade meld-ua-psy"] = {
	name : "Blade Meld",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 bns",
	range : "Self",
	duration : "1 min",
	description : "One-handed melee weapon I'm holding merges with hand; it can't be removed for the duration",
	descriptionFull : "As a bonus action, a one-handed melee weapon you hold becomes one with your hand. For the next minute, you can't let go of the weapon nor can it be forced from your grasp."
};
PsionicsList["blind spot-ua-psy"] = {
	name : "Blind Spot",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "120 ft",
	duration : "Next turn end",
	save : "Wis",
	description : "1 creature save or treats me as invisible until the end of my next turn",
	descriptionFull : "As an action, you erase your image from the mind of one creature you can see within 120 feet of you; the target must succeed on a Wisdom saving throw, or you are invisible to it until the end of your next turn."
};
PsionicsList["delusion-ua-psy"] = {
	name : "Delusion",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "60 ft",
	duration : "1 min",
	description : "1 crea either hears a sound (whisper-scream), or sees up to 5-ft cube object that disappears on touch",
	descriptionFull : "As an action, you plant a false belief in the mind of one creature that you can see within 60 feet of you. You can create a sound or an image. Only the target of this talent perceives the sound or image you create." + "\n   " + "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a creature's roar, a musical instrument, or any other sound you pick. It lasts for 1 minute." + "\n   " + "If you create an object, it must fit within a 5-foot cube and can't move or be reflective. The image can't create any effect that influences a sense other than sight. The image lasts for 1 minute, and it disappears if the creature touches it."
};
PsionicsList["energy beam-ua-psy"] = {
	name : "Energy Beam",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "90 ft",
	duration : "Instantaneous",
	save : "Dex",
	description : "1 crea save or 1d8 Acid, Cold, Fire, Lightning, or Thunder dmg; +1d8 at CL 5, 11, and 17",
	descriptionCantripDie : "1 crea save or `CD`d8 Acid, Cold, Fire, Lightning, or Thunder dmg",
	descriptionFull : "As an action, you target one creature you can see within 90 feet of you. The target must succeed on a Dexterity saving throw or take 1d8 acid, cold, fire, lightning, or thunder damage (your choice)." + "\n   " + "The talent's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)"
};
PsionicsList["light step-ua-psy"] = {
	name : "Light Step",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 bns",
	range : "Self",
	duration : "This turn end",
	description : "My walking speed increases by 10 ft; standing up costs 0 movement, once",
	descriptionFull : "As a bonus action, you alter your density and weight to improve your mobility. For the rest of your turn, your walking speed increases by 10 feet, and the first time you stand up this turn, you do so without expending any of your movement if your speed is greater than 0."
};
PsionicsList["mind meld-ua-psy"] = {
	name : "Mind Meld",
	classes : ["mystic"],
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 0,
	time : "1 bns",
	range : "120 ft",
	duration : "This turn end",
	description : "I communicate telepathically with 1 willing crea (int > 1) and gain access to 1 memory of theirs",
	descriptionFull : "As a bonus action, you can communicate telepathically with one willing creature you can see within 120 feet of you. The target must have an Intelligence of at least 2, otherwise this talent fails and the action is wasted." + "\n   " + "This communication can occur until the end of the current turn. You don't need to share a language with the target for it to understand your telepathic utterances, and it understands you even if it lacks a language. You also gain access to one memory of the target's choice, gaining perfect recall of one thing it saw or did."
};
PsionicsList["mind slam-ua-psy"] = {
	name : "Mind Slam",
	classes : ["mystic"],
	source : [["UA:TMC", 28]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Con",
	description : "1 crea save or 1d6 Force dmg, and knocked prone if Large or smaller; +1d6 at CL 5, 11, and 17",
	descriptionCantripDie : "1 crea save or `CD`d6 Force dmg, and knocked prone if Large or smaller",
	descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on a Constitution saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, it is knocked prone." + "\n   " + "The talent's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)"
};
PsionicsList["mind thrust-ua-psy"] = {
	name : "Mind Thrust",
	classes : ["mystic"],
	source : [["UA:TMC", 28]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or 1d10 Psychic dmg; +1d10 at CL 5, 11, and 17",
	descriptionCantripDie : "1 crea save or `CD`d10 Psychic dmg",
	descriptionFull : "As an action, you target one creature you can see within 120 feet of you. The target must succeed on an Intelligence saving throw or take 1d10 psychic damage." + "\n   " + "The talent's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
PsionicsList["mystic charm-ua-psy"] = {
	name : "Mystic Charm",
	classes : ["mystic"],
	source : [["UA:TMC", 28]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "120 ft",
	duration : "Next turn end",
	save : "Cha",
	description : "1 humanoid save or charmed until end of my next turn",
	descriptionFull : "As an action, you beguile one humanoid you can see within 120 feet of you. The target must succeed on a Charisma saving throw or be charmed by you until the end of your next turn."
};
PsionicsList["mystic hand-ua-psy"] = {
	name : "Mystic Hand",
	classes : ["mystic"],
	source : [["UA:TMC", 28]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "30 ft",
	duration : "This turn end",
	description : "Move 1 unattended object (up to 10 lbs) up to 30 ft, or manipulate an object",
	descriptionFull : "You can use your action to manipulate or move one object within 30 feet of you. The object can't weigh more than 10 pounds, and you can't affect an object being worn or carried by another creature. If the object is loose, you can move it up to 30 feet in any direction." + "\n   " + "This talent allows you to open an unlocked door, pour out a beer stein, and so on." + "\n   " + "The object falls to the ground at the end of your turn if you leave it suspended in midair."
};
PsionicsList["psychic hammer-ua-psy"] = {
	name : "Psychic Hammer",
	classes : ["mystic"],
	source : [["UA:TMC", 28]],
	psionic : true,
	level : 0,
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "1 crea save or 1d6 Force dmg and moved up to 10 ft in chosen direction; +1d6 at CL 5, 11, and 17",
	descriptionCantripDie : "1 crea save or `CD`d6 Force dmg and moved up to 10 ft in chosen direction",
	descriptionFull : "As an action, you try to grasp one creature you can see within 120 feet of you, with a hand crafted from telekinetic energy. The target must succeed on a Strength saving throw or take 1d6 force damage. If it takes any of this damage and is Large or smaller, you can move it up to 10 feet in a straight line in a direction of your choice. You can't lift the target off the ground unless it is already airborne or underwater." + "\n   " + "The talent's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};

// Psionic Disciplines for the Mystic
//the adaptive body discipline
PsionicsList["adaptive body-ua-psy"] = {
	name : "Adaptive Body",
	classes : ["mystic"],
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I don't need to eat, breathe, or sleep; I can long rest with 8 hours of light activity, without sleep",
	descriptionFull : "You can alter your body to match your surroundings, allowing you to withstand punishing environments. With greater psi energy, you can extend this protection to others." + PsychicFocus + "While focused on this discipline, you don't need to eat, breathe, or sleep. To gain the benefits of a long rest, you can spend 8 hours engaged in light activity, rather than sleeping during any of it.",
	firstCol : "checkbox",
	dependencies : ["ab1-environmental adaptation", "ab2-adaptive shield", "ab3-energy adaptation", "ab4-energy immunity"]
};
PsionicsList["ab1-environmental adaptation"] = {
	name : "Environmental Adaptation",
	nameShort : "Environmental Adapt.",
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "1 h",
	description : "1 creature ignores the effects of extreme heat or cold (but not Fire or Cold damage)",
	descriptionFull : "As an action, you or a creature you touch ignores the effects of extreme heat or cold (but not cold or fire damage) for the next hour.",
	firstCol : 2
};
PsionicsList["ab2-adaptive shield"] = {
	name : "Adaptive Shield",
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take acid, cold, fire, lightning, or thunder damage",
	range : "Self",
	duration : "Next turn end",
	description : "If taking Acid, Cold, Fire, Lightning, or Thunder damage, gain resistance to it until end of next turn",
	descriptionFull : "When you take acid, cold, fire, lightning, or thunder damage, you can use your reaction to gain resistance to damage of that type -including the triggering damage- until the end of your next turn.",
	firstCol : 3
};
PsionicsList["ab3-energy adaptation"] = {
	name : "Energy Adaptation",
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Conc, 1 h",
	description : "1 creature gains resistance to either Acid, Cold, Fire, Lightning, or Thunder damage",
	descriptionFull : "As an action, you can touch one creature and give it resistance to acid, cold, fire, lightning, or thunder damage (your choice), which lasts until your concentration ends.",
	firstCol : 5
};
PsionicsList["ab4-energy immunity"] = {
	name : "Energy Immunity",
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Conc, 1 h",
	description : "1 creature gains immunity to either Acid, Cold, Fire, Lightning, or Thunder damage",
	descriptionFull : "As an action, you can touch one creature and give it immunity to acid, cold, fire, lightning, or thunder damage (your choice), which lasts until your concentration ends.",
	firstCol : 7
};
//the aura sight discipline (contributed by Justin W.)
PsionicsList["aura sight-ua-psy"] = {
	name : "Aura Sight",
	classes : ["mystic"],
	source : [["UA:TMC", 10]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Wisdom (Insight) checks",
	descriptionFull : "You refocus your sight to see the energy that surrounds all creatures. You perceive auras, energy signatures that can reveal key elements of a creature's nature." + PsychicFocus + "While focused on this discipline, you have advantage on Wisdom (Insight) checks.",
	firstCol : "checkbox",
	dependencies : ["as1-asses foe", "as2-read moods", "as3-view aura", "as4-perceive the unseen"]
};
PsionicsList["as1-asses foe"] = {
	name : "Asses Foe",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Sight",
	duration : "Instantaneous",
	description : "Learn one creature's current HP total and all its immunities, resistances, and vulnerabilities",
	descriptionFull : "As a bonus action, you analyze the aura of one creature you see. You learn its current hit point total and all its immunities, resistances, and vulnerabilities.",
	firstCol : 2
};
PsionicsList["as2-read moods"] = {
	name : "Read Moods",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Sight",
	duration : "Instantaneous",
	description : "Learn an one-word summary of the emotional state of up to 6 crea",
	descriptionFull : "As a bonus action, you learn a one-word summary of the emotional state of up to six creatures you can see, such as happy, confused, afraid, or violent.",
	firstCol : 2
};
PsionicsList["as3-view aura"] = {
	name : "View Aura",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "Sight",
	duration : "Conc, 1 h",
	description : "Monitor 1 crea: current HP, if magic effects it, basic emotional state; adv. on Insight/Cha checks vs. it",
	descriptionFull : "As an action, you study one creature's aura. Until your concentration ends, while you can see the target, you learn if it's under the effect of any magical or psionic effects, its current hit point total, and its basic emotional state. While this effect lasts, you have advantage on Wisdom (Insight) and Charisma checks you make against it.",
	firstCol : 3
};
PsionicsList["as4-perceive the unseen"] = {
	name : "Perceive the Unseen",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Sight",
	duration : "Conc, 1 min",
	description : "See all creatures, including hidden and invisible ones, regardless of lighting conditions",
	descriptionFull : "As a bonus action, you gain the ability to see auras even of invisible or hidden creatures. Until your concentration ends, you can see all creatures, including hidden and invisible ones, regardless of lighting conditions.",
	firstCol : 5
};
//the bestial form discipline (contributed by rabidknave)
PsionicsList["bestial form-ua-psy"] = {
	name : "Bestial Form",
	classes : ["mystic"],
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Wisdom (Animal Handling) checks",
	descriptionFull : "You transform your body, gaining traits of different beasts." + PsychicFocus + "While focused on this discipline, you have advantage on Wisdom (Animal Handling) checks.",
	firstCol : "checkbox",
	dependencies : ["bf1-bestial claws", "bf2-bestial transformation", "bf3-bt - amphibious", "bf4-bt - climbing", "bf5-bt - flight", "bf6-bt - keen senses", "bf7-bt - perfect senses", "bf8-bt - swimming", "bf9-bt - tough hide"]
};
PsionicsList["bf1-bestial claws"] = {
	name : "Bestial Claws",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "5 ft",
	duration : "Instantaneous",
	description : "Melee weapon attack with manifested claw, dealing 1d10/PP Slashing dmg",
	descriptionFull : "You manifest long claws for an instant and make a melee weapon attack against one creature within 5 feet of you. On a hit, this attack deals 1d10 slashing damage per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["bf2-bestial transformation"] = {
	name : "Bestial Transformation",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "1 hr (D)",
	description : "Alter physique to gain one or more of following effects; sum PP cost for a single use; end with bns a",
	descriptionFull : "As a bonus action, you alter your physical form to gain different characteristics. When you use this ability, you can choose one or more of the following effects. Each effect has its own psi point cost. Add them together to determine the total cost. This transformation lasts for 1 hour, until you die, or until you end it as a bonus action.",
	firstCol : "2-7"
};
PsionicsList["bf3-bt - amphibious"] = {
	name : " - Amphibious",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I'm able to breathe air and water by gaining gills",
	descriptionFull : "You gain gills; you can breathe air and water",
	firstCol : 2
};
PsionicsList["bf4-bt - climbing"] = {
	name : " - Climbing",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I gain climbing speed equal to my walking speed by growing tiny hooked claws",
	descriptionFull : "You grow tiny hooked claws that give you gain a climbing speed equal to your walking speed.",
	firstCol : 2
};
PsionicsList["bf5-bt - flight"] = {
	name : " - Flight",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I gain flying speed equal to my walking speed by sprouting wings",
	descriptionFull : "Wings sprout from your back. You gain a flying speed equal to your walking speed.",
	firstCol : 5
};
PsionicsList["bf6-bt - keen senses"] = {
	name : " - Keen Senses",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I gain advantage on Wisdom (Perception) checks through more sensitive eyes and ears",
	descriptionFull : "Your eyes and ears become more sensitive. You gain advantage on Wisdom (Perception) checks.",
	firstCol : 2
};
PsionicsList["bf7-bt - perfect senses"] = {
	name : " - Perfect Senses",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I see invisible creatures/objects within 10 ft, even when blinded, through smell",
	descriptionFull : "You gain a keen sense of smell and an instinct to detect prey. You can see invisible creatures and objects within 10 feet of you, even if you are blinded.",
	firstCol : 3
};
PsionicsList["bf8-bt - swimming"] = {
	name : " - Swimming",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I gain swimming speed equal to my walking speed by growing fins and webbed feet/hands",
	descriptionFull : "You gain fins and webbing between your fingers and toes; you gain a swimming speed equal to your walking speed.",
	firstCol : 2
};
PsionicsList["bf9-bt - tough hide"] = {
	name : " - Tough Hide",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "",
	range : "Self",
	duration : "1 hr (D)",
	description : "I gain +2 bonus to AC through thicker skin",
	descriptionFull : "Your skin becomes as tough as leather; you gain a +2 bonus to AC.",
	firstCol : 2
};
//the brute force discipline (contributed by rabidknave)
PsionicsList["brute force-ua-psy"] = {
	name : "Brute Force",
	classes : ["mystic"],
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Strength (Athletics) checks",
	descriptionFull : "You augment your natural strength with psionic energy, granting you the ability to achieve incredible feats of might." + PsychicFocus + "While focused on this discipline, you have advantage on Strength (Athletics) checks.",
	firstCol : "checkbox",
	dependencies : ["bf1-brute strike", "bf2-knock back", "bf3-mighty leap", "bf4-feat of strength"]
};
PsionicsList["bf1-brute strike"] = {
	name : "Brute Strike",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "This turn end",
	description : "My next melee attack during this turn deals +1d6/PP damage, of the same type as the melee attack",
	descriptionFull : "As a bonus action, you gain a bonus to your next damage roll against a target you hit with a melee attack during the current turn. The bonus equals +1d6 per psi point spent, and the bonus damage is the same type as the attack. If the attack has more than one damage type, you choose which one to use for the bonus damage.",
	firstCol : "1-7"
};
PsionicsList["bf2-knock back"] = {
	name : "Knock Back",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you hit a target with a melee attack",
	range : "Self",
	duration : "Instantaneous",
	save : "Str",
	description : "Use after melee atk hit; crea hit save or move 10 ft/PP away; if it then hits obj, 1d6/PP Bludg. dmg", //added the damage
	descriptionFull : "When you hit a target with a melee attack, you can activate this ability as a reaction. The target must succeed on a Strength saving throw or be knocked 10 feet away from you per psi point spent. The target moves in a straight line. If it hits an object, this movement immediately ends and the target takes 1d6 bludgeoning damage per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["bf3-mighty leap"] = {
	name : "Mighty Leap",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "Move",
	range : "Self",
	duration : "Instantaneous",
	description : "As part of my movement, jump 20 ft/PP in any direction",
	descriptionFull : "As part of your movement, you jump in any direction up to 20 feet per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["bf4-feat of strength"] = {
	name : "Feat of Strength",
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Next turn end",
	description : "I gain +5 bonus to Strength checks until the end of next turn",
	descriptionFull : "As a bonus action, you gain a +5 bonus to Strength checks until the end of your next turn.",
	firstCol : 2
};
//the celerity discipline (contributed by rabidknave)
PsionicsList["celerity-ua-psy"] = {
	name : "Celerity",
	classes : ["mystic"],
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "My walking speed increases by 10 ft",
	descriptionFull : "You channel psionic power into your body, honing your reflexes and agility to an incredible degree. The world seems to slow down while you continue to move as normal." + PsychicFocus + "While focused on this discipline, your walking speed increases by 10 feet.",
	firstCol : "checkbox",
	dependencies : ["c1-rapid step", "c2-agile defense", "c3-blur of motion", "c4-surge of speed", "c5-surge of action"]
};
PsionicsList["c1-rapid step"] = {
	name : "Rapid Step",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "This turn end",
	description : "My walking, swim, and climb speeds increases by 10 ft/PP; doesn't grant new movement modes",
	descriptionFull : "As a bonus action, you increase your walking speed by 10 feet per psi point spent until the end of the current turn. If you have a climbing or swimming speed, this increase applies to that speed as well.",
	firstCol : "1-7"
};
PsionicsList["c2-agile defense"] = {
	name : "Agile Defense",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Instantaneous",
	description : "I can take the Dodge action now, as part of using this power",
	descriptionFull : "As a bonus action, you take the Dodge action.",
	firstCol : 2
};
PsionicsList["c3-blur of motion"] = {
	name : "Blur of Motion",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Self",
	duration : "This turn end",
	description : "I'm invisible while moving during the current turn",
	descriptionFull : "As an action, you cause yourself to be invisible during any of your movement during the current turn.",
	firstCol : 2
};
PsionicsList["c4-surge of speed"] = {
	name : "Surge of Speed",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "This turn end",
	description : "I don't provoke opportunity attacks and gain a climbing speed equal to my walking speed",
	descriptionFull : "As a bonus action, you gain two benefits until the end of the current turn: you don't provoke opportunity attacks, and you have a climbing speed equal to your walking speed.",
	firstCol : 2
};
PsionicsList["c5-surge of action"] = {
	name : "Surge of Action",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Instantaneous",
	description : "I can take either the Dash action or make one weapon attack now, as part of using this power",
	descriptionFull : "As a bonus action, you can Dash or make one weapon attack.",
	firstCol : 5
};
//the corrosive metabolism discipline (contributed by rabidknave)
PsionicsList["corrosive metabolism-ua-psy"] = {
	name : "Corrosive Metabolism",
	classes : ["mystic"],
	source : [["UA:TMC", 11]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain resistance to Acid and Poison damage",
	descriptionFull : "Your control over your body allows you to deliver acid or poison attacks." + PsychicFocus + "While focused on this discipline, you have resistance to acid and poison damage.",
	firstCol : "checkbox",
	dependencies : ["cm1-corrosive touch", "cm2-venom strike", "cm3-acid spray", "cm4-breath of the black dragon", "cm5-breath of the green dragon"]
};
PsionicsList["cm1-corrosive touch"] = {
	name : "Corrosive Touch",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch", //use "Touch" instead of "5 ft" when its about reach
	duration : "Instantaneous",
	save : "Dex",
	description : "1 crea 1d10/PP Acid damage; save halves", // use "; save halves" for this kind of situations
	descriptionFull : "As an action, you deliver a touch of acid to one creature within your reach. The target must make a Dexterity saving throw, taking 1d10 acid damage per psi point spent on a failed save, or half as much damage on a successful one.",
	firstCol : "1-7"
};
PsionicsList["cm2-venom strike"] = {
	name : "Venom Strike",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	save : "Con",
	description : "1 crea 1d6/PP Poison damage; save halves; if save failed, poisoned until end of my next turn",
	descriptionFull : "As an action, you create a poison spray that targets one creature you can see within 30 feet of you. The target must make a Constitution saving throw. On a failed save, it takes 1d6 poison damage per psi point spent and is poisoned until the end of your next turn. On a successful save, the target takes half as much damage and isn't poisoned.",
	firstCol : "1-7"
};
PsionicsList["cm3-acid spray"] = {
	name : "Acid Spray",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take piercing or slashing damage",
	range : "5 ft",
	duration : "Instantaneous",
	description : "Use after I take Piercing or Slashing damage; all creatures in range take 2d6 Acid damage",
	descriptionFull : "As a reaction when you take piercing or slashing damage, you cause acid to spray from your wound; each creature within 5 feet of you takes 2d6 acid damage.",
	firstCol : 2
};
PsionicsList["cm4-breath of the black dragon"] = {
	name : "Breath of the Black Dragon",
	nameShort : "Breath o/t Black Dragon",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "60-ft line",
	duration : "Instantaneous",
	save : "Con",
	description : "60-ft long 5-ft wide line all creatures 6d6(+1d6/extra PP) Acid dmg; save halves",
	descriptionFull : "You exhale a wave of acid in a 60-foot line that is 5 feet wide. Each creature in the line must make a Constitution saving throw, taking 6d6 acid damage on a failed save, or half as much on a successful one. You can increase the damage by 1d6 per additional psi point spent on it.",
	firstCol : "5-7"
};
PsionicsList["cm5-breath of the green dragon"] = {
	name : "Breath of the Green Dragon",
	nameShort : "Breath o/t Green Dragon",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "90-ft cone",
	duration : "Instantaneous",
	save : "Con",
	description : "All creatures 10d6 poison damage; save halves",
	descriptionFull : "You exhale a cloud of poison in a 90-foot cone. Each creature in the line must make a Constitution saving throw, taking 10d6 poison damage on a failed save, or half as much damage on a successful one.",
	firstCol : 7
};
//the crown of despair discipline (contributed by rabidknave)
PsionicsList["crown of despair-ua-psy"] = {
	name : "Crown of Despair",
	classes : ["mystic"],
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "5-ft rad",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Charisma (Intimidation) checks",
	descriptionFull : "You have learned to harvest seeds of despair in a creature's psyche, wracking it with self-doubt and inaction." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Intimidation) checks.",
	firstCol : "checkbox",
	dependencies : ["cd1-crowned in sorrow", "cd2-call to inaction", "cd3-visions of despair", "cd4-dolorous mind"]
};
PsionicsList["cd1-crowned in sorrow"] = {
	name : "Crowned in Sorrow",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn start",
	save : "Cha",
	description : "1 crea 1d8/PP Psychic dmg and can't take reactions; save halves damage and normal reactions",
	descriptionFull : "As an action, one creature you can see within 60 feet of you must make a Charisma saving throw. On a failed save, it takes 1d8 psychic damage per psi point spent, and it can't take reactions until the start of its next turn. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["cd2-call to inaction"] = {
	name : "Call to Inaction",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 min",
	range : "Self",
	duration : "Conc, 10 min",
	save : "Wis",
	description : "After 1 min conversation, 1 crea save or incapacitated; ends if it or its ally is attacked (charm effect)",
	descriptionFull : "If you spend 1 minute conversing with a creature, you can attempt to seed it with overwhelming ennui. At the end of the minute, you can use an action to force the creature to make a Wisdom saving throw. The save automatically succeeds if the target is immune to being charmed. On a failed save, it sits and is incapacitated until your concentration ends. This effect immediately ends if the target or any ally it can see is attacked or takes damage. On a successful save, the creature is unaffected and has no inkling of your attempt to bend its will.",
	firstCol : 2
};
PsionicsList["cd3-visions of despair"] = {
	name : "Visions of Despair",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "1 rnd",
	save : "Cha",
	description : "1 crea 3d6(+1d6/extra PP) Psychic dmg and speed reduced to 0; save halves and no speed reduction",
	descriptionFull : "As an action, you force one creature you can see within 60 feet of you to make a Charisma saving throw. On a failed save, it takes 3d6 psychic damage, and its speed is reduced to 0 until the end of its next turn. On a successful save, it takes half as much damage. You can increase the damage by 1d6 per additional psi point spent on it.",
	firstCol : "3-7"
};
PsionicsList["cd4-dolorous mind"] = {
	name : "Dolorous Mind",
	source : [["UA:TMC", 12]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1 crea save or incapacitated and speed 0; save at end of each turn",
	descriptionFull : "As an action, you choose one creature you can see within 60 feet of you. It must succeed on a Charisma saving throw, or it is incapacitated and has a speed of 0 until your concentration ends. It can repeat this saving throw at the end of each of its turns, ending the effect on itself on a success.",
	firstCol : 5
};
//the crown of disgust discipline
PsionicsList["crown of disgust-ua-psy"] = {
	name : "Crown of Disgust",
	classes : ["mystic"],
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "5-ft rad",
	components : "Psi-F.",
	duration : "While focused",
	description : "5-ft rad around me is difficult terrain for creatures that aren't immune to being frightened",
	descriptionFull : "You cause a creature to be flooded with emotions of disgust." + PsychicFocus + "While you are focused on this discipline, the area in a 5-foot radius around you is difficult terrain for any enemy that isn't immune to being frightened.",
	firstCol : "checkbox",
	dependencies : ["cd1-eye of horror", "cd2-wall of repulsion", "cd3-visions of disgust", "cd4-world of horror"]
};
PsionicsList["cd1-eye of horror"] = {
	name : "Eye of Horror",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Cha",
	description : "1 crea save or 1d6/PP Psychic damage and can't move closer; save halves and no movement restriction",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make a Charisma saving throw. On a failed save, it takes 1d6 psychic damage per psi point spent and can't move closer to you until the end of its next turn. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["cd2-wall of repulsion"] = {
	name : "Wall of Repulsion",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 10 min",
	save : "Wis",
	description : "Up to 30\xD71\xD710 ft (l\xD7w\xD7h) invisible wall of energy; save to move through it, even for unwilling move",
	description : "Up to 9\xD70,3\xD73 m (l\xD7w\xD7h) invisible wall of energy; save to move through it, even for unwilling move",
	descriptionFull : "As an action, you create an invisible, insubstantial wall of energy within 60 feet of you that is up to 30 feet long, 10 feet high, and 1 foot thick. The wall lasts until your concentration ends. Any creature attempting to move through it must make a Wisdom saving throw. On a failed save, a creature can't move through the wall until the start of its next turn. On a successful save, the creature can pass through it. A creature must make this save whenever it attempts to pass through the wall, whether willingly or unwillingly.",
	firstCol : 3
};
PsionicsList["cd3-visions of disgust"] = {
	name : "Visions of Disgust",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 crea save or 5d6 Psychic dmg (half on save) & 1d6 Psychic dmg per crea within 5 ft at its turn end",
	descriptionFull : "You cause a creature to regard all other beings as horrid, alien entities. As an action, choose one creature you can see within 60 feet of you. The target must make a Wisdom saving throw. On a failed save, it takes 5d6 psychic damage, and until your concentration ends, it takes 1d6 psychic damage per creature within 5 feet of it at the end of each of its turns. On a successful save, the target takes only half the initial damage and suffers none of the other effects.",
	firstCol : 5
};
PsionicsList["cd4-world of horror"] = {
	name : "World of Horror",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "6 crea 8d6 Psychic dmg, frightened, \u0026 do only melee atks; save halves, no other effects; save each rnd",
	descriptionFull : "As an action, choose up to six creatures within 60 feet of you. Each target must make a Charisma saving throw. On a failed save, a target takes 8d6 psychic damage, and it is frightened until your concentration ends. On a successful save, a target takes half as much damage." + "\n   " + "While frightened by this effect, a target's speed is reduced to 0, and the target can use its action, and any bonus action it might have, only to make melee attacks. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
	firstCol : 7
};
//the crown of rage discipline
PsionicsList["crown of rage-ua-psy"] = {
	name : "Crown of Rage",
	classes : ["mystic"],
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "5-ft rad",
	components : "Psi-F.",
	duration : "While focused",
	description : "Any crea within range has disadvantage on melee attack rolls against targets other than me",
	descriptionFull : "You place a mote of pure fury within a creature's mind, causing its bloodlust to overcome its senses and for it to act as you wish it to." + PsychicFocus + "While you are focused on this discipline, any enemy within 5 feet of you that makes a melee attack roll against creatures other than you does so with disadvantage.",
	firstCol : "checkbox",
	dependencies : ["cr1-primal fury", "cr2-fighting words", "cr3-mindless courage", "cr4-punishing fury"]
};
PsionicsList["cr1-primal fury"] = {
	name : "Primal Fury",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Cha",
	description : "1 crea save or 1d6/PP Psychic dmg, use rea to move its speed toward nearest enemy (charm effect)",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must succeed on a Charisma saving throw or take 1d6 psychic damage per psi point spent on this ability and immediately use its reaction to move its speed in a straight line toward its nearest enemy. The save automatically succeeds if the target is immune to being charmed.",
	firstCol : "1-7"
};
PsionicsList["cr2-fighting words"] = {
	name : "Fighting Words",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 min",
	range : "Self",
	duration : "Conc, 10 min",
	save : "Wis",
	description : "After 1 min conversation, 1 crea save or attack one other, chosen crea for 5 rnds (charm effect)",
	descriptionFull : "If you spend 1 minute conversing with a creature, you can attempt to leave a simmering violence in its mind. At the end of the minute, you can use an action to force the creature to make a Wisdom saving throw to resist feeling violent urges against one creature you describe to it or name. The save automatically succeeds if the target is immune to being charmed. On a failed save, the target attacks the chosen creature if it sees that creature before your concentration ends, using weapons or spells against a creature it was already hostile toward or unarmed strikes against an ally or a creature it was neutral toward. Once the fight starts, it continues to attack for 5 rounds before this effect ends. This effect immediately ends if the target or any ally it can see is attacked or takes damage from any creature other than the one it has been incited against. On a successful save, the creature is unaffected and has no inkling of your attempt to bend its will.",
	firstCol : 2
};
PsionicsList["cr3-mindless courage"] = {
	name : "Mindless Courage",
	source : [["UA:TMC", 13]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Next turn end",
	save : "Wis",
	description : "1 crea save or it can only move towards the nearest enemy it can see, or not move at all (charm effect)",
	descriptionFull : "You cause a creature's bloodlust to overcome its sense of preservation. As a bonus action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or, until the end of your next turn, it can't willingly move unless its movement brings it closer to its nearest enemy that it can see. The save automatically succeeds if the target is immune to being charmed.",
	firstCol : 2
};
PsionicsList["cr4-punishing fury"] = {
	name : "Punishing Fury",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 crea save or when it makes melee atk, all in 5 ft of it can make melee atk vs. it as rea (charm effect)",
	descriptionFull : "You cause a creature's rage to grow so hot that it attacks without heeding its own safety. As a bonus action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or, until your concentration ends, any creature within 5 feet of it can use a reaction to make a melee attack against it whenever the target makes a melee attack. The save automatically succeeds if the target is immune to being charmed.",
	firstCol : 5
};
//the diminution discipline (contributed by mattohara & TheBob427)
PsionicsList["diminution-ua-psy"] = {
	name : "Diminution",
	classes : ["mystic"],
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I have advantage on Dexterity (Stealth) checks",
	descriptionFull : "You manipulate the matter that composes your body, drastically reducing your size without surrendering any of your might." + PsychicFocus + "While focused on this discipline, you have advantage on Dexterity (Stealth) checks.",
	firstCol : "checkbox",
	dependencies : ["d1-miniature form", "d2-toppling shift", "d3-sudden shift", "d4-microscopic form"]
};
PsionicsList["d1-miniature form"] = {
	name : "Miniature Form",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "Become Tiny, gain +5 to Dex (Stealth) and can fit through gaps of up to 6\" without squeezing",
	descriptionMetric : "Become Tiny, gain +5 to Dex (Stealth) and can fit through gaps of up to 15 cm without squeezing",
	descriptionFull : "As a bonus action, you become Tiny until your concentration ends. While this size, you gain a +5 bonus to Dexterity (Stealth) checks and can move through gaps up to 6 inches across without squeezing.",
	firstCol : 2
};
PsionicsList["d2-toppling shift"] = {
	name : "Toppling Shift",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "5 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "1 creature save or be knocked prone",
	descriptionFull : "As a bonus action, you shift to an incredibly small size and then suddenly return to normal, sending an opponent flying backward. Choose one creature you can see within 5 feet of you. It must succeed on a Strength saving throw or be knocked prone.",
	firstCol : 2
};
PsionicsList["d3-sudden shift"] = {
	name : "Sudden Shift",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 rea",
	timeFull : "1 reaction, which you take when are hit by an attack",
	range : "Self",
	duration : "Instantaneous",
	description : "Use when hit by an attack; it misses, and I move up to 5 ft without provoking opportunity attacks",
	descriptionFull : "As a reaction when you are hit by an attack, you shift down to minute size to avoid the attack. The attack misses, and you move up to 5 feet without provoking opportunity attacks before returning to normal size.",
	firstCol : 5
};
PsionicsList["d4-microscopic form"] = {
	name : "Microscopic Form",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "Become diminutive, gain +5 AC, +10 to Dex (Stealth), can fit through 1\" gaps, but can't use wea atks",
	descriptionMetric : "Become diminutive, gain +5 AC, +10 to Dex (Stealth), can fit through 2,5 cm gaps, can't use wea atks",
	descriptionFull : "As a bonus action, you become smaller than Tiny until your concentration ends. While this size, you gain a +10 bonus to Dexterity (Stealth) checks and a +5 bonus to AC, you can move through gaps up to 1 inch across without squeezing, and you can't make weapon attacks.",
	firstCol : 7
};
//the giant growth discipline (contributed by mattohara & TheBob427)
PsionicsList["giant growth-ua-psy"] = {
	name : "Giant Growth",
	classes : ["mystic"],
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Touch",
	components : "Psi-F.",
	duration : "While focused",
	description : "My reach increases by 5 ft",
	descriptionFull : "You infuse yourself with psionic energy to grow to tremendous size, bolstering your strength and durability." + PsychicFocus + "While focused on this discipline, your reach increases by 5 feet.",
	firstCol : "checkbox",
	dependencies : ["gg1-ogre form", "gg2-giant form"]
};
PsionicsList["gg1-ogre form"] = {
	name : "Ogre Form",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "10 temp. HP; for duration: become Large, +5 ft reach, melee attacks deal +1d4 Bludgeoning dmg",
	descriptionFull : "As a bonus action, you gain 10 temporary hit points. In addition, until your concentration ends, your melee weapon attacks deal an extra 1d4 bludgeoning damage on a hit, and your reach increases by 5 feet. If you're smaller than Large, you also become Large for the duration.",
	firstCol : 2
};
PsionicsList["gg2-giant form"] = {
	name : "Giant Form",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "30 temp. HP; for duration: become Huge, +10 ft reach, melee attacks deal +2d6 Bludgeoning dmg",
	descriptionFull : "As a bonus action, you gain 30 temporary hit points. In addition, until your concentration ends, your melee weapon attacks deal an extra 2d6 bludgeoning damage on a hit, and your reach increases by 10 feet. If you're smaller than Huge, you also become Huge for the duration.",
	firstCol : 7
};
//the intellect fortress discipline (contributed by TheBob427)
PsionicsList["intellect fortress-ua-psy"] = {
	name : "Intellect Fortress",
	classes : ["mystic"],
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F",
	duration : "While focused",
	description : "I gain resistance to Psychic damage",
	descriptionFull : "You forge an indomitable wall of psionic energy around your mind-one that allows you to launch counterattacks against your opponents." + PsychicFocus + "While focused on this discipline, you have resistance to psychic damage.",
	firstCol : "checkbox",
	dependencies : ["if1-psychic backlash", "if2-psychic parry", "if3-psychic redoubt"]
};
PsionicsList["if1-psychic backlash"] = {
	name : "Psychic Backlash",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 rea",
	range : "Sight",
	duration : "Instantaneous",
	description : "I impose dis. on an attack roll vs. me; if I'm hit anyway, the attacker takes 2d10 Psychic damage",
	descriptionFull : "As a reaction, you can impose disadvantage on an attack roll against you if you can see the attacker. If the attack still hits you, the attacker takes 2d10 psychic damage.",
	firstCol : 2
};
PsionicsList["if2-psychic parry"] = {
	name : "Psychic Parry",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you make an Intelligence, a Wisdom, or a Charisma saving throw",
	range : "Self",
	duration : "Instantaneous",
	description : "Add +1/PP to the result of an Int, Wis, or Cha save; use after rolling, but before knowing if successful",
	descriptionFull : "As a reaction when you make an Intelligence, a Wisdom, or a Charisma saving throw, you gain a +1 bonus to that saving throw for each psi point you spend on this ability. You can use this ability after rolling the die but before suffering the results.",
	firstCol : "1-7"
};
PsionicsList["if3-psychic redoubt"] = {
	name : "Psychic Redoubt",
	source : [["UA:TMC", 14]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "30 ft",
	duration : "Conc, 10 min",
	description : "Any creatures in range gain resistance to Psychic damage and advantage on Int, Wis, and Cha saves",
	descriptionFull : "As an action, you create a field of protective psychic energy. Choose any number of creatures within 30 feet of you. Until your concentration ends, each target has resistance to psychic damage and advantage on Intelligence, Wisdom, and Charisma saving throws.",
	firstCol : 5
};
//the iron durability discipline (contributed by mattohara)
PsionicsList["iron durability-ua-psy"] = {
	name : "Iron Durability",
	classes : ["mystic"],
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain a +1 bonus to AC",
	descriptionFull : "You transform your body to become a living metal, allowing you to shrug off attacks that would cripple weaker creatures." + PsychicFocus + "While focused on this discipline, you gain a +1 bonus to AC.",
	firstCol : "checkbox",
	dependencies : ["id1-iron hide", "id2-steel hide", "id3-iron resistance"]
};
PsionicsList["id1-iron hide"] = {
	name : "Iron Hide",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you are hit by an attack",
	range : "Self",
	duration : "Next turn end",
	description : "I gain +1/PP AC; use when hit by attack; bonus works against triggering attack",
	descriptionFull : "As a reaction when you are hit by an attack, you gain a +1 bonus to AC for each psi point you spend on this ability. The bonus lasts until the end of your next turn. This bonus applies against the triggering attack.",
	firstCol : "1-7"
};
PsionicsList["id2-steel hide"] = {
	name : "Steel Hide",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Next turn end",
	description : "I gain resistance to Bludgeoning, Piercing, and Slashing damage",
	descriptionFull : "As a bonus action, you gain resistance to bludgeoning, piercing, and slashing damage until the end of your next turn.",
	firstCol : 2
};
PsionicsList["id3-iron resistance"] = {
	name : "Iron Resistance",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Self",
	duration : "Conc, 1 h",
	description : "I gain resistance to bludgeoning, piercing, or slashing (my choice)",
	descriptionFull : "As an action, you gain resistance to bludgeoning, piercing, or slashing damage (your choice), which lasts until your concentration ends.",
	firstCol : 7
};
//the mantle of awe discipline (contributed by mattohara)
PsionicsList["mantle of awe-ua-psy"] = {
	name : "Mantle of Awe",
	classes : ["mystic"],
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain a bonus to Charisma checks, bonus equals half my Intelligence modifier (min 1)",
	descriptionFull : "You learn to use psionic energy to manipulate others with a subtle combination of psi and your own, natural charm." + PsychicFocus + "While focused on this discipline, you gain a bonus to Charisma checks. The bonus equals half your Intelligence modifier (minimum of +1).",
	firstCol : "checkbox",
	dependencies : ["moa1-charming presence", "moa2-center of attention", "moa3-invoke awe"]
};
PsionicsList["moa1-charming presence"] = {
	name : "Charming Presence",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "30 ft",
	duration : "10 min",
	description : "2d8/PP HP of conscious, not in combat, not immune to charm crea charmed; use HP max, not current",
	descriptionFull : "As an action, you exert an aura of sympathetic power. Roll 2d8 per psi point spent on this ability; the total is how many hit points worth of creatures this option can affect. Creatures within 30 feet of you are affected in ascending order of their hit point maximums, ignoring incapacitated creatures, creatures immune to being charmed, and creatures engaged in combat." + "\n   " + "Starting with the creature that has the lowest hit point maximum, each creature affected by this option is charmed by you for 10 minutes, regarding you as a friendly acquaintance. Subtract each creature's hit point maximum from the total before moving on to the next creature. A creature's hit point maximum must be equal to or less than the remaining total for that creature to be affected.",
	firstCol : "1-7"
};
PsionicsList["moa2-center of attention"] = {
	name : "Center of Attention",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1 crea save or all other creatures are invisible to it; ends if it leaves my sight/earshot or takes dmg",
	descriptionFull : "As an action, you exert an aura of power that grabs a creature's attention. Choose one creature you can see within 60 feet of you. It must make a Charisma saving throw. On a failed save, the creature is so thoroughly distracted by you that all other creatures are invisible to it until your concentration ends. This effect ends if the creature can no longer see or hear you or if it takes damage.",
	firstCol : 2
};
PsionicsList["moa3-invoke awe"] = {
	name : "Invoke Awe",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 10 min",
	save : "Int",
	description : "5 crea save or charmed, obey verbal commands; no self harm; will atk crea that atk me; save each rnd",
	descriptionFull : "As an action, you exert an aura that inspires awe in others. Choose up to 5 creatures you can see within 60 feet of you. Each target must succeed on an Intelligence saving throw or be charmed by you until your concentration ends. While charmed, the target obeys all your verbal commands to the best of its ability and without doing anything obviously self-destructive. The charmed target will attack only creatures that it has seen attack you since it was charmed or that it was already hostile toward. At the end of each of its turns, it can repeat the saving throw, ending the effect on itself on a success.",
	firstCol : 7
};
//the mantle of command discipline
PsionicsList["mantle of command-ua-psy"] = {
	name : "Mantle of Command",
	classes : ["mystic"],
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "When ending a turn I didn't move in, use my rea to have 1 ally within 30 ft move half its speed",
	descriptionFull : "You exert an aura of trust and authority, enhancing the coordination among your allies." + PsychicFocus + "While focused on this discipline, when you end your turn and didn't move during it, you can use your reaction to allow one ally you can see within 30 feet of you to move up to half their speed, following a path of your choice. To move in this way, the ally mustn't be incapacitated.",
	firstCol : "checkbox",
	dependencies : ["mc1-coordinated movement", "mc2-commander's sight", "mc3-command to strike", "mc4-strategic mind", "mc5-overwhelming attack"]
};
PsionicsList["mc1-coordinated movement"] = {
	name : "Coordinated Movement",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Up to 5 allies I can see can use their reaction to move half their speed, following a path I choose",
	descriptionFull : "As a bonus action, choose up to five allies you can see within 60 feet of you. Each of those allies can use their reaction to move up to half their speed, following a path of your choice.",
	firstCol : 2
};
PsionicsList["mc2-commander's sight"] = {
	name : "Commander's Sight",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 rnd",
	description : "I mark 1 crea; until the start of my next turn, my allies have adv. on attacks vs. it",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. Until the start of your next turn, your allies have advantage on attack rolls against that target.",
	firstCol : 2
};
PsionicsList["mc3-command to strike"] = {
	name : "Command to Strike",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "1 ally I can see can use their reaction to take the Attack action, with me choosing the targets",
	descriptionFull : "As an action, choose one ally you can see within 60 feet of you. That ally can use their reaction to immediately take the Attack action. You choose the targets.",
	firstCol : 3
};
PsionicsList["mc4-strategic mind"] = {
	name : "Strategic Mind",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "1 ally can, on its turn, either add 1d4 to its attack rolls or take Dash or Disengage as a bonus action",
	descriptionFull : "As an action, you exert an aura of trust and command that unites your allies into a cohesive unit. Until your concentration ends, any ally within 60 feet of you on their turn can, as a bonus action, take the Dash or Disengage action or roll a d4 and add the number rolled to each attack roll they make that turn.",
	firstCol : 5
};
PsionicsList["mc5-overwhelming attack"] = {
	name : "Overwhelming Attack",
	source : [["UA:TMC", 15]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Up to 5 allies I see can use their reactions to take the Attack action, with me choosing the targets",
	descriptionFull : "As an action, choose up to five allies you can see within 60 feet of you. Each of those allies can use their reaction to take the Attack action. You choose the targets of the attacks.",
	firstCol : 7
};
//the mantle of courage discipline
PsionicsList["mantle of courage-ua-psy"] = {
	name : "Mantle of Courage",
	classes : ["mystic"],
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "My and allies within 10 ft that can see me have advantage on saves vs. being frightened",
	descriptionFull : "You focus your mind on courage, radiating confidence and bravado to your allies." + PsychicFocus + "While focused on this discipline, you and allies within 10 feet of you who can see you have advantage on saving throws against being frightened.",
	firstCol : "checkbox",
	dependencies : ["mc1-incite courage", "mc2-aura of victory", "mc3-pillar of confidence"]
};
PsionicsList["mc1-incite courage"] = {
	name : "Incite Courage",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Up to 6 creatures are no longer frightened",
	descriptionFull : "As a bonus action, choose up to six creatures you can see within 60 feet of you. If any of those creatures is frightened, that condition ends on that creature.",
	firstCol : 2
};
PsionicsList["mc2-aura of victory"] = {
	name : "Aura of Victory",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "30 ft",
	duration : "Conc, 10 min",
	description : "When an enemy I can see is reduced to 0 HP, me and allies within range gain 2/PP temporary HP",
	descriptionFull : "As a bonus action, you project psionic energy until your concentration ends. The energy fortifies you and your allies when your enemies are felled; whenever an enemy you can see is reduced to 0 hit points, you and each of your allies within 30 feet of you gain temporary hit points equal to double the psi points spent to activate this effect.",
	firstCol : "1-7"
};
PsionicsList["mc3-pillar of confidence"] = {
	name : "Pillar of Confidence",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	description : "Me \u0026 up to 5 crea gain, on their turn, a special action to either make 1 wea atk, Dash, or Disengage",
	descriptionFull : "As an action, you and up to five creatures you can see within 60 feet of you each gain one extra action to use on their individual turns. The action goes away if not used before the end of your next turn. the action can be used only to make one weapon attack or to take the Dash or Disengage action.",
	firstCol : 6
};
//the mantle of fear discipline
PsionicsList["mantle of fear-ua-psy"] = {
	name : "Mantle of Fear",
	classes : ["mystic"],
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Charisma (Intimidation) checks",
	descriptionFull : "You tap into a well of primal fear and turn yourself into a beacon of terror to your enemies." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Intimidation) checks.",
	firstCol : "checkbox",
	dependencies : ["mf1-incite fear", "mf2-unsettling aura", "mf3-incite panic"]
};
PsionicsList["mf1-incite fear"] = {
	name : "Incite Fear",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "1 crea save or be frightened of me; repeat save each turn when out of line of sight",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must succeed on a Wisdom saving throw or become frightened of you until your concentration ends. Whenever the frightened target ends its turn in a location where it can't see you, it can repeat the saving throw, ending the effect on itself on a success.",
	firstCol : 2
};
PsionicsList["mf2-unsettling aura"] = {
	name : "Unsettling Aura",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 h",
	description : "All crea in range that can see me move only half speed when moving towards me (frightening effect)",
	descriptionFull : "As a bonus action, you cloak yourself in unsettling psychic energy. Until your concentration ends, any enemy within 60 feet of you that can see you must spend 1 extra foot of movement for every foot it moves toward you. A creature ignores this effect if immune to being frightened.",
	firstCol : 3
};
PsionicsList["mf3-incite panic"] = {
	name : "Incite Panic",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "90 ft",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "8 crea save each rnd or frightened and spend turn on random move or melee atk; 3 saves ends; see B",
	descriptionFull : "As an action, choose up to eight creatures you can see within 90 feet of you that can see you. At the start of each of a target's turns before your concentration ends, the target must make a Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn, and you roll a die. If you roll an odd number, the frightened target moves half its speed in a random direction and takes no action on that turn, other than to scream in terror. If you roll an even number, the frightened target makes one melee attack against a random target within its reach. If there is no such target, it moves half its speed in a random direction and takes no action on that turn. This effect ends on a target if it succeeds on three saving throws against it.",
	firstCol : 5
};
//the mantle of fury discipline
PsionicsList["mantle of fury-ua-psy"] = {
	name : "Mantle of Fury",
	classes : ["mystic"],
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "Me and allies within 10 ft at start of my turn gain +5 ft walking speed for that turn",
	descriptionFull : "You allow the primal fury lurking deep within your mind to burst forth, catching you and your allies in an implacable bloodthirst." + PsychicFocus + "While focused on this discipline in combat, you and any ally who starts their turn within 10 feet of you gains a 5-foot increase to their walking speed during that turn.",
	firstCol : "checkbox",
	dependencies : ["mf1-incite fury", "mf2-mindless charge", "mf3-aura of bloodletting", "mf4-overwhelming fury"]
};
PsionicsList["mf1-incite fury"] = {
	name : "Incite Fury",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "3 creatures can add 1d4 to the damage of melee weapon attacks during the duration",
	descriptionFull : "As a bonus action, choose up to three allies you can see within 60 feet of you (you can choose yourself in place of one of the allies). Until your concentration ends, each target can roll a d4 when rolling damage for a melee weapon attack and add the number rolled to the damage roll.",
	firstCol : 2
};
PsionicsList["mf2-mindless charge"] = {
	name : "Mindless Charge",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "3 creatures can use their reactions to move their speed straight towards the nearest enemy",
	descriptionFull : "As a bonus action, choose up to three creatures you can see within 60 feet of you. Each target can immediately use its reaction to move up to its speed in a straight line toward its nearest enemy.",
	firstCol : 2
};
PsionicsList["mf3-aura of bloodletting"] = {
	name : "Aura of Bloodletting",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "Me and all creatures within range during the duration have advantage on melee attack rolls",
	descriptionFull : "As a bonus action, you unleash an aura of rage. Until your concentration ends, you and any creature within 60 feet of you has advantage on melee attack rolls.",
	firstCol : 3
};
PsionicsList["mf4-overwhelming fury"] = {
	name : "Overwhelming Fury",
	source : [["UA:TMC", 16]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1 creature save or it can use its actions only to make melee attacks; save at the end of each of its turns",
	descriptionFull : "As an action, you flood rage into one creature you can see within 60 feet of you. The target must succeed on a Charisma saving throw, or it can use its actions only to make melee attacks until your concentration ends. It can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
	firstCol : 5
};
//the mantle of joy discipline
PsionicsList["mantle of joy-ua-psy"] = {
	name : "Mantle of Joy",
	classes : ["mystic"],
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Charisma (Persuasion) checks",
	descriptionFull : "You tap into the joy within you, radiating it outward in soothing, psychic energy that brings hope and comfort to creatures around you." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Persuasion) checks.",
	firstCol : "checkbox",
	dependencies : ["mj1-soothing presence", "mj2-comforting aura", "mj3-aura of jubilation", "mj4-beacon of recovery"]
};
PsionicsList["mj1-soothing presence"] = {
	name : "Soothing Presence",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "3 creatures gain 3/PP temporary hit points",
	descriptionFull : "As a bonus action, choose up to three creatures you can see within 60 feet of you. Each target gains 3 temporary hit points per psi point spent on this effect.",
	firstCol : "1-7"
};
PsionicsList["mj2-comforting aura"] = {
	name : "Comforting Aura",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "Sight",
	duration : "Conc, 1 min",
	description : "3 creatures can add 1d4 on every saving throw during the duration",
	descriptionFull : "As a bonus action, choose up to three allies you can see (you can choose yourself in place of one of the allies). Until your concentration ends, each target can roll a d4 when making a saving throw and add the number rolled to the total.",
	firstCol : 2
};
PsionicsList["mj3-aura of jubilation"] = {
	name : "Aura of Jubilation",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "All creatures within range that can see me have disadvantage on Perception and Investigation checks",
	descriptionFull : "As a bonus action, you radiate a distracting mirth until your concentration ends. Each creature within 60 feet of you that can see you suffers disadvantage on any checks using the Perception and Investigation skills.",
	firstCol : 3
};
PsionicsList["mj4-beacon of recovery"] = {
	name : "Beacon of Recovery",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Avatar",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Me + 5 allies can make an extra save against every effect that allows a save at the start/end of a turn",
	descriptionFull : "As a bonus action, you and up to five allies you can see within 60 feet of you can immediately make saving throws against every effect they're suffering that allows a save at the start or end of their turns.",
	firstCol : 5
};
//the mastery of air discipline (contributed by mattohara)
PsionicsList["mastery of air-ua-psy"] = {
	name : "Mastery of Air",
	classes : ["mystic"],
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I take no falling damage and ignore difficult terrain when walking",
	descriptionFull : "You become one with the power of elemental air." + PsychicFocus + "While focused on this discipline, you take no falling damage, and you ignore difficult terrain when walking.",
	firstCol : "checkbox",
	dependencies : ["ma1-wind step", "ma2-wind stream", "ma3-cloak of air", "ma4-wind form", "ma5-misty form", "ma6-animate air"]
};
PsionicsList["ma1-wind step"] = {
	name : "Wind Step",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "Move",
	range : "Self",
	duration : "This turn end",
	description : "Fly 20 ft/PP as part of my move this turn; if I end my turn in the air, my fall",
	descriptionFull : "As part of your move on your turn, you can fly up to 20 feet for each psi point spent. If you end this flight in the air, you fall unless something else holds you aloft.",
	firstCol : "1-7"
};
PsionicsList["ma2-wind stream"] = {
	name : "Wind Stream",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "30-ft line",
	duration : "Instantaneous",
	save : "Str",
	description : "30-ft long 5-ft wide all crea 1d8/PP Bludgeoning dmg and knocked prone; save halves and not prone",
	descriptionFull : "As an action, you create a line of focused air that is 30 feet long and 5 feet wide. Each creature in that area must make a Strength saving throw, taking 1d8 bludgeoning damage per psi point spent and being knocked prone on a failed save, or half as much damage on a successful one.",
	firstCol : "1-7"
};
PsionicsList["ma3-cloak of air"] = {
	name : "Cloak of Air",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "Atks vs. me have dis.; when missed by melee atk, use rea to have attacker repeat the attack on itself",
	descriptionFull : "As a bonus action, you seize control of the air around you to create a protective veil. Until your concentration ends, attack rolls against you have disadvantage, and when a creature you can see misses you with a melee attack, you can use your reaction to force the creature to repeat the attack roll against itself.",
	firstCol : 3
};
PsionicsList["ma4-wind form"] = {
	name : "Wind Form",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 10 min",
	description : "I gain a flying speed of 60 ft",
	descriptionFull : "As a bonus action, you gain a flying speed of 60 feet, which lasts until your concentration ends.",
	firstCol : 5
};
PsionicsList["ma5-misty form"] = {
	name : "Misty Form",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "Self",
	duration : "Conc, 1 min",
	description : "Gain resistance to Bludgeoning/Piercing/Slashing, can only take Dash actions, fit through 1\" opening",
	descriptionMetric : "Gain resistance to Bludgeoning/Piercing/Slashing, only take Dash actions, fit through 2,5 cm opening",
	descriptionFull : "As an action, your body becomes like a misty cloud until your concentration ends. In this form, you gain resistance to bludgeoning, piercing, and slashing damage, and you can't take actions other than the Dash action. You can pass through openings that are no more than 1 inch wide without squeezing.",
	firstCol : 6
};
PsionicsList["ma6-animate air"] = {
	name : "Animate Air",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 h",
	description : "Summon an air elemental that obeys my verbal commands; See Monster Manual, page 124",
	descriptionFull : "As an action, you cause an air elemental to appear in an unoccupied space you can see within 120 feet of you. The elemental lasts until your concentration ends, and it obeys your verbal commands. In combat, roll for its initiative, and choose its behavior during its turns. When this effect ends, the elemental disappears. See the Monster Manual for its stat block.",
	firstCol : 7
};
//the mastery of fire discipline
PsionicsList["mastery of fire-ua-psy"] = {
	name : "Mastery of Fire",
	classes : ["mystic"],
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain resistance to Fire damage and gain a +2 bonus on rolls for Fire damage",
	descriptionFull : "You align your mind with the energy of elemental fire." + PsychicFocus + "While focused on this discipline, you gain resistance to fire damage, and you gain a +2 bonus to rolls for fire damage.",
	firstCol : "checkbox",
	dependencies : ["mf1-combustion", "mf2-rolling flame", "mf3-detonation", "mf4-fire storm", "mf5-animate fire"]
};
PsionicsList["mf1-combustion"] = {
	name : "Combustion",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 min",
	save : "Con",
	description : "1 crea save or 1d10/PP Fire dmg, on fire: 1d6 Fire dmg/rnd, it can 1 a to end; save half \u0026 not on fire",
	descriptionFull : "As an action, choose one creature or object you can see within 120 feet of you. The target must make a Constitution save. On a failed save, the target takes 1d10 fire damage per psi point spent, and it catches on fire, taking 1d6 fire damage at the end of each of its turns until your concentration ends or until it or a creature adjacent to it extinguishes the flames with an action. On a successful save, the target takes half as much damage and doesn't catch on fire.",
	firstCol : "1-7"
};
PsionicsList["mf2-rolling flame"] = {
	name : "Rolling Flame",
	source : [["UA:TMC", 17]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "5 ft",
	duration : "Conc, 1 min",
	description : "20-ft cube all 5 Fire damage and any that end their turn in it also 5 Fire damage",
	descriptionFull : "As an action, you create fire in a 20-foot-by-20-foot cube within 5 feet of you. The fire lasts until your concentration ends. Any creature in that area when you use this ability and any creature that ends its turn there takes 5 fire damage.",
	firstCol : 3
};
PsionicsList["mf3-detonation"] = {
	name : "Detonation",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	description : "20-ft rad all creatures save or 7d6 Fire damage and knocked prone; save halves and not prone",
	save : "Con",
	descriptionFull : "As an action, you create a fiery explosion at a point you can see within 120 feet of you. Each creature in a 20-foot-radius sphere centered on that point must make a Constitution saving throw, taking 7d6 fire damage and being knocked prone on a failed save, or half as much damage on a successful one.",
	firstCol : 5
};
PsionicsList["mf4-fire storm"] = {
	name : "Fire Storm",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "All creatures that end their turn within 5 ft of me take 3d6 Fire damage",
	descriptionFull : "As a bonus action, you become wreathed in flames until your concentration ends. Any creature that end its turn within 5 feet of you takes 3d6 fire damage.",
	firstCol : 5
};
PsionicsList["mf5-animate fire"] = {
	name : "Animate Fire",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 h",
	description : "Summon a fire elemental that obeys my verbal commands; See Monster Manual, page 124",
	descriptionFull : "As an action, you cause a fire elemental to appear in an unoccupied space you can see within 120 feet of you. The elemental lasts until your concentration ends, and it obeys your verbal commands. In combat, roll for its initiative, and choose its behavior during its turns. When this effect ends, the elemental disappears. See the Monster Manual for its stat block.",
	firstCol : 7
};
//the mastery of force discipline
PsionicsList["mastery of force-ua-psy"] = {
	name : "Mastery of Force",
	classes : ["mystic"],
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Strength checks",
	descriptionFull : "As a student of psionic power, you perceive the potential energy that flows through all things. You reach out with your mind, transforming the potential into the actual. Objects and creatures move at your command." + PsychicFocus + ". While focused on this discipline, you have advantage on Strength checks.",
	firstCol : "checkbox",
	dependencies : ["mf1-push", "mf2-move", "mf3-inertial armor", "mf4-telekinetic barrier", "mf5-grasp", "mf6-crush (with grasp)" , "mf7-move (with grasp)"]
};
PsionicsList["mf1-push"] = {
	name : "Push",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "1 crea save or 1d8/PP Force dmg and pushed 5 ft/PP straight away; save halves and not pushed",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make a Strength saving throw. On a failed save, it takes 1d8 force damage per psi point spent and is pushed up to 5 feet per point spent in a straight line away from you. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["mf2-move"] = {
	name : "Move",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Dex",
	description : "Move obj 60 ft, after which it falls; crea under obj DC 10 save or 1d6+1d6/PP Bludg. dmg; see book",
	descriptionFull : "Choose one object you can see within 60 feet of you that isn't being worn or carried by another creature and that isn't secured in place. It can't be larger than 20 feet on a side, and its maximum weight depends on the psi points spent on this ability, as shown below." + "\n   " + "As an action, you move the object up to 60 feet, and you must keep the object within sight during this movement. If the object ends this movement in the air, it falls. If the object would fall on a creature, the creature must succeed on a DC 10 Dexterity saving throw or take damage as listed on the table below.\n\n  " + toUni("Psi") + "\t" + toUni("Maximum") + "    " + toUni("Bludgeoning") + "\n" + toUni("Points") + "\t " + toUni("Weight") + "\t        " + toUni("Damage") + "\n    2\t     25 lbs.  \t             2d6" + "\n    3\t     50 lbs.  \t             4d6" + "\n    5\t   250 lbs.  \t             6d6" + "\n    6\t   500 lbs.  \t             7d6" + "\n    7\t 1000 lbs.  \t             8d6",
	firstCol : "2-7"
};
PsionicsList["mf3-inertial armor"] = {
	name : "Inertial Armor",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "Self",
	duration : "8 h",
	description : "I gain AC 14 + Dex modifier and resistance to Force dmg if not wearing armor; ends if don armor",
	descriptionFull : "As an action, you sheathe yourself in an intangible field of magical force. For 8 hours, your base AC is 14 + your Dexterity modifier, and you gain resistance to force damage. This effect ends if you are wearing or don armor.",
	firstCol : 2
};
PsionicsList["mf4-telekinetic barrier"] = {
	name : "Telekinetic Barrier",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 10 min",
	description : "40-ft long, 10-ft high, 1-inch thick transparent wall of energy; each 10-ft section has AC 10 \u0026 10 HP",
	descriptionFull : "As an action, you create a transparent wall of telekinetic energy, at least one portion of which must be within 60 feet of you. The wall is 40 feet long, 10 feet high, and 1 inch thick. The wall lasts until your concentration ends. Each 10-foot section of the wall has an AC of 10 and 10 hit points.",
	firstCol : 3
};
PsionicsList["mf5-grasp"] = {
	name : "Grasp",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "1 crea save or grappled; escape Athl./Acro. vs. my spell atk +1/PP; if grappled I can Crush/Move",
	save : "Str",
	descriptionFull : "You attempt to grasp a creature in telekinetic energy and hold it captive. As an action, choose one creature you can see within 60 feet of you. The target must succeed on a Strength saving throw or be grappled by you until your concentration ends or until the target leaves your reach, which is 60 feet for this grapple." + "\n   " + "The grappled target can escape by succeeding on a Strength (Athletics) or Dexterity (Acrobatics) check contested by your psionic ability plus your proficiency bonus. When a target attempts to escape in this way, you can spend psi points to boost your check, abiding by your psi limit. You gain a +1 bonus per psi point spent." + "\n   " + "While a target is grappled in this manner, you create one of the following effects as an action: " + toUni("Crush") + " (1–7 psi) The target takes 1d6 bludgeoning damage per psi point spent." + toUni("Move") + " (1–7 psi) You move the target up to 5 feet per psi point spent. You can move it in the air and hold it there. It falls if the grapple ends.",
	firstCol : 3
};
PsionicsList["mf6-crush (with grasp)"] = {
	name : " - Crush (with Grasp)",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "1 creature grappled by Grasp takes 1d6/PP Bludgeoning damage",
	descriptionFull : "While the target is grappled by Grasp from the Mastery of Force discipline, you can use Crush on it as an action:" + "\n  " + "The target takes 1d6 bludgeoning damage per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["mf7-move (with grasp)"] = {
	name : " - Move (with Grasp)",
	source : [["UA:TMC", 18]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "1 creature grappled by Grasp moved up to 5 ft/PP; can hold it aloft, but it falls when grapple ends",
	descriptionFull : "While the target is grappled by Grasp from the Mastery of Force discipline, you can use Move on it as an action:" + "\n  " + "You move the target up to 5 feet per psi point spent. You can move it in the air and hold it there. It falls if the grapple ends.",
	firstCol : "1-7"
};
//the mastery of ice discipline (contributed by Justin W.)
PsionicsList["mastery of ice-ua-psy"] = {
	name : "Mastery of Ice",
	classes : ["mystic"],
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain resistance to Cold damage",
	descriptionFull : "You master the power of ice, shaping it to meet you demands." + PsychicFocus + "While focused on this discipline, you have resistance to cold damage.",
	firstCol : "checkbox",
	dependencies : ["mi1-ice spike", "mi2-ice sheet", "mi3-frozen sanctuary", "mi4-frozen rain", "mi5-ice barrier"]
};
PsionicsList["mi1-ice spike"] = {
	name : "Ice Spike",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Next turn end",
	save : "Dex",
	description : "1 creature save or 1d8/PP Cold damage and speed halved; save halves and normal speed",
	descriptionFull : "As an action, you hurl a mote of ice at one creature you can see within 120 feet of you. The target must make a Dexterity saving throw. On a failed save, the target takes 1d8 cold damage per psi point spent and has its speed halved until the start of your next turn. On a successful save, the target takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["mi2-ice sheet"] = {
	name : "Ice Sheet",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "10 min",
	save : "Dex",
	description : "Create 20-ft rad of difficult terrain; crea move more than 10 ft save or prone; on slope slide to bottom",
	descriptionFull : "As an action, choose a point on the ground you can see within 60 feet of you. The ground in a 20-foot radius centered on that point becomes covered in ice for 10 minutes. It is difficult terrain, and any creature that moves more than 10 feet on it must succeed on a Dexterity saving throw or fall prone. If the surface is sloped, a creature that falls prone in the area immediately slides to the bottom of the slope.",
	firstCol : 2
};
PsionicsList["mi3-frozen sanctuary"] = {
	name : "Frozen Sanctuary",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	duration : "Instantaneous",
	description : "I gain 20 temporary hit points",
	descriptionFull : "As a bonus action, you sheathe yourself with icy resilience. You gain 20 temporary hit points.",
	firstCol : 3
};
PsionicsList["mi4-frozen rain"] = {
	name : "Frozen Rain",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 min",
	save : "Con",
	description : "20-ft rad all 6d6(+1d6/extra PP) Cold dmg \u0026 spd 0; save half \u0026 no spd 0; 1 a Athl. vs DC for no spd 0",
	descriptionFull : "As an action, choose a point you can see within 120 feet of you. The air in a 20-foot-radius sphere centered on that point becomes deathly cold and saturated with moisture. Each creature in that area must make a Constitution saving throw. On a failed save, a target takes 6d6 cold damage, and its speed is reduced to 0 until your concentration ends. On a successful save, a target takes half as much damage." + "\n   " + "As an action, a target that has its speed reduced can end the effect early if it succeeds on a Strength (Athletics) check with a DC equal to this effect's save DC." + "\n   " + "You can increase this effect's damage by 1d6 per each additional psi point spent on it.",
	firstCol : "5-7"
};
PsionicsList["mi5-ice barrier"] = {
	name : "Ice Barrier",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60-ft",
	duration : "Conc, 10 min",
	description : "60\xD71\xD715ft (l\xD7w\xD7h) wall; a 10-ft section has AC 12 & 30 HP; melee atks do same as Cold dmg back",
	descriptionMetric : "20\xD70,3\xD75m (l\xD7w\xD7h) wall; a 3-m section has AC 12 & 30 hp; melee atks do same as Cold dmg back",
	descriptionFull : "As an action, you create a wall of ice, at least one portion of which must be within 60 feet of you. The wall is 60 feet long, 15 feet high, and 1 foot thick. The wall lasts until your concentration ends. Each 10-foot section of the wall has AC 12 and 30 hit points. A creature that damages the wall with a melee attack takes cold damage equal to the damage the creature dealt to the wall.",
	firstCol : 6
};
//the mastery of light and darkness discipline (contributed by Justin W.)
PsionicsList["mastery of light and darkness-ua-psy"] = {
	name : "Mastery of Light and Darkness",
	nameShort : "Mastery of Light \u0026 Dark",
	classes : ["mystic"],
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I can see through natural and magical darkness out to 30 ft",
	descriptionFull : "You claim dominion over light and darkness with your mind." + PsychicFocus + "While focused on this discipline, natural and magical darkness within 30 feet of you has no effect on your vision.",
	firstCol : "checkbox",
	dependencies : ["mld1-darkness", "mld2-light", "mld3-shadow beasts", "mld4-radiant beam"]
};
PsionicsList["mld1-darkness"] = {
	name : "Darkness",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "10 ft/PP rad darkness from point; darkvision doesn't work; only magical light of SL 3 or higher works",
	descriptionFull : "As an action, you create an area of magical darkness, which foils darkvision. Choose a spot you can see within 60 feet of you. Magical darkness radiates from that point in a sphere with a 10-foot radius per psi point spent on this ability. The light produced by spells of 2nd level or less is suppressed in this area.",
	firstCol : "1-7"
};
PsionicsList["mld2-light"] = {
	name : "Light",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "Touch",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "1 crea/obj save or sheds bright light 20-ft rad and dim light 20-ft, and can't hide, atks vs. it have adv.",
	descriptionFull : "As an action, an object you touch radiates light in a 20-foot radius and dim light for an additional 20 feet. The light lasts until your concentration ends. Alternatively, a creature you touch radiates light in the same manner if it fails a Dexterity saving throw. While lit in this manner, it can't hide, and attack rolls against it gain advantage.",
	firstCol : 2
};
PsionicsList["mld3-shadow beasts"] = {
	name : "Shadow Beasts",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "Summon 2 shadows that obeys my verbal commands; See Monster Manual, page 269",
	descriptionFull : "As an action, you cause two shadows to appear in unoccupied spaces you can see within 60 feet of you. The shadows last until your concentration ends, and they obey your verbal commands. In combat, roll for their initiative, and choose their behavior during their turns. When this effect ends, the shadows disappear. See the Monster Manual for their stat block.",
	firstCol : 3
};
PsionicsList["mld4-radiant beam"] = {
	name : "Radiant Beam",
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "1 crea 6d6(+1d6/extra PP) Radiant dmg, blinded, save each turn to end blind; save halves \u0026 not blind",
	descriptionFull : "As an action, you project a beam of light at one creature you can see within 60 feet of you. The target must make a Dexterity saving throw. On a failed save, it takes 6d6 radiant damage and is blinded until your concentration ends. On a successful save, it takes half as much damage. A blinded target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." + "\n   " + "You can increase this effect's damage by 1d6 per each additional psi point spent on it.",
	firstCol : "5-7"
};
//the mastery of water discipline (contributed by Justin W.)
PsionicsList["mastery of water-ua-psy"] = {
	name : "Mastery of Water",
	classes : ["mystic"],
	source : [["UA:TMC", 19]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain a swimming speed equal to my walking speed and I can breathe underwater",
	descriptionFull : "Your mind becomes one with elemental water, attuning your thoughts to its ebb and flow." + PsychicFocus + "While focused on this discipline, you have a swimming speed equal to your walking speed, and you can breathe underwater.",
	firstCol : "checkbox",
	dependencies : ["mwa1-dessicate", "mwa2-watery grasp", "mwa3-water whip", "mwa4-water breathing","mwa5-water sphere","mwa6-animate water"]
};
PsionicsList["mwa1-dessicate"] = {
	name : "Dessicate",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Con",
	description : "1 creature 1d10/PP Necrotic damage; save halves",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make a Constitution saving throw, taking 1d10 necrotic damage per psi point spent on this ability, or half as much damage on a successful one.",
	firstCol : "1-7"
};
PsionicsList["mwa2-watery grasp"] = {
	name : "Watery Grasp",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "5 ft",
	duration : "Instantaneous",
	save : "Dex",
	description : "20-ft sq all save or 2d6(+1d6/extra PP) Bludg. dmg, prone, pulled 10 ft to me; save half \u0026 not prone",
	descriptionFull : "As an action, you unleash a wave that surges forth and then retreats to you like the rising tide. You create a wave in a 20-foot-by-20-foot square. At least some portion of the square's border must be within 5 feet of you. Any creature in that square must make a Strength saving throw. On a failed save, a target takes 2d6 bludgeoning damage, is knocked prone, and is pulled up to 10 feet closer to you. On a successful save, a target takes half as much damage. You can increase this ability's damage by 1d6 per additional psi point spent on it.",
	firstCol : "2-7"
};
PsionicsList["mwa3-water whip"] = {
	name : "Water Whip",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60-ft line",
	duration : "Instantaneous",
	save : "Str",
	description : "60\xD75-ft (l\xD7w) all 3d6(+1d6/extra PP) Bludg. dmg \u0026 move to empty spot on line; save half \u0026 no move",
	descriptionMetric : "20\xD71,5m (l\xD7w) all 3d6(+1d6/extra PP) Bludg. dmg, move to empty spot on line; save half \u0026 no move",
	descriptionFull : "As an action, you unleash a jet of water in a line that is 60 feet long and 5 feet wide. Each creature in the line must make a Strength saving throw, taking 3d6 bludgeoning damage on a failed save, or half as much damage on a successful one. In addition, you can move each target that fails its saving throw to any unoccupied space touching the line. You can increase this ability's damage by 1d6 per additional psi point spent on it.",
	firstCol : "3-7"
};
PsionicsList["mwa4-water breathing"] = {
	name : "Water Breathing",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "24 h",
	description : "Me and up to 10 willing creatures can breathe underwater for the duration",
	descriptionFull : "As an action, you grant yourself and up to ten willing creatures you can see within 60 feet of you the ability to breathe underwater for the next 24 hours.",
	firstCol : 5
};
PsionicsList["mwa5-water sphere"] = {
	name : "Water Sphere",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "1 crea save or half speed, dis. on atks, can see only 10 ft, atks vs. it also dis.; save at end of each turn",
	descriptionFull : "As an action, you cause a sphere of water to form around a creature. Choose one creature you can see within 60 feet of you. The target must make a Dexterity saving throw. On a failed save, it becomes trapped in the sphere of water until your concentration ends. While the target is trapped, its speed is halved, it suffers disadvantage on attack rolls, and it can't see anything more than 10 feet away from it. However, attack rolls against it also suffer disadvantage. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a successful one.",
	firstCol : 6
};
PsionicsList["mwa6-animate water"] = {
	name : "Animate Water",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 h",
	description : "Summon a water elemental that obeys my verbal commands; See Monster Manual, page 124",
	descriptionFull : "As an action, you cause a water elemental to appear in an unoccupied space you can see within 120 feet of you. The elemental lasts until your concentration ends, and it obeys your verbal commands. In combat, roll for its initiative, and choose its behavior during its turns. When this effect ends, the elemental disappears. See the Monster Manual for its stat block.",
	firstCol : 7
};
//the mastery of weather discipline (contributed by Justin W.)
PsionicsList["mastery of weather-ua-psy"] = {
	name : "Mastery of Weather",
	classes : ["mystic"],
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain resistance to Lightning and Thunder damage",
	descriptionFull : "Your mind reaches into the sky, reshaping the stuff of storms to serve your needs." + PsychicFocus + "While focused on this discipline, you have resistance to lightning and thunder damage.",
	firstCol : "checkbox",
	dependencies : ["mw1-cloud steps", "mw2-hungry lightning", "mw3-wall of clouds", "mw4-whirlwind", "mw5-lightning leap", "mw6-wall of thunder", "mw7-thunder clap"]
};
PsionicsList["mw1-cloud steps"] = {
	name : "Cloud Steps",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "Self",
	duration : "Conc, 10 min",
	description : "U summon a 10 ft by 10 ft spiral staircase, that reaches 20 ft/PP upward",
	descriptionFull : "As an action, you conjure forth clouds to create a solid, translucent staircase that lasts until your concentration ends. The stairs form a spiral that fills a 10-foot-by-10-foot area and reaches upward 20 feet per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["mw2-hungry lightning"] = {
	name : "Hungry Lightning",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Dex",
	description : "1 creature 1d8/PP Lightning damage; save halves; disadvantage on save if wearing heavy armor",
	descriptionFull : "As an action, you lash out at one creature you can see within 60 feet of you with tendrils of lightning. The target must make a Dexterity saving throw, with disadvantage if it's wearing heavy armor. The target takes 1d8 lightning damage per psi point spent on a failed save, or half as much damage on a successful one.",
	firstCol : "1-7"
};
PsionicsList["mw3-wall of clouds"] = {
	name : "Wall of Clouds",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 10 min",
	description : "I create a 60-ft long, 15-ft high, 1-ft thick wall of clouds that blocks vision; it must start in range",
	descriptionFull : "As an action, you create a wall of clouds, at least one portion of which must be within 60 feet of you. The wall is 60 feet long, 15 feet high, and 1 foot thick. The wall lasts until your concentration ends. Creatures can pass through it without hindrance, but the wall blocks vision.",
	firstCol : 2
};
PsionicsList["mw4-whirlwind"] = {
	name : "Whirlwind",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Str",
	description : "20-ft rad all crea save or 1d6 Bludg. dmg & moved to chosen empty space in rad; obj moved as well",
	descriptionFull : "As an action, choose a point you can see within 60 feet of you. Winds howl in a 20-foot-radius sphere centered on that point. Each creature in the sphere must succeed on a Strength saving throw or take 1d6 bludgeoning damage and be moved to an unoccupied space of your choice in the sphere. Any loose object in the sphere is moved to an unoccupied space of your choice within it if the object weighs no more than 100 pounds.",
	firstCol : 2
};
PsionicsList["mw5-lightning leap"] = {
	name : "Lightning Leap",
	source : [["UA:TMC", 20]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60-ft line",
	duration : "Instantaneous",
	save : "Dex",
	description : "60-ft long 5-ft wide all 6d6(+1d6/extra PP) Lightning dmg; save halves; I teleport to spot on line",
	descriptionFull : "As an action, you let loose a line of lightning that is 60 feet long and 5 feet wide. Each creature in the line must make a Dexterity saving throw, taking 6d6 lightning damage on a failed save, or half as much damage on a successful one. You can then teleport to an unoccupied space touched by the line." + "\n   " + "You can increase this ability's damage by 1d6 per additional psi point spent on it.",
	firstCol : "5-7"
};
PsionicsList["mw6-wall of thunder"] = {
	name : "Wall of Thunder",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 10 min",
	save : "Str",
	description : "60\xD71\xD715 ft (l\xD7w\xD7h) wall; diff. terr.; crea start/move in save or 6d6 Thunder dmg, push 30 ft, prone",
	descriptionMetric : "20\xD70,3\xD75 m (l\xD7w\xD7h) wall; diff. terr.; crea start/move in save or 6d6 Thunder dmg, push 10m, prone",
	descriptionFull : "As an action, you create a wall of thunder, at least one portion of which must be within 60 feet of you. The wall is 60 feet long, 15 feet high, and 1 foot thick. The wall lasts until your concentration ends. Every foot moved through the wall costs 1 extra foot of movement. When a creature moves into the wall's space for the first time on a turn or starts its turn there, that creature must succeed on a Strength saving throw, or it takes 6d6 thunder damage, is pushed in a straight line up to 30 feet away from the wall, and is knocked prone.",
	firstCol : 6
};
PsionicsList["mw7-thunder clap"] = {
	name : "Thunder Clap",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Con",
	description : "20-ft rad all save or 8d6 Thunder dmg and stunned until my next turn ends; save halves \u0026 no stun",
	descriptionFull : "As an action, choose a point you can see within 60 feet of you. Thunder energy erupts in a 20-foot-radius sphere centered on that point. Each creature in that area must make Constitution saving throw. On a failed save, a target takes 8d6 thunder damage, and it is stunned until the end of your next turn. On a successful save, a target takes half as much damage.",
	firstCol : 7
};
//the mastery of wood and earth discipline (contributed by Justin W.)
PsionicsList["mastery of wood and earth-ua-psy"] = {
	name : "Mastery of Wood and Earth",
	nameShort : "Mastery of Wood \u0026 Earth",
	classes : ["mystic"],
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain a +1 bonus to AC",
	descriptionFull : "You attune your mind to seize control of wood and earth." + PsychicFocus + "While focused on this discipline, you have a +1 bonus to AC.",
	firstCol : "checkbox",
	dependencies : ["mwe1-animate weapon", "mwe2-warp weapon", "mwe3-warp armor", "mwe4-wall of wood", "mwe5-armored form", "mwe6-animate earth"]
};
PsionicsList["mwe1-animate weapon"] = {
	name : "Animate Weapon",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	description : "1 crea attacked by my 1-handed melee wea; use discipline score for atk/dmg; +1d10/PP Force dmg",
	descriptionFull : "As an action, your mind seizes control of a one-handed melee weapon you're holding. The weapon flies toward one creature you can see within 30 feet of you and makes a one-handed melee weapon attack against it, using your discipline attack modifier for the attack and damage rolls. On a hit, the weapon deals its normal damage, plus an extra 1d10 force damage per psi point spent on this ability. The weapon returns to your grasp after it attacks.",
	firstCol : "1-7"
};
PsionicsList["mwe2-warp weapon"] = {
	name : "Warp Weapon",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Str",
	description : "1 crea save or 1 chosen nonmagical wea it is holding can't be used to attack until my next turn ends",
	descriptionFull : "As an action, choose one nonmagical weapon held by one creature you can see within 60 feet of you. That creature must succeed on a Strength saving throw, or the chosen weapon can't be used to attack until the end of your next turn.",
	firstCol : 2
};
PsionicsList["mwe3-warp armor"] = {
	name : "Warp Armor",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Con",
	description : "1 crea wearing a nonmagical armor save or have AC 10 + its Dex modifier until my next turn ends",
	descriptionFull : "As an action, choose a nonmagical suit of armor worn by one creature you can see within 60 feet of you. That creature must succeed on a Constitution saving throw, or the creature's AC becomes 10 + its Dexterity modifier until the end of your next turn.",
	firstCol : 3
};
PsionicsList["mwe4-wall of wood"] = {
	name : "Wall of Wood",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 h",
	description : "Create 60-ft long, 15-ft high, 1-ft thick wall of solid wood; each 5-ft section has AC 12 and 100 HP",
	descriptionFull : "As an action, you create a wall of wood at least one portion of which must be within 60 feet of you. The wall is 60 feet long, 15 feet high, and 1 foot thick. The wall lasts until your concentration ends. Each 5-foot wide section of the wall has AC 12 and 100 hit points. Breaking one section creates a 5-foot by 5-foot hole in it, but the wall otherwise remains intact.",
	firstCol : 3
};
PsionicsList["mwe5-armored form"] = {
	name : "Armored Form",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I gain resistance to Bludgeoning, Piercing, and Slashing damage",
	descriptionFull : "As a bonus action, you gain resistance to bludgeoning, piercing, and slashing damage, which lasts until your concentration ends.",
	firstCol : 6
};
PsionicsList["mwe6-animate earth"] = {
	name : "Animate Earth",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Wu Jen",
	time : "1 a",
	range : "120 ft",
	duration : "Conc, 1 h",
	description : "Summon an earth elemental that obeys my verbal commands; See Monster Manual, page 124",
	descriptionFull : "As an action, you cause an earth elemental to appear in an unoccupied space you can see within 120 feet of you. The elemental lasts until your concentration ends, and it obeys your verbal commands. In combat, roll for its initiative, and choose its behavior during its turns. When this effect ends, the elemental disappears. See the Monster Manual for its stat block.",
	firstCol : 7
};
//the nomadic arrow discipline (contributed by mattohara)
PsionicsList["nomadic arrow-ua-psy"] = {
	name : "Nomadic Arrow",
	classes : ["mystic"],
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "My ranged weapon attacks ignore disadvantage, but can't get adv. if it was subject to dis.",
	descriptionFull : "You imbue a ranged weapon with a strange semblance of sentience, allowing it to unerringly find its mark." + PsychicFocus + "While you are focused on this discipline, any attack roll you make for a ranged weapon attack ignores disadvantage. If disadvantage would normally apply to the roll, that roll also can't benefit from advantage.",
	firstCol : "checkbox",
	dependencies : ["na1-speed dart", "na2-seeking missile", "na3-faithful archer"]
};
PsionicsList["na1-speed dart"] = {
	name : "Speed Dart",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "This turn end",
	description : "1 ranged weapon gains psionic power; next hit with it deals +1d10/PP Psychic damage",
	descriptionFull : "As a bonus action, you imbue one ranged weapon you hold with psionic power. The next attack you make with it that hits before the end of the current turn deals an extra 1d10 psychic damage per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["na2-seeking missile"] = {
	name : "Seeking Missile",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you miss with a ranged weapon attack",
	range : "Self",
	duration : "Instantaneous",
	description : "When I miss with a ranged attack, I can reroll the attack roll against the same target",
	descriptionFull : "As a reaction when you miss with a ranged weapon attack, you can repeat the attack roll against the same target.",
	firstCol : 2
};
PsionicsList["na3-faithful archer"] = {
	name : "Faithful Archer",
	source : [["UA:TMC", 21]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "1 ranged weapon gains sentience; free attack with it at the start of each turn; thrown weapons return",
	descriptionFull : "As a bonus action, you imbue a ranged weapon with a limited sentience. Until your concentration ends, you can make an extra attack with the weapon at the start of each of your turns (no action required). If it is a thrown weapon, it returns to your grasp each time you make any attack with it.",
	firstCol : 5
};
//the nomadic chameleon discipline (contributed by mattohara)
PsionicsList["nomadic chameleon-ua-psy"] = {
	name : "Nomadic Chameleon",
	classes : ["mystic"],
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Dexterity (Stealth) checks",
	descriptionFull : "You create a screen of psychic power that distorts your appearance, allowing you to blend into the background or even turn invisible." + PsychicFocus + "While focused on this discipline, you have advantage on Dexterity (Stealth) checks.",
	firstCol : "checkbox",
	dependencies : ["nc1-chameleon", "nc2-step from sight", "nc3-enduring invisibility"]
};
PsionicsList["nc1-chameleon"] = {
	name : "Chameleon",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "Self",
	duration : "This turn end",
	description : "I can hide, regardless of requirements; at end of turn, remain hidden only if requirements are met",
	descriptionFull : "As an action, you can attempt to hide even if you fail to meet the requirements needed to do so. At the end of the current turn, you remain hidden only if you then meet the normal requirements for hiding.",
	firstCol : 2
};
PsionicsList["nc2-step from sight"] = {
	name : "Step from Sight",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "60 ft",
	duration : "Conc, 1 min",
	description : "I (+1 crea/extra PP) become invisible; attacking/targeting/affecting other crea makes a crea visible",
	descriptionFull : "As a bonus action, cloak yourself from sight. You can target one additional creature for every additional psi point you spend on this ability. The added targets must be visible to you and within 60 feet of you." + "\n   " + "Each target turns invisible and remains so until your concentration ends or until immediately after it targets, damages, or otherwise affects any creature with an attack, a spell, or another ability.",
	firstCol : "3-7"
};
PsionicsList["nc3-enduring invisibility"] = {
	name : "Enduring Invisibility",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I turn invisible for the duration",
	descriptionFull : "As a bonus action, you turn invisible and remain so until your concentration ends.",
	firstCol : 7
};
//the nomadic mind discipline (contributed by mattohara)
PsionicsList["nomadic mind-ua-psy"] = {
	name : "Nomadic Mind",
	classes : ["mystic"],
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain proficiency with one skill, tool, or language",
	descriptionFull : "You dispatch part of your psyche into the noosphere, the collective vista of minds and knowledge possessed by living things." + PsychicFocus + "Whenever you focus on this discipline, you choose one skill or tool and have proficiency with it until your focus ends. Alternatively, you gain the ability to read and write one language of your choice until your focus ends.",
	firstCol : "checkbox",
	dependencies : ["nm1-wandering mind", "nm2-find creature", "nm3-item lore", "nm4-psychic speech", "nm5-wandering eye", "nm6-phasing eye"]
};
PsionicsList["nm1-wandering mind"] = {
	name : "Wandering Mind",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "10 min",
	range : "Self",
	duration : "1 h",
	description : "Gain prof. with 1 skill/2PP: Animal Hand., History, Medicine, Nature, Performance, Religion, Survival",
	descriptionFull : "You enter a deep contemplation. If you concentrate for this option's full duration, you then gain proficiency with up to three of the following skills (one skill for every 2 psi points spent): Animal Handling, Arcana, History, Medicine, Nature, Performance, Religion, and Survival. The benefit lasts for 1 hour, no concentration required.",
	firstCol : "2-6"
};
PsionicsList["nm2-find creature"] = {
	name : "Find Creature",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 h",
	range : "Self",
	duration : "Instantaneous",
	description : "Learn general location of a creature, within 1-3 miles; if it's on other plane, learn which plane instead",
	descriptionFull : "You cast your mind about for information about a specific creature. If you concentrate for this option's full duration, you then gain a general understanding of the creature's current location. You learn the region, city, town, village, or district where it is, pinpointing an area between 1 and 3 miles on a side (DM's choice). If the creature is on another plane of existence, you instead learn which plane.",
	firstCol : 2
};
PsionicsList["nm3-item lore"] = {
	name : "Item Lore",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 h",
	range : "5 ft",
	duration : "Instantaneous",
	description : "1 magical item or magic-imbued crea/obj; learn properties, how to use, and spells affecting it",
	descriptionFull : "You carefully study an item. If you concentrate for this option's full duration while remaining within 5 feet of the item, you then gain the benefits of an identify spell cast on that item.",
	firstCol : 3
};
PsionicsList["nm4-psychic speech"] = {
	name : "Psychic Speech",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "Self",
	duration : "1 h",
	description : "I understand all spoken/written languages and all with a language can understand what I say",
	descriptionFull : "As an action, you attune your mind to the psychic imprint of all language. For 1 hour, you gain the ability to understand any language you hear or attempt to read. In addition, when you speak, all creatures that can understand a language understand what you say, regardless of what language you use.",
	firstCol : 5
};
PsionicsList["nm5-wandering eye"] = {
	name : "Wandering Eye",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 h",
	description : "Create invisible, moving (unlimited range, 30ft/rnd) 1\" magic eye with darkvision I see through",
	description : "Create invisible, moving (unlimited range, 10m/rnd) 2,5cm magic eye /w darkvision I see through",
	descriptionFull : "As an action, you create a psychic sensor within 60 feet of you. The sensor lasts until your concentration ends. The sensor is invisible and hovers in the air. You mentally receive visual information from it, which has normal vision and darkvision with a range of 60 feet. The sensor can look in all directions. As an action, you can move the sensor up to 30 feet in any direction. There is no limit to how far away from you the eye can move, but it can't enter another plane of existence. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter.",
	firstCol : 6
};
PsionicsList["nm6-phasing eye"] = {
	name : "Phasing Eye",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 h",
	description : "As Wandering Eye above, except the eye can move through objects but can't end its movement in one",
	descriptionFull : "As Wandering Eye above, except the eye can move through solid objects but can't end its movement in one. If it does so, the effect immediately ends.",
	firstCol : 7
};
//the nomadic step discipline (contributed by Justin W.)
PsionicsList["nomadic step-ua-psy"] = {
	name : "Nomadic Step",
	classes : ["mystic"],
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "1/turn; after I teleport, increase speed by 10 ft until end of my turn",
	descriptionFull : "You exert your mind on the area around you, twisting the intraplanar pathways you perceive to allow instantaneous travel." + PsychicFocus + "After you teleport on your turn while focused on this discipline, your walking speed increases by 10 feet until the end of the turn, as you are propelled by the magic of your teleportation. You can receive this increase only once per turn.",
	firstCol : "checkbox",
	dependencies : ["ns1-step of a dozen paces", "ns2-nomadic anchor", "ns3-defensive step", "ns4-there and back again", "ns5-transposition", "ns6-baleful transposition", "ns7-phantom caravan", "ns8-nomad's gate"]
};
PsionicsList["ns1-step of a dozen paces"] = {
	name : "Step of a Dozen Paces",
	source : [["UA:TMC", 22]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Instantaneous",
	description : "I teleport up to 20 ft/PP to where I can see, instead of moving this turn; only if not moved yet",
	descriptionFull : "If you haven't moved yet on your turn, you take a bonus action to teleport up to 20 feet per psi point spent to an unoccupied space you can see, and your speed is reduced to 0 until the end of the turn.",
	firstCol : "1-7"
};
PsionicsList["ns2-nomadic anchor"] = {
	name : "Nomadic Anchor",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "120 ft",
	duration : "8 h",
	description : "Create 5-ft cu teleport anchor; any teleport from this discipline can go to it if within range",
	descriptionFull : "As an action, you create an invisible, intangible teleportation anchor in a 5-foot cube you can see within 120 feet of you. For the next 8 hours, whenever you use this psionic discipline to teleport, you can instead teleport to the anchor, even if you can't see it, but it must be within range of the teleportation ability.",
	firstCol : 1
};
PsionicsList["ns3-defensive step"] = {
	name : "Defensive Step",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you are hit by an attack",
	range : "Self",
	duration : "Instantaneous",
	description : "When hit by an attack, I gain +4 AC, and then teleport 10 ft to a space I can see",
	descriptionFull : "When you are hit by an attack, you can use your reaction to gain a +4 bonus to AC against that attack, possibly turning it into a miss. You then teleport up to 10 feet to an unoccupied space you can see.",
	firstCol : 2
};
PsionicsList["ns4-there and back again"] = {
	name : "There and Back Again",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "End of Turn",
	description : "I teleport 20 ft and move half my speed; I may teleport back to starting spot at end of my turn",
	descriptionFull : "As a bonus action, you teleport up to 20 feet to an unoccupied space you can see and then move up to half your speed. At the end of your turn, you can teleport back to the spot you occupied before teleporting, unless it is now occupied or on a different plane of existence.",
	firstCol : 2
};
PsionicsList["ns5-transposition"] = {
	name : "Transposition",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Willing creature and I teleport, swapping places, instead of moving this turn; only if not moved yet",
	descriptionFull : "If you haven't moved yet on your turn, choose an ally you can see within 60 feet of you. As a bonus action, you and that creature teleport, swapping places, and your speed is reduced to 0 until the end of the turn. This ability fails and is wasted if either of you can't fit in the destination space.",
	firstCol : 3
};
PsionicsList["ns6-baleful transposition"] = {
	name : "Baleful Transposition",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	save : "Wis",
	description : "1 creature save or it and I teleport, swapping places",
	descriptionFull : "As an action, choose one creature you can see within 120 feet of you. That creature must make a Wisdom saving throw. On a failed save, you and that creature teleport, swapping places. This ability fails and is wasted if either of you can't fit in the destination space.",
	firstCol : 5
};
PsionicsList["ns7-phantom caravan"] = {
	name : "Phantom Caravan",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "Me and up to 6 willing creatures teleport up to 1 mile to a spot I can see",
	descriptionFull : "As an action, you and up to six willing creatures of your choice that you can see within 60 feet of you teleport up to 1 mile to a spot you can see. If there isn't an open space for all the targets to occupy at the arrival point, this ability fails and is wasted.",
	firstCol : 6
};
PsionicsList["ns8-nomad's gate"] = {
	name : "Nomad's Gate",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 a",
	range : "5 ft",
	duration : "Conc, 1 h",
	description : "Create a 5-ft cu in range, and another up to 1 mile away; anyone entering one, teleports to the other",
	descriptionFull : "As an action, you create a 5-foot cube of dim, gray light within 5 feet of you. You create an identical cube at any point of your choice within 1 mile that you have viewed within the past 24 hours. Until your concentration ends, anyone entering one of the cubes immediately teleports to the other one, appearing in an unoccupied space next to it. The teleportation fails if there is no space for the creature to appear in.",
	firstCol : 7
};
//the precognition discipline (contributed by Justin W.)
PsionicsList["precognition-ua-psy"] = {
	name : "Precognition",
	classes : ["mystic"],
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advangage on initiative rolls",
	descriptionFull : "By analyzing information around you, from subtle hints to seemingly disconnected facts, you learn to weave a string of probabilities in an instant that gives you extraordinary insights." + PsychicFocus + "While focused on this discipline, you have advantage on initiative rolls.",
	firstCol : "checkbox",
	dependencies : ["p1-precognitive hunch", "p2-all-around sight", "p3-danger sense", "p4-victory before battle"]
};
PsionicsList["p1-precognitive hunch"] = {
	name : "Precognitive Hunch",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I add 1d4 to attack rolls, saving throws, and ability checks",
	descriptionFull : "As a bonus action, you open yourself to receive momentary insights that improve your odds of success; until your concentration ends, whenever you make an attack roll, a saving throw, or an ability check, you roll a d4 and add it to the total.",
	firstCol : 2
};
PsionicsList["p2-all-around sight"] = {
	name : "All-Around Sight",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you are hit by an attack",
	range : "Self",
	duration : "Instantaneous",
	description : "After an attack hits me, impose disadvantage on that attack roll",
	descriptionFull : "In response to an attack hitting you, you use your reaction to impose disadvantage on that attack roll, possibly causing it to miss.",
	firstCol : 3
};
PsionicsList["p3-danger sense"] = {
	name : "Danger Sense",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "Self",
	duration : "Conc, 8 h",
	description : "I gain +10 on the initiative roll, can't be surprised, and attacks against me can't gain advantage",
	descriptionFull : "As an action, you create a psychic model of reality in your mind and set it to show you a few seconds into the future. Until your concentration ends, you can't be surprised, attack rolls against you can't gain advantage, and you gain a +10 bonus to initiative.",
	firstCol : 5
};
PsionicsList["p4-victory before battle"] = {
	name : "Victory Before Battle",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "",
	range : "60-ft rad",
	duration : "Instantaneous",
	description : "Use when rolling initiative; grant myself and up to 5 creatures +10 on the initiative roll",
	descriptionFull : "When you roll initiative, you can use this ability to grant yourself and up to five creatures of your choice within 60 feet of you a +10 bonus to initiative.",
	firstCol : 7
};
//the psionic restoration discipline (contributed by Justin W.)
PsionicsList["psionic restoration-ua-psy"] = {
	name : "Psionic Restoration",
	classes : ["mystic"],
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "While focused, I can touch a creature with 0 HP as a bonus action and stabilize it",
	descriptionFull : "You wield psionic energy to cure wounds and restore health to yourself and others." + PsychicFocus + "While focused on this discipline, you can use a bonus action to touch a creature that has 0 hit points and stabilize it.",
	firstCol : "checkbox",
	dependencies : ["pr1-mend wounds", "pr2-restore health", "pr3-restore life", "pr4-restore vigor"]
};
PsionicsList["pr1-mend wounds"] = {
	name : "Mend Wounds",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Instantaneous",
	description : "1 creature is healed for 1d8/PP HP",
	descriptionFull : "As an action, you can spend psi points to restore hit points to one creature you touch. The creature regains 1d8 hit points per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["pr2-restore health"] = {
	name : "Restore Health",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Instantaneous",
	description : "1 creature is cured of either blindness, deafness, paralysis, poison, or 1 disease",
	descriptionFull : "As an action, you touch one creature and remove one of the following conditions from it: blinded, deafened, paralyzed, or poisoned. Alternatively, you remove one disease from the creature.",
	firstCol : 3
};
PsionicsList["pr3-restore life"] = {
	name : "Restore Life",
	source : [["UA:TMC", 23]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Instantaneous",
	description : "Resurrects 1 crea that has died in last minute to 1 HP, if not missing vital body parts or died of old age",
	descriptionFull : "As an action, you touch one creature that has died within the last minute. The creature returns to life with 1 hit point. This ability can't return to life a creature that has died of old age, nor can it restore a creature missing any vital body parts.",
	firstCol : 5
};
PsionicsList["pr4-restore vigor"] = {
	name : "Restore Vigor",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 a",
	range : "Touch",
	duration : "Instantaneous",
	description : "1 crea removes either 1 ability score reduction, 1 HP max reduction effect, or 1 level of exhaustion",
	descriptionFull : "As an action, you can touch one creature and choose one of the following: remove any reductions to one of its ability scores, remove one effect that reduces its hit point maximum, or reduce its exhaustion level by one.",
	firstCol : 7
};
//the psionic weapon discipline (contributed by Justin W.)
PsionicsList["psionic weapon-ua-psy"] = {
	name : "Psionic Weapon",
	classes : ["mystic"],
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "1 weapon or unarmed strike does Psychic dmg and counts as magical; no Str or Dex to dmg until CL6",
	descriptionFull : "You have learned how to channel psionic energy into your attacks, lending them devastating power." + PsychicFocus + "Whenever you focus on this discipline, choose one weapon you're holding or your unarmed strike. When you attack with it while focused on this discipline, its damage is psychic and magical, rather than its normal damage type. Until you reach 6th level as a mystic, you don't add your Strength or Dexterity modifier to the psychic attack's damage rolls.",
	firstCol : "checkbox",
	dependencies : ["pw1-ethereal weapon", "pw2-lethal strike", "pw3-augmented weapon"]
};
PsionicsList["pw1-ethereal weapon"] = {
	name : "Ethereal Weapon",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Next turn end",
	description : "1 crea save or auto hit by my next wea/unarmed atk; save halves atk dmg \u0026 negates any side-effects",
	descriptionFull : "As a bonus action, you temporarily transform one weapon you're holding or your unarmed strike into pure psionic energy. The next attack you make with it before the end of your turn ignores the target's armor, requiring no attack roll. Instead, the target makes a Dexterity saving throw against this discipline. On a failed save, the target takes the attack's normal damage and suffers its additional effects. On a successful save, the target takes half damage from the attack but suffers no additional effects that would normally be imposed on a hit.",
	firstCol : 1
};
PsionicsList["pw2-lethal strike"] = {
	name : "Lethal Strike",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Self",
	duration : "Next turn end",
	description : "My next weapon or unarmed attack that hits does +1d10/PP Psychic damage",
	descriptionFull : "As a bonus action, you imbue a weapon you're holding or your unarmed strike with psychic energy. The next time you hit with it before the end of your turn, it deals an extra 1d10 psychic damage per psi point spent.",
	firstCol : "1-7"
};
PsionicsList["pw3-augmented weapon"] = {
	name : "Augmented Weapon",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Immor",
	time : "1 bns",
	range : "Touch",
	duration : "Conc, 10 min",
	description : "1 weapon becomes a magic weapon with a +3 bonus to its attack and damage rolls",
	descriptionFull : "As a bonus action, touch one simple or martial weapon. Until your concentration ends, that weapon becomes a magic weapon with a +3 bonus to its attack and damage rolls.",
	firstCol : 5
};
//the psychic assault discipline
PsionicsList["psychic assault-ua-psy"] = {
	name : "Psychic Assault",
	classes : ["mystic"],
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain a +2 bonus to damage rolls with psionic talents that deal Psychic damage",
	descriptionFull : "You wield your mind like a weapon, unleashing salvos of psionic energy." + PsychicFocus + "While focused on this discipline, you gain a +2 bonus to damage rolls with psionic talents that deal psychic damage.",
	firstCol : "checkbox",
	dependencies : ["pa1-psionic blast", "pa2-ego whip", "pa3-id insinuation", "pa4-psychic blast", "pa5-psychic crush"]
};
PsionicsList["pa1-psionic blast"] = {
	name : "Psionic Blast",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	description : "1 creature takes 1d8/PP Psychic damage",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target takes 1d8 psychic damage per psi point spent on this ability.",
	firstCol : "1-7"
};
PsionicsList["pa2-ego whip"] = {
	name : "Ego Whip",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or 3d8 Psychic dmg, next turn just Dodge/Disengage/Hide action; save half \u0026 act normal",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, the creature takes 3d8 psychic damage, and it is filled with self-doubt, leaving it able to use its action on its next turn only to take the Dodge, Disengage, or Hide action. On a successful saving throw, it takes half as much damage.",
	firstCol : 3
};
PsionicsList["pa3-id insinuation"] = {
	name : "Id Insinuation",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or 5d8 Psychic dmg, next turn only Dodge/Attack action; save halves \u0026 act normal",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, the creature takes 5d8 psychic damage, and it goes into a fury, as its id runs rampant. On its next turn, it can use its action only to take the Dodge or Attack action. On a successful save, it takes half as much damage.",
	firstCol : 5
};
PsionicsList["pa4-psychic blast"] = {
	name : "Psychic Blast",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60-ft cone",
	duration : "Instantaneous",
	save : "Int",
	description : "All creatures 8d8(+2d8/extra PP) Psychic dmg; save halves",
	descriptionFull : "As an action, you unleash devastating psychic energy in a 60-foot cone. Each creature in that area must make an Intelligence saving throw, taking 8d8 psychic damage on a failed save, or half as much damage on a successful one. You can increase the damage by 2d8 if you spend 1 more psi point on this ability.",
	firstCol : "6-7"
};
PsionicsList["pa5-psychic crush"] = {
	name : "Psychic Crush",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "20-ft cu all crea save or 8d8 Psychic dmg \u0026 stunned until my next turn ends; save halves \u0026 no stun",
	descriptionFull : "As an action, you create a 20-foot cube of psychic energy within 120 feet of you. Each creature in that area must make an Intelligence saving throw. On a failed save, a target takes 8d8 psychic damage and is stunned until the end of your next turn. On a successful save, a target takes half as much damage.",
	firstCol : 7
};
//the psychic disruption discipline (contributed by Justin W.)
PsionicsList["psychic disruption-ua-psy"] = {
	name : "Psychic Disruption",
	classes : ["mystic"],
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I have advantage on Charisma (Deception) checks",
	descriptionFull : "You create psychic static that disrupts other creatures' ability to think clearly." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Deception) checks.",
	firstCol : "checkbox",
	dependencies : ["pd1-distracting haze", "pd2-daze", "pd3-mind storm"]
};
PsionicsList["pd1-distracting haze"] = {
	name : "Distracting Haze",
	source : [["UA:TMC", 24]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or 1d10/PP Psychic dmg, can't see more than 10 ft; save halves and see normal",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. That creature must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and can't see anything more than 10 feet from it until your concentration ends. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["pd2-daze"] = {
	name : "Daze",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Int",
	description : "1 crea save or incapacitated until end of my next turn or it takes any damage",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. That creature must make an Intelligence saving throw. On a failed save, the target is incapacitated until the end of your next turn or until it takes any damage.",
	firstCol : 3
};
PsionicsList["pd3-mind storm"] = {
	name : "Mind Storm",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Wis",
	description : "20-ft rad all crea 6d8(+1d6/extra PP) Psychic dmg and dis. on saves; save halves and no dis. on saves",
	descriptionFull : "As an action, choose a point you can see within 60 feet of you. Each creature in a 20-foot-radius sphere centered on that point must make a Wisdom saving throw. On a failed save, a target takes 6d8 psychic damage and suffers disadvantage on all saving throws until the end of your next turn. On a successful save, a creature takes half as much damage. You can increase the damage by 1d6 per additional psi point spent on this ability.",
	firstCol : "5-7"
};
//the psychic inquisition discipline (contributed by Justin W.)
PsionicsList["psychic inquisition-ua-psy"] = {
	name : "Psychic Inquisition",
	classes : ["mystic"],
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I know when a creature telepathically communicating with me is lying",
	descriptionFull : "You reach into a creature's mind to uncover information or plant ideas within it." + PsychicFocus + "While focused on this discipline, you know when a creature communicating with you via telepathy is lying.",
	firstCol : "checkbox",
	dependencies : ["pi1-hammer of inquisition", "pi2-forceful query", "pi3-ransack mind", "pi4-phantom idea"]
};
PsionicsList["pi1-hammer of inquisition"] = {
	name : "Hammer of Inquisition",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or 1d10/PP Psychic dmg, dis. next Wis save before my next turn; save halves \u0026 no effects",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and suffers disadvantage on its next Wisdom saving throw before the end of your next turn. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["pi2-forceful query"] = {
	name : "Forceful Query",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "30 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or they must truthfully answer a yes or no question (charm effect)",
	descriptionFull : "As an action, you ask a question of one creature that can see and hear you within 30 feet of you. The question must be phrased so that it can be answered with a yes or no, otherwise this ability fails. The target must succeed on a Wisdom saving throw, or it replies with a truthful answer. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 2
};
PsionicsList["pi3-ransack mind"] = {
	name : "Ransack Mind",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 h",
	range : "30 ft",
	duration : "12/24/48 h",
	save : "Int",
	description : "1 crea 3 saves if in range for full duration; learn key memories from 12/24/48 h (1/2/3 failed saves)",
	descriptionFull : "While you concentrate on this ability, you probe one creature's mind. The creature must remain within 30 feet of you, and you must be able to see it. If you reach the ability's full duration, the target must make three Intelligence saving throws, and you learn information from it based on the number of saving throws it fails." + "\n   " + "With one failed saving throw, you learn its key memories from the past 12 hours." + "\n   " + "With two failed saving throws, you learn its key memories from the past 24 hours." + "\n   " + "With three failed saving throws, you learn its key memories from the past 48 hours.",
	firstCol : 5
};
PsionicsList["pi4-phantom idea"] = {
	name : "Phantom Idea",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 h",
	range : "30 ft",
	duration : "4/24/48 h",
	save : "Int",
	description : "1 crea 3 saves if in range for full duration; implant memory lasting 4/24/48 h (1/2/3 failed saves)",
	descriptionFull : "While you concentrate on this ability, you probe one creature's mind. The creature must remain within 30 feet of you, and you must be able to see it. If you reach the ability's full duration, the target must make three Intelligence saving throws, and you plant a memory or an idea in it, which lasts for a number of hours based on the number of saving throws it fails. You choose whether the idea or memory is trivial (such as “I had porridge for breakfast” or “Ale is the worst”) or personality-defining (“I failed to save my village from orc marauders and am therefore a coward” or “Magic is a scourge, so I renounce it”)." + "\n   " + "With one failed saving throw, the idea or memory lasts for the next 4 hours. With two failed saving throws, it lasts for 24 hours. With three failed saving throws, it lasts for 48 hours.",
	firstCol : 6
};
//the psychic phantoms discipline (contributed by Justin W.)
PsionicsList["psychic phantoms-ua-psy"] = {
	name : "Psychic Phantoms",
	classes : ["mystic"],
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain advantage on Charisma (Deception) checks",
	descriptionFull : "Your power reaches into a creature's mind and causes it false perceptions." + PsychicFocus + "While focused on this discipline, you have advantage on Charisma (Deception) checks.",
	firstCol : "checkbox",
	dependencies : ["pp1-distracting figment", "pp2-phantom foe", "pp3-phantom betrayal", "pp4-phantom riches"]
};
PsionicsList["pp1-distracting figment"] = {
	name : "Distracting Figment",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Next turn end",
	save : "Int",
	description : "1 crea save or 1d10/PP Psychic dmg, can't use rea, melee atks vs. it have adv.; save halves \u0026 no effects",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it takes 1d10 psychic damage per psi point spent and thinks it perceives a threatening creature just out of its sight; until the end of your next turn, it can't use reactions, and melee attack rolls against it have advantage. On a successful save, it takes half as much damage.",
	firstCol : "1-7"
};
PsionicsList["pp2-phantom foe"] = {
	name : "Phantom Foe",
	source : [["UA:TMC", 25]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or no rea and 1d8(+1d8/extra PP) Psychic dmg at start its turn; save at end of each turn",
	descriptionFull : "As an action, choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, it perceives a horrid creature adjacent to it until your concentration ends. During this time, the target can't take reactions, and it takes 1d8 psychic damage at the start of each of its turns. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. You can increase the damage by 1d8 for each additional psi point spent on the ability.",
	firstCol : "3-7"
};
PsionicsList["pp3-phantom betrayal"] = {
	name : "Phantom Betrayal",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or targets its allies with attacks/damaging effects; save at end of each turn (charm effect)",
	descriptionFull : "As an action, you plant delusional paranoia in a creature's mind. Choose one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or until your concentration ends, it must target its allies with attacks and other damaging effects. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 5
};
PsionicsList["pp4-phantom riches"] = {
	name : "Phantom Riches",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or I move it and it can't act if not taking dmg since last turn; save at end of each turn",
	descriptionFull : "As an action, you plant the phantom of a greatly desired object in a creature's mind. Choose one creature you can see within 60 feet of you. The target must make an Intelligence saving throw. On a failed save, you gain partial control over the target's behavior until your concentration ends; the target moves as you wish on each of its turns, as it thinks it pursues the phantom object it desires. If it hasn't taken damage since its last turn, it can use its action only to admire the object you created in its perception. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
	firstCol : 7
};
//the telepathic contact discipline (contributed by Justin W.)
PsionicsList["telepathic contact-ua-psy"] = {
	name : "Telepathic Contact",
	classes : ["mystic"],
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "Use telepathy class feature with up to 6 crea; If no telepathy feature, gain telepathy 120 ft instead",
	descriptionFull : "By channeling psionic power, you gain the ability to control other creatures by substituting your will for their own." + PsychicFocus + "While focused on this discipline, you gain the ability to use your Telepathy class feature with up to six creatures at once. If you don't have that feature from the mystic class, you instead gain it while focused on this discipline.",
	firstCol : "checkbox",
	dependencies : ["tc1-exacting query", "tc2-occluded mind", "tc3-broken will", "tc4-psychic grip", "tc5-psychic domination"]
};
PsionicsList["tc1-exacting query"] = {
	name : "Exacting Query",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "120 ft",
	duration : "Instantaneous",
	save : "Int",
	description : "1 crea save or answer 1 telepathically asked question; on save, target is immune until my long rest",
	descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, the target truthfully answers one question you ask it via telepathy. On a successful save, the target is unaffected, and you can't use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 2
};
PsionicsList["tc2-occluded mind"] = {
	name : "Occluded Mind",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "120 ft",
	duration : "5 min",
	save : "Int",
	description : "1 crea save or believes telepathic statement; on save, target immune until my long rest (charm effect)",
	descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, the target believes one statement of your choice for the next 5 minutes that you communicate to it via telepathy. The statement can be up to ten words long, and it must describe you or a creature or an object the target can see. On a successful save, the target is unaffected, and you can't use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 2
};
PsionicsList["tc3-broken will"] = {
	name : "Broken Will",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "120 ft",
	duration : "1 rnd",
	save : "Int",
	description : "1 crea save or I control it on its next turn; on save, target immune until my long rest (charm effect)",
	descriptionFull : "As an action, you target one creature you can communicate with via telepathy. The target must make an Intelligence saving throw. On a failed save, you choose the target's movement and action on its next turn. On a successful save, the target is unaffected, and you can't use this ability on it again until you finish a long rest. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 5
};
PsionicsList["tc4-psychic grip"] = {
	name : "Psychic Grip",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or paralyzed; save at end of each turn, on failure I use rea to have it move half its speed",
	descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or it is paralyzed until your concentration ends. At the end of each of its turns, it can repeat the saving throw. On a success, this effect ends. On a failure, you can use your reaction to force the target to move up to half its speed, even though it's paralyzed.",
	firstCol : 6
};
PsionicsList["tc5-psychic domination"] = {
	name : "Psychic Domination",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Awake",
	time : "1 a",
	range : "60 ft",
	duration : "Conc, 1 min",
	save : "Int",
	description : "1 crea save or I direct its actions and move on its turns; save at end of each turn (charm effect)",
	descriptionFull : "As an action, you target one creature you can see within 60 feet of you. The target must succeed on an Intelligence saving throw, or you choose the creature's actions and movement on its turns until your concentration ends. At the end of each of its turns, it can repeat the saving throw, ending the effect on itself on a success. A creature is immune to this ability if it is immune to being charmed.",
	firstCol : 7
};
//the third eye discipline (contributed by Justin W.)
PsionicsList["third eye-ua-psy"] = {
	name : "Third Eye",
	classes : ["mystic"],
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	components : "Psi-F.",
	duration : "While focused",
	description : "I gain darkvision 60 ft; if already darkvision of 60 ft or more, increase range by 10 ft instead",
	descriptionFull : "You create a third, psychic eye in your mind which you cast out into the world. It channels thoughts and knowledge back to you, greatly enhancing your senses." + PsychicFocus + "While focused on this discipline, you have darkvision with a range of 60 feet. If you already have darkvision with that range or greater, increase its range by 10 feet.",
	firstCol : "checkbox",
	dependencies : ["te1-tremorsense", "te2-unwavering eye", "te3-piercing sight", "te4-truesight"]
};
PsionicsList["te1-tremorsense"] = {
	name : "Tremorsense",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I gain tremorsense with a radius of 30 ft",
	descriptionFull : "As a bonus action, you gain tremorsense with a radius of 30 feet, which lasts until your concentration ends.",
	firstCol : 2
};
PsionicsList["te2-unwavering eye"] = {
	name : "Unwavering Eye",
	source : [["UA:TMC", 26]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "1 min",
	description : "I gain advantage on Wisdom checks",
	descriptionFull : "As a bonus action, you gain advantage on Wisdom checks for 1 minute",
	firstCol : 2
};
PsionicsList["te3-piercing sight"] = {
	name : "Piercing Sight",
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I see through objects that are up to 1 ft thick within 30 ft",
	descriptionFull : "As a bonus action, you gain the ability to see through objects that are up to 1 foot thick within 30 feet of you. This sight lasts until your concentration ends.",
	firstCol : 3
};
PsionicsList["te4-truesight"] = {
	name : "Truesight",
	source : [["UA:TMC", 27]],
	psionic : true,
	level : 1,
	school : "Nomad",
	time : "1 bns",
	range : "Self",
	duration : "Conc, 1 min",
	description : "I gain truesight with a radius of 30 ft",
	descriptionFull : "As a bonus action, you gain truesight with a radius of 30 feet, which lasts until your concentration ends.",
	firstCol : 5
};

// Psionic Discipline 'Mastery of Force' power 'Inertial Armour'
ArmourList["inertial armor-ua-psy"] = {
	regExpSearch : /^(?=.*(inertial|psychic|psionic))(?=.*armou?r).*$/i,
	name : "Inertial armor",
	source : [["UA:TMC", 18]],
	ac : 14,
	list : "magic"
};

// Psionic Talents that work like damage cantrips
WeaponsList["energy beam-ua-psy"] = {
	regExpSearch : /^(?=.*\benergy\b)(?=.*\bbeam\b).*$/i,
	name : "Energy Beam",
	source : [["UA:TMC", 27]],
	list : "psionic",
	ability : 4,
	type : "Cantrip",
	damage : ["C", 8, "My choice"],
	range : "90 ft",
	description : "Dex save, success - no damage; Acid, cold, fire, lightning, or thunder damage [my choice]",
	abilitytodamage : false,
	dc : true
};
WeaponsList["mind slam-ua-psy"] = {
	regExpSearch : /^(?=.*\bmind\b)(?=.*\bslam\b).*$/i,
	name : "Mind Slam",
	source : [["UA:TMC", 28]],
	list : "psionic",
	ability : 4,
	type : "Cantrip",
	damage : ["C", 6, "force"],
	range : "60 ft",
	description : "Con save, success - no damage, fail - Large or smaller target also knocked prone",
	abilitytodamage : false,
	dc : true
};
WeaponsList["mind thrust-ua-psy"] = {
	regExpSearch : /^(?=.*\bmind\b)(?=.*\bthrust\b).*$/i,
	name : "Mind Thrust",
	source : [["UA:TMC", 28]],
	list : "psionic",
	ability : 4,
	type : "Cantrip",
	damage : ["C", 10, "psychic"],
	range : "120 ft",
	description : "Int save, success - no damage",
	abilitytodamage : false,
	dc : true
};
WeaponsList["psychic hammer-ua-psy"] = {
	regExpSearch : /^(?=.*\bpsychic\b)(?=.*\bhammer\b).*$/i,
	name : "Psychic Hammer",
	source : [["UA:TMC", 28]],
	list : "psionic",
	ability : 4,
	type : "Cantrip",
	damage : ["C", 6, "force"],
	range : "120 ft",
	description : "Str save, success - no damage, fail - also move 10 ft in chosen direction",
	abilitytodamage : false,
	dc : true
};
