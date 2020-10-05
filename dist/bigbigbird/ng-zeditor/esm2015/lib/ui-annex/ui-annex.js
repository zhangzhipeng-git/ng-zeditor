/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 插入文件组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:35:02 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomService } from '../service/DomService';
export class UIAnnexComponent {
    /**
     * @param {?} domService
     */
    constructor(domService) {
        this.domService = domService;
        this.url = 'https://';
        this.width = '100%';
        this.height = '200px';
        /**
         * 获取类型对应的名称
         */
        this.typeName = '图片';
        /**
         * 重渲染input file
         */
        this.rebuild = true;
        this.radioGroup = [{ value: 'image', text: '图片' }, { value: 'audio', text: '音频' }, { value: 'video', text: '视频' }];
        // tslint:disable-next-line: variable-name
        this._type = 'image';
        /**
         * 选择文件
         */
        this.fileChange = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const files = this.file.nativeElement.files;
            /** @type {?} */
            const file = files[0];
            if (!files.length) {
                return;
            }
            this.rebuild = false;
            setTimeout((/**
             * @return {?}
             */
            () => { this.rebuild = true; }));
            // 编辑器实例
            /** @type {?} */
            const handler = this.handler;
            // 获取编辑器banner配置参数
            /** @type {?} */
            const option = handler.options$[this.type] || {};
            // 标签
            /** @type {?} */
            const tag = { image: 'IMG', audio: 'AUDIO', video: 'VIDEO' }[this.type];
            // 判断文件是否超过数量
            if (handler.pannel.getElementsByTagName(tag).length >= (option.count || 1)) {
                this.domService.tost({
                    text: `${this.typeName}已超出最大数量`
                });
                return;
            }
            // 判断文件是否需转成base64
            /** @type {?} */
            const base64size = option.base64 || 0;
            if (base64size && file.size <= base64size) {
                // 转成base64
                /** @type {?} */
                const fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (handler.recieveLocalFileHTML(this.getFileHTML(event.target.result))) {
                        this.parent.close();
                    }
                });
            }
            else {
                // 交给外部进行处理
                /** @type {?} */
                const tip = this.domService.tost({
                    text: '上传中~',
                    duration: -1
                });
                // tslint:disable-next-line: no-unused-expression
                handler.emitUploadFile && handler.emitUploadFile(this.type, file, this.getFileHTML, (/**
                 * @param {?} isSuccess
                 * @param {?=} t
                 * @return {?}
                 */
                (isSuccess, t) => {
                    if (isSuccess) { // 上传成功
                        tip.close();
                        this.parent.close();
                        return;
                    }
                    if (!t) { // 上传失败
                        tip.close();
                        this.parent.close();
                        tip.open({ text: '上传失败~' });
                        return;
                    }
                    // 上传超时
                    /** @type {?} */
                    const timer = setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        clearTimeout(timer);
                        tip.close();
                        this.parent.close();
                        tip.open({ text: '上传超时~' });
                    }), t);
                }));
            }
        });
        /**
         * 传入src并根据类型获取文件html
         */
        this.getFileHTML = (/**
         * @param {?} src
         * @return {?}
         */
        (src) => {
            /** @type {?} */
            let html = '';
            switch (this.type) {
                case 'image':
                    html = this.getImageHTML(src);
                    break;
                case 'audio':
                    html = this.getAudioHTML(src);
                    break;
                case 'video':
                    html = this.getVideoHTML(src);
                    break;
            }
            return html;
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set type(v) {
        this._type = v;
        this.typeName = { image: '图片', audio: '音频', video: '视频' }[v];
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * 点击本地上传
     * @return {?}
     */
    selectFile() {
        // 需要先设置宽度和高度
        /** @type {?} */
        const num = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?$/i;
        if (!num.test(this.width + '') || !num.test(this.height + '')) {
            this.domService.tost({
                text: `上传${this.typeName}前请填写合适的高度和宽度~`
            });
            return;
        }
        /** @type {?} */
        const file = this.file.nativeElement;
        /** @type {?} */
        const arr = {
            image: UIAnnexComponent.IMAGEARR,
            audio: UIAnnexComponent.AUDIOARR,
            video: UIAnnexComponent.VIDEOARR,
        }[this.type];
        file.accept = arr.join(',');
        if ('onchange' in file) {
            file.onchange = this.fileChange;
        }
        else {
            file.onpropertychange = this.fileChange;
        }
        file.click();
    }
    /**
     * 插入外链
     * @return {?}
     */
    insertOutLink() {
        /** @type {?} */
        const hasperc = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?$/i;
        if (!hasperc.test(this.width)) {
            this.domService.tost({
                text: '请填写合适的宽度~'
            });
            return;
        }
        if (!hasperc.test(this.height)) {
            this.domService.tost({
                text: '请填写合适的高度~'
            });
            return;
        }
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            this.domService.tost({
                text: '链接地址不规范'
            });
            return;
        }
        /** @type {?} */
        const html = this.getFileHTML(this.url);
        if (this.handler.recieveFileLinkHTML(html)) {
            this.parent.close();
            this.parent = null;
        }
    }
    /**
     * 获取插入图片的HTML
     * @param {?} src url或base64
     * @return {?}
     */
    getImageHTML(src) {
        return ('<p style="height:' +
            this.height +
            ';">' +
            '<img src="' +
            src +
            '" style="height:' +
            this.height +
            ';width:' +
            this.width +
            ';object-fit:cover;" />' +
            '</p><br/>');
    }
    /**
     * 获取插入音频的HTML
     * @param {?} src url
     * @return {?}
     */
    getAudioHTML(src) {
        /** @type {?} */
        const arr = UIAnnexComponent.AUDIOARR;
        // tslint:disable-next-line: max-line-length
        /** @type {?} */
        let html = '<p style="text-align:center;height:' + this.height + ';"><audio controls style="display:inline-block;height:' + '100%' + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Audio标签。';
        html += '</audio>&#8205;&zwj;</p><br/>';
        return html;
    }
    /**
     * 获取插入视频的HTML
     * @param {?} src
     * @return {?}
     */
    getVideoHTML(src) {
        /** @type {?} */
        const arr = UIAnnexComponent.VIDEOARR;
        // tslint:disable-next-line: max-line-length
        /** @type {?} */
        let html = '<p style="text-align:center;height:' + this.height + ';"><video controls style="display:inline-block;height:' + '100%' + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Video标签。';
        html += '</video>&#8205;&zwj;</p><br/>';
        return html;
    }
}
/**
 * 图片类型
 */
UIAnnexComponent.IMAGEARR = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
UIAnnexComponent.AUDIOARR = ['audio/mp3', 'audio/ogg', 'audio/wav'];
UIAnnexComponent.VIDEOARR = ['video/mp4', 'video/ogg', 'video/webm'];
UIAnnexComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-annex',
                template: "\r\n<div class=\"z-editor-annex\">\r\n  <ul>\r\n    <li>\r\n      <button class=\"wd-upload-local\" (click)=\"selectFile()\">\r\n        \u672C\u5730\u4E0A\u4F20{{typeName}} +\r\n      </button>\r\n      <input *ngIf=\"rebuild\" #file class=\"wd-edit-file\" type=\"file\" />\r\n    </li>\r\n    <li>\r\n      <label>\u7C7B\u578B</label>\r\n      <app-radio-group [(ngModel)]=\"type\" [radioGroup]=\"radioGroup\" class=\"wd-radio-group-type\"></app-radio-group>\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-width\">\u5BBD\u5EA6</label>\r\n      <input id=\"wd-annex-width\" type=\"text\" [(ngModel)]=\"width\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-height\">\u9AD8\u5EA6</label>\r\n      <input id=\"wd-annex-height\" type=\"text\" [(ngModel)]=\"height\" />\r\n    </li>\r\n    <li>\r\n      <label for=\"wd-annex-link\">\u5916\u94FE</label>\r\n      <input placeholder=\"https://\" id=\"wd-annex-link\" type=\"text\" [(ngModel)]=\"url\" />\r\n    </li>\r\n    <li>\r\n      <button (click)=\"insertOutLink()\" class=\"wd-use-link-confirm\">\u63D2\u5165\u5916\u94FE</button>\r\n    </li>\r\n  </ul>\r\n</div>"
            }] }
];
/** @nocollapse */
UIAnnexComponent.ctorParameters = () => [
    { type: DomService }
];
UIAnnexComponent.propDecorators = {
    file: [{ type: ViewChild, args: ['file', { static: false, read: ElementRef },] }]
};
if (false) {
    /**
     * 图片类型
     * @type {?}
     */
    UIAnnexComponent.IMAGEARR;
    /** @type {?} */
    UIAnnexComponent.AUDIOARR;
    /** @type {?} */
    UIAnnexComponent.VIDEOARR;
    /** @type {?} */
    UIAnnexComponent.prototype.url;
    /** @type {?} */
    UIAnnexComponent.prototype.width;
    /** @type {?} */
    UIAnnexComponent.prototype.height;
    /**
     * 获取类型对应的名称
     * @type {?}
     */
    UIAnnexComponent.prototype.typeName;
    /**
     * 重渲染input file
     * @type {?}
     */
    UIAnnexComponent.prototype.rebuild;
    /** @type {?} */
    UIAnnexComponent.prototype.radioGroup;
    /** @type {?} */
    UIAnnexComponent.prototype.file;
    /** @type {?} */
    UIAnnexComponent.prototype._type;
    /** @type {?} */
    UIAnnexComponent.prototype.handler;
    /** @type {?} */
    UIAnnexComponent.prototype.parent;
    /**
     * 选择文件
     * @type {?}
     */
    UIAnnexComponent.prototype.fileChange;
    /**
     * 传入src并根据类型获取文件html
     * @type {?}
     */
    UIAnnexComponent.prototype.getFileHTML;
    /**
     * @type {?}
     * @private
     */
    UIAnnexComponent.prototype.domService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYW5uZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS1hbm5leC91aS1hbm5leC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUW5ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUEwQnpCLFlBQ1ksVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRCbEMsUUFBRyxHQUFHLFVBQVUsQ0FBQztRQUNqQixVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsV0FBTSxHQUFHLE9BQU8sQ0FBQzs7OztRQUVqQixhQUFRLEdBQUcsSUFBSSxDQUFDOzs7O1FBRWhCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixlQUFVLEdBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUd2SCxVQUFLLEdBQWdDLE9BQU8sQ0FBQzs7OztRQTZDN0MsZUFBVTs7O1FBQUcsR0FBRyxFQUFFOztrQkFDUixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSzs7a0JBQ3JDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FB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SUFDYixrQ0FBWTs7Ozs7SUEyQ1osc0NBMERDOzs7OztJQWtDRCx1Q0FjQzs7Ozs7SUEzSUcsc0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog5o+S5YWl5paH5Lu257uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM1OjAyIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmFkaW8gfSBmcm9tICcuLi9fZm9ybS9yYWRpby1ncm91cC9yYWRpby1ncm91cCc7XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL0RvbVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaXBDb21wb25lbnQgfSBmcm9tICcuLi9fYWxlcnQvdGlwL3RpcCc7XHJcbmltcG9ydCB7IEFwcFplZGl0b3JDb21wb25lbnQgfSBmcm9tICcuLi9uZy16ZWRpdG9yLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLWFubmV4JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi91aS1hbm5leC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJQW5uZXhDb21wb25lbnQge1xyXG4gICAgLyoqIOWbvueJh+exu+WeiyAqL1xyXG4gICAgc3RhdGljIElNQUdFQVJSID0gWydpbWFnZS9naWYnLCAnaW1hZ2UvanBlZycsICdpbWFnZS9qcGcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL3N2ZyddO1xyXG4gICAgc3RhdGljIEFVRElPQVJSID0gWydhdWRpby9tcDMnLCAnYXVkaW8vb2dnJywgJ2F1ZGlvL3dhdiddO1xyXG4gICAgc3RhdGljIFZJREVPQVJSID0gWyd2aWRlby9tcDQnLCAndmlkZW8vb2dnJywgJ3ZpZGVvL3dlYm0nXTtcclxuICAgIHVybCA9ICdodHRwczovLyc7XHJcbiAgICB3aWR0aCA9ICcxMDAlJztcclxuICAgIGhlaWdodCA9ICcyMDBweCc7XHJcbiAgICAvKiog6I635Y+W57G75Z6L5a+55bqU55qE5ZCN56ewICovXHJcbiAgICB0eXBlTmFtZSA9ICflm77niYcnO1xyXG4gICAgLyoqIOmHjea4suafk2lucHV0IGZpbGUgKi9cclxuICAgIHJlYnVpbGQgPSB0cnVlO1xyXG4gICAgcmFkaW9Hcm91cDogUmFkaW9bXSA9IFt7IHZhbHVlOiAnaW1hZ2UnLCB0ZXh0OiAn5Zu+54mHJyB9LCB7IHZhbHVlOiAnYXVkaW8nLCB0ZXh0OiAn6Z+z6aKRJyB9LCB7IHZhbHVlOiAndmlkZW8nLCB0ZXh0OiAn6KeG6aKRJyB9XTtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGUnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgZmlsZTogRWxlbWVudFJlZjtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxyXG4gICAgX3R5cGU6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJyA9ICdpbWFnZSc7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuICAgIHNldCB0eXBlKHY6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJykge1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB2O1xyXG4gICAgICAgIHRoaXMudHlwZU5hbWUgPSB7IGltYWdlOiAn5Zu+54mHJywgYXVkaW86ICfpn7PpopEnLCB2aWRlbzogJ+inhumikScgfVt2XTtcclxuICAgIH1cclxuICAgIGdldCB0eXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+acrOWcsOS4iuS8oFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RGaWxlKCkge1xyXG4gICAgICAgIC8vIOmcgOimgeWFiOiuvue9ruWuveW6puWSjOmrmOW6plxyXG4gICAgICAgIGNvbnN0IG51bSA9IC9eWzEtOV1cXGR7MSwzfShweHxyZW18ZW18dnd8dmh8JSk/JC9pO1xyXG4gICAgICAgIGlmICghbnVtLnRlc3QodGhpcy53aWR0aCArICcnKSB8fCAhbnVtLnRlc3QodGhpcy5oZWlnaHQgKyAnJykpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogYOS4iuS8oCR7dGhpcy50eXBlTmFtZX3liY3or7floavlhpnlkIjpgILnmoTpq5jluqblkozlrr3luqZ+YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5maWxlLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgYXJyID0ge1xyXG4gICAgICAgICAgICBpbWFnZTogVUlBbm5leENvbXBvbmVudC5JTUFHRUFSUixcclxuICAgICAgICAgICAgYXVkaW86IFVJQW5uZXhDb21wb25lbnQuQVVESU9BUlIsXHJcbiAgICAgICAgICAgIHZpZGVvOiBVSUFubmV4Q29tcG9uZW50LlZJREVPQVJSLFxyXG4gICAgICAgIH1bdGhpcy50eXBlXTtcclxuICAgICAgICBmaWxlLmFjY2VwdCA9IGFyci5qb2luKCcsJyk7XHJcbiAgICAgICAgaWYgKCdvbmNoYW5nZScgaW4gZmlsZSkge1xyXG4gICAgICAgICAgICBmaWxlLm9uY2hhbmdlID0gdGhpcy5maWxlQ2hhbmdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpbGUub25wcm9wZXJ0eWNoYW5nZSA9IHRoaXMuZmlsZUNoYW5nZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmlsZS5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIGZpbGVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGUubmF0aXZlRWxlbWVudC5maWxlcztcclxuICAgICAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XHJcbiAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVidWlsZCA9IHRydWU7IH0pO1xyXG4gICAgICAgIC8vIOe8lui+keWZqOWunuS+i1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXI6IEFwcFplZGl0b3JDb21wb25lbnQgPSB0aGlzLmhhbmRsZXI7XHJcbiAgICAgICAgLy8g6I635Y+W57yW6L6R5ZmoYmFubmVy6YWN572u5Y+C5pWwXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gaGFuZGxlci5vcHRpb25zJFt0aGlzLnR5cGVdIHx8IHt9O1xyXG4gICAgICAgIC8vIOagh+etvlxyXG4gICAgICAgIGNvbnN0IHRhZyA9IHsgaW1hZ2U6ICdJTUcnLCBhdWRpbzogJ0FVRElPJywgdmlkZW86ICdWSURFTycgfVt0aGlzLnR5cGVdO1xyXG4gICAgICAgIC8vIOWIpOaWreaWh+S7tuaYr+WQpui2hei/h+aVsOmHj1xyXG4gICAgICAgIGlmIChoYW5kbGVyLnBhbm5lbC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpLmxlbmd0aCA+PSAob3B0aW9uLmNvdW50IHx8IDEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IGAke3RoaXMudHlwZU5hbWV95bey6LaF5Ye65pyA5aSn5pWw6YePYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3mlofku7bmmK/lkKbpnIDovazmiJBiYXNlNjRcclxuICAgICAgICBjb25zdCBiYXNlNjRzaXplID0gb3B0aW9uLmJhc2U2NCB8fCAwO1xyXG4gICAgICAgIGlmIChiYXNlNjRzaXplICYmIGZpbGUuc2l6ZSA8PSBiYXNlNjRzaXplKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOaIkGJhc2U2NFxyXG4gICAgICAgICAgICBjb25zdCBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIGZyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICAgICAgICAgIGZyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlci5yZWNpZXZlTG9jYWxGaWxlSFRNTCh0aGlzLmdldEZpbGVIVE1MKGV2ZW50LnRhcmdldC5yZXN1bHQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5Lqk57uZ5aSW6YOo6L+b6KGM5aSE55CGXHJcbiAgICAgICAgICAgIGNvbnN0IHRpcDogVGlwQ29tcG9uZW50ID0gdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+S4iuS8oOS4rX4nLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IC0xXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgICAgICAgIGhhbmRsZXIuZW1pdFVwbG9hZEZpbGUgJiYgaGFuZGxlci5lbWl0VXBsb2FkRmlsZSh0aGlzLnR5cGUsIGZpbGUsIHRoaXMuZ2V0RmlsZUhUTUwsIChpc1N1Y2Nlc3M6IGJvb2xlYW4sIHQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N1Y2Nlc3MpIHsgLy8g5LiK5Lyg5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXQpIHsgLy8g5LiK5Lyg5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAub3Blbih7IHRleHQ6ICfkuIrkvKDlpLHotKV+JyB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDkuIrkvKDotoXml7ZcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5vcGVuKHsgdGV4dDogJ+S4iuS8oOi2heaXtn4nIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl5aSW6ZO+XHJcbiAgICAgKi9cclxuICAgIGluc2VydE91dExpbmsoKSB7XHJcbiAgICAgICAgY29uc3QgaGFzcGVyYyA9IC9eWzEtOV1cXGR7MSwzfShweHxyZW18ZW18dnd8dmh8JSk/JC9pO1xyXG4gICAgICAgIGlmICghaGFzcGVyYy50ZXN0KHRoaXMud2lkdGgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfor7floavlhpnlkIjpgILnmoTlrr3luqZ+J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWhhc3BlcmMudGVzdCh0aGlzLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+ivt+Whq+WGmeWQiOmAgueahOmrmOW6pn4nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghL14oXFwvXFwvfGh0dHBzPzopXFwvXFwvLisvLnRlc3QodGhpcy51cmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfpk77mjqXlnLDlnYDkuI3op4TojIMnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmdldEZpbGVIVE1MKHRoaXMudXJsKTtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyLnJlY2lldmVGaWxlTGlua0hUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpXNyY+W5tuagueaNruexu+Wei+iOt+WPluaWh+S7tmh0bWxcclxuICAgICAqL1xyXG4gICAgZ2V0RmlsZUhUTUwgPSAoc3JjOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcclxuICAgICAgICAgICAgICAgIGh0bWwgPSB0aGlzLmdldEltYWdlSFRNTChzcmMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F1ZGlvJzpcclxuICAgICAgICAgICAgICAgIGh0bWwgPSB0aGlzLmdldEF1ZGlvSFRNTChzcmMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpZGVvJzpcclxuICAgICAgICAgICAgICAgIGh0bWwgPSB0aGlzLmdldFZpZGVvSFRNTChzcmMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o+S5YWl5Zu+54mH55qESFRNTFxyXG4gICAgICogQHBhcmFtIHNyYyB1cmzmiJZiYXNlNjRcclxuICAgICAqL1xyXG4gICAgZ2V0SW1hZ2VIVE1MKHNyYzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgJzxwIHN0eWxlPVwiaGVpZ2h0OicgK1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCArXHJcbiAgICAgICAgICAgICc7XCI+JyArXHJcbiAgICAgICAgICAgICc8aW1nIHNyYz1cIicgK1xyXG4gICAgICAgICAgICBzcmMgK1xyXG4gICAgICAgICAgICAnXCIgc3R5bGU9XCJoZWlnaHQ6JyArXHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ICtcclxuICAgICAgICAgICAgJzt3aWR0aDonICtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCArXHJcbiAgICAgICAgICAgICc7b2JqZWN0LWZpdDpjb3ZlcjtcIiAvPicgK1xyXG4gICAgICAgICAgICAnPC9wPjxici8+J1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpemfs+mikeeahEhUTUxcclxuICAgICAqIEBwYXJhbSBzcmMgdXJsXHJcbiAgICAgKi9cclxuICAgIGdldEF1ZGlvSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFVJQW5uZXhDb21wb25lbnQuQVVESU9BUlI7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBsZXQgaHRtbCA9ICc8cCBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAnO1wiPjxhdWRpbyBjb250cm9scyBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDonICsgJzEwMCUnICsgJzt3aWR0aDonICsgdGhpcy53aWR0aCArICc7XCI+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxzb3VyY2Ugc3JjPVwiJyArIHNyYyArICdcIiB0eXBlPVwiJyArIGFycltpXSArICdcIj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9ICfmgqjnmoTmtY/op4jlmajkuI3mlK/mjIFBdWRpb+agh+etvuOAgic7XHJcbiAgICAgICAgaHRtbCArPSAnPC9hdWRpbz4mIzgyMDU7Jnp3ajs8L3A+PGJyLz4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o+S5YWl6KeG6aKR55qESFRNTFxyXG4gICAgICovXHJcbiAgICBnZXRWaWRlb0hUTUwoc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBVSUFubmV4Q29tcG9uZW50LlZJREVPQVJSO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0ICsgJztcIj48dmlkZW8gY29udHJvbHMgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6JyArICcxMDAlJyArICc7d2lkdGg6JyArIHRoaXMud2lkdGggKyAnO1wiPic7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8c291cmNlIHNyYz1cIicgKyBzcmMgKyAnXCIgdHlwZT1cIicgKyBhcnJbaV0gKyAnXCI+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbCArPSAn5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBVmlkZW/moIfnrb7jgIInO1xyXG4gICAgICAgIGh0bWwgKz0gJzwvdmlkZW8+JiM4MjA1OyZ6d2o7PC9wPjxici8+JztcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19