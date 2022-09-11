import { model, Schema } from "mongoose";

const handSchema = new Schema({
  handName: {
    required: true,
    type: String,
  },
  preGame: {
    hero: {
      position: {
        required: true,
        type: Number,
      },
      initialStack: {
        required: true,
        type: Number,
      },
      hand: {
        required: true,
        type: [String],
      },
    },
    villains: {
      type: [
        {
          position: {
            required: true,
            type: Number,
          },
          initialStack: {
            required: true,
            type: Number,
          },
          hand: {
            required: true,
            type: [String],
          },
        },
      ],
      minItems: 1,
      maxItems: 6,
    },
  },
  game: {
    preFlop: {
      pot: {
        required: true,
        type: Number,
      },
      actions: {
        required: true,
        type: [String],
      },
    },
    flop: {
      board: {
        type: [String],
      },
      pot: {
        type: Number,
      },
      actions: {
        type: [String],
      },
    },
    turn: {
      board: {
        type: String,
      },
      pot: {
        type: Number,
      },
      actions: {
        type: [String],
      },
    },
    river: {
      board: {
        type: String,
      },
      pot: {
        type: Number,
      },
      actions: {
        type: [String],
      },
    },
  },
  postGame: {
    finalPot: {
      required: true,
      type: Number,
    },
    gameWinner: {
      required: true,
      type: String,
    },
    handDescription: {
      type: String,
    },
    handImage: {
      type: String,
    },
    handImageBackup: {
      type: String,
    },
  },
  owner: {
    type: String,
    required: true,
  },
});

const Hand = model("Hand", handSchema, "hands");

export default Hand;
