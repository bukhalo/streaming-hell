export default {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
};
