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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvdWktdGFibGUvdWktdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFNbkQsTUFBTSxPQUFPLGdCQUFnQjs7OztJQU96QixZQUNZLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFObEMsUUFBRyxHQUFXLEdBQUcsQ0FBQzs7OztRQUVsQixRQUFHLEdBQVcsR0FBRyxDQUFDO0lBTWxCLENBQUM7Ozs7SUFFRCxhQUFhOztjQUNILEdBQUcsR0FBRyxZQUFZO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFNBQVM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsU0FBUzthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1Y7O1lBQ0csSUFBSSxHQUFHLHdDQUF3Qzs7Y0FDN0MsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztjQUNwQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3BCLEVBQUUsR0FBRyxNQUFNO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksb0NBQW9DLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDOzs7WUE1Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixvakJBQXdDO2FBQzNDOzs7O1lBTFEsVUFBVTs7Ozs7OztJQVFmLCtCQUFrQjs7Ozs7SUFFbEIsK0JBQWtCOztJQUNsQixtQ0FBYTs7SUFDYixrQ0FBWTs7Ozs7SUFFUixzQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDmj5LlhaXooajmoLznu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzU6NTUgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL0RvbVNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC10YWJsZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdWktdGFibGUuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVSVRhYmxlQ29tcG9uZW50IHtcclxuICAgIC8qKiDooYzmlbAgKi9cclxuICAgIHJvdzogc3RyaW5nID0gJzInO1xyXG4gICAgLyoqIOWIl+aVsCAqL1xyXG4gICAgY29sOiBzdHJpbmcgPSAnMic7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdFRhYmxlSFRNTCgpIHtcclxuICAgICAgICBjb25zdCByZWcgPSAvWzEtOV17MSwyfS87XHJcbiAgICAgICAgaWYgKCFyZWcudGVzdCh0aGlzLnJvdykpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLooYzmlbDkuI3lkIjopoHmsYJ+XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZWcudGVzdCh0aGlzLmNvbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLliJfmlbDkuI3lkIjopoHmsYJ+XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPGRpdj48dGFibGUgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+PHRib2R5Pic7XHJcbiAgICAgICAgY29uc3QgciA9IE51bWJlcih0aGlzLnJvdyk7XHJcbiAgICAgICAgY29uc3QgYyA9IE51bWJlcih0aGlzLmNvbCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyID0gXCI8dHI+XCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0ciArPSBcIjx0ZD5cIiAvKiArIGlucHV0ICovICsgXCI8L3RkPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gdHIgKyBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGh0bWwgKz0gXCI8L3Rib2R5PjwvdGFibGU+PC9kaXY+PHA+PGJyLz48L3A+XCI7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlci5yZWNpZXZlVGFibGVIVE1MKGh0bWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==