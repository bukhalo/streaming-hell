import SpotifyWebApi from 'spotify-web-api-node';

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// auth
(async () => {
  try {
    const auth = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(auth.body.access_token);
    console.log(`The access token expires in ${auth.body.expires_in}`);
    console.log(`The access token is ${auth.body.access_token}`);
  } catch (e) {
    console.error(e);
  }
})();

export default spotify;
