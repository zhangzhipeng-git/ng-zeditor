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
        this.height = 'auto';
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
        const num = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?|auto|inherit|unset$/i;
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
        return ('<p>' +
            '<img src="' +
            src +
            '" style="height:' +
            this.height +
            ';width:' +
            this.width +
            ';object-fit:cover;" />' +
            '</p><p><br/></p>');
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
        let html = '<p><audio controls style="display:inline-block;height:' + this.height + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Audio标签。';
        html += '</audio>&#8205;&zwj;</p><p><br/></p>';
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
        let html = '<p><video controls style="display:inline-block;height:' + this.height + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Video标签。';
        html += '</video>&#8205;&zwj;</p><p><br/></p>';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYW5uZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS1hbm5leC91aS1hbm5leC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUW5ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUEwQnpCLFlBQ1ksVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRCbEMsUUFBRyxHQUFHLFVBQVUsQ0FBQztRQUNqQixVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsV0FBTSxHQUFHLE1BQU0sQ0FBQzs7OztRQUVoQixhQUFRLEdBQUcsSUFBSSxDQUFDOzs7O1FBRWhCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixlQUFVLEdBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUd2SCxVQUFLLEdBQWdDLE9BQU8sQ0FBQzs7OztRQTZDN0MsZUFBVTs7O1FBQUcsR0FBRyxFQUFFOztrQkFDUixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSzs7a0JBQ3JDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FB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ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOaPkuWFpeaWh+S7tue7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNTowMiBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnLi4vX2Zvcm0vcmFkaW8tZ3JvdXAvcmFkaW8tZ3JvdXAnO1xyXG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9Eb21TZXJ2aWNlJztcclxuaW1wb3J0IHsgVGlwQ29tcG9uZW50IH0gZnJvbSAnLi4vX2FsZXJ0L3RpcC90aXAnO1xyXG5pbXBvcnQgeyBBcHBaZWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbmctemVkaXRvci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC1hbm5leCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdWktYW5uZXguY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVSUFubmV4Q29tcG9uZW50IHtcclxuICAgIC8qKiDlm77niYfnsbvlnosgKi9cclxuICAgIHN0YXRpYyBJTUFHRUFSUiA9IFsnaW1hZ2UvZ2lmJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvanBnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9zdmcnXTtcclxuICAgIHN0YXRpYyBBVURJT0FSUiA9IFsnYXVkaW8vbXAzJywgJ2F1ZGlvL29nZycsICdhdWRpby93YXYnXTtcclxuICAgIHN0YXRpYyBWSURFT0FSUiA9IFsndmlkZW8vbXA0JywgJ3ZpZGVvL29nZycsICd2aWRlby93ZWJtJ107XHJcbiAgICB1cmwgPSAnaHR0cHM6Ly8nO1xyXG4gICAgd2lkdGggPSAnMTAwJSc7XHJcbiAgICBoZWlnaHQgPSAnYXV0byc7XHJcbiAgICAvKiog6I635Y+W57G75Z6L5a+55bqU55qE5ZCN56ewICovXHJcbiAgICB0eXBlTmFtZSA9ICflm77niYcnO1xyXG4gICAgLyoqIOmHjea4suafk2lucHV0IGZpbGUgKi9cclxuICAgIHJlYnVpbGQgPSB0cnVlO1xyXG4gICAgcmFkaW9Hcm91cDogUmFkaW9bXSA9IFt7IHZhbHVlOiAnaW1hZ2UnLCB0ZXh0OiAn5Zu+54mHJyB9LCB7IHZhbHVlOiAnYXVkaW8nLCB0ZXh0OiAn6Z+z6aKRJyB9LCB7IHZhbHVlOiAndmlkZW8nLCB0ZXh0OiAn6KeG6aKRJyB9XTtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGUnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgZmlsZTogRWxlbWVudFJlZjtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxyXG4gICAgX3R5cGU6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJyA9ICdpbWFnZSc7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuICAgIHNldCB0eXBlKHY6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJykge1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB2O1xyXG4gICAgICAgIHRoaXMudHlwZU5hbWUgPSB7IGltYWdlOiAn5Zu+54mHJywgYXVkaW86ICfpn7PpopEnLCB2aWRlbzogJ+inhumikScgfVt2XTtcclxuICAgIH1cclxuICAgIGdldCB0eXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+acrOWcsOS4iuS8oFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RGaWxlKCkge1xyXG4gICAgICAgIC8vIOmcgOimgeWFiOiuvue9ruWuveW6puWSjOmrmOW6plxyXG4gICAgICAgIGNvbnN0IG51bSA9IC9eWzEtOV1cXGR7MSwzfShweHxyZW18ZW18dnd8dmh8JSk/fGF1dG98aW5oZXJpdHx1bnNldCQvaTtcclxuICAgICAgICBpZiAoIW51bS50ZXN0KHRoaXMud2lkdGggKyAnJykgfHwgIW51bS50ZXN0KHRoaXMuaGVpZ2h0ICsgJycpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IGDkuIrkvKAke3RoaXMudHlwZU5hbWV95YmN6K+35aGr5YaZ5ZCI6YCC55qE6auY5bqm5ZKM5a695bqmfmBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZS5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFyciA9IHtcclxuICAgICAgICAgICAgaW1hZ2U6IFVJQW5uZXhDb21wb25lbnQuSU1BR0VBUlIsXHJcbiAgICAgICAgICAgIGF1ZGlvOiBVSUFubmV4Q29tcG9uZW50LkFVRElPQVJSLFxyXG4gICAgICAgICAgICB2aWRlbzogVUlBbm5leENvbXBvbmVudC5WSURFT0FSUixcclxuICAgICAgICB9W3RoaXMudHlwZV07XHJcbiAgICAgICAgZmlsZS5hY2NlcHQgPSBhcnIuam9pbignLCcpO1xyXG4gICAgICAgIGlmICgnb25jaGFuZ2UnIGluIGZpbGUpIHtcclxuICAgICAgICAgICAgZmlsZS5vbmNoYW5nZSA9IHRoaXMuZmlsZUNoYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWxlLm9ucHJvcGVydHljaGFuZ2UgPSB0aGlzLmZpbGVDaGFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbGUuY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeaWh+S7tlxyXG4gICAgICovXHJcbiAgICBmaWxlQ2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWxlLm5hdGl2ZUVsZW1lbnQuZmlsZXM7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xyXG4gICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMucmVidWlsZCA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnJlYnVpbGQgPSB0cnVlOyB9KTtcclxuICAgICAgICAvLyDnvJbovpHlmajlrp7kvotcclxuICAgICAgICBjb25zdCBoYW5kbGVyOiBBcHBaZWRpdG9yQ29tcG9uZW50ID0gdGhpcy5oYW5kbGVyO1xyXG4gICAgICAgIC8vIOiOt+WPlue8lui+keWZqGJhbm5lcumFjee9ruWPguaVsFxyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGhhbmRsZXIub3B0aW9ucyRbdGhpcy50eXBlXSB8fCB7fTtcclxuICAgICAgICAvLyDmoIfnrb5cclxuICAgICAgICBjb25zdCB0YWcgPSB7IGltYWdlOiAnSU1HJywgYXVkaW86ICdBVURJTycsIHZpZGVvOiAnVklERU8nIH1bdGhpcy50eXBlXTtcclxuICAgICAgICAvLyDliKTmlq3mlofku7bmmK/lkKbotoXov4fmlbDph49cclxuICAgICAgICBpZiAoaGFuZGxlci5wYW5uZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKS5sZW5ndGggPj0gKG9wdGlvbi5jb3VudCB8fCAxKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBgJHt0aGlzLnR5cGVOYW1lfeW3sui2heWHuuacgOWkp+aVsOmHj2BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5paH5Lu25piv5ZCm6ZyA6L2s5oiQYmFzZTY0XHJcbiAgICAgICAgY29uc3QgYmFzZTY0c2l6ZSA9IG9wdGlvbi5iYXNlNjQgfHwgMDtcclxuICAgICAgICBpZiAoYmFzZTY0c2l6ZSAmJiBmaWxlLnNpemUgPD0gYmFzZTY0c2l6ZSkge1xyXG4gICAgICAgICAgICAvLyDovazmiJBiYXNlNjRcclxuICAgICAgICAgICAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICBmci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgICAgICAgICBmci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIucmVjaWV2ZUxvY2FsRmlsZUhUTUwodGhpcy5nZXRGaWxlSFRNTChldmVudC50YXJnZXQucmVzdWx0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS6pOe7meWklumDqOi/m+ihjOWkhOeQhlxyXG4gICAgICAgICAgICBjb25zdCB0aXA6IFRpcENvbXBvbmVudCA9IHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfkuIrkvKDkuK1+JyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgICAgICBoYW5kbGVyLmVtaXRVcGxvYWRGaWxlICYmIGhhbmRsZXIuZW1pdFVwbG9hZEZpbGUodGhpcy50eXBlLCBmaWxlLCB0aGlzLmdldEZpbGVIVE1MLCAoaXNTdWNjZXNzOiBib29sZWFuLCB0PzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7IC8vIOS4iuS8oOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0KSB7IC8vIOS4iuS8oOWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLm9wZW4oeyB0ZXh0OiAn5LiK5Lyg5aSx6LSlficgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5LiK5Lyg6LaF5pe2XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAub3Blbih7IHRleHQ6ICfkuIrkvKDotoXml7Z+JyB9KTtcclxuICAgICAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeWklumTvlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRPdXRMaW5rKCkge1xyXG4gICAgICAgIGNvbnN0IGhhc3BlcmMgPSAvXlsxLTldXFxkezEsM30ocHh8cmVtfGVtfHZ3fHZofCUpPyQvaTtcclxuICAgICAgICBpZiAoIWhhc3BlcmMudGVzdCh0aGlzLndpZHRoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6K+35aGr5YaZ5ZCI6YCC55qE5a695bqmfidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYXNwZXJjLnRlc3QodGhpcy5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfor7floavlhpnlkIjpgILnmoTpq5jluqZ+J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9eKFxcL1xcL3xodHRwcz86KVxcL1xcLy4rLy50ZXN0KHRoaXMudXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6ZO+5o6l5Zyw5Z2A5LiN6KeE6IyDJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBodG1sID0gdGhpcy5nZXRGaWxlSFRNTCh0aGlzLnVybCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlci5yZWNpZXZlRmlsZUxpbmtIVE1MKGh0bWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKDlhaVzcmPlubbmoLnmja7nsbvlnovojrflj5bmlofku7ZodG1sXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGVIVE1MID0gKHNyYzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBodG1sID0gdGhpcy5nZXRJbWFnZUhUTUwoc3JjKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdWRpbyc6XHJcbiAgICAgICAgICAgICAgICBodG1sID0gdGhpcy5nZXRBdWRpb0hUTUwoc3JjKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd2aWRlbyc6XHJcbiAgICAgICAgICAgICAgICBodG1sID0gdGhpcy5nZXRWaWRlb0hUTUwoc3JjKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpeWbvueJh+eahEhUTUxcclxuICAgICAqIEBwYXJhbSBzcmMgdXJs5oiWYmFzZTY0XHJcbiAgICAgKi9cclxuICAgIGdldEltYWdlSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICc8cD4nICtcclxuICAgICAgICAgICAgJzxpbWcgc3JjPVwiJyArXHJcbiAgICAgICAgICAgIHNyYyArXHJcbiAgICAgICAgICAgICdcIiBzdHlsZT1cImhlaWdodDonICtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgK1xyXG4gICAgICAgICAgICAnO3dpZHRoOicgK1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoICtcclxuICAgICAgICAgICAgJztvYmplY3QtZml0OmNvdmVyO1wiIC8+JyArXHJcbiAgICAgICAgICAgICc8L3A+PHA+PGJyLz48L3A+J1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpemfs+mikeeahEhUTUxcclxuICAgICAqIEBwYXJhbSBzcmMgdXJsXHJcbiAgICAgKi9cclxuICAgIGdldEF1ZGlvSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFVJQW5uZXhDb21wb25lbnQuQVVESU9BUlI7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBsZXQgaHRtbCA9ICc8cD48YXVkaW8gY29udHJvbHMgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0ICsgJzt3aWR0aDonICsgdGhpcy53aWR0aCArICc7XCI+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxzb3VyY2Ugc3JjPVwiJyArIHNyYyArICdcIiB0eXBlPVwiJyArIGFycltpXSArICdcIj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9ICfmgqjnmoTmtY/op4jlmajkuI3mlK/mjIFBdWRpb+agh+etvuOAgic7XHJcbiAgICAgICAgaHRtbCArPSAnPC9hdWRpbz4mIzgyMDU7Jnp3ajs8L3A+PHA+PGJyLz48L3A+JztcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpeinhumikeeahEhUTUxcclxuICAgICAqL1xyXG4gICAgZ2V0VmlkZW9IVE1MKHNyYzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gVUlBbm5leENvbXBvbmVudC5WSURFT0FSUjtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIGxldCBodG1sID0gJzxwPjx2aWRlbyBjb250cm9scyBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAnO3dpZHRoOicgKyB0aGlzLndpZHRoICsgJztcIj4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHNvdXJjZSBzcmM9XCInICsgc3JjICsgJ1wiIHR5cGU9XCInICsgYXJyW2ldICsgJ1wiPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGh0bWwgKz0gJ+aCqOeahOa1j+iniOWZqOS4jeaUr+aMgVZpZGVv5qCH562+44CCJztcclxuICAgICAgICBodG1sICs9ICc8L3ZpZGVvPiYjODIwNTsmendqOzwvcD48cD48YnIvPjwvcD4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=