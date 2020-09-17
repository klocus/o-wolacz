import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator-result',
  templateUrl: './generator-result.component.html',
  styles: []
})
export class GeneratorResultComponent implements OnInit {
  @Input() voters: Array<string>;
  @Input() urls: Array<string>;
  @Input() spoiler: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
