import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-webcam-classifier',
  templateUrl: './webcam-classifier.component.html',
  styleUrls: ['./webcam-classifier.component.css']
})
export class WebcamClassifierComponent implements OnInit, AfterViewInit {

  @ViewChild('video', {static: false}) video: ElementRef;
  predictions: any;
  model: any;
  loading = true;

  constructor() { }

  async ngOnInit() {
    console.log('Loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Successfully loaded...');
    this.loading = false;

    setTimeout(async () => {
      this.predictions = await this.model.classify(this.video.nativeElement);
      await tf.nextFrame();
    }, 5000);
  }

  async ngAfterViewInit() {
    const vidStream = this.video.nativeElement;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        vidStream.srcObject = stream;
      })
      .catch((error) => {
        alert('Oops! Something went wrong');
        console.error(error);
      });
    }
  }

}
