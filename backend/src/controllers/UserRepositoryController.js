const connection = require('../database/connection');

module.exports = {
  async index(req, res){
    const userId = req.userId;

    const repositories = await connection('repositories')
      .where('user_id', userId)
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
  }
}
