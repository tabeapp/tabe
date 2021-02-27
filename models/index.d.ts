import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class GymConnection {
  readonly items?: (Gym | null)[];
  readonly total?: number;
  readonly nextToken?: string;
  constructor(init: ModelInit<GymConnection>);
}

export declare class Coordinates {
  readonly lat?: number;
  readonly lon?: number;
  constructor(init: ModelInit<Coordinates>);
}

export declare class Gym {
  readonly id: string;
  readonly name: string;
  readonly location?: Coordinates;
  readonly countryID: string;
  readonly stateID: string;
  readonly cityID: string;
  constructor(init: ModelInit<Gym>);
  static copyOf(source: Gym, mutator: (draft: MutableModel<Gym>) => MutableModel<Gym> | void): Gym;
}

export declare class Post {
  readonly id: string;
  readonly type: string;
  readonly media?: (PostMedia | null)[];
  readonly title?: string;
  readonly description?: string;
  readonly data?: string;
  readonly userID: string;
  readonly user?: User;
  readonly likes?: (Like | null)[];
  readonly comments?: (Comment | null)[];
  readonly createdAt: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class PostMedia {
  readonly id: string;
  readonly postID: string;
  readonly uri: string;
  constructor(init: ModelInit<PostMedia>);
  static copyOf(source: PostMedia, mutator: (draft: MutableModel<PostMedia>) => MutableModel<PostMedia> | void): PostMedia;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly image?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Like {
  readonly id: string;
  readonly parentID: string;
  readonly userID: string;
  constructor(init: ModelInit<Like>);
  static copyOf(source: Like, mutator: (draft: MutableModel<Like>) => MutableModel<Like> | void): Like;
}

export declare class Comment {
  readonly id: string;
  readonly userID: string;
  readonly postID: string;
  readonly content: string;
  readonly likes?: (Like | null)[];
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

export declare class UserLocation {
  readonly id: string;
  readonly userID: string;
  readonly gymID: string;
  readonly gym?: Gym;
  constructor(init: ModelInit<UserLocation>);
  static copyOf(source: UserLocation, mutator: (draft: MutableModel<UserLocation>) => MutableModel<UserLocation> | void): UserLocation;
}

export declare class Region {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<Region>);
  static copyOf(source: Region, mutator: (draft: MutableModel<Region>) => MutableModel<Region> | void): Region;
}

export declare class Effort {
  readonly id: string;
  readonly postID: string;
  readonly userID: string;
  readonly exercise: string;
  readonly weight: number;
  readonly reps: number;
  readonly orm: number;
  readonly countryID: string;
  readonly country?: Region;
  readonly stateID: string;
  readonly state?: Region;
  readonly cityID: string;
  readonly city?: Region;
  readonly gymID: string;
  readonly gym?: Gym;
  readonly createdAt: string;
  constructor(init: ModelInit<Effort>);
  static copyOf(source: Effort, mutator: (draft: MutableModel<Effort>) => MutableModel<Effort> | void): Effort;
}

export declare class Location {
  readonly id: string;
  readonly name: string;
  readonly superLocationID: string;
  readonly superLocation?: Location;
  constructor(init: ModelInit<Location>);
  static copyOf(source: Location, mutator: (draft: MutableModel<Location>) => MutableModel<Location> | void): Location;
}

export declare class Routine {
  readonly id: string;
  readonly userID: string;
  readonly title: string;
  readonly current: number;
  readonly routine: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Routine>);
  static copyOf(source: Routine, mutator: (draft: MutableModel<Routine>) => MutableModel<Routine> | void): Routine;
}

export declare class CurrentWorkout {
  readonly id: string;
  readonly userID: string;
  readonly data: string;
  readonly routineID: string;
  readonly routine?: Routine;
  constructor(init: ModelInit<CurrentWorkout>);
  static copyOf(source: CurrentWorkout, mutator: (draft: MutableModel<CurrentWorkout>) => MutableModel<CurrentWorkout> | void): CurrentWorkout;
}

export declare class FollowRelationship {
  readonly id: string;
  readonly followeeId: string;
  readonly followerId: string;
  readonly createdAt: string;
  constructor(init: ModelInit<FollowRelationship>);
  static copyOf(source: FollowRelationship, mutator: (draft: MutableModel<FollowRelationship>) => MutableModel<FollowRelationship> | void): FollowRelationship;
}

export declare class Timeline {
  readonly id: string;
  readonly userId: string;
  readonly post?: Post;
  readonly createdAt: string;
  constructor(init: ModelInit<Timeline>);
  static copyOf(source: Timeline, mutator: (draft: MutableModel<Timeline>) => MutableModel<Timeline> | void): Timeline;
}