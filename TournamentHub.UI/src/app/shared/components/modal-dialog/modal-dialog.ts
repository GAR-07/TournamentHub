import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
	imports: [],
  templateUrl: './modal-dialog.html',
  styleUrls: ['./modal-dialog.scss']
})
export class ModalDialogComponent {
  @Input() header!: string;
	@Input() description!: string;
	@Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

	confirm() {
		this.isConfirmed.emit(true);
	}
	
	close() {
		this.isConfirmed.emit(false);
	}
}