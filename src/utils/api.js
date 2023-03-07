import { API_CELEBRITY_URL, API_IMAGE_URL } from '_src/utils/constants';
import { urlQuerify, blobToBase64 } from '_src/utils/helpers';

const fetchFromApi = async (url, { params = {}, headers = {} }) => {
  let urlWithQuery = url;
  if (Object.keys(params).length) urlWithQuery += `?${urlQuerify(params)}`;

  return await fetch(urlWithQuery, {
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
      ...headers,
    },
  });
}

const findCelebrity = async ({ name, countryCode }) => {
  const response = await fetchFromApi(API_CELEBRITY_URL, {
    params: {
      name,
      country: countryCode,
    },
  });
  const celebrities = await response.json();
  return celebrities[0] || {};
}

const findImage = async () => {
  const response = await fetchFromApi(API_IMAGE_URL, { headers: { 'Accept': 'image/jpg' } });
  const blob = await response.blob();
  return await blobToBase64(blob);
}

export { findCelebrity, findImage };
