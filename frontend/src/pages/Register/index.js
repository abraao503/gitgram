import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import './styles.css';

import api from '../../services/api';
import IconSvg from '../../components/IconSvg';

import validationSchema from './schema';

function Register(){
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  async function handleSubmit({username, githubUsername, password}){
    setLoading(true);
    try {
      const data = { username, githubUsername, password };
      await api.post('users', data);
      setLoading(false);
      toast.success('Sua conta foi criada');
      history.push('/');
    }catch(err){
      setLoading(false);
      if(err.response.data.error === 'User already exists.'){
        toast.error('Nome de usuário já existe. Escolha outro');
        return;
      }
      toast.error('Erro de conexão')
    }
  }

  return(
    <div className="register-container">
      <IconSvg />
      <div className="form-container">
        <h2>Criar conta Gitgram</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            username: '',
            githubUsername: '',
            password: '',
          }}
          onSubmit={values => handleSubmit(values)}
        >
          <Form>
            <Field name="username" placeholder="Nome de usuário"/>
            <ErrorMessage name="username">
              {message => <span className="error">{message}</span>}
            </ErrorMessage>
            <Field name="githubUsername" placeholder="Nome de usuário no Github"/>
            <ErrorMessage name="githubUsername">
              {message => <span className="error">{message}</span>}
            </ErrorMessage>
            <Field name="password" type="password" placeholder="Senha"/>
            <ErrorMessage name="password">
              {message => <span className="error">{message}</span>}
            </ErrorMessage>
            <button
              className={loading? 'register-button disabled' : 'register-button'}
              disabled={loading}
              type="submit"
            >
              {loading? 'Carregando' : 'Criar conta'}
            </button>
            <Link className="link" to="/">
              Já tenho uma conta
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register;
