import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

import api from '../../services/api';
import { Repositories } from '../../context/Repositories';
import { ActualScreen } from '../../context/ActualScreen';
import AddRepository from '../../components/AddRepository';
import EmptyListMessage from '../../components/EmptyListMessage';

import defaultProfilePicture from '../../assets/img/default.png';
import './styles.css';

function Home(){
  const { repositories, setRepositories } = useContext(Repositories);
  const { setActualScreen } = useContext(ActualScreen);
  const [emptyList, setEmptyList] = useState(false);
  const [likeRequest, setLikeRequest] = useState(false);
  const {token: userToken} = JSON.parse(localStorage.getItem('userData'));

  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    loadRepositories();
    setActualScreen('Repositórios da comunidade');
  }, []);

  useEffect(() => {
    if(repositories.length){
      setEmptyList(false);
    }
    else{
      setEmptyList(true);
    }
  }, [repositories]);

  async function loadRepositories(){
    const { data } = await api.get('repositories', config);
    setRepositories(data);
  }



  async function likeRepository(repositoryId, index){
    if(likeRequest){
      return;
    }
    setLikeRequest(true);

    try {
      const data = {};
      await api.post(`repositories/${repositoryId}/like`, data, config);

      let repositoriesCopy = [...repositories];
      repositoriesCopy[index].userLike = true;
      repositoriesCopy[index].likes += 1;
      setRepositories(repositoriesCopy);
    }
    catch(err){
      toast.error('Erro de conexão');
    }
    setLikeRequest(false);
  }

  async function dislikeRepository(repositoryId, index){
    if(likeRequest){
      return;
    }
    setLikeRequest(true);

    try {
      await api.delete(`repositories/${repositoryId}/like`, config);

      let repositoriesCopy = [...repositories];
      repositoriesCopy[index].userLike = false;
      repositoriesCopy[index].likes -= 1;
      setRepositories(repositoriesCopy);
    }
    catch(err){
      toast.error('Erro de conexão');
    }
    setLikeRequest(false);
  }

  return(
    <div className="home-container">
      <AddRepository />
      {emptyList ? <EmptyListMessage /> : null}
      <div className="repository-list">
        {repositories.map((repository, index) => (
          <div className="repository" key={repository.id}>
            <div className="picture">
              <img
                src={repository.user_avatar_url || defaultProfilePicture}
                alt="avatar"
              />
            </div>
            <div className="repository-data">
              <p className="name">{repository.title}</p>
              <p className="techs">{(repository.techs).join(', ')}</p>
              <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no Github
              </a>
            </div>
            <div className="like">
              {repository.userLike
                ? <FaHeart
                    size={30}
                    color="#7159c1"
                    onClick={() => dislikeRepository(repository.id, index)}
                  />
                : <FaRegHeart
                    size={30}
                    color="#7159c1"
                    onClick={() => likeRepository(repository.id, index)}
                  />
              }
              <p>{repository.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
