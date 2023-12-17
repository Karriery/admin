import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListformComponent } from './listform/listform.component';
import { CheckbookingComponent } from './checkbooking/checkbooking.component';
import { ItemComponent } from './listform/item/item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListformComponent,
    CheckbookingComponent,
    ItemComponent,
    SidebarComponent,
    ArchiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
