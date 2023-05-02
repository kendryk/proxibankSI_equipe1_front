export class TransfertDTO {
  constructor(
    public accountSourceId: number,
    public accountDestinationId: number,
    public amount: number
  ) {}
}
