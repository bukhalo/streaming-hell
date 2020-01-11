const axios = require('axios');

async function shazamParse(url) {
  if (!url) return false;
  const id = url.split('/').filter(one => {
    return !isNaN(one) && one !== '';
  });
  const template = `https://www.shazam.com/discovery/v4/ru/US/web/-/track/${id[0]}`;
  const res = await axios(template);
  if (!res.data) return '';
  const result =
    res.data.hub.options.apple.openin.actions[0].uri ||
    res.data.hub.options.spotify.openin.actions[0].uri ||
    '';
  return result;
}

export default async text => {
  const regexp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
  if (regexp.test(text)) {
    const answer = text.match(regexp);
    if (answer && answer[0] && answer[0].match(/shazam/)) {
      return shazamParse(answer[0]);
    }
    return answer ? answer[0] : '';
  }
};
