import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataBlue: any;
  loop: any;
  btnStart: boolean = false;

  constructor(public navCtrl: NavController,
              private bluetoothSerial: BluetoothSerial,
              private toastCtrl: ToastController) {
    this.loop = setInterval(() => {
      let start = document.getElementById('start') as HTMLParagraphElement;
      let search = document.getElementById('search') as HTMLParagraphElement;
      this.bluetoothSerial.isConnected().then(() => {
        clearInterval(this.loop);
        console.log("bluetooth is connected.");
        start.className = "";
        search.className = "hide";
      }, () => {
        this.bluetoothSerial.connectInsecure("98:D3:51:FD:94:B4").subscribe((data) => {

        });
        console.log("bluetooth is not connectedd.");
        start.className = "hide";
        search.className = "";
      });
    }, 1000)
  }

  ionViewDidLoad() {
    this.bluetoothSerial.isConnected().then(() => {
      console.log("bluetooth is connected.");
      this.btnStart = true;
    }, () => {
      console.log("bluetooth is not connectedd.");
      this.btnStart = false;
    });
  }

  enviarMensajes() {
    this.bluetoothSerial.list().then((data: any) => {
      console.log(data);
    });
    this.bluetoothSerial.isConnected().then(() => {
      console.log("bluetooth is connected.");
    }, () => {
      console.log("bluetooth is not connectedd.");
    });
  }

  start() {
    this.bluetoothSerial.disconnect().then();
    this.navCtrl.push('Step1Page', {
      x: 56,
      y: 100,
      z: 174,
      step: 1
    });
  }

  setting() {
    this.bluetoothSerial.showBluetoothSettings();
  }

}
