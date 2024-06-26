import { Attachment } from './Attachment.model';
import { Attendee } from './Attendee.model';
import { Creator } from './Creator.model';
import { Organizer } from './Organizer.model';

export class Event {
  constructor(
    public summary: string,
    public description: string,
    public startDatetime: string,
    public endDatetime: string,
    public location: string,
    public status: string,
    public visibility: string,
    public organizer: Organizer,
    public creator: Creator,
    public attendees: Attendee[],
    public attachments: Attachment[],
    public eventId?: number,
    public creationTime?: string,
    public updatedTime?: string
  ) {}
}
