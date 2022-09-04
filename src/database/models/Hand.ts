import { model, Schema } from "mongoose";

const handSchema = new Schema({
  handName: {
    required: true,
    type: String,
  },
  preGame: {
    required: true,
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
      required: true,
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
    required: true,
    preFlop: {
      required: true,
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
        required: true,
        type: [String],
      },
      pot: {
        required: true,
        type: Number,
      },
      actions: {
        required: true,
        type: [String],
      },
    },
    turn: {
      board: {
        required: true,
        type: [String],
      },
      pot: {
        required: true,
        type: Number,
      },
      actions: {
        required: true,
        type: [String],
      },
    },
    river: {
      board: {
        required: true,
        type: [String],
      },
      pot: {
        required: true,
        type: Number,
      },
      actions: {
        required: true,
        type: [String],
      },
    },
  },
  postGame: {
    required: true,
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
  },
});

const Hand = model("Hand", handSchema, "hands");

export default Hand;
