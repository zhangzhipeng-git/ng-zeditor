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
import { Radio } from '../_form/radio-group/radio-group';
import { DomService } from '../service/DomService';
import { TipComponent } from '../_alert/tip/tip';
import { AppZeditorComponent } from '../ng-zeditor.component';

@Component({
    selector: 'app-annex',
    templateUrl: './ui-annex.component.html'
})
export class UIAnnexComponent {
    /** 图片类型 */
    static IMAGEARR = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
    static AUDIOARR = ['audio/mp3', 'audio/ogg', 'audio/wav'];
    static VIDEOARR = ['video/mp4', 'video/ogg', 'video/webm'];
    url = 'https://';
    width = '100%';
    height = 'auto';
    /** 获取类型对应的名称 */
    typeName = '图片';
    /** 重渲染input file */
    rebuild = true;
    radioGroup: Radio[] = [{ value: 'image', text: '图片' }, { value: 'audio', text: '音频' }, { value: 'video', text: '视频' }];
    @ViewChild('file', { static: false, read: ElementRef }) file: ElementRef;
    // tslint:disable-next-line: variable-name
    _type: 'image' | 'audio' | 'video' = 'image';
    handler: any;
    parent: any;
    set type(v: 'image' | 'audio' | 'video') {
        this._type = v;
        this.typeName = { image: '图片', audio: '音频', video: '视频' }[v];
    }
    get type() {
        return this._type;
    }

    constructor(
        private domService: DomService
    ) { }

    /**
     * 点击本地上传
     */
    selectFile() {
        // 需要先设置宽度和高度
        const num = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?|auto|inherit|unset$/i;
        if (!num.test(this.width + '') || !num.test(this.height + '')) {
            this.domService.tost({
                text: `上传${this.typeName}前请填写合适的高度和宽度~`
            });
            return;
        }
        const file = this.file.nativeElement;
        const arr = {
            image: UIAnnexComponent.IMAGEARR,
            audio: UIAnnexComponent.AUDIOARR,
            video: UIAnnexComponent.VIDEOARR,
        }[this.type];
        file.accept = arr.join(',');
        if ('onchange' in file) {
            file.onchange = this.fileChange;
        } else {
            file.onpropertychange = this.fileChange;
        }
        file.click();
    }

    /**
     * 选择文件
     */
    fileChange = () => {
        const files = this.file.nativeElement.files;
        const file = files[0];
        if (!files.length) { return; }
        this.rebuild = false;
        setTimeout(() => { this.rebuild = true; });
        // 编辑器实例
        const handler: AppZeditorComponent = this.handler;
        // 获取编辑器banner配置参数
        const option = handler.options$[this.type] || {};
        // 标签
        const tag = { image: 'IMG', audio: 'AUDIO', video: 'VIDEO' }[this.type];
        // 判断文件是否超过数量
        if (handler.pannel.getElementsByTagName(tag).length >= (option.count || 1)) {
            this.domService.tost({
                text: `${this.typeName}已超出最大数量`
            });
            return;
        }
        // 判断文件是否需转成base64
        const base64size = option.base64 || 0;
        if (base64size && file.size <= base64size) {
            // 转成base64
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = (event: any) => {
                if (handler.recieveLocalFileHTML(this.getFileHTML(event.target.result))) {
                    this.parent.close();
                }
            };
        } else {
            // 交给外部进行处理
            const tip: TipComponent = this.domService.tost({
                text: '上传中~',
                duration: -1
            });
            // tslint:disable-next-line: no-unused-expression
            handler.emitUploadFile && handler.emitUploadFile(this.type, file, this.getFileHTML, (isSuccess: boolean, t?: number) => {
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
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    tip.close();
                    this.parent.close();
                    tip.open({ text: '上传超时~' });
                }, t);
            });
        }
    }
    /**
     * 插入外链
     */
    insertOutLink() {
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
        const html = this.getFileHTML(this.url);
        if (this.handler.recieveFileLinkHTML(html)) {
            this.parent.close();
            this.parent = null;
        }
    }

    /**
     * 传入src并根据类型获取文件html
     */
    getFileHTML = (src: string) => {
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
    }

    /**
     * 获取插入图片的HTML
     * @param src url或base64
     */
    getImageHTML(src: string) {
        return (
            '<p>' +
            '<img src="' +
            src +
            '" style="height:' +
            this.height +
            ';width:' +
            this.width +
            ';object-fit:cover;" />' +
            '</p><p><br/></p>'
        );
    }
    /**
     * 获取插入音频的HTML
     * @param src url
     */
    getAudioHTML(src: string) {
        const arr = UIAnnexComponent.AUDIOARR;
        // tslint:disable-next-line: max-line-length
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
     */
    getVideoHTML(src: string) {
        const arr = UIAnnexComponent.VIDEOARR;
        // tslint:disable-next-line: max-line-length
        let html = '<p><video controls style="display:inline-block;height:' + this.height + ';width:' + this.width + ';">';
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Video标签。';
        html += '</video>&#8205;&zwj;</p><p><br/></p>';
        return html;
    }

}
