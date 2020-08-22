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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvX2Zvcm0vcmFkaW8tZ3JvdXAvcmFkaW8tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVV6RSxNQUFNLE9BQU8sbUJBQW1CO0lBVTVCO1FBVFMsZUFBVSxHQUFZLEVBQUUsQ0FBQztJQVNsQixDQUFDOzs7O0lBSmpCLFFBQVE7UUFDSixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUlELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHlqQkFBMkM7Z0JBQzNDLFNBQVMsRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUM7d0JBQ2xELEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUM7YUFDTDs7Ozs7eUJBRUksS0FBSzs7OztJQUFOLHlDQUFrQzs7SUFDbEMsb0NBQWlDOztJQUNqQyx1Q0FBa0M7O0lBQ2xDLHdDQUFzQjs7Ozs7O0FBcUIxQiwyQkFPQzs7Ozs7O0lBTEcsc0JBQVc7Ozs7O0lBRVgseUJBQW1COzs7OztJQUVuQixxQkFBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOWNlemAiee7hOe7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMToyOTo0OSBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC1yYWRpby1ncm91cCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmFkaW8tZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvR3JvdXBDb21wb25lbnQpLFxyXG4gICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhZGlvR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBASW5wdXQoKSByYWRpb0dyb3VwOiBSYWRpb1tdID0gW107XHJcbiAgICBtb2RlbDogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcclxuICAgIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZFByZWZpeCgpIHtcclxuICAgICAgICByZXR1cm4gJ3onICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gb2JqO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKiog5Y2V5LiqcmFkaW/nmoTphY3nva4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSYWRpbyB7XHJcbiAgICAvKiogdmFsdWUgKi9cclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICAvKiogZGlzYWJsZWQgKi9cclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIC8qKiDmj4/ov7AgKi9cclxuICAgIHRleHQ/OiBzdHJpbmc7XHJcbn1cclxuIl19