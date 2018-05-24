import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../providers/item.service';
import { Item } from '../../models/item.interface';


@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage implements OnInit{

  items: Item[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService) {
 
 
  }

   // this.lessonRef = this.afs.collection("Lesson");
    // this.lesson$ = this.lessonRef.valueChanges();

ngOnInit() {
    console.log('ionViewDidLoad ItemPage');
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  // ionViewDidEnter(){
  //   console.log('ionViewDidLoad ItemPage');
  //   this.itemService.getItems().subscribe(items => {
  //     this.items = items;
  //   });
  // }

}
