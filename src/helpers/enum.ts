import { registerEnumType } from 'type-graphql';

export enum VersionType {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SNAPSHOT = 'snapshot'
}

registerEnumType(VersionType, {
  name: 'VersionType', // this one is mandatory
  description: 'The status of the portfolio version', // this one is optional
});
