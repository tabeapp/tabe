// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, PostMedia, User, Like, Comment, UserLocation, Location, Effort, Routine, CurrentWorkout, FollowRelationship, Timeline } = initSchema(schema);

export {
  Post,
  PostMedia,
  User,
  Like,
  Comment,
  UserLocation,
  Location,
  Effort,
  Routine,
  CurrentWorkout,
  FollowRelationship,
  Timeline
};