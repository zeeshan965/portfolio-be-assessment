import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'digication_assessment',
    synchronize: true,
    logging: true,

    cache: false,
    dropSchema: true,
    entities: ['src/**/entities/*.ts'],
    logger: 'advanced-console' as const,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../**/resolvers/*.resolver.ts`],
};

export default config;
