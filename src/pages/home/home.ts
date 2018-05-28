import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/Behaviorsubject";
import { switchMap } from "rxjs/operators";
import * as moment from "moment";
import { Lesson } from "../../models/lesson.interface";
import { AuthService } from "../../providers/auth.service";
// import { User } from "../../models/user.interface";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  // private user: User[];
  // lessonRef: AngularFirestoreCollection<Lesson>;
  lesson$: Observable<Lesson[]>;
  endDate$: BehaviorSubject<Date>;

  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public authService: AuthService
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

  ionViewCanEnter() {
    this.authService.getAuthenticateduser().subscribe(user=>{
      if(!user) {
        this.navCtrl.setRoot('LoginPage');
      }
    });
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

  onLogout() {
    this.authService.signOut();
    // this.navCtrl.setRoot('LoginPage');
  }

}
