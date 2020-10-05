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
                text: '行数不合要求~'
            });
            return;
        }
        if (!reg.test(this.col)) {
            this.domService.tost({
                text: '列数不合要求~'
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
            let tr = '<tr>';
            for (let j = 0; j < c; j++) {
                tr += '<td>' /* + input */ + '</td>';
            }
            html += tr + '</tr>';
        }
        html += '</tbody></table></div><p><br/></p>';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS10YWJsZS91aS10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU1uRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBT3pCLFlBQ1ksVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQU5sQyxRQUFHLEdBQUcsR0FBRyxDQUFDOzs7O1FBRVYsUUFBRyxHQUFHLEdBQUcsQ0FBQztJQU1WLENBQUM7Ozs7SUFFRCxhQUFhOztjQUNILEdBQUcsR0FBRyxZQUFZO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFNBQVM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsU0FBUzthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1Y7O1lBQ0csSUFBSSxHQUFHLHdDQUF3Qzs7Y0FDN0MsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztjQUNwQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3BCLEVBQUUsR0FBRyxNQUFNO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksb0NBQW9DLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDOzs7WUE1Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixvakJBQXdDO2FBQzNDOzs7O1lBTFEsVUFBVTs7Ozs7OztJQVFmLCtCQUFVOzs7OztJQUVWLCtCQUFVOztJQUNWLG1DQUFhOztJQUNiLGtDQUFZOzs7OztJQUVSLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOaPkuWFpeihqOagvOe7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNTo1NSBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvRG9tU2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLXRhYmxlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi91aS10YWJsZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJVGFibGVDb21wb25lbnQge1xyXG4gICAgLyoqIOihjOaVsCAqL1xyXG4gICAgcm93ID0gJzInO1xyXG4gICAgLyoqIOWIl+aVsCAqL1xyXG4gICAgY29sID0gJzInO1xyXG4gICAgaGFuZGxlcjogYW55O1xyXG4gICAgcGFyZW50OiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXRUYWJsZUhUTUwoKSB7XHJcbiAgICAgICAgY29uc3QgcmVnID0gL1sxLTldezEsMn0vO1xyXG4gICAgICAgIGlmICghcmVnLnRlc3QodGhpcy5yb3cpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfooYzmlbDkuI3lkIjopoHmsYJ+J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXJlZy50ZXN0KHRoaXMuY29sKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5YiX5pWw5LiN5ZCI6KaB5rGCfidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPGRpdj48dGFibGUgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+PHRib2R5Pic7XHJcbiAgICAgICAgY29uc3QgciA9IE51bWJlcih0aGlzLnJvdyk7XHJcbiAgICAgICAgY29uc3QgYyA9IE51bWJlcih0aGlzLmNvbCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRyID0gJzx0cj4nO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdHIgKz0gJzx0ZD4nIC8qICsgaW5wdXQgKi8gKyAnPC90ZD4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gdHIgKyAnPC90cj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9ICc8L3Rib2R5PjwvdGFibGU+PC9kaXY+PHA+PGJyLz48L3A+JztcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyLnJlY2lldmVUYWJsZUhUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19