import { useState } from 'react';

const types = {
  email: {
    regex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    ,
    message: 'Preencha um e-mail válido',
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    message: 'A senha precisa ter 8 caracteres, contendo letras e números.',
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.'
  }
};

const useForm = (type) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  
  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null)
      return true;
    }
  }

  function onChange({ target }) {
    if(error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    error,
  };
};

export default useForm;
