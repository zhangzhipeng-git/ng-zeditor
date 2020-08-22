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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3VpLWxpbmsvdWktbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU1uRCxNQUFNLE9BQU8sZUFBZTs7OztJQVl4QixZQUNZLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFYbEMsWUFBTyxHQUFZLEtBQUssQ0FBQzs7OztRQUV6QixVQUFLLEdBQVcsRUFBRSxDQUFDOzs7O1FBRW5CLFFBQUcsR0FBVyxVQUFVLENBQUM7Ozs7UUFFekIsWUFBTyxHQUFXLEVBQUUsQ0FBQztJQU1qQixDQUFDOzs7OztJQUtMLFlBQVk7UUFDUixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFNBQVM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWOztjQUNLLElBQUksR0FDTixXQUFXO1lBQ1gsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJO1lBQ0osQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxHQUFHO1lBQ0gsSUFBSSxDQUFDLE9BQU87WUFDWixNQUFNO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQzs7O1lBaERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsMDlCQUF1QzthQUMxQzs7OztZQUxRLFVBQVU7Ozs7Ozs7SUFRZixrQ0FBeUI7Ozs7O0lBRXpCLGdDQUFtQjs7Ozs7SUFFbkIsOEJBQXlCOzs7OztJQUV6QixrQ0FBcUI7O0lBQ3JCLGtDQUFhOztJQUNiLGlDQUFZOzs7OztJQUdSLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOmTvuaOpee7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNToyMyBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvRG9tU2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLWxpbmsnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3VpLWxpbmsuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVSUxpbmtDb21wb25lbnQge1xyXG4gICAgLyoqIOaYr+WQpuWcqOaWsOeql+WPo+aJk+W8gCAqL1xyXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOagh+mimCAqL1xyXG4gICAgdGl0bGU6IHN0cmluZyA9ICcnO1xyXG4gICAgLyoqIHVybCAqL1xyXG4gICAgdXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly8nO1xyXG4gICAgLyoqIOWGheWuuSAqL1xyXG4gICAgY29udGVudDogc3RyaW5nID0gJyc7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsIRmb3JtXHJcbiAgICAgKi9cclxuICAgIGVtaXRMaW5rSFRNTCgpIHtcclxuICAgICAgICBpZiAoIS9eKFxcL1xcL3xodHRwcz86KVxcL1xcLy4rLy50ZXN0KHRoaXMudXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIumTvuaOpeWcsOWdgOS4jeinhOiMg1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwi6K+35aGr5YaZ5YaF5a65XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaHRtbCA9XHJcbiAgICAgICAgICAgICc8YSBocmVmPVwiJyArXHJcbiAgICAgICAgICAgIHRoaXMudXJsICtcclxuICAgICAgICAgICAgJ1wiICcgK1xyXG4gICAgICAgICAgICAodGhpcy5jaGVja2VkID8gJ3RhcmdldD1cIl9ibGFua1wiJyA6IFwiXCIpICtcclxuICAgICAgICAgICAgKHRoaXMudGl0bGUgPyBcInRpdGxlPVwiICsgdGhpcy50aXRsZSA6IFwiXCIpICtcclxuICAgICAgICAgICAgXCI+XCIgK1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgK1xyXG4gICAgICAgICAgICBcIjwvYT5cIjtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyLnJlY2lldmVMaW5rSFRNTChodG1sKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==