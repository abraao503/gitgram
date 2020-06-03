import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaEdit, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { ActualScreen } from '../../context/ActualScreen';
import parseStringAsArray from '../../utils/parseStringAsArray';

import './styles.css';

import api from '../../services/api';

function Profile(){
  const [repositories, setRepositories] = useState([]);
  const [editingMode, setEditingMode] = useState([]);
  const [fieldsEditing, setFieldsEditing] = useState([]);
  const { setActualScreen } = useContext(ActualScreen);

  const {token: userToken} = JSON.parse(localStorage.getItem('userData'));
  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    setActualScreen('Perfil');
    loadUserRepositories();
  }, []);

  async function loadUserRepositories(){
    const { data } = await api.get('userRepositories', config);
    setRepositories(data);
    initializeEditingArray(data.length);
  }

  function initializeEditingArray(length){
    let arr = new Array(length).fill(false);
    setEditingMode(arr);
  }

  function removeRepositoryFromLocalArray(index){
    let repositoriesCopy = [...repositories];
    repositoriesCopy.splice(index, 1);
    setRepositories(repositoriesCopy);
  }

  function editRepositoryInLocalArray(index){
    let repositoriesCopy = [...repositories];
    repositoriesCopy[index].title = fieldsEditing[0];
    repositoriesCopy[index].techs = parseStringAsArray(fieldsEditing[1]);
    repositoriesCopy[index].url = fieldsEditing[2];
    setRepositories(repositoriesCopy);
  }

  async function handleDeleteRepository(index, repositoryId){
    try{
      await api.delete(`repositories/${repositoryId}`, config);
      removeRepositoryFromLocalArray(index);
      toast.warning('Repositório apagado');
    }catch(err){
      console.log(err);
      toast.error('Falha ao apagar repositório');
    }
  }

  function handleEditRepository(index, {title, techs, url}){
    let arr = new Array(repositories.length).fill(false);
    arr[index] = true;
    setEditingMode(arr);

    setFieldsEditing([
      title,
      techs.toString(),
      url
    ]);
  }

  async function handleSaveChanges(index, repositoryId){
    try{
      const data = {
        title: fieldsEditing[0],
        techs: parseStringAsArray(fieldsEditing[1]),
        url: fieldsEditing[2],
      }
      await api.put(`repositories/${repositoryId}`, data, config);
      toast.success('Dados do repositório alterados');

      editRepositoryInLocalArray(index);
      setEditingMode(new Array(repositories.length).fill(false));
    }catch(err){
      console.log(err);
      console.log(err.response);
      toast.error('Falha ao alterar dados do repositório');
    }
  }

  function changeInputValue(e, index){
    let fieldsEditingCopy = [...fieldsEditing];
    fieldsEditingCopy[index] = e.target.value;
    setFieldsEditing(fieldsEditingCopy);
  }

  return(
    <div className="profile-container">
      <h2>Meus repositórios</h2>
      <div className="repository-list">
        {repositories.map((repository, index) => (
          <div className="user-repository" key={index}>
            <div className="box1">
              {editingMode[index]
                ?
                <div className="input-editing">
                  <div className="fields-name">
                    <strong>Título:</strong>
                    <strong>Techs:</strong>
                    <strong>URL:</strong>
                  </div>
                  <div className="fields">
                    <input
                      value={fieldsEditing[0]}
                      onChange={e => changeInputValue(e, 0)}
                    />
                    <input
                      value={fieldsEditing[1]}
                      onChange={e => changeInputValue(e, 1)}
                    />
                    <input
                      value={fieldsEditing[2]}
                      onChange={e => changeInputValue(e, 2)}
                    />
                  </div>
                </div>
                :
                <>
                  <p><strong>Título:</strong>{repository.title}</p>
                  <p className="techs"><strong>Techs:</strong>{(repository.techs).join(', ')}</p>
                  <p><strong>URL:</strong>{repository.url}</p>
                </>
              }
            </div>
            <div className="icons">
              <FaTrashAlt
                size={25}
                className="delete"
                onClick={() => handleDeleteRepository(index, repository.id)}
              />
              {editingMode[index]
                ? <FaCheckCircle
                    className="ok"
                    size={25}
                    onClick={() => handleSaveChanges(index, repository.id)}
                  />
                : <FaEdit
                    size={25}
                    className="edit"
                    onClick={() => handleEditRepository(index, repository)}
                  />
                }
              <div className="like">
                <FaHeart
                  size={25}
                  color="#7159c1"
                  />
                <p>{repository.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;
