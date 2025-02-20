import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbToastrService,
  NbToggleModule,
} from '@nebular/theme';
import { Reader } from '../types';
import { ReaderService } from '../services/reader.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-reader',
    imports: [
        NbCardModule,
        NbInputModule,
        NbIconModule,
        FormsModule,
        MatTableModule,
        NbButtonModule,
        NbToggleModule,
        NbSpinnerModule,
        NbLayoutModule,
    ],
    templateUrl: './reader.component.html',
    styleUrl: './reader.component.css'
})
export class ReaderComponent {
  constructor(
    private readerService: ReaderService,
    private toastrService: NbToastrService,
  ) { }
  loading: boolean = false;

  dataSource: MatTableDataSource<Reader> = new MatTableDataSource();

  filterstring = '';
  displayedColumns: string[] = ['name', 'active'];
  async refresh() {
    this.loading = true;
    this.dataSource.data = await this.readerService
      .getReaders()
      .then((data) => {
        if (data.length === 0) {
          this.toastrService.danger('No readers found', 'Error');
          return [];
        } else {
          return data;
        }
      })

      .catch((error) => {
        this.toastrService.danger('No readers found', 'Error');
        return [];
      });
    this.loading = false;
  }
  async ngOnInit() {
    await this.refresh();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  resetFilter() {
    this.filterstring = '';
    this.dataSource.filter = '';
  }

  saveReader(reader: Reader, status: boolean) {
    reader.active = status;
    this.readerService.postReader(reader);
  }
}
