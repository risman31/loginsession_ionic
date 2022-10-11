import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
      this.photo = `http://localhost/cobaloginsession/assets/${val.image}`;
      this.code = `http://localhost/cobaloginsession/assets/${val.barcode}`;
      this.mail = val.email;
      this.telp = val.telp;
    });
  }

}
