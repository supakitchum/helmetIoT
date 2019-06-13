import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the Step1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step1',
  templateUrl: 'step1.html',
})
export class Step1Page {
  dataBlue:any;
  x:any;
  y:any;
  z:any;
  step:any;
  loop:any;
  btnProcess = document.getElementById('btnProcess') as HTMLParagraphElement;
  btnNext = document.getElementById('btnNext') as HTMLParagraphElement;
  constructor(public navCtrl: NavController, public navParams: NavParams,private bluetoothSerial: BluetoothSerial) {
    this.x = this.navParams.get('x');
    this.y = this.navParams.get('y');
    this.z = this.navParams.get('z');
    this.step = this.navParams.get('step');
    this.loop = setInterval(() => {
      let start = document.getElementById('start') as HTMLParagraphElement;
      let search = document.getElementById('search') as HTMLParagraphElement;
      this.bluetoothSerial.isConnected().then(() => {
        clearInterval(this.loop);
        console.log("bluetooth is connected.");
      }, () => {
        this.search();
      });
    }, 1000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step1Page');
    this.search();
  }

  nextStep(){
    this.bluetoothSerial.disconnect().then(() =>{
      this.navCtrl.push('Step1Page',{
        x:190,
        y:150,
        z:150,
        step:this.step + 1
      });
    });
  }

  search(){
    let x = document.getElementById('x') as HTMLParagraphElement;
    let y = document.getElementById('y') as HTMLParagraphElement;
    let z = document.getElementById('z') as HTMLParagraphElement;
    let cardX = document.getElementById('cardX') as HTMLParagraphElement;
    let cardY = document.getElementById('cardY') as HTMLParagraphElement;
    let cardZ = document.getElementById('cardZ') as HTMLParagraphElement;
    this.bluetoothSerial.connectInsecure("98:D3:51:FD:94:B4").subscribe((data) => {
      console.log(JSON.stringify(data));
      this.bluetoothSerial.subscribeRawData().subscribe((data) => {
        this.bluetoothSerial.readUntil("E").then((data) => {
          // console.log("read data : " +JSON.stringify(data));
          data = JSON.stringify(data);
          this.dataBlue = data.split(",", 5);
          console.log(data);
          if (this.dataBlue[1] && this.dataBlue[2] && this.dataBlue[3] && this.dataBlue[4]){
            x.innerHTML = this.dataBlue[1];
            y.innerHTML = this.dataBlue[2];
            z.innerHTML = this.dataBlue[3];
            if (this.x-2 <= this.dataBlue[1] &&  this.dataBlue[1] <= this.x+2) {
              cardX.className = "bg-green-btn";
            }
            else{
              cardX.className = "bg-btn";
            }
            if (this.y-2 <= this.dataBlue[2] && this.dataBlue[2] <= this.y + 2) {
              cardY.className = "bg-green-btn";
            }
            else {
              cardY.className = "bg-btn";
            }
            if (this.z-2 <= this.dataBlue[3] && this.dataBlue[3] <= this.z + 2) {
              cardZ.className = "bg-green-btn";
            }
            else{
              cardZ.className = "bg-btn";
            }
          }
        });
      });
    });
  }

}
