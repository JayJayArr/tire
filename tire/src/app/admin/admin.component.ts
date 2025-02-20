import { Component, OnInit } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbToastrService,
  NbToggleModule,
} from '@nebular/theme';
import { UsersService } from '../services/users.service';
import { ConnectorsService } from '../services/connectors.service';
import { Connector } from '../types';
import { ReaderService } from '../services/reader.service';

@Component({
    selector: 'app-admin',
    imports: [
        NbButtonModule,
        NbCardModule,
        NbIconModule,
        NbSpinnerModule,
        NbToggleModule,
        NbLayoutModule,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private toastrService: NbToastrService,
    private connectorService: ConnectorsService,
    private readerService: ReaderService,
  ) {
    this.ProWatchConnectoractive =
      this.connectors.find((element) => {
        element.name == 'ProWatch';
      })?.active == true;
  }

  loading = false;
  connectors: Connector[] = [];
  ProWatchConnectoractive: boolean = true;

  async syncUsers() {
    this.loading = true;
    await this.usersService
      .triggerSyncFromAC()
      .catch((err) => {
        console.log(err);
        this.loading = false;
      })
      .then((response) => {
        this.loading = false;
        this.toastrService.success(`Synced ${response} users`, 'Success');
      });
  }

  async syncReaders() {
    this.loading = true;
    await this.readerService
      .triggerSyncFromAC()
      .catch((err) => {
        console.log(err);
        this.loading = false;
      })
      .then((response) => {
        this.loading = false;
        this.toastrService.success(`Synced ${response} readers`, 'Success');
      });
  }

  async toggleConnector() {
    this.ProWatchConnectoractive = !this.ProWatchConnectoractive;
    this.connectorService.putConnectors({
      name: 'ProWatch',
      active: this.ProWatchConnectoractive,
    });
  }

  async refreshConnectors() {
    this.connectors = await this.connectorService
      .getConnectors()
      .then((data) => {
        if (data.length === 0) {
          this.toastrService.danger('Could not get connectors', 'Error');
          return [];
        } else {
          return data;
        }
      })
      .catch((error) => {
        this.toastrService.danger('Could not get connectors', 'Error');
        return [];
      });
    let PWConnector = this.connectors.find((element) => {
      return element?.name == 'ProWatch';
    });
    this.ProWatchConnectoractive = PWConnector?.active == true;
  }

  ngOnInit(): void {
    this.refreshConnectors();
  }
}
