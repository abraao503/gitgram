const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const connection = require('../database/connection');
const checkPassword = require('../utils/checkPassword');
const authConfig = require('../config/auth');

module.exports = {
  async store(req, res){
    //schema de validacao
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    //verifica os campos estão preenchidos corretamente
    try{
      await schema.validateAsync(req.body);
    }catch(err){
      return res.status(400).json({ error: 'Validation fails.'});
    }

    const { username, password } = req.body;

    const user = await connection('users')
      .where('username', username)
      .select('*')
      .first();

    if(!user){
      return res.status(401).json({ error: 'User not found.' });
    }

    if(! (await checkPassword(password, user.password_hash)) ){
       return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id } = user;

    return res.json({
      user: {
        username,
        avatar_url: user.avatar_url
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn
      })
    })
  },
}
