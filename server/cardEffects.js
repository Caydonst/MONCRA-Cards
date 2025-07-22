export const effectHandlers = {
    damage: (player, enemy, { amount }) => {
        enemy.hp -= amount;
    },
    applyDebuff: (player, enemy, { debuff, duration }) => {
        //enemy.debuffs = enemy.debuffs || [];
        enemy.debuffs.push({ type: debuff, duration });
    },
    applyBuff: (player, {buff, duration}) => {
        player.buffs.push({ type: buff, duration });
    }
}

function playCard(card, player, enemy) {
    for (const effect of card.effects) {
        const handler = effectHandlers[effect.type];
        if (handler) {
            handler(player, enemy, effect);
        } else {
            console.warn(`No handler for effect type: ${effect.type}`);
        }
    }
}

const player = { name: "Hero", hp: 100, debuffs: [], buffs: [] };
const enemy = { name: "Goblin", hp: 30, debuffs: [], buffs: [] };

playCard(card, player, enemy);