import {Padlet, User} from "./padlet";

export class PadletFactory {
  static empty(): Padlet {
    return new Padlet(new User(0, "", false), 0, '', new Date(), 1, '', 0, '');
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.user,
      rawPadlet.id,
      rawPadlet.title,
      typeof (rawPadlet.published)==='string' ? new Date(rawPadlet.published) : rawPadlet.published,
      rawPadlet.user_id,
      rawPadlet.subtitle,
      rawPadlet.rating,
      rawPadlet.comment
    )
  }
}
