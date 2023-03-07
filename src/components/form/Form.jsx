import { useState, useEffect } from 'react';
import { findCelebrity } from '_src/utils/api';
import { API_CELEBRITY_URL, COUNTRIES } from '_src/utils/constants';
import { findKeyByValue } from '_src/utils/helpers';
import Input from '_src/components/form/Input';

const Form = ({ setCelebrity }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name || country) setCelebrity(await findCelebrity({ name, countryCode }));
  }

  useEffect(() => {
    setCountryCode(findKeyByValue(COUNTRIES, country));
  }, [country]);

  return (
    <form action={API_CELEBRITY_URL} method="get" onSubmit={handleSubmit}>
      <Input
        field="name"
        initialValue={name}
        changeHandler={setName}
      />
      <Input
        field="country"
        initialValue={country}
        changeHandler={setCountry}
        options={COUNTRIES}
      />
      <button type="submit">Match</button>
    </form>
  );
};

export default Form;
