import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message-service/message.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MessageService
  ]
})
export class SharedModule { }
