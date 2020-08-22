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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvX2FsZXJ0L3dpbmRvdy93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsd0JBQXdCLEVBR3hCLFFBQVEsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNNUMsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQTJCeEIsWUFDWSxRQUFrQixFQUNsQixjQUE4QixFQUM5Qix3QkFBa0Q7UUFGbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQTdCOUQsUUFBRyxHQUFZLElBQUksQ0FBQzs7Ozs7UUF5SnBCLFNBQUk7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFOztrQkFDUixLQUFLLEdBQUc7Z0JBQ1YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU87Z0JBQ3ZCLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPO2FBQzFCOztnQkFDRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ2hELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Z0JBRWpELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxV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OztJQUNiLHVDQUE0Qzs7SUFDNUMsK0JBQXdFOztJQUN4RSxpQ0FBNEU7O0lBQzVFLG9DQUE4Rjs7Ozs7O0lBMEk5RiwrQkF5QkM7Ozs7O0lBdkpHLG1DQUEwQjs7Ozs7SUFDMUIseUNBQXNDOzs7OztJQUN0QyxtREFBMEQ7Ozs7O0FBZ0tsRSxtQ0E2QkM7Ozs7OztJQTNCRyw4QkFBZTs7Ozs7Ozs7SUFPZixrQ0FBbUI7Ozs7O0lBRW5CLDhCQUFlOzs7OztJQUVmLDhCQUFlOzs7OztJQUVmLGlDQUEwQjs7Ozs7SUFFMUIsZ0NBQTZCOzs7OztJQUU3QixnQ0FBa0I7Ozs7O0lBRWxCLCtCQUFpQjs7Ozs7SUFJakIsZ0NBQWM7Ozs7O0lBR2QsOEJBQWU7Ozs7OztBQUluQixvQ0FPQzs7Ozs7O0lBTEcsaURBQWU7Ozs7O0lBRWYsb0RBQWtCOzs7OztJQUVsQixvREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDlvLnnqpfnu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MjY6NTIgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBUeXBlLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZixcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgQ29tcG9uZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgSW5qZWN0b3JcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVFlQRSB9IGZyb20gJy4uLy4uL3NlcnZpY2UvdG9rZW5zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtd2luZG93JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi93aW5kb3cuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2luZG93Q29tcG9uZW50IHtcclxuICAgIG1pbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0aGVtZTogc3RyaW5nO1xyXG4gICAgYW5pbWF0aW9uOiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgaXNTY2FsZTogYm9vbGVhbjtcclxuICAgIGFjdGl2ZTogYm9vbGVhbjtcclxuICAgIGlzTW92ZTogYm9vbGVhbjtcclxuICAgIGNhbGxiYWNrOiBhbnk7XHJcbiAgICBsZWF2ZTogbnVtYmVyO1xyXG4gICAgZW50ZXI6IG51bWJlcjtcclxuICAgIGNvbnRlbnQ6IHN0cmluZyB8IFR5cGU8YW55PjtcclxuICAgIGhhbmRsZXI6IGFueTtcclxuICAgIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFdpbmRvd0NvbXBvbmVudD47XHJcbiAgICBAVmlld0NoaWxkKCdtYXNrJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgbWFzazogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3dpbmRvdycsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIHdpbmRvdzogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIGNvbXBvbmVudDogVmlld0NvbnRhaW5lclJlZjtcclxuICAgIGdldCBlbWJlZGRlZFZpZXdSZWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvb3ROb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXNbMF07XHJcbiAgICB9XHJcbiAgICBnZXQgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoVFlQRSkgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkgeyB9XHJcbiAgICAvKipcclxuICAgICAqIOaUvuWkp+e8qeWwj1xyXG4gICAgICogQHBhcmFtIGUg54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFNpemUoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluKSB7IC8vIOW9k+WJjeeKtuaAgeS4uue8qeWwj++8jOeCueWHu+aUvuWkp1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt0b3A6MDtsZWZ0OjA7JztcclxuICAgICAgICAgICAgdGhpcy5taW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbWF4aW1pemUgPSB0aGlzLmNhbGxiYWNrLm1heGltaXplO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgICAgICAgIG1heGltaXplICYmIG1heGltaXplKCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8g5b2T5YmN54q25oCB5Li65pS+5aSn77yM54K55Ye757yp5bCPXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuX21pblN0eWxlO1xyXG4gICAgICAgICAgICB0aGlzLm1pbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbmltaXplID0gdGhpcy5jYWxsYmFjay5taW5pbWl6ZTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgICAgICBtaW5pbWl6ZSAmJiBtaW5pbWl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+WFs+mXreW8ueeql1xyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGNsb3NlKGU6IGFueSkge1xyXG4gICAgICAgIC8vIOiuvue9ruWFs+mXreaXtueahOa4kOWPmFxyXG4gICAgICAgIC8vIOWwhuihjOWGhXRvcOagt+W8j+a2iOmZpO+8iOS8mOWFiOe6p+acgOmrmOS8muimhueblmNzc+aWh+S7tuS4reeahHRvcOagt+W8j++8ie+8jOS9v2Nzc+S4reemu+W8gOaXtueahHRvcOagt+W8j+eUn+aViO+8jOWQpuWImWNzc+exu3RyYW5zMeWSjHRyYW5zMueahOemu+W8gOa4kOWPmOS4jeeUn+aViFxyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dC5yZXBsYWNlKC90b3A6KC4qKT87LywgJycpO1xyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgJyArIHRoaXMubGVhdmUgLyAxMDAwICsgJ3MnO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAvLyDnp7vpmaRcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5yb290Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25SZWYuZGV0YWNoVmlldyh0aGlzLmVtYmVkZGVkVmlld1JlZik7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBjbG9zZSA9IHRoaXMuY2FsbGJhY2suY2xvc2U7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgICAgICAgY2xvc2UgJiYgY2xvc2UoZSk7XHJcblxyXG4gICAgICAgIH0sIHRoaXMubGVhdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5omT5byA5pON5L2cXHJcbiAgICAgKiBAcGFyYW0gIG9wdGlvbnM/XHJcbiAgICAgKi9cclxuICAgIGJlZm9yZU9wZW4ob3B0aW9ucz86IFdpbmRvd09wdGlvbnMpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyB0aXRsZTogJ+W8ueeqlycsIGFuaW1hdGlvbjogJ3RyYW5zMScsIGVudGVyOiAyMDAsIGxlYXZlOiAyMDAsIGlzU2NhbGU6IGZhbHNlLCBpc01vdmU6IHRydWUsIGNvbnRlbnQ6ICfku4DkuYjkuZ/mnKjmnIl+JywgY2FsbGJhY2s6IHt9LCB0aGVtZTogJycgfSwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnQuY2xlYXIoKTtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoICh0aGlzLmNvbnRlbnQpIGFzIFR5cGU8YW55Pik7XHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb21wb25lbnQuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLnBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOW8ueeql1xyXG4gICAgICovXHJcbiAgICBvcGVuKG9wdGlvbnM/OiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVPcGVuKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMubWFzay5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh0aGlzLmVtYmVkZGVkVmlld1JlZik7XHJcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yb290Tm9kZSk7XHJcbiAgICAgICAgLy8g5bem5Y+z5bGF5Lit77yMdG9w55SoY3Nz5o6n5Yi2XHJcbiAgICAgICAgY29uc3QgdyA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgaCA9IHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIC8vIOW9k+WJjeeql+WPo+Wkp+Wwj++8jHRoaXMud2luZG93LnBhcmVudE5vZGUgPT4gcG9zaXRpb246Zml4ZWQ7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJVxyXG4gICAgICAgIGNvbnN0IHd3ID0gdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIC8vIOWIneWni+WumuS9jVxyXG4gICAgICAgIGNvbnN0IGxlZnRTdHlsZSA9ICdsZWZ0OicgKyAoKHd3IC0gdykgLyAyKSArICdweDsnO1xyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3NzVGV4dCArPSBsZWZ0U3R5bGU7XHJcbiAgICAgICAgLy8g6K6w5b2V5pyA5bCP5YyW5pe255qE5qC35byPXHJcbiAgICAgICAgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5fbWluU3R5bGUgPSBsZWZ0U3R5bGUgKyAnd2lkdGg6JyArICh3ICsgMSkgKyAncHg7aGVpZ2h0OicgKyAoaCArIDEpICsgJ3B4Oyc7XHJcbiAgICAgICAgLy8g6K6+572u5omT5byA5pe255qE5riQ5Y+YXHJcbiAgICAgICAgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAnICsgKHRoaXMuZW50ZXIgLyAxMDAwKSArICdzJztcclxuICAgICAgICAvLyDov5vlhaXmv4DmtLvnirbmgIHvvIjlvLnnqpflgZznlZnvvIlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZlID0gdHJ1ZSk7XHJcbiAgICAgICAgLy8g5Y+W5raI5riQ5Y+Y77yM5ZCm5YiZ56e75Yqo5Lya5pyJ5riQ5Y+YXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcclxuICAgICAgICB9LCB0aGlzLmVudGVyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6Zi75q2i5ouW5ou9XHJcbiAgICAgKiBAcGFyYW0gZSDmi5bmi73kuovku7ZcclxuICAgICAqL1xyXG4gICAgdHJhZ3N0YXJ0KGU6IGFueSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL56e75YqoXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgc3RhcnQoZTogYW55KSB7XHJcbiAgICAgICAgLy8g5YWo5bGP54q25oCB5LiN5Y+v56e75YqoXHJcbiAgICAgICAgaWYgKCF0aGlzLm1pbikgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDnp7vliqjlj4LmlbDkvKDlhaVmYWxzZe+8jOS4jeWPr+enu+WKqFxyXG4gICAgICAgIGlmICghdGhpcy5pc01vdmUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSB7XHJcbiAgICAgICAgICAgIHg6IGUucGFnZVggfHwgZS5jbGllbnRYLFxyXG4gICAgICAgICAgICB5OiBlLnBhZ2VZIHx8IGUuY2xpZW50WVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZGlzID0ge1xyXG4gICAgICAgICAgICB4OiB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQgLSBwb2ludC54LFxyXG4gICAgICAgICAgICB5OiB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtIHBvaW50LnlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuX2RpcyA9IGRpcztcclxuICAgICAgICAvLyDmtY/op4jlmajnqpfkvZNcclxuICAgICAgICB3aW5kb3cub25tb3VzZXVwID0gdGhpcy5lbmQ7XHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gdGhpcy5tb3ZlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBtb3ZlID0gKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvaW50ID0ge1xyXG4gICAgICAgICAgICB4OiBlLnBhZ2VYIHx8IGUuY2xpZW50WCxcclxuICAgICAgICAgICAgeTogZS5wYWdlWSB8fCBlLmNsaWVudFlcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCB0b3AgPSBwb2ludC55ICsgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5fZGlzLnk7XHJcbiAgICAgICAgbGV0IGxlZnQgPSBwb2ludC54ICsgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5fZGlzLng7XHJcbiAgICAgICAgLy8g5b2T5YmN56qX5Y+j5aSn5bCP77yMdGhpcy53aW5kb3cucGFyZW50Tm9kZSA9PiBwb3NpdGlvbjpmaXhlZDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlXHJcbiAgICAgICAgbGV0IG1heFggPSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuY2xpZW50V2lkdGggLSB0aGlzLndpbmRvdy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGxldCBtYXhZID0gdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmNsaWVudEhlaWdodCAtIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGlmIChtYXhYIDwgMCkgeyBtYXhYID0gMDsgfVxyXG4gICAgICAgIGlmIChtYXhZIDwgMCkgeyBtYXhZID0gMDsgfVxyXG4gICAgICAgIC8vIOWIpOaWreaYr+WQpui2iueVjFxyXG4gICAgICAgIGlmICh0b3AgPD0gMCkgeyAvLyB55pa55ZCRXHJcbiAgICAgICAgICAgIHRvcCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3AgPj0gbWF4WSkge1xyXG4gICAgICAgICAgICB0b3AgPSBtYXhZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVmdCA8PSAwKSB7IC8vIHjmlrnlkJFcclxuICAgICAgICAgICAgbGVmdCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZWZ0ID49IG1heFgpIHtcclxuICAgICAgICAgICAgbGVmdCA9IG1heFggLSAxOyAvLyDmtojpmaTor6/lt67vvIzpmLLmraLlj7Pmi4nov4fluqblr7zoh7Tlrr3luqblj5jlsI9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53aW5kb3cubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgIHRoaXMud2luZG93Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLnp7vliqhcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBlbmQoZTogYW55KSB7XHJcbiAgICAgICAgd2luZG93Lm9ubW91c2V1cCA9IG51bGw7XHJcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXaW5kb3dPcHRpb25zIHtcclxuICAgIC8qKiDlvLnnqpfmoIfpopggKi9cclxuICAgIHRpdGxlPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliqjnlLvlkI3np7BcclxuICAgICAqIC0gdHJhbnMxIOS7juS4i+W+gOS4iu+8iOi/m+WFpe+8iSAtPiDku47kuIvliLDkuIrvvIjnprvlvIDvvIlcclxuICAgICAqIC0gdHJhbnMyIOS7juS4i+WIsOS4iu+8iOi/m+WFpe+8iSAtPiDku47kuIvlvoDkuIrvvIjnprvlvIDvvIlcclxuICAgICAqIC0gc2NhbGUgIOaUvuWkp++8iOi/m+WFpe+8iSAtPiDku47kuIvliLDkuIrvvIjnprvlvIDvvInnvKnlsI9cclxuICAgICAqL1xyXG4gICAgYW5pbWF0aW9uPzogc3RyaW5nO1xyXG4gICAgLyoqIOi/m+WFpei/h+a4oeaXtumXtCAqL1xyXG4gICAgZW50ZXI/OiBudW1iZXI7XHJcbiAgICAvKiog56a75byA6L+H5rih5pe26Ze0ICovXHJcbiAgICBsZWF2ZT86IG51bWJlcjtcclxuICAgIC8qKiDlm57osIMgKi9cclxuICAgIGNhbGxiYWNrPzogV2luZG93Q2FsbGJhY2s7XHJcbiAgICAvKiogaHRtbCB8IOe7hOS7tiAqL1xyXG4gICAgY29udGVudD86IHN0cmluZyB8IFR5cGU8YW55PjtcclxuICAgIC8qKiDnqpfkvZPmmK/lkKblj6/mlL7lpKfnvKnlsI8gKi9cclxuICAgIGlzU2NhbGU/OiBib29sZWFuO1xyXG4gICAgLyoqIOaYr+WQpuWPr+enu+WKqCAqL1xyXG4gICAgaXNNb3ZlPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogIOe7hOS7tuWunuS+i1xyXG4gICAgICovXHJcbiAgICBoYW5kbGVyPzogYW55O1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBqc2RvYy1mb3JtYXRcclxuICAgIC8qKiDkuLvpopggciBnIGIgcCovXHJcbiAgICB0aGVtZT86IHN0cmluZztcclxufVxyXG5cclxuLyoqIOWbnuiwgyAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvd0NhbGxiYWNrIHtcclxuICAgIC8qKiDlhbPpl63lm57osIMgKi9cclxuICAgIGNsb3NlPygpOiB2b2lkO1xyXG4gICAgLyoqIOacgOWwj+WMluWbnuiwgyAqL1xyXG4gICAgbWluaW1pemU/KCk6IHZvaWQ7XHJcbiAgICAvKiog5pyA5aSn5YyW5Zue6LCDICovXHJcbiAgICBtYXhpbWl6ZT8oKTogdm9pZDtcclxufVxyXG4iXX0=