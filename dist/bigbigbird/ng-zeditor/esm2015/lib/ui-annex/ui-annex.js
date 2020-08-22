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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktYW5uZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi91aS1hbm5leC91aS1hbm5leC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUW5ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUEwQnpCLFlBQ1ksVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTFCbEMsUUFBRyxHQUFXLFVBQVUsQ0FBQztRQUN6QixVQUFLLEdBQVcsTUFBTSxDQUFDO1FBQ3ZCLFdBQU0sR0FBVyxPQUFPLENBQUM7Ozs7UUFFekIsYUFBUSxHQUFXLElBQUksQ0FBQzs7OztRQUV4QixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGVBQVUsR0FBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7O1FBT3ZILFVBQUssR0FBZ0MsT0FBTyxDQUFDOzs7O1FBeUM3QyxlQUFVOzs7UUFBRyxHQUFHLEVBQUU7O2tCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLOztrQkFDckMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLFVBQVU7OztZQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7OztrQkFFckMsT0FBTyxHQUF3QixJQUFJLENBQUMsT0FBTzs7O2tCQUUzQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs7O2tCQUUxQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkUsYUFBYTtZQUNiLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDakIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsU0FBUztpQkFDbEMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjs7O2tCQUVLLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDckMsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7OztzQkFFakMsRUFBRSxHQUFHLElBQUksVUFBVSxFQUFFO2dCQUMzQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsTUFBTTs7OztnQkFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUN2QixJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTt3QkFDckUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDdkI7Z0JBQ0wsQ0FBQyxDQUFBLENBQUM7YUFDTDtpQkFBTTs7O3NCQUVHLEdBQUcsR0FBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQ2YsQ0FBQztnQkFDRixpREFBaUQ7Z0JBQ2pELE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVzs7Ozs7Z0JBQUUsQ0FBQyxTQUFrQixFQUFFLENBQVUsRUFBRSxFQUFFO29CQUNuSCxJQUFJLFNBQVMsRUFBRSxFQUFFLE9BQU87d0JBQ3BCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNwQixPQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPO3dCQUNiLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQzVCLE9BQU87cUJBQ1Y7OzswQkFFSyxLQUFLLEdBQUcsVUFBVTs7O29CQUFDLEdBQUcsRUFBRTt3QkFDMUIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUNoQyxDQUFDLEdBQUUsQ0FBQyxDQUFDO2dCQUNULENBQUMsRUFBQyxDQUFDO2FBQ047UUFDTCxDQUFDLEVBQUE7Ozs7O1FBbUNELGdCQUFXOzs7O1FBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTs7Z0JBQ3RCLElBQUksR0FBRyxFQUFFO1lBQ2IsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNmLEtBQUssT0FBTztvQkFDUixJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsTUFBTTtnQkFDVixLQUFLLE9BQU87b0JBQ1IsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixNQUFNO2FBQ2I7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLEVBQUE7SUF2SUcsQ0FBQzs7Ozs7SUFWTCxJQUFJLElBQUksQ0FBQyxDQUE4QjtRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFDRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFTRCxVQUFVOzs7Y0FFQSxHQUFHLEdBQUcscUNBQXFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLGVBQWU7YUFDMUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWOztjQUNLLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7O2NBQzlCLEdBQUcsR0FBRztZQUNSLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1lBQ2hDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1lBQ2hDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO1NBQ25DLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFtRUQsYUFBYTs7Y0FDSCxPQUFPLEdBQUcscUNBQXFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFdBQVc7YUFDcEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsV0FBVzthQUNwQixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLFNBQVM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWOztjQUNLLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7Ozs7SUEwQkQsWUFBWSxDQUFDLEdBQVc7UUFDcEIsT0FBTyxDQUNILG1CQUFtQjtZQUNuQixJQUFJLENBQUMsTUFBTTtZQUNYLEtBQUs7WUFDTCxZQUFZO1lBQ1osR0FBRztZQUNILGtCQUFrQjtZQUNsQixJQUFJLENBQUMsTUFBTTtZQUNYLFNBQVM7WUFDVCxJQUFJLENBQUMsS0FBSztZQUNWLHdCQUF3QjtZQUN4QixXQUFXLENBQ2QsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUtELFlBQVksQ0FBQyxHQUFXOztjQUNkLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFROzs7WUFFakMsSUFBSSxHQUFHLHFDQUFxQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsd0RBQXdELEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7UUFDbkssS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLElBQUksZUFBZSxHQUFHLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM5RDtRQUNELElBQUksSUFBSSxrQkFBa0IsQ0FBQztRQUMzQixJQUFJLElBQUksK0JBQStCLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBTUQsWUFBWSxDQUFDLEdBQVc7O2NBQ2QsR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVE7OztZQUVqQyxJQUFJLEdBQUcscUNBQXFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyx3REFBd0QsR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztRQUNuSyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksSUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxJQUFJLGtCQUFrQixDQUFDO1FBQzNCLElBQUksSUFBSSwrQkFBK0IsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztBQTVNTSx5QkFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzlFLHlCQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ25ELHlCQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDOztZQWhCOUQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw4bkNBQXdDO2FBQzNDOzs7O1lBUFEsVUFBVTs7O21CQXFCZCxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFOzs7Ozs7O0lBSHRELDBCQUFxRjs7SUFDckYsMEJBQTBEOztJQUMxRCwwQkFBMkQ7O0lBWDNELCtCQUF5Qjs7SUFDekIsaUNBQXVCOztJQUN2QixrQ0FBeUI7Ozs7O0lBRXpCLG9DQUF3Qjs7Ozs7SUFFeEIsbUNBQXdCOztJQUN4QixzQ0FBdUg7O0lBS3ZILGdDQUF5RTs7SUFFekUsaUNBQTZDOztJQUM3QyxtQ0FBYTs7SUFDYixrQ0FBWTs7Ozs7SUF1Q1osc0NBMERDOzs7Ozs7SUFtQ0QsdUNBY0M7Ozs7O0lBeElHLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOaPkuWFpeaWh+S7tue7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNTowMiBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJhZGlvfSBmcm9tICcuLi9fZm9ybS9yYWRpby1ncm91cC9yYWRpby1ncm91cCc7XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL0RvbVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaXBDb21wb25lbnQgfSBmcm9tICcuLi9fYWxlcnQvdGlwL3RpcCc7XHJcbmltcG9ydCB7IEFwcFplZGl0b3JDb21wb25lbnQgfSBmcm9tICcuLi9uZy16ZWRpdG9yLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLWFubmV4JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi91aS1hbm5leC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJQW5uZXhDb21wb25lbnQge1xyXG4gICAgdXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vXCI7XHJcbiAgICB3aWR0aDogc3RyaW5nID0gXCIxMDAlXCI7XHJcbiAgICBoZWlnaHQ6IHN0cmluZyA9IFwiMjAwcHhcIjtcclxuICAgIC8qKiDojrflj5bnsbvlnovlr7nlupTnmoTlkI3np7AgKi9cclxuICAgIHR5cGVOYW1lOiBzdHJpbmcgPSAn5Zu+54mHJztcclxuICAgIC8qKiDph43muLLmn5NpbnB1dCBmaWxlICovXHJcbiAgICByZWJ1aWxkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHJhZGlvR3JvdXA6IFJhZGlvW10gPSBbeyB2YWx1ZTogXCJpbWFnZVwiLCB0ZXh0OiBcIuWbvueJh1wiIH0sIHsgdmFsdWU6IFwiYXVkaW9cIiwgdGV4dDogXCLpn7PpopFcIiB9LCB7IHZhbHVlOiBcInZpZGVvXCIsIHRleHQ6IFwi6KeG6aKRXCIgfV07XHJcbiAgICAvKiog5Zu+54mH57G75Z6LICovXHJcbiAgICBzdGF0aWMgSU1BR0VBUlIgPSBbXCJpbWFnZS9naWZcIiwgXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2UvanBnXCIsIFwiaW1hZ2UvcG5nXCIsIFwiaW1hZ2Uvc3ZnXCJdO1xyXG4gICAgc3RhdGljIEFVRElPQVJSID0gW1wiYXVkaW8vbXAzXCIsIFwiYXVkaW8vb2dnXCIsIFwiYXVkaW8vd2F2XCJdO1xyXG4gICAgc3RhdGljIFZJREVPQVJSID0gW1widmlkZW8vbXA0XCIsIFwidmlkZW8vb2dnXCIsIFwidmlkZW8vd2VibVwiXTtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGUnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgZmlsZTogRWxlbWVudFJlZjtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxyXG4gICAgX3R5cGU6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJyA9IFwiaW1hZ2VcIjtcclxuICAgIGhhbmRsZXI6IGFueTtcclxuICAgIHBhcmVudDogYW55O1xyXG4gICAgc2V0IHR5cGUodjogJ2ltYWdlJyB8ICdhdWRpbycgfCAndmlkZW8nKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHY7XHJcbiAgICAgICAgdGhpcy50eXBlTmFtZSA9IHtpbWFnZTogJ+WbvueJhycsIGF1ZGlvOiAn6Z+z6aKRJywgdmlkZW86ICfop4bpopEnfVt2XTtcclxuICAgIH1cclxuICAgIGdldCB0eXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+acrOWcsOS4iuS8oFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RGaWxlKCkge1xyXG4gICAgICAgIC8vIOmcgOimgeWFiOiuvue9ruWuveW6puWSjOmrmOW6plxyXG4gICAgICAgIGNvbnN0IG51bSA9IC9eWzEtOV1cXGR7MSwzfShweHxyZW18ZW18dnd8dmh8JSk/JC9pO1xyXG4gICAgICAgIGlmICghbnVtLnRlc3QodGhpcy53aWR0aCArIFwiXCIpIHx8ICFudW0udGVzdCh0aGlzLmhlaWdodCArIFwiXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IGDkuIrkvKAke3RoaXMudHlwZU5hbWV95YmN6K+35aGr5YaZ5ZCI6YCC55qE6auY5bqm5ZKM5a695bqmfmBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuZmlsZS5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGFyciA9IHtcclxuICAgICAgICAgICAgaW1hZ2U6IFVJQW5uZXhDb21wb25lbnQuSU1BR0VBUlIsXHJcbiAgICAgICAgICAgIGF1ZGlvOiBVSUFubmV4Q29tcG9uZW50LkFVRElPQVJSLFxyXG4gICAgICAgICAgICB2aWRlbzogVUlBbm5leENvbXBvbmVudC5WSURFT0FSUixcclxuICAgICAgICB9W3RoaXMudHlwZV07XHJcbiAgICAgICAgZmlsZS5hY2NlcHQgPSBhcnIuam9pbihcIixcIik7XHJcbiAgICAgICAgZmlsZS5jbGljaygpO1xyXG4gICAgICAgIGZpbGUub25jaGFuZ2UgPSB0aGlzLmZpbGVDaGFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmlofku7ZcclxuICAgICAqL1xyXG4gICAgZmlsZUNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuZmlsZS5uYXRpdmVFbGVtZW50LmZpbGVzO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcclxuICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLnJlYnVpbGQgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5yZWJ1aWxkID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgLy8g57yW6L6R5Zmo5a6e5L6LXHJcbiAgICAgICAgY29uc3QgaGFuZGxlcjogQXBwWmVkaXRvckNvbXBvbmVudCA9IHRoaXMuaGFuZGxlcjtcclxuICAgICAgICAvLyDojrflj5bnvJbovpHlmahiYW5uZXLphY3nva7lj4LmlbBcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBoYW5kbGVyLm9wdGlvbnMkW3RoaXMudHlwZV0gfHwge307XHJcbiAgICAgICAgLy8g5qCH562+XHJcbiAgICAgICAgY29uc3QgdGFnID0geyBpbWFnZTogJ0lNRycsIGF1ZGlvOiAnQVVESU8nLCB2aWRlbzogJ1ZJREVPJyB9W3RoaXMudHlwZV07XHJcbiAgICAgICAgLy8g5Yik5pat5paH5Lu25piv5ZCm6LaF6L+H5pWw6YePXHJcbiAgICAgICAgaWYgKGhhbmRsZXIucGFubmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykubGVuZ3RoID49IChvcHRpb24uY291bnQgfHwgMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogYCR7dGhpcy50eXBlTmFtZX3lt7LotoXlh7rmnIDlpKfmlbDph49gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWIpOaWreaWh+S7tuaYr+WQpumcgOi9rOaIkGJhc2U2NFxyXG4gICAgICAgIGNvbnN0IGJhc2U2NHNpemUgPSBvcHRpb24uYmFzZTY0IHx8IDA7XHJcbiAgICAgICAgaWYgKGJhc2U2NHNpemUgJiYgZmlsZS5zaXplIDw9IGJhc2U2NHNpemUpIHtcclxuICAgICAgICAgICAgLy8g6L2s5oiQYmFzZTY0XHJcbiAgICAgICAgICAgIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgZnIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgICAgICAgZnIub25sb2FkID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLnJlY2lldmVMb2NhbEZpbGVIVE1MKHRoaXMuZ2V0RmlsZUhUTUwoZXZlbnQudGFyZ2V0LnJlc3VsdCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuqTnu5nlpJbpg6jov5vooYzlpITnkIZcclxuICAgICAgICAgICAgY29uc3QgdGlwOiBUaXBDb21wb25lbnQgPSB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIuS4iuS8oOS4rX5cIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgICAgICBoYW5kbGVyLmVtaXRVcGxvYWRGaWxlICYmIGhhbmRsZXIuZW1pdFVwbG9hZEZpbGUodGhpcy50eXBlLCBmaWxlLCB0aGlzLmdldEZpbGVIVE1MLCAoaXNTdWNjZXNzOiBib29sZWFuLCB0PzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7IC8vIOS4iuS8oOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0KSB7IC8vIOS4iuS8oOWksei0pVxyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLm9wZW4oeyB0ZXh0OiAn5LiK5Lyg5aSx6LSlficgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5LiK5Lyg6LaF5pe2XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAub3Blbih7IHRleHQ6ICfkuIrkvKDotoXml7Z+JyB9KTtcclxuICAgICAgICAgICAgICAgIH0sIHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeWklumTvlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRPdXRMaW5rKCkge1xyXG4gICAgICAgIGNvbnN0IGhhc3BlcmMgPSAvXlsxLTldXFxkezEsM30ocHh8cmVtfGVtfHZ3fHZofCUpPyQvaTtcclxuICAgICAgICBpZiAoIWhhc3BlcmMudGVzdCh0aGlzLndpZHRoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbVNlcnZpY2UudG9zdCh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIuivt+Whq+WGmeWQiOmAgueahOWuveW6pn5cIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWhhc3BlcmMudGVzdCh0aGlzLmhlaWdodCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb21TZXJ2aWNlLnRvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+ivt+Whq+WGmeWQiOmAgueahOmrmOW6pn4nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghL14oXFwvXFwvfGh0dHBzPzopXFwvXFwvLisvLnRlc3QodGhpcy51cmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tU2VydmljZS50b3N0KHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwi6ZO+5o6l5Zyw5Z2A5LiN6KeE6IyDXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuZ2V0RmlsZUhUTUwodGhpcy51cmwpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIucmVjaWV2ZUZpbGVMaW5rSFRNTChodG1sKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyg5YWlc3Jj5bm25qC55o2u57G75Z6L6I635Y+W5paH5Lu2aHRtbFxyXG4gICAgICogQHBhcmFtICBzcmNcclxuICAgICAqL1xyXG4gICAgZ2V0RmlsZUhUTUwgPSAoc3JjOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbWFnZVwiOlxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IHRoaXMuZ2V0SW1hZ2VIVE1MKHNyYyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImF1ZGlvXCI6XHJcbiAgICAgICAgICAgICAgICBodG1sID0gdGhpcy5nZXRBdWRpb0hUTUwoc3JjKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW9cIjpcclxuICAgICAgICAgICAgICAgIGh0bWwgPSB0aGlzLmdldFZpZGVvSFRNTChzcmMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o+S5YWl5Zu+54mH55qESFRNTFxyXG4gICAgICogQHBhcmFtIHNyYyB1cmzmiJZiYXNlNjRcclxuICAgICAqL1xyXG4gICAgZ2V0SW1hZ2VIVE1MKHNyYzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgJzxwIHN0eWxlPVwiaGVpZ2h0OicgK1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCArXHJcbiAgICAgICAgICAgICc7XCI+JyArXHJcbiAgICAgICAgICAgICc8aW1nIHNyYz1cIicgK1xyXG4gICAgICAgICAgICBzcmMgK1xyXG4gICAgICAgICAgICAnXCIgc3R5bGU9XCJoZWlnaHQ6JyArXHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ICtcclxuICAgICAgICAgICAgJzt3aWR0aDonICtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCArXHJcbiAgICAgICAgICAgICc7b2JqZWN0LWZpdDpjb3ZlcjtcIiAvPicgK1xyXG4gICAgICAgICAgICBcIjwvcD48YnIvPlwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o+S5YWl6Z+z6aKR55qESFRNTFxyXG4gICAgICogQHBhcmFtIHNyYyB1cmxcclxuICAgICAqL1xyXG4gICAgZ2V0QXVkaW9IVE1MKHNyYzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gVUlBbm5leENvbXBvbmVudC5BVURJT0FSUjtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIGxldCBodG1sID0gJzxwIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OicgKyB0aGlzLmhlaWdodCArICc7XCI+PGF1ZGlvIGNvbnRyb2xzIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OicgKyAnMTAwJScgKyAnO3dpZHRoOicgKyB0aGlzLndpZHRoICsgJztcIj4nO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPHNvdXJjZSBzcmM9XCInICsgc3JjICsgJ1wiIHR5cGU9XCInICsgYXJyW2ldICsgJ1wiPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGh0bWwgKz0gJ+aCqOeahOa1j+iniOWZqOS4jeaUr+aMgUF1ZGlv5qCH562+44CCJztcclxuICAgICAgICBodG1sICs9ICc8L2F1ZGlvPiYjODIwNTsmendqOzwvcD48YnIvPic7XHJcbiAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmj5LlhaXop4bpopHnmoRIVE1MXHJcbiAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgKi9cclxuICAgIGdldFZpZGVvSFRNTChzcmM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFVJQW5uZXhDb21wb25lbnQuVklERU9BUlI7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBsZXQgaHRtbCA9ICc8cCBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAnO1wiPjx2aWRlbyBjb250cm9scyBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDonICsgJzEwMCUnICsgJzt3aWR0aDonICsgdGhpcy53aWR0aCArICc7XCI+JztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxzb3VyY2Ugc3JjPVwiJyArIHNyYyArICdcIiB0eXBlPVwiJyArIGFycltpXSArICdcIj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9ICfmgqjnmoTmtY/op4jlmajkuI3mlK/mjIFWaWRlb+agh+etvuOAgic7XHJcbiAgICAgICAgaHRtbCArPSAnPC92aWRlbz4mIzgyMDU7Jnp3ajs8L3A+PGJyLz4nO1xyXG4gICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=