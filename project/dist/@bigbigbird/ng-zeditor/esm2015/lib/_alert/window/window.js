/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 弹窗组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:26:52 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
import { Component, ViewChild, ElementRef, ViewContainerRef, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { TYPE } from '../../service/tokens';
export class WindowComponent {
    /**
     * @param {?} injector
     * @param {?} applicationRef
     * @param {?} componentFactoryResolver
     */
    constructor(injector, applicationRef, componentFactoryResolver) {
        this.injector = injector;
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.min = true;
        /**
         * 移动
         * @param e 事件
         */
        this.move = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const point = {
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
            };
            /** @type {?} */
            let top = point.y + this.window.nativeElement._dis.y;
            /** @type {?} */
            let left = point.x + this.window.nativeElement._dis.x;
            // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
            /** @type {?} */
            let maxX = this.window.nativeElement.parentNode.clientWidth - this.window.nativeElement.offsetWidth;
            /** @type {?} */
            let maxY = this.window.nativeElement.parentNode.clientHeight - this.window.nativeElement.offsetHeight;
            if (maxX < 0) {
                maxX = 0;
            }
            if (maxY < 0) {
                maxY = 0;
            }
            // 判断是否越界
            if (top <= 0) { // y方向
                top = 0;
            }
            else if (top >= maxY) {
                top = maxY;
            }
            if (left <= 0) { // x方向
                left = 0;
            }
            else if (left >= maxX) {
                left = maxX - 1; // 消除误差，防止右拉过度导致宽度变小
            }
            this.window.nativeElement.style.top = top + 'px';
            this.window.nativeElement.style.left = left + 'px';
        });
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
    get type() {
        return (/** @type {?} */ (this.injector.get(TYPE)));
    }
    /**
     * 放大缩小
     * @param {?} e 点击事件
     * @return {?}
     */
    switchSize(e) {
        if (this.min) { // 当前状态为缩小，点击放大
            this.window.nativeElement.style.cssText = 'height:100%;width:100%;top:0;left:0;';
            this.min = false;
            /** @type {?} */
            const maximize = this.callback.maximize;
            // tslint:disable-next-line: no-unused-expression
            maximize && maximize();
        }
        else { // 当前状态为放大，点击缩小
            this.window.nativeElement.style.cssText = this.window.nativeElement._minStyle;
            this.min = true;
            /** @type {?} */
            const minimize = this.callback.minimize;
            // tslint:disable-next-line: no-unused-expression
            minimize && minimize();
        }
    }
    /**
     * 点击关闭弹窗
     * @param {?} e 事件
     * @return {?}
     */
    close(e) {
        // 设置关闭时的渐变
        // 将行内top样式消除（优先级最高会覆盖css文件中的top样式），使css中离开时的top样式生效，否则css类trans1和trans2的离开渐变不生效
        this.window.nativeElement.style.cssText = this.window.nativeElement.style.cssText.replace(/top:(.*)?;/, '');
        this.window.nativeElement.style.transition = 'all ' + this.leave / 1000 + 's';
        this.active = false;
        this.mask.nativeElement.style.display = 'none';
        // 移除
        setTimeout((/**
         * @return {?}
         */
        () => {
            window.document.body.removeChild(this.rootNode);
            this.applicationRef.detachView(this.embeddedViewRef);
            this.componentRef.destroy();
            this.componentRef = null;
            /** @type {?} */
            const close = this.callback.close;
            // tslint:disable-next-line: no-unused-expression
            close && close(e);
        }), this.leave);
    }
    /**
     * 初始化打开操作
     * @param {?=} options
     * @return {?}
     */
    beforeOpen(options) {
        // tslint:disable-next-line: max-line-length
        Object.assign(this, { title: '弹窗', animation: 'trans1', enter: 200, leave: 200, isScale: false, isMove: true, content: '什么也木有~', callback: {}, theme: '' }, options);
        if (this.type === 'string') {
            return;
        }
        this.component.clear();
        /** @type {?} */
        const factory = this.componentFactoryResolver.resolveComponentFactory((/** @type {?} */ ((this.content))));
        /** @type {?} */
        const componentRef = this.component.createComponent(factory);
        /** @type {?} */
        const componentInstance = componentRef.instance;
        componentInstance.parent = this;
        componentInstance.handler = this.handler;
    }
    /**
     * 打开弹窗
     * @param {?=} options
     * @return {?}
     */
    open(options) {
        this.beforeOpen(options);
        this.mask.nativeElement.style.display = 'block';
        this.applicationRef.attachView(this.embeddedViewRef);
        window.document.body.appendChild(this.rootNode);
        // 左右居中，top用css控制
        /** @type {?} */
        const w = this.window.nativeElement.offsetWidth;
        /** @type {?} */
        const h = this.window.nativeElement.offsetHeight;
        // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
        /** @type {?} */
        const ww = this.window.nativeElement.parentNode.offsetWidth;
        // 初始定位
        /** @type {?} */
        const leftStyle = 'left:' + ((ww - w) / 2) + 'px;';
        this.window.nativeElement.style.cssText += leftStyle;
        // 记录最小化时的样式
        this.window.nativeElement._minStyle = leftStyle + 'width:' + (w + 1) + 'px;height:' + (h + 1) + 'px;';
        // 设置打开时的渐变
        this.window.nativeElement.style.transition = 'all ' + (this.enter / 1000) + 's';
        // 进入激活状态（弹窗停留）
        setTimeout((/**
         * @return {?}
         */
        () => this.active = true));
        // 取消渐变，否则移动会有渐变
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.window.nativeElement.style.transition = 'none';
        }), this.enter);
    }
    /**
     * 阻止拖拽
     * @param {?} e 拖拽事件
     * @return {?}
     */
    tragstart(e) {
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
    }
    /**
     * 开始移动
     * @param {?} e 事件
     * @return {?}
     */
    start(e) {
        // 全屏状态不可移动
        if (!this.min) {
            return;
        }
        // 移动参数传入false，不可移动
        if (!this.isMove) {
            return;
        }
        /** @type {?} */
        const point = {
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        };
        /** @type {?} */
        const dis = {
            x: this.window.nativeElement.offsetLeft - point.x,
            y: this.window.nativeElement.offsetTop - point.y
        };
        this.window.nativeElement._dis = dis;
        // 浏览器窗体
        window.onmouseup = this.end;
        window.onmousemove = this.move;
    }
    /**
     * 停止移动
     * @param {?} e 事件
     * @return {?}
     */
    end(e) {
        window.onmouseup = null;
        window.onmousemove = null;
    }
}
WindowComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-window',
                template: "<div id=\"z-editor-window\" class=\"z-editor-alert\" [ngClass]=\"theme\">\r\n  <div class=\"wd-mask\" #mask></div>\r\n  <div class=\"wd-content\">\r\n    <div #window class=\"wd-window\" [ngClass]=\"[animation+'-enter', animation+(active?'-active':'-leave')]\">\r\n      <!-- \u7A97\u53E3\u5DE5\u5177\u6761 -->\r\n      <div class=\"wd-window-tool\" (mousedown)=\"start($event)\" (tragstart)=\"tragstart($event)\">\r\n        <h3>{{title}}</h3>\r\n        <p>\r\n          <!-- isScale true-\u663E\u793A\u653E\u5927\u7F29\u5C0F\uFF0Cfalse-\u4E0D\u663E\u793A\u653E\u5927\u7F29\u5C0F,_isScale\u540CisScale\u517C\u5BB9\u65B9\u5F0F2 -->\r\n          <i *ngIf=\"isScale\" (click)=\"switchSize($event)\" class=\"z-editor-icomoon\"\r\n            [ngClass]=\"min?'icon-maximize': 'icon-minimize'\"></i>\r\n          <i (click)=\"close($event)\" class=\"z-editor-icomoon icon-x-square\"></i>\r\n        </p>\r\n      </div>\r\n      <!-- \u7A97\u53E3\u9762\u677F -->\r\n      <div class=\"wd-window-pannel\">\r\n        <!-- v-html -->\r\n        <div *ngIf=\"type === 'string'; else component\" [innerHTML]=\"content|safeHTML\">\r\n        </div>\r\n        <!-- \u52A8\u6001\u7EC4\u4EF6 handler:angular\u5B9E\u4F8B -->\r\n        <ng-template #component></ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
