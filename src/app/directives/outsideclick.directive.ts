import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({selector: '[appClickOutside]'})
export class OutSideClickDirective {
    @Output()
    public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!targetElement.querySelector('.visitor-count-wrap')) {
            if (!clickedInside) {
                this.clickOutside.emit(null);
            }
        } else {
            this.clickOutside.emit(true);
        }
    }
}

