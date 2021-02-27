// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gym, Post, PostMedia, User, Like, Comment, UserLocation, Effort, Location, Routine, CurrentWorkout, FollowRelationship, Timeline, GymConnection, Coordinates } = initSchema(schema);

export {
  Gym,
  Post,
  PostMedia,
  User,
  Like,
  Comment,
  UserLocation,
  Effort,
  Location,
  Routine,
  CurrentWorkout,
  FollowRelationship,
  Timeline,
  GymConnection,
  Coordinates
};