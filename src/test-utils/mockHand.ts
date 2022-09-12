const fakeHand = {
  handName: "Best hand name ever",
  preGame: {
    hero: { hand: ["Ac", "Ad"], initialStack: 100, position: 0 },
    villains: [{ hand: ["Ah", "As"], initialStack: 100, position: 1 }],
  },
  game: {
    preFlop: { actions: ["Everyone is allin"], pot: 200 },
    flop: {
      board: ["Ts", "9c", "8h"],
      actions: ["Everyone is allin"],
      pot: 200,
    },
    turn: { board: "7d", actions: ["Everyone is allin"], pot: 200 },
    river: { board: "6d", actions: ["Everyone is allin"], pot: 200 },
  },
  postGame: { finalPot: 200, gameWinner: "Hero" },
  id: "12345",
  owner: "1234",
};
export default fakeHand;
