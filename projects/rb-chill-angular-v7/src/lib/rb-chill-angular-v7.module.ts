import { NgModule } from '@angular/core';
import { RbChillAngularV7Component } from './rb-chill-angular-v7.component';
import { SliderComponent } from './slider/slider.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RbChillAngularV7Component,
    SliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RbChillAngularV7Component,
    SliderComponent]
})
export class RbChillAngularV7Module { }
