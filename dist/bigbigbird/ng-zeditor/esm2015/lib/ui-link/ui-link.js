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
                text: '链接地址不规范'
            });
            return;
        }
        if (!this.content) {
            this.domService.tost({
                text: '请填写内容'
            });
            return;
        }
        /** @type {?} */
        const html = '<a href="' +
            this.url +
            '" ' +
            (this.checked ? 'target="_blank"' : '') +
            (this.title ? 'title=' + this.title : '') +
            '>' +
            this.content +
            '</a>';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3VpLWxpbmsvdWktbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU1uRCxNQUFNLE9BQU8sZUFBZTs7OztJQVl4QixZQUNZLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFYbEMsWUFBTyxHQUFHLEtBQUssQ0FBQzs7OztRQUVoQixVQUFLLEdBQUcsRUFBRSxDQUFDOzs7O1FBRVgsUUFBRyxHQUFHLFVBQVUsQ0FBQzs7OztRQUVqQixZQUFPLEdBQUcsRUFBRSxDQUFDO0lBTVQsQ0FBQzs7Ozs7SUFLTCxZQUFZO1FBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjs7Y0FDSyxJQUFJLEdBQ04sV0FBVztZQUNYLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSTtZQUNKLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekMsR0FBRztZQUNILElBQUksQ0FBQyxPQUFPO1lBQ1osTUFBTTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7OztZQWhESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLDA5QkFBdUM7YUFDMUM7Ozs7WUFMUSxVQUFVOzs7Ozs7O0lBUWYsa0NBQWdCOzs7OztJQUVoQixnQ0FBVzs7Ozs7SUFFWCw4QkFBaUI7Ozs7O0lBRWpCLGtDQUFhOztJQUNiLGtDQUFhOztJQUNiLGlDQUFZOzs7OztJQUdSLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOmTvuaOpee7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNToyMyBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvRG9tU2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLWxpbmsnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3VpLWxpbmsuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVSUxpbmtDb21wb25lbnQge1xyXG4gICAgLyoqIOaYr+WQpuWcqOaWsOeql+WPo+aJk+W8gCAqL1xyXG4gICAgY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgLyoqIOagh+mimCAqL1xyXG4gICAgdGl0bGUgPSAnJztcclxuICAgIC8qKiB1cmwgKi9cclxuICAgIHVybCA9ICdodHRwczovLyc7XHJcbiAgICAvKiog5YaF5a65ICovXHJcbiAgICBjb250ZW50ID0gJyc7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsIRmb3JtXHJcbiAgICAgKi9cclxuICAgIGVtaXRMaW5rSFRNTCgpIHtcclxuICAgICAgICBpZiAoIS9eKFxcL1xcL3xodHRwcz86KVxcL1xcLy4rLy50ZXN0KHRoaXMudXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6ZO+5o6l5Zyw5Z2A5LiN6KeE6IyDJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6K+35aGr5YaZ5YaF5a65J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBodG1sID1cclxuICAgICAgICAgICAgJzxhIGhyZWY9XCInICtcclxuICAgICAgICAgICAgdGhpcy51cmwgK1xyXG4gICAgICAgICAgICAnXCIgJyArXHJcbiAgICAgICAgICAgICh0aGlzLmNoZWNrZWQgPyAndGFyZ2V0PVwiX2JsYW5rXCInIDogJycpICtcclxuICAgICAgICAgICAgKHRoaXMudGl0bGUgPyAndGl0bGU9JyArIHRoaXMudGl0bGUgOiAnJykgK1xyXG4gICAgICAgICAgICAnPicgK1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgK1xyXG4gICAgICAgICAgICAnPC9hPic7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlci5yZWNpZXZlTGlua0hUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==