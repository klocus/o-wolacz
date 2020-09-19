import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generator-textarea',
  templateUrl: './generator-textarea.component.html',
  styleUrls: ['./generator-textarea.component.scss']
})
export class GeneratorTextareaComponent implements OnInit {
  @Input() content: string;
  isCopied: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.content) {
      let lines = this.content.trim().split('\n');
      
      this.content = '';
      for (let i = 0; i < lines.length; i++) {
        this.content += lines[i].replace(/ +(?= )/g, '').trim();

        if (i < (lines.length - 1)) {
          this.content += '\n';
        }
      }
    }
  }

  onClick(textarea: HTMLTextAreaElement): void {
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    this.isCopied = true;
  }

}
