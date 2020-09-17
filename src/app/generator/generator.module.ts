import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GeneratorComponent } from './generator.component';
import { GeneratorResultComponent } from './generator-result/generator-result.component';
import { GeneratorTextareaComponent } from './generator-textarea/generator-textarea.component';

@NgModule({
  declarations: [
    GeneratorComponent,
    GeneratorResultComponent,
    GeneratorTextareaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    GeneratorComponent
  ]
})
export class GeneratorModule { }
