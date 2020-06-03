import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

import { AddRepositoryState } from '../../context/AddRepositoryState';
import { ActualScreen } from '../../context/ActualScreen';

import './styles.css';

function Header(){
  const { setAddRepositoryVisible } = useContext(AddRepositoryState);
  const { actualScreen } = useContext(ActualScreen);

  const history = useHistory();
  const { user } = JSON.parse(localStorage.getItem('userData')) || {user: {username: '', avatar_url: ''}};

  function handleClick(){
    setAddRepositoryVisible(true);
  }

  function navigateToProfile(){
    history.push('/profile');
  }

  function navigateToHome(){
    history.push('/home');
  }

  function logOut(){
    localStorage.removeItem('userData');
    history.push('/');
  }

  return(
    <header>
      <div className="box1">
        {actualScreen === 'Perfil'
          ?
            <FaArrowLeft
              size={25}
              title="Voltar para tela inical"
              onClick={navigateToHome}
            />
          : null
        }
        <p className="screen-name">{actualScreen}</p>
      </div>
      {actualScreen === 'Perfil'
        ? null
        : <button onClick={handleClick}>Novo repositório</button>
      }
      <div className="box2">
        <div className="user" title="Ir para perfil" onClick={navigateToProfile}>
          <img src={user.avatar_url} alt="avatar"/>
          <p className="username">{user.username}</p>
        </div>
        <FaSignOutAlt
          title="Sair"
          size={26}
          onClick={logOut}
        />
      </div>
    </header>
  )
}

export default Header;
