export const stab = {
    name: "Stab",
    type: "Attack",
    cost: 1,
    effects: [
        { type: "damage", amount: 6}
    ],
    description: "Deal 6 damage",
}

export const whirlwind = {
    name: "Whirlwind",
    type: "Attack",
    cost: 2,
    effects: [
        { type: "damage", amount: 10 },
        { type: "applyDebuff", debuff: "weak", duration: 2 }
    ],
    description: "Deal 6 damage and apply Weakness to all enemies",
}