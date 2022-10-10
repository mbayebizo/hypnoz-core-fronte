import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AppSetting, Settings} from "../../../../app.setting";
import {MenuService} from "../menu.service";
import {NavigationEnd, Router} from "@angular/router";
import {Menu} from "../menu";

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit {
  @Input("menuItems") menuItems;
  @Input("menuParentId") menuParentId;
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>();
  parentMenu: Array<Menu>;
  public settings: Settings;

  constructor(public appSetting: AppSetting, public menuService: MenuService,
              public router: Router) {
    this.settings = this.appSetting.settings;
  }

  ngOnInit(): void {
    this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          let mainContent = document.getElementById("main-content");
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        }
      } else {
        document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0
      }
    });
  }

  onClick(menuId) {
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);
    this.onClickMenuItem.emit(menuId);
  }
}
