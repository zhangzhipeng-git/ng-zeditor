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

@Component({
    selector: 'app-table',
    templateUrl: './ui-table.component.html'
})
export class UITableComponent {
    /** 行数 */
    row: string = '2';
    /** 列数 */
    col: string = '2';
    handler: any;
    parent: any;
    constructor(
        private domService: DomService
    ) {
    }

    emitTableHTML() {
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
        let html = '<div><table style="width:100%"><tbody>';
        const r = Number(this.row);
        const c = Number(this.col);
        for (let i = 0; i < r; i++) {
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
