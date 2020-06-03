const Joi = require('@hapi/joi');
const connection = require('../database/connection');
const repositoryBelongsToUser = require('../utils/repositoryBelongsToUser');

module.exports = {
  async index(req, res){
    const userId = req.userId;

    const repositories = await connection('repositories')
      .orderBy('id', 'desc')
      .select('*');

    const likes = await connection('likes')
      .where('user_id', userId)
      .select('repository_id');

    repositories.forEach((repository) => {
      //verifica se o usuario deu like no repositorio
      let found = likes.some(like => like.repository_id === repository.id);
      if(found){
        repository.userLike = true;
      }
      else {
        repository.userLike = false;
      }

      //converte as techs de string para array
      repository.techs = repository.techs.split(',');
    });

    return res.json(repositories);
  },

  async store(req, res){
    //schema de validacao
    const schema = Joi.object({
      title: Joi.string().required(),
      url: Joi.string().required(),
      techs : Joi.array().items(
        Joi.string()
      )
    });

    //verifica os campos estão preenchidos corretamente
    try{
      await schema.validateAsync(req.body);
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Validation fails.'});
    }

    const { title, url, techs } = req.body;
    const userId = req.userId;

    const user = await connection('users')
      .where('id', userId)
      .select('avatar_url')
      .first();

    const [id] = await connection('repositories').insert({
      user_id: userId,
      title,
      url,
      techs: techs.toString(),
      likes: 0,
      user_avatar_url: user.avatar_url
    });

    return res.json({
      id,
      title,
      url,
      techs,
      likes: 0,
      user_avatar_url: user.avatar_url
    });
  },

  async update(req, res){
    const schema = Joi.object({
      title: Joi.string()
        .required(),
      url: Joi.string()
        .required(),
      techs : Joi.array().items(
        Joi.string()
      ).required()
    });

    //verifica os campos estão preenchidos corretamente
    try{
      await schema.validateAsync(req.body);
    }catch(err){
      return res.status(400).json({ error: 'Validation fails.'});
    }

    const { id } = req.params;
    const userId = req.userId;

    if(! (await repositoryBelongsToUser(id, userId) )){
      return res.status(401).json({ error: 'Operation not permitted.'});
    }

    let { techs, title, url } = req.body;

    techs = techs.toString();

    await connection('repositories')
      .where('id', id)
      .update({
        techs,
        title,
        url
      });

    return res.json(req.body);
  },

  async delete(req, res){
    const { id } = req.params;
    const userId = req.userId;

    if(! (await repositoryBelongsToUser(id, userId) )){
      return res.status(401).json({ error: 'Operation not permitted.'});
    }

    await connection('repositories')
      .where('id', id)
      .delete();

    return res.status(204).send();
  },
}
