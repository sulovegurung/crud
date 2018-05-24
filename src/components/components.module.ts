import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { IonicModule } from "ionic-angular";
import { AddItemComponent } from "./add-item/add-item.component";
@NgModule({
  declarations: [NavbarComponent, AddItemComponent],

  imports: [IonicModule],

  exports: [NavbarComponent, AddItemComponent]
})
export class ComponentsModule {}
