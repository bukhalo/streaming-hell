import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './types/**/*.graphql'));

export default mergeTypes(typesArray, { all: true });
