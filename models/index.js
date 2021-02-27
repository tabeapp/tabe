// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gym, Post, PostMedia, User, Like, Comment, UserLocation, Location, Effort, Routine, CurrentWorkout, FollowRelationship, Timeline, GymConnection, Coordinates } = initSchema(schema);

export {
  Gym,
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
  Timeline,
  GymConnection,
  Coordinates
};