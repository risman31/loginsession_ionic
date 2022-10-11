import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform } from '@ionic/angular';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Storage],
})
export class AppComponent {
  constructor(
    private storage: Storage,

    private navCtrl: NavController,
    private platform: Platform
    //private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
    });

    this.storage.get('isLoggedIn').then((val) => {
      if (val === null || val === undefined || val === '') {
        this.navCtrl.navigateRoot('/login');
      } else {
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }
}
