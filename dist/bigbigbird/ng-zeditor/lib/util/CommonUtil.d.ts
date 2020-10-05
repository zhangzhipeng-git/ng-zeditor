export default class CommonUtil {
    /**
     * 根据元素id找元素
     * @param id 元素id
     */
    static id(id: string): HTMLElement;
    /**
     * 判断是否ie
     */
    static isIE(): boolean;
    /**
     * 找上一个节点
     * @param node 节点
     */
    static preSibling(node: Node): Node;
    /**
     * 找元素的所有子节点
     * @param p 父元素
     */
    static getAllChilds(p: HTMLElement, arr?: HTMLElement[]): HTMLElement[];
    /**
     * 判断p是否包含c
     * @param p 元素
     * @param c 元素
     */
    static contains(p: HTMLElement, c: HTMLElement): boolean;
    /**
     * 从低层次往高层次找第index个父节点，没有则返回null
     * @param  el 目标元素
     * @param  index 第index个父元素
     */
    static parent(el: HTMLElement, index?: number): HTMLElement;
    /**
     * rgb颜色串转以#开头的16进制颜色串
     * @param str rgb颜色串
     */
    static rgbToHex(str: string): string;
    /**
     * 将多维数组变为一维数组
     * @param arr 多维数组
     * @param box 容器
     */
    static flat(arr: Array<any>, box?: Array<any>): any[];
}
