export class EmailMessage {
  constructor(public addresses: string,
              public subject: string,
              public text: string,
              public password: string ) {
  }
}
