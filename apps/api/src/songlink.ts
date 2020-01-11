import axios from 'axios';

const songLink = axios.create({
  baseURL: 'https://api.song.link/v1-alpha.1/',
});

export const linksByUrl = (url: string): any => {
  return songLink
    .get('/links', {
      params: {
        url,
        userCountry: '',
        platform: '',
        type: '',
        id: '',
        key: process.env.SONGLINK_API_KEY,
      },
    })
    .then(res => res.data)
    .catch(err => {
      console.error(err);
    });
};
