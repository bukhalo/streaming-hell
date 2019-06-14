import getData from 'lib/getData';

export default {
  Query: {
    searchByUrl: async (_, { url }) => {
      try {
        const req = await getData({ link: url });
        return req.songlink;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
};
