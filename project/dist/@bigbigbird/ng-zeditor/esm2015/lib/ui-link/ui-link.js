/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 链接组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:35:23 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
import { Component } from '@angular/core';
import { DomService } from '../service/DomService';
export class UILinkComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        /**
         * 是否在新窗口打开
         */
        this.checked = false;
        /**
         * 标题
         */
        this.title = '';
        /**
         * url
         */
        this.url = 'https://';
        /**
         * 内容
         */
        this.content = '';
    }
    /**
     * 发射form
     * @return {?}
     */
    emitLinkHTML() {
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            this.domService.tost({
                text: "链接地址不规范"
            });
            return;
        }
        if (!this.content) {
            this.domService.tost({
                text: "请填写内容"
            });
            return;
        }
        /** @type {?} */
        const html = '<a href="' +
            this.url +
            '" ' +
            (this.checked ? 'target="_blank"' : "") +
            (this.title ? "title=" + this.title : "") +
            ">" +
            this.content +
            "</a>";
        if (this.handler.recieveLinkHTML(html)) {
            this.parent.close();
        }
    }
}
UILinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-link',
                template: "\r\n<div class=\"z-editor-link\">\r\n  <ul>\r\n    <li>\r\n      <label for=\"ui-link-title\">\u6807\u9898</label>\r\n      <input placeholder=\"\u53EF\u4E0D\u586B~\" id=\"ui-link-title\" type=\"text\" [(ngModel)]=\"title\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-rul\">\u94FE\u63A5</label>\r\n      <input placeholder=\"http://\" id=\"ui-link-rul\" type=\"text\" [(ngModel)]=\"url\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-content\">\u5185\u5BB9</label>\r\n      <input id=\"ui-link-content\" type=\"text\" [(ngModel)]=\"content\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-link-checkbox\">\u65B0\u7A97\u53E3\u6253\u5F00</label>\r\n      <app-checkbox [id]=\"'ui-link-checkbox'\" [(ngModel)]=\"checked\"></app-checkbox>\r\n    </li>\r\n  </ul>\r\n  <div class=\"wd-btn-group\">\r\n    <button (click)=\"parent.close()\">\u53D6\u6D88</button>\r\n    <button (click)=\"emitLinkHTML()\">\u786E\u8BA4</button>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
UILinkComponent.ctorParameters = () => [
    { type: DomService }
];
if (false) {
    /**
     * 是否在新窗口打开
     * @type {?}
     */
    UILinkComponent.prototype.checked;
    /**
     * 标题
     * @type {?}
     */
    UILinkComponent.prototype.title;
    /**
     * url
     * @type {?}
     */
    UILinkComponent.prototype.url;
    /**
     * 内容
     * @type {?}
     */
    UILinkComponent.prototype.content;
    /** @type {?} */
    UILinkComponent.prototype.handler;
    /** @type {?} */
    UILinkComponent.prototype.parent;
    /**
     * @type {?}
     * @private
     */
    UILinkComponent.prototype.domService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL0BiaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS1saW5rL3VpLWxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNbkQsTUFBTSxPQUFPLGVBQWU7Ozs7SUFZeEIsWUFDWSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7O1FBWGxDLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFFekIsVUFBSyxHQUFXLEVBQUUsQ0FBQzs7OztRQUVuQixRQUFHLEdBQVcsVUFBVSxDQUFDOzs7O1FBRXpCLFlBQU8sR0FBVyxFQUFFLENBQUM7SUFNakIsQ0FBQzs7Ozs7SUFLTCxZQUFZO1FBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjs7Y0FDSyxJQUFJLEdBQ04sV0FBVztZQUNYLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSTtZQUNKLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekMsR0FBRztZQUNILElBQUksQ0FBQyxPQUFPO1lBQ1osTUFBTTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7OztZQWhESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLDA5QkFBdUM7YUFDMUM7Ozs7WUFMUSxVQUFVOzs7Ozs7O0lBUWYsa0NBQXlCOzs7OztJQUV6QixnQ0FBbUI7Ozs7O0lBRW5CLDhCQUF5Qjs7Ozs7SUFFekIsa0NBQXFCOztJQUNyQixrQ0FBYTs7SUFDYixpQ0FBWTs7Ozs7SUFHUixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDpk77mjqXnu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzU6MjMgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL0RvbVNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC1saW5rJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi91aS1saW5rLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVUlMaW5rQ29tcG9uZW50IHtcclxuICAgIC8qKiDmmK/lkKblnKjmlrDnqpflj6PmiZPlvIAgKi9cclxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmoIfpopggKi9cclxuICAgIHRpdGxlOiBzdHJpbmcgPSAnJztcclxuICAgIC8qKiB1cmwgKi9cclxuICAgIHVybDogc3RyaW5nID0gJ2h0dHBzOi8vJztcclxuICAgIC8qKiDlhoXlrrkgKi9cclxuICAgIGNvbnRlbnQ6IHN0cmluZyA9ICcnO1xyXG4gICAgaGFuZGxlcjogYW55O1xyXG4gICAgcGFyZW50OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5bCEZm9ybVxyXG4gICAgICovXHJcbiAgICBlbWl0TGlua0hUTUwoKSB7XHJcbiAgICAgICAgaWYgKCEvXihcXC9cXC98aHR0cHM/OilcXC9cXC8uKy8udGVzdCh0aGlzLnVybCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLpk77mjqXlnLDlnYDkuI3op4TojINcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIuivt+Whq+WGmeWGheWuuVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0bWwgPVxyXG4gICAgICAgICAgICAnPGEgaHJlZj1cIicgK1xyXG4gICAgICAgICAgICB0aGlzLnVybCArXHJcbiAgICAgICAgICAgICdcIiAnICtcclxuICAgICAgICAgICAgKHRoaXMuY2hlY2tlZCA/ICd0YXJnZXQ9XCJfYmxhbmtcIicgOiBcIlwiKSArXHJcbiAgICAgICAgICAgICh0aGlzLnRpdGxlID8gXCJ0aXRsZT1cIiArIHRoaXMudGl0bGUgOiBcIlwiKSArXHJcbiAgICAgICAgICAgIFwiPlwiICtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ICtcclxuICAgICAgICAgICAgXCI8L2E+XCI7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlci5yZWNpZXZlTGlua0hUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=