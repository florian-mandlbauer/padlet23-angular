export class PadletContainerUser {
  constructor(
    public id: number,
    public user_id: number,
    public created_at: string,
    public updated_at: string,
    public padlet_container_id: number,
    public role: string
  ){}
}
