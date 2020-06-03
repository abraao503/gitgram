import React from 'react';

import Header from '../../components/Header';

function TemplatePage(props){
    return(
      <div>
        <Header/>
        {props.children}
      </div>
    )
}

export default TemplatePage;
