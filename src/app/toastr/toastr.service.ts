import {Injectable,EventEmitter} from '@angular/core';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class NotificationService {
    position = 'top-right';
    title: string;
    msg: string;
    showClose = true;
    timeout = 5000;
    theme = 'bootstrap';
    type = 'default';
    closeOther = true;
    isSpinner : any;
    constructor(private toastyService: ToastyService) {
        this.isSpinner = new EventEmitter();
    }

    addToast(options) {
        if (options.closeOther) {
            this.toastyService.clearAll();
        }
        this.position = options.position ? options.position : this.position;
        const toastOptions: ToastOptions = {
            title: options.title ? options.title : this.title,
            msg: options.msg ? options.msg : this.msg,
            showClose: options.showClose ? options.showClose : this.showClose,
            timeout: options.timeout ?  options.timeout : this.timeout,
            theme: options.theme ? options.theme : this.theme,
            onAdd: (toast: ToastData) => {
            },
            onRemove: (toast: ToastData) => {
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
    showToastr(message){
            this.addToast({title: 'Fail', msg: message, type: 'error'})

    }
}
