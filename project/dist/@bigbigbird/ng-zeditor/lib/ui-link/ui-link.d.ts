import { DomService } from '../service/DomService';
export declare class UILinkComponent {
    private domService;
    /** 是否在新窗口打开 */
    checked: boolean;
    /** 标题 */
    title: string;
    /** url */
    url: string;
    /** 内容 */
    content: string;
    handler: any;
    parent: any;
    constructor(domService: DomService);
    /**
     * 发射form
     */
    emitLinkHTML(): void;
}
