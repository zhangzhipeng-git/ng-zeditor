/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 单选组组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:29:49 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroupComponent),
        multi: true,
    }]
})
export class RadioGroupComponent implements ControlValueAccessor {
    @Input() radioGroup: Radio[] = [];
    model: string | number | boolean;
    onChange: (value: string) => void;
    onTouched: () => void;

    idPrefix() {
        return 'z' + Math.random().toString().slice(2, 10);
    }

    constructor() { }

    writeValue(obj: any): void {
        this.model = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}

/** 单个radio的配置 */
export interface Radio {
    /** value */
    value: any;
    /** disabled */
    disabled?: boolean;
    /** 描述 */
    text?: string;
}
