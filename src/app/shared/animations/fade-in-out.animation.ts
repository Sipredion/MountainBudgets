import {style, transition, animate, state, trigger} from '@angular/animations';

export const fadeInOut =
  trigger('fadeInOut', [
    state('loading', style({
      opacity: 1,
    })),
    state('loaded', style({
      opacity: 0
    })),
    transition('*=>loading', animate('2050ms')),
    transition('*=>loaded', animate('2050ms')),
  ]);

