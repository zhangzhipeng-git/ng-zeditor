/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 插入表格组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:35:55 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
import { Component } from '@angular/core';
import { DomService } from '../service/DomService';
export class UITableComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        /**
         * 行数
         */
        this.row = '2';
        /**
         * 列数
         */
        this.col = '2';
    }
    /**
     * @return {?}
     */
    emitTableHTML() {
        /** @type {?} */
        const reg = /[1-9]{1,2}/;
        if (!reg.test(this.row)) {
            this.domService.tost({
                text: "行数不合要求~"
            });
            return;
        }
        if (!reg.test(this.col)) {
            this.domService.tost({
                text: "列数不合要求~"
            });
            return;
        }
        /** @type {?} */
        let html = '<div><table style="width:100%"><tbody>';
        /** @type {?} */
        const r = Number(this.row);
        /** @type {?} */
        const c = Number(this.col);
        for (let i = 0; i < r; i++) {
            /** @type {?} */
            let tr = "<tr>";
            for (let j = 0; j < c; j++) {
                tr += "<td>" /* + input */ + "</td>";
            }
            html += tr + "</tr>";
        }
        html += "</tbody></table></div><p><br/></p>";
        if (this.handler.recieveTableHTML(html)) {
            this.parent.close();
        }
    }
}
UITableComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-table',
                template: "\r\n<div class=\"z-editor-table\">\r\n  <ul>\r\n    <li>\r\n      <label for=\"ui-table-row\">\u884C\u6570</label>\r\n      <input id=\"ui-table-row\" type=\"text\" [(ngModel)]=\"row\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"ui-table-col\">\u5217\u6570</label>\r\n      <input id=\"ui-table-col\" type=\"text\" [(ngModel)]=\"col\" />\r\n    </li>\r\n  </ul>\r\n  <div class=\"wd-btn-group\">\r\n    <button (click)=\"parent.close()\">\u53D6\u6D88</button>\r\n    <button (click)=\"emitTableHTML()\">\u786E\u8BA4</button>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
UITableComponent.ctorParameters = () => [
    { type: DomService }
];
if (false) {
    /**
     * 行数
     * @type {?}
     */
    UITableComponent.prototype.row;
    /**
     * 列数
     * @type {?}
     */
    UITableComponent.prototype.col;
    /** @type {?} */
    UITableComponent.prototype.handler;
    /** @type {?} */
    UITableComponent.prototype.parent;
    /**
     * @type {?}
     * @private
     */
    UITableComponent.prototype.domService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS10YWJsZS91aS10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU1uRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBT3pCLFlBQ1ksVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQU5sQyxRQUFHLEdBQVcsR0FBRyxDQUFDOzs7O1FBRWxCLFFBQUcsR0FBVyxHQUFHLENBQUM7SUFNbEIsQ0FBQzs7OztJQUVELGFBQWE7O2NBQ0gsR0FBRyxHQUFHLFlBQVk7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsU0FBUzthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjs7WUFDRyxJQUFJLEdBQUcsd0NBQXdDOztjQUM3QyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O2NBQ3BCLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDcEIsRUFBRSxHQUFHLE1BQU07WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixFQUFFLElBQUksTUFBTSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7YUFDeEM7WUFDRCxJQUFJLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztTQUN4QjtRQUNELElBQUksSUFBSSxvQ0FBb0MsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7OztZQTVDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLG9qQkFBd0M7YUFDM0M7Ozs7WUFMUSxVQUFVOzs7Ozs7O0lBUWYsK0JBQWtCOzs7OztJQUVsQiwrQkFBa0I7O0lBQ2xCLG1DQUFhOztJQUNiLGtDQUFZOzs7OztJQUVSLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOaPkuWFpeihqOagvOe7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNTo1NSBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvRG9tU2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLXRhYmxlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi91aS10YWJsZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJVGFibGVDb21wb25lbnQge1xyXG4gICAgLyoqIOihjOaVsCAqL1xyXG4gICAgcm93OiBzdHJpbmcgPSAnMic7XHJcbiAgICAvKiog5YiX5pWwICovXHJcbiAgICBjb2w6IHN0cmluZyA9ICcyJztcclxuICAgIGhhbmRsZXI6IGFueTtcclxuICAgIHBhcmVudDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgIH1cclxuXHJcbiAgICBlbWl0VGFibGVIVE1MKCkge1xyXG4gICAgICAgIGNvbnN0IHJlZyA9IC9bMS05XXsxLDJ9LztcclxuICAgICAgICBpZiAoIXJlZy50ZXN0KHRoaXMucm93KSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIuihjOaVsOS4jeWQiOimgeaxgn5cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlZy50ZXN0KHRoaXMuY29sKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIuWIl+aVsOS4jeWQiOimgeaxgn5cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaHRtbCA9ICc8ZGl2Pjx0YWJsZSBzdHlsZT1cIndpZHRoOjEwMCVcIj48dGJvZHk+JztcclxuICAgICAgICBjb25zdCByID0gTnVtYmVyKHRoaXMucm93KTtcclxuICAgICAgICBjb25zdCBjID0gTnVtYmVyKHRoaXMuY29sKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHIgPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRyICs9IFwiPHRkPlwiIC8qICsgaW5wdXQgKi8gKyBcIjwvdGQ+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHRtbCArPSB0ciArIFwiPC90cj5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbCArPSBcIjwvdGJvZHk+PC90YWJsZT48L2Rpdj48cD48YnIvPjwvcD5cIjtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyLnJlY2lldmVUYWJsZUhUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19