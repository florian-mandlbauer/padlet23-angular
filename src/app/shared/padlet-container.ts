import {Padlet, User} from "./padlet";
import {PadletContainerUser} from "./padlet-container-user";

export class PadletContainer {
  constructor(
    public id: number,
    public title: string,
    public published: Date,
    public user: User,
    public isPublic: boolean,
    public padlets: Padlet[],
    public padlet_container_users: PadletContainerUser[]
  ) {}
}
