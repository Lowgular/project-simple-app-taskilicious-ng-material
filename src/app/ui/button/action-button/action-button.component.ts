import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input() type: ActionType = 'create';
  @Input() payload: any;
  @Input() buttonText = "";
  @Output() onClick = new EventEmitter<ActionType>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(event: ActionType) {
    this.onClick.emit(event);
  }

}

type ActionType = "create" | "edit" | "delete" | "plain";