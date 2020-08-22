import { ElementRef, Type, ViewContainerRef, ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector } from '@angular/core';
export declare class WindowComponent {
    private injector;
    private applicationRef;
    private componentFactoryResolver;
    min: boolean;
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
    mask: ElementRef;
    window: ElementRef;
    component: ViewContainerRef;
    readonly embeddedViewRef: EmbeddedViewRef<any>;
    readonly rootNode: any;
    readonly type: string;
    constructor(injector: Injector, applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver);
    /**
     * 放大缩小
     * @param e 点击事件
     */
    switchSize(e: any): void;
    /**
     * 点击关闭弹窗
     * @param e 事件
     */
    close(e: any): void;
    /**
     * 初始化打开操作
     * @param  options?
     */
    beforeOpen(options?: WindowOptions): void;
    /**
     * 打开弹窗
     */
    open(options?: WindowOptions): void;
    /**
     * 阻止拖拽
     * @param e 拖拽事件
     */
    tragstart(e: any): void;
    /**
     * 开始移动
     * @param e 事件
     */
    start(e: any): void;
    /**
     * 移动
     * @param e 事件
     */
    move: (e: any) => void;
    /**
     * 停止移动
     * @param e 事件
     */
    end(e: any): void;
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