WindowComponent.ctorParameters = () => [
    { type: Injector },
    { type: ApplicationRef },
    { type: ComponentFactoryResolver }
];
WindowComponent.propDecorators = {
    mask: [{ type: ViewChild, args: ['mask', { read: ElementRef, static: true },] }],
    window: [{ type: ViewChild, args: ['window', { read: ElementRef, static: true },] }],
    component: [{ type: ViewChild, args: ['component', { read: ViewContainerRef, static: true },] }]
};
if (false) {
    /** @type {?} */
    WindowComponent.prototype.min;
    /** @type {?} */
    WindowComponent.prototype.theme;
    /** @type {?} */
    WindowComponent.prototype.animation;
    /** @type {?} */
    WindowComponent.prototype.title;
    /** @type {?} */
    WindowComponent.prototype.isScale;
    /** @type {?} */
    WindowComponent.prototype.active;
    /** @type {?} */
    WindowComponent.prototype.isMove;
    /** @type {?} */
    WindowComponent.prototype.callback;
    /** @type {?} */
    WindowComponent.prototype.leave;
    /** @type {?} */
    WindowComponent.prototype.enter;
    /** @type {?} */
    WindowComponent.prototype.content;
    /** @type {?} */
    WindowComponent.prototype.handler;
    /** @type {?} */
    WindowComponent.prototype.componentRef;
    /** @type {?} */
    WindowComponent.prototype.mask;
    /** @type {?} */
    WindowComponent.prototype.window;
    /** @type {?} */
    WindowComponent.prototype.component;
    /**
     * 移动
     * \@param e 事件
     * @type {?}
     */
    WindowComponent.prototype.move;
    /**
     * @type {?}
     * @private
     */
    WindowComponent.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    WindowComponent.prototype.applicationRef;
    /**
     * @type {?}
     * @private
     */
    WindowComponent.prototype.componentFactoryResolver;
}
/**
 * @record
 */
