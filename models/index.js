// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gym, Region, Post, PostMedia, User, UserImage, Like, Comment, Effort, Trophy, Routine, UserRecord, UserLocation, Location, CurrentWorkout, FollowRelationship, Timeline, GymConnection, Coordinates } = initSchema(schema);

export {
  Gym,
  Region,
  Post,
  PostMedia,
  User,
  UserImage,
  Like,
  Comment,
  Effort,
  Trophy,
  Routine,
  UserRecord,
  UserLocation,
  Location,
  CurrentWorkout,
  FollowRelationship,
  Timeline,
  GymConnection,
  Coordinates
};