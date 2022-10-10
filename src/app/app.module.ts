import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {CalendarModule, DateAdapter} from "angular-calendar";
import * as tslib_1 from 'tslib';
import * as date_fns_2 from 'date-fns';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "./shared/shared.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppSetting} from "./app.setting";
import {Overlay, OverlayContainer} from "@angular/cdk/overlay";
import {CustomOverlayContainer} from "./theme/utils/CustomOverlayContainer";
import { PagesComponent } from './pages/pages.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';

function adapterFactory() {
  return tslib_1.__assign(tslib_1.__assign({}), date_fns_2);
}
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    VerticalMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    HttpClientModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
AppSetting,
    {provide:PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    {provide: OverlayContainer, useValue:CustomOverlayContainer},
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
