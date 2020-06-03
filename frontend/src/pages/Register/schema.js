import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .max(15, 'No máximo 15 caracteres')
    .required('Informe um nome de usuário'),
  githubUsername: Yup.string()
    .required('Informe seu nome de usuário no Github'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('Informe uma senha'),
});

export default schema;
