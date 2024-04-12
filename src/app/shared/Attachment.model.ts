export class Attachment {
  constructor(
    public fileUrl: string,
    public title: string,
    public mimeType: string,
    public iconLink: string,
    public fileId: string,
    public id?: number
  ) {}
}
