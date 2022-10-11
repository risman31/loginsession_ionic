import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public photo: string;
  public name: string;
  public npm: string;
  public prodi: string;
  public code: string;
  public mail: string;
  public telp: string;
  constructor(private storage: Storage) {
    this.getPhoto();
   
  }
  async getPhoto(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val) => {
      console.log(val);
      this.name = val.nama;
      this.npm = val.npm;
      this.prodi = val.prodi;
      this.photo = `http://192.168.26.176:/cobaloginsession/assets/${val.image}`;
      this.code = `http://192.168.26.176:/cobaloginsession/assets/${val.barcode}`;
      this.mail = val.email;
      this.telp = val.telp;
    });
  }
}
