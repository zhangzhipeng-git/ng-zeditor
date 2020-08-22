/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: toast组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:25:54 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
import { Component, ViewChild, TemplateRef, ApplicationRef } from '@angular/core';
export class TipComponent {
    /**
     * @param {?} appRef
     */
    constructor(appRef) {
        this.appRef = appRef;
    }
    /**
     * @return {?}
     */
    get embeddedViewRef() {
        return (/** @type {?} */ (this.componentRef.hostView));
    }
    /**
     * @return {?}
     */
    get rootNode() {
        return this.embeddedViewRef.rootNodes[0];
    }
    /**
     * @return {?}
     */
    get Infinity() {
        return Number.POSITIVE_INFINITY;
    }
    /**
     * 打开
     * @param {?=} options 配置参数
     * @return {?}
     */
    open(options) {
        options = Object.assign(this, { enter: 200, leave: 200, duration: 1500, text: '', animation: 'scale' }, options);
        this.text = options.text;
        this.enter = options.enter;
        this.leave = options.leave;
        this.duration = options.duration;
        this.animation = options.animation;
        this.appRef.attachView(this.embeddedViewRef);
        window.document.body.appendChild(this.rootNode);
        // 延时激活，防止进入动画不生效
        this.ready = true;
        /** @type {?} */
        const t = setTimeout((/**
         * @return {?}
         */
        () => { clearTimeout(t); this.active = true; }));
        // 非手动关闭，在指定时间后关闭
        if (this.duration !== -1 && this.duration !== Infinity) {
            this.close();
        }
    }
    /**
     * 关闭弹窗
     * @return {?}
     */
    close() {
        // 离开
        /** @type {?} */
        const t1 = setTimeout((/**
         * @return {?}
         */
        () => {
            clearTimeout(t1);
            this.ready = false;
            this.active = false;
        }), this.enter + this.duration);
        // 彻底移除
        /** @type {?} */
        const t2 = setTimeout((/**
         * @return {?}
         */
        () => {
            clearTimeout(t2);
            window.document.body.removeChild(this.rootNode);
            this.appRef.detachView(this.embeddedViewRef);
        }), this.enter + this.duration + this.leave);
    }
}
TipComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'app-tip',
                template: "<div id=\"z-editor-tip\" class=\"z-editor-alert\">\r\n  <div class=\"wd-mask\"></div>\r\n  <!-- active - true \u6267\u884C\u8FDB\u5165\u52A8\u753B\uFF0Cfalse \u6267\u884C\u79BB\u5F00\u52A8\u753B -->\r\n  <p [ngStyle]=\"{transition:  'all ' + (ready?enter:leave)/1000 + 's'}\"\r\n    [ngClass]=\"[(animation === 'scale'?'wd-tip-for-scale':'wd-tip'),animation+'-enter', animation+ (active?'-active':'-leave')]\">\r\n    <i *ngIf=\"duration < 0 || duration === Infinity\" class=\"z-editor-icomoon icon-loader\"></i>{{text}}</p>\r\n</div>"
            }] }
];
/** @nocollapse */
TipComponent.ctorParameters = () => [
    { type: ApplicationRef }
];
TipComponent.propDecorators = {
    tip: [{ type: ViewChild, args: ['tip', { read: TemplateRef, static: true },] }]
};
if (false) {
    /**
     * 是否激活
     * @type {?}
     */
    TipComponent.prototype.active;
    /**
     * 是否准备要激活
     * @type {?}
     */
    TipComponent.prototype.ready;
    /** @type {?} */
    TipComponent.prototype.text;
    /** @type {?} */
    TipComponent.prototype.enter;
    /** @type {?} */
    TipComponent.prototype.leave;
    /** @type {?} */
    TipComponent.prototype.duration;
    /** @type {?} */
    TipComponent.prototype.animation;
    /** @type {?} */
    TipComponent.prototype.componentRef;
    /** @type {?} */
    TipComponent.prototype.tip;
    /**
     * @type {?}
     * @private
     */
    TipComponent.prototype.appRef;
}
/**
 * @record
 */
export function Options() { }
if (false) {
    /** @type {?|undefined} */
    Options.prototype.text;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     * @type {?|undefined}
     */
    Options.prototype.animation;
    /**
     * 停留时间
     * @type {?|undefined}
     */
    Options.prototype.duration;
    /**
     * 进入过渡时间
     * @type {?|undefined}
     */
    Options.prototype.enter;
    /**
     * 离开过渡时间
     * @type {?|undefined}
     */
    Options.prototype.leave;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvX2FsZXJ0L3RpcC90aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFRakgsTUFBTSxPQUFPLFlBQVk7Ozs7SUFxQnJCLFlBQ1ksTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFDOUIsQ0FBQzs7OztJQVhMLElBQUksZUFBZTtRQUNmLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQXdCLENBQUM7SUFDOUQsQ0FBQzs7OztJQUNELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUNELElBQUksUUFBUTtRQUNSLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQVNELElBQUksQ0FBQyxPQUFpQjtRQUNsQixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7Y0FDWixDQUFDLEdBQUcsVUFBVTs7O1FBQUMsR0FBRyxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7UUFDcEUsaUJBQWlCO1FBQ2pCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUFFO0lBQzdFLENBQUM7Ozs7O0lBS0QsS0FBSzs7O2NBRUssRUFBRSxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUN2QixZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxHQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7O2NBRXhCLEVBQUUsR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDdkIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMvQyxDQUFDOzs7WUFuRUosU0FBUyxTQUFDOztnQkFFUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsa2lCQUFpQzthQUNwQzs7OztZQU4yQyxjQUFjOzs7a0JBbUJyRCxTQUFTLFNBQUMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7Ozs7O0lBVHBELDhCQUFnQjs7Ozs7SUFFaEIsNkJBQWU7O0lBQ2YsNEJBQWE7O0lBQ2IsNkJBQWM7O0lBQ2QsNkJBQWM7O0lBQ2QsZ0NBQWlCOztJQUNqQixpQ0FBa0I7O0lBQ2xCLG9DQUF5Qzs7SUFDekMsMkJBQTRFOzs7OztJQVd4RSw4QkFBOEI7Ozs7O0FBMkN0Qyw2QkFnQkM7OztJQWRHLHVCQUFjOzs7Ozs7OztJQU9kLDRCQUFtQjs7Ozs7SUFFbkIsMkJBQWtCOzs7OztJQUVsQix3QkFBZTs7Ozs7SUFFZix3QkFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IHRvYXN057uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjI1OjU0IGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXHJcbiAgICBzZWxlY3RvcjogJ2FwcC10aXAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICd0aXAuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGlwQ29tcG9uZW50IHtcclxuICAgIC8qKiDmmK/lkKbmv4DmtLsgKi9cclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIC8qKiDmmK/lkKblh4blpIfopoHmv4DmtLsgKi9cclxuICAgIHJlYWR5OiBib29sZWFuO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgZW50ZXI6IG51bWJlcjtcclxuICAgIGxlYXZlOiBudW1iZXI7XHJcbiAgICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgYW5pbWF0aW9uOiBzdHJpbmc7XHJcbiAgICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUaXBDb21wb25lbnQ+O1xyXG4gICAgQFZpZXdDaGlsZCgndGlwJywge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgdGlwOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgZ2V0IGVtYmVkZGVkVmlld1JlZigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XHJcbiAgICB9XHJcbiAgICBnZXQgcm9vdE5vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1iZWRkZWRWaWV3UmVmLnJvb3ROb2Rlc1swXTtcclxuICAgIH1cclxuICAgIGdldCBJbmZpbml0eSgpIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXHJcbiAgICApIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byAXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyDphY3nva7lj4LmlbBcclxuICAgICAqL1xyXG4gICAgb3BlbihvcHRpb25zPzogT3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMsIHsgZW50ZXI6IDIwMCwgbGVhdmU6IDIwMCwgZHVyYXRpb246IDE1MDAsIHRleHQ6ICcnLCBhbmltYXRpb246ICdzY2FsZScgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gb3B0aW9ucy50ZXh0O1xyXG4gICAgICAgIHRoaXMuZW50ZXIgPSBvcHRpb25zLmVudGVyO1xyXG4gICAgICAgIHRoaXMubGVhdmUgPSBvcHRpb25zLmxlYXZlO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gb3B0aW9ucy5hbmltYXRpb247XHJcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmVtYmVkZGVkVmlld1JlZik7XHJcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb290Tm9kZSk7XHJcbiAgICAgICAgLy8g5bu25pe25r+A5rS777yM6Ziy5q2i6L+b5YWl5Yqo55S75LiN55Sf5pWIXHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4geyBjbGVhclRpbWVvdXQodCk7IHRoaXMuYWN0aXZlID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgLy8g6Z2e5omL5Yqo5YWz6Zet77yM5Zyo5oyH5a6a5pe26Ze05ZCO5YWz6ZetXHJcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24gIT09IC0xICYmIHRoaXMuZHVyYXRpb24gIT09IEluZmluaXR5KSB7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5by556qXXHJcbiAgICAgKi9cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIC8vIOemu+W8gFxyXG4gICAgICAgIGNvbnN0IHQxID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0MSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzLmVudGVyICsgdGhpcy5kdXJhdGlvbik7XHJcbiAgICAgICAgLy8g5b275bqV56e76ZmkXHJcbiAgICAgICAgY29uc3QgdDIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHQyKTtcclxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5yb290Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5lbWJlZGRlZFZpZXdSZWYpO1xyXG4gICAgICAgIH0sIHRoaXMuZW50ZXIgKyB0aGlzLmR1cmF0aW9uICsgdGhpcy5sZWF2ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xyXG4gICAgLyog5o+Q56S65paH5a2XICovXHJcbiAgICB0ZXh0Pzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliqjnlLvlkI3np7BcclxuICAgICAqIC0gdHJhbnMxIOS7juS4i+W+gOS4iu+8iOi/m+WFpe+8iSAtPiDku47kuIvliLDkuIrvvIjnprvlvIDvvIlcclxuICAgICAqIC0gdHJhbnMyIOS7juS4i+WIsOS4iu+8iOi/m+WFpe+8iSAtPiDku47kuIvlvoDkuIrvvIjnprvlvIDvvIlcclxuICAgICAqIC0gc2NhbGUgIOaUvuWkp++8iOi/m+WFpe+8iSAtPiDku47kuIvliLDkuIrvvIjnprvlvIDvvInnvKnlsI9cclxuICAgICAqL1xyXG4gICAgYW5pbWF0aW9uPzogc3RyaW5nO1xyXG4gICAgLyoqIOWBnOeVmeaXtumXtCAqL1xyXG4gICAgZHVyYXRpb24/OiBudW1iZXI7XHJcbiAgICAvKiog6L+b5YWl6L+H5rih5pe26Ze0ICovXHJcbiAgICBlbnRlcj86IG51bWJlcjtcclxuICAgIC8qKiDnprvlvIDov4fmuKHml7bpl7QgKi9cclxuICAgIGxlYXZlPzogbnVtYmVyO1xyXG59XHJcbiJdfQ==