import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';

@NgModule({
  declarations: [TemplateDrivenComponent, ReactiveFormsComponent],
  imports: [CommonModule, FormsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ExampleFormsModule {}
