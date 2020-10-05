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
    static getSelection(elem?: HTMLElement): Selection | TextRange {
        let selection;
        // tslint:disable-next-line: curly
        if (elem && document.activeElement !== elem) elem.focus();
        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.getSelection) {
            selection = document.getSelection();
        } else {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            selection = (<any> document).body.createRange();
        }
        return selection;
    }


    /**
     * 设置第一个范围
     * @param  range 范围
     */
    static setFirstRange(range: Range | TextRange) {
        const selection = this.getSelection();
        // 新标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<any> selection).addRange) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Selection> selection).removeAllRanges();
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Selection> selection).addRange(<Range> range);
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> selection) = <TextRange> range;
    }

    /**
     * 获取范围
     * @param  index 范围下标
     * @param  elem? 要聚焦的元素，如果已聚焦可不传
     * @returns Range | TextRange 
     */
    static getRange(index: number, elem?: HTMLElement): Range | TextRange {
        const selection = this.getSelection(elem);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<Selection> selection).getRangeAt && (<Selection> selection).rangeCount) { // 新标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return (<Selection> selection).getRangeAt(index);
        } else { // 旧标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return (<TextRange> selection);
        }
    }

    /**
     * 选中元素elem的内容
     */
    static selectSelectionElementChilds(elem: HTMLElement) {
        // tslint:disable-next-line: curly
        if (!elem) return;
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<any> selection).selectAllChildren) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Selection> selection).selectAllChildren(elem);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> selection).moveToElementText(elem);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> selection).select();
    }

    /**
     * 设置选区到某个元素，并折叠
     * @param  elem 元素，该元素可以是不可聚焦的元素
     * @param isStart 是否折叠到开头
     */
    static setSelectionToElement(elem: HTMLElement, isStart: boolean) {
        this.selectSelectionElementChilds(elem);
        const selection = this.getSelection();
        // 新标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (isStart && (<any> selection).collapseToStart) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Selection> selection).collapseToStart();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (!isStart && (<any> selection).collapseToEnd) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Selection> selection).collapseToEnd();
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> selection).collapse(!isStart);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> selection).select();
    }

    /**
     * 获取选区的选中的文本
     * @returns string 选区文本
     */
    static getSelectionText(): string {
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return (<Selection> selection).toString() || (<TextRange> selection).text;
    }
    /**
     * 获取下标为index的范围文本
     * @param  index ? 范围下标，旧标准就只有一个
     * @returns string
     */
    static getRangeText(index: number = 0): string {
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return (<Range> range).toString() || (<TextRange> range).text;
    }

    /**
     * 获取range起始位置和结束位置的最浅的父元素
     * 
     * 比如：\<p\>(range-start)123(range-end)\</p\>的公共父元素为text，而不是p标签
     * @param  index? 可选，默认第一个，旧标准就1个
     * @returns Node
     */
    static getRangeCommonParent(index: number = 0): Node {
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<any> range).commonAncestorContainer) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return (<Range> range).commonAncestorContainer;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return (<TextRange> range).parentElement();
    }

    /**
     * 删除选中内容
     * @param  index? range对象下标，默认0
     */
    static deleteRangeContent(index: number = 0) {
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<any> range).deleteContents) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Range> range).deleteContents();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> range).pasteHTML('');
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> range).select();
    }

    /**
     * 插入节点
     * @param  node 节点
     * @param  index? range对象下标，默认0
     */
    static insertNode(node: Node, index: number = 0) {
        this.deleteRangeContent(index);
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if ((<any> range).insertNode) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            (<Range> range).insertNode(node);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> range).pasteHTML((<HTMLElement> node).outerHTML);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        (<TextRange> range).select();
    }
}
