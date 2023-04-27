export class Client {
  constructor(
    public _id: number,
    public adress: string,
    public city: string,
    public first_name: string,
    public name: string,
    public phone: string,
    public zip_code: string,
    public owner_id: number
  ) {}
}
