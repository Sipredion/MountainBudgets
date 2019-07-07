import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

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

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  // @HostListener('focus')
  // focus() {
  //   this.onElementFocus();
  // }

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

  // @HostListener('focusout')
  // focusOut() {
  //   this.unFocusButton();
  // }

  @HostListener('keyup.enter')
  handleEnterClickReset() {
    this.onMouseClickReset();
  }

  ngOnInit() {
    this.setInitialStyle();
  }

  onElementFocus() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      `rgba(${this.roundButtonColor}, 0.2)`
    );
    this.renderer.setStyle(this.el.nativeElement, 'color', `rgb(${this.roundButtonFocusColor})`);
  }

  onMouseClick() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `inset 0 2px 4px rgba(${this.roundButtonColor}, 0.8), 0 0 1px rgba(${this.roundButtonColor}, 0.5)`
    );
  }

  onMouseClickReset() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `0 2px 4px rgba(${this.roundButtonFocusColor}, 0.8), 0 0 1px rgba(${this.roundButtonFocusColor}, 0.4)`
    );
  }

  unFocusButton() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      `rgba(${this.roundButtonColor}, 0)`
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'color',
      `rgb(${this.roundButtonColor})`
    );
  }

  setInitialStyle() {
    this.setButtonColor();
    this.setButtonSize();
    const el = this.el.nativeElement;
    // Set initial style
    this.renderer.addClass(el, 'round-button-initial');
    this.renderer.setStyle(el, 'padding', this.buttonPadding || '.45rem');
    this.renderer.setStyle(el, 'font-size', this.textSize || '13px');
    this.renderer.setStyle(el, 'color', `rgb(${this.roundButtonColor})`);
    this.renderer.setStyle(
      el,
      'box-shadow',
      `0 2px 4px rgba(${this.roundButtonColor}, 0.8), 0 0 1px rgba(${this.roundButtonColor}, 0.4)`
    );
  }

  setButtonColor() {
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

}
