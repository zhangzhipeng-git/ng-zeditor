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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3V0aWwvQ3Vyc29yVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsd0JBV0M7OztJQVZHLDZCQUFpQjs7SUFDakIseUJBQWE7Ozs7O0lBQ2Isb0RBQThCOzs7OztJQUM5QixvREFBK0I7Ozs7OztJQUMvQix1REFBOEM7Ozs7OztJQUM5QywwREFBaUQ7Ozs7OztJQUNqRCw0REFBbUQ7Ozs7O0lBQ25ELDREQUFrRDs7OztJQUNsRCw2Q0FBZTs7OztJQUNmLG9EQUE2Qjs7Ozs7QUFLakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVOzs7Ozs7SUFPM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFrQjs7WUFDOUIsU0FBUztRQUNiLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSTtZQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDckIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQzthQUFNLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtZQUM5QixTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZDO2FBQU07WUFDSCxTQUFTLEdBQUcsQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2RDtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQU9ELE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBd0I7O2NBQ25DLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ3JDLE1BQU07UUFDTixJQUFJLENBQUMsbUJBQUssU0FBUyxFQUFBLENB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QUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsY0FBYyxFQUFFO1lBQzdCLENBQUMsbUJBQU8sS0FBSyxFQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsbUJBQVcsS0FBSyxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFVLEVBQUUsUUFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7O2NBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsbUJBQUssS0FBSyxFQUFBLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDekIsQ0FBQyxtQkFBTyxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQWEsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxDQUFDLG1CQUFXLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog5YWJ5qCH5bel5YW357G7XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM2OjQ0IGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbi8qKiDml6fmoIflh4ZSYW5nZeWvueixoe+8iOWPquWIl+WHuuW4uOeUqOeahOS4gOS6m+WxnuaAp+WSjOaWueazle+8iSAqL1xyXG5pbnRlcmZhY2UgVGV4dFJhbmdlIHtcclxuICAgIGh0bWxUZXh0OiBzdHJpbmc7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBwYXN0ZUhUTUwoaHRtbDogc3RyaW5nKTogdm9pZDtcclxuICAgIGNvbGxhcHNlKGlzRW5kOiBib29sZWFuKTogdm9pZDtcclxuICAgIG1vdmUodHlwZTogJ2NoYXJhY3RvcicsIG9mZnNldDogbnVtYmVyKTogdm9pZDtcclxuICAgIG1vdmVFbmQodHlwZTogJ2NoYXJhY3RvcicsIG9mZnNldDogbnVtYmVyKTogdm9pZDtcclxuICAgIG1vdmVTdGFydCh0eXBlOiAnY2hhcmFjdG9yJywgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgbW92ZVRvRWxlbWVudFRleHQobm9kZTogSFRNTEVsZW1lbnQgfCBOb2RlKTogdm9pZDtcclxuICAgIHNlbGVjdCgpOiB2b2lkO1xyXG4gICAgcGFyZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudDtcclxufVxyXG4vKipcclxuICog6YCJ5Yy65ZKM6IyD5Zu05bel5YW357G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJzb3JVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumAieWMulxyXG4gICAgICogQHBhcmFtICBlbGVtPyDopoHogZrnhKbnmoTlhYPntKDvvIzlpoLmnpzlt7LogZrnhKblj6/kuI3kvKBcclxuICAgICAqIEByZXR1cm5zIFNlbGVjdGlvbiB8IFRleHRSYW5nZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0U2VsZWN0aW9uKGVsZW0/OiBIVE1MRWxlbWVudCk6IFNlbGVjdGlvbiB8IFRleHRSYW5nZSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbjtcclxuICAgICAgICBpZiAoZWxlbSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbGVtKSBlbGVtLmZvY3VzKCk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9ICg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nrKzkuIDkuKrojIPlm7RcclxuICAgICAqIEBwYXJhbSAgcmFuZ2Ug6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRGaXJzdFJhbmdlKHJhbmdlOiBSYW5nZSB8IFRleHRSYW5nZSkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgLy8g5paw5qCH5YeGXHJcbiAgICAgICAgaWYgKCg8YW55PnNlbGVjdGlvbikuYWRkUmFuZ2UpIHtcclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5hZGRSYW5nZSg8UmFuZ2U+cmFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaXp+agh+WHhlxyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikgPSA8VGV4dFJhbmdlPnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4IOiMg+WbtOS4i+agh1xyXG4gICAgICogQHBhcmFtICBlbGVtPyDopoHogZrnhKbnmoTlhYPntKDvvIzlpoLmnpzlt7LogZrnhKblj6/kuI3kvKBcclxuICAgICAqIEByZXR1cm5zIFJhbmdlIHwgVGV4dFJhbmdlIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UmFuZ2UoaW5kZXg6IG51bWJlciwgZWxlbT86IEhUTUxFbGVtZW50KTogUmFuZ2UgfCBUZXh0UmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKGVsZW0pO1xyXG4gICAgICAgIGlmICgoPFNlbGVjdGlvbj5zZWxlY3Rpb24pLmdldFJhbmdlQXQgJiYgKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5yYW5nZUNvdW50KSB7IC8vIOaWsOagh+WHhlxyXG4gICAgICAgICAgICByZXR1cm4gKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5nZXRSYW5nZUF0KGluZGV4KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyDml6fmoIflh4ZcclxuICAgICAgICAgICAgcmV0dXJuICg8VGV4dFJhbmdlPnNlbGVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5Lit5YWD57SgZWxlbeeahOWGheWuuVxyXG4gICAgICogQHBhcmFtICBlbGVtXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZWxlY3RTZWxlY3Rpb25FbGVtZW50Q2hpbGRzKGVsZW06IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKCFlbGVtKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBpZiAoKDxhbnk+c2VsZWN0aW9uKS5zZWxlY3RBbGxDaGlsZHJlbikge1xyXG4gICAgICAgICAgICAoPFNlbGVjdGlvbj5zZWxlY3Rpb24pLnNlbGVjdEFsbENoaWxkcmVuKGVsZW0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikubW92ZVRvRWxlbWVudFRleHQoZWxlbSk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+c2VsZWN0aW9uKS5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieS4reWFg+e0oGVsZW3nmoTlhoXlrrlcclxuICAgICAqIEBwYXJhbSAgZWxlbVxyXG4gICAgICogQHBhcmFtIGluZGV4ID8g6buY6K6kMCByYW5nZeS4i+agh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VsZWN0UmFuZ2VFbGVtZW50Q2hpbGRzKGVsZW06IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGlmICghZWxlbSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5zZWxlY3ROb2RlQ29udGVudHMpIHtcclxuICAgICAgICAgICAgKDxSYW5nZT5yYW5nZSkuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5tb3ZlVG9FbGVtZW50VGV4dChlbGVtKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbojIPlm7Torr7nva7liLDlhYPntKDlubbmipjlj6BcclxuICAgICAqIEBwYXJhbSAgZWxlbSDlhYPntKDvvIzor6XlhYPntKDlj6/ku6XmmK/kuI3lj6/ogZrnhKbnmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpc1N0YXJ0IOaYr+WQpuaKmOWPoOWIsOW8gOWktFxyXG4gICAgICogQHBhcmFtIGluZGV4ID8g6buY6K6kMCByYW5nZeS4i+agh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0UmFuZ2VUb0VsZW1lbnQoZWxlbTogSFRNTEVsZW1lbnQsIGlzU3RhcnQ6IGJvb2xlYW4sIGluZGV4OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RSYW5nZUVsZW1lbnRDaGlsZHMoZWxlbSwgaW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgLy8g5paw5qCH5YeGXHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5zZWxlY3ROb2RlQ29udGVudHMpIHtcclxuICAgICAgICAgICAgKDxSYW5nZT5yYW5nZSkuY29sbGFwc2UoaXNTdGFydCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pen5qCH5YeGXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLmNvbGxhcHNlKCFpc1N0YXJ0KTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7pgInljLrliLDmn5DkuKrlhYPntKDvvIzlubbmipjlj6BcclxuICAgICAqIEBwYXJhbSAgZWxlbSDlhYPntKDvvIzor6XlhYPntKDlj6/ku6XmmK/kuI3lj6/ogZrnhKbnmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpc1N0YXJ0IOaYr+WQpuaKmOWPoOWIsOW8gOWktFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0U2VsZWN0aW9uVG9FbGVtZW50KGVsZW06IEhUTUxFbGVtZW50LCBpc1N0YXJ0OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RTZWxlY3Rpb25FbGVtZW50Q2hpbGRzKGVsZW0pO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgLy8g5paw5qCH5YeGXHJcbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgKDxhbnk+c2VsZWN0aW9uKS5jb2xsYXBzZVRvU3RhcnQpIHtcclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS5jb2xsYXBzZVRvU3RhcnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzU3RhcnQgJiYgKDxhbnk+c2VsZWN0aW9uKS5jb2xsYXBzZVRvRW5kKSB7XHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPnNlbGVjdGlvbikuY29sbGFwc2VUb0VuZCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaXp+agh+WHhlxyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuY29sbGFwc2UoIWlzU3RhcnQpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICog6I635Y+W6YCJ5Yy655qE6YCJ5Lit55qE5paH5pysXHJcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcg6YCJ5Yy65paH5pysXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRTZWxlY3Rpb25UZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICByZXR1cm4gKDxTZWxlY3Rpb24+c2VsZWN0aW9uKS50b1N0cmluZygpIHx8ICg8VGV4dFJhbmdlPnNlbGVjdGlvbikudGV4dDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiL5qCH5Li6aW5kZXjnmoTojIPlm7TmlofmnKxcclxuICAgICAqIEBwYXJhbSAgaW5kZXggPyDojIPlm7TkuIvmoIfvvIzml6fmoIflh4blsLHlj6rmnInkuIDkuKpcclxuICAgICAqIEByZXR1cm5zIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UmFuZ2VUZXh0KGluZGV4OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoaW5kZXgpO1xyXG4gICAgICAgIHJldHVybiAoPFJhbmdlPnJhbmdlKS50b1N0cmluZygpIHx8ICg8VGV4dFJhbmdlPnJhbmdlKS50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572ucmFuZ2XnmoTotbflp4vlkoznu5PmnZ/kvY3nva7nm7jlr7nkuo7lkIToh6rnmoTlrrnlmajnmoTlgY/np7vph49cclxuICAgICAqIEBwYXJhbSAgcyDotbflp4vlgY/np7tcclxuICAgICAqIEBwYXJhbSAgZSDlsL7pg6jlgY/np7tcclxuICAgICAqIEBwYXJhbSAgaW5kZXjvvJ/pu5jorqQw77yMIOiMg+WbtOS4i+agh++8jOaXp+agh+WHhuWwseS4gOS4qlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0UmFuZ2VPZmZzZXQoczogbnVtYmVyLCBlOiBudW1iZXIsIGluZGV4OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgaWYgKCg8YW55PnJhbmdlKS5zZXRFbmQpIHtcclxuICAgICAgICAgICAgcmFuZ2UgPSA8UmFuZ2U+cmFuZ2U7XHJcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHJhbmdlLnN0YXJ0Q29udGFpbmVyLCBzKTtcclxuICAgICAgICAgICAgcmFuZ2Uuc2V0RW5kKHJhbmdlLmVuZENvbnRhaW5lciwgZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN572uVGV4dFJhbmdl5Yiw5aS06YOoXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLmNvbGxhcHNlKGZhbHNlKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkuc2VsZWN0KCk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLm1vdmVFbmQoJ2NoYXJhY3RvcicsIGUpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5tb3ZlU3RhcnQoJ2NoYXJhY3RvcicsIGUpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnJhbmdlKS5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rumAieWMuueahOi1t+Wni+WSjOe7k+adn+S9jee9ruebuOWvueS6juWQhOiHqueahOWuueWZqOeahOWBj+enu+mHj1xyXG4gICAgICogQHBhcmFtICBzIOi1t+Wni+S9jee9ruWBj+enu+mHj1xyXG4gICAgICogQHBhcmFtICBlPyDnu5PmnZ/kvY3nva7lgY/np7vph49cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFNlbGVjdGlvbk9mZnNldChzOiBudW1iZXIsIGU/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGUgPSBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBpZiAoKDxhbnk+c2VsZWN0aW9uKS5zZXRCYXNlQW5kRXh0ZW50KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IDxTZWxlY3Rpb24+c2VsZWN0aW9uO1xyXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbi5hbmNob3JOb2RlIHx8ICFzZWxlY3Rpb24uZm9jdXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZWN0aW9uLnNldEJhc2VBbmRFeHRlbnQoc2VsZWN0aW9uLmFuY2hvck5vZGUsIHMsIHNlbGVjdGlvbi5mb2N1c05vZGUsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjee9rlRleHRSYW5nZeWIsOWktOmDqFxyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuY29sbGFwc2UoZmFsc2UpO1xyXG4gICAgICAgICg8VGV4dFJhbmdlPnNlbGVjdGlvbikuc2VsZWN0KCk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+c2VsZWN0aW9uKS5tb3ZlRW5kKCdjaGFyYWN0b3InLCBlKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5zZWxlY3Rpb24pLm1vdmVTdGFydCgnY2hhcmFjdG9yJywgZSk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+c2VsZWN0aW9uKS5zZWxlY3QoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WcmFuZ2Xotbflp4vkvY3nva7lkoznu5PmnZ/kvY3nva7nmoTmnIDmtYXnmoTniLblhYPntKBcclxuICAgICAqIFxyXG4gICAgICog5q+U5aaC77yaXFw8cFxcPihyYW5nZS1zdGFydCkxMjMocmFuZ2UtZW5kKVxcPC9wXFw+55qE5YWs5YWx54i25YWD57Sg5Li6dGV4dO+8jOiAjOS4jeaYr3DmoIfnrb5cclxuICAgICAqIEBwYXJhbSAgaW5kZXg/IOWPr+mAie+8jOm7mOiupOesrOS4gOS4qu+8jOaXp+agh+WHhuWwsTHkuKpcclxuICAgICAqIEByZXR1cm5zIE5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlQ29tbW9uUGFyZW50KGluZGV4OiBudW1iZXIgPSAwKTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICBpZiAoKDxhbnk+cmFuZ2UpLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoPFJhbmdlPnJhbmdlKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8VGV4dFJhbmdlPnJhbmdlKS5wYXJlbnRFbGVtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTpgInkuK3lhoXlrrlcclxuICAgICAqIEBwYXJhbSAgaW5kZXg/IHJhbmdl5a+56LGh5LiL5qCH77yM6buY6K6kMFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGVsZXRlUmFuZ2VDb250ZW50KGluZGV4OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICBpZiAoKDxhbnk+cmFuZ2UpLmRlbGV0ZUNvbnRlbnRzKSB7XHJcbiAgICAgICAgICAgICg8UmFuZ2U+cmFuZ2UpLmRlbGV0ZUNvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnBhc3RlSFRNTCgnJyk7XHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+cmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gIG5vZGUg6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyByYW5nZeWvueixoeS4i+agh++8jOm7mOiupDBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluc2VydE5vZGUobm9kZTogTm9kZSwgaW5kZXg6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZVJhbmdlQ29udGVudChpbmRleCk7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICBpZiAoKDxhbnk+cmFuZ2UpLmluc2VydE5vZGUpIHtcclxuICAgICAgICAgICAgKDxSYW5nZT5yYW5nZSkuaW5zZXJ0Tm9kZShub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkucGFzdGVIVE1MKCg8SFRNTEVsZW1lbnQ+bm9kZSkub3V0ZXJIVE1MKTtcclxuICAgICAgICAoPFRleHRSYW5nZT5yYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcbn0iXX0=