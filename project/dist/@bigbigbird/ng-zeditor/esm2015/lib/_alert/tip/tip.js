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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvQGJpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL19hbGVydC90aXAvdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBUWpILE1BQU0sT0FBTyxZQUFZOzs7O0lBcUJyQixZQUNZLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQzlCLENBQUM7Ozs7SUFYTCxJQUFJLGVBQWU7UUFDZixPQUFPLG1CQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUF3QixDQUFDO0lBQzlELENBQUM7Ozs7SUFDRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFDRCxJQUFJLFFBQVE7UUFDUixPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFTRCxJQUFJLENBQUMsT0FBaUI7UUFDbEIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakgsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O2NBQ1osQ0FBQyxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQ3BFLGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FBRTtJQUM3RSxDQUFDOzs7OztJQUtELEtBQUs7OztjQUVLLEVBQUUsR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDdkIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7OztjQUV4QixFQUFFLEdBQUcsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ3ZCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRCxDQUFDLEdBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDL0MsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGtpQkFBaUM7YUFDcEM7Ozs7WUFOMkMsY0FBYzs7O2tCQW1CckQsU0FBUyxTQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7Ozs7OztJQVRwRCw4QkFBZ0I7Ozs7O0lBRWhCLDZCQUFlOztJQUNmLDRCQUFhOztJQUNiLDZCQUFjOztJQUNkLDZCQUFjOztJQUNkLGdDQUFpQjs7SUFDakIsaUNBQWtCOztJQUNsQixvQ0FBeUM7O0lBQ3pDLDJCQUE0RTs7Ozs7SUFXeEUsOEJBQThCOzs7OztBQTJDdEMsNkJBZ0JDOzs7SUFkRyx1QkFBYzs7Ozs7Ozs7SUFPZCw0QkFBbUI7Ozs7O0lBRW5CLDJCQUFrQjs7Ozs7SUFFbEIsd0JBQWU7Ozs7O0lBRWYsd0JBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiB0b2FzdOe7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMToyNTo1NCBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgVGVtcGxhdGVSZWYsIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxyXG4gICAgc2VsZWN0b3I6ICdhcHAtdGlwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAndGlwLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpcENvbXBvbmVudCB7XHJcbiAgICAvKiog5piv5ZCm5r+A5rS7ICovXHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICAvKiog5piv5ZCm5YeG5aSH6KaB5r+A5rS7ICovXHJcbiAgICByZWFkeTogYm9vbGVhbjtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGVudGVyOiBudW1iZXI7XHJcbiAgICBsZWF2ZTogbnVtYmVyO1xyXG4gICAgZHVyYXRpb246IG51bWJlcjtcclxuICAgIGFuaW1hdGlvbjogc3RyaW5nO1xyXG4gICAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VGlwQ29tcG9uZW50PjtcclxuICAgIEBWaWV3Q2hpbGQoJ3RpcCcsIHtyZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIHRpcDogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIGdldCBlbWJlZGRlZFZpZXdSZWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvb3ROb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXNbMF07XHJcbiAgICB9XHJcbiAgICBnZXQgSW5maW5pdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMg6YWN572u5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIG9wZW4ob3B0aW9ucz86IE9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLCB7IGVudGVyOiAyMDAsIGxlYXZlOiAyMDAsIGR1cmF0aW9uOiAxNTAwLCB0ZXh0OiAnJywgYW5pbWF0aW9uOiAnc2NhbGUnIH0sIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IG9wdGlvbnMudGV4dDtcclxuICAgICAgICB0aGlzLmVudGVyID0gb3B0aW9ucy5lbnRlcjtcclxuICAgICAgICB0aGlzLmxlYXZlID0gb3B0aW9ucy5sZWF2ZTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG9wdGlvbnMuYW5pbWF0aW9uO1xyXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5lbWJlZGRlZFZpZXdSZWYpO1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm9vdE5vZGUpO1xyXG4gICAgICAgIC8vIOW7tuaXtua/gOa0u++8jOmYsuatoui/m+WFpeWKqOeUu+S4jeeUn+aViFxyXG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHQgPSBzZXRUaW1lb3V0KCgpID0+IHsgY2xlYXJUaW1lb3V0KHQpOyB0aGlzLmFjdGl2ZSA9IHRydWU7IH0pO1xyXG4gICAgICAgIC8vIOmdnuaJi+WKqOWFs+mXre+8jOWcqOaMh+WumuaXtumXtOWQjuWFs+mXrVxyXG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uICE9PSAtMSAmJiB0aGlzLmR1cmF0aW9uICE9PSBJbmZpbml0eSkgeyB0aGlzLmNsb3NlKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreW8ueeql1xyXG4gICAgICovXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICAvLyDnprvlvIBcclxuICAgICAgICBjb25zdCB0MSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcy5lbnRlciArIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgICAgIC8vIOW9u+W6leenu+mZpFxyXG4gICAgICAgIGNvbnN0IHQyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0Mik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucm9vdE5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuZW1iZWRkZWRWaWV3UmVmKTtcclxuICAgICAgICB9LCB0aGlzLmVudGVyICsgdGhpcy5kdXJhdGlvbiArIHRoaXMubGVhdmUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIC8qIOaPkOekuuaWh+WtlyAqL1xyXG4gICAgdGV4dD86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5Yqo55S75ZCN56ewXHJcbiAgICAgKiAtIHRyYW5zMSDku47kuIvlvoDkuIrvvIjov5vlhaXvvIkgLT4g5LuO5LiL5Yiw5LiK77yI56a75byA77yJXHJcbiAgICAgKiAtIHRyYW5zMiDku47kuIvliLDkuIrvvIjov5vlhaXvvIkgLT4g5LuO5LiL5b6A5LiK77yI56a75byA77yJXHJcbiAgICAgKiAtIHNjYWxlICDmlL7lpKfvvIjov5vlhaXvvIkgLT4g5LuO5LiL5Yiw5LiK77yI56a75byA77yJ57yp5bCPXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvbj86IHN0cmluZztcclxuICAgIC8qKiDlgZznlZnml7bpl7QgKi9cclxuICAgIGR1cmF0aW9uPzogbnVtYmVyO1xyXG4gICAgLyoqIOi/m+WFpei/h+a4oeaXtumXtCAqL1xyXG4gICAgZW50ZXI/OiBudW1iZXI7XHJcbiAgICAvKiog56a75byA6L+H5rih5pe26Ze0ICovXHJcbiAgICBsZWF2ZT86IG51bWJlcjtcclxufVxyXG4iXX0=