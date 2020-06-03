import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .max(15, 'No máximo 15 caracteres')
    .required('Informe seu nome de usuário'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('Informe sua senha'),
});

export default schema;
