import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit {

  @ViewChild('spinner') spinner: ElementRef;

  @Input() loading: boolean;

  @Input() size: string;
  @Input() color: string;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // const el = this.spinner && this.spinner.nativeElement;
    // console.log(el);
    // this.renderer.setStyle(el, 'width', this.size);
    // this.renderer.setStyle(el, 'height', this.size);
    // this.renderer.setStyle(el, 'border-color', this.color);
  }

}
