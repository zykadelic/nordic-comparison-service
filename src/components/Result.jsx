import { useState, useEffect } from 'react';
import { findImage } from '_src/utils/api';
import { formatUSD } from '_src/utils/helpers';

const Result = ({ celebrity }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    console.log(celebrity);
    if (Object.keys(celebrity).length) {
      const loadImage = async () => setImage(await findImage());
      loadImage();
    }
  }, [celebrity]);

  return (
    <div id="result" style={{ backgroundImage: image ? `url(${image}` : 'none' }}>
      <div className="text">
        {!!Object.keys(celebrity).length ? (
          <>
            <h1 className="title">{celebrity.name}, {celebrity.age}</h1>
            <h2 className="subtitle">
              {celebrity.nationality && <span>{celebrity.nationality.toUpperCase()}</span>}
              {celebrity.height && <span>{celebrity.height}cm</span>}
              {celebrity.net_worth && <span>{formatUSD(celebrity.net_worth)}</span>}
            </h2>
          </>
        ) : (
          <h1 className="title">No results 😲</h1>
        )}
      </div>
    </div>
  );
};

export default Result;
