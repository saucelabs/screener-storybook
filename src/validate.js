var Joi = require('joi');
var Promise = require('bluebird');

exports.storybookConfig = function(value) {
  var schema = Joi.object().keys({
    apiKey: Joi.string().required(),
    projectRepo: Joi.string().max(100).required(),
    storybookPort: Joi.number(),
    storybookUrl: Joi.string().uri(),
    storybook: Joi.array().min(0).items(
      Joi.object().keys({
        kind: Joi.string().required(),
        stories: Joi.array().min(1).items(
          Joi.object().keys({
            name: Joi.string().required()
          })
        ).required()
      })
    ).required(),
    build: Joi.string().max(40),
    branch: Joi.string().max(100),
    resolution: Joi.string().regex(/^[0-9]{3,4}x[0-9]{3,4}$/, 'resolution'),
    ignore: Joi.string(),
    diffOptions: Joi.object().keys({
      structure: Joi.boolean(),
      layout: Joi.boolean(),
      style: Joi.boolean(),
      content: Joi.boolean()
    })
  }).required().xor('storybookPort', 'storybookUrl');
  var validator = Promise.promisify(Joi.validate);
  return validator(value, schema);
};