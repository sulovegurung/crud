import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/Behaviorsubject";
import { switchMap } from "rxjs/operators";
import * as moment from "moment";
import { Lesson } from "../../models/lesson.interface";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // lessonRef: AngularFirestoreCollection<Lesson>;
  lesson$: Observable<Lesson[]>;
  endDate$: BehaviorSubject<Date>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore
  ) {
    // this.lessonRef = this.afs.collection("Lesson");
    // this.lesson$ = this.lessonRef.valueChanges();
    this.endDate$ = new BehaviorSubject(new Date("12-24-2017"));
    this.lesson$ = this.endDate$.pipe(
      switchMap(date =>
        this.afs
          .collection<Lesson>("Lesson", ref => ref.where("endDate", "==", date))
          .valueChanges()
      )
    );
  }

  nextLesson() {
    this.endDate$.next(
      moment(this.endDate$.getValue())
        .add(7, "days")
        .toDate()
    );
  }

  previousLesson() {
    this.endDate$.next(
      moment(this.endDate$.getValue())
        .add(-7, "days")
        .toDate()
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
}
