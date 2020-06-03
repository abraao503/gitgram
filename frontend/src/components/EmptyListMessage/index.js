import React from 'react';

import EmptySvg from '../EmptySvg';

import './styles.css';

function EmptyListMessage(){
  return(
    <div className="empty-list-message-container">
      <p>Está vazio por aqui. Que tal adicionar um repositório?</p>
      <EmptySvg className="svg"/>
    </div>
  )
}

export default EmptyListMessage;
