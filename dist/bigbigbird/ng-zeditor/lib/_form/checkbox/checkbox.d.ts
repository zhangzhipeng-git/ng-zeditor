import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class CheckBoxComponent implements ControlValueAccessor, OnInit {
    id: string;
    disabled: boolean;
    value: string | number | boolean;
    checkBoxGroup: Checkbox[];
    model: boolean | any[];
    onChange: (v: boolean | any[]) => void;
    onTouched: () => void;
    constructor();
    ngOnInit(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    myOnChange(v: any): void;
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
