import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private storage: Storage, private navCtrl: NavController) {
    this.storage.get('isLoggedIn').then((val) => {
      if (val.username === '') {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
}
