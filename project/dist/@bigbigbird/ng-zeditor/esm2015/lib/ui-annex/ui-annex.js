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
        this.url = "https://";
        this.width = "100%";
        this.height = "200px";
        /**
         * 获取类型对应的名称
         */
        this.typeName = '图片';
        /**
         * 重渲染input file
         */
        this.rebuild = true;
        this.radioGroup = [{ value: "image", text: "图片" }, { value: "audio", text: "音频" }, { value: "video", text: "视频" }];
        // tslint:disable-next-line: variable-name
        this._type = "image";
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
                    text: "上传中~",
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
         * @param src
         */
        this.getFileHTML = (/**
         * @param {?} src
         * @return {?}
         */
        (src) => {
            /** @type {?} */
            let html = '';
            switch (this.type) {
                case "image":
                    html = this.getImageHTML(src);
                    break;
                case "audio":
                    html = this.getAudioHTML(src);
                    break;
                case "video":
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
        if (!num.test(this.width + "") || !num.test(this.height + "")) {
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
        file.accept = arr.join(",");
        file.click();
        file.onchange = this.fileChange;
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
                text: "请填写合适的宽度~"
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
                text: "链接地址不规范"
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
            "</p><br/>");
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
UIAnnexComponent.IMAGEARR = ["image/gif", "image/jpeg", "image/jpg", "image/png", "image/svg"];
UIAnnexComponent.AUDIOARR = ["audio/mp3", "audio/ogg", "audio/wav"];
UIAnnexComponent.VIDEOARR = ["video/mp4", "video/ogg", "video/webm"];
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
     * \@param src
     * @type {?}
     */
    UIAnnexComponent.prototype.getFileHTML;
    /**
     * @type {?}
     * @private
     */
    UIAnnexComponent.prototype.domService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYW5uZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvdWktYW5uZXgvdWktYW5uZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVFuRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBMEJ6QixZQUNZLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUExQmxDLFFBQUcsR0FBVyxVQUFVLENBQUM7UUFDekIsVUFBSyxHQUFXLE1BQU0sQ0FBQztRQUN2QixXQUFNLEdBQVcsT0FBTyxDQUFDOzs7O1FBRXpCLGFBQVEsR0FBVyxJQUFJLENBQUM7Ozs7UUFFeEIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixlQUFVLEdBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQU92SCxVQUFLLEdBQWdDLE9BQU8sQ0FBQzs7OztRQXlDN0MsZUFBVTs7O1FBQUcsR0FBRyxFQUFFOztrQkFDUixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSzs7a0JBQ3JDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUss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XG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDmj5LlhaXmlofku7bnu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzU6MDIgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSYWRpb30gZnJvbSAnLi4vX2Zvcm0vcmFkaW8tZ3JvdXAvcmFkaW8tZ3JvdXAnO1xyXG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9Eb21TZXJ2aWNlJztcclxuaW1wb3J0IHsgVGlwQ29tcG9uZW50IH0gZnJvbSAnLi4vX2FsZXJ0L3RpcC90aXAnO1xyXG5pbXBvcnQgeyBBcHBaZWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi4vbmctemVkaXRvci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC1hbm5leCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vdWktYW5uZXguY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVSUFubmV4Q29tcG9uZW50IHtcclxuICAgIHVybDogc3RyaW5nID0gXCJodHRwczovL1wiO1xyXG4gICAgd2lkdGg6IHN0cmluZyA9IFwiMTAwJVwiO1xyXG4gICAgaGVpZ2h0OiBzdHJpbmcgPSBcIjIwMHB4XCI7XHJcbiAgICAvKiog6I635Y+W57G75Z6L5a+55bqU55qE5ZCN56ewICovXHJcbiAgICB0eXBlTmFtZTogc3RyaW5nID0gJ+WbvueJhyc7XHJcbiAgICAvKiog6YeN5riy5p+TaW5wdXQgZmlsZSAqL1xyXG4gICAgcmVidWlsZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICByYWRpb0dyb3VwOiBSYWRpb1tdID0gW3sgdmFsdWU6IFwiaW1hZ2VcIiwgdGV4dDogXCLlm77niYdcIiB9LCB7IHZhbHVlOiBcImF1ZGlvXCIsIHRleHQ6IFwi6Z+z6aKRXCIgfSwgeyB2YWx1ZTogXCJ2aWRlb1wiLCB0ZXh0OiBcIuinhumikVwiIH1dO1xyXG4gICAgLyoqIOWbvueJh+exu+WeiyAqL1xyXG4gICAgc3RhdGljIElNQUdFQVJSID0gW1wiaW1hZ2UvZ2lmXCIsIFwiaW1hZ2UvanBlZ1wiLCBcImltYWdlL2pwZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3N2Z1wiXTtcclxuICAgIHN0YXRpYyBBVURJT0FSUiA9IFtcImF1ZGlvL21wM1wiLCBcImF1ZGlvL29nZ1wiLCBcImF1ZGlvL3dhdlwiXTtcclxuICAgIHN0YXRpYyBWSURFT0FSUiA9IFtcInZpZGVvL21wNFwiLCBcInZpZGVvL29nZ1wiLCBcInZpZGVvL3dlYm1cIl07XHJcbiAgICBAVmlld0NoaWxkKCdmaWxlJywgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBFbGVtZW50UmVmIH0pIGZpbGU6IEVsZW1lbnRSZWY7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcclxuICAgIF90eXBlOiAnaW1hZ2UnIHwgJ2F1ZGlvJyB8ICd2aWRlbycgPSBcImltYWdlXCI7XHJcbiAgICBoYW5kbGVyOiBhbnk7XHJcbiAgICBwYXJlbnQ6IGFueTtcclxuICAgIHNldCB0eXBlKHY6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJykge1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSB2O1xyXG4gICAgICAgIHRoaXMudHlwZU5hbWUgPSB7aW1hZ2U6ICflm77niYcnLCBhdWRpbzogJ+mfs+mikScsIHZpZGVvOiAn6KeG6aKRJ31bdl07XHJcbiAgICB9XHJcbiAgICBnZXQgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vmnKzlnLDkuIrkvKBcclxuICAgICAqL1xyXG4gICAgc2VsZWN0RmlsZSgpIHtcclxuICAgICAgICAvLyDpnIDopoHlhYjorr7nva7lrr3luqblkozpq5jluqZcclxuICAgICAgICBjb25zdCBudW0gPSAvXlsxLTldXFxkezEsM30ocHh8cmVtfGVtfHZ3fHZofCUpPyQvaTtcclxuICAgICAgICBpZiAoIW51bS50ZXN0KHRoaXMud2lkdGggKyBcIlwiKSB8fCAhbnVtLnRlc3QodGhpcy5oZWlnaHQgKyBcIlwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBg5LiK5LygJHt0aGlzLnR5cGVOYW1lfeWJjeivt+Whq+WGmeWQiOmAgueahOmrmOW6puWSjOWuveW6pn5gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmZpbGUubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBjb25zdCBhcnIgPSB7XHJcbiAgICAgICAgICAgIGltYWdlOiBVSUFubmV4Q29tcG9uZW50LklNQUdFQVJSLFxyXG4gICAgICAgICAgICBhdWRpbzogVUlBbm5leENvbXBvbmVudC5BVURJT0FSUixcclxuICAgICAgICAgICAgdmlkZW86IFVJQW5uZXhDb21wb25lbnQuVklERU9BUlIsXHJcbiAgICAgICAgfVt0aGlzLnR5cGVdO1xyXG4gICAgICAgIGZpbGUuYWNjZXB0ID0gYXJyLmpvaW4oXCIsXCIpO1xyXG4gICAgICAgIGZpbGUuY2xpY2soKTtcclxuICAgICAgICBmaWxlLm9uY2hhbmdlID0gdGhpcy5maWxlQ2hhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIGZpbGVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGUubmF0aXZlRWxlbWVudC5maWxlcztcclxuICAgICAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XHJcbiAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVidWlsZCA9IHRydWU7IH0pO1xyXG4gICAgICAgIC8vIOe8lui+keWZqOWunuS+i1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXI6IEFwcFplZGl0b3JDb21wb25lbnQgPSB0aGlzLmhhbmRsZXI7XHJcbiAgICAgICAgLy8g6I635Y+W57yW6L6R5ZmoYmFubmVy6YWN572u5Y+C5pWwXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gaGFuZGxlci5vcHRpb25zJFt0aGlzLnR5cGVdIHx8IHt9O1xyXG4gICAgICAgIC8vIOagh+etvlxyXG4gICAgICAgIGNvbnN0IHRhZyA9IHsgaW1hZ2U6ICdJTUcnLCBhdWRpbzogJ0FVRElPJywgdmlkZW86ICdWSURFTycgfVt0aGlzLnR5cGVdO1xyXG4gICAgICAgIC8vIOWIpOaWreaWh+S7tuaYr+WQpui2hei/h+aVsOmHj1xyXG4gICAgICAgIGlmIChoYW5kbGVyLnBhbm5lbC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpLmxlbmd0aCA+PSAob3B0aW9uLmNvdW50IHx8IDEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IGAke3RoaXMudHlwZU5hbWV95bey6LaF5Ye65pyA5aSn5pWw6YePYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3mlofku7bmmK/lkKbpnIDovazmiJBiYXNlNjRcclxuICAgICAgICBjb25zdCBiYXNlNjRzaXplID0gb3B0aW9uLmJhc2U2NCB8fCAwO1xyXG4gICAgICAgIGlmIChiYXNlNjRzaXplICYmIGZpbGUuc2l6ZSA8PSBiYXNlNjRzaXplKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOaIkGJhc2U2NFxyXG4gICAgICAgICAgICBjb25zdCBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIGZyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICAgICAgICAgIGZyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlci5yZWNpZXZlTG9jYWxGaWxlSFRNTCh0aGlzLmdldEZpbGVIVE1MKGV2ZW50LnRhcmdldC5yZXN1bHQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5Lqk57uZ5aSW6YOo6L+b6KGM5aSE55CGXHJcbiAgICAgICAgICAgIGNvbnN0IHRpcDogVGlwQ29tcG9uZW50ID0gdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLkuIrkvKDkuK1+XCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogLTFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgICAgICAgaGFuZGxlci5lbWl0VXBsb2FkRmlsZSAmJiBoYW5kbGVyLmVtaXRVcGxvYWRGaWxlKHRoaXMudHlwZSwgZmlsZSwgdGhpcy5nZXRGaWxlSFRNTCwgKGlzU3VjY2VzczogYm9vbGVhbiwgdD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3VjY2VzcykgeyAvLyDkuIrkvKDmiJDlip9cclxuICAgICAgICAgICAgICAgICAgICB0aXAuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdCkgeyAvLyDkuIrkvKDlpLHotKVcclxuICAgICAgICAgICAgICAgICAgICB0aXAuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5vcGVuKHsgdGV4dDogJ+S4iuS8oOWksei0pX4nIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOS4iuS8oOi2heaXtlxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLm9wZW4oeyB0ZXh0OiAn5LiK5Lyg6LaF5pe2ficgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXlpJbpk75cclxuICAgICAqL1xyXG4gICAgaW5zZXJ0T3V0TGluaygpIHtcclxuICAgICAgICBjb25zdCBoYXNwZXJjID0gL15bMS05XVxcZHsxLDN9KHB4fHJlbXxlbXx2d3x2aHwlKT8kL2k7XHJcbiAgICAgICAgaWYgKCFoYXNwZXJjLnRlc3QodGhpcy53aWR0aCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogXCLor7floavlhpnlkIjpgILnmoTlrr3luqZ+XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYXNwZXJjLnRlc3QodGhpcy5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfor7floavlhpnlkIjpgILnmoTpq5jluqZ+J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIS9eKFxcL1xcL3xodHRwcz86KVxcL1xcLy4rLy50ZXN0KHRoaXMudXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIumTvuaOpeWcsOWdgOS4jeinhOiMg1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmdldEZpbGVIVE1MKHRoaXMudXJsKTtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyLnJlY2lldmVGaWxlTGlua0hUTUwoaHRtbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpXNyY+W5tuagueaNruexu+Wei+iOt+WPluaWh+S7tmh0bWxcclxuICAgICAqIEBwYXJhbSAgc3JjXHJcbiAgICAgKi9cclxuICAgIGdldEZpbGVIVE1MID0gKHNyYzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW1hZ2VcIjpcclxuICAgICAgICAgICAgICAgIGh0bWwgPSB0aGlzLmdldEltYWdlSFRNTChzcmMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhdWRpb1wiOlxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IHRoaXMuZ2V0QXVkaW9IVE1MKHNyYyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInZpZGVvXCI6XHJcbiAgICAgICAgICAgICAgICBodG1sID0gdGhpcy5nZXRWaWRlb0hUTUwoc3JjKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpeWbvueJh+eahEhUTUxcclxuICAgICAqIEBwYXJhbSBzcmMgdXJs5oiWYmFzZTY0XHJcbiAgICAgKi9cclxuICAgIGdldEltYWdlSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICc8cCBzdHlsZT1cImhlaWdodDonICtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgK1xyXG4gICAgICAgICAgICAnO1wiPicgK1xyXG4gICAgICAgICAgICAnPGltZyBzcmM9XCInICtcclxuICAgICAgICAgICAgc3JjICtcclxuICAgICAgICAgICAgJ1wiIHN0eWxlPVwiaGVpZ2h0OicgK1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCArXHJcbiAgICAgICAgICAgICc7d2lkdGg6JyArXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggK1xyXG4gICAgICAgICAgICAnO29iamVjdC1maXQ6Y292ZXI7XCIgLz4nICtcclxuICAgICAgICAgICAgXCI8L3A+PGJyLz5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaPkuWFpemfs+mikeeahEhUTUxcclxuICAgICAqIEBwYXJhbSBzcmMgdXJsXHJcbiAgICAgKi9cclxuICAgIGdldEF1ZGlvSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFVJQW5uZXhDb21wb25lbnQuQVVESU9BUlI7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBsZXQgaHRtbCA9ICc8cCBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAnO1wiPjxhdWRpbyBjb250cm9scyBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDonICsgJzEwMCUnICsgJzt3aWR0aDonICsgdGhpcy53aWR0aCArICc7XCI+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxzb3VyY2Ugc3JjPVwiJyArIHNyYyArICdcIiB0eXBlPVwiJyArIGFycltpXSArICdcIj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9ICfmgqjnmoTmtY/op4jlmajkuI3mlK/mjIFBdWRpb+agh+etvuOAgic7XHJcbiAgICAgICAgaHRtbCArPSAnPC9hdWRpbz4mIzgyMDU7Jnp3ajs8L3A+PGJyLz4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o+S5YWl6KeG6aKR55qESFRNTFxyXG4gICAgICogQHBhcmFtIHNyY1xyXG4gICAgICovXHJcbiAgICBnZXRWaWRlb0hUTUwoc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBVSUFubmV4Q29tcG9uZW50LlZJREVPQVJSO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgbGV0IGh0bWwgPSAnPHAgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0ICsgJztcIj48dmlkZW8gY29udHJvbHMgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6JyArICcxMDAlJyArICc7d2lkdGg6JyArIHRoaXMud2lkdGggKyAnO1wiPic7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8c291cmNlIHNyYz1cIicgKyBzcmMgKyAnXCIgdHlwZT1cIicgKyBhcnJbaV0gKyAnXCI+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbCArPSAn5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBVmlkZW/moIfnrb7jgIInO1xyXG4gICAgICAgIGh0bWwgKz0gJzwvdmlkZW8+JiM4MjA1OyZ6d2o7PC9wPjxici8+JztcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19