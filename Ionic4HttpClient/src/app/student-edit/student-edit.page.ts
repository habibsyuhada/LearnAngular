import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {

  id: number;
  data: Student;

  constructor(
    public activedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data = new Student();
  }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.params["id"];
    //get item detail using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  update(){
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(Response => {
      this.router.navigate(['list']);
    })
  }

}
