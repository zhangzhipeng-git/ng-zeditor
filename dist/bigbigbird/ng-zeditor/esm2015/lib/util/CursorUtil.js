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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vyc29yVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3V0aWwvQ3Vyc29yVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsd0JBV0M7OztJQVZHLDZCQUFpQjs7SUFDakIseUJBQWE7Ozs7O0lBQ2Isb0RBQThCOzs7OztJQUM5QixvREFBK0I7Ozs7OztJQUMvQix1REFBOEM7Ozs7OztJQUM5QywwREFBaUQ7Ozs7OztJQUNqRCw0REFBbUQ7Ozs7O0lBQ25ELDREQUFrRDs7OztJQUNsRCw2Q0FBZTs7OztJQUNmLG9EQUE2Qjs7Ozs7QUFLakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVOzs7Ozs7SUFPM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFrQjs7WUFDOUIsU0FBUztRQUNiLGtDQUFrQztRQUNsQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUk7WUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUQsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDOUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QzthQUFNO1lBQ0gsNERBQTREO1lBQzVELFNBQVMsR0FBRyxDQUFDLG1CQUFNLFFBQVEsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBT0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUF3Qjs7Y0FDbkMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDckMsTUFBTTtRQUNOLDRE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O1FBQzVELENBQUMsbUJBQVksS0FBSyxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsNERBQTREO1FBQzVELENBQUMsbUJBQVksS0FBSyxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFVLEVBQUUsUUFBZ0IsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7O2NBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNsQyw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLG1CQUFNLEtBQUssRUFBQSxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQzFCLDREQUE0RDtZQUM1RCxDQUFDLG1CQUFRLEtBQUssRUFBQSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUNELDREQUE0RDtRQUM1RCxDQUFDLG1CQUFZLEtBQUssRUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQWMsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RCw0REFBNEQ7UUFDNUQsQ0FBQyxtQkFBWSxLQUFLLEVBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOWFieagh+W3peWFt+exu1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNjo0NCBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG4vKiog5pen5qCH5YeGUmFuZ2Xlr7nosaHvvIjlj6rliJflh7rluLjnlKjnmoTkuIDkupvlsZ7mgKflkozmlrnms5XvvIkgKi9cclxuaW50ZXJmYWNlIFRleHRSYW5nZSB7XHJcbiAgICBodG1sVGV4dDogc3RyaW5nO1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgcGFzdGVIVE1MKGh0bWw6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjb2xsYXBzZShpc0VuZDogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICBtb3ZlKHR5cGU6ICdjaGFyYWN0b3InLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBtb3ZlRW5kKHR5cGU6ICdjaGFyYWN0b3InLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBtb3ZlU3RhcnQodHlwZTogJ2NoYXJhY3RvcicsIG9mZnNldDogbnVtYmVyKTogdm9pZDtcclxuICAgIG1vdmVUb0VsZW1lbnRUZXh0KG5vZGU6IEhUTUxFbGVtZW50IHwgTm9kZSk6IHZvaWQ7XHJcbiAgICBzZWxlY3QoKTogdm9pZDtcclxuICAgIHBhcmVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIOmAieWMuuWSjOiMg+WbtOW3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Vyc29yVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgInljLpcclxuICAgICAqIEBwYXJhbSAgZWxlbT8g6KaB6IGa54Sm55qE5YWD57Sg77yM5aaC5p6c5bey6IGa54Sm5Y+v5LiN5LygXHJcbiAgICAgKiBAcmV0dXJucyBTZWxlY3Rpb24gfCBUZXh0UmFuZ2VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFNlbGVjdGlvbihlbGVtPzogSFRNTEVsZW1lbnQpOiBTZWxlY3Rpb24gfCBUZXh0UmFuZ2Uge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb247XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmIChlbGVtICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGVsZW0pIGVsZW0uZm9jdXMoKTtcclxuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9ICg8YW55PiBkb2N1bWVudCkuYm9keS5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruesrOS4gOS4quiMg+WbtFxyXG4gICAgICogQHBhcmFtICByYW5nZSDojIPlm7RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldEZpcnN0UmFuZ2UocmFuZ2U6IFJhbmdlIHwgVGV4dFJhbmdlKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAvLyDmlrDmoIflh4ZcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxhbnk+IHNlbGVjdGlvbikuYWRkUmFuZ2UpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+IHNlbGVjdGlvbikuYWRkUmFuZ2UoPFJhbmdlPiByYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pen5qCH5YeGXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+IHNlbGVjdGlvbikgPSA8VGV4dFJhbmdlPiByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluiMg+WbtFxyXG4gICAgICogQHBhcmFtICBpbmRleCDojIPlm7TkuIvmoIdcclxuICAgICAqIEBwYXJhbSAgZWxlbT8g6KaB6IGa54Sm55qE5YWD57Sg77yM5aaC5p6c5bey6IGa54Sm5Y+v5LiN5LygXHJcbiAgICAgKiBAcmV0dXJucyBSYW5nZSB8IFRleHRSYW5nZSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlKGluZGV4OiBudW1iZXIsIGVsZW0/OiBIVE1MRWxlbWVudCk6IFJhbmdlIHwgVGV4dFJhbmdlIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbihlbGVtKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxTZWxlY3Rpb24+IHNlbGVjdGlvbikuZ2V0UmFuZ2VBdCAmJiAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS5yYW5nZUNvdW50KSB7IC8vIOaWsOagh+WHhlxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgcmV0dXJuICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLmdldFJhbmdlQXQoaW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIOaXp+agh+WHhlxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgcmV0dXJuICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieS4reWFg+e0oGVsZW3nmoTlhoXlrrlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNlbGVjdFNlbGVjdGlvbkVsZW1lbnRDaGlsZHMoZWxlbTogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN1cmx5XHJcbiAgICAgICAgaWYgKCFlbGVtKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxhbnk+IHNlbGVjdGlvbikuc2VsZWN0QWxsQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLnNlbGVjdEFsbENoaWxkcmVuKGVsZW0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pLm1vdmVUb0VsZW1lbnRUZXh0KGVsZW0pO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6YCJ5Yy65Yiw5p+Q5Liq5YWD57Sg77yM5bm25oqY5Y+gXHJcbiAgICAgKiBAcGFyYW0gIGVsZW0g5YWD57Sg77yM6K+l5YWD57Sg5Y+v5Lul5piv5LiN5Y+v6IGa54Sm55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXNTdGFydCDmmK/lkKbmipjlj6DliLDlvIDlpLRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldFNlbGVjdGlvblRvRWxlbWVudChlbGVtOiBIVE1MRWxlbWVudCwgaXNTdGFydDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0U2VsZWN0aW9uRWxlbWVudENoaWxkcyhlbGVtKTtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIC8vIOaWsOagh+WHhlxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGlmIChpc1N0YXJ0ICYmICg8YW55PiBzZWxlY3Rpb24pLmNvbGxhcHNlVG9TdGFydCkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgKDxTZWxlY3Rpb24+IHNlbGVjdGlvbikuY29sbGFwc2VUb1N0YXJ0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCFpc1N0YXJ0ICYmICg8YW55PiBzZWxlY3Rpb24pLmNvbGxhcHNlVG9FbmQpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8U2VsZWN0aW9uPiBzZWxlY3Rpb24pLmNvbGxhcHNlVG9FbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDml6fmoIflh4ZcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAoPFRleHRSYW5nZT4gc2VsZWN0aW9uKS5jb2xsYXBzZSghaXNTdGFydCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgKDxUZXh0UmFuZ2U+IHNlbGVjdGlvbikuc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgInljLrnmoTpgInkuK3nmoTmlofmnKxcclxuICAgICAqIEByZXR1cm5zIHN0cmluZyDpgInljLrmlofmnKxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFNlbGVjdGlvblRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIHJldHVybiAoPFNlbGVjdGlvbj4gc2VsZWN0aW9uKS50b1N0cmluZygpIHx8ICg8VGV4dFJhbmdlPiBzZWxlY3Rpb24pLnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4i+agh+S4umluZGV455qE6IyD5Zu05paH5pysXHJcbiAgICAgKiBAcGFyYW0gIGluZGV4ID8g6IyD5Zu05LiL5qCH77yM5pen5qCH5YeG5bCx5Y+q5pyJ5LiA5LiqXHJcbiAgICAgKiBAcmV0dXJucyBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlVGV4dChpbmRleDogbnVtYmVyID0gMCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICByZXR1cm4gKDxSYW5nZT4gcmFuZ2UpLnRvU3RyaW5nKCkgfHwgKDxUZXh0UmFuZ2U+IHJhbmdlKS50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WcmFuZ2Xotbflp4vkvY3nva7lkoznu5PmnZ/kvY3nva7nmoTmnIDmtYXnmoTniLblhYPntKBcclxuICAgICAqIFxyXG4gICAgICog5q+U5aaC77yaXFw8cFxcPihyYW5nZS1zdGFydCkxMjMocmFuZ2UtZW5kKVxcPC9wXFw+55qE5YWs5YWx54i25YWD57Sg5Li6dGV4dO+8jOiAjOS4jeaYr3DmoIfnrb5cclxuICAgICAqIEBwYXJhbSAgaW5kZXg/IOWPr+mAie+8jOm7mOiupOesrOS4gOS4qu+8jOaXp+agh+WHhuWwsTHkuKpcclxuICAgICAqIEByZXR1cm5zIE5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFJhbmdlQ29tbW9uUGFyZW50KGluZGV4OiBudW1iZXIgPSAwKTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxhbnk+IHJhbmdlKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgcmV0dXJuICg8UmFuZ2U+IHJhbmdlKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgcmV0dXJuICg8VGV4dFJhbmdlPiByYW5nZSkucGFyZW50RWxlbWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YCJ5Lit5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyByYW5nZeWvueixoeS4i+agh++8jOm7mOiupDBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRlbGV0ZVJhbmdlQ29udGVudChpbmRleDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRSYW5nZShpbmRleCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKCg8YW55PiByYW5nZSkuZGVsZXRlQ29udGVudHMpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICg8UmFuZ2U+IHJhbmdlKS5kZWxldGVDb250ZW50cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiByYW5nZSkucGFzdGVIVE1MKCcnKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAoPFRleHRSYW5nZT4gcmFuZ2UpLnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gIG5vZGUg6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gIGluZGV4PyByYW5nZeWvueixoeS4i+agh++8jOm7mOiupDBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluc2VydE5vZGUobm9kZTogTm9kZSwgaW5kZXg6IG51bWJlciA9IDApIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZVJhbmdlQ29udGVudChpbmRleCk7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldFJhbmdlKGluZGV4KTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBpZiAoKDxhbnk+IHJhbmdlKS5pbnNlcnROb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICAgICAoPFJhbmdlPiByYW5nZSkuaW5zZXJ0Tm9kZShub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAoPFRleHRSYW5nZT4gcmFuZ2UpLnBhc3RlSFRNTCgoPEhUTUxFbGVtZW50PiBub2RlKS5vdXRlckhUTUwpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgICg8VGV4dFJhbmdlPiByYW5nZSkuc2VsZWN0KCk7XHJcbiAgICB9XHJcbn1cclxuIl19