import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ApiService {
  // tslint:disable-next-line:no-inferrable-types
  baseUrl: string = 'http://localhost:3000/images';

  constructor(public http: Http) { }

  insert(file_name: any, destination: any) {
    // return this.http.post(this.baseUrl + '?title=' + title + '&content=' + content )
    //   .map((res: Response) => res.json());
    const Insert_Params = new URLSearchParams();
    Insert_Params.append('image_name', file_name);
    Insert_Params.append('path', destination);
    console.log(Insert_Params);
    return this.http.post(this.baseUrl, Insert_Params).map((res: Response) => res);
  }


}
