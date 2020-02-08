import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit(){
    this.getProducts();
  }
  products: Product[] = [];
  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {
    
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getProducts()
    .subscribe(res => {
      this.products = res;
      console.log(this.products);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }
  
}
