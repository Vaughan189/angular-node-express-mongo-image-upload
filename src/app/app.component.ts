import { Component, OnInit, ElementRef, Input  } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ApiService } from './api.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Ng2ImgMaxService } from 'ng2-img-max';

const URL = 'http://localhost:3000/upload';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    originalFile: any;
    thumbnail1: any;
    thumbnail2: any;
    thumbnail3: any;
    modified_image: any;
    image: Response;
    file: any;
    image_thumbnails = [
                          {width:'250',  height:'150'},
                          {width:'500', height:'300'},
                          {width:'1000', height:'600'}
                       ];
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    title = 'app';

  constructor(private http: Http, private el: ElementRef, private service: ApiService, 
              private ng2ImgToolsService: Ng2ImgToolsService, private ng2ImgMaxService: Ng2ImgMaxService) {}
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
                file.withCredentials = false;
                this.thumbnail1 = file;
                this.thumbnail2 = file;
                this.thumbnail3 = file;
                // console.log(this.thumbnail1);
                // console.log(this.thumbnail2);
                // console.log(this.thumbnail3);
            //     this.ng2ImgToolsService.compress([file._file], 1).subscribe(result => {
            //         console.log(result);
            //         console.log('compress');                   
            //         file._file = result;
            //    }, error => {
            //     });
                this.ng2ImgMaxService.resize([this.thumbnail1._file], 1000, 600).subscribe((result)=>{
                    console.log(result);
                    this.thumbnail1._file = result;
                    this.uploader.uploadItem(this.thumbnail1);
                    this.upload2thumbnail();
                });                
            };

            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                    console.log('ImageUpload:uploaded:', item, status, response);
                    //  console.log(response);
                    // tslint:disable-next-line:prefer-const
                    let res = JSON.parse(response);
                    //  console.log(res);
                    //  this.insert_todos(res);
                };
        }

        upload() {
                const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
                console.log('iam+ ' + inputEl);
                const fileCount: number = inputEl.files.length;
                const formData = new FormData();
                if (fileCount > 0) { // a file was selected
                    for (let i = 0; i < fileCount; i++) {
                        formData.append('photo', inputEl.files.item(i));
                    }
                    this.http
                        .post(URL, formData).map((res: any) => res).subscribe(
                            (success) => {
                            alert(success._body);
                        },
                            (error) => alert(error)
                        );

                }
            }


        upload2thumbnail() {
            console.log(this.thumbnail2);
            this.ng2ImgMaxService.resize([this.thumbnail2._file], 500, 300).subscribe((result)=>{
                console.log(result);
                this.thumbnail2._file = result;
                this.uploader.uploadItem(this.thumbnail2);
                this.upload3thumbnail();
            });
        }


        upload3thumbnail() {
            this.ng2ImgMaxService.resize([this.thumbnail3._file], 250, 150).subscribe((result)=>{
                console.log(result);
                this.thumbnail3._file = result;
                this.uploader.uploadItem(this.thumbnail3);
            });
        }

        insert_todos(res) {
            // tslint:disable-next-line:one-line
            this.service.insert(res.file_name, res.destination).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
                  res => {
                    this.image = res;
                    console.log(this.image);
              });
          }
}
