import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { WebcamClassifierComponent } from './webcam-classifier/webcam-classifier.component';


const routes: Routes = [
  { path: '', component: ImageUploadComponent },
  { path: 'webcam', component: WebcamClassifierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
