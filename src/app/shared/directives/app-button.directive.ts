import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[app-button]'
})
export class AppButtonDirective implements OnInit {

  @Input() color: string;
  @Input() size: string;

  buttonColor: string;
  buttonFocusColor: string;

  buttonPadding: string;
  textSize: string;

  @HostListener('focus')
  focus() {
    this.onElementFocus();
  }

  @HostListener('mousedown')
  click() {
    this.onMouseClick();
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
    this.setButtonSize();
    // Set initial style
    // TODO: Add renderer for security purposes.
    this.el.nativeElement.style.border = 0;
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.backgroundColor = 'transparent';
    this.el.nativeElement.style.padding = this.buttonPadding;
    this.el.nativeElement.style.fontSize = this.textSize;
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.outline = `none`;
    this.el.nativeElement.style.color = `rgb(${this.buttonColor})`;
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.buttonColor}, 0.5), 0 0 1px rgba(${this.buttonColor}, 0.13)`;
  }

  setButtonColor() {
    switch (this.color) {
      case 'primary':
        this.buttonColor = '46, 134, 171';
        this.buttonFocusColor = '30, 87, 112';
        break;
      case 'accent':
        this.buttonColor = '114, 157, 57';
        this.buttonFocusColor = '73, 102, 36';
        break;
      case 'warn':
        this.buttonColor = '191, 0, 18';
        this.buttonFocusColor = '114, 0, 10';
        break;
      default:
        this.buttonColor = '61, 61, 61';
        this.buttonFocusColor = '0, 0, 0';
        break;
    }
  }

  setButtonSize() {
    switch (this.size) {
      case 'xlg':
        this.buttonPadding = '.8rem';
        this.textSize = '16px';
        break;
      case 'lg':
        this.buttonPadding = '.45rem';
        this.textSize = '13px';
        break;
      case 'md':
        this.buttonPadding = '.3rem';
        this.textSize = '11px';
        break;
      case 'sm':
        this.buttonPadding = '.2rem';
        this.textSize = '10px';
        break;
      default:
        this.buttonPadding = '.45rem';
        this.textSize = '13px';
        break;
    }
  }

  onElementFocus() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.buttonFocusColor}, 0.8), 0 0 1px rgba(${this.buttonFocusColor}, 0.53)`;
    this.el.nativeElement.style.color = `rgb(${this.buttonFocusColor})`;
  }

  onMouseClick() {
    this.el.nativeElement.style.boxShadow = `0 2px 12px rgba(${this.buttonColor}, 0.8), 0 0 1px rgba(${this.buttonColor}, 0.5)`;
  }

  onMouseClickReset() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.buttonFocusColor}, 0.8), 0 0 1px rgba(${this.buttonFocusColor}, 0.53)`;
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
