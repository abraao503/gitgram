const { uuid } = require('uuidv4');
const connection = require('../database/connection');
const repositoryBelongsToUser = require('../utils/repositoryBelongsToUser');

module.exports = {
  async index(req, res){
    const likes = await connection('likes').select('*');

    return res.json(likes);
  },

  async store(req, res){
    const { id: repositoryId } = req.params;
    const userId = req.userId;

    const repository = await connection('repositories')
      .where('id', repositoryId)
      .select('likes')
      .first()

    if(!repository){
      return res.status(401).json({ error: 'Operation not permitted.'});
    }

    const like = await connection('likes')
      .where('user_id', userId)
      .andWhere('repository_id', repositoryId)
      .first();

    //nao permite um usuário dar mais de um like um repositorio
    if(like){
      return res.status(401).json({ error: 'Operation not permitted.'});
    }

    //faz o relacionamento: 'usuario X deu like em repositorio Y'
    await connection('likes').insert({
      user_id: userId,
      repository_id: repositoryId
    });

    await connection('repositories')
      .where('id', repositoryId)
      .update({
        likes: repository.likes + 1
      });

    return res.status(204).send();
  },


  async delete(req, res){
    const { id: repositoryId } = req.params;
    const userId = req.userId;

    const repository = await connection('repositories')
      .where('id', repositoryId)
      .select('likes')
      .first()

    if(!repository){
      return res.status(401).json({ error: 'Operation not permitted.'});
    }

    const like = await connection('likes')
      .where('user_id', userId)
      .andWhere('repository_id', repositoryId)
      .delete();

    if(like){
      await connection('repositories')
        .where('id', repositoryId)
        .update({
          likes: repository.likes - 1
        });

      return res.status(204).send();
    }

    return res.status(404).json({ error: 'Like not found.' });
  },
}