export function WindowOptions() { }
if (false) {
    /**
     * 弹窗标题
     * @type {?|undefined}
     */
    WindowOptions.prototype.title;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     * @type {?|undefined}
     */
    WindowOptions.prototype.animation;
    /**
     * 进入过渡时间
     * @type {?|undefined}
     */
    WindowOptions.prototype.enter;
    /**
     * 离开过渡时间
     * @type {?|undefined}
     */
    WindowOptions.prototype.leave;
    /**
     * 回调
     * @type {?|undefined}
     */
    WindowOptions.prototype.callback;
    /**
     * html | 组件
     * @type {?|undefined}
     */
    WindowOptions.prototype.content;
    /**
     * 窗体是否可放大缩小
     * @type {?|undefined}
     */
    WindowOptions.prototype.isScale;
    /**
     * 是否可移动
     * @type {?|undefined}
     */
    WindowOptions.prototype.isMove;
    /**
     *  组件实例
     * @type {?|undefined}
     */
    WindowOptions.prototype.handler;
    /**
     * 主题 r g b p
     * @type {?|undefined}
     */
    WindowOptions.prototype.theme;
}
/**
 * 回调
 * @record
 */
export function WindowCallback() { }
if (false) {
    /**
     * 关闭回调
     * @return {?}
     */
    WindowCallback.prototype.close = function () { };
    /**
     * 最小化回调
     * @return {?}
     */
    WindowCallback.prototype.minimize = function () { };
    /**
     * 最大化回调
     * @return {?}
     */
    WindowCallback.prototype.maximize = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvQGJpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL19hbGVydC93aW5kb3cvd2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVlBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFFVixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBTTVDLE1BQU0sT0FBTyxlQUFlOzs7Ozs7SUEyQnhCLFlBQ1ksUUFBa0IsRUFDbEIsY0FBOEIsRUFDOUIsd0JBQWtEO1FBRmxELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUE3QjlELFFBQUcsR0FBWSxJQUFJLENBQUM7Ozs7O1FBeUpwQixTQUFJOzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTs7a0JBQ1IsS0FBSyxHQUFHO2dCQUNWLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPO2dCQUN2QixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTzthQUMxQjs7Z0JBQ0csR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUNoRCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O2dCQUVqRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMs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YTs7SUFDYix1Q0FBNEM7O0lBQzVDLCtCQUF3RTs7SUFDeEUsaUNBQTRFOztJQUM1RSxvQ0FBOEY7Ozs7OztJQTBJOUYsK0JBeUJDOzs7OztJQXZKRyxtQ0FBMEI7Ozs7O0lBQzFCLHlDQUFzQzs7Ozs7SUFDdEMsbURBQTBEOzs7OztBQWdLbEUsbUNBNkJDOzs7Ozs7SUEzQkcsOEJBQWU7Ozs7Ozs7O0lBT2Ysa0NBQW1COzs7OztJQUVuQiw4QkFBZTs7Ozs7SUFFZiw4QkFBZTs7Ozs7SUFFZixpQ0FBMEI7Ozs7O0lBRTFCLGdDQUE2Qjs7Ozs7SUFFN0IsZ0NBQWtCOzs7OztJQUVsQiwrQkFBaUI7Ozs7O0lBSWpCLGdDQUFjOzs7OztJQUdkLDhCQUFlOzs7Ozs7QUFJbkIsb0NBT0M7Ozs7OztJQUxHLGlEQUFlOzs7OztJQUVmLG9EQUFrQjs7Ozs7SUFFbEIsb0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog5by556qX57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjI2OjUyIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgVHlwZSxcclxuICAgIFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEVtYmVkZGVkVmlld1JlZixcclxuICAgIEluamVjdG9yXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRZUEUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlL3Rva2Vucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLXdpbmRvdycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vd2luZG93LmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFdpbmRvd0NvbXBvbmVudCB7XHJcbiAgICBtaW46IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdGhlbWU6IHN0cmluZztcclxuICAgIGFuaW1hdGlvbjogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGlzU2NhbGU6IGJvb2xlYW47XHJcbiAgICBhY3RpdmU6IGJvb2xlYW47XHJcbiAgICBpc01vdmU6IGJvb2xlYW47XHJcbiAgICBjYWxsYmFjazogYW55O1xyXG4gICAgbGVhdmU6IG51bWJlcjtcclxuICAgIGVudGVyOiBudW1iZXI7XHJcbiAgICBjb250ZW50OiBzdHJpbmcgfCBUeXBlPGFueT47XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxXaW5kb3dDb21wb25lbnQ+O1xyXG4gICAgQFZpZXdDaGlsZCgnbWFzaycsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIG1hc2s6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCd3aW5kb3cnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSB3aW5kb3c6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdjb21wb25lbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBjb21wb25lbnQ6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICBnZXQgZW1iZWRkZWRWaWV3UmVmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcclxuICAgIH1cclxuICAgIGdldCByb290Tm9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbWJlZGRlZFZpZXdSZWYucm9vdE5vZGVzWzBdO1xyXG4gICAgfVxyXG4gICAgZ2V0IHR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFRZUEUpIGFzIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbiAgICApIHsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmlL7lpKfnvKnlsI9cclxuICAgICAqIEBwYXJhbSBlIOeCueWHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBzd2l0Y2hTaXplKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1pbikgeyAvLyDlvZPliY3nirbmgIHkuLrnvKnlsI/vvIzngrnlh7vmlL7lpKdcclxuICAgICAgICAgICAgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7dG9wOjA7bGVmdDowOyc7XHJcbiAgICAgICAgICAgIHRoaXMubWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heGltaXplID0gdGhpcy5jYWxsYmFjay5tYXhpbWl6ZTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgICAgICBtYXhpbWl6ZSAmJiBtYXhpbWl6ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIOW9k+WJjeeKtuaAgeS4uuaUvuWkp++8jOeCueWHu+e8qeWwj1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgPSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Ll9taW5TdHlsZTtcclxuICAgICAgICAgICAgdGhpcy5taW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5pbWl6ZSA9IHRoaXMuY2FsbGJhY2subWluaW1pemU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgICAgICAgbWluaW1pemUgJiYgbWluaW1pemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vlhbPpl63lvLnnqpdcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBjbG9zZShlOiBhbnkpIHtcclxuICAgICAgICAvLyDorr7nva7lhbPpl63ml7bnmoTmuJDlj5hcclxuICAgICAgICAvLyDlsIbooYzlhoV0b3DmoLflvI/mtojpmaTvvIjkvJjlhYjnuqfmnIDpq5jkvJropobnm5Zjc3Pmlofku7bkuK3nmoR0b3DmoLflvI/vvInvvIzkvb9jc3PkuK3nprvlvIDml7bnmoR0b3DmoLflvI/nlJ/mlYjvvIzlkKbliJljc3Pnsbt0cmFuczHlkox0cmFuczLnmoTnprvlvIDmuJDlj5jkuI3nlJ/mlYhcclxuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgPSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQucmVwbGFjZSgvdG9wOiguKik/Oy8sICcnKTtcclxuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsICcgKyB0aGlzLmxlYXZlIC8gMTAwMCArICdzJztcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFzay5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgLy8g56e76ZmkXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucm9vdE5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcodGhpcy5lbWJlZGRlZFZpZXdSZWYpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgY2xvc2UgPSB0aGlzLmNhbGxiYWNrLmNsb3NlO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgICAgICAgIGNsb3NlICYmIGNsb3NlKGUpO1xyXG5cclxuICAgICAgICB9LCB0aGlzLmxlYXZlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaJk+W8gOaTjeS9nFxyXG4gICAgICogQHBhcmFtICBvcHRpb25zP1xyXG4gICAgICovXHJcbiAgICBiZWZvcmVPcGVuKG9wdGlvbnM/OiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgdGl0bGU6ICflvLnnqpcnLCBhbmltYXRpb246ICd0cmFuczEnLCBlbnRlcjogMjAwLCBsZWF2ZTogMjAwLCBpc1NjYWxlOiBmYWxzZSwgaXNNb3ZlOiB0cnVlLCBjb250ZW50OiAn5LuA5LmI5Lmf5pyo5pyJficsIGNhbGxiYWNrOiB7fSwgdGhlbWU6ICcnIH0sIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdHJpbmcnKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmNsZWFyKCk7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KCAodGhpcy5jb250ZW50KSBhcyBUeXBlPGFueT4pO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29tcG9uZW50LmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDlvLnnqpdcclxuICAgICAqL1xyXG4gICAgb3BlbihvcHRpb25zPzogV2luZG93T3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuYmVmb3JlT3BlbihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLm1hc2submF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodGhpcy5lbWJlZGRlZFZpZXdSZWYpO1xyXG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucm9vdE5vZGUpO1xyXG4gICAgICAgIC8vIOW3puWPs+WxheS4re+8jHRvcOeUqGNzc+aOp+WItlxyXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGggPSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICAvLyDlvZPliY3nqpflj6PlpKflsI/vvIx0aGlzLndpbmRvdy5wYXJlbnROb2RlID0+IHBvc2l0aW9uOmZpeGVkO2hlaWdodDoxMDAlO3dpZHRoOjEwMCVcclxuICAgICAgICBjb25zdCB3dyA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAvLyDliJ3lp4vlrprkvY1cclxuICAgICAgICBjb25zdCBsZWZ0U3R5bGUgPSAnbGVmdDonICsgKCh3dyAtIHcpIC8gMikgKyAncHg7JztcclxuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gbGVmdFN0eWxlO1xyXG4gICAgICAgIC8vIOiusOW9leacgOWwj+WMluaXtueahOagt+W8j1xyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuX21pblN0eWxlID0gbGVmdFN0eWxlICsgJ3dpZHRoOicgKyAodyArIDEpICsgJ3B4O2hlaWdodDonICsgKGggKyAxKSArICdweDsnO1xyXG4gICAgICAgIC8vIOiuvue9ruaJk+W8gOaXtueahOa4kOWPmFxyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgJyArICh0aGlzLmVudGVyIC8gMTAwMCkgKyAncyc7XHJcbiAgICAgICAgLy8g6L+b5YWl5r+A5rS754q25oCB77yI5by556qX5YGc55WZ77yJXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgICAgIC8vIOWPlua2iOa4kOWPmO+8jOWQpuWImeenu+WKqOS8muaciea4kOWPmFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgdGhpcy5lbnRlcik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmYu+atouaLluaLvVxyXG4gICAgICogQHBhcmFtIGUg5ouW5ou95LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHRyYWdzdGFydChlOiBhbnkpIHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+enu+WKqFxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KGU6IGFueSkge1xyXG4gICAgICAgIC8vIOWFqOWxj+eKtuaAgeS4jeWPr+enu+WKqFxyXG4gICAgICAgIGlmICghdGhpcy5taW4pIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8g56e75Yqo5Y+C5pWw5Lyg5YWlZmFsc2XvvIzkuI3lj6/np7vliqhcclxuICAgICAgICBpZiAoIXRoaXMuaXNNb3ZlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHBvaW50ID0ge1xyXG4gICAgICAgICAgICB4OiBlLnBhZ2VYIHx8IGUuY2xpZW50WCxcclxuICAgICAgICAgICAgeTogZS5wYWdlWSB8fCBlLmNsaWVudFlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGRpcyA9IHtcclxuICAgICAgICAgICAgeDogdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0IC0gcG9pbnQueCxcclxuICAgICAgICAgICAgeTogdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgLSBwb2ludC55XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Ll9kaXMgPSBkaXM7XHJcbiAgICAgICAgLy8g5rWP6KeI5Zmo56qX5L2TXHJcbiAgICAgICAgd2luZG93Lm9ubW91c2V1cCA9IHRoaXMuZW5kO1xyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IHRoaXMubW92ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgbW92ZSA9IChlOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBwb2ludCA9IHtcclxuICAgICAgICAgICAgeDogZS5wYWdlWCB8fCBlLmNsaWVudFgsXHJcbiAgICAgICAgICAgIHk6IGUucGFnZVkgfHwgZS5jbGllbnRZXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgdG9wID0gcG9pbnQueSArIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuX2Rpcy55O1xyXG4gICAgICAgIGxldCBsZWZ0ID0gcG9pbnQueCArIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuX2Rpcy54O1xyXG4gICAgICAgIC8vIOW9k+WJjeeql+WPo+Wkp+Wwj++8jHRoaXMud2luZG93LnBhcmVudE5vZGUgPT4gcG9zaXRpb246Zml4ZWQ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJVxyXG4gICAgICAgIGxldCBtYXhYID0gdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmNsaWVudFdpZHRoIC0gdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgICBsZXQgbWF4WSA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5jbGllbnRIZWlnaHQgLSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBpZiAobWF4WCA8IDApIHsgbWF4WCA9IDA7IH1cclxuICAgICAgICBpZiAobWF4WSA8IDApIHsgbWF4WSA9IDA7IH1cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbotornlYxcclxuICAgICAgICBpZiAodG9wIDw9IDApIHsgLy8geeaWueWQkVxyXG4gICAgICAgICAgICB0b3AgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG9wID49IG1heFkpIHtcclxuICAgICAgICAgICAgdG9wID0gbWF4WTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlZnQgPD0gMCkgeyAvLyB45pa55ZCRXHJcbiAgICAgICAgICAgIGxlZnQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGVmdCA+PSBtYXhYKSB7XHJcbiAgICAgICAgICAgIGxlZnQgPSBtYXhYIC0gMTsgLy8g5raI6Zmk6K+v5beu77yM6Ziy5q2i5Y+z5ouJ6L+H5bqm5a+86Ie05a695bqm5Y+Y5bCPXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcclxuICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i56e75YqoXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgZW5kKGU6IGFueSkge1xyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNldXAgPSBudWxsO1xyXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2luZG93T3B0aW9ucyB7XHJcbiAgICAvKiog5by556qX5qCH6aKYICovXHJcbiAgICB0aXRsZT86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5Yqo55S75ZCN56ewXHJcbiAgICAgKiAtIHRyYW5zMSDku47kuIvlvoDkuIrvvIjov5vlhaXvvIkgLT4g5LuO5LiL5Yiw5LiK77yI56a75byA77yJXHJcbiAgICAgKiAtIHRyYW5zMiDku47kuIvliLDkuIrvvIjov5vlhaXvvIkgLT4g5LuO5LiL5b6A5LiK77yI56a75byA77yJXHJcbiAgICAgKiAtIHNjYWxlICDmlL7lpKfvvIjov5vlhaXvvIkgLT4g5LuO5LiL5Yiw5LiK77yI56a75byA77yJ57yp5bCPXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvbj86IHN0cmluZztcclxuICAgIC8qKiDov5vlhaXov4fmuKHml7bpl7QgKi9cclxuICAgIGVudGVyPzogbnVtYmVyO1xyXG4gICAgLyoqIOemu+W8gOi/h+a4oeaXtumXtCAqL1xyXG4gICAgbGVhdmU/OiBudW1iZXI7XHJcbiAgICAvKiog5Zue6LCDICovXHJcbiAgICBjYWxsYmFjaz86IFdpbmRvd0NhbGxiYWNrO1xyXG4gICAgLyoqIGh0bWwgfCDnu4Tku7YgKi9cclxuICAgIGNvbnRlbnQ/OiBzdHJpbmcgfCBUeXBlPGFueT47XHJcbiAgICAvKiog56qX5L2T5piv5ZCm5Y+v5pS+5aSn57yp5bCPICovXHJcbiAgICBpc1NjYWxlPzogYm9vbGVhbjtcclxuICAgIC8qKiDmmK/lkKblj6/np7vliqggKi9cclxuICAgIGlzTW92ZT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqICDnu4Tku7blrp7kvotcclxuICAgICAqL1xyXG4gICAgaGFuZGxlcj86IGFueTtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZToganNkb2MtZm9ybWF0XHJcbiAgICAvKiog5Li76aKYIHIgZyBiIHAqL1xyXG4gICAgdGhlbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiDlm57osIMgKi9cclxuZXhwb3J0IGludGVyZmFjZSBXaW5kb3dDYWxsYmFjayB7XHJcbiAgICAvKiog5YWz6Zet5Zue6LCDICovXHJcbiAgICBjbG9zZT8oKTogdm9pZDtcclxuICAgIC8qKiDmnIDlsI/ljJblm57osIMgKi9cclxuICAgIG1pbmltaXplPygpOiB2b2lkO1xyXG4gICAgLyoqIOacgOWkp+WMluWbnuiwgyAqL1xyXG4gICAgbWF4aW1pemU/KCk6IHZvaWQ7XHJcbn1cclxuIl19