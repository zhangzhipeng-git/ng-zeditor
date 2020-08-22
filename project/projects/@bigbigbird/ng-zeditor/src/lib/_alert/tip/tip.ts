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

import { Component, ViewChild, TemplateRef, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'app-tip',
    templateUrl: 'tip.component.html'
})

export class TipComponent {
    /** 是否激活 */
    active: boolean;
    /** 是否准备要激活 */
    ready: boolean;
    text: string;
    enter: number;
    leave: number;
    duration: number;
    animation: string;
    componentRef: ComponentRef<TipComponent>;
    @ViewChild('tip', {read: TemplateRef, static: true }) tip: TemplateRef<any>;
    get embeddedViewRef() {
        return this.componentRef.hostView as EmbeddedViewRef<any>;
    }
    get rootNode() {
        return this.embeddedViewRef.rootNodes[0];
    }
    get Infinity() {
        return Number.POSITIVE_INFINITY;
    }
    constructor(
        private appRef: ApplicationRef
    ) { }

    /**
     * 打开
     * @param options 配置参数
     */
    open(options?: Options) {
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
        const t = setTimeout(() => { clearTimeout(t); this.active = true; });
        // 非手动关闭，在指定时间后关闭
        if (this.duration !== -1 && this.duration !== Infinity) { this.close(); }
    }

    /**
     * 关闭弹窗
     */
    close() {
        // 离开
        const t1 = setTimeout(() => {
            clearTimeout(t1);
            this.ready = false;
            this.active = false;
        }, this.enter + this.duration);
        // 彻底移除
        const t2 = setTimeout(() => {
            clearTimeout(t2);
            window.document.body.removeChild(this.rootNode);
            this.appRef.detachView(this.embeddedViewRef);
        }, this.enter + this.duration + this.leave);
    }

}

export interface Options {
    /* 提示文字 */
    text?: string;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     */
    animation?: string;
    /** 停留时间 */
    duration?: number;
    /** 进入过渡时间 */
    enter?: number;
    /** 离开过渡时间 */
    leave?: number;
}
