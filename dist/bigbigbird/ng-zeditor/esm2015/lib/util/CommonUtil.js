/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 通用工具类
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:36:21 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
export default class CommonUtil {
    /**
     * 根据元素id找元素
     * @param {?} id 元素id
     * @return {?}
     */
    static id(id) {
        return document.getElementById(id);
    }
    /**
     * 判断是否ie
     * @return {?}
     */
    static isIE() {
        return !!(((/** @type {?} */ (window))).ActiveXObject || 'ActiveXObject' in window);
    }
    /**
     * 找上一个节点
     * @param {?} node 节点
     * @return {?}
     */
    static preSibling(node) {
        /** @type {?} */
        let pre = node;
        // tslint:disable-next-line: no-conditional-assignment curly
        while ((pre = pre.previousSibling) && pre.nodeType !== 1)
            ;
        return pre;
    }
    /**
     * 找元素的所有子节点
     * @param {?} p 父元素
     * @param {?=} arr
     * @return {?}
     */
    static getAllChilds(p, arr = []) {
        arr.push(p);
        // tslint:disable-next-line: curly
        if (!p.children || !p.children.length)
            return arr;
        Array.prototype.forEach.call(p.children, (/**
         * @param {?} child
         * @return {?}
         */
        (child) => {
            arr = this.getAllChilds(child, arr);
        }));
        return arr;
    }
    /**
     * 判断p是否包含c
     * @param {?} p 元素
     * @param {?} c 元素
     * @return {?}
     */
    static contains(p, c) {
        if (p.contains) { // firefox不支持
            return p.contains(c);
        }
        // 找p的所有子节点
        /** @type {?} */
        const childs = this.getAllChilds(p);
        for (let i = 0, len = childs.length; i < len; i++) {
            // tslint:disable-next-line: curly
            if (childs[i] === c)
                return true;
        }
        // tslint:disable-next-line: curly
        if (p === c)
            return true;
        return false;
    }
    /**
     * 从低层次往高层次找第index个父节点，没有则返回null
     * @param {?} el 目标元素
     * @param {?=} index 第index个父元素
     * @return {?}
     */
    static parent(el, index = 1) {
        /** @type {?} */
        let count = index + 1;
        while (el && --count) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            el = ((/** @type {?} */ (el.parentNode)));
        }
        return el;
    }
    /**
     * rgb颜色串转以#开头的16进制颜色串
     * @param {?} str rgb颜色串
     * @return {?}
     */
    static rgbToHex(str) {
        if (!str) {
            return '';
        }
        if (str.charAt(0) === '#') {
            return str;
        }
        if (str.indexOf('rgb(') < 0) {
            return '';
        }
        str = str.slice(4, -1);
        /** @type {?} */
        const arr = str.split(',');
        /** @type {?} */
        let str$ = '#';
        arr.forEach((/**
         * @param {?} num
         * @return {?}
         */
        (num) => {
            /** @type {?} */
            let dimStr = Number(num).toString(16);
            dimStr = dimStr.length < 2 ? '0' + dimStr : dimStr;
            str$ += dimStr;
        }));
        return str$;
    }
    /**
     * 将多维数组变为一维数组
     * @param {?} arr 多维数组
     * @param {?=} box 容器
     * @return {?}
     */
    static flat(arr, box) {
        // tslint:disable-next-line: curly
        if (!box)
            box = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            /** @type {?} */
            const e = arr[i];
            if (e instanceof Array) {
                this.flat(e, box);
                continue;
            }
            box.push(e);
        }
        return box;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3V0aWwvQ29tbW9uVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7Ozs7OztJQUszQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQVU7UUFDaEIsT0FBTyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBS0QsTUFBTSxDQUFDLElBQUk7UUFDUCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxhQUFhLElBQUksZUFBZSxJQUFJLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBVTs7WUFDcEIsR0FBRyxHQUFHLElBQUk7UUFDZCw0REFBNEQ7UUFDNUQsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxDQUFDO1lBQUMsQ0FBQztRQUMxRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Ozs7Ozs7SUFNRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQWMsRUFBRSxNQUFxQixFQUFFO1FBQ3ZELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU07WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUNsRCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7Ozs7UUFBRSxDQUFDLEtBQWtCLEVBQUUsRUFBRTtZQUM1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YUFDWjtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog6YCa55So5bel5YW357G7XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM2OjIxIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uVXRpbCB7XHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWFg+e0oGlk5om+5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaWQg5YWD57SgaWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCmaWVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzSUUoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKCh3aW5kb3cgYXMgYW55KS5BY3RpdmVYT2JqZWN0IHx8ICdBY3RpdmVYT2JqZWN0JyBpbiB3aW5kb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+5LiK5LiA5Liq6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHByZVNpYmxpbmcobm9kZTogTm9kZSk6IE5vZGUge1xyXG4gICAgICAgIGxldCBwcmUgPSBub2RlO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uZGl0aW9uYWwtYXNzaWdubWVudCBjdXJseVxyXG4gICAgICAgIHdoaWxlICgocHJlID0gcHJlLnByZXZpb3VzU2libGluZykgJiYgcHJlLm5vZGVUeXBlICE9PSAxKTtcclxuICAgICAgICByZXR1cm4gcHJlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+5YWD57Sg55qE5omA5pyJ5a2Q6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcCDniLblhYPntKBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEFsbENoaWxkcyhwOiBIVE1MRWxlbWVudCwgYXJyOiBIVE1MRWxlbWVudFtdID0gW10pOiBIVE1MRWxlbWVudFtdIHtcclxuICAgICAgICBhcnIucHVzaChwKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN1cmx5XHJcbiAgICAgICAgaWYgKCFwLmNoaWxkcmVuIHx8ICFwLmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGFycjtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHAuY2hpbGRyZW4sIChjaGlsZDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgYXJyID0gdGhpcy5nZXRBbGxDaGlsZHMoY2hpbGQsIGFycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWrXDmmK/lkKbljIXlkKtjXHJcbiAgICAgKiBAcGFyYW0gcCDlhYPntKBcclxuICAgICAqIEBwYXJhbSBjIOWFg+e0oFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udGFpbnMocDogSFRNTEVsZW1lbnQsIGM6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHAuY29udGFpbnMpIHsgLy8gZmlyZWZveOS4jeaUr+aMgVxyXG4gICAgICAgICAgICByZXR1cm4gcC5jb250YWlucyhjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5om+cOeahOaJgOacieWtkOiKgueCuVxyXG4gICAgICAgIGNvbnN0IGNoaWxkcyA9IHRoaXMuZ2V0QWxsQ2hpbGRzKHApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSBjKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmIChwID09PSBjKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47kvY7lsYLmrKHlvoDpq5jlsYLmrKHmib7nrKxpbmRleOS4queItuiKgueCue+8jOayoeacieWImei/lOWbnm51bGxcclxuICAgICAqIEBwYXJhbSAgZWwg55uu5qCH5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gIGluZGV4IOesrGluZGV45Liq54i25YWD57SgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXJlbnQoZWw6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIGxldCBjb3VudCA9IGluZGV4ICsgMTtcclxuICAgICAgICB3aGlsZSAoZWwgJiYgLS1jb3VudCkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgZWwgPSAoPGFueT4gZWwucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogcmdi6aKc6Imy5Liy6L2s5LulI+W8gOWktOeahDE26L+b5Yi26aKc6Imy5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RyIHJnYuminOiJsuS4slxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmdiVG9IZXgoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXN0cikgeyByZXR1cm4gJyc7IH1cclxuICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PT0gJyMnKSB7IHJldHVybiBzdHI7IH1cclxuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJ3JnYignKSA8IDApIHsgcmV0dXJuICcnOyB9XHJcbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKDQsIC0xKTtcclxuICAgICAgICBjb25zdCBhcnIgPSBzdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgc3RyJCA9ICcjJztcclxuICAgICAgICBhcnIuZm9yRWFjaCgobnVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpbVN0ciA9IE51bWJlcihudW0pLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgZGltU3RyID0gZGltU3RyLmxlbmd0aCA8IDIgPyAnMCcgKyBkaW1TdHIgOiBkaW1TdHI7XHJcbiAgICAgICAgICAgIHN0ciQgKz0gZGltU3RyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdHIkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCG5aSa57u05pWw57uE5Y+Y5Li65LiA57u05pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyIOWkmue7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIGJveCDlrrnlmahcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZsYXQoYXJyOiBBcnJheTxhbnk+LCBib3g/OiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmICghYm94KSBib3ggPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGUgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxhdChlLCBib3gpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm94LnB1c2goZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBib3g7XHJcbiAgICB9XHJcbn1cclxuIl19