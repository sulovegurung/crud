import { Component } from '@angular/core';
import { ItemService } from '../../providers/item.service';
import { Item } from '../../models/item.interface';


@Component({
  selector: 'app-add-item',
  templateUrl: 'add-item.component.html'
})
export class AddItemComponent {

  // item = {} as Item;
  item: Item = {
    title: '',
    description: ''
  }

  constructor(private itemService: ItemService) {
    console.log('Hello AddItemComponent loaded');
  }
  onSubmit() {
    if(this.item.title != '' && this.item.description != '') {
      this.itemService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }

  
  }

}
