import { Joi } from "express-validation";

const handDataSchema = {
  body: Joi.object({
    handName: Joi.string().max(40).required(),
    preGame: {
      hero: {
        position: Joi.number().greater(0).less(7).required(),
        initialStack: Joi.number().greater(0).less(10000).required(),
        hand: Joi.array()
          .length(2)
          .items(
            Joi.string().required().length(2),
            Joi.string().required().length(2)
          )
          .required(),
      },
      villains: Joi.array()
        .required()
        .min(1)
        .max(5)
        .has({
          position: Joi.number().greater(0).less(7).required(),
          initialStack: Joi.number().greater(0).less(10000).required(),
          hand: Joi.array()
            .length(2)
            .items(
              Joi.string().required().length(2),
              Joi.string().required().length(2)
            )
            .required(),
        }),
    },
    game: {
      preFlop: {
        pot: Joi.number().required().greater(0),
        actions: Joi.array().items(Joi.string().required()).required(),
      },
      flop: {
        board: Joi.array()
          .length(3)
          .items(
            Joi.string().length(2),
            Joi.string().length(2),
            Joi.string().length(2)
          ),
        pot: Joi.number().greater(0),
        actions: Joi.array().items(Joi.string()),
      },
      turn: {
        board: Joi.string().length(2),
        pot: Joi.number().greater(0),
        actions: Joi.array().items(Joi.string()),
      },
      river: {
        board: Joi.string().length(2),
        pot: Joi.number().greater(0),
        actions: Joi.array().items(Joi.string()),
      },
    },
    postGame: {
      finalPot: Joi.number().greater(0).required(),
      gameWinner: Joi.string().required(),
      handDescription: Joi.string(),
    },
    handImage: Joi.string(),
    handImageBackup: Joi.string(),
    owner: Joi.string().length(24),
  }),
};
export default handDataSchema;
