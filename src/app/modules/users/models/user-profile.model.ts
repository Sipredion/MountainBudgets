export class UserProfile {
  createdOn: Date;
  email: string;
  photoUrl: string;
  uid: string;
  username?: string;

  constructor(options: any) {
    this.createdOn = new Date();
    this.email = options && options.email;
    this.photoUrl = options && options.photoUrl;
    this.uid = options && options.uid;
    this.username = options && options.username;
  }
}
