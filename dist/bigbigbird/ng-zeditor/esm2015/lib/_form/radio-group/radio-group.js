/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class RadioGroupComponent {
    constructor() {
        this.radioGroup = [];
    }
    /**
     * @return {?}
     */
    idPrefix() {
        return 'z' + Math.random().toString().slice(2, 10);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.model = obj;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
RadioGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-radio-group',
                template: "\r\n<span>\r\n  <label [for]=\"v.value+i\" class=\"z-editor-radios\" *ngFor=\"let v of radioGroup, index as i\">\r\n    <input type=\"radio\" class=\"input-radio\" [id]=\"v.value+i\" [value]=\"v.value\" [disabled]=\"v.disabled\" [(ngModel)]=\"model\" (ngModelChange)=\"onChange(v.value)\" />\r\n    <i [ngClass]=\"[\r\n          'z-editor-icomoon',\r\n          v.disabled ? 'wd-radio-disabled' : '',\r\n          model === v.value ? 'icon-check-circle-thin' : 'icon-circle-thin'\r\n        ]\"></i>\r\n    <span>{{ v.text }}</span>\r\n  </label>\r\n</span>",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => RadioGroupComponent)),
                        multi: true,
                    }]
            }] }
];
/** @nocollapse */
RadioGroupComponent.ctorParameters = () => [];
RadioGroupComponent.propDecorators = {
    radioGroup: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    RadioGroupComponent.prototype.radioGroup;
    /** @type {?} */
    RadioGroupComponent.prototype.model;
    /** @type {?} */
    RadioGroupComponent.prototype.onChange;
    /** @type {?} */
    RadioGroupComponent.prototype.onTouched;
}
/**
 * 单个radio的配置
 * @record
 */
export function Radio() { }
if (false) {
    /**
     * value
     * @type {?}
     */
    Radio.prototype.value;
    /**
     * disabled
     * @type {?|undefined}
     */
    Radio.prototype.disabled;
    /**
     * 描述
     * @type {?|undefined}
     */
    Radio.prototype.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9fZm9ybS9yYWRpby1ncm91cC9yYWRpby1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVXpFLE1BQU0sT0FBTyxtQkFBbUI7SUFVNUI7UUFUUyxlQUFVLEdBQVksRUFBRSxDQUFDO0lBU2xCLENBQUM7Ozs7SUFKakIsUUFBUTtRQUNKLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBSUQsVUFBVSxDQUFDLEdBQVE7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQTdCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IseWpCQUEyQztnQkFDM0MsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBQzt3QkFDbEQsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQzthQUNMOzs7Ozt5QkFFSSxLQUFLOzs7O0lBQU4seUNBQWtDOztJQUNsQyxvQ0FBaUM7O0lBQ2pDLHVDQUFrQzs7SUFDbEMsd0NBQXNCOzs7Ozs7QUFxQjFCLDJCQU9DOzs7Ozs7SUFMRyxzQkFBVzs7Ozs7SUFFWCx5QkFBbUI7Ozs7O0lBRW5CLHFCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog5Y2V6YCJ57uE57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjI5OjQ5IGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLXJhZGlvLWdyb3VwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9yYWRpby1ncm91cC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9Hcm91cENvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFkaW9Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgIEBJbnB1dCgpIHJhZGlvR3JvdXA6IFJhZGlvW10gPSBbXTtcclxuICAgIG1vZGVsOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xyXG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGlkUHJlZml4KCkge1xyXG4gICAgICAgIHJldHVybiAneicgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMiwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBvYmo7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKiDljZXkuKpyYWRpb+eahOmFjee9riAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJhZGlvIHtcclxuICAgIC8qKiB2YWx1ZSAqL1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIC8qKiBkaXNhYmxlZCAqL1xyXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgLyoqIOaPj+i/sCAqL1xyXG4gICAgdGV4dD86IHN0cmluZztcclxufVxyXG4iXX0=