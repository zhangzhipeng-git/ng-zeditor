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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvX2Zvcm0vY2hlY2tib3gvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVl6RSxNQUFNLE9BQU8saUJBQWlCO0lBVTFCO1FBUlMsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFVBQUssR0FBOEIsRUFBRSxDQUFDO0lBTWhDLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTzs7OztRQUFDLENBQUMsRUFBWSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO2dCQUNaLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFDRCxVQUFVLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxVQUFVLENBQUMsQ0FBTTtRQUNiLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLEVBQUUsRUFBRSxlQUFlO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTztTQUNWOztjQUNLLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7O1lBckRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsby9CQUF3QztnQkFDeEMsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQzt3QkFDaEQsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQzthQUNMOzs7OztpQkFJSSxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzs7O0lBSE4sK0JBQXlCOztJQUN6QixxQ0FBbUM7O0lBQ25DLGtDQUErQzs7SUFDL0MsMENBQW1DOztJQUNuQyxrQ0FBdUI7O0lBQ3ZCLHFDQUF1Qzs7SUFDdkMsc0NBQXNCOzs7Ozs7QUF1QzFCLDhCQVNDOzs7Ozs7SUFQRyx5QkFBVzs7Ozs7SUFFWCwyQkFBYTs7Ozs7SUFFYiw0QkFBbUI7Ozs7O0lBRW5CLHdCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog5aSN6YCJ5qGG57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjI5OjIxIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLWNoZWNrYm94JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tCb3hDb21wb25lbnQpLFxyXG4gICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiA9ICcnO1xyXG4gICAgQElucHV0KCkgY2hlY2tCb3hHcm91cDogQ2hlY2tib3hbXTtcclxuICAgIG1vZGVsOiBib29sZWFuIHwgYW55W107XHJcbiAgICBvbkNoYW5nZTogKHY6IGJvb2xlYW4gfCBhbnlbXSkgPT4gdm9pZDtcclxuICAgIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrQm94R3JvdXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsID0gW107XHJcbiAgICAgICAgdGhpcy5jaGVja0JveEdyb3VwLmZvckVhY2goKGNrOiBDaGVja2JveCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2suY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMubW9kZWwgYXMgYW55KS5wdXNoKGNrLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBvYmo7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIG15T25DaGFuZ2UodjogYW55KSB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5tb2RlbCBpbnN0YW5jZW9mIEFycmF5KSkgeyAvLyDpnZ7mlbDnu4TvvIjorqTkuLrmmK/luIPlsJTnsbvlnovvvIlcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubW9kZWwuaW5kZXhPZih2KTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5wdXNoKHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqIOWNleS4qmNoZWNrYm9455qE6YWN572uICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tib3gge1xyXG4gICAgLyoqIHZhbHVlICovXHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgLyoqIOaYr+WQpumAieS4rSAqL1xyXG4gICAgY2hlY2tlZDogYW55O1xyXG4gICAgLyoqIGRpc2FibGVkICovXHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICAvKiog5o+P6L+wICovXHJcbiAgICB0ZXh0Pzogc3RyaW5nO1xyXG59XHJcbiJdfQ==