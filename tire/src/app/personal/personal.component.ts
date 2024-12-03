import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { TimeEntry } from '../types';
import { TimesService } from '../services/times.service';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [NbTreeGridModule, NbCardModule, NgFor, NgIf],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
  constructor(private timesService: TimesService) { }

  allColumns = ['name', 'indevice', 'outdevice', 'intime', 'outtime', 'diff'];

  data: { data: TimeEntry }[] = [];

  async ngOnInit() {
    this.data = await this.timesService.gettimes();
    console.log(this.data);
  }
}
