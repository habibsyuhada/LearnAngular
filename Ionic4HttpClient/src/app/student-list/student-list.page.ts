import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  
  studentsData: any;

  constructor(
    public apiService: ApiService,
    public activedRoute: ActivatedRoute,
  ) {
    activedRoute.params.subscribe(val => {
      this.getAllStudents();
    });
    this.studentsData = [];
  }

  ngOnInit() {
    console.log('init');
    this.getAllStudents();
  }

  getAllStudents(){
    //Get saved list of student
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    })
  }

  delete(item){
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(response => {
      //Update list after delete is successfull
      this.getAllStudents();
    })
  }

}
