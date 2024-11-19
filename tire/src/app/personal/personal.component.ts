import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { FSEntry, TimeEntry, TreeNode } from '../types';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [NbTreeGridModule, NbCardModule, NgFor, NgIf],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent {
  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: TreeNode<TimeEntry>[] = [];
}
