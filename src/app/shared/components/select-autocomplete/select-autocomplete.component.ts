import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, of, startWith} from "rxjs";

@Component({
  selector: 'app-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss']
})
export class SelectAutocompleteComponent implements OnInit{
  @Input() options: string[] = [];
  @Input() set initialValue(initial: string) {
    this.value.setValue(initial);
  }
  @Output() optionSelected = new EventEmitter<string>;

  value = new FormControl('');
  filteredOptions: Observable<string[]> = of([]);

  ngOnInit(): void {
    this.filteredOptions = this.value.valueChanges.pipe(
      startWith(''),
      map(value => this.options.filter(option => !value || option.toLowerCase().includes(value)))
    );
  }

  onOptionSelected($event: string) {
    this.optionSelected.emit($event);
  }
}
