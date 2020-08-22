/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class CheckBoxComponent {
    constructor() {
        this.id = '';
        this.disabled = false;
        this.value = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.checkBoxGroup) {
            return;
        }
        this.model = [];
        this.checkBoxGroup.forEach((/**
         * @param {?} ck
         * @return {?}
         */
        (ck) => {
            if (ck.checked) {
                ((/** @type {?} */ (this.model))).push(ck.value);
            }
        }));
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
    /**
     * @param {?} v
     * @return {?}
     */
    myOnChange(v) {
        if (!(this.model instanceof Array)) { // 非数组（认为是布尔类型）
            this.onChange(v);
            return;
        }
        /** @type {?} */
        const index = this.model.indexOf(v);
        if (index > -1) {
            this.model.splice(index, 1);
        }
        else {
            this.model.push(v);
        }
    }
}
CheckBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-checkbox',
                template: "<ng-container *ngIf=\"model === false || model === true; else list\">\r\n  <label class=\"z-editor-checkbox\" [for]=\"id\">\r\n    <input type=\"checkbox\" [id]=\"id\" [(ngModel)]=\"model\" [disabled]=\"disabled\" (ngModelChange)=\"myOnChange(model)\" />\r\n    <i [ngClass]=\"[\r\n          'z-editor-icomoon',\r\n          disabled ? 'wd-checkbox-disabled' : '',\r\n          model ? 'icon-check-square' : 'icon-square-o'\r\n        ]\"></i>\r\n  </label>\r\n</ng-container>\r\n<ng-template #list>\r\n  <label *ngFor=\"let m of checkBoxGroup, index as i\" class=\"z-editor-checkbox\" [for]=\"id+i\">\r\n    <input type=\"checkbox\" [id]=\"id+i\" [(ngModel)]=\"m.checked\" [disabled]=\"m.disabled\" (ngModelChange)=\"myOnChange(m.value)\" />\r\n    <i [ngClass]=\"[\r\n          'z-editor-icomoon',\r\n          m.disabled ? 'wd-checkbox-disabled' : '',\r\n          m.checked ? 'icon-check-square' : 'icon-square-o'\r\n        ]\"></i>\r\n    <span>{{m.text}}</span>\r\n  </label>\r\n</ng-template>",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => CheckBoxComponent)),
                        multi: true,
                    }]
            }] }
];
/** @nocollapse */
CheckBoxComponent.ctorParameters = () => [];
CheckBoxComponent.propDecorators = {
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    checkBoxGroup: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CheckBoxComponent.prototype.id;
    /** @type {?} */
    CheckBoxComponent.prototype.disabled;
    /** @type {?} */
    CheckBoxComponent.prototype.value;
    /** @type {?} */
    CheckBoxComponent.prototype.checkBoxGroup;
    /** @type {?} */
    CheckBoxComponent.prototype.model;
    /** @type {?} */
    CheckBoxComponent.prototype.onChange;
    /** @type {?} */
    CheckBoxComponent.prototype.onTouched;
}
/**
 * 单个checkbox的配置
 * @record
 */
export function Checkbox() { }
if (false) {
    /**
     * value
     * @type {?}
     */
    Checkbox.prototype.value;
    /**
     * 是否选中
     * @type {?}
     */
    Checkbox.prototype.checked;
    /**
     * disabled
     * @type {?|undefined}
     */
    Checkbox.prototype.disabled;
    /**
     * 描述
     * @type {?|undefined}
     */
    Checkbox.prototype.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9fZm9ybS9jaGVja2JveC9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBWXpFLE1BQU0sT0FBTyxpQkFBaUI7SUFVMUI7UUFSUyxPQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsVUFBSyxHQUE4QixFQUFFLENBQUM7SUFNaEMsQ0FBQzs7OztJQUVoQixRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxFQUFZLEVBQUUsRUFBRTtZQUN4QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUNELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELFVBQVUsQ0FBQyxDQUFNO1FBQ2IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsRUFBRSxFQUFFLGVBQWU7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPO1NBQ1Y7O2NBQ0ssS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7WUFyREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixvL0JBQXdDO2dCQUN4QyxTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFDO3dCQUNoRCxLQUFLLEVBQUUsSUFBSTtxQkFDZCxDQUFDO2FBQ0w7Ozs7O2lCQUlJLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7Ozs7SUFITiwrQkFBeUI7O0lBQ3pCLHFDQUFtQzs7SUFDbkMsa0NBQStDOztJQUMvQywwQ0FBbUM7O0lBQ25DLGtDQUF1Qjs7SUFDdkIscUNBQXVDOztJQUN2QyxzQ0FBc0I7Ozs7OztBQXVDMUIsOEJBU0M7Ozs7OztJQVBHLHlCQUFXOzs7OztJQUVYLDJCQUFhOzs7OztJQUViLDRCQUFtQjs7Ozs7SUFFbkIsd0JBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDlpI3pgInmoYbnu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6Mjk6MjEgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtY2hlY2tib3gnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW3tcclxuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja0JveENvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9XVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrQm94Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XHJcblxyXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9ICcnO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuID0gJyc7XHJcbiAgICBASW5wdXQoKSBjaGVja0JveEdyb3VwOiBDaGVja2JveFtdO1xyXG4gICAgbW9kZWw6IGJvb2xlYW4gfCBhbnlbXTtcclxuICAgIG9uQ2hhbmdlOiAodjogYm9vbGVhbiB8IGFueVtdKSA9PiB2b2lkO1xyXG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3hHcm91cCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWwgPSBbXTtcclxuICAgICAgICB0aGlzLmNoZWNrQm94R3JvdXAuZm9yRWFjaCgoY2s6IENoZWNrYm94KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjay5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5tb2RlbCBhcyBhbnkpLnB1c2goY2sudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG9iajtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgbXlPbkNoYW5nZSh2OiBhbnkpIHtcclxuICAgICAgICBpZiAoISh0aGlzLm1vZGVsIGluc3RhbmNlb2YgQXJyYXkpKSB7IC8vIOmdnuaVsOe7hO+8iOiupOS4uuaYr+W4g+WwlOexu+Wei++8iVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKHYpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnB1c2godik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKiog5Y2V5LiqY2hlY2tib3jnmoTphY3nva4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDaGVja2JveCB7XHJcbiAgICAvKiogdmFsdWUgKi9cclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICAvKiog5piv5ZCm6YCJ5LitICovXHJcbiAgICBjaGVja2VkOiBhbnk7XHJcbiAgICAvKiogZGlzYWJsZWQgKi9cclxuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIC8qKiDmj4/ov7AgKi9cclxuICAgIHRleHQ/OiBzdHJpbmc7XHJcbn1cclxuIl19