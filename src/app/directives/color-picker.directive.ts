
import {Directive, ElementRef, AfterViewInit, Input, EventEmitter, Output, ViewChild, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

declare var $: any;
declare var ColorPicker: any;

@Directive({
    selector: '[appColorPicker]'
})

export class ColorPickerDirective implements AfterViewInit {
    constructor(private elRef: ElementRef, @Inject(DOCUMENT) private _document) {
    }
    @Output() onGetColor = new EventEmitter();
    async ngAfterViewInit() {
        $(this.elRef.nativeElement).ColorPicker({
            onChange: (hsb, hex, rgb) => {
                $('#' + this.elRef.nativeElement.id).css('backgroundColor', '#' + hex);
                $('#' + this.elRef.nativeElement.id).val(hex);
                $('#' + this.elRef.nativeElement.id).attr('ng-reflect-model', hex);
                this.onGetColor.emit('#' + hex);
            }
        })
            .bind('keyup', function(){
                $(this).ColorPickerSetColor(this.value);
            });
    }
}
