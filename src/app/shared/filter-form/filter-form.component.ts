import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FilterFormComponent {
  @Output() dateRangeSelected = new EventEmitter<{ startDate: string; endDate: string }>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  applyFilter(): void {
    const { startDate, endDate } = this.filterForm.value;
    this.dateRangeSelected.emit({ startDate, endDate }); // Post data to parent
  }
}
