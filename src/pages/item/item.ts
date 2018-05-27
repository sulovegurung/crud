import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../providers/item.service';
import { Item } from '../../models/item.interface';


@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
// export class ItemPage implements OnInit{
export class ItemPage {
  items: Item[];
  itemToEdit: Item;
  editState: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService) {
 
 
  }

   // this.lessonRef = this.afs.collection("Lesson");
    // this.lesson$ = this.lessonRef.valueChanges();

// ngOnInit() {
//     this.itemService.getItems().subscribe(items => {
//       this.items = items;
//     });
//   }
   ionViewWillLoad(){
    console.log('ionViewDidLoad ItemPage sulav again');
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
    console.log('ionViewDidLoad ItemPage sulav next');

  }

  deleteItem(event, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }


}
