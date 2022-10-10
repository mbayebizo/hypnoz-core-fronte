import {Component} from '@angular/core';
import {AppSetting, Settings} from "./app.setting";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from "@ng-idle/keepalive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  idleState = 'Not Started';
  timedOut = false;
  private lastPing: Date | undefined;


  constructor(private router: Router, public appSettings: AppSetting,
              protected idle: Idle,private keepalive: Keepalive, protected translate: TranslateService) {

    this.setTimeOut();
    this.settings = this.appSettings.settings;
    translate.addLangs(['fr', 'en']);
  }


  private setTimeOut() {
    this.idle.setIdle(5);
    this.idle.setTimeout(this.appSettings.settings.timeOut);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
     // this.loginService.logout();
      // this.router.navigate([projectOption.loginLink]);
    });
    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();

  }

  private reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit() {

  }
}
