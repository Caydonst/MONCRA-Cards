export const stab = {
    name: "Stab",
    type: "Attack",
    cost: 1,
    effects: [
        { type: "damage", amount: 6}
    ],
    description: "Deal 6 damage",
}

export const slash = {
    name: "Slash",
    type: "Attack",
    cost: 1,
    effects: [
        { type: "damage", amount: 8 }
    ],
    description: "Deal 8 damage",
}

export const shatter = {
    name: "Shatter",
    type: "Attack",
    cost: 1,
    effects: [
        { type: "damage", amount: 8 },
        { type: "applyDebuff", debuff: "weakness", duration: 2 }
    ],
    description: "Deal 12 damage if the enemy is below 50% HP",
}

export const rageStrike = {
    name: "Rage Strike",
    type: "Attack",
    cost: 2,
    effects: [
        { type: "damage", base: 10, scaleWith: "missingHP", multiplier: 0.05 }
    ],
    description: "Deal 10 damage + 5% more damage for every 5% HP the enemy has lost",
}

export const whirlwind = {
    name: "Whirlwind",
    type: "Attack",
    cost: 2,
    effects: [
        { type: "damageAll", amount: 10 },
        { type: "applyDebuff", debuff: "weakness", duration: 2 }
    ],
    description: "Deal 6 damage and apply Weakness to all enemies",
}

export const cleave = {
    name: "Cleave",
    type: "Attack",
    cost: 2,
    effects: [
        { type: "damageAll", amount: 7 }
    ],
    description: "Deal 7 damage to all enemies",
}