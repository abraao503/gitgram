import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import './styles.css';

import api from '../../services/api';
import IconSvg from '../../components/IconSvg';

import validationSchema from './schema';

function Login(){
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleSubmit({username, password}){
    setLoading(true);
    try {
      const data = { username, password };
      const response = await api.post('sessions', data);
      setLoading(false);
      toast.success('Bem-vindo');
      localStorage.setItem('userData', JSON.stringify(response.data));
      history.push('/home');
    }catch(err){
      setLoading(false);
      if(err.response.status === 401){
        toast.error('Usuário ou senha invalidos. Verifique seus dados');
        return;
      }
      toast.error('Falha na conexão')
    }
  }

  return(
    <div className="login-container">
      <IconSvg />
      <div className="form-container">
        <h2>Entrar no Gitgram</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={values => handleSubmit(values)}
        >
          <Form>
            <Field name="username" placeholder="Nome de usuário"/>
            <ErrorMessage name="username">
              {message => <span className="error">{message}</span>}
            </ErrorMessage>
            <Field name="password" type="password" placeholder="Senha"/>
            <ErrorMessage name="password">
              {message => <span className="error">{message}</span>}
            </ErrorMessage>
            <button
              className={loading? 'login-button disabled' : 'login-button'}
              disabled={loading}
              type="submit"
            >
              {loading? 'Carregando' : 'Entrar'}
            </button>
            <Link className="link" to="/register">
              Não tenho uma conta
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login;
