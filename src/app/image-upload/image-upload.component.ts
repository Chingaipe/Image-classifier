import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  imageTag: ElementRef;

  @ViewChild('imageTag', { static: false }) set content(content: ElementRef|null) {
    this.imageTag = content;
  }

  model: any;
  loading = true;
  imgSrc: string;
  predictions: any;

  constructor() { }

  async ngOnInit() {

    this.model = await mobilenet.load();
    this.loading = false;

  }

  async fileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;

        const imgEl = this.imageTag.nativeElement;

        setTimeout(async () => {
          this.predictions = await this.model.classify(imgEl);
        }, 0);
      };
    }
  }

}
