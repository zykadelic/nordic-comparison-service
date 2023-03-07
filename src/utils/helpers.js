const findKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const urlQuerify = (params) => {
  const filteredKeys = Object.keys(params).filter(key => params[key]);
  return filteredKeys.map(key => `${key}=${params[key]}`).join('&');
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export { findKeyByValue, urlQuerify, blobToBase64 };
