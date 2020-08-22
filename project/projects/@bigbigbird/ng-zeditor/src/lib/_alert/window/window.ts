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

import {
    Component,
    ViewChild,
    ElementRef,
    Type,
    ViewContainerRef,
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injector
} from '@angular/core';
import { TYPE } from '../../service/tokens';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
})
export class WindowComponent {
    min: boolean = true;
    theme: string;
    animation: string;
    title: string;
    isScale: boolean;
    active: boolean;
    isMove: boolean;
    callback: any;
    leave: number;
    enter: number;
    content: string | Type<any>;
    handler: any;
    componentRef: ComponentRef<WindowComponent>;
    @ViewChild('mask', { read: ElementRef, static: true }) mask: ElementRef;
    @ViewChild('window', { read: ElementRef, static: true }) window: ElementRef;
    @ViewChild('component', { read: ViewContainerRef, static: true }) component: ViewContainerRef;
    get embeddedViewRef() {
        return this.componentRef.hostView as EmbeddedViewRef<any>;
    }
    get rootNode() {
        return this.embeddedViewRef.rootNodes[0];
    }
    get type() {
        return this.injector.get(TYPE) as string;
    }

    constructor(
        private injector: Injector,
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }
    /**
     * 放大缩小
     * @param e 点击事件
     */
    switchSize(e: any) {
        if (this.min) { // 当前状态为缩小，点击放大
            this.window.nativeElement.style.cssText = 'height:100%;width:100%;top:0;left:0;';
            this.min = false;
            const maximize = this.callback.maximize;
            // tslint:disable-next-line: no-unused-expression
            maximize && maximize();
        } else { // 当前状态为放大，点击缩小
            this.window.nativeElement.style.cssText = this.window.nativeElement._minStyle;
            this.min = true;
            const minimize = this.callback.minimize;
            // tslint:disable-next-line: no-unused-expression
            minimize && minimize();
        }
    }

    /**
     * 点击关闭弹窗
     * @param e 事件
     */
    close(e: any) {
        // 设置关闭时的渐变
        // 将行内top样式消除（优先级最高会覆盖css文件中的top样式），使css中离开时的top样式生效，否则css类trans1和trans2的离开渐变不生效
        this.window.nativeElement.style.cssText = this.window.nativeElement.style.cssText.replace(/top:(.*)?;/, '');
        this.window.nativeElement.style.transition = 'all ' + this.leave / 1000 + 's';
        this.active = false;
        this.mask.nativeElement.style.display = 'none';
        // 移除
        setTimeout(() => {
            window.document.body.removeChild(this.rootNode);
            this.applicationRef.detachView(this.embeddedViewRef);
            this.componentRef.destroy();
            this.componentRef = null;
            const close = this.callback.close;
            // tslint:disable-next-line: no-unused-expression
            close && close(e);

        }, this.leave);
    }

    /**
     * 初始化打开操作
     * @param  options?
     */
    beforeOpen(options?: WindowOptions) {
        // tslint:disable-next-line: max-line-length
        Object.assign(this, { title: '弹窗', animation: 'trans1', enter: 200, leave: 200, isScale: false, isMove: true, content: '什么也木有~', callback: {}, theme: '' }, options);
        if (this.type === 'string') { return; }
        this.component.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory( (this.content) as Type<any>);
        const componentRef = this.component.createComponent(factory);
        const componentInstance = componentRef.instance;
        componentInstance.parent = this;
        componentInstance.handler = this.handler;
    }

    /**
     * 打开弹窗
     */
    open(options?: WindowOptions) {
        this.beforeOpen(options);
        this.mask.nativeElement.style.display = 'block';
        this.applicationRef.attachView(this.embeddedViewRef);
        window.document.body.appendChild(this.rootNode);
        // 左右居中，top用css控制
        const w = this.window.nativeElement.offsetWidth;
        const h = this.window.nativeElement.offsetHeight;
        // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
        const ww = this.window.nativeElement.parentNode.offsetWidth;
        // 初始定位
        const leftStyle = 'left:' + ((ww - w) / 2) + 'px;';
        this.window.nativeElement.style.cssText += leftStyle;
        // 记录最小化时的样式
        this.window.nativeElement._minStyle = leftStyle + 'width:' + (w + 1) + 'px;height:' + (h + 1) + 'px;';
        // 设置打开时的渐变
        this.window.nativeElement.style.transition = 'all ' + (this.enter / 1000) + 's';
        // 进入激活状态（弹窗停留）
        setTimeout(() => this.active = true);
        // 取消渐变，否则移动会有渐变
        setTimeout(() => {
            this.window.nativeElement.style.transition = 'none';
        }, this.enter);
    }
    /**
     * 阻止拖拽
     * @param e 拖拽事件
     */
    tragstart(e: any) {
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
    }
    /**
     * 开始移动
     * @param e 事件
     */
    start(e: any) {
        // 全屏状态不可移动
        if (!this.min) { return; }
        // 移动参数传入false，不可移动
        if (!this.isMove) { return; }
        const point = {
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        };
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
     * 移动
     * @param e 事件
     */
    move = (e: any) => {
        const point = {
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        };
        let top = point.y + this.window.nativeElement._dis.y;
        let left = point.x + this.window.nativeElement._dis.x;
        // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
        let maxX = this.window.nativeElement.parentNode.clientWidth - this.window.nativeElement.offsetWidth;
        let maxY = this.window.nativeElement.parentNode.clientHeight - this.window.nativeElement.offsetHeight;
        if (maxX < 0) { maxX = 0; }
        if (maxY < 0) { maxY = 0; }
        // 判断是否越界
        if (top <= 0) { // y方向
            top = 0;
        } else if (top >= maxY) {
            top = maxY;
        }
        if (left <= 0) { // x方向
            left = 0;
        } else if (left >= maxX) {
            left = maxX - 1; // 消除误差，防止右拉过度导致宽度变小
        }
        this.window.nativeElement.style.top = top + 'px';
        this.window.nativeElement.style.left = left + 'px';
    }
    /**
     * 停止移动
     * @param e 事件
     */
    end(e: any) {
        window.onmouseup = null;
        window.onmousemove = null;
    }
}

export interface WindowOptions {
    /** 弹窗标题 */
    title?: string;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     */
    animation?: string;
    /** 进入过渡时间 */
    enter?: number;
    /** 离开过渡时间 */
    leave?: number;
    /** 回调 */
    callback?: WindowCallback;
    /** html | 组件 */
    content?: string | Type<any>;
    /** 窗体是否可放大缩小 */
    isScale?: boolean;
    /** 是否可移动 */
    isMove?: boolean;
    /**
     *  组件实例
     */
    handler?: any;
    // tslint:disable-next-line: jsdoc-format
    /** 主题 r g b p*/
    theme?: string;
}

/** 回调 */
export interface WindowCallback {
    /** 关闭回调 */
    close?(): void;
    /** 最小化回调 */
    minimize?(): void;
    /** 最大化回调 */
    maximize?(): void;
}
