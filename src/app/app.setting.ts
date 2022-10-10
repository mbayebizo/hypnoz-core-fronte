import {Injectable} from "@angular/core";

export class Settings {
  constructor(public name: string,
              public loadingSpinner: boolean,
              public fixedHeader: boolean,
              public sidenavIsOpened: boolean,
              public sidenavIsPinned: boolean,
              public sidenavUserBlock: boolean,
              public menu: string,
              public menuType: string,
              public theme: string,
              public rtl: boolean,
              public hasFooter: boolean,
              public timeOut: number) { }
}


@Injectable()
export class AppSetting {
  public settings = new Settings(
    'Hypnoz Core',       //theme name
    true,           //loadingSpinner
    true,           //fixedHeader
    true,           //sidenavIsOpened
    true,           //sidenavIsPinned
    true,           //sidenavUserBlock
    'vertical',     //horizontal , vertical
    'default',      //default, compact, mini
    'red-light', //indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false,          // true = rtl, false = ltr
    true,            // true = has footer, false = no footer
    500000 // timeout
  )
}
