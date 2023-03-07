import { useState, useEffect } from 'react';
import { findImage } from '_src/utils/api';

const Result = ({ celebrity }) => {
  const [showResult, setShowResult] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    setShowResult(true);
    if (Object.keys(celebrity).length) {
      const loadImage = async () => setImage(await findImage());
      loadImage();
    }
  }, [celebrity]);

  if (showResult) {
    return (
      <div>
        {!!Object.keys(celebrity).length ? (
          <>
            <h1>{celebrity.name}</h1>
            {image && <img src={image} alt="Random image" />}
          </>
        ) : (
          <h1>No results 😲</h1>
        )}
      </div>
    );
  }

  return;
};

export default Result;
