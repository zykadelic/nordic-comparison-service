import { useState } from 'react';
import Form from '_src/components/form/Form';
import Result from '_src/components/Result';

const App = () => {
  const [celebrity, setCelebrity] = useState({});

  return (
    <>
      <Form setCelebrity={setCelebrity} />
      <Result celebrity={celebrity} />
    </>
  );
};

export default App;
