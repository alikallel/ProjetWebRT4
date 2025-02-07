import { Component, Output, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {

  scannerEnabled: boolean = false;
  hasCameras: boolean = false;
  hasPermission: boolean = false;
  showScanner: boolean = false;
  error = false;
  
  @Input()  userName: String = '';
  @Output() toggleQRCheckIn = new EventEmitter<number>();


  constructor(private http: HttpClient) {}

  handleScanSuccess(resultString: string) {
    const qrResult = JSON.parse(resultString);
    this.toggleQRCheckIn.emit(qrResult.registrationId);
    this.scannerEnabled = false; 
  }

  // Called when the scanner finds cameras.
  handleCamerasFound(cameras: MediaDeviceInfo[]) {
    this.hasCameras = cameras && cameras.length > 0;
    if (!this.hasCameras) {
      console.error('No cameras found');
    }
  }

  // Called when an error occurs during scanning.
  handleScanError(error: any) {
    console.error('Error during scan:', error);
  }

  // Called when a scan cycle is complete.
  handleScanComplete() {
    console.log('Scan complete');
  }

  // Called when the user responds to the camera permission request.
  handlePermissionResponse(permission: boolean) {
    this.hasPermission = permission;
    if (!permission) {
      console.error('Camera access denied');
    }
    // Render the scanner only if permission is granted.
    this.showScanner = permission;
  }

  // Starts a new scan by resetting the result and enabling the scanner.
  startNewScan() {
    this.scannerEnabled = true;
    this.userName="";
    console.log("Starting a new scan");
  }

  // Starts the scanner by enabling it and showing the scanner container.
  startScanner() {
    this.scannerEnabled = true;
    console.log("Starting the scanner");
    this.showScanner = true;
  }

}