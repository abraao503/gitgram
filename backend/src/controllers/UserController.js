const { uuid } = require('uuidv4');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const connection = require('../database/connection');

module.exports = {
  async index(req, res){
    const users = await connection('users').select('*');

    return res.json(users);
  },

  async store(req, res){
    const schema = Joi.object({
      username: Joi.string()
        .min(3)
        .max(15)
        .required(),
      githubUsername: Joi.string()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
    });

    try{
      await schema.validateAsync(req.body);
    }catch(err){
      return res.status(400).json({ error: 'Validation fails.'});
    }

    const {username, githubUsername, password} = req.body;

    const userAlreadyExists = await connection('users')
      .where('username', username)
      .first();

    if(userAlreadyExists){
      return res.status(409).json({ error: 'User already exists.'});
    }

    try{
      const { data } = await axios.get(`https://api.github.com/users/${githubUsername}`);
      var avatarUrl = data.avatar_url;
    }catch(err){
      var avatarUrl = null;
    }

    const password_hash = await bcrypt.hash(password, 6);

    const id = uuid();

    await connection('users').insert({
      id,
      username,
      github_username: githubUsername,
      avatar_url: avatarUrl,
      password_hash,
    })

    return res.json({ id, username, githubUsername, avatarUrl });
  },
}
