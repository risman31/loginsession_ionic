import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public npm: string = '';
  public name: string = '';
  public prodi: string = '';
  public email: string = '';
  public telp: string = '';
  public username: string = '';
  public password: string = '';
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }
  async click() {
    if (this.npm === '' || this.name === '' || this.prodi === '' || this.email === '' || 
    this.telp === '' || this.username === '' ||  this.password === '') {
      this.presentToast('Username cannot be empty!');
    } else if (this.password.length < 8) {
      this.presentToast('Password must contains at least 8 characters!');
    } else if (
      !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.password) ||
      /[ ]/.test(this.password)
    ) {
      this.presentToast('Use at least 1 special character and no space!');
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please Wait...',
      });
      loader.present();

      const header = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'Application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'Application/json',
      };

      const data = {
        npm: this.npm,
        name: this.name,
        prodi: this.prodi,
        email: this.email,
        telp: this.telp,
        username: this.username,
        pass: this.password,
      };
      try {
        fetch('http://localhost/loginsession_ci//register.php', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res === 'success') {
              loader.dismiss();
              this.navCtrl.navigateRoot('/login');
            } else {
              loader.dismiss();
              this.presentToast(res);
            }
          })
          .catch((error) => console.log(error));
      } catch (err) {
        loader.dismiss();
        this.presentToast('Something went wrong!');
      }
    }
  }

  login() {
    this.navCtrl.navigateBack('/login');
  }
}
