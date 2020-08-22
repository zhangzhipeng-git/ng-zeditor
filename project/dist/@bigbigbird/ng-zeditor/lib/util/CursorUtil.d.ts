/** 旧标准Range对象（只列出常用的一些属性和方法） */
interface TextRange {
    htmlText: string;
    text: string;
    pasteHTML(html: string): void;
    collapse(isEnd: boolean): void;
    move(type: 'charactor', offset: number): void;
    moveEnd(type: 'charactor', offset: number): void;
    moveStart(type: 'charactor', offset: number): void;
    moveToElementText(node: HTMLElement | Node): void;
    select(): void;
    parentElement(): HTMLElement;
}
/**
 * 选区和范围工具类
 */
export default class CursorUtil {
    /**
     * 获取选区
     * @param  elem? 要聚焦的元素，如果已聚焦可不传
     * @returns Selection | TextRange
     */
    static getSelection(elem?: HTMLElement): Selection | TextRange;
    /**
     * 设置第一个范围
     * @param  range 范围
     */
    static setFirstRange(range: Range | TextRange): void;
    /**
     * 获取范围
     * @param  index 范围下标
     * @param  elem? 要聚焦的元素，如果已聚焦可不传
     * @returns Range | TextRange
     */
    static getRange(index: number, elem?: HTMLElement): Range | TextRange;
    /**
     * 选中元素elem的内容
     * @param  elem
     */
    static selectSelectionElementChilds(elem: HTMLElement): void;
    /**
     * 选中元素elem的内容
     * @param  elem
     * @param index ? 默认0 range下标
     */
    static selectRangeElementChilds(elem: HTMLElement, index?: number): void;
    /**
     * 将范围设置到元素并折叠
     * @param  elem 元素，该元素可以是不可聚焦的元素
     * @param isStart 是否折叠到开头
     * @param index ? 默认0 range下标
     */
    static setRangeToElement(elem: HTMLElement, isStart: boolean, index?: number): void;
    /**
     * 设置选区到某个元素，并折叠
     * @param  elem 元素，该元素可以是不可聚焦的元素
     * @param isStart 是否折叠到开头
     */
    static setSelectionToElement(elem: HTMLElement, isStart: boolean): void;
    /**
     * 获取选区的选中的文本
     * @returns string 选区文本
     */
    static getSelectionText(): string;
    /**
     * 获取下标为index的范围文本
     * @param  index ? 范围下标，旧标准就只有一个
     * @returns string
     */
    static getRangeText(index?: number): string;
    /**
     * 设置range的起始和结束位置相对于各自的容器的偏移量
     * @param  s 起始偏移
     * @param  e 尾部偏移
     * @param  index？默认0， 范围下标，旧标准就一个
     */
    static setRangeOffset(s: number, e: number, index?: number): void;
    /**
     * 设置选区的起始和结束位置相对于各自的容器的偏移量
     * @param  s 起始位置偏移量
     * @param  e? 结束位置偏移量
     */
    static setSelectionOffset(s: number, e?: number): void;
    /**
     * 获取range起始位置和结束位置的最浅的父元素
     *
     * 比如：\<p\>(range-start)123(range-end)\</p\>的公共父元素为text，而不是p标签
     * @param  index? 可选，默认第一个，旧标准就1个
     * @returns Node
     */
    static getRangeCommonParent(index?: number): Node;
    /**
     * 删除选中内容
     * @param  index? range对象下标，默认0
     */
    static deleteRangeContent(index?: number): void;
    /**
     * 插入节点
     * @param  node 节点
     * @param  index? range对象下标，默认0
     */
    static insertNode(node: Node, index?: number): void;
}
export {};
