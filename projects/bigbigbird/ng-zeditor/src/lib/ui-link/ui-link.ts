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

@Component({
    selector: 'app-link',
    templateUrl: './ui-link.component.html'
})
export class UILinkComponent {
    /** 是否在新窗口打开 */
    checked = false;
    /** 标题 */
    title = '';
    /** url */
    url = 'https://';
    /** 内容 */
    content = '';
    handler: any;
    parent: any;

    constructor(
        private domService: DomService
    ) { }

    /**
     * 发射form
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
        const html =
            '<a href="' +
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

