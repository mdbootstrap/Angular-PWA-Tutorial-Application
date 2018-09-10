import { SwUpdate } from '@angular/service-worker';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('basicModal') basicModal: ModalDirective;

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit() {
    this.checkForUpdates();
  }

  forceUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }

  checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        console.log('New Version');
        this.basicModal.show();
      });
    }
  }
}
