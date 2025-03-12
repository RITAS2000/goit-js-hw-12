import axios from 'axios';

const KEY = '49108574-14f3c0a22f7f392b839541c90';
const URL = 'https://pixabay.com/api/';
let per_page = 15;

export async function getImg(value, page) {
  const params = {
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };

  const { data } = await axios.get(URL, { params });
  return data;
}
