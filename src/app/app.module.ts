import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CarouselImageComponent } from './components/image/carousel-image.component';
import { CategoryComponent } from './components/category/category.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { KnobModule } from 'primeng/knob';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BioComponent } from './components/bio/bio.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    CarouselImageComponent,
    CategoryComponent,
    TopBarComponent,
    BioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot(),
    KnobModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule
  ],
  providers: [
    AuthService,
    StorageService,
    DatabaseService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
