import {User} from "./user";
export {User} from "./user";

export class Padlet {
  constructor(
    public user: User,
    public id: number,
    public title: string,
    public published: Date,
    public user_id: number,
    public subtitle?: string,
    public rating?: number,
    public comment?: string
  ) {
  }
}
