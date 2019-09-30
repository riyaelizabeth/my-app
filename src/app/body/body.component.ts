import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  gotdetail;
  loader: boolean;
  objectdata;
  stringdata = '';
  inputdata;
  nodata: boolean;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.loader = false;
    this.nodata = false;
  }
  getdetails(inputdata) {

    // return this.productsArray;
    // console.log(inputdata);
    this.loader = true;
    if (localStorage.getItem(inputdata) != null) {
      this.objectdata = JSON.parse(localStorage.getItem(inputdata));
      console.log('from local storage');
      this.loader = false;
      this.nodata = false;
    } else {

      // tslint:disable-next-line: max-line-length
      this.httpClient.get(`https://api.github.com/users/` + inputdata).subscribe(res => {
        this.loader = false;
        this.nodata = false;
        // console.log('hjjk');
        this.objectdata = res;
        // console.log('hjjk');
        console.log(this.objectdata);
        this.stringdata = JSON.stringify(this.objectdata);
        localStorage.setItem(inputdata, this.stringdata);
        // this.gotdetail = res;
        console.log('from url');
      },
        () => {
          this.objectdata = null;
          this.nodata = true;
          this.toastr.error('Username not found', 'invalid user', {
            timeOut: 3000


          });
          // else {
          this.loader = false;
        

        });
    }
  }
}

