import { ControlValueAccessor } from '@angular/forms';
export declare class RadioGroupComponent implements ControlValueAccessor {
    radioGroup: Radio[];
    model: string | number | boolean;
    onChange: (value: string) => void;
    onTouched: () => void;
    idPrefix(): string;
    constructor();
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
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
