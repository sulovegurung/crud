// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item.interface';


@Injectable()
export class ItemService {


  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    console.log('Hello ItemService Provider');
    // sort by title in ascending ordeer
    this.itemsCollection = this.afs.collection<Item>('items', ref => ref.orderBy('title','asc'));
    // this.items = this.itemsCollection.valueChanges(); // gets data only

    // for both id and data used snapshot Changes
  /*   this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a=> {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    console.log('hey... I am hit.'); */
  }


  getItems() {
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a=> {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    console.log('hey... I am again hit.');
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem (item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }

}
