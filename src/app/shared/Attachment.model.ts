export class Attachment {
  constructor(
    public fileUrl: string,
    public title: string,
    public mimetype: string,
    public iconLink: string,
    public fileId: string,
    public id?: number
  ) {}
}
