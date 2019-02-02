import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[app-button]'
})
export class AppButtonDirective implements OnInit {

  @Input() color: string;
  buttonColor: string;
  butonFocusColor: string;

  @HostListener('focus')
  focus() {
    this.onElementFocus();
  }

  @HostListener('mousedown')
  click() {
    this.onMouseClick();
  }

  @HostListener('touch')
  touch() {
    this.el.nativeElement.style.color = 'green';
  }

  @HostListener('mouseup')
  clickReset() {
    this.onMouseClickReset();
  }

  @HostListener('mouseover')
  hover() {
    this.onMouseHover();
  }

  @HostListener('keydown.enter')
  Enter() {
    this.onMouseClick();
  }

  @HostListener('focusout')
  focusOut() {
    this.unFocusButton();
  }

  @HostListener('mouseleave')
  handleMouseUp() {
    this.onMouseHoverReset();
  }

  @HostListener('keyup.enter')
  handleEnterClickReset() {
    this.onMouseClickReset();
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.setInitialStyle();
  }

  setInitialStyle() {
    this.setButtonColor();
    // Set initial style
    this.el.nativeElement.style.border = 0;
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.backgroundColor = 'transparent';
    this.el.nativeElement.style.padding = '.5rem';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.outline = `none`;
    this.el.nativeElement.style.color = `rgb(${this.buttonColor})`;
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.buttonColor}, 0.5), 0 0 1px rgba(${this.buttonColor}, 0.13)`;
  }

  setButtonColor() {
    switch (this.color) {
      case 'primary':
        this.buttonColor = '46, 134, 171';
        this.butonFocusColor = '30, 87, 112';
        break;
      case 'accent':
        this.buttonColor = '114, 157, 57';
        this.butonFocusColor = '73, 102, 36';
        break;
      case 'warn':
        this.buttonColor = '191, 0, 18';
        this.butonFocusColor = '114, 0, 10';
        break;
      default:
        this.buttonColor = '61, 61, 61';
        this.butonFocusColor = '0, 0, 0';
        break;
    }
  }

  onElementFocus() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.butonFocusColor}, 0.8), 0 0 1px rgba(${this.butonFocusColor}, 0.53)`;
    this.el.nativeElement.style.color = `rgb(${this.butonFocusColor})`;
  }

  onMouseClick() {
    this.el.nativeElement.style.boxShadow = `0 2px 12px rgba(${this.buttonColor}, 0.8), 0 0 1px rgba(${this.buttonColor}, 0.5)`;
  }

  onMouseClickReset() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.butonFocusColor}, 0.8), 0 0 1px rgba(${this.butonFocusColor}, 0.53)`;
  }

  onMouseHover() {
    this.el.nativeElement.style.backgroundColor = `rgba(${this.buttonColor}, 0.2)`;
  }

  onMouseHoverReset() {
    this.el.nativeElement.style.backgroundColor = `rgba(${this.buttonColor}, 0)`;
  }

  unFocusButton() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.buttonColor}, 0.5), 0 0 1px rgba(${this.buttonColor}, 0.13)`;
    this.el.nativeElement.style.color = `rgb(${this.buttonColor})`;
  }

  resetStyle() {
    this.el.nativeElement.style.boxShadow = `0 2px 12px rgba(${this.buttonColor}, 0.8), 0 0 1px rgba(${this.buttonColor}, 0.5)`;
  }

}
