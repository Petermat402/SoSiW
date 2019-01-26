export class User {
  constructor(public id: number,
              public name: string,
              public surname: string,
              public pesel: string,
              public email: string,
              public group: string,
              public departament: string,
              public role: string,
              public language: string,
              public reminder: boolean) {}
}
