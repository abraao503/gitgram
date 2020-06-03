import React, { useState, useRef, useEffect, useContext  } from 'react';
import { toast } from 'react-toastify';

import { AddRepositoryState } from '../../context/AddRepositoryState';
import { Repositories } from '../../context/Repositories';

import parseStringAsArray from '../../utils/parseStringAsArray';
import api from '../../services/api';

import './styles.css';

function AddRepository(){
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState('');
  const [url, setUrl] = useState('');
  const contentRef = useRef(null);

  const { addRepositoryVisible, setAddRepositoryVisible } = useContext(AddRepositoryState);
  const { repositories, setRepositories } = useContext(Repositories);

  const {token: userToken} = JSON.parse(localStorage.getItem('userData'));
  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    contentRef.current.style.maxHeight = addRepositoryVisible ? `${contentRef.current.scrollHeight}px` : '0px'
  }, [contentRef, addRepositoryVisible]);

  useEffect(() => {
    if(techs !=='' && title !=='' && url !==''){
      setButtonDisabled(false);
    }
    else if(!buttonDisabled){
      setButtonDisabled(true);
    }
  }, [techs, title, url, buttonDisabled]);

  function cleanInputs(){
    setTechs('');
    setTitle('');
    setUrl('');
  }

  function addRepositoryInlocalArray(repository){
    setRepositories([repository, ...repositories]);
  }

  async function handleSubmit(){
    try{
      const techsArray = parseStringAsArray(techs);
      const data = { techs: techsArray, title, url };
      const response = await api.post('repositories', data, config);

      toast.success('Repositório criado');
      addRepositoryInlocalArray(response.data);
      setAddRepositoryVisible(false);
      cleanInputs();
    }catch(err){
      console.log(err);
      toast.error('Falha ao criar repositório');
    }
  }

  return (
    <div ref={contentRef} className="add-repository">
      <form className="add-repository-form">
        <input
          name="title"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          name="techs"
          placeholder="Techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
        <input
          name="url"
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <div className="buttons">
          <button
            className="cancel"
            type="button"
            onClick={() => setAddRepositoryVisible(false)}
          >
            Cancelar
          </button>
          <button
            className={buttonDisabled ? 'create disabled' : 'create'}
            disabled={buttonDisabled}
            type="button"
            onClick={handleSubmit}
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRepository;
