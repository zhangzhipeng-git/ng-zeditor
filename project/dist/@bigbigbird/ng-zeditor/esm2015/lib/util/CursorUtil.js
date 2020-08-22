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
export default class CursorUtil {
    /**
     * 获取选区
     * @param {?=} elem
     * @return {?} Selection | TextRange
     */
    static getSelection(elem) {
        /** @type {?} */
        let selection;
        if (elem && document.activeElement !== elem)
            elem.focus();
        if (window.getSelection) {
            selection = window.getSelection();
        }
        else if (document.getSelection) {
            selection = document.getSelection();
        }
        else {
            selection = ((/** @type {?} */ (document))).selection.createRange();
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
        if (((/** @type {?} */ (selection))).addRange) {
            ((/** @type {?} */ (selection))).removeAllRanges();
            ((/** @type {?} */ (selection))).addRange((/** @type {?} */ (range)));
            return;
        }
        // 旧标准
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
        if (((/** @type {?} */ (selection))).getRangeAt && ((/** @type {?} */ (selection))).rangeCount) { // 新标准
            return ((/** @type {?} */ (selection))).getRangeAt(index);
        }
        else { // 旧标准
            return ((/** @type {?} */ (selection)));
        }
    }
    /**
     * 选中元素elem的内容
     * @param {?} elem
     * @return {?}
     */
    static selectSelectionElementChilds(elem) {
        if (!elem)
            return;
        /** @type {?} */
        const selection = this.getSelection();
        if (((/** @type {?} */ (selection))).selectAllChildren) {
            ((/** @type {?} */ (selection))).selectAllChildren(elem);
            return;
        }
        ((/** @type {?} */ (selection))).moveToElementText(elem);
        ((/** @type {?} */ (selection))).select();
    }
    /**
     * 选中元素elem的内容
     * @param {?} elem
     * @param {?=} index ? 默认0 range下标
     * @return {?}
     */
    static selectRangeElementChilds(elem, index = 0) {
        if (!elem)
            return;
        /** @type {?} */
        const range = this.getRange(index);
        if (((/** @type {?} */ (range))).selectNodeContents) {
            ((/** @type {?} */ (range))).selectNodeContents(elem);
            return;
        }
        ((/** @type {?} */ (range))).moveToElementText(elem);
        ((/** @type {?} */ (range))).select();
    }
    /**
     * 将范围设置到元素并折叠
     * @param {?} elem 元素，该元素可以是不可聚焦的元素
     * @param {?} isStart 是否折叠到开头
     * @param {?=} index ? 默认0 range下标
     * @return {?}
     */
    static setRangeToElement(elem, isStart, index = 0) {
        this.selectRangeElementChilds(elem, index);
        /** @type {?} */
        const range = this.getRange(index);
        // 新标准
        if (((/** @type {?} */ (range))).selectNodeContents) {
            ((/** @type {?} */ (range))).collapse(isStart);
            return;
        }
        // 旧标准
        ((/** @type {?} */ (range))).collapse(!isStart);
        ((/** @type {?} */ (range))).select();
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
        if (isStart && ((/** @type {?} */ (selection))).collapseToStart) {
            ((/** @type {?} */ (selection))).collapseToStart();
            return;
        }
        if (!isStart && ((/** @type {?} */ (selection))).collapseToEnd) {
            ((/** @type {?} */ (selection))).collapseToEnd();
            return;
        }
        // 旧标准
        ((/** @type {?} */ (selection))).collapse(!isStart);
        ((/** @type {?} */ (selection))).select();
    }
    /**
     * 获取选区的选中的文本
     * @return {?} string 选区文本
     */
    static getSelectionText() {
        /** @type {?} */
        const selection = this.getSelection();
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
        return ((/** @type {?} */ (range))).toString() || ((/** @type {?} */ (range))).text;
    }
    /**
     * 设置range的起始和结束位置相对于各自的容器的偏移量
     * @param {?} s 起始偏移
     * @param {?} e 尾部偏移
     * @param {?=} index
     * @return {?}
     */
    static setRangeOffset(s, e, index = 0) {
        /** @type {?} */
        let range = this.getRange(index);
        if (((/** @type {?} */ (range))).setEnd) {
            range = (/** @type {?} */ (range));
            range.setStart(range.startContainer, s);
            range.setEnd(range.endContainer, e);
            return;
        }
        // 重置TextRange到头部
        ((/** @type {?} */ (range))).collapse(false);
        ((/** @type {?} */ (range))).select();
        ((/** @type {?} */ (range))).moveEnd('charactor', e);
        ((/** @type {?} */ (range))).moveStart('charactor', e);
        ((/** @type {?} */ (range))).select();
    }
    /**
     * 设置选区的起始和结束位置相对于各自的容器的偏移量
     * @param {?} s 起始位置偏移量
     * @param {?=} e
     * @return {?}
     */
    static setSelectionOffset(s, e) {
        if (e === void 0) {
            e = s;
        }
        /** @type {?} */
        let selection = this.getSelection();
        if (((/** @type {?} */ (selection))).setBaseAndExtent) {
            selection = (/** @type {?} */ (selection));
            if (!selection.anchorNode || !selection.focusNode) {
                return;
            }
            selection.setBaseAndExtent(selection.anchorNode, s, selection.focusNode, e);
            return;
        }
        // 重置TextRange到头部
        ((/** @type {?} */ (selection))).collapse(false);
        ((/** @type {?} */ (selection))).select();
        ((/** @type {?} */ (selection))).moveEnd('charactor', e);
        ((/** @type {?} */ (selection))).moveStart('charactor', e);
        ((/** @type {?} */ (selection))).select();
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
        if (((/** @type {?} */ (range))).commonAncestorContainer) {
            return ((/** @type {?} */ (range))).commonAncestorContainer;
        }
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
        if (((/** @type {?} */ (range))).deleteContents) {
            ((/** @type {?} */ (range))).deleteContents();
            return;
        }
        ((/** @type {?} */ (range))).pasteHTML('');
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
        if (((/** @type {?} */ (range))).insertNode) {
            ((/** @type {?} */ (range))).insertNode(node);
            return;
        }
        ((/** @type {?} */ (range))).pasteHTML(((/** @type {?} */ (node))).outerHTML);
        ((/** @type {?} */ (range))).select();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL0BiaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91dGlsL0N1cnNvclV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLHdCQVdDOzs7SUFWRyw2QkFBaUI7O0lBQ2pCLHlCQUFhOzs7OztJQUNiLG9EQUE4Qjs7Ozs7SUFDOUIsb0RBQStCOzs7Ozs7SUFDL0IsdURBQThDOzs7Ozs7SUFDOUMsMERBQWlEOzs7Ozs7SUFDakQsNERBQW1EOzs7OztJQUNuRCw0REFBa0Q7Ozs7SUFDbEQsNkNBQWU7Ozs7SUFDZixvREFBNkI7Ozs7O0FBS2pDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVTs7Ozs7O0lBTzNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBa0I7O1lBQzlCLFNBQVM7UUFDYixJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUk7WUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUQsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDOUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QzthQUFNO1lBQ0gsU0FBUyxHQUFHLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFPRCxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQXdCOztjQUNuQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNyQyxNQUFNO1FBQ04sSUFBSSxDQUFDLG1CQUFLLFNBQVMsRUFBQSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNCLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QyxDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFPLEtBQUssRUFBQSxDQUFDLENBQUM7WUFDOUMsT0FBTztTQUNWO1FBQ0QsTUFBTTtRQUNOLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsR0FBRyxtQkFBVyxLQUFLLEVBQUEsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBUUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFhLEVBQUUsSUFBa0I7O2NBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxtQkFBVyxTQUFTLEVBQUEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU07WUFDaEYsT0FBTyxDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25EO2FBQU0sRUFBRSxNQUFNO1lBQ1gsT0FBTyxDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBaUI7UUFDakQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPOztjQUNaLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxtQkFBSyxTQUFTLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixFQUFFO1lBQ3BDLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxPQUFPO1NBQ1Y7UUFDRCxDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxtQkFBVyxTQUFTLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBaUIsRUFBRSxRQUFnQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTzs7Y0FDWixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsa0JBQWtCLEVBQUU7WUFDakMsQ0FBQyxtQkFBTyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE9BQU87U0FDVjtRQUNELENBQUMsbUJBQVcsS0FBSyxFQUFBLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7Ozs7SUFRRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBaUIsRUFBRSxPQUFnQixFQUFFLFFBQWdCLENBQUM7UUFDM0UsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs7Y0FDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xDLE1BQU07UUFDTixJQUFJLENBQUMsbUJBQUssS0FBSyxFQUFBLENBQUMsQ0FBQyxrQkFBa0IsRUFBRTtZQUNqQyxDQUFDLG1CQUFPLEtBQUssRUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUNELE1BQU07UUFDTixDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7SUFPRCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBaUIsRUFBRSxPQUFnQjtRQUM1RCxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7O2NBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3JDLE1BQU07UUFDTixJQUFJLE9BQU8sSUFBSSxDQUFDLG1CQUFLLFNBQVMsRUFBQSxDQUFDLENBQUMsZUFBZSxFQUFFO1lBQzdDLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsbUJBQUssU0FBUyxFQUFBLENBQUMsQ0FBQyxhQUFhLEVBQUU7WUFDNUMsQ0FBQyxtQkFBVyxTQUFTLEVBQUEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZDLE9BQU87U0FDVjtRQUNELE1BQU07UUFDTixDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxtQkFBVyxTQUFTLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBTUQsTUFBTSxDQUFDLGdCQUFnQjs7Y0FDYixTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNyQyxPQUFPLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFXLFNBQVMsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVFLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBZ0IsQ0FBQzs7Y0FDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxtQkFBTyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQVcsS0FBSyxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEUsQ0FBQzs7Ozs7Ozs7SUFRRCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsUUFBZ0IsQ0FBQzs7WUFDckQsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLEdBQUcsbUJBQU8sS0FBSyxFQUFBLENBQUM7WUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxpQkFBaUI7UUFDakIsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBUyxFQUFFLENBQVU7UUFDM0MsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDZCxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7O1lBQ0csU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDbkMsSUFBSSxDQUFDLG1CQUFLLFNBQVMsRUFBQSxDQUFDLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkMsU0FBUyxHQUFHLG1CQUFXLFNBQVMsRUFBQSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsT0FBTzthQUNWO1lBQ0QsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTztTQUNWO1FBQ0QsaUJBQWlCO1FBQ2pCLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxtQkFBVyxTQUFTLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hDLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsbUJBQVcsU0FBUyxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7OztJQVFELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFnQixDQUFDOztjQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsdUJBQXVCLEVBQUU7WUFDdEMsT0FBTyxDQUFDLG1CQUFPLEtBQUssRUFBQSxDQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDakQ7UUFDRCxPQUFPLENBQUMsbUJBQVcsS0FBSyxFQUFBLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBZ0IsQ0FBQzs7Y0FDakMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGNBQWMsRUFBRTtZQUM3QixDQUFDLG1CQUFPLEtBQUssRUFBQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDaEMsT0FBTztTQUNWO1FBQ0QsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBVSxFQUFFLFFBQWdCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQ3pCLENBQUMsbUJBQU8sS0FBSyxFQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsT0FBTztTQUNWO1FBQ0QsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFhLElBQUksRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxtQkFBVyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOWFieagh+W3peWFt+exu1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNjo0NCBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG4vKiog5pen5qCH5YeGUmFuZ2Xlr7nosaHvvIjlj6rliJflh7rluLjnlKjnmoTkuIDkupvlsZ7mgKflkozmlrnms5XvvIkgKi9cclxuaW50ZXJmYWNlIFRleHRSYW5nZSB7XHJcbiAgICBodG1sVGV4dDogc3RyaW5nO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgcGFzdGVIVE1MKGh0bWw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjb2xsYXBzZShpc0VuZDogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBtb3ZlKHR5cGU6ICdjaGFyYWN0b3InLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBtb3ZlRW5kKHR5cGU6ICdjaGFyYWN0b3InLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBtb3ZlU3RhcnQodHlwZTogJ2NoYXJhY3RvcicsIG9mZnNldDogbnVtYmVyKTogdm9pZDtcclxuICAgIG1vdmVUb0VsZW1lbnRUZXh0KG5vZGU6IEhUTUxFbGVtZW50IHwgTm9kZSk6IHZvaWQ7XHJcbiAgICBzZWxlY3QoKTogdm9pZDtcclxuICAgIHBhcmVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIOmAieWMuuWSjOiMg+WbtOW3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Vyc29yVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgInljLpcclxuICAgICAqIEBwYXJhbSAgZWxlbT8g6KaB6IGa54Sm55qE5YWD57Sg77yM5aaC5p6c5bey6IGa54Sm5Y+v5LiN5LygXHJcbiAgICAgKiBAcmV0dXJucyBTZWxlY3Rpb24gfCBUZXh0UmFuZ2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFNlbGVjdGlvbihlbGVtPzogSFRNTEVsZW1lbnQpOiBTZWxlY3Rpb24gfCBUZXh0UmFuZ2Uge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKGVsZW0gJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWxlbSkgZWxlbS5mb2N1cygpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb247XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u56ys5LiA5Liq6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gIHJhbmdlIOiMg+WbtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0Rmlyc3RSYW5nZShyYW5nZTogUmFuZ2UgfCBUZXh0UmFuZ2UpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIC8vIOaWsOagh+WHhlxyXG4gICAgICAgIGlmICgoPGFueT5zZWxlY3Rpb24pLmFkZFJhbmdlKSB7XHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPnNlbGVjdGlvbikucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPnNlbGVjdGlvbikuYWRkUmFuZ2UoPFJhbmdlPnJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDml6fmoIflh4ZcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pID0gPFRleHRSYW5nZT5yYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiMg+WbtFxyXG4gICAgICogQHBhcmFtICBpbmRleCDojIPlm7TkuIvmoIdcclxuICAgICAqIEBwYXJhbSAgZWxlbT8g6KaB6IGa54Sm55qE5YWD57Sg77yM5aaC5p6c5bey6IGa54Sm5Y+v5LiN5LygXHJcbiAgICAgKiBAcmV0dXJucyBSYW5nZSB8IFRleHRSYW5nZSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlKGluZGV4OiBudW1iZXIsIGVsZW0/OiBIVE1MRWxlbWVudCk6IFJhbmdlIHwgVGV4dFJhbmdlIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbihlbGVtKTtcclxuICAgICAgICBpZiAoKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5nZXRSYW5nZUF0ICYmICg8U2VsZWN0aW9uPnNlbGVjdGlvbikucmFuZ2VDb3VudCkgeyAvLyDmlrDmoIflh4ZcclxuICAgICAgICAgICAgcmV0dXJuICg8U2VsZWN0aW9uPnNlbGVjdGlvbikuZ2V0UmFuZ2VBdChpbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8g5pen5qCH5YeGXHJcbiAgICAgICAgICAgIHJldHVybiAoPFRleHRSYW5nZT5zZWxlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieS4reWFg+e0oGVsZW3nmoTlhoXlrrlcclxuICAgICAqIEBwYXJhbSAgZWxlbVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VsZWN0U2VsZWN0aW9uRWxlbWVudENoaWxkcyhlbGVtOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICghZWxlbSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnNlbGVjdGlvbikuc2VsZWN0QWxsQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5zZWxlY3RBbGxDaGlsZHJlbihlbGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLm1vdmVUb0VsZW1lbnRUZXh0KGVsZW0pO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInkuK3lhYPntKBlbGVt55qE5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gIGVsZW1cclxuICAgICAqIEBwYXJhbSBpbmRleCA/IOm7mOiupDAgcmFuZ2XkuIvmoIdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNlbGVjdFJhbmdlRWxlbWVudENoaWxkcyhlbGVtOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoIWVsZW0pIHJldHVybjtcclxuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoaW5kZXgpO1xyXG4gICAgICAgIGlmICgoPGFueT5yYW5nZSkuc2VsZWN0Tm9kZUNvbnRlbnRzKSB7XHJcbiAgICAgICAgICAgICg8UmFuZ2U+cmFuZ2UpLnNlbGVjdE5vZGVDb250ZW50cyhlbGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkubW92ZVRvRWxlbWVudFRleHQoZWxlbSk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG6IyD5Zu06K6+572u5Yiw5YWD57Sg5bm25oqY5Y+gXHJcbiAgICAgKiBAcGFyYW0gIGVsZW0g5YWD57Sg77yM6K+l5YWD57Sg5Y+v5Lul5piv5LiN5Y+v6IGa54Sm55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXNTdGFydCDmmK/lkKbmipjlj6DliLDlvIDlpLRcclxuICAgICAqIEBwYXJhbSBpbmRleCA/IOm7mOiupDAgcmFuZ2XkuIvmoIdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFJhbmdlVG9FbGVtZW50KGVsZW06IEhUTUxFbGVtZW50LCBpc1N0YXJ0OiBib29sZWFuLCBpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UmFuZ2VFbGVtZW50Q2hpbGRzKGVsZW0sIGluZGV4KTtcclxuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoaW5kZXgpO1xyXG4gICAgICAgIC8vIOaWsOagh+WHhlxyXG4gICAgICAgIGlmICgoPGFueT5yYW5nZSkuc2VsZWN0Tm9kZUNvbnRlbnRzKSB7XHJcbiAgICAgICAgICAgICg8UmFuZ2U+cmFuZ2UpLmNvbGxhcHNlKGlzU3RhcnQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaXp+agh+WHhlxyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5jb2xsYXBzZSghaXNTdGFydCk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6YCJ5Yy65Yiw5p+Q5Liq5YWD57Sg77yM5bm25oqY5Y+gXHJcbiAgICAgKiBAcGFyYW0gIGVsZW0g5YWD57Sg77yM6K+l5YWD57Sg5Y+v5Lul5piv5LiN5Y+v6IGa54Sm55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXNTdGFydCDmmK/lkKbmipjlj6DliLDlvIDlpLRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFNlbGVjdGlvblRvRWxlbWVudChlbGVtOiBIVE1MRWxlbWVudCwgaXNTdGFydDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0U2VsZWN0aW9uRWxlbWVudENoaWxkcyhlbGVtKTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIC8vIOaWsOagh+WHhlxyXG4gICAgICAgIGlmIChpc1N0YXJ0ICYmICg8YW55PnNlbGVjdGlvbikuY29sbGFwc2VUb1N0YXJ0KSB7XHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPnNlbGVjdGlvbikuY29sbGFwc2VUb1N0YXJ0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1N0YXJ0ICYmICg8YW55PnNlbGVjdGlvbikuY29sbGFwc2VUb0VuZCkge1xyXG4gICAgICAgICAgICAoPFNlbGVjdGlvbj5zZWxlY3Rpb24pLmNvbGxhcHNlVG9FbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDml6fmoIflh4ZcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLmNvbGxhcHNlKCFpc1N0YXJ0KTtcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOiOt+WPlumAieWMuueahOmAieS4reeahOaWh+acrFxyXG4gICAgICogQHJldHVybnMgc3RyaW5nIOmAieWMuuaWh+acrFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0U2VsZWN0aW9uVGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuICg8U2VsZWN0aW9uPnNlbGVjdGlvbikudG9TdHJpbmcoKSB8fCAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4i+agh+S4umluZGV455qE6IyD5Zu05paH5pysXHJcbiAgICAgKiBAcGFyYW0gIGluZGV4ID8g6IyD5Zu05LiL5qCH77yM5pen5qCH5YeG5bCx5Y+q5pyJ5LiA5LiqXHJcbiAgICAgKiBAcmV0dXJucyBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlVGV4dChpbmRleDogbnVtYmVyID0gMCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICByZXR1cm4gKDxSYW5nZT5yYW5nZSkudG9TdHJpbmcoKSB8fCAoPFRleHRSYW5nZT5yYW5nZSkudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rnJhbmdl55qE6LW35aeL5ZKM57uT5p2f5L2N572u55u45a+55LqO5ZCE6Ieq55qE5a655Zmo55qE5YGP56e76YePXHJcbiAgICAgKiBAcGFyYW0gIHMg6LW35aeL5YGP56e7XHJcbiAgICAgKiBAcGFyYW0gIGUg5bC+6YOo5YGP56e7XHJcbiAgICAgKiBAcGFyYW0gIGluZGV477yf6buY6K6kMO+8jCDojIPlm7TkuIvmoIfvvIzml6fmoIflh4blsLHkuIDkuKpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFJhbmdlT2Zmc2V0KHM6IG51bWJlciwgZTogbnVtYmVyLCBpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGxldCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoaW5kZXgpO1xyXG4gICAgICAgIGlmICgoPGFueT5yYW5nZSkuc2V0RW5kKSB7XHJcbiAgICAgICAgICAgIHJhbmdlID0gPFJhbmdlPnJhbmdlO1xyXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChyYW5nZS5zdGFydENvbnRhaW5lciwgcyk7XHJcbiAgICAgICAgICAgIHJhbmdlLnNldEVuZChyYW5nZS5lbmRDb250YWluZXIsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjee9rlRleHRSYW5nZeWIsOWktOmDqFxyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5tb3ZlRW5kKCdjaGFyYWN0b3InLCBlKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkubW92ZVN0YXJ0KCdjaGFyYWN0b3InLCBlKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7pgInljLrnmoTotbflp4vlkoznu5PmnZ/kvY3nva7nm7jlr7nkuo7lkIToh6rnmoTlrrnlmajnmoTlgY/np7vph49cclxuICAgICAqIEBwYXJhbSAgcyDotbflp4vkvY3nva7lgY/np7vph49cclxuICAgICAqIEBwYXJhbSAgZT8g57uT5p2f5L2N572u5YGP56e76YePXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRTZWxlY3Rpb25PZmZzZXQoczogbnVtYmVyLCBlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGUgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBlID0gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnNlbGVjdGlvbikuc2V0QmFzZUFuZEV4dGVudCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSA8U2VsZWN0aW9uPnNlbGVjdGlvbjtcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24uYW5jaG9yTm9kZSB8fCAhc2VsZWN0aW9uLmZvY3VzTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5zZXRCYXNlQW5kRXh0ZW50KHNlbGVjdGlvbi5hbmNob3JOb2RlLCBzLCBzZWxlY3Rpb24uZm9jdXNOb2RlLCBlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDph43nva5UZXh0UmFuZ2XliLDlpLTpg6hcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLmNvbGxhcHNlKGZhbHNlKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLnNlbGVjdCgpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikubW92ZUVuZCgnY2hhcmFjdG9yJywgZSk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+c2VsZWN0aW9uKS5tb3ZlU3RhcnQoJ2NoYXJhY3RvcicsIGUpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlnJhbmdl6LW35aeL5L2N572u5ZKM57uT5p2f5L2N572u55qE5pyA5rWF55qE54i25YWD57SgXHJcbiAgICAgKiBcclxuICAgICAqIOavlOWmgu+8mlxcPHBcXD4ocmFuZ2Utc3RhcnQpMTIzKHJhbmdlLWVuZClcXDwvcFxcPueahOWFrOWFseeItuWFg+e0oOS4unRleHTvvIzogIzkuI3mmK9w5qCH562+XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyDlj6/pgInvvIzpu5jorqTnrKzkuIDkuKrvvIzml6fmoIflh4blsLEx5LiqXHJcbiAgICAgKiBAcmV0dXJucyBOb2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSYW5nZUNvbW1vblBhcmVudChpbmRleDogbnVtYmVyID0gMCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKDxSYW5nZT5yYW5nZSkuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoPFRleHRSYW5nZT5yYW5nZSkucGFyZW50RWxlbWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YCJ5Lit5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyByYW5nZeWvueixoeS4i+agh++8jOm7mOiupDBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRlbGV0ZVJhbmdlQ29udGVudChpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5kZWxldGVDb250ZW50cykge1xyXG4gICAgICAgICAgICAoPFJhbmdlPnJhbmdlKS5kZWxldGVDb250ZW50cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5wYXN0ZUhUTUwoJycpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeiKgueCuVxyXG4gICAgICogQHBhcmFtICBub2RlIOiKgueCuVxyXG4gICAgICogQHBhcmFtICBpbmRleD8gcmFuZ2Xlr7nosaHkuIvmoIfvvIzpu5jorqQwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnNlcnROb2RlKG5vZGU6IE5vZGUsIGluZGV4OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVSYW5nZUNvbnRlbnQoaW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5pbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgICg8UmFuZ2U+cmFuZ2UpLmluc2VydE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnBhc3RlSFRNTCgoPEhUTUxFbGVtZW50Pm5vZGUpLm91dGVySFRNTCk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG59Il19