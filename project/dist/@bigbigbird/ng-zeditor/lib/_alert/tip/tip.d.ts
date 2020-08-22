import { TemplateRef, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
export declare class TipComponent {
    private appRef;
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
    tip: TemplateRef<any>;
    readonly embeddedViewRef: EmbeddedViewRef<any>;
    readonly rootNode: any;
    readonly Infinity: number;
    constructor(appRef: ApplicationRef);
    /**
     * 打开
     * @param options 配置参数
     */
    open(options?: Options): void;
    /**
     * 关闭弹窗
     */
    close(): void;
}
export interface Options {
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
