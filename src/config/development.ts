import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'sqlite' as const,
    cache: false,
    database: ':memory:',
    dropSchema: true,
    entities: ['src/**/entities/*.ts'],
    logger: 'advanced-console' as const,
    synchronize: true,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../**/resolvers/*.resolver.ts`],
};

export default config;
