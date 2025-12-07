import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class SearchComponent {
  @Input() requestText!: string;
	@Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  searchControl: FormControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000) // задержка для производительности
    ).subscribe(value => {
      this.searchChanged.emit(value);
    });
  }
}
