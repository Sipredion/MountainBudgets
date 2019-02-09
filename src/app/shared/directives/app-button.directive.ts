import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

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

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('focus')
  focus() {
    this.onElementFocus();
  }

  @HostListener('touchstart')
  tap() {
    this.onMouseClick();
  }

  @HostListener('mousedown')
  click() {
    this.onMouseClick();
  }

  @HostListener('mouseup')
  clickReset() {
    this.onMouseClickReset();
  }

  @HostListener('keydown.enter')
  Enter() {
    this.onMouseClick();
  }

  @HostListener('focusout')
  focusOut() {
    this.unFocusButton();
  }

  @HostListener('keyup.enter')
  handleEnterClickReset() {
    this.onMouseClickReset();
  }

  ngOnInit() {
    this.setInitialStyle();
  }

  onElementFocus() {
    this.el.nativeElement.style.backgroundColor = `rgba(${this.buttonFocusColor}, 0.2)`;
    this.el.nativeElement.style.color = `rgb(${this.buttonFocusColor})`;
  }

  onMouseClick() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `inset 0 2px 4px rgba(${this.buttonColor}, 0.8), 0 0 1px rgba(${this.buttonColor}, 0.5)`
    );
  }

  onMouseClickReset() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `0 2px 4px rgba(${this.buttonColor}, 0.5), 0 0 1px rgba(${this.buttonColor}, 0.13)`
    );
  }

  unFocusButton() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', `rgba(${this.buttonColor}, 0)`);
    this.renderer.setStyle(this.el.nativeElement, 'color', `rgb(${this.buttonColor})`);
  }

  setInitialStyle() {
    this.setButtonColor();
    this.setButtonSize();
    // Set initial style
    const el = this.el.nativeElement;
    this.renderer.addClass(el, 'app-button-initial');
    this.renderer.setStyle(el, 'padding', this.buttonPadding);
    this.renderer.setStyle(el, 'font-size', this.textSize || '13px');
    this.renderer.setStyle(el, 'color', `rgb(${this.buttonColor})`);
    this.renderer.setStyle(
      el,
      'box-shadow',
      `0 2px 4px rgba(${this.buttonColor}, 0.5), 0 0 1px rgba(${this.buttonColor}, 0.13)`
    );
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

}
