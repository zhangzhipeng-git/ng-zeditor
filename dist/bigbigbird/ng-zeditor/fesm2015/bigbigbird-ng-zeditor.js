import { Pipe, Component, ApplicationRef, ViewChild, TemplateRef, InjectionToken, Injector, ComponentFactoryResolver, ElementRef, ViewContainerRef, ReflectiveInjector, Injectable, forwardRef, Input, EventEmitter, ViewEncapsulation, Renderer2, Output, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SafeHtmlPipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{ name: 'safeHTML' },] }
];
/** @nocollapse */
SafeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    SafeHtmlPipe.prototype.sanitizer;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TipComponent {
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
function Options() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TYPE = new InjectionToken('string or function');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WindowComponent {
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
function WindowOptions() { }
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
function WindowCallback() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DomService {
    /**
     * @param {?} injector
     * @param {?} componentResolverFactory
     */
    constructor(injector, componentResolverFactory) {
        this.injector = injector;
        this.componentResolverFactory = componentResolverFactory;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    tost(options) {
        if (!this.toastInstance) {
            /** @type {?} */
            const factory = this.componentResolverFactory.resolveComponentFactory(TipComponent);
            /** @type {?} */
            const componentRef = factory.create(this.injector);
            this.toastInstance = componentRef.instance;
            this.toastInstance.componentRef = componentRef;
        }
        this.toastInstance.open(options);
        return this.toastInstance;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    alert(options) {
        /** @type {?} */
        const factory = this.componentResolverFactory.resolveComponentFactory(WindowComponent);
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const injector = ReflectiveInjector.resolveAndCreate([{ provide: TYPE, useValue: typeof options.content }]);
        /** @type {?} */
        const componentRef = factory.create(injector);
        /** @type {?} */
        const instance = componentRef.instance;
        instance.componentRef = componentRef;
        instance.open(options);
    }
}
DomService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomService.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver }
];
if (false) {
    /**
     * tost实例
     * @type {?}
     * @private
     */
    DomService.prototype.toastInstance;
    /**
     * @type {?}
     * @private
     */
    DomService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    DomService.prototype.componentResolverFactory;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UILinkComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        /**
         * 是否在新窗口打开
         */
        this.checked = false;
        /**
         * 标题
         */
        this.title = '';
        /**
         * url
         */
        this.url = 'https://';
        /**
         * 内容
         */
        this.content = '';
    }
    /**
     * 发射form
     * @return {?}
     */
    emitLinkHTML() {
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            this.domService.tost({
                text: '链接地址不规范'
            });
            return;
        }
        if (!this.content) {
            this.domService.tost({
                text: '请填写内容'
            });
            return;
        }
        /** @type {?} */
        const html = '<a href="' +
            this.url +
            '" ' +
            (this.checked ? 'target="_blank"' : '') +
            (this.title ? 'title=' + this.title : '') +
            '>' +
            this.content +
            '</a>';
        if (this.handler.recieveLinkHTML(html)) {
            this.parent.close();
        }
    }
}
UILinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-link',
                template: "\r\n<div class=\"z-editor-link\">\r\n  <ul>\r\n    <li>\r\n      <label for=\"ui-link-title\">\u6807\u9898</label>\r\n      <input placeholder=\"\u53EF\u4E0D\u586B~\" id=\"ui-link-title\" type=\"text\" [(ngModel)]=\"title\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-rul\">\u94FE\u63A5</label>\r\n      <input placeholder=\"http://\" id=\"ui-link-rul\" type=\"text\" [(ngModel)]=\"url\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-content\">\u5185\u5BB9</label>\r\n      <input id=\"ui-link-content\" type=\"text\" [(ngModel)]=\"content\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-checkbox\">\u65B0\u7A97\u53E3\u6253\u5F00</label>\r\n      <app-checkbox [id]=\"'ui-link-checkbox'\" [(ngModel)]=\"checked\"></app-checkbox>\r\n    </li>\r\n  </ul>\r\n  <div class=\"wd-btn-group\">\r\n    <button (click)=\"parent.close()\">\u53D6\u6D88</button>\r\n    <button (click)=\"emitLinkHTML()\">\u786E\u8BA4</button>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
UILinkComponent.ctorParameters = () => [
    { type: DomService }
];
if (false) {
    /**
     * 是否在新窗口打开
     * @type {?}
     */
    UILinkComponent.prototype.checked;
    /**
     * 标题
     * @type {?}
     */
    UILinkComponent.prototype.title;
    /**
     * url
     * @type {?}
     */
    UILinkComponent.prototype.url;
    /**
     * 内容
     * @type {?}
     */
    UILinkComponent.prototype.content;
    /** @type {?} */
    UILinkComponent.prototype.handler;
    /** @type {?} */
    UILinkComponent.prototype.parent;
    /**
     * @type {?}
     * @private
     */
    UILinkComponent.prototype.domService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UITableComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        /**
         * 行数
         */
        this.row = '2';
        /**
         * 列数
         */
        this.col = '2';
    }
    /**
     * @return {?}
     */
    emitTableHTML() {
        /** @type {?} */
        const reg = /[1-9]{1,2}/;
        if (!reg.test(this.row)) {
            this.domService.tost({
                text: '行数不合要求~'
            });
            return;
        }
        if (!reg.test(this.col)) {
            this.domService.tost({
                text: '列数不合要求~'
            });
            return;
        }
        /** @type {?} */
        let html = '<div><table style="width:100%"><tbody>';
        /** @type {?} */
        const r = Number(this.row);
        /** @type {?} */
        const c = Number(this.col);
        for (let i = 0; i < r; i++) {
            /** @type {?} */
            let tr = '<tr>';
            for (let j = 0; j < c; j++) {
                tr += '<td>' /* + input */ + '</td>';
            }
            html += tr + '</tr>';
        }
        html += '</tbody></table></div><p><br/></p>';
        if (this.handler.recieveTableHTML(html)) {
            this.parent.close();
        }
    }
}
UITableComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-table',
                template: "\r\n<div class=\"z-editor-table\">\r\n  <ul>\r\n    <li>\r\n      <label for=\"ui-table-row\">\u884C\u6570</label>\r\n      <input id=\"ui-table-row\" type=\"text\" [(ngModel)]=\"row\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-table-col\">\u5217\u6570</label>\r\n      <input id=\"ui-table-col\" type=\"text\" [(ngModel)]=\"col\" />\r\n    </li>\r\n  </ul>\r\n  <div class=\"wd-btn-group\">\r\n    <button (click)=\"parent.close()\">\u53D6\u6D88</button>\r\n    <button (click)=\"emitTableHTML()\">\u786E\u8BA4</button>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
UITableComponent.ctorParameters = () => [
    { type: DomService }
];
if (false) {
    /**
     * 行数
     * @type {?}
     */
    UITableComponent.prototype.row;
    /**
     * 列数
     * @type {?}
     */
    UITableComponent.prototype.col;
    /** @type {?} */
    UITableComponent.prototype.handler;
    /** @type {?} */
    UITableComponent.prototype.parent;
    /**
     * @type {?}
     * @private
     */
    UITableComponent.prototype.domService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UIAnnexComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        this.url = 'https://';
        this.width = '100%';
        this.height = '200px';
        /**
         * 获取类型对应的名称
         */
        this.typeName = '图片';
        /**
         * 重渲染input file
         */
        this.rebuild = true;
        this.radioGroup = [{ value: 'image', text: '图片' }, { value: 'audio', text: '音频' }, { value: 'video', text: '视频' }];
        // tslint:disable-next-line: variable-name
        this._type = 'image';
        /**
         * 选择文件
         */
        this.fileChange = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const files = this.file.nativeElement.files;
            /** @type {?} */
            const file = files[0];
            if (!files.length) {
                return;
            }
            this.rebuild = false;
            setTimeout((/**
             * @return {?}
             */
            () => { this.rebuild = true; }));
            // 编辑器实例
            /** @type {?} */
            const handler = this.handler;
            // 获取编辑器banner配置参数
            /** @type {?} */
            const option = handler.options$[this.type] || {};
            // 标签
            /** @type {?} */
            const tag = { image: 'IMG', audio: 'AUDIO', video: 'VIDEO' }[this.type];
            // 判断文件是否超过数量
            if (handler.pannel.getElementsByTagName(tag).length >= (option.count || 1)) {
                this.domService.tost({
                    text: `${this.typeName}已超出最大数量`
                });
                return;
            }
            // 判断文件是否需转成base64
            /** @type {?} */
            const base64size = option.base64 || 0;
            if (base64size && file.size <= base64size) {
                // 转成base64
                /** @type {?} */
                const fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (handler.recieveLocalFileHTML(this.getFileHTML(event.target.result))) {
                        this.parent.close();
                    }
                });
            }
            else {
                // 交给外部进行处理
                /** @type {?} */
                const tip = this.domService.tost({
                    text: '上传中~',
                    duration: -1
                });
                // tslint:disable-next-line: no-unused-expression
                handler.emitUploadFile && handler.emitUploadFile(this.type, file, this.getFileHTML, (/**
                 * @param {?} isSuccess
                 * @param {?=} t
                 * @return {?}
                 */
                (isSuccess, t) => {
                    if (isSuccess) { // 上传成功
                        tip.close();
                        this.parent.close();
                        return;
                    }
                    if (!t) { // 上传失败
                        tip.close();
                        this.parent.close();
                        tip.open({ text: '上传失败~' });
                        return;
                    }
                    // 上传超时
                    /** @type {?} */
                    const timer = setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        clearTimeout(timer);
                        tip.close();
                        this.parent.close();
                        tip.open({ text: '上传超时~' });
                    }), t);
                }));
            }
        });
        /**
         * 传入src并根据类型获取文件html
         */
        this.getFileHTML = (/**
         * @param {?} src
         * @return {?}
         */
        (src) => {
            /** @type {?} */
            let html = '';
            switch (this.type) {
                case 'image':
                    html = this.getImageHTML(src);
                    break;
                case 'audio':
                    html = this.getAudioHTML(src);
                    break;
                case 'video':
                    html = this.getVideoHTML(src);
                    break;
            }
            return html;
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set type(v) {
        this._type = v;
        this.typeName = { image: '图片', audio: '音频', video: '视频' }[v];
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * 点击本地上传
     * @return {?}
     */
    selectFile() {
        // 需要先设置宽度和高度
        /** @type {?} */
        const num = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?$/i;
        if (!num.test(this.width + '') || !num.test(this.height + '')) {
            this.domService.tost({
                text: `上传${this.typeName}前请填写合适的高度和宽度~`
            });
            return;
        }
        /** @type {?} */
        const file = this.file.nativeElement;
        /** @type {?} */
        const arr = {
            image: UIAnnexComponent.IMAGEARR,
            audio: UIAnnexComponent.AUDIOARR,
            video: UIAnnexComponent.VIDEOARR,
        }[this.type];
        file.accept = arr.join(',');
        if ('onchange' in file) {
            file.onchange = this.fileChange;
        }
        else {
            file.onpropertychange = this.fileChange;
        }
        file.click();
    }
    /**
     * 插入外链
     * @return {?}
     */
    insertOutLink() {
        /** @type {?} */
        const hasperc = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?$/i;
        if (!hasperc.test(this.width)) {
            this.domService.tost({
                text: '请填写合适的宽度~'
            });
            return;
        }
        if (!hasperc.test(this.height)) {
            this.domService.tost({
                text: '请填写合适的高度~'
            });
            return;
        }
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            this.domService.tost({
                text: '链接地址不规范'
            });
            return;
        }
        /** @type {?} */
        const html = this.getFileHTML(this.url);
        if (this.handler.recieveFileLinkHTML(html)) {
            this.parent.close();
            this.parent = null;
        }
    }
    /**
     * 获取插入图片的HTML
     * @param {?} src url或base64
     * @return {?}
     */
    getImageHTML(src) {
        return ('<p style="height:' +
            this.height +
            ';">' +
            '<img src="' +
            src +
            '" style="height:' +
            this.height +
            ';width:' +
            this.width +
            ';object-fit:cover;" />' +
            '</p><br/>');
    }
    /**
     * 获取插入音频的HTML
     * @param {?} src url
     * @return {?}
     */
    getAudioHTML(src) {
        /** @type {?} */
        const arr = UIAnnexComponent.AUDIOARR;
        // tslint:disable-next-line: max-line-length
        /** @type {?} */
        let html = '<p style="text-align:center;height:' + this.height + ';"><audio controls style="display:inline-block;height:' + '100%' + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Audio标签。';
        html += '</audio>&#8205;&zwj;</p><br/>';
        return html;
    }
    /**
     * 获取插入视频的HTML
     * @param {?} src
     * @return {?}
     */
    getVideoHTML(src) {
        /** @type {?} */
        const arr = UIAnnexComponent.VIDEOARR;
        // tslint:disable-next-line: max-line-length
        /** @type {?} */
        let html = '<p style="text-align:center;height:' + this.height + ';"><video controls style="display:inline-block;height:' + '100%' + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Video标签。';
        html += '</video>&#8205;&zwj;</p><br/>';
        return html;
    }
}
/**
 * 图片类型
 */
UIAnnexComponent.IMAGEARR = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
UIAnnexComponent.AUDIOARR = ['audio/mp3', 'audio/ogg', 'audio/wav'];
UIAnnexComponent.VIDEOARR = ['video/mp4', 'video/ogg', 'video/webm'];
UIAnnexComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-annex',
                template: "\r\n<div class=\"z-editor-annex\">\r\n  <ul>\r\n    <li>\r\n      <button class=\"wd-upload-local\" (click)=\"selectFile()\">\r\n        \u672C\u5730\u4E0A\u4F20{{typeName}} +\r\n      </button>\r\n      <input *ngIf=\"rebuild\" #file class=\"wd-edit-file\" type=\"file\" />\r\n    </li>\r\n    <li>\r\n      <label>\u7C7B\u578B</label>\r\n      <app-radio-group [(ngModel)]=\"type\" [radioGroup]=\"radioGroup\" class=\"wd-radio-group-type\"></app-radio-group>\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-width\">\u5BBD\u5EA6</label>\r\n      <input id=\"wd-annex-width\" type=\"text\" [(ngModel)]=\"width\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-height\">\u9AD8\u5EA6</label>\r\n      <input id=\"wd-annex-height\" type=\"text\" [(ngModel)]=\"height\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-link\">\u5916\u94FE</label>\r\n      <input placeholder=\"https://\" id=\"wd-annex-link\" type=\"text\" [(ngModel)]=\"url\" />\r\n    </li>\r\n    <li>\r\n      <button (click)=\"insertOutLink()\" class=\"wd-use-link-confirm\">\u63D2\u5165\u5916\u94FE</button>\r\n    </li>\r\n  </ul>\r\n</div>"
            }] }
];
/** @nocollapse */
UIAnnexComponent.ctorParameters = () => [
    { type: DomService }
];
UIAnnexComponent.propDecorators = {
    file: [{ type: ViewChild, args: ['file', { static: false, read: ElementRef },] }]
};
if (false) {
    /**
     * 图片类型
     * @type {?}
     */
    UIAnnexComponent.IMAGEARR;
    /** @type {?} */
    UIAnnexComponent.AUDIOARR;
    /** @type {?} */
    UIAnnexComponent.VIDEOARR;
    /** @type {?} */
    UIAnnexComponent.prototype.url;
    /** @type {?} */
    UIAnnexComponent.prototype.width;
    /** @type {?} */
    UIAnnexComponent.prototype.height;
    /**
     * 获取类型对应的名称
     * @type {?}
     */
    UIAnnexComponent.prototype.typeName;
    /**
     * 重渲染input file
     * @type {?}
     */
    UIAnnexComponent.prototype.rebuild;
    /** @type {?} */
    UIAnnexComponent.prototype.radioGroup;
    /** @type {?} */
    UIAnnexComponent.prototype.file;
    /** @type {?} */
    UIAnnexComponent.prototype._type;
    /** @type {?} */
    UIAnnexComponent.prototype.handler;
    /** @type {?} */
    UIAnnexComponent.prototype.parent;
    /**
     * 选择文件
     * @type {?}
     */
    UIAnnexComponent.prototype.fileChange;
    /**
     * 传入src并根据类型获取文件html
     * @type {?}
     */
    UIAnnexComponent.prototype.getFileHTML;
    /**
     * @type {?}
     * @private
     */
    UIAnnexComponent.prototype.domService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CheckBoxComponent {
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
function Checkbox() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadioGroupComponent {
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
function Radio() { }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 通用工具类
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:36:21 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
class CommonUtil {
    /**
     * 根据元素id找元素
     * @param {?} id 元素id
     * @return {?}
     */
    static id(id) {
        return document.getElementById(id);
    }
    /**
     * 判断是否ie
     * @return {?}
     */
    static isIE() {
        return !!(((/** @type {?} */ (window))).ActiveXObject || 'ActiveXObject' in window);
    }
    /**
     * 找上一个节点
     * @param {?} node 节点
     * @return {?}
     */
    static preSibling(node) {
        /** @type {?} */
        let pre = node;
        // tslint:disable-next-line: no-conditional-assignment curly
        while ((pre = pre.previousSibling) && pre.nodeType !== 1)
            ;
        return pre;
    }
    /**
     * 找元素的所有子节点
     * @param {?} p 父元素
     * @param {?=} arr
     * @return {?}
     */
    static getAllChilds(p, arr = []) {
        arr.push(p);
        // tslint:disable-next-line: curly
        if (!p.children || !p.children.length)
            return arr;
        Array.prototype.forEach.call(p.children, (/**
         * @param {?} child
         * @return {?}
         */
        (child) => {
            arr = this.getAllChilds(child, arr);
        }));
        return arr;
    }
    /**
     * 判断p是否包含c
     * @param {?} p 元素
     * @param {?} c 元素
     * @return {?}
     */
    static contains(p, c) {
        if (p.contains) { // firefox不支持
            return p.contains(c);
        }
        // 找p的所有子节点
        /** @type {?} */
        const childs = this.getAllChilds(p);
        for (let i = 0, len = childs.length; i < len; i++) {
            // tslint:disable-next-line: curly
            if (childs[i] === c)
                return true;
        }
        // tslint:disable-next-line: curly
        if (p === c)
            return true;
        return false;
    }
    /**
     * 从低层次往高层次找第index个父节点，没有则返回null
     * @param {?} el 目标元素
     * @param {?=} index 第index个父元素
     * @return {?}
     */
    static parent(el, index = 1) {
        /** @type {?} */
        let count = index + 1;
        while (el && --count) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            el = ((/** @type {?} */ (el.parentNode)));
        }
        return el;
    }
    /**
     * rgb颜色串转以#开头的16进制颜色串
     * @param {?} str rgb颜色串
     * @return {?}
     */
    static rgbToHex(str) {
        if (!str) {
            return '';
        }
        if (str.charAt(0) === '#') {
            return str;
        }
        if (str.indexOf('rgb(') < 0) {
            return '';
        }
        str = str.slice(4, -1);
        /** @type {?} */
        const arr = str.split(',');
        /** @type {?} */
        let str$ = '#';
        arr.forEach((/**
         * @param {?} num
         * @return {?}
         */
        (num) => {
            /** @type {?} */
            let dimStr = Number(num).toString(16);
            dimStr = dimStr.length < 2 ? '0' + dimStr : dimStr;
            str$ += dimStr;
        }));
        return str$;
    }
    /**
     * 将多维数组变为一维数组
     * @param {?} arr 多维数组
     * @param {?=} box 容器
     * @return {?}
     */
    static flat(arr, box) {
        // tslint:disable-next-line: curly
        if (!box)
            box = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            /** @type {?} */
            const e = arr[i];
            if (e instanceof Array) {
                this.flat(e, box);
                continue;
            }
            box.push(e);
        }
        return box;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 光标工具类
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:36:44 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
/**
 * 旧标准Range对象（只列出常用的一些属性和方法）
 * @record
 */
function TextRange() { }
if (false) {
    /** @type {?} */
    TextRange.prototype.htmlText;
    /** @type {?} */
    TextRange.prototype.text;
    /**
     * @param {?} html
     * @return {?}
     */
    TextRange.prototype.pasteHTML = function (html) { };
    /**
     * @param {?} isEnd
     * @return {?}
     */
    TextRange.prototype.collapse = function (isEnd) { };
    /**
     * @param {?} type
     * @param {?} offset
     * @return {?}
     */
    TextRange.prototype.move = function (type, offset) { };
    /**
     * @param {?} type
     * @param {?} offset
     * @return {?}
     */
    TextRange.prototype.moveEnd = function (type, offset) { };
    /**
     * @param {?} type
     * @param {?} offset
     * @return {?}
     */
    TextRange.prototype.moveStart = function (type, offset) { };
    /**
     * @param {?} node
     * @return {?}
     */
    TextRange.prototype.moveToElementText = function (node) { };
    /**
     * @return {?}
     */
    TextRange.prototype.select = function () { };
    /**
     * @return {?}
     */
    TextRange.prototype.parentElement = function () { };
}
/**
 * 选区和范围工具类
 */
class CursorUtil {
    /**
     * 获取选区
     * @param {?=} elem
     * @return {?} Selection | TextRange
     */
    static getSelection(elem) {
        /** @type {?} */
        let selection;
        // tslint:disable-next-line: curly
        if (elem && document.activeElement !== elem)
            elem.focus();
        if (window.getSelection) {
            selection = window.getSelection();
        }
        else if (document.getSelection) {
            selection = document.getSelection();
        }
        else {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            selection = ((/** @type {?} */ (document))).body.createRange();
        }
        return selection;
    }
    /**
     * 设置第一个范围
     * @param {?} range 范围
     * @return {?}
     */
    static setFirstRange(range) {
        /** @type {?} */
        const selection = this.getSelection();
        // 新标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).addRange) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).removeAllRanges();
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).addRange((/** @type {?} */ (range)));
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))) = (/** @type {?} */ (range));
    }
    /**
     * 获取范围
     * @param {?} index 范围下标
     * @param {?=} elem
     * @return {?} Range | TextRange
     */
    static getRange(index, elem) {
        /** @type {?} */
        const selection = this.getSelection(elem);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).getRangeAt && ((/** @type {?} */ (selection))).rangeCount) { // 新标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (selection))).getRangeAt(index);
        }
        else { // 旧标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (selection)));
        }
    }
    /**
     * 选中元素elem的内容
     * @param {?} elem
     * @return {?}
     */
    static selectSelectionElementChilds(elem) {
        // tslint:disable-next-line: curly
        if (!elem)
            return;
        /** @type {?} */
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).selectAllChildren) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).selectAllChildren(elem);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).moveToElementText(elem);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).select();
    }
    /**
     * 设置选区到某个元素，并折叠
     * @param {?} elem 元素，该元素可以是不可聚焦的元素
     * @param {?} isStart 是否折叠到开头
     * @return {?}
     */
    static setSelectionToElement(elem, isStart) {
        this.selectSelectionElementChilds(elem);
        /** @type {?} */
        const selection = this.getSelection();
        // 新标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (isStart && ((/** @type {?} */ (selection))).collapseToStart) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).collapseToStart();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (!isStart && ((/** @type {?} */ (selection))).collapseToEnd) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).collapseToEnd();
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).collapse(!isStart);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).select();
    }
    /**
     * 获取选区的选中的文本
     * @return {?} string 选区文本
     */
    static getSelectionText() {
        /** @type {?} */
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return ((/** @type {?} */ (selection))).toString() || ((/** @type {?} */ (selection))).text;
    }
    /**
     * 获取下标为index的范围文本
     * @param {?=} index ? 范围下标，旧标准就只有一个
     * @return {?} string
     */
    static getRangeText(index = 0) {
        /** @type {?} */
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return ((/** @type {?} */ (range))).toString() || ((/** @type {?} */ (range))).text;
    }
    /**
     * 获取range起始位置和结束位置的最浅的父元素
     *
     * 比如：\<p\>(range-start)123(range-end)\</p\>的公共父元素为text，而不是p标签
     * @param {?=} index
     * @return {?} Node
     */
    static getRangeCommonParent(index = 0) {
        /** @type {?} */
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).commonAncestorContainer) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (range))).commonAncestorContainer;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return ((/** @type {?} */ (range))).parentElement();
    }
    /**
     * 删除选中内容
     * @param {?=} index
     * @return {?}
     */
    static deleteRangeContent(index = 0) {
        /** @type {?} */
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).deleteContents) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (range))).deleteContents();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).pasteHTML('');
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).select();
    }
    /**
     * 插入节点
     * @param {?} node 节点
     * @param {?=} index
     * @return {?}
     */
    static insertNode(node, index = 0) {
        this.deleteRangeContent(index);
        /** @type {?} */
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).insertNode) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (range))).insertNode(node);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).pasteHTML(((/** @type {?} */ (node))).outerHTML);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).select();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * 编辑器配置参数
 * @record
 */
function Options$1() { }
if (false) {
    /**
     * 编辑内容的最大字节数
     * @type {?}
     */
    Options$1.prototype.maxsize;
    /**
     * 上传超时 ms
     * @type {?}
     */
    Options$1.prototype.timeout;
    /**
     * 上传图片的配置参数
     * @type {?}
     */
    Options$1.prototype.image;
    /**
     * 上传视频的配置参数
     * @type {?}
     */
    Options$1.prototype.video;
    /**
     * 上传音频的配置参数
     * @type {?}
     */
    Options$1.prototype.music;
}
class AppZeditorComponent {
    /**
     * @param {?} render2
     * @param {?} domService
     */
    constructor(render2, domService) {
        this.render2 = render2;
        this.domService = domService;
        /**
         * 传入的html
         */
        this.vhtml = '<p>请输入内容~</p>';
        // tslint:disable-next-line: no-output-on-prefix
        this.onInput = new EventEmitter();
        /**
         * 是否有按钮
         */
        this.hasBtn = false;
        this.recieveContent = new EventEmitter();
        /**
         * 参数配置
         */
        this.options$ = { maxsize: 65535, timeout: 10000, image: { count: 5, base64: 60000 }, audio: { count: 1 }, video: { count: 1 } };
        /**
         * 主题
         */
        this.theme = 'g';
        /**
         * 上传文件
         */
        this.uploadFile = new EventEmitter();
        /**
         * 字体样式
         */
        // tslint:disable-next-line: max-line-length
        this.fontFamilys = [{ key: 'arial', value: 'arial' }, { key: '微软雅黑', value: 'Microsoft Yahei' }, { key: '宋体', value: 'SimSun' }, { key: '黑体', value: 'SimHei' }, { key: '楷体', value: 'KaiTi' }, { key: '宋体', value: 'SimSun' }, { key: '新宋体', value: 'NSimSun' }, { key: '仿宋', value: 'FangSong' }, { key: '微软正黑体', value: 'Microsoft JhengHei' }, { key: '华文琥珀', value: 'STHupo' }, { key: '华文彩云', value: 'STCaiyun' }, { key: '幼圆', value: 'YouYuan' }, { key: '华文行楷', value: 'STXingkai' }];
        /**
         * 文本格式
         */
        // tslint:disable-next-line: max-line-length
        this.formatBlocks = [{ key: 'p', value: '<p data-index="0">p</p>' }, { key: 'h6', value: '<h6 data-index="1">h6</h6>' }, { key: 'h5', value: '<h5 data-index="2">h5</h5>' }, { key: 'h4', value: '<h4 data-index="3">h4</h4>' }, { key: 'h3', value: '<h3 data-index="4">h3</h3>' }, { key: 'h2', value: '<h2 data-index="5">h2</h2>' }, { key: 'h1', value: '<h1 data-index="6">h1</h1>' }];
        /**
         * 颜色
         */
        // tslint:disable-next-line: max-line-length
        this.colors = [['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646'], ['#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada'], ['#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5'], ['#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#92cddc', '#fac08f'], ['#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#31859b', '#e36c09'], ['#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#205867', '#974806'], ['#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050', '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0']];
        /**
         * 字体大小
         */
        // tslint:disable-next-line: max-line-length
        this.fontSizes = [{ key: 'x-small', value: '1', value$: 10 / 16 }, { key: 'small', value: '2', value$: 12 / 16 }, { key: 'medium', value: '3', value$: 16 / 16 }, { key: 'large', value: '4', value$: 18 / 16 }, { key: 'x-large', value: '5', value$: 24 / 16 }, { key: 'xx-large', value: '6', value$: 32 / 16 }, { key: 'xxx-large', value: '7', value$: 48 / 16 }];
        /**
         * code
         */
        this.codes = ['Html', 'Css', 'Javascript', 'TypeScript', 'Sass', 'Java', 'Xml', 'Sql', 'Shell'];
        /**
         * 选中的字样
         */
        this.fontFamily = { key: '微软雅黑', value: 'Microsoft Yahei' };
        /**
         * 选中的字号
         */
        this.fontSize = { key: 'small', value: 2, value$: 12 / 16 }; // 默认.75rem;
        // 默认.75rem;
        /**
         * 文本格式
         */
        this.formatBlock = 'p';
        /**
         * 字体颜色
         */
        this.foreColor = 'black';
        /**
         * 高亮色
         */
        this.backColor = 'white';
        /**
         * 当前代码语言
         */
        this.code = 'Javascript';
        /**
         * 是否打开字样面板
         */
        this.switchFontFamilyPannel = false;
        /**
         * 是否打开字号面板
         */
        this.switchFontSizePannel = false;
        /**
         * 是否打开文本格式面板
         */
        this.switchFormatBlockPannel = false;
        /**
         * 是否打开字体颜色面板
         */
        this.switchForeColorPannel = false;
        /**
         * 是否打开背景色面板
         */
        this.switchBackColorPannel = false;
        /**
         * 是否打开代码语言面板
         */
        this.switchCodePannel = false;
        /**
         * 是否加粗
         */
        this.isBold = false;
        /**
         * 是否斜体
         */
        this.isItalic = false;
        /**
         * 是否下划线
         */
        this.isUnderline = false;
        /**
         * 是否删除线
         */
        this.isStrikeThrough = false;
        /**
         * 默认无上下标
         */
        this.scriptActive = '';
        /**
         * 默认左对齐
         */
        this.justifyActive = 'justifyLeft';
        /**
         * 是否处于编辑状态中
         */
        this.isInEditStatus = false;
        /**
         * 是否全屏, 默认false
         */
        this.full = false;
        /**
         * 是否在代码区, 默认false
         */
        this.inCode = false;
        this.onChange = (/**
         * @return {?}
         */
        () => undefined);
        this.onTouched = (/**
         * @return {?}
         */
        () => undefined);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set options(v) {
        Object.assign(this.options$, v);
    }
    /**
     * 编辑条
     * @return {?}
     */
    get header() {
        return this.headerRef.nativeElement;
    }
    /**
     * 编辑器
     * @return {?}
     */
    get editor() {
        return this.editorRef.nativeElement;
    }
    /**
     * 编辑面板
     * @return {?}
     */
    get pannel() {
        return this.pannelRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get footer() {
        return this.footerRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get fontNameEl() {
        return this.fontNameRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get fontSizeEl() {
        return this.fontSizeRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get formatBlockEl() {
        return this.formatBlockRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get foreColorEl() {
        return this.foreColorRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get backColorEl() {
        return this.backColorRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get codeEl() {
        return this.codeRef.nativeElement;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined) {
            this.vhtml = obj;
        }
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
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initFormatData();
        this.parent = this.render2.parentNode(this.editor);
    }
    /**
     * 初始化默认格式
     * @return {?}
     */
    initFormatData() {
        Object.assign(this, AppZeditorComponent.FORMAT);
    }
    /**
     * 如果面板不聚焦则使面板聚焦
     * @return {?}
     */
    pannelFocus() {
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
    }
    /**
     * 设置字样
     * @param {?} e 事件
     * @return {?}
     */
    setFontName(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFontFamilyPannel = !this.switchFontFamilyPannel;
        if (index === null || index === undefined) {
            return;
        }
        this.fontFamily = this.fontFamilys[index * 1];
        this.cmd('fontName', false, this.fontFamily.value);
    }
    /**
     * 设置字号
     * @param {?} e
     * @return {?}
     */
    setFontSize(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFontSizePannel = !this.switchFontSizePannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const fontSize = this.fontSizes[index * 1];
        this.fontSize = fontSize;
        this.cmd('fontSize', false, fontSize.value);
    }
    /**
     * 设置文本格式
     * @param {?} e 事件
     * @return {?}
     */
    setFormatBlock(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFormatBlockPannel = !this.switchFormatBlockPannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const formatBlock = this.formatBlocks[index * 1];
        this.formatBlock = formatBlock.key;
        this.cmd('formatBlock', false, '<' + this.formatBlock + '>');
    }
    /**
     * 设置前景色
     * @param {?} e 事件
     * @return {?}
     */
    setForeColor(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const x = t.getAttribute('data-dim1');
        /** @type {?} */
        const y = t.getAttribute('data-dim2');
        this.switchForeColorPannel = !this.switchForeColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.foreColor = this.colors[x][y];
        this.cmd('foreColor', false, this.foreColor);
    }
    /**
     * 设置背景色(高亮色)
     * @param {?} e 事件
     * @return {?}
     */
    setBackColor(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const x = t.getAttribute('data-dim1');
        /** @type {?} */
        const y = t.getAttribute('data-dim2');
        this.switchBackColorPannel = !this.switchBackColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.backColor = this.colors[x][y];
        this.cmd('backColor', false, this.backColor);
    }
    /**
     * 设置代码语言
     * @param {?} e 事件
     * @return {?}
     */
    insertCode(e) {
        this.ensureFocus(e);
        this.switchCodePannel = !this.switchCodePannel;
        /** @type {?} */
        const index = e.target.getAttribute('data-index');
        if (index === null) {
            return;
        }
        this.code = this.codes[index];
        /** @type {?} */
        const code = this.code.toLowerCase();
        /** @type {?} */
        const id = (Math.random() + '').slice(2, 8);
        /** @type {?} */
        const html = `<pre style="white-space:pre;" title="代码区"><code class="${code}"><p id="${id}"><br/></p></code></pre><p><br/></p>`;
        this.cmd('insertHTML', false, html);
        // 插入html后，将光标移至代码区的p标签中
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        CursorUtil.setSelectionToElement((/** @type {?} */ ((CommonUtil.id(id)))), true);
        this.setRange(); // 手动记录一下光标位置
    }
    /**
     * 行内换行（shift+enter）
     * @param {?} e 事件
     * @return {?}
     */
    insertBrOnReturn(e) {
        this.ensureFocus(e);
        if (!this.isSupport('insertBrOnReturn')) {
            this.cmd('insertHTML', false, '<br><br>');
            return;
        }
        this.cmd('insertBrOnReturn', false);
    }
    /**
     * 设置粗体
     * @param {?} e
     * @return {?}
     */
    switchBold(e) {
        this.ensureFocus(e);
        this.cmd('bold', false, '');
        this.isBold = !this.isBold;
    }
    /**
     * 设置斜体
     * @param {?} e
     * @return {?}
     */
    switchItalic(e) {
        this.ensureFocus(e);
        this.cmd('italic', false, '');
        this.isItalic = !this.isItalic;
    }
    /**
     * 设置下划线
     * @param {?} e
     * @return {?}
     */
    switchUnderline(e) {
        this.ensureFocus(e);
        this.cmd('underline', false, '');
        this.isUnderline = !this.isUnderline;
    }
    /**
     * 设置删除线
     * @param {?} e
     * @return {?}
     */
    switchStrikeThrough(e) {
        this.ensureFocus(e);
        this.cmd('strikeThrough', false, '');
        this.isStrikeThrough = !this.isStrikeThrough;
    }
    /**
     * 设置/取消上/下标
     * @param {?} e
     * @param {?} cmd
     * @return {?}
     */
    setScript(e, cmd) {
        this.ensureFocus(e);
        if (this.scriptActive === cmd) {
            this.cmd(cmd, false, '');
            this.scriptActive = '';
            return;
        }
        this.scriptActive = cmd;
        this.cmd(cmd, false, '');
    }
    /**
     * 设置文字对齐方向
     * @param {?} e 事件
     * @param {?} str
     * @return {?}
     */
    setJustifyactive(e, str) {
        this.ensureFocus(e);
        this.justifyActive = 'justify' + str;
        this.cmd(this.justifyActive, false);
    }
    /**
     * 缩进
     * @param {?} e
     * @return {?}
     */
    indent(e) {
        this.ensureFocus(e);
        this.cmd('indent', false, '');
    }
    /**
     * 减少缩进
     * @param {?} e
     * @return {?}
     */
    outdent(e) {
        this.ensureFocus(e);
        this.cmd('outdent', false, '');
    }
    /**
     * 插入有序列表
     * @param {?} e
     * @return {?}
     */
    insertOrderedList(e) {
        this.ensureFocus(e);
        this.cmd('insertOrderedList', false, '');
    }
    /**
     * 插入无序列表
     * @param {?} e
     * @return {?}
     */
    insertUnorderedList(e) {
        this.ensureFocus(e);
        this.cmd('insertUnorderedList', false, '');
    }
    /**
     * 插入表格调起插入表格UI
     * @param {?} e
     * @return {?}
     */
    insertTable(e) {
        this.alert({ title: '插入表格', animation: 'scale', content: UITableComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击表格UI弹窗确认时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveTableHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 插入超链接调起插入超链接UI
     * @param {?} e 事件
     * @return {?}
     */
    insertLink(e) {
        this.alert({ title: '插入链接', animation: 'scale', content: UILinkComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击超链接UI弹窗确认时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveLinkHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 插入图片调起插入图片UI
     * @param {?} e 事件
     * @return {?}
     */
    insertFile(e) {
        this.alert({ title: '插入文件', animation: 'scale', content: UIAnnexComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击上传文件UI弹窗上传本地文件时嵌入base64时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveLocalFileHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 点击上传文件UI弹窗“插入外链”时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveFileLinkHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 发射选择文件事件
     * @param {?} type 文件类型
     * @param {?} file 文件
     * @param {?} parser 传入src获取html
     * @param {?} close  关闭弹窗和遮罩
     * @return {?}
     */
    emitUploadFile(type, file, parser, close) {
        this.uploadFile.emit({
            type, file, callback: (/**
             * @param {?} src
             * @param {?=} t
             * @return {?}
             */
            (src, t) => {
                if (!!src) {
                    this.recieveFileLinkHTML(parser((/** @type {?} */ (src))));
                }
                close(!!src, t);
            })
        });
    }
    /**
     * 插入hr
     * @param {?} e
     * @return {?}
     */
    insertHorizontalRule(e) {
        this.ensureFocus(e);
        this.cmd('insertHorizontalRule', false, '');
    }
    /**
     * 粘贴
     * @param {?} e
     * @return {?}
     */
    paste(e) {
        this.ensureFocus(e);
        this.cmd('paste', false, '');
    }
    /**
     * 剪切
     * @param {?} e
     * @return {?}
     */
    cut(e) {
        this.ensureFocus(e);
        this.cmd('cut', false, '');
    }
    /**
     * 复制
     * @param {?} e
     * @return {?}
     */
    copy(e) {
        this.ensureFocus(e);
        this.cmd('copy', false, '');
    }
    /**
     * 选中所有
     * @param {?} e
     * @return {?}
     */
    selectAll(e) {
        this.ensureFocus(e);
        this.cmd('selectAll', false, '');
    }
    /**
     * 重做
     * @param {?} e
     * @return {?}
     */
    redo(e) {
        this.ensureFocus(e);
        this.cmd('redo', false, '');
    }
    /**
     * 撤销
     * @param {?} e
     * @return {?}
     */
    undo(e) {
        this.ensureFocus(e);
        this.cmd('undo', false, '');
    }
    /**
     * 删除选中
     * @param {?} e
     * @return {?}
     */
    deleteSelect(e) {
        this.ensureFocus(e);
        this.cmd('delete', false, '');
    }
    /**
     * 获取历史输入
     * @return {?}
     */
    history() {
        this.vhtml = window.localStorage.getItem('editor_input') || '';
        this.autoActive();
    }
    /**
     * 清除格式，不阻止失焦，重新聚焦时会设置历史格式
     * @return {?}
     */
    removeFormat() {
        this.cmd('removeFormat', false);
        this.initFormatData();
    }
    /**
     * 隐藏各类下拉框
     * @param {?} e 事件
     * @return {?}
     */
    hideSwitchPannel(e) {
        /** @type {?} */
        const target = e.target || e.srcElement;
        if (this.switchFontFamilyPannel && !CommonUtil.contains(this.fontNameEl, target)) {
            this.switchFontFamilyPannel = false;
            return;
        }
        if (this.switchFontSizePannel && !CommonUtil.contains(this.fontSizeEl, target)) {
            this.switchFontSizePannel = false;
            return;
        }
        if (this.switchForeColorPannel && !CommonUtil.contains(this.foreColorEl, target)) {
            this.switchForeColorPannel = false;
            return;
        }
        if (this.switchBackColorPannel && !CommonUtil.contains(this.backColorEl, target)) {
            this.switchBackColorPannel = false;
            return;
        }
        if (this.switchFormatBlockPannel && !CommonUtil.contains(this.formatBlockEl, target)) {
            this.switchFormatBlockPannel = false;
            return;
        }
        if (this.switchCodePannel && !CommonUtil.contains(this.codeEl, target)) {
            this.switchCodePannel = false;
            return;
        }
    }
    /**
     * 全屏或取消全屏
     * @return {?}
     */
    SwitchScreen() {
        /** @type {?} */
        const editor = this.editor;
        /** @type {?} */
        const header = this.header;
        /** @type {?} */
        const pannel = this.pannel;
        /** @type {?} */
        const footer = this.footer;
        this.full = !this.full;
        if (this.full) { // 全屏
            editor.style.cssText = 'position:fixed;z-index:99999;top:0;left:0;transform:none;width:100%;height:100%;';
            pannel.style.cssText = `max-height:unset;height:${window.innerHeight - header.offsetHeight - footer.offsetHeight}px;`;
            document.body.appendChild(editor);
        }
        else { // 还原
            editor.style.cssText = '';
            pannel.style.cssText = '';
            this.parent.appendChild(editor);
        }
    }
    /**
     * 监听按键事件 (处理tab缩进)
     * @param {?} e 按键事件
     * @return {?}
     */
    keydown(e) {
        /** @type {?} */
        const key = e.keyCode || e.which || e.charCode;
        if (key !== 9) {
            return;
        }
        // 按下tab键，增加缩进2个空格
        /** @type {?} */
        const tab = new Array(5).join('&nbsp;');
        this.cmd('insertHTML', false, tab);
        e.preventDefault();
        return;
    }
    /**
     * 监听按键弹起事件
     * @param {?} e 按键弹起事件
     * @return {?}
     */
    keyup(e) {
        this.setRange();
        if (this.isRangeInCode()) {
            return;
        }
        // tslint:disable-next-line: deprecation
        e = e || window.event;
        /** @type {?} */
        const key = e.keyCode || e.which || e.charCode;
        // 监听home,end和上下左右按键，或后退键或删除键或enter键，设置激活文字格式
        if ((key >= 35 && key <= 40) || key === 8 || key === 46 || key === 13) {
            this.autoActive();
            return;
        }
    }
    /**
     * 点击面板
     * @return {?}
     */
    pannelOnClick() {
        this.initEdit();
        this.setRange();
        this.autoActive();
    }
    /**
     * 在编辑面板中粘贴（若在代码区内粘贴则清除格式！！！）
     * @param {?} e
     * @return {?}
     */
    pannelOnPaste(e) {
        setTimeout((/**
         * @return {?}
         */
        () => { this.autoActive(); }));
        if (!this.isRangeInCode()) {
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        const obj = (/** @type {?} */ (CommonUtil.isIE())) ? window : e;
        if (!obj.clipboardData) {
            return;
        }
        /** @type {?} */
        const text = obj.clipboardData.getData('text');
        /** @type {?} */
        const df = document.createDocumentFragment();
        df.appendChild(document.createTextNode(text));
        CursorUtil.insertNode(df);
        e.preventDefault();
        e.returnValue = false;
        this.setRangeAndEmitValue(0);
    }
    /**
     * 输入时记住光变位置 && input事件发射value && 记住输入
     * @param {?} arg0
     * @return {?}
     */
    setRangeAndEmitValue(arg0) {
        if (typeof arg0 !== 'number') {
            arg0 = 300;
        }
        this.setRange();
        this.debounce((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const innerHTML = this.pannel.innerHTML;
            if (this.vhtml === innerHTML) {
                return;
            }
            // 有内容时才保存到本地
            /** @type {?} */
            const len = (this.pannel.innerText || this.pannel.textContent).length;
            if (len > 1) {
                window.localStorage.setItem('editor_input', innerHTML);
            }
            // 1.发射innerHTML,input事件接收
            this.onInput.emit(innerHTML);
            // 2.触发ngModelChange事件
            this.onChange(innerHTML);
        }), arg0);
    }
    /**
     * 发射编辑内容
     * @return {?}
     */
    emitContent() {
        /** @type {?} */
        let size = 0;
        /** @type {?} */
        const editPannel = (/** @type {?} */ (this.pannel));
        // 检测编辑内容大小
        /** @type {?} */
        let innerHTML = editPannel.innerHTML;
        for (let i = 0, len = innerHTML.length; i < len; i++) {
            /** @type {?} */
            const c = innerHTML.charCodeAt(i);
            if (c > 0 && c < 255) {
                size++;
            }
            else {
                size += 2;
            }
        }
        if (size > this.options$.maxsize) {
            this.toast('编辑内容超出大小~');
            innerHTML = innerHTML.substr(0, this.options$.maxsize);
        }
        /** @type {?} */
        const image = this.getUrlsByTag(this.pannel, 'img');
        /** @type {?} */
        const audio = this.getUrlsByTag(this.pannel, 'audio');
        /** @type {?} */
        const video = this.getUrlsByTag(this.pannel, 'video');
        /** @type {?} */
        const obj = {
            innerHTML,
            innerTEXT: editPannel.innerText || editPannel.textContent,
            urls: { image, audio, video }
        };
        this.recieveContent.emit(obj);
    }
    /**
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     * @private
     * @return {?}
     */
    recoverRange() {
        if (!this.pannel) {
            return;
        }
        // 确保编辑面板先是聚焦的
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
        if (this.range) { // 存在上次光标，则设置上次光标
            CursorUtil.setFirstRange(this.range);
            return;
        }
        CursorUtil.setSelectionToElement(this.pannel, false);
    }
    /**
     * 1.聚焦面板并获取上次光标位置,设置当前历史编辑样式
     * 2.点击编辑条的命令或者编辑面板后，将视为编辑状态
     * @private
     * @param {?=} recover
     * @return {?}
     */
    startEdit(recover = true) {
        // 恢复上次光标（点击编辑面板不需要恢复上次光标，点击编辑条需要恢复上次光标）
        if (recover) {
            this.recoverRange();
        }
        this.initEdit();
    }
    /**
     * 阻止默认事件防止失焦，确保编辑面板聚焦，设置历史光标和格式
     * @private
     * @param {?} e 事件对象
     * @return {?}
     */
    ensureFocus(e) {
        // 阻止失焦
        e.preventDefault();
        // 编辑初始化
        this.startEdit();
    }
    /**
     * 编辑初始化和设置历史格式
     * @private
     * @return {?}
     */
    initEdit() {
        // 在编辑状态不再次进行初始化
        if (this.isInEditStatus) {
            return;
        }
        // 标记面板处于编辑状态
        if (!this.isInEditStatus) {
            this.isInEditStatus = true;
        }
        // 在代码区不设置默认格式
        if (this.isRangeInCode()) {
            return;
        }
        // 如果光标周围有内容则不设置默认格式
        /** @type {?} */
        const el = CursorUtil.getRangeCommonParent();
        if (el.nodeType === 3) {
            return;
        }
        // 如果没有内容，则格式化默认格式
        if (!this.pannel.children || !this.pannel.children.length) {
            this.cmd('formatBlock', false, this.formatBlock);
            this.cmd('fontName', false, this.fontFamily.value);
            this.cmd('fontSize', false, this.fontSize.value);
        }
    }
    /**
     * 查询是否支持命令
     * @private
     * @param {?} cmd 命令
     * @return {?}
     */
    isSupport(cmd) {
        return document.queryCommandSupported(cmd);
    }
    /**
     * 兼容insertHTML命令
     * @private
     * @param {?} html html
     * @return {?}
     */
    insertHTML(html) {
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        const range = (/** @type {?} */ (CursorUtil.getRange(0)));
        range.deleteContents();
        /** @type {?} */
        const df = document.createDocumentFragment();
        /** @type {?} */
        let name = 'div';
        if (html.indexOf('<a>') > -1) {
            name = 'span';
        }
        /** @type {?} */
        const el = document.createElement(name);
        el.innerHTML = html;
        df.appendChild(el);
        range.insertNode(df);
        return true;
    }
    /**
     * 执行封装的编辑命令
     * @private
     * @param {?} k 命令名称
     * @param {?} ui 打开ui弹窗
     * @param {?=} v 设置命令值
     * @return {?} true-设置成功，false-设置失败
     */
    cmd(k, ui, v) {
        if (!this.isSupport(k)) {
            if ('insertHTML' === k) {
                return this.insertHTML(v);
            }
            this.toast('系统不支持该命令~');
            return false;
        }
        /** @type {?} */
        const r = document.execCommand(k, ui, v || '');
        // 执行完以下命令后，非代码区内需要自动检测文字格式（样式）
        /** @type {?} */
        const blackList = 'redo,undo,delete,insertHTML,insertHorizontalRule,insertUnorderedList,insertOrderedList';
        if (r && blackList.indexOf(k) > -1 && !this.isRangeInCode()) {
            this.autoActive();
        }
        return r;
    }
    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     * @private
     * @return {?}
     */
    setRange() {
        if (this.isRangeInCode()) {
            this.inCode = true;
        }
        else {
            this.inCode = false;
        }
        this.range = CursorUtil.getRange(0, this.pannel);
    }
    /**
     * 自动检测文字格式激活样式（加粗，斜体，下划线，删除线，上标，下标......）
     * @private
     * @return {?}
     */
    autoActive() {
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        let p = (/** @type {?} */ ((CursorUtil.getRangeCommonParent())));
        if (!p) {
            return;
        }
        // 如果选取对象的节点是文本节点，则将p变为其父节点
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (p.nodeName === '#text') {
            p = (/** @type {?} */ (p.parentNode));
        }
        // 段落格式
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.cmd('formatBlock', false, 'p');
                this.formatBlock = AppZeditorComponent.FORMAT.formatBlock;
                return true;
            }
            /** @type {?} */
            const formatBlock = e.nodeName;
            /** @type {?} */
            const formatBlock$ = this.formatBlocks.find((/**
             * @param {?} fb
             * @return {?}
             */
            (fb) => {
                return fb.key.toUpperCase() === formatBlock;
            }));
            if (formatBlock$) {
                this.formatBlock = formatBlock$.key;
                return true;
            }
        }));
        // 字样
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.fontFamily = AppZeditorComponent.FORMAT.fontFamily;
                return true;
            }
            /** @type {?} */
            const fontFamily = e.getAttribute('face');
            if (!fontFamily) {
                return;
            }
            /** @type {?} */
            const fontFamily$ = this.fontFamilys.find((/**
             * @param {?} ff
             * @return {?}
             */
            (ff) => {
                return ff.value.toLowerCase() === fontFamily.toLowerCase();
            }));
            if (fontFamily$) {
                this.fontFamily = fontFamily$;
                return true;
            }
        }));
        // 字号
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.fontSize = AppZeditorComponent.FORMAT.fontSize;
                return true;
            }
            /** @type {?} */
            const fontSize = e.getAttribute('size');
            if (!fontSize) {
                return;
            }
            /** @type {?} */
            const fontSize$ = this.fontSizes.find((/**
             * @param {?} fs
             * @return {?}
             */
            (fs) => {
                return fs.value === fontSize;
            }));
            if (fontSize$) {
                this.fontSize = fontSize$;
                return true;
            }
        }));
        // 前景色
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.foreColor = AppZeditorComponent.FORMAT.foreColor;
                return true;
            }
            /** @type {?} */
            const foreColor = CommonUtil.rgbToHex(e.getAttribute('color'));
            /** @type {?} */
            const foreColor$ = CommonUtil.flat(this.colors).find((/**
             * @param {?} cr
             * @return {?}
             */
            (cr) => {
                return cr.toLowerCase() === foreColor.toLowerCase();
            }));
            if (foreColor$) {
                this.foreColor = foreColor$;
                return true;
            }
        }));
        // 背景色
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.backColor = AppZeditorComponent.FORMAT.backColor;
                return true;
            }
            /** @type {?} */
            const backColor = CommonUtil.rgbToHex(e.style.backgroundColor);
            /** @type {?} */
            const backColor$ = CommonUtil.flat(this.colors).find((/**
             * @param {?} cr
             * @return {?}
             */
            (cr) => {
                return cr.toLowerCase() === backColor.toLowerCase();
            }));
            if (backColor$) {
                this.backColor = backColor$;
                return true;
            }
        }));
        // 加粗
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isBold = AppZeditorComponent.FORMAT.isBold;
                return true;
            }
            if (e.nodeName === 'STRONG' || e.nodeName === 'B') {
                return this.isBold = true;
            }
        }));
        // 斜体
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isItalic = AppZeditorComponent.FORMAT.isItalic;
                return true;
            }
            if (e.nodeName === 'EM' || e.nodeName === 'I') {
                return this.isItalic = true;
            }
        }));
        // 下划线
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isUnderline = AppZeditorComponent.FORMAT.isUnderline;
                return true;
            }
            if (e.nodeName === 'U') {
                return this.isUnderline = true;
            }
        }));
        // 删除线
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isStrikeThrough = AppZeditorComponent.FORMAT.isStrikeThrough;
                return true;
            }
            if (e.nodeName === 'STRIKE') {
                return this.isStrikeThrough = true;
            }
        }));
        // 上标，下标
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.scriptActive = AppZeditorComponent.FORMAT.scriptActive;
                return true;
            }
            if (e.nodeName === 'SUP') {
                return this.scriptActive = 'superscript';
            }
            if (e.nodeName === 'SUB') {
                return this.scriptActive = 'subscript';
            }
        }));
        // 对齐方式
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.justifyActive = AppZeditorComponent.FORMAT.justifyActive;
                return true;
            }
            /** @type {?} */
            const textAlign = e.getAttribute('align') || e.style.textAlign;
            if (textAlign === 'left') {
                return this.justifyActive = 'justifyLeft';
            }
            else if (textAlign === 'center') {
                return this.justifyActive = 'justifyCenter';
            }
            else if (textAlign === 'right') {
                return this.justifyActive = 'justifyRight';
            }
            else if (textAlign === 'justify') {
                return this.justifyActive = 'justifyFull';
            }
        }));
    }
    /**
     * 从最深层节点到最外层节点执行回调
     * @private
     * @param {?} start 最深层节点
     * @param {?} fn 回调 直到回调返回true时才会终止回调的执行
     * @return {?}
     */
    grandChildTograndParent(start, fn) {
        /** @type {?} */
        let o = start;
        while (!!o) {
            if (fn(o)) {
                return;
            }
            o = o.parentNode;
        }
    }
    /**
     * 找目标元素的的某个标签的urls和base64的url
     * @private
     * @param {?} target 元素
     * @param {?} tag 标签
     * @return {?}
     */
    getUrlsByTag(target, tag) {
        /** @type {?} */
        const arr = (/** @type {?} */ ([]));
        /** @type {?} */
        const tags = target.getElementsByTagName(tag.toUpperCase());
        Array.prototype.forEach.call(tags, (/**
         * @param {?} elem
         * @return {?}
         */
        elem => {
            /** @type {?} */
            const item = (/** @type {?} */ ({}));
            /** @type {?} */
            const src = elem.src;
            if (src.indexOf('data:image/png;base64,') === -1) {
                item.type = 'url';
            }
            else {
                item.type = 'base64';
            }
            item.src = src;
            arr.push(item);
        }));
        return arr;
    }
    /**
     * 判断范围Range是否和代码区有交集
     * @private
     * @return {?} true - 有交集，false - 无交集
     */
    isRangeInCode() {
        this.pannelFocus();
        /** @type {?} */
        let parent = (/** @type {?} */ (CursorUtil.getRangeCommonParent()));
        if (!parent) {
            return false;
        }
        // 如果是文本节点则找其父元素
        if (parent.nodeType === 3) {
            parent = parent.parentNode;
        }
        return ((/**
         * @return {?}
         */
        () => {
            // 被包含
            /** @type {?} */
            let parent$ = parent;
            // tslint:disable-next-line: no-conditional-assignment
            while (parent$ = parent$.parentNode) {
                if (parent$.tagName === 'CODE') {
                    return true;
                }
                if (parent$ === this.pannel) {
                    return false;
                }
            }
            return false;
        }))() || ((/**
         * @return {?}
         */
        () => {
            // 包含
            /** @type {?} */
            const nodes = parent.querySelectorAll('code');
            return nodes && nodes.length;
        }))();
    }
    /**
     * toast提示
     * @private
     * @param {?=} text
     * @param {?=} obj
     * @return {?}
     */
    toast(text = '设置无效~', obj) {
        return this.domService.tost(Object.assign({ text }, obj));
    }
    /**
     * 弹窗
     * @private
     * @param {?} obj
     * @return {?}
     */
    alert(obj) {
        return this.domService.alert(obj);
    }
    /**
     * 防抖
     * @private
     * @param {?} f 回调
     * @param {?=} t
     * @return {?}
     */
    debounce(f, t = 300) {
        /** @type {?} */
        const o = (/** @type {?} */ (this.debounce));
        clearTimeout(o.timer);
        o.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            f();
        }), t);
    }
}
/**
 * 默认格式
 */
AppZeditorComponent.FORMAT = {
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikeThrough: false,
    scriptActive: '',
    formatBlock: 'p',
    foreColor: '#000000',
    backColor: '#ffffff',
    justifyActive: 'justifyLeft',
    fontSize: { key: 'small', value: '2', value$: '' },
    fontFamily: { key: '微软雅黑', value: 'Microsoft Yahei' }
};
AppZeditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-zeditor',
                template: "<div [ngClass]=\"theme\">\r\n  <div class=\"z-editor\" #editorRef (click)=\"hideSwitchPannel($event)\">\r\n    <!-- \u7F16\u8F91\u6761\u5F00\u59CB -->\r\n    <div class=\"wd-editor-bar fn-clearfix\" #headerRef>\r\n      <!-- \u4E8B\u4EF6\u6267\u884C\u5BCC\u6587\u672C\u547D\u4EE4[\u5931\u7126\u65F6\uFF0C\u547D\u4EE4\u6267\u884C\u65E0\u6548\uFF0C\u6240\u4EE5\u8981\u963B\u6B62\u5931\u7126\uFF0C\u6216\u8005\u5728\u4E8B\u4EF6\u6267\u884C\u524D\u805A\u7126] -->\r\n      <!-- \u5907\u6CE8!!!! -->\r\n      <!-- mousedown\u4E8B\u4EF6\u5728\u81EA\u8EAB\u805A\u7126\u4E4B\u524D[\u5373\u5176\u4ED6\u5143\u7D20\u5931\u7126\u805A\u7126\u4E4B\u524D]\u6267\u884C -->\r\n      <!-- \u4E0B\u9762\u4F7F\u7528mousedown\u4E8B\u4EF6\u662F\u56E0\u4E3A\u53EF\u4EE5\u4F7F\u7528e.preventDefault()\u963B\u6B62\u9ED8\u8BA4\u4E8B\u4EF6\uFF0C\u963B\u6B62\u7F16\u8F91\u9762\u677F\u5931\u7126 -->\r\n      <!-- \u800C\u9488\u5BF9\u5FC5\u5B9A\u8981\u5931\u7126\u7684\u60C5\u51B5\uFF0C\u5219\u91C7\u7528\u8BB0\u4F4F\u5149\u6807\uFF0C\u518D\u8BBE\u7F6E\u4E0A\u6B21\u8BB0\u4F4F\u7684\u5149\u6807\u7684\u65B9\u5F0F\u6765\u505A\u5230\u4F2A\u5931\u7126\u3002 -->\r\n      <!-- \u5B57\u4F53 -->\r\n      <div #fontNameRef class=\"wd-edit-link-box fontName\" (mousedown)=\"!inCode&&setFontName($event)\">\r\n        <a data-tip=\"\u5B57\u4F53\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span [ngStyle]=\"{'font-family': fontFamily.value}\">{{fontFamily.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontFamilyPannel\" class=\"wd-font-name-list\">\r\n          <li *ngFor=\"let ff of fontFamilys, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [ngStyle]=\"{'font-family': ff.value}\">{{ff.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u5B57\u53F7 -->\r\n      <div #fontSizeRef class=\"wd-edit-link-box fontSize\" (mousedown)=\"!inCode&&setFontSize($event)\">\r\n        <a data-tip=\"\u5B57\u53F7\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{fontSize.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontSizePannel\" class=\"wd-font-size-list\">\r\n          <li *ngFor=\"let fs of fontSizes, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\">{{fs.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u683C\u5F0F -->\r\n      <div #formatBlockRef class=\"wd-edit-link-box formatBlock\" (mousedown)=\"!inCode&&setFormatBlock($event)\">\r\n        <a data-tip=\"\u6587\u672C\u683C\u5F0F\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{formatBlock}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFormatBlockPannel\" class=\"wd-format-block-list\">\r\n          <li *ngFor=\"let fb of formatBlocks, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [innerHTML]=\"fb.value | safeHTML\"></a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u8272 -->\r\n      <div #foreColorRef class=\"wd-edit-link-box foreColor\" (mousedown)=\"!inCode&&setForeColor($event)\">\r\n        <a data-tip=\"\u5B57\u8272\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-font-color\" [ngStyle]=\"{'border-bottom-color': foreColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchForeColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u9AD8\u4EAE\u8272 -->\r\n      <div #backColorRef class=\"wd-edit-link-box backColor\" (mousedown)=\"!inCode&&setBackColor($event)\">\r\n        <a data-tip=\"\u9AD8\u4EAE\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-pencil\" [ngStyle]=\"{'border-bottom-color': backColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchBackColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u662F\u5426\u52A0\u7C97 -->\r\n      <div class=\"wd-edit-link-box bold\" (mousedown)=\"!inCode&&switchBold($event)\">\r\n        <a data-tip=\"\u52A0\u7C97\"  [ngClass]=\"{active:isBold,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u659C\u4F53 -->\r\n      <div class=\"wd-edit-link-box italic\" (mousedown)=\"!inCode&&switchItalic($event)\">\r\n        <a data-tip=\"\u659C\u4F53\" [ngClass]=\"{active:isItalic,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-italic\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u4E0B\u5212\u7EBF -->\r\n      <div class=\"wd-edit-link-box underline\" (mousedown)=\"!inCode&&switchUnderline($event)\">\r\n        <a data-tip=\"\u4E0B\u5212\u7EBF\" [ngClass]=\"{active:isUnderline,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-underline\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664\u7EBF -->\r\n      <div class=\"wd-edit-link-box strikeThrough\" (mousedown)=\"!inCode&&switchStrikeThrough($event)\">\r\n        <a data-tip=\"\u5220\u9664\u7EBF\" [ngClass]=\"{active:isStrikeThrough,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-strikethrough\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0A\u6807  -->\r\n      <div class=\"wd-edit-link-box superscript\" (mousedown)=\"!inCode&&setScript($event, 'superscript')\">\r\n        <a data-tip=\"\u4E0A\u6807\" [ngClass]=\"{active:scriptActive==='superscript',disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-superscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0B\u6807 -->\r\n      <div class=\"wd-edit-link-box subscript\" (mousedown)=\"!inCode&&setScript($event, 'subscript')\">\r\n        <a data-tip=\"\u4E0B\u6807\" [ngClass]=\"{active:scriptActive==='subscript',disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-subscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u5DE6 -->\r\n      <div class=\"wd-edit-link-box justifyLeft\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Left')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyLeft',disabled:inCode}\" data-tip=\"\u5C45\u5DE6\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-left\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u4E2D -->\r\n      <div class=\"wd-edit-link-box justifyCenter\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Center')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyCenter',disabled:inCode}\" data-tip=\"\u5C45\u4E2D\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-center\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u53F3 -->\r\n      <div class=\"wd-edit-link-box justifyRight\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Right')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyRight',disabled:inCode}\" data-tip=\"\u5C45\u53F3\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-right\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5DE6\u53F3\u5BF9\u9F50 -->\r\n      <div class=\"wd-edit-link-box justifyFull\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Full')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyFull',disabled:inCode}\" data-tip=\"\u5DE6\u53F3\u5BF9\u9F50\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-justify\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u7F29\u8FDB -->\r\n      <div class=\"wd-edit-link-box indent\" (mousedown)=\"!inCode&&indent($event)\">\r\n        <a data-tip=\"\u7F29\u8FDB\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-increase\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u589E\u8FDB  -->\r\n      <div class=\"wd-edit-link-box outdent\" (mousedown)=\"!inCode&&outdent($event)\">\r\n        <a data-tip=\"\u51CF\u5C11\u7F29\u8FDB\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-decrease\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6E05\u9664\u683C\u5F0F -->\r\n      <div class=\"wd-edit-link-box removeFormat\" (mousedown)=\"!inCode&&removeFormat()\">\r\n        <a data-tip=\"\u6E05\u9664\u683C\u5F0F\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clear-formatting\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6709\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertOrderedList\" (mousedown)=\"!inCode&&insertOrderedList($event)\">\r\n        <a data-tip=\"\u6709\u5E8F\u5217\u8868\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list-numbered\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u65E0\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertUnorderedList\" (mousedown)=\"!inCode&&insertUnorderedList($event)\">\r\n        <a data-tip=\"\u65E0\u5E8F\u5217\u8868\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list2\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u8868\u683C mdn\u65E0api\uFF0C\u7528insertHTML\u5B9E\u73B0 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertTable($event)\">\r\n        <a data-tip=\"\u8868\u683C\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-table\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u8D85\u94FE\u63A5\uFF0C\u5F39\u7A97 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertLink($event)\">\r\n        <a data-tip=\"\u94FE\u63A5\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-link\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6C34\u5E73\u7EBFhr -->\r\n      <div class=\"wd-edit-link-box insertHorizontalRule\" (mousedown)=\"!inCode&&insertHorizontalRule($event)\">\r\n        <a data-tip=\"\u6C34\u5E73\u7EBF\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-page-break\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6587\u4EF6 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertFile($event)\">\r\n        <a data-tip=\"\u6587\u4EF6\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-upload-cloud\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u4EE3\u7801 -->\r\n      <div #codeRef class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertCode($event)\">\r\n        <a data-tip=\"\u4EE3\u7801\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-embed\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchCodePannel\" class=\"wd-code-list\">\r\n          <li *ngFor=\"let code of codes, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\">{{code}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6362\u884C -->\r\n      <div class=\"wd-edit-link-box insertBrOnReturn\" (mousedown)=\"insertBrOnReturn($event)\">\r\n        <a data-tip=\"\u6362\u884C(shift+enter)\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-arrow-down\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u7C98\u8D34 -->\r\n      <div class=\"wd-edit-link-box paste\" (mousedown)=\"paste($event)\">\r\n        <a data-tip=\"\u7C98\u8D34\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clipboard\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u590D\u5236 -->\r\n      <div class=\"wd-edit-link-box copy\" (mousedown)=\"copy($event)\">\r\n        <a data-tip=\"\u590D\u5236\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-copy\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u526A\u5207 -->\r\n      <div class=\"wd-edit-link-box cut\" (mousedown)=\"cut($event)\">\r\n        <a data-tip=\"\u526A\u5207\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-scissors-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u9009\u62E9\u5168\u90E8 -->\r\n      <div class=\"wd-edit-link-box selectAll\" (mousedown)=\"selectAll($event)\">\r\n        <a data-tip=\"\u9009\u62E9\u5168\u90E8\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-select_all\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u64A4\u9500 -->\r\n      <div class=\"wd-edit-link-box undo\" (mousedown)=\"undo($event)\">\r\n        <a data-tip=\"\u64A4\u9500\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-undo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u91CD\u505A -->\r\n      <div class=\"wd-edit-link-box redo\" (mousedown)=\"redo($event)\">\r\n        <a data-tip=\"\u91CD\u505A\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-redo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664 -->\r\n      <div class=\"wd-edit-link-box delete\" (mousedown)=\"deleteSelect($event)\">\r\n        <a data-tip=\"\u5220\u9664\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-eraser\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box history\" (mousedown)=\"history()\">\r\n        <a data-tip=\"\u5386\u53F2\u8F93\u5165\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-database\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box full\" (mousedown)=\"SwitchScreen()\">\r\n        <a data-tip=\"\u5168\u5C4F/\u53D6\u6D88\u5168\u5C4F\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon\" [ngClass]=\"full?'icon-minimize':'icon-maximize'\"></i>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <!-- \u7F16\u8F91\u6761\u7ED3\u675F -->\r\n    <!-- \u7F16\u8F91\u4F53\u5F00\u59CB -->\r\n    <!-- input,selectionchange,click\u4E8B\u4EF6\u8BB0\u5F55\u4E0A\u6B21\u7F16\u8F91\u7684\u5149\u6807 -->\r\n    <!-- mousedown\u4E8B\u4EF6\u5728\u9F20\u6807\u6309\u4E0B\uFF0C\u5224\u65AD\u662F\u5426\u8981\u8BBE\u7F6E\u805A\u7126\u5E76\u8BBE\u7F6E\u4E0A\u6B21\u5149\u6807\u548C\u91CD\u8BBE\u7F16\u8F91\u6837\u5F0F -->\r\n\r\n    <div #pannelRef (keyup)=\"keyup($event)\" (click)=\"pannelOnClick()\" (keydown)=\"keydown($event)\"\r\n      (blur)=\"isInEditStatus=false\" (paste)=\"pannelOnPaste($event)\" (beforepaste)=\"pannelOnPaste($event)\"\r\n      (input)=\"setRangeAndEmitValue($event)\" class=\"wd-deitor-content\" contenteditable=\"true\" [innerHTML]=\"vhtml|safeHTML\">\r\n    </div>\r\n    <!-- \u7F16\u8F91\u4F53\u7ED3\u675F -->\r\n    <div *ngIf=\"hasBtn\" class=\"wd-edit-footer fn-clearfix\" #footerRef>\r\n      <div class=\"wd-edit-footer-btn\">\r\n        <button (click)=\"emitContent()\">\u4FDD\u5B58</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AppZeditorComponent)),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None,
                styles: ["@charset \"UTF-8\";a,a:after,a:before,audio,div,div:after,div:before,h1,h2,h3,h4,h5,h6,i,i:after,i:before,img,li,li:after,li:before,ol,p,pre,span,span:after,span:before,table,ul,video{-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-weight:400}em,i{font-style:italic}table{border-collapse:collapse;border-spacing:0}img{border:none;height:auto;vertical-align:middle;width:100%}a:active,a:hover,a:link,a:visited{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:#000;cursor:pointer;text-decoration:none;user-select:none}hr{background-color:#e1e1e1;border:0;color:#000;height:1PX;margin:0;*margin:0}li,ul{list-style-type:none}button,input[type=button],input[type=reset],input[type=submit]{-moz-appearance:button;-ms-appearance:button;-o-appearance:button;-webkit-appearance:button;appearance:button;border:none}button,button:focus,input,input:focus{background-color:#fff;outline:none;outline-style:none}input{border:1px solid #e6e6e6}::-ms-clear,::-ms-reveal{display:none}input:-ms-clear,input:-ms-reveal{display:none}[tappable]{-ms-touch-action:manipulation;cursor:pointer;touch-action:manipulation}.z-editor-icomoon,[class*=\" icon-\"],[class^=icon-]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:z-editor-icomoon!important;font-size:.75rem;font-style:normal;font-variant:normal;font-weight:400;line-height:.75rem;line-height:1;speak:never;text-transform:none}@font-face{font-display:block;font-family:z-editor-icomoon;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABbUAA0AAAAAKUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAWuAAAABoAAAAcjD/EOUdERUYAABacAAAAHAAAAB4AJwA2T1MvMgAAAZwAAAA/AAAAYA8TDt9jbWFwAAACPAAAAOMAAAJWyh7L2Gdhc3AAABaUAAAACAAAAAgAAAAQZ2x5ZgAAA4QAABFaAAAgQINXE/9oZWFkAAABMAAAADIAAAA2GpLhrWhoZWEAAAFkAAAAIAAAACQImgTxaG10eAAAAdwAAABeAAAAwK6bBiRsb2NhAAADIAAAAGIAAABivSS0wG1heHAAAAGEAAAAGAAAACAAQwDCbmFtZQAAFOAAAADcAAABm/pYTdhwb3N0AAAVvAAAANUAAAHpl/yTYXjaY2BkYGAA4tkH9B/E89t8ZeBmYQCB277nZsDo/z/+H2B5wHwAyOVgYAKJAgB+Gg6eAAB42mNgZGBgPvD/AAMDK8P/HwwMLA8YgCIowAAAi2wFlXjaY2BkYGAwYDjAIMQAAkwMaAAAGc8BBnjaY2Bmvsk4gYGVgYFpJtMZBgaGfgjN+JrBmJGTARUwCqAJMDgwMH68zXzg/wEGB2YgBqlBklVgYAQAgvQMBQB42mNhgADGUAjNBMQsDAwNQLwaiB1YIPxQKA3C2lB+KET+/w+oOqia//+A9AEobkDShxezMjAoMG9nYGBOAuI8sJgfkM/J5Anhg+XyGZiZCxmYWTzBdniCxAHOiRJjAAB42mNgYGBmgGAZBkYgycAYAOQxgvksjCZA2oPBgYGVgQMopvCS5SXXS8GXVi99Xma8bHzZ+XLCy0cvn7z8/PLnyz+vol6lvsp4lf+q8FXNq4YPhh8cPkR8mPbh4IfrHyU+qn/U/ej18fb/v///g+xAMSkdi0lJUJPKsZikjTDp/xNxRrE/Yt/EzontFVss1i3WIlYnpiumIyYnJikmLrpLdLPoRtHVoqtEl4ou4v/E/4T/LP8E/jT+QH5BfmZ+Br4nfCFgv3owUAcwgsKRkQ2ImaECTECCCUMVAwvD8AYA4VB3NwAAAAAAAAgACAAQABgAnADaASgBXgJ0AroC/gOkBEAE2AUsBcwGCgaOBtgHrgfwCCwIRAicCN4JDAlUCXoJognKCfAKHgpMCnQK/gtSC7YL6gymDM4NbA5cDtgPVA+GD8YQIAAAeNqVWWtsG1d2vmfuvMjha0gOhxQpvkYUJTO2ZJJD2YokM47tmpWjVRNJyW4SR9auF06yDjbexN4U+TFJ9+Ft0K5ho2mBOA+0adHKQYFdoHV+bGui6J8+F4siBXabbo0U3e42qAOkWCBozVHPvTOUKFvOg+SduY9zz71z7jnfOWdIgPQ/AiH7BfJJ7ThxSJs6tE0oUYhGoiRBTDJMSqRCxslu0iD7ySy5hxwmHfI5QkAv6axQu2GwMuXfsSQVmdWAtQzLxvowlKujdgPqZsqwKtjHxhJ9muZUC2sOEHcd3lrBzxK7rAwNlVfclaX1lfWV8tDQirDErhtkyV1Hgg3CCYT2BvHmuUsCdvVw3vrKCuDNJWwarCyxCSuUDeJ9nU1iF6RgPJBqhdEA586kAeQKeZIuU4OMYEPRm6NWWTb06mhZkZMm5MHMQ6PempqDKWg1WTcNv5eJxzPvhaxwKAQ1qog0IIqqKCoUaqFQ2ArDT9+DD/RMRnf198Lh0EjIfYdKIAD+JEYzEgqH2dqUtPHSpQ5JosznCEng0nv1ZKpRqrdstpV9sB+kUj1l6EnZKpVHbX0f7G22GntNRmkkU3cDdtRbs4DEe/957qGH5oQldu39HN5N5HIJd4Rdv6vFYtpfsgt1cOwtTrc89+Af9AkY8e8jSSgaDSEd7k0iZKMr4u6IitqRICmS41qgoBKUdDxUqjfskqHoCcOCEqsLjtvugiM4N7sns11od7sn4T9cgjWhC6Tb627gA//hSZdAFz94kCe9OiEiWd54n16hv0MsskCeJ9dQEpNc5HMo+5TJD2HvpKxEAH9WebS6B/AHw8A7Bvuqs+zI+JRUo85YcD66gWIyPi11Rc+Bt+jtY+zetPUZ8DlwTqgzjLO/QVQc44qgqNnk5IXl5QuTyayqCLe11wGVxu+aMLKoP6DqgZxlLdRqu3fXaguWlQvo6k5U6vAg1TB29AiAEYntymyfn9kVixgA3lh6+6y0Nya8L8tKTE2YZkKNKTI2sBVPp+PYUmT38WsCyHSLgMogXBNVqgUCISqKNBQIaFQVoXZNECSRTTVNNlWUhE06kVLRp/tKb12gglEOR80gZ4EfNhQ0o+GygUPCCohsPJLePp6OsHERPBxDvXRIDfXRF3tVL1WZqvDDMpJep8nPq2U3vRMSiF2vPzI+br0MzgX7pcXFw0cez+cDgXI6nV8eKxZ3h0JjYy8df/QJ6gS1ajZnvew6F5oz+fzjRw4v1sbGO8XS0KpVq621WvufePT4S2NjA3vZRYie9PRlytMIu8lXZ+qrlHRlm5qEQruLxbHlfDpdDgS8BRZfsi+A87I1Pv5IvW57/MHZ32qt1WrW6lCp2Bkfq3lbnmlyyly2qgX5jtFCa2g/76D9RBDB7yLT5ChZIV8iZ1BCiBENHx8Yrm1v4n7rqM4T4KPdtmYFCe3maA2QMJkqbWsxI0AsjALOStVvab3D4HGwuP/2HMe8r4c5ZP67d+d9vb+7wmiuIFoKP2BXnbVd+nWOm88xOIUP+C3Mu+iTm/R6b3lzQlyIDswIu/mBKZc/djvwwcBu+HEuEwOx6EnEu/1YZzJEUeG5DUNfdkyx7gYuDwvwgmfrywV7GWL4pLbvOXxxYy/j0xchFiT1+WAnY7N5MMvO0ISuG2y7aJMx1eEPuZKM6xNDvO6oMRxg4xtkB9reD3YipU9+agbx3vpOtLAj7S1y20eWyFe57g08L3vQLVkYkjX4wExgW8Kg9qCI2fwt8VcagxJm07ekDzUEsGjA2zJuM57MxPWMsOwEoohrGT2e2Xykv9iJsndlB0ra3qEzfuVTz99xJSav9kYXfX8XPWuZTJIWyqvkiabEDHUrCKig+0fvj86/2WKe1vCGZqEB1SmzYtI33Ovztj3vXg8nEmHaxqv7QLZSyWKBV3rESYShG06gd/6H6UuQmKZte37eToRvdvv0bU6L5aZDySrrXe2dvDF95sNpjBY3PiIGIvgZUiSnWATgabbehwruBXHXvvFPSQz1+u7V4jfPK3oOFY+VI6GHzb5r960Gf5ukUx6KrPEg6wrGWBhgoRJe4WYtyBMHwpFAJnWwau4dSpkP7Wu/fN99z1Uq6WSoNhyyImEhlCoHYvHh/KMzM8/urR+NialoSy/FhmpRXQ4Ex4vRoBpAwPq8+5/sYAAXQsa4EIZpgiKvc0g4nVmcmPjynrHpWCAI95wqjZrJ5KPtA797357FIq6AW8vMjXjso/Hh4eMzkbgia6PZwr3Fgq0j+1gwQGR2zjyO8uJsHRF6nJBKycA4yitV3bItO2E0MFKewhrGz9jTsL3CIqreZum2222n6zhdLOwjEPbDaKrb7n1Yb1+cwXLDZVRtFtn3bTKLNvkQjy9RvEy5WFRb4gbJVIwdIQszsZdFmixEKnHzxEFG05AULyAusOAGj/nApqvwoP8dDgpc54WVrTp6+xUOHRwqeutbdfittTUOwmtrHLe3tXyY6q3fxnXlNkb+Ald34uO38AzItjMwMc6cYPa2dQYI6o2+nel3qG8/CddhRrdToY6DkIo/z9KwuH92a4WIG+7Gh/SvcE+HyQlymnwH98MkrvAQoZrgdjIBmhdQpsyEwgOIUVnh35TJvy0MSrPAzm2qxePT6qiE9BjsRgbsbM4LZWUlwUHEeyAWO8ujVSTlRjpojwq9mCkVj5TLOUkVF9/WFEka0sM//nFYH5IkRXt7UVSlXLl8pFjKZLSQGI3m/Nabb/rzctGoGNJ6bbOZlGOyogLEYoP1XzKQwQJfA1XB3mTTjMVgWz1dzeWyEEfTfx6KxmQmXY2o7luwpEaq6cyk4V5/HhOuOGRzuWp1fHw+X4jrALlsrgqC61axAqDHC/n58fFfGxkRAUTJiJqtjMXrYiqSbqWhyDeBxb0WNSQ2MDKC/ZGUyOtWpmV6eRomKRSzZcTqAhnDk0Kz8cNK1J66H2eOgifZGiQs3asKf50rJpNH9kzYLqZG9sSeI8nkIfcbJ3fNzIx/+fXXX79rbg7+pbw04Y3cdDzaI8/AEY7omCSzu5e19/dQQO0l0NC9MNcqe+Gm3vCt2jNqpttC18lkHpy+++DBu6cfzGScbDrXGRvr5NJZlzANpo67OtO0F1KmmVqwmzPwhrua32ems9m0uS/vvuF4+THeKNKi3aBHt6BhlDC1xzzfcdwuOhUH2jja7pF2m+WzWzHxLKfP+1GA5+7thuc+0NGV7BJXPM/Xe17dsDwPyIhSpkjeN1L25F1Pz809fdek7ZxZWDhzZgFzxrswEZi0bxu5+6kadNvD95TttZHSCP7W7OaxY83msTZQwMat3aUCblW5BRvYe5AskzA6WmsKS2XgThOlRAML0BK1sDAcxtx28xaL9UisGBOcWK8do6zac2LgoTH7CG23DV08VucmAUQQaLtdrl+4B3qd74GhE7EZIuESCRRSoqpUp9DRT5mKKbR7XTy1H1395tvu/wjd8osvzvV/7BB6mGkj54FeQoKb5zH4nifLtahKSAYjCrBLw0LJBjxYCwuDQ+6ecBeoRuM4bIikh7rIXr5skLZ3E/yOm06/RZ2bbBMoC8z9UV95ls8l0+26rEW89wq37YewJY0BNGZFJDdJH2tZnRUUeJsBK/DrnXmZPg86wKu76ULvwO1j9ib1vcQAPxjwBJ91f7d++/MHC+flfRkbeQdeqa3d9b+sngFp+wa3NgmDbDGZdrqfkTfolTvz3hjkLmA3gyyMGx8Ur9NxlAbjTCpmABSzUg3AVBVMWqXtVWYGq9d7b6wiSLZXr8O/HukeuY69rHEdO9koPB7vteP87SUJ0Kv0HGr2FxBhaJ0BSgOhhLuwLDTQhSVSm+9u+j9EIaPMwEVptg5s4Xe1wl/aMMgxc2Dk0P+OeumeBa+dqC3V1JiaahbcNRhbiJ9/owMiPBuLRQuxWCxRNqgmR9pJQYDW6db+r+4DmA+VQ1o+HKHuBmb56UDwkQzs/VIdvVrWzgovuK4A9/zGgd753WF1D6zCa1Sm7o3R0eqx0dHK7odriiFpQSUQU0VFDCigpbQYDcbUQuFooRiAcL5wMDesliJU1TEaFkMiSNQ7OiaTNYzzFMy+SqROyAGoKhhQNrz0SkFn72X+U+zRqybiNyajUUwgOPQWAAX0w+a3mp1ZzKEkKgnu37I4WJAo2IJQuOFWbtC1UOCxG48Fs5FoNvjtQOj+5rebcx0hISkCo5YEWWGCwCmn/9sduQFvRrLBx24cD4ZCwW8Fs1H/zTPu8yk8uxFyD55dc5TlDzx56CcRfJ9sO/29mtvdXP+tivemR/ipJDelsKKGpV+8IEUUJSI1Jfz80KtDS5YuWOVzi4sPP7y4eM4ql61+vWwJw0jRkGRZ+vkL7Npkc8LyP8qSJENLCquPenRb8/t1fI4FEqHfx5wohtLGOHJ7wmaZm29rMdhib28p9Nyx6ekxQWDX753q9NzOqVMdQeicotb02Nbg2tbAqQ7aToDE6Z/Sq4jVRxlCbUlM4RrNnOqgxJhiD0p1mzS5q2V+lYUHST6K8xktc8HVwRbj01cL9N7mZou2VfWcmtRCyUAkWzSNXDQQUNVnsUdLqkuq6j7FWkbQayGtYvi0qVQuEggKZMhcMmdKpRnzrJnJphvmXKk0a54zMwP96aF0PT1b9vohgLzOqWogEM0ZZjEbCSTD2HNWVRRlSU3Aa7yhqsqSwjdxTkHSSC6V8kjd08VZ8wEzk0mfNWeL5TnkPJROn03zpR5Ip1n/TKk8ZzbS2Yx5Lj3jxTwEAkJHuJ8YWEty82Gi9oTDT1ToyNIG8VQP73IqKpCoIezxm7IEOKhGDSPq+xVP79OkQvai9jyJfD2eGKG3tuI2FnxX+sk+CyFLAw2zOfgS0UgOvppmf8N8jJ2cN5452vmaIUWikawYvW9y8r6IlI1GIpL7s1q+UKsV8jUY2YVXbO26NDz8xXvvnT928N4vDg+z+sFj8/eyeudOtgRfOLy8fBhZ4wK79+/fHY1IYjbykceuz3bX9wY5DtbvaGj4UX2872LmXMSs7QHy6+Q8eZn8MSFTflg52jwArbqZSiqmZxOzfjZXZbE4lx57w2BI25QeQ6o8eJ4A21N54NqOqdd221FYFnarUZjSNs6wbVnztm3930X2J5FCJemSFEV8WQ2qapAVJ6heVTRNuaoGhX/KpH0LuKZq0vnLsYkoN6FXNXRBXTPjvn7+8qadqerloKorXabY/VlKSIInGC9NY1zdv9EUVlW0X1yisrf8RZkt/1+XBEoFrF5EqItKaX8LSOuwGqt0mHUw5tdwce3VKOBeEmztV78jhZQumg+8Frw8YHaXf1PWeH/frK4pujrpPWUQJq6yGlvn+EVvbZQEri0zn0DJ/fQ0+q5dZAmjA8Pih2PxF0FR9FONqSpefD/emIMDAgbiitnAcJVnD/3ky/PaSrX/r1H/b4CGLcBvPxwRKAiYBgiq+PlLnaefWHh1UZSp1ylEFi/9yuPPHICvuD8RAAqF+WLBSuk5TdLEGSWuxe2Ruc/l80eLBfrN769eSKPTxh/a/ndX/+iV1RflkOz1pF9c/b0/gW+cjeKDTVtW3UgVUtlwQNJkW4sHIuah/Y1CYbeRLOzhvpBizP+U8AA+9/JneW7pUz9341M/+OmtBy+b7MGD0oyqb3vwo5/45M+fjSqRT3xwYcMl94vzdA+eewafe6qkQMpD2JIHh8zMEGIxgXA7Xfq/qhxxSXA45naMSgAbAtFyMbhqVF55913hVHJXrPfnobCZxIrwq1jx4oyOHyMaiLekAv5/GuD/SVGAVH0KbnHS8CM4rmnTWj7o/vK5YB5r2t9reQ1+duJQ791DJ04cEkYOnfgJPOYNIQ0nRhoNPtoiOLE9zsmR6c1/qW4BbB/MYUfc3usDN1y9HYU9dIardwJjuud2hPXq7sU7Iu3/A0PZiA4AAHjadc6xasJQGMXxfzRatCCdSul0R6eg4AN0KnVw6SAdG+MlBPReiBF07yN07DP0YXwiT8K3JnDD7zs35yPAjH8S2ifhgSfzQJ6bh/KbOZW/zCMeuZjHyn/NU165qZWkEyWzbkPrgfxiHsoLcyp/mEc8820eK/8xT1nxR0VB5KgTCVAV8Rij8Imn5MyBnFqjL8+HXOj7vi/fak/NSfdt7liS6S/Z+vpUxeCW2aK/+97NjVqltoRuU67Zs1e246r3uuturJupFEPjSh98nTd+73ZXty7iRvsy7uXbPkN42n3Ox04EMRCEYf+zsEvOOS05g+zJc5yw8yqAhBAXDrw90nSd8eVTu1plu8j9f7xzRC5i5EbMMc+YCQssssQyK6yyxjobbLLFNjvsssc+BxxyxDEnnHLGlHMuuOSKa2645Y57HnjkiWdeeB2/ff5+v4fJz9eH935wVvlU1mbQfaI5bc28kKVZaq+szMqbs1iqt0+k9nrrqzPrr/NYJjKVmSxlbxZBFlJ5UUn1Fo3Ue+Xwv94nwUw1Z6VZ5WarvBv6+xAsD7HmuJGt7My0NrvmD9P1ajwAAAAAAQAB//8AD3jaY2BkYGDgAWIxIGZiYARCfSBmAfMYAAWjAF542mNgYGBkAIKrS9Q5QPRt33MzYDQAQckGxgAA\") format(\"woff\")}.icon-square-m:before{content:\"\uE911\"}.icon-link:before{content:\"\uF0C1\"}.icon-caret-down:before{content:\"\uF0D7\"}.icon-unlink:before{content:\"\uF127\"}.icon-select_all:before{content:\"\uE904\"}.icon-copy:before{content:\"\uE93A\"}.icon-undo:before{content:\"\uE967\"}.icon-redo:before{content:\"\uE968\"}.icon-clipboard:before{content:\"\uE9E2\"}.icon-list-numbered:before{content:\"\uE9F3\"}.icon-list2:before{content:\"\uE9FC\"}.icon-scissors-bold:before{content:\"\uEA5A\"}.icon-bold:before{content:\"\uEA62\"}.icon-underline:before{content:\"\uEA63\"}.icon-italic:before{content:\"\uEA64\"}.icon-strikethrough:before{content:\"\uEA65\"}.icon-page-break:before{content:\"\uEA68\"}.icon-clear-formatting:before{content:\"\uEA6F\"}.icon-table:before{content:\"\uEA71\"}.icon-paragraph-left:before{content:\"\uEA77\"}.icon-paragraph-center:before{content:\"\uEA78\"}.icon-paragraph-right:before{content:\"\uEA79\"}.icon-paragraph-justify:before{content:\"\uEA7A\"}.icon-indent-increase:before{content:\"\uEA7B\"}.icon-indent-decrease:before{content:\"\uEA7C\"}.icon-embed:before{content:\"\uEA80\"}.icon-arrow-down:before{content:\"\uE90A\"}.icon-database:before{content:\"\uE94C\"}.icon-loader:before{content:\"\uE981\"}.icon-maximize:before{content:\"\uE989\"}.icon-minimize:before{content:\"\uE990\"}.icon-upload-cloud:before{content:\"\uE9E4\"}.icon-x-square:before{content:\"\uE9F9\"}.icon-smile-o:before{content:\"\uF118\"}.icon-font-color:before{content:\"\uF031\"}.icon-pencil:before{content:\"\uF040\"}.icon-check-circle-thin:before{content:\"\uF058\"}.icon-square-o:before{content:\"\uF096\"}.icon-superscript:before{content:\"\uF12B\"}.icon-subscript:before{content:\"\uF12C\"}.icon-eraser:before{content:\"\uF12D\"}.icon-check-square:before{content:\"\uF14A\"}.icon-circle-thin:before{content:\"\uF1DB\"}.z-editor-alert .wd-content,.z-editor-alert .wd-mask{height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999}.z-editor-alert .wd-content{overflow:auto}#z-editor-tip .wd-tip,#z-editor-tip .wd-tip-for-scale{background-color:#333;border-radius:.3rem;color:#fff;filter:alpha(opacity=70);font-size:.75rem;left:50%;line-height:1;max-width:12rem;opacity:.7;padding:.7rem .8rem;position:fixed;text-align:center;z-index:9999999}#z-editor-tip .wd-tip{transform:translateX(-50%)}#z-editor-tip .trans1-enter{top:100%}#z-editor-tip .trans1-active{top:40%}#z-editor-tip .trans1-leave{top:100%}#z-editor-tip .trans2-enter{top:-100%}#z-editor-tip .trans2-active{top:40%}#z-editor-tip .trans2-leave{top:-100%}#z-editor-tip .scale-enter{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .scale-active{filter:alpha(opacity=70);opacity:.7;top:50%;transform:translate(-50%,-50%) scale(1)}#z-editor-tip .scale-leave{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .icon-loader{-webkit-animation:myloading 1s infinite forwards;animation:myloading 1s infinite forwards;display:inline-block}@-webkit-keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}#z-editor-window .wd-mask{background-color:#3a3434;filter:alpha(opacity=20);opacity:.2}#z-editor-window .wd-window{background-color:#fff;border-radius:.3rem;position:absolute;z-index:99999}#z-editor-window .wd-window-tool{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:#f4f4f4;border-radius:.3rem .3rem 0 0;cursor:pointer;line-height:2rem;user-select:none}#z-editor-window .wd-window-tool h3{float:left;font-size:1rem;padding-left:.7rem}#z-editor-window .wd-window-tool p{float:right;padding-right:.7rem}#z-editor-window .wd-window-tool .z-editor-icomoon{cursor:pointer;font-size:1rem;line-height:2rem}#z-editor-window .wd-window-tool:after{clear:both;content:\"\";display:block}#z-editor-window .wd-window-pannel{overflow:auto;padding:.7rem}#z-editor-window .trans1-enter{top:100%}#z-editor-window .trans1-active{top:20%}#z-editor-window .trans1-leave{top:100%}#z-editor-window .trans2-enter{top:-100%}#z-editor-window .trans2-active{top:20%}#z-editor-window .trans2-leave{top:-100%}#z-editor-window .scale-enter{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}#z-editor-window .scale-active{filter:alpha(opacity=100);opacity:1;top:20%;transform:scale(1)}#z-editor-window .scale-leave{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}.z-editor-checkbox{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;width:1rem}.z-editor-checkbox input{display:none}.z-editor-checkbox .z-editor-icomoon{cursor:pointer;font-size:1rem;vertical-align:middle}.z-editor-checkbox .wd-checkbox-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-checkbox .icon-check-square{color:#fa6464}.p .z-editor-checkbox .icon-check-square{color:#00c}.b .z-editor-checkbox .icon-check-square{color:#3b86cc}.g .z-editor-checkbox .icon-check-square{color:#19a519}.z-editor-radios{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.z-editor-radios .input-radio{display:none}.z-editor-radios .z-editor-icomoon{cursor:pointer;font-size:1rem}.z-editor-radios .z-editor-icomoon,.z-editor-radios span{line-height:1;vertical-align:middle}.z-editor-radios .wd-radio-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-radios .icon-check-circle-thin{color:#fa6464}.p .z-editor-radios .icon-check-circle-thin{color:#00c}.b .z-editor-radios .icon-check-circle-thin{color:#3b86cc}.g .z-editor-radios .icon-check-circle-thin{color:#19a519}.z-editor-link{color:grey;padding:0 1rem}.z-editor-link li{line-height:2.5rem}.z-editor-link li label{font-size:.875rem}.z-editor-link li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:20rem}.z-editor-link .wd-btn-group{text-align:right}.z-editor-link .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-link button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-link button:last-child{background-color:#fa6464}.p .z-editor-link button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-link button:last-child{background-color:#00c}.b .z-editor-link button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-link button:last-child{background-color:#3b86cc}.g .z-editor-link button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-link button:last-child{background-color:#19a519}.z-editor-table{color:grey;padding:0 1rem}.z-editor-table li{line-height:2rem}.z-editor-table li label{font-size:.875rem}.z-editor-table li input{border-radius:.2rem;height:1.5rem;margin-left:1rem;padding:0 .5rem;width:4rem}.z-editor-table .wd-btn-group{margin-top:.5rem;text-align:center}.z-editor-table .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-table button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-table button:last-child{background-color:#fa6464}.p .z-editor-table button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-table button:last-child{background-color:#00c}.b .z-editor-table button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-table button:last-child{background-color:#3b86cc}.g .z-editor-table button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-table button:last-child{background-color:#19a519}.z-editor-annex{color:grey;padding:0 1rem}.z-editor-annex .wd-edit-file{display:none}.z-editor-annex li{line-height:2.5rem}.z-editor-annex li>label{display:inline-block;font-size:.875rem}.z-editor-annex li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:17rem}.z-editor-annex .wd-radio-group-type{margin-left:1rem}.z-editor-annex .wd-radio-group-type label{margin-right:1.5rem}.z-editor-annex .wd-radio-group-type label::nth-child(3){margin-right:none}.z-editor-annex .wd-upload-local,.z-editor-annex .wd-use-link-confirm{border-radius:.3rem;color:#fff;cursor:pointer;font-weight:700;line-height:2.2rem;width:100%}.z-editor-annex .wd-upload-local{vertical-align:middle}.z-editor-annex .wd-upload-local .z-editor-icomoon{font-size:1rem;line-height:2.2rem}.z-editor-annex .wd-use-link-confirm{margin:.5rem 0}.r .z-editor-annex .wd-upload-local{background-color:#ef6ea8}.r .z-editor-annex .wd-use-link-confirm{background-color:#fa6464}.p .z-editor-annex .wd-upload-local{background-color:#5a06f5}.p .z-editor-annex .wd-use-link-confirm{background-color:#00c}.b .z-editor-annex .wd-upload-local{background-color:#00aeef}.b .z-editor-annex .wd-use-link-confirm{background-color:#3b86cc}.g .z-editor-annex .wd-upload-local{background-color:#0ebd0e}.g .z-editor-annex .wd-use-link-confirm{background-color:#19a519}.z-editor{background-color:#fff;text-align:left}.z-editor .fn-clearfix:after{clear:both;content:\"\";display:block;height:0;width:0}.z-editor .wd-editor-bar{border-bottom:1px solid #e6e6e6;border-top:1px solid #e6e6e6;font-size:.875rem;padding:.5rem 0 0}.z-editor .wd-edit-link-box{float:left;position:relative}.z-editor .wd-edit-link{border-radius:.2rem;cursor:pointer;display:inline-block;height:1.7rem;line-height:1.7rem;padding:0 .5rem;position:relative;text-align:center}.z-editor .wd-edit-link:hover{background-color:#e6e6e6}.z-editor .wd-edit-link:hover:before{border:.2rem solid transparent;border-bottom-color:#222;content:\"\";top:1.6rem}.z-editor .wd-edit-link:hover:after,.z-editor .wd-edit-link:hover:before{display:block;left:50%;opacity:.8;position:absolute;transform:translateX(-50%);z-index:1}.z-editor .wd-edit-link:hover:after{background-color:#222;border-radius:.3rem;color:#fff;content:attr(data-tip);font-size:.75rem;padding:0 .4rem;top:2rem;white-space:nowrap}.z-editor .wd-edit-link .z-editor-icomoon{font-size:.875rem}.z-editor .fontName .wd-edit-link,.z-editor .fontSize .wd-edit-link{text-align:left;width:6.2rem}.z-editor .fontName .wd-edit-link i,.z-editor .fontSize .wd-edit-link i{display:inline-block;line-height:1.7rem;position:absolute;right:.6rem}.z-editor .fontSize .wd-edit-link{width:6rem}.z-editor .formatBlock .wd-edit-link{width:4rem}.z-editor .wd-edit-link-active{background-color:#e6e6e6}.z-editor .backColor i,.z-editor .fontSize i,.z-editor .foreColor i,.z-editor .formatBlock i{margin-left:.5rem}.z-editor .wd-code-list,.z-editor .wd-font-name-list,.z-editor .wd-font-size-list,.z-editor .wd-format-block-list{background-color:#222;border-radius:.3rem;color:#fff;position:absolute;top:1.6rem;z-index:4}.z-editor .wd-code-list a,.z-editor .wd-font-name-list a,.z-editor .wd-font-size-list a,.z-editor .wd-format-block-list a{border-radius:.3rem;color:#fff;display:inline-block;padding:.2rem .5rem;width:100%}.z-editor .wd-code-list a:hover,.z-editor .wd-font-name-list a:hover,.z-editor .wd-font-size-list a:hover,.z-editor .wd-format-block-list a:hover{background-color:#444}.z-editor .wd-color-list{background-color:#fff;border:1px solid #f4f4f4;border-radius:.3rem;padding:.3rem;position:absolute;top:1.6rem;width:16.8rem;z-index:4}.z-editor .wd-color-list .wd-tr{height:1.6rem}.z-editor .wd-color-list .wd-td{float:left;height:1.2rem;margin:.2rem;position:relative;width:1.2rem}.z-editor .wd-color-list a{border-radius:.1rem;display:block;left:0;padding:.6rem;position:absolute;top:0}.z-editor .wd-color-list a:hover{left:-.1rem;padding:.7rem;top:-.1rem}.z-editor .wd-font-name-list{width:6.2rem}.z-editor .wd-font-size-list{width:6rem}.z-editor .wd-format-block-list{width:4rem}.z-editor .wd-code-list{width:6rem}.z-editor .backColor .icon-pencil,.z-editor .foreColor .icon-font-color{border-bottom:2px solid transparent;display:inline-block}.z-editor .wd-deitor-content{font-family:Microsoft Yahei;max-height:15rem;min-height:8rem;outline:none;overflow:auto;padding:.6rem}.z-editor .wd-deitor-content div,.z-editor .wd-deitor-content p{word-break:break-all}.z-editor .wd-deitor-content ol,.z-editor .wd-deitor-content ul{list-style-position:inside}.z-editor .wd-deitor-content ul li{list-style-type:disc}.z-editor .wd-deitor-content ol li{list-style-type:decimal}.z-editor .wd-deitor-content a{text-decoration:underline}.z-editor .wd-deitor-content table{width:100%}.z-editor .wd-deitor-content td{border:1px solid grey;min-width:4rem;padding:.5rem;word-break:break-all;word-wrap:break-word}.z-editor .wd-deitor-content pre{border-radius:.3rem;overflow:auto;padding:.5rem .2rem;white-space:pre}.z-editor .wd-edit-footer{padding:.5rem}.z-editor .wd-edit-footer-btn{float:right}.z-editor .wd-edit-footer-btn button{border-radius:.3rem;color:#fff;line-height:1.5rem;padding:0 .5rem}.z-editor .active{background-color:#e6e6e6}.z-editor .disabled{cursor:not-allowed;opacity:.5}.z-editor .disabled:hover{background-color:transparent}.z-editor .disabled:hover:after,.z-editor .disabled:hover:before{content:none}.r .z-editor .wd-code-list a:hover,.r .z-editor .wd-font-name-list a:hover,.r .z-editor .wd-font-size-list a:hover,.r .z-editor .wd-format-block-list a:hover{color:#ef6ea8}.r .z-editor .wd-deitor-content pre{background-color:#f1e9e9;color:#ef6ea8}.r .z-editor .wd-edit-footer-btn button{background-color:#ef6ea8}.p .z-editor .wd-code-list a:hover,.p .z-editor .wd-font-name-list a:hover,.p .z-editor .wd-font-size-list a:hover,.p .z-editor .wd-format-block-list a:hover{color:#5a06f5}.p .z-editor .wd-deitor-content pre{background-color:#e6ebf3;color:#5a06f5}.p .z-editor .wd-edit-footer-btn button{background-color:#5a06f5}.b .z-editor .wd-code-list a:hover,.b .z-editor .wd-font-name-list a:hover,.b .z-editor .wd-font-size-list a:hover,.b .z-editor .wd-format-block-list a:hover{color:#00aeef}.b .z-editor .wd-deitor-content pre{background-color:#e2f0f3;color:#00aeef}.b .z-editor .wd-edit-footer-btn button{background-color:#00aeef}.g .z-editor .wd-code-list a:hover,.g .z-editor .wd-font-name-list a:hover,.g .z-editor .wd-font-size-list a:hover,.g .z-editor .wd-format-block-list a:hover{color:#0ebd0e}.g .z-editor .wd-deitor-content pre{background-color:#e0f3e8;color:#0ebd0e}.g .z-editor .wd-edit-footer-btn button{background-color:#0ebd0e}"]
            }] }
];
/** @nocollapse */
AppZeditorComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DomService }
];
AppZeditorComponent.propDecorators = {
    options: [{ type: Input }],
    vhtml: [{ type: Input }],
    onInput: [{ type: Output }],
    hasBtn: [{ type: Input }],
    recieveContent: [{ type: Output }],
    theme: [{ type: Input }],
    uploadFile: [{ type: Output }],
    headerRef: [{ type: ViewChild, args: ['headerRef', { read: ElementRef, static: true },] }],
    editorRef: [{ type: ViewChild, args: ['editorRef', { read: ElementRef, static: true },] }],
    pannelRef: [{ type: ViewChild, args: ['pannelRef', { read: ElementRef, static: true },] }],
    footerRef: [{ type: ViewChild, args: ['footerRef', { read: ElementRef, static: true },] }],
    fontNameRef: [{ type: ViewChild, args: ['fontNameRef', { read: ElementRef, static: true },] }],
    fontSizeRef: [{ type: ViewChild, args: ['fontSizeRef', { read: ElementRef, static: true },] }],
    formatBlockRef: [{ type: ViewChild, args: ['formatBlockRef', { read: ElementRef, static: true },] }],
    foreColorRef: [{ type: ViewChild, args: ['foreColorRef', { read: ElementRef, static: true },] }],
    backColorRef: [{ type: ViewChild, args: ['backColorRef', { read: ElementRef, static: true },] }],
    codeRef: [{ type: ViewChild, args: ['codeRef', { read: ElementRef, static: true },] }]
};
if (false) {
    /**
     * 默认格式
     * @type {?}
     */
    AppZeditorComponent.FORMAT;
    /**
     * 传入的html
     * @type {?}
     */
    AppZeditorComponent.prototype.vhtml;
    /** @type {?} */
    AppZeditorComponent.prototype.onInput;
    /**
     * 是否有按钮
     * @type {?}
     */
    AppZeditorComponent.prototype.hasBtn;
    /** @type {?} */
    AppZeditorComponent.prototype.recieveContent;
    /** @type {?} */
    AppZeditorComponent.prototype.disabled;
    /**
     * 参数配置
     * @type {?}
     */
    AppZeditorComponent.prototype.options$;
    /**
     * 主题
     * @type {?}
     */
    AppZeditorComponent.prototype.theme;
    /**
     * 上传文件
     * @type {?}
     */
    AppZeditorComponent.prototype.uploadFile;
    /**
     * 编辑条视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.headerRef;
    /**
     * 编辑器整体视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.editorRef;
    /**
     * pannel视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.pannelRef;
    /** @type {?} */
    AppZeditorComponent.prototype.footerRef;
    /** @type {?} */
    AppZeditorComponent.prototype.fontNameRef;
    /** @type {?} */
    AppZeditorComponent.prototype.fontSizeRef;
    /** @type {?} */
    AppZeditorComponent.prototype.formatBlockRef;
    /** @type {?} */
    AppZeditorComponent.prototype.foreColorRef;
    /** @type {?} */
    AppZeditorComponent.prototype.backColorRef;
    /** @type {?} */
    AppZeditorComponent.prototype.codeRef;
    /**
     * 字体样式
     * @type {?}
     */
    AppZeditorComponent.prototype.fontFamilys;
    /**
     * 文本格式
     * @type {?}
     */
    AppZeditorComponent.prototype.formatBlocks;
    /**
     * 颜色
     * @type {?}
     */
    AppZeditorComponent.prototype.colors;
    /**
     * 字体大小
     * @type {?}
     */
    AppZeditorComponent.prototype.fontSizes;
    /**
     * code
     * @type {?}
     */
    AppZeditorComponent.prototype.codes;
    /**
     * 选中的字样
     * @type {?}
     */
    AppZeditorComponent.prototype.fontFamily;
    /**
     * 选中的字号
     * @type {?}
     */
    AppZeditorComponent.prototype.fontSize;
    /**
     * 文本格式
     * @type {?}
     */
    AppZeditorComponent.prototype.formatBlock;
    /**
     * 字体颜色
     * @type {?}
     */
    AppZeditorComponent.prototype.foreColor;
    /**
     * 高亮色
     * @type {?}
     */
    AppZeditorComponent.prototype.backColor;
    /**
     * 当前代码语言
     * @type {?}
     */
    AppZeditorComponent.prototype.code;
    /**
     * 是否打开字样面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFontFamilyPannel;
    /**
     * 是否打开字号面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFontSizePannel;
    /**
     * 是否打开文本格式面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFormatBlockPannel;
    /**
     * 是否打开字体颜色面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchForeColorPannel;
    /**
     * 是否打开背景色面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchBackColorPannel;
    /**
     * 是否打开代码语言面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchCodePannel;
    /**
     * 是否加粗
     * @type {?}
     */
    AppZeditorComponent.prototype.isBold;
    /**
     * 是否斜体
     * @type {?}
     */
    AppZeditorComponent.prototype.isItalic;
    /**
     * 是否下划线
     * @type {?}
     */
    AppZeditorComponent.prototype.isUnderline;
    /**
     * 是否删除线
     * @type {?}
     */
    AppZeditorComponent.prototype.isStrikeThrough;
    /**
     * 默认无上下标
     * @type {?}
     */
    AppZeditorComponent.prototype.scriptActive;
    /**
     * 默认左对齐
     * @type {?}
     */
    AppZeditorComponent.prototype.justifyActive;
    /**
     * 是否处于编辑状态中
     * @type {?}
     */
    AppZeditorComponent.prototype.isInEditStatus;
    /**
     * 记住的range
     * @type {?}
     */
    AppZeditorComponent.prototype.range;
    /**
     * 是否全屏, 默认false
     * @type {?}
     */
    AppZeditorComponent.prototype.full;
    /**
     * 父元素
     * @type {?}
     */
    AppZeditorComponent.prototype.parent;
    /**
     * 是否在代码区, 默认false
     * @type {?}
     */
    AppZeditorComponent.prototype.inCode;
    /** @type {?} */
    AppZeditorComponent.prototype.onChange;
    /** @type {?} */
    AppZeditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    AppZeditorComponent.prototype.render2;
    /**
     * @type {?}
     * @private
     */
    AppZeditorComponent.prototype.domService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgZeditorModule {
}
NgZeditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    AppZeditorComponent,
                    TipComponent,
                    WindowComponent,
                    UILinkComponent,
                    UITableComponent,
                    UIAnnexComponent,
                    CheckBoxComponent,
                    RadioGroupComponent,
                    SafeHtmlPipe
                ],
                providers: [
                    DomService
                ],
                entryComponents: [
                    TipComponent,
                    WindowComponent,
                    UILinkComponent,
                    UITableComponent,
                    UIAnnexComponent
                ],
                exports: [
                    AppZeditorComponent,
                    FormsModule,
                    CommonModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgZeditorModule, AppZeditorComponent as ɵa, DomService as ɵb, TipComponent as ɵc, WindowComponent as ɵd, UILinkComponent as ɵe, UITableComponent as ɵf, UIAnnexComponent as ɵg, CheckBoxComponent as ɵh, RadioGroupComponent as ɵi, SafeHtmlPipe as ɵj };
//# sourceMappingURL=bigbigbird-ng-zeditor.js.map
