import { NgModule } from '@angular/core';
import { RbChillAngular7Component } from './rb-chill-angular7.component';
import { SliderComponent } from './slider/slider.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RbChillAngular7Component,
    SliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RbChillAngular7Component,
    SliderComponent]
})
export class RbChillAngular7Module { }
