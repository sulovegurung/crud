import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ItemService } from '../../providers/item.service';
import { AuthService } from './../../providers/auth.service';
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

  constructor(private navCtrl: NavController,
     private itemService: ItemService,
     private authService: AuthService) {
 
 
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

  ionViewCanEnter() {
    this.authService.getAuthenticateduser().subscribe(user=>{
      if(!user) {
        this.navCtrl.setRoot('Loginpage');
      }
    });
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
