import spotify from 'connectors/spotify';

export default {
  Query: {
    searchTrackByName: async (_, { name }) => {
      try {
        const req = await spotify.searchTracks(name);
        return req;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
};
