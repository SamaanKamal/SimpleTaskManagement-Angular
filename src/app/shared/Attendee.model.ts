export class Attendee {
  constructor(
    public email: string,
    public displayName: string,
    public resource: boolean,
    public optional: boolean,
    public responseStatus: string,
    public comment: string,
    public additionalGuests: number,
    public self: boolean,
    public attendeeId?: number
  ) {}
}
