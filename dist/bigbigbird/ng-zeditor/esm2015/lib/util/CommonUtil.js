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
     * 判断是否ie
     * @return {?}
     */
    static isIE() {
        return !!(((/** @type {?} */ (window))).ActiveXObject || "ActiveXObject" in window);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3V0aWwvQ29tbW9uVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7Ozs7O0lBSzNCLE1BQU0sQ0FBQyxJQUFJO1FBQ1AsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsYUFBYSxJQUFJLGVBQWUsSUFBSSxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7Ozs7SUFNRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVU7O1lBQ3BCLEdBQUcsR0FBRyxJQUFJO1FBQ2QsNERBQTREO1FBQzVELE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssQ0FBQztZQUFDLENBQUM7UUFDMUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBTUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFjLEVBQUUsTUFBcUIsRUFBRTtRQUN2RCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1osa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDbEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFROzs7O1FBQUUsQ0FBQyxLQUFrQixFQUFFLEVBQUU7WUFDNUQsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFjLEVBQUUsQ0FBYztRQUMxQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxhQUFhO1lBQzNCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4Qjs7O2NBRUssTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0Msa0NBQWtDO1lBQ2xDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDcEM7UUFDRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFPRCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWUsRUFBRSxRQUFnQixDQUFDOztZQUN4QyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUM7UUFDckIsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDbEIsNERBQTREO1lBQzVELEVBQUUsR0FBRyxDQUFDLG1CQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUEsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDpgJrnlKjlt6XlhbfnsbtcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzY6MjEgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tb25VdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaYr+WQpmllXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0lFKCkge1xyXG4gICAgICAgIHJldHVybiAhISgod2luZG93IGFzIGFueSkuQWN0aXZlWE9iamVjdCB8fCBcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+5LiK5LiA5Liq6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHByZVNpYmxpbmcobm9kZTogTm9kZSk6IE5vZGUge1xyXG4gICAgICAgIGxldCBwcmUgPSBub2RlO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uZGl0aW9uYWwtYXNzaWdubWVudCBjdXJseVxyXG4gICAgICAgIHdoaWxlICgocHJlID0gcHJlLnByZXZpb3VzU2libGluZykgJiYgcHJlLm5vZGVUeXBlICE9PSAxKTtcclxuICAgICAgICByZXR1cm4gcHJlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+5YWD57Sg55qE5omA5pyJ5a2Q6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcCDniLblhYPntKBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEFsbENoaWxkcyhwOiBIVE1MRWxlbWVudCwgYXJyOiBIVE1MRWxlbWVudFtdID0gW10pOiBIVE1MRWxlbWVudFtdIHtcclxuICAgICAgICBhcnIucHVzaChwKTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN1cmx5XHJcbiAgICAgICAgaWYgKCFwLmNoaWxkcmVuIHx8ICFwLmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGFycjtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHAuY2hpbGRyZW4sIChjaGlsZDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgYXJyID0gdGhpcy5nZXRBbGxDaGlsZHMoY2hpbGQsIGFycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWrXDmmK/lkKbljIXlkKtjXHJcbiAgICAgKiBAcGFyYW0gcCDlhYPntKBcclxuICAgICAqIEBwYXJhbSBjIOWFg+e0oFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29udGFpbnMocDogSFRNTEVsZW1lbnQsIGM6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHAuY29udGFpbnMpIHsgLy8gZmlyZWZveOS4jeaUr+aMgVxyXG4gICAgICAgICAgICByZXR1cm4gcC5jb250YWlucyhjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5om+cOeahOaJgOacieWtkOiKgueCuVxyXG4gICAgICAgIGNvbnN0IGNoaWxkcyA9IHRoaXMuZ2V0QWxsQ2hpbGRzKHApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgICAgICBpZiAoY2hpbGRzW2ldID09PSBjKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmIChwID09PSBjKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47kvY7lsYLmrKHlvoDpq5jlsYLmrKHmib7nrKxpbmRleOS4queItuiKgueCue+8jOayoeacieWImei/lOWbnm51bGxcclxuICAgICAqIEBwYXJhbSAgZWwg55uu5qCH5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gIGluZGV4IOesrGluZGV45Liq54i25YWD57SgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXJlbnQoZWw6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIGxldCBjb3VudCA9IGluZGV4ICsgMTtcclxuICAgICAgICB3aGlsZSAoZWwgJiYgLS1jb3VudCkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICAgICAgZWwgPSAoPGFueT4gZWwucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG4iXX0=