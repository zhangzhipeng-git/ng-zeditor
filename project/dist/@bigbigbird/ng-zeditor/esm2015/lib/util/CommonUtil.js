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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL0BiaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91dGlsL0NvbW1vblV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVOzs7OztJQUszQixNQUFNLENBQUMsSUFBSTtRQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLGFBQWEsSUFBSSxlQUFlLElBQUksTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7O0lBTUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFVOztZQUNwQixHQUFHLEdBQUcsSUFBSTtRQUNkLDREQUE0RDtRQUM1RCxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUM7WUFBQyxDQUFDO1FBQzFELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7OztJQU1ELE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBYyxFQUFFLE1BQXFCLEVBQUU7UUFDdkQsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUTs7OztRQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQzVELEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7OztJQU9ELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBYyxFQUFFLENBQWM7UUFDMUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsYUFBYTtZQUMzQixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7OztjQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLGtDQUFrQztZQUNsQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ3BDO1FBQ0Qsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN6QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBT0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFlLEVBQUUsUUFBZ0IsQ0FBQzs7WUFDeEMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDO1FBQ3JCLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2xCLDREQUE0RDtZQUM1RCxFQUFFLEdBQUcsQ0FBQyxtQkFBTSxFQUFFLENBQUMsVUFBVSxFQUFBLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog6YCa55So5bel5YW357G7XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM2OjIxIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKZpZVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNJRSgpIHtcclxuICAgICAgICByZXR1cm4gISEoKHdpbmRvdyBhcyBhbnkpLkFjdGl2ZVhPYmplY3QgfHwgXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJvuS4iuS4gOS4quiKgueCuVxyXG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwcmVTaWJsaW5nKG5vZGU6IE5vZGUpOiBOb2RlIHtcclxuICAgICAgICBsZXQgcHJlID0gbm9kZTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbmRpdGlvbmFsLWFzc2lnbm1lbnQgY3VybHlcclxuICAgICAgICB3aGlsZSAoKHByZSA9IHByZS5wcmV2aW91c1NpYmxpbmcpICYmIHByZS5ub2RlVHlwZSAhPT0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHByZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJvuWFg+e0oOeahOaJgOacieWtkOiKgueCuVxyXG4gICAgICogQHBhcmFtIHAg54i25YWD57SgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRBbGxDaGlsZHMocDogSFRNTEVsZW1lbnQsIGFycjogSFRNTEVsZW1lbnRbXSA9IFtdKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICAgICAgYXJyLnB1c2gocCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjdXJseVxyXG4gICAgICAgIGlmICghcC5jaGlsZHJlbiB8fCAhcC5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiBhcnI7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChwLmNoaWxkcmVuLCAoY2hpbGQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGFyciA9IHRoaXMuZ2V0QWxsQ2hpbGRzKGNoaWxkLCBhcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq1w5piv5ZCm5YyF5ZCrY1xyXG4gICAgICogQHBhcmFtIHAg5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gYyDlhYPntKBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnRhaW5zKHA6IEhUTUxFbGVtZW50LCBjOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwLmNvbnRhaW5zKSB7IC8vIGZpcmVmb3jkuI3mlK/mjIFcclxuICAgICAgICAgICAgcmV0dXJuIHAuY29udGFpbnMoYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaJvnDnmoTmiYDmnInlrZDoioLngrlcclxuICAgICAgICBjb25zdCBjaGlsZHMgPSB0aGlzLmdldEFsbENoaWxkcyhwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2hpbGRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3VybHlcclxuICAgICAgICAgICAgaWYgKGNoaWxkc1tpXSA9PT0gYykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY3VybHlcclxuICAgICAgICBpZiAocCA9PT0gYykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5L2O5bGC5qyh5b6A6auY5bGC5qyh5om+56ysaW5kZXjkuKrniLboioLngrnvvIzmsqHmnInliJnov5Tlm55udWxsXHJcbiAgICAgKiBAcGFyYW0gIGVsIOebruagh+WFg+e0oFxyXG4gICAgICogQHBhcmFtICBpbmRleCDnrKxpbmRleOS4queItuWFg+e0oFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcGFyZW50KGVsOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlciA9IDEpIHtcclxuICAgICAgICBsZXQgY291bnQgPSBpbmRleCArIDE7XHJcbiAgICAgICAgd2hpbGUgKGVsICYmIC0tY291bnQpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIGVsID0gKDxhbnk+IGVsLnBhcmVudE5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbn1cclxuIl19