/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 复选框组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:29:21 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckBoxComponent),
        multi: true,
    }]
})

export class CheckBoxComponent implements ControlValueAccessor, OnInit {

    @Input() id: string = '';
    @Input() disabled: boolean = false;
    @Input() value: string | number | boolean = '';
    @Input() checkBoxGroup: Checkbox[];
    model: boolean | any[];
    onChange: (v: boolean | any[]) => void;
    onTouched: () => void;

    constructor() {}

    ngOnInit(): void {
        if (!this.checkBoxGroup) {
            return;
        }
        this.model = [];
        this.checkBoxGroup.forEach((ck: Checkbox) => {
            if (ck.checked) {
                (this.model as any).push(ck.value);
            }
        });
    }
    writeValue(obj: any): void {
        this.model = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    myOnChange(v: any) {
        if (!(this.model instanceof Array)) { // 非数组（认为是布尔类型）
            this.onChange(v);
            return;
        }
        const index = this.model.indexOf(v);
        if (index > -1) {
            this.model.splice(index, 1);
        } else {
            this.model.push(v);
        }
    }
}

/** 单个checkbox的配置 */
export interface Checkbox {
    /** value */
    value: any;
    /** 是否选中 */
    checked: any;
    /** disabled */
    disabled?: boolean;
    /** 描述 */
    text?: string;
}
