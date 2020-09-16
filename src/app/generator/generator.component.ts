import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

import { environment } from '../../environments/environment';
import { WykopService } from '../wykop.service';

export interface Post {
  id: number;
  type: string;
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  env = environment;
  formModel: FormGroup;
  urls: Array<string>;
  voters: Array<string>;
  loading: boolean = false;

  constructor(private wykopService: WykopService) { }

  /**
   * Creates form model
   */
  ngOnInit(): void {
    this.formModel = new FormGroup({
      accountType: new FormControl('orange', [Validators.required]),
      urls: new FormArray([
        new FormControl('', [Validators.required, Validators.pattern(this.env.postRegex)])
      ])
    });
  }

  /**
   * Handles form submit
   */
  onSubmit(): void {
    if (this.formModel.invalid) {
      return;
    }
    this.getVoters();
  }

  /**
   * Adds new field with url
   */
  onAddUrl(): void {
    if ((<FormArray>this.formModel.get('urls')).controls.length >= this.env.maxFields) {
      return;
    }
    (<FormArray>this.formModel.get('urls')).push(new FormControl('', [Validators.required]));
  }

  /**
   * Removes url field at choosen index
   * 
   * @param {number} index 
   */
  onRemoveUrl(index: number): void {
    if (index < 1) {
      return;
    }
    (<FormArray>this.formModel.get('urls')).removeAt(index);
  }

  /**
   * Get all voters' usernames
   */
  private getVoters(): void {
    this.loading = true;
    let observables: Observable<any>[] = [];

    // collect all observables in an array
    for (let postData of this.getPostsData()) {
      observables.push(this.wykopService.getVoters(`${postData.type}/${postData.id}/`));
    }

    // wait for all of observables to complete
    forkJoin(observables).subscribe(dataArray => {
      let tempArray = [];
      for (let array of dataArray) {
        tempArray = tempArray.concat(array);
      }

      // remove duplicates
      tempArray = Array.from(new Set(tempArray));
      // split into chunks
      this.voters = this.chunkArray(tempArray);
      this.loading = false;
    });
  }

  /**
   * Generate ID & type of entered Wykop's posts
   * 
   * @return {Array}
   */
  private getPostsData(): Post[] {
    let result: Array<Post> = [];
    let found: Array<any>;

    for (let url of this.getFormUrls()) {
      found = url.match(RegExp(this.env.postRegex));
      if (found) {
        if (found[2] !== undefined) {
          result.push({ id: found[2], type: 'commentUpvoters' });
        } else {
          result.push({ id: found[1], type: 'upvoters' });
        }
      }
    }

    return result;
  }

  /**
   * Get URLs form Form Model
   * 
   * @return {Array}
   */
  getFormUrls(): Array<string> {
    this.urls = [];
    for (let url of (<FormArray>this.formModel.get('urls')).controls) {
      this.urls.push(url.value);
    }
    return this.urls;
  }

  /**
   * Split array into chunks
   * 
   * @param {Array} array
   * @return {Array}
   */
  private chunkArray(array: Array<any>): Array<any> {
    let chunks = [];
    let i: number = 0;
    let perChunk: number = this.env.perChunk[this.formModel.get('accountType').value];

    while (i < array.length) {
      chunks.push(array.slice(i, i += perChunk));
    }

    return chunks;
  }
}
