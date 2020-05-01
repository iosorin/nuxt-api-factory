import REPOLIST from './repositories/list';
import dog from './repositories/dog';
// import igdb from './repositories/igdb'
import breakingbad from './repositories/breakingbad';
import spacex from './repositories/spacex';
import itunes from './repositories/itunes';

const repo = { REPOLIST, dog, breakingbad, spacex, itunes };

export const RepositoryFactory = {
    get: name => repo[name]
};
