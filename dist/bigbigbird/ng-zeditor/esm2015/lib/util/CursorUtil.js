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
        // tslint:disable-next-line: curly
        if (elem && document.activeElement !== elem)
            elem.focus();
        if (window.getSelection) {
            selection = window.getSelection();
        }
        else if (document.getSelection) {
            selection = document.getSelection();
        }
        else {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            selection = ((/** @type {?} */ (document))).body.createRange();
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).addRange) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).removeAllRanges();
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).addRange((/** @type {?} */ (range)));
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).getRangeAt && ((/** @type {?} */ (selection))).rangeCount) { // 新标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (selection))).getRangeAt(index);
        }
        else { // 旧标准
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (selection)));
        }
    }
    /**
     * 选中元素elem的内容
     * @param {?} elem
     * @return {?}
     */
    static selectSelectionElementChilds(elem) {
        // tslint:disable-next-line: curly
        if (!elem)
            return;
        /** @type {?} */
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (selection))).selectAllChildren) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).selectAllChildren(elem);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).moveToElementText(elem);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).select();
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (isStart && ((/** @type {?} */ (selection))).collapseToStart) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).collapseToStart();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (!isStart && ((/** @type {?} */ (selection))).collapseToEnd) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (selection))).collapseToEnd();
            return;
        }
        // 旧标准
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).collapse(!isStart);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (selection))).select();
    }
    /**
     * 获取选区的选中的文本
     * @return {?} string 选区文本
     */
    static getSelectionText() {
        /** @type {?} */
        const selection = this.getSelection();
        // tslint:disable-next-line: no-angle-bracket-type-assertion
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        return ((/** @type {?} */ (range))).toString() || ((/** @type {?} */ (range))).text;
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).commonAncestorContainer) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (range))).commonAncestorContainer;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).parentElement) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            return ((/** @type {?} */ (range))).parentElement();
        }
    }
    /**
     * 删除选中内容
     * @param {?=} index
     * @return {?}
     */
    static deleteRangeContent(index = 0) {
        /** @type {?} */
        const range = this.getRange(index);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).deleteContents) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (range))).deleteContents();
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).pasteHTML('');
        // tslint:disable-next-line: no-angle-bracket-type-assertion
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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (((/** @type {?} */ (range))).insertNode) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            ((/** @type {?} */ (range))).insertNode(node);
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).pasteHTML(((/** @type {?} */ (node))).outerHTML);
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        ((/** @type {?} */ (range))).select();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3V0aWwvQ3Vyc29yVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsd0JBV0M7OztJQVZHLDZCQUFpQjs7SUFDakIseUJBQWE7Ozs7O0lBQ2Isb0RBQThCOzs7OztJQUM5QixvREFBK0I7Ozs7OztJQUMvQix1REFBOEM7Ozs7OztJQUM5QywwREFBaUQ7Ozs7OztJQUNqRCw0REFBbUQ7Ozs7O0lBQ25ELDREQUFrRDs7OztJQUNsRCw2Q0FBZTs7OztJQUNmLG9EQUE2Qjs7Ozs7QUFLakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVOzs7Ozs7SUFPM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFrQjs7WUFDOUIsU0FBUztRQUNiLGtDQUFrQztRQUNsQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUk7WUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUQsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDOUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QzthQUFNO1lBQ0gsNERBQTREO1lBQzVELFNBQVMsR0FBRyxDQUFDLG1CQUFNLFFBQVEsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBT0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUF3Qjs7Y0FDbkMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDckMsTUFBTTtRQUNOLDRE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QyxtQkFBUSxLQUFLLEVBQUEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUNELDREQUE0RDtRQUM1RCxDQUFDLG1CQUFZLEtBQUssRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLDREQUE0RDtRQUM1RCxDQUFDLG1CQUFZLEtBQUssRUFBQSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBVSxFQUFFLFFBQWdCLENBQUM7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEMsNERBQTREO1FBQzVELElBQUksQ0FBQyxtQkFBTSxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsRUFBRTtZQUMxQiw0REFBNEQ7WUFDNUQsQ0FBQyxtQkFBUSxLQUFLLEVBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1Y7UUFDRCw0REFBNEQ7UUFDNUQsQ0FBQyxtQkFBWSxLQUFLLEVBQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFjLElBQUksRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUQsNERBQTREO1FBQzVELENBQUMsbUJBQVksS0FBSyxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDlhYnmoIflt6XlhbfnsbtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzY6NDQgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuLyoqIOaXp+agh+WHhlJhbmdl5a+56LGh77yI5Y+q5YiX5Ye65bi455So55qE5LiA5Lqb5bGe5oCn5ZKM5pa55rOV77yJICovXHJcbmludGVyZmFjZSBUZXh0UmFuZ2Uge1xyXG4gICAgaHRtbFRleHQ6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIHBhc3RlSFRNTChodG1sOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgY29sbGFwc2UoaXNFbmQ6IGJvb2xlYW4pOiB2b2lkO1xyXG4gICAgbW92ZSh0eXBlOiAnY2hhcmFjdG9yJywgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgbW92ZUVuZCh0eXBlOiAnY2hhcmFjdG9yJywgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG4gICAgbW92ZVN0YXJ0KHR5cGU6ICdjaGFyYWN0b3InLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBtb3ZlVG9FbGVtZW50VGV4dChub2RlOiBIVE1MRWxlbWVudCB8IE5vZGUpOiB2b2lkO1xyXG4gICAgc2VsZWN0KCk6IHZvaWQ7XHJcbiAgICBwYXJlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiDpgInljLrlkozojIPlm7Tlt6XlhbfnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvclV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YCJ5Yy6XHJcbiAgICAgKiBAcGFyYW0gIGVsZW0/IOimgeiBmueEpueahOWFg+e0oO+8jOWmguaenOW3suiBmueEpuWPr+S4jeS8oFxyXG4gICAgICogQHJldHVybnMgU2VsZWN0aW9uIHwgVGV4dFJhbmdlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRTZWxlY3Rpb24oZWxlbT86IEhUTUxFbGVtZW50KTogU2VsZWN0aW9uIHwgVGV4dFJhbmdlIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3VybHlcclxuICAgICAgICBpZiAoZWxlbSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbGVtKSBlbGVtLmZvY3VzKCk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSAoPGFueT4gZG9jdW1lbnQpLmJvZHkuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nrKzkuIDkuKrojIPlm7RcclxuICAgICAqIEBwYXJhbSAgcmFuZ2Ug6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRGaXJzdFJhbmdlKHJhbmdlOiBSYW5nZSB8IFRleHRSYW5nZSkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgLy8g5paw5qCH5YeGXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCg8YW55PiBzZWxlY3Rpb24pLmFkZFJhbmdlKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLmFkZFJhbmdlKDxSYW5nZT4gcmFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaXp+agh+WHhlxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pID0gPFRleHRSYW5nZT4gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bojIPlm7RcclxuICAgICAqIEBwYXJhbSAgaW5kZXgg6IyD5Zu05LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gIGVsZW0/IOimgeiBmueEpueahOWFg+e0oO+8jOWmguaenOW3suiBmueEpuWPr+S4jeS8oFxyXG4gICAgICogQHJldHVybnMgUmFuZ2UgfCBUZXh0UmFuZ2UgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSYW5nZShpbmRleDogbnVtYmVyLCBlbGVtPzogSFRNTEVsZW1lbnQpOiBSYW5nZSB8IFRleHRSYW5nZSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oZWxlbSk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLmdldFJhbmdlQXQgJiYgKDxTZWxlY3Rpb24+IHNlbGVjdGlvbikucmFuZ2VDb3VudCkgeyAvLyDmlrDmoIflh4ZcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS5nZXRSYW5nZUF0KGluZGV4KTtcclxuICAgICAgICB9IGVsc2UgeyAvLyDml6fmoIflh4ZcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiAoPFRleHRSYW5nZT4gc2VsZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInkuK3lhYPntKBlbGVt55qE5YaF5a65XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZWxlY3RTZWxlY3Rpb25FbGVtZW50Q2hpbGRzKGVsZW06IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmICghZWxlbSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCg8YW55PiBzZWxlY3Rpb24pLnNlbGVjdEFsbENoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS5zZWxlY3RBbGxDaGlsZHJlbihlbGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAoPFRleHRSYW5nZT4gc2VsZWN0aW9uKS5tb3ZlVG9FbGVtZW50VGV4dChlbGVtKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAoPFRleHRSYW5nZT4gc2VsZWN0aW9uKS5zZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rumAieWMuuWIsOafkOS4quWFg+e0oO+8jOW5tuaKmOWPoFxyXG4gICAgICogQHBhcmFtICBlbGVtIOWFg+e0oO+8jOivpeWFg+e0oOWPr+S7peaYr+S4jeWPr+iBmueEpueahOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGlzU3RhcnQg5piv5ZCm5oqY5Y+g5Yiw5byA5aS0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRTZWxlY3Rpb25Ub0VsZW1lbnQoZWxlbTogSFRNTEVsZW1lbnQsIGlzU3RhcnQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFNlbGVjdGlvbkVsZW1lbnRDaGlsZHMoZWxlbSk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAvLyDmlrDmoIflh4ZcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoaXNTdGFydCAmJiAoPGFueT4gc2VsZWN0aW9uKS5jb2xsYXBzZVRvU3RhcnQpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLmNvbGxhcHNlVG9TdGFydCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGlmICghaXNTdGFydCAmJiAoPGFueT4gc2VsZWN0aW9uKS5jb2xsYXBzZVRvRW5kKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS5jb2xsYXBzZVRvRW5kKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pen5qCH5YeGXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+IHNlbGVjdGlvbikuY29sbGFwc2UoIWlzU3RhcnQpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YCJ5Yy655qE6YCJ5Lit55qE5paH5pysXHJcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcg6YCJ5Yy65paH5pysXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRTZWxlY3Rpb25UZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICByZXR1cm4gKDxTZWxlY3Rpb24+IHNlbGVjdGlvbikudG9TdHJpbmcoKSB8fCAoPFRleHRSYW5nZT4gc2VsZWN0aW9uKS50ZXh0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIvmoIfkuLppbmRleOeahOiMg+WbtOaWh+acrFxyXG4gICAgICogQHBhcmFtICBpbmRleCA/IOiMg+WbtOS4i+agh++8jOaXp+agh+WHhuWwseWPquacieS4gOS4qlxyXG4gICAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSYW5nZVRleHQoaW5kZXg6IG51bWJlciA9IDApOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgcmV0dXJuICg8UmFuZ2U+IHJhbmdlKS50b1N0cmluZygpIHx8ICg8VGV4dFJhbmdlPiByYW5nZSkudGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlnJhbmdl6LW35aeL5L2N572u5ZKM57uT5p2f5L2N572u55qE5pyA5rWF55qE54i25YWD57SgXHJcbiAgICAgKiBcclxuICAgICAqIOavlOWmgu+8mlxcPHBcXD4ocmFuZ2Utc3RhcnQpMTIzKHJhbmdlLWVuZClcXDwvcFxcPueahOWFrOWFseeItuWFg+e0oOS4unRleHTvvIzogIzkuI3mmK9w5qCH562+XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyDlj6/pgInvvIzpu5jorqTnrKzkuIDkuKrvvIzml6fmoIflh4blsLEx5LiqXHJcbiAgICAgKiBAcmV0dXJucyBOb2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSYW5nZUNvbW1vblBhcmVudChpbmRleDogbnVtYmVyID0gMCk6IE5vZGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCg8YW55PiByYW5nZSkuY29tbW9uQW5jZXN0b3JDb250YWluZXIpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiAoPFJhbmdlPiByYW5nZSkuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGlmICgoPGFueT4gcmFuZ2UpLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiAoPFRleHRSYW5nZT4gcmFuZ2UpLnBhcmVudEVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTpgInkuK3lhoXlrrlcclxuICAgICAqIEBwYXJhbSAgaW5kZXg/IHJhbmdl5a+56LGh5LiL5qCH77yM6buY6K6kMFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGVsZXRlUmFuZ2VDb250ZW50KGluZGV4OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxhbnk+IHJhbmdlKS5kZWxldGVDb250ZW50cykge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgKDxSYW5nZT4gcmFuZ2UpLmRlbGV0ZUNvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+IHJhbmdlKS5wYXN0ZUhUTUwoJycpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiByYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXoioLngrlcclxuICAgICAqIEBwYXJhbSAgbm9kZSDoioLngrlcclxuICAgICAqIEBwYXJhbSAgaW5kZXg/IHJhbmdl5a+56LGh5LiL5qCH77yM6buY6K6kMFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5zZXJ0Tm9kZShub2RlOiBOb2RlLCBpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlUmFuZ2VDb250ZW50KGluZGV4KTtcclxuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0UmFuZ2UoaW5kZXgpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGlmICgoPGFueT4gcmFuZ2UpLmluc2VydE5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8UmFuZ2U+IHJhbmdlKS5pbnNlcnROb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiByYW5nZSkucGFzdGVIVE1MKCg8SFRNTEVsZW1lbnQ+IG5vZGUpLm91dGVySFRNTCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+IHJhbmdlKS5zZWxlY3QoKTtcclxuICAgIH1cclxufVxyXG4iXX0=