import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { UregisterComponent } from './app/uregister/uregister.component';

@NgModule({
  declarations: [
    UregisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Import FormsModule here
  ],
  exports: [
    UregisterComponent
  ]
})
export class UregisterModule { }
