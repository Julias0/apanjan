import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditMenuComponent } from './components/add-edit-menu/add-edit-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AddEditMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AddEditMenuComponent
  ]
})
export class SharedModule { }
