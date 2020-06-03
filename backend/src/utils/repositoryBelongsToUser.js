const connection = require('../database/connection');

async function repositoryBelongsToUser(repositoryId, userId){
  const repository = await connection('repositories')
    .where('id', repositoryId)
    .select('user_id')
    .first();

  if(!repository || repository.user_id !== userId){
    return false;
  }

  return true;
}

module.exports = repositoryBelongsToUser;
