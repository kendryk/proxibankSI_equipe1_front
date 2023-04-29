export class Client {

  // TODO attention il y a eu des modification dans les noms des attributs voir si cela fonctionne
  
  constructor(
    public id: number,
    public adress: string,
    public city: string,
    public firstName: string,
    public name: string,
    public phone: string,
    public zipCode: string,
    public ownerId: number
  ) {}
}
