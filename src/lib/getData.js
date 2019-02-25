import axios from 'axios';
import jsdom from 'jsdom';

const getData = async ({ link }) => {
  try {
    // get song.link page
    const req = await axios(`https://song.link/${link}`, {
      maxRedirects: 20,
      timeout: 100000,
      maxContentLength: 50000000
    });

    // parse dom & find json with data on page
    const dom = new jsdom.JSDOM(req.data);
    const jsonData = dom.window.document.getElementById('initialState').innerHTML;

    // return object with data
    return JSON.parse(jsonData);
  } catch (e) {
    return null;
  }
};

export default getData;
