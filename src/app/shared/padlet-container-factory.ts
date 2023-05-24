import {PadletContainer} from "./padlet-container";
import {User} from "./user";

export class PadletContainerFactory {
  static empty(): PadletContainer {
    return new PadletContainer(0, '', new Date(), new User(0, '', false), true, [], []);
  }

  static fromObject(rawPadletContainer: any): PadletContainer {
    return new PadletContainer(
      rawPadletContainer.user,
      rawPadletContainer.id,
      rawPadletContainer.title,
      rawPadletContainer.published,
      rawPadletContainer.isPublic,
      rawPadletContainer.padlets,
      rawPadletContainer.padlet_container_users
    )
  }
}
