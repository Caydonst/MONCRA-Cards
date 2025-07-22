export function generateGame(players) {
    /*
    Generate:
        Players:
            HP,
            Block,
            Cards,
            Buffs,
            Debuffs
        Enemies (amount: 1, 2, 3?):
            Each Enemy:
                HP,
                Block,
                Attacks,
                Buffs,
                Debuffs
        Turns
            Generate cards after each turn
     */
    console.log(players);
    const game = {
        playerData: generatePlayerData(players),
        enemyData: generateEnemyData(),
        turnData: {
            turn: 1,
            currentActionPoints: 4,
            totalActionPoints: 4,
        }
    };

    return game;
}

function generatePlayerData(players) {

    let playerData = []

    players.forEach((player, i) => {
        const data = {
            maxHp: 50,
            currentHp: 50,
            block: 0,
            cards: [], //generateCards(),
            buffs: [],
            debuffs: []
        };
        playerData.push(data);
    });
    return playerData;
}

function generateEnemyData() {

    //const randomNumber = Math.floor(Math.random() * 1) + 1;
    const number = 1;
    let enemyData = [];

    for (let i = 0; i < number; i++) {
        const randomHp = Math.floor(Math.random() * 50) + 50;
        const data = {
            maxHp: randomHp,
            currentHp: randomHp,
            block: 0,
            attacks: [], //generateEnemyAttacks(),
            buffs: [],
            debuffs: []
        }
        enemyData.push(data);
    }
    return enemyData;
}

function generateCards() {

}

function generateEnemyAttacks() {

}