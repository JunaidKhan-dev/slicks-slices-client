import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);
  const updateValue = (e) => {
    const { value, name, type } = e.target;
    if (type === 'number') {
      parseInt(value);
    }
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { values, updateValue };
};

export default useForm;
