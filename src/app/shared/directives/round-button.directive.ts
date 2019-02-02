import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[app-round-button]'
})
export class RoundButtonDirective implements OnInit {

  @Input() color: string;
  @Input() size: string;

  roundButtonColor: string;
  roundButtonFocusColor: string;

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
    this.setButtonSize();
    // Set initial style
    this.el.nativeElement.style.border = 0;
    this.el.nativeElement.style.borderRadius = '50%';
    this.el.nativeElement.style.backgroundColor = 'transparent';
    this.el.nativeElement.style.padding = this.buttonPadding || '.45rem';
    this.el.nativeElement.style.fontSize = this.textSize || '13px';
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.justifyContent = 'center';
    this.el.nativeElement.style.alignItems = 'center';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.outline = `none`;
    this.el.nativeElement.style.color = `rgb(${this.roundButtonColor})`;
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.roundButtonColor}, 0.5), 0 0 1px rgba(${this.roundButtonColor}, 0.13)`;
  }

  setButtonColor() {
    console.log(this.color);
    switch (this.color) {
      case 'primary':
        this.roundButtonColor = '46, 134, 171';
        this.roundButtonFocusColor = '30, 87, 112';
        break;
      case 'accent':
        this.roundButtonColor = '114, 157, 57';
        this.roundButtonFocusColor = '73, 102, 36';
        break;
      case 'warn':
        this.roundButtonColor = '191, 0, 18';
        this.roundButtonFocusColor = '114, 0, 10';
        break;
      default:
        this.roundButtonColor = '61, 61, 61';
        this.roundButtonFocusColor = '0, 0, 0';
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
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.roundButtonFocusColor}, 0.8), 0 0 1px rgba(${this.roundButtonFocusColor}, 0.53)`;
    this.el.nativeElement.style.color = `rgb(${this.roundButtonFocusColor})`;
  }

  onMouseClick() {
    this.el.nativeElement.style.boxShadow = `0 2px 12px rgba(${this.roundButtonColor}, 0.8), 0 0 1px rgba(${this.roundButtonColor}, 0.5)`;
  }

  onMouseClickReset() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.roundButtonFocusColor}, 0.8), 0 0 1px rgba(${this.roundButtonFocusColor}, 0.53)`;
  }

  onMouseHover() {
    this.el.nativeElement.style.backgroundColor = `rgba(${this.roundButtonColor}, 0.2)`;
  }

  onMouseHoverReset() {
    this.el.nativeElement.style.backgroundColor = `rgba(${this.roundButtonColor}, 0)`;
  }

  unFocusButton() {
    this.el.nativeElement.style.boxShadow = `0 2px 4px rgba(${this.roundButtonColor}, 0.5), 0 0 1px rgba(${this.roundButtonColor}, 0.13)`;
    this.el.nativeElement.style.color = `rgb(${this.roundButtonColor})`;
  }

  resetStyle() {
    this.el.nativeElement.style.boxShadow = `0 2px 12px rgba(${this.roundButtonColor}, 0.8), 0 0 1px rgba(${this.roundButtonColor}, 0.5)`;
  }

}
