/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 编辑器组件
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:37:23 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */
// tslint:disable-next-line: max-line-length
import { Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// 窗体弹窗
import { UILinkComponent } from './ui-link/ui-link'; // 超链接UI组件
// 超链接UI组件
import { UITableComponent } from './ui-table/ui-table'; // 表格UI组件
// 表格UI组件
import { UIAnnexComponent } from './ui-annex/ui-annex'; // 附件UI组件
// 附件UI组件
import { DomService } from './service/DomService'; // dom提供商
// dom提供商
import CommonUtil from './util/CommonUtil'; // dom工具类
// dom工具类
import CursorUtil from './util/CursorUtil'; // 光标工具类
/**
 * 编辑器配置参数
 * @record
 */
function Options() { }
if (false) {
    /**
     * 编辑内容的最大字节数
     * @type {?}
     */
    Options.prototype.maxsize;
    /**
     * 上传超时 ms
     * @type {?}
     */
    Options.prototype.timeout;
    /**
     * 上传图片的配置参数
     * @type {?}
     */
    Options.prototype.image;
    /**
     * 上传视频的配置参数
     * @type {?}
     */
    Options.prototype.video;
    /**
     * 上传音频的配置参数
     * @type {?}
     */
    Options.prototype.music;
}
export class AppZeditorComponent {
    /**
     * @param {?} render2
     * @param {?} domService
     */
    constructor(render2, domService) {
        this.render2 = render2;
        this.domService = domService;
        /**
         * 传入的html
         */
        this.vhtml = '<p>请输入内容~</p>';
        // tslint:disable-next-line: no-output-on-prefix
        this.onInput = new EventEmitter();
        /**
         * 是否有按钮
         */
        this.hasBtn = false;
        this.recieveContent = new EventEmitter();
        /**
         * 参数配置
         */
        this.options$ = { maxsize: 65535, timeout: 10000, image: { count: 5, base64: 60000 }, audio: { count: 1 }, video: { count: 1 } };
        /**
         * 主题
         */
        this.theme = 'g';
        /**
         * 上传文件
         */
        this.uploadFile = new EventEmitter();
        /**
         * 字体样式
         */
        // tslint:disable-next-line: max-line-length
        this.fontFamilys = [{ key: 'arial', value: 'arial' }, { key: '微软雅黑', value: 'Microsoft Yahei' }, { key: '宋体', value: 'SimSun' }, { key: '黑体', value: 'SimHei' }, { key: '楷体', value: 'KaiTi' }, { key: '宋体', value: 'SimSun' }, { key: '新宋体', value: 'NSimSun' }, { key: '仿宋', value: 'FangSong' }, { key: '微软正黑体', value: 'Microsoft JhengHei' }, { key: '华文琥珀', value: 'STHupo' }, { key: '华文彩云', value: 'STCaiyun' }, { key: '幼圆', value: 'YouYuan' }, { key: '华文行楷', value: 'STXingkai' }];
        /**
         * 文本格式
         */
        // tslint:disable-next-line: max-line-length
        this.formatBlocks = [{ key: 'p', value: '<p data-index="0">p</p>' }, { key: 'h6', value: '<h6 data-index="1">h6</h6>' }, { key: 'h5', value: '<h5 data-index="2">h5</h5>' }, { key: 'h4', value: '<h4 data-index="3">h4</h4>' }, { key: 'h3', value: '<h3 data-index="4">h3</h3>' }, { key: 'h2', value: '<h2 data-index="5">h2</h2>' }, { key: 'h1', value: '<h1 data-index="6">h1</h1>' }];
        /**
         * 颜色
         */
        // tslint:disable-next-line: max-line-length
        this.colors = [['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646'], ['#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada'], ['#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5'], ['#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#92cddc', '#fac08f'], ['#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#31859b', '#e36c09'], ['#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#205867', '#974806'], ['#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050', '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0']];
        /**
         * 字体大小
         */
        // tslint:disable-next-line: max-line-length
        this.fontSizes = [{ key: 'xx-small', value: '1', value$: 9 / 16 }, { key: 'x-small', value: '2', value$: 10 / 16 }, { key: 'small', value: '3', value$: '' /** 13/16调整为空字符串 */ }, { key: 'medium', value: '4', value$: 16 / 16 }, { key: 'large', value: '5', value$: 18 / 16 }, { key: 'x-large', value: '6', value$: 24 / 16 }, { key: 'xx-large', value: '7', value$: 32 / 16 }];
        /**
         * code
         */
        this.codes = ['Html', 'Css', 'Javascript', 'TypeScript', 'Sass', 'Java', 'Xml', 'Sql', 'Shell'];
        /**
         * 选中的字样
         */
        this.fontFamily = { key: '微软雅黑', value: 'Microsoft Yahei' };
        /**
         * 选中的字号
         */
        this.fontSize = { key: 'small', value: 3 }; // 默认1rem;
        // 默认1rem;
        /**
         * 文本格式
         */
        this.formatBlock = 'p';
        /**
         * 字体颜色
         */
        this.foreColor = 'black';
        /**
         * 高亮色
         */
        this.backColor = 'white';
        /**
         * 当前代码语言
         */
        this.code = 'Javascript';
        /**
         * 是否打开字样面板
         */
        this.switchFontFamilyPannel = false;
        /**
         * 是否打开字号面板
         */
        this.switchFontSizePannel = false;
        /**
         * 是否打开文本格式面板
         */
        this.switchFormatBlockPannel = false;
        /**
         * 是否打开字体颜色面板
         */
        this.switchForeColorPannel = false;
        /**
         * 是否打开背景色面板
         */
        this.switchBackColorPannel = false;
        /**
         * 是否打开代码语言面板
         */
        this.switchCodePannel = false;
        /**
         * 默认左对齐
         */
        this.justifyActive = 'justifyLeft';
        /**
         * 是否处于编辑状态中
         */
        this.isInEditStatus = false;
        /**
         * 是否全屏, 默认false
         */
        this.full = false;
        this.onChange = (/**
         * @return {?}
         */
        () => undefined);
        this.onTouched = (/**
         * @return {?}
         */
        () => undefined);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set options(v) {
        Object.assign(this.options$, v);
    }
    /**
     * 编辑条
     * @return {?}
     */
    get header() {
        return this.headerRef.nativeElement;
    }
    /**
     * 编辑器
     * @return {?}
     */
    get editor() {
        return this.editorRef.nativeElement;
    }
    /**
     * 编辑面板
     * @return {?}
     */
    get pannel() {
        return this.pannelRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get footer() {
        return this.footerRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get fontNameEl() {
        return this.fontNameRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get fontSizeEl() {
        return this.fontSizeRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get formatBlockEl() {
        return this.formatBlockRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get foreColorEl() {
        return this.foreColorRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get backColorEl() {
        return this.backColorRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get codeEl() {
        return this.codeRef.nativeElement;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined) {
            this.vhtml = obj;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initFormatData();
        this.parent = this.render2.parentNode(this.editor);
    }
    /**
     * 初始化默认格式
     * @return {?}
     */
    initFormatData() {
        Object.assign(this, AppZeditorComponent.FORMAT);
    }
    /**
     * 如果面板不聚焦则使面板聚焦
     * @return {?}
     */
    pannelFocus() {
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
    }
    /**
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     * @return {?}
     */
    recoverRange() {
        if (!this.pannel) {
            return;
        }
        // 确保编辑面板先是聚焦的
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
        if (this.range) { // 存在上次光标，则设置上次光标
            CursorUtil.setFirstRange(this.range);
            return;
        }
        CursorUtil.setSelectionToElement(this.pannel, false);
    }
    /**
     * 1.聚焦面板并获取上次光标位置,设置当前历史编辑样式
     * 2.点击编辑条的命令或者编辑面板后，将视为编辑状态
     * @param {?=} recover
     * @return {?}
     */
    startEdit(recover = true) {
        // 恢复上次光标（点击编辑面板不需要恢复上次光标，点击编辑条需要恢复上次光标）
        if (recover) {
            this.recoverRange();
        }
        this.initEdit();
    }
    /**
     * 阻止默认事件防止失焦，确保编辑面板聚焦，设置历史光标和格式
     * @param {?} e 事件对象
     * @return {?}
     */
    ensureFocus(e) {
        // 阻止失焦
        e.preventDefault();
        // 编辑初始化
        this.startEdit();
    }
    /**
     * 是否用行内style
     * @param {?=} f 是否启用style，默认使用
     * @return {?}
     */
    styleWithCSS(f = true) {
        this.cmd('styleWithCSS', false, f);
    }
    /**
     * 编辑初始化和设置历史格式
     * @return {?}
     */
    initEdit() {
        // 在编辑状态不再次进行初始化
        if (this.isInEditStatus) {
            return;
        }
        // 标记面板处于编辑状态
        if (!this.isInEditStatus) {
            this.isInEditStatus = true;
        }
        // 设置历史格式
        // 在代码区不设置历史格式
        if (this.isRangeInCode()) {
            return;
        }
        // 如果光标周围有内容则不设置历史格式
        /** @type {?} */
        const el = CursorUtil.getRangeCommonParent();
        if (el.nodeType === 3) {
            return;
        }
        this.cmd('formatBlock', false, this.formatBlock);
        // 如果编辑器内没有文本标签，文字对齐命令不能第一个执行
        // 否则会将光标设到下一个文本标签内
        this.cmd(this.justifyActive, false);
        // css中font-family默认是微软雅黑
        if (this.fontFamily.key !== '微软雅黑') {
            this.cmd('fontName', false, this.fontFamily.value);
        }
        this.cmd('foreColor', false, this.foreColor);
        this.cmd('backColor', false, this.backColor);
        // css中font-size默认是.75rem
        if (this.fontSize.value !== '') {
            this.cmd('fontSize', false, this.fontSize.value);
        }
        // 对设置字体大小做特殊处理
        this.adjustFontSizeWithStyle(this.fontSize);
    }
    /**
     * 设置字样
     * @param {?} e 事件
     * @return {?}
     */
    setFontName(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFontFamilyPannel = !this.switchFontFamilyPannel;
        if (index === null || index === undefined) {
            return;
        }
        this.fontFamily = this.fontFamilys[index * 1];
        this.cmd('fontName', false, this.fontFamily.value);
    }
    /**
     * 设置字号
     * @param {?} e
     * @return {?}
     */
    setFontSize(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFontSizePannel = !this.switchFontSizePannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const fontSize = this.fontSizes[index * 1];
        this.fontSize = fontSize;
        this.cmd('fontSize', false, fontSize.value);
        this.adjustFontSizeWithStyle((/** @type {?} */ (fontSize)));
    }
    /**
     * 调整字体大小
     * @param {?} fontSize 字体大小对象
     * @return {?}
     */
    adjustFontSizeWithStyle(fontSize) {
        // 默认字体不做处理
        if (fontSize.value$ === '') {
            return;
        }
        /** @type {?} */
        const el = (/** @type {?} */ (CursorUtil.getRangeCommonParent()));
        /** @type {?} */
        const fonts = CommonUtil.parent(el, 2).querySelectorAll(`font[size="${fontSize.value}"]`);
        /** @type {?} */
        const value = fontSize.value$;
        Array.prototype.forEach.call(fonts, (/**
         * @param {?} font
         * @return {?}
         */
        font => {
            this.render2.removeAttribute(font, 'size');
            font.style.fontSize = value === 'inherit' ? 'inherit' : fontSize.value$ + 'rem';
        }));
    }
    /**
     * 设置文本格式
     * @param {?} e 事件
     * @return {?}
     */
    setFormatBlock(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const index = t.getAttribute('data-index');
        this.switchFormatBlockPannel = !this.switchFormatBlockPannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const formatBlock = this.formatBlocks[index * 1];
        this.formatBlock = formatBlock.key;
        this.cmd('formatBlock', false, '<' + this.formatBlock + '>');
    }
    /**
     * 设置前景色
     * @param {?} e 事件
     * @return {?}
     */
    setForeColor(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const x = t.getAttribute('data-dim1');
        /** @type {?} */
        const y = t.getAttribute('data-dim2');
        this.switchForeColorPannel = !this.switchForeColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.foreColor = this.colors[x][y];
        this.cmd('foreColor', false, this.foreColor);
    }
    /**
     * 设置背景色(高亮色)
     * @param {?} e 事件
     * @return {?}
     */
    setBackColor(e) {
        this.ensureFocus(e);
        /** @type {?} */
        const t = e.target;
        /** @type {?} */
        const x = t.getAttribute('data-dim1');
        /** @type {?} */
        const y = t.getAttribute('data-dim2');
        this.switchBackColorPannel = !this.switchBackColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.backColor = this.colors[x][y];
        this.cmd('backColor', false, this.backColor);
    }
    /**
     * 设置代码语言
     * @param {?} e 事件
     * @return {?}
     */
    insertCode(e) {
        this.ensureFocus(e);
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入代码区~');
            return;
        }
        this.switchCodePannel = !this.switchCodePannel;
        /** @type {?} */
        const index = e.target.getAttribute('data-index');
        if (index === null) {
            return;
        }
        this.code = this.codes[index];
        /** @type {?} */
        const code = this.code.toLowerCase();
        /** @type {?} */
        const html = `<p><br/></p><pre style="white-space: pre" title="代码区"><code class="${code}"><p><br/></p></code></pre><p><br/></p>`;
        this.removeFormat();
        this.cmd('insertHTML', false, html);
        /** @type {?} */
        const pel = CursorUtil.getRangeCommonParent();
        /** @type {?} */
        const box = (/** @type {?} */ (CommonUtil.preSibling(pel)));
        // 插入html后，将光标移至代码区的p标签中
        CursorUtil.setRangeToElement(box.children[0].children[0], true);
        this.setRange(); // 手动设置一下
    }
    /**
     * 行内换行（shift+enter）
     * @param {?} e 事件
     * @return {?}
     */
    insertBrOnReturn(e) {
        this.ensureFocus(e);
        if (!this.isSupport('insertBrOnReturn')) {
            this.cmd('insertHTML', false, '<br><br>');
            return;
        }
        this.cmd('insertBrOnReturn', false);
    }
    /**
     * 设置粗体
     * @param {?} e
     * @return {?}
     */
    switchBold(e) {
        this.ensureFocus(e);
        this.cmd('bold', false, '');
    }
    /**
     * 设置斜体
     * @param {?} e
     * @return {?}
     */
    switchItalic(e) {
        this.ensureFocus(e);
        this.cmd('italic', false, '');
    }
    /**
     * 设置下划线
     * @param {?} e
     * @return {?}
     */
    switchUnderline(e) {
        this.ensureFocus(e);
        this.cmd('underline', false, '');
    }
    /**
     * 设置删除线
     * @param {?} e
     * @return {?}
     */
    switchStrikeThrough(e) {
        this.ensureFocus(e);
        this.cmd('strikeThrough', false, '');
    }
    /**
     * 设置/取消上标
     * @param {?} e
     * @return {?}
     */
    superscript(e) {
        this.ensureFocus(e);
        this.cmd('superscript', false, '');
    }
    /**
     * 设置/取消下标
     * @param {?} e
     * @return {?}
     */
    subscript(e) {
        this.ensureFocus(e);
        this.cmd('subscript', false, '');
    }
    /**
     * 设置文字对齐方向
     * @param {?} e 事件
     * @param {?} str
     * @return {?}
     */
    setJustifyactive(e, str) {
        this.ensureFocus(e);
        this.justifyActive = 'justify' + str;
        this.cmd(this.justifyActive, false);
    }
    /**
     * 缩进
     * @param {?} e
     * @return {?}
     */
    indent(e) {
        this.ensureFocus(e);
        this.cmd('indent', false, '');
    }
    /**
     * 减少缩进
     * @param {?} e
     * @return {?}
     */
    outdent(e) {
        this.ensureFocus(e);
        this.cmd('outdent', false, '');
    }
    /**
     * 插入有序列表
     * @param {?} e
     * @return {?}
     */
    insertOrderedList(e) {
        this.ensureFocus(e);
        this.cmd('insertOrderedList', false, '');
    }
    /**
     * 插入无序列表
     * @param {?} e
     * @return {?}
     */
    insertUnorderedList(e) {
        this.ensureFocus(e);
        this.cmd('insertUnorderedList', false, '');
    }
    /**
     * 插入表格调起插入表格UI
     * @param {?} e
     * @return {?}
     */
    insertTable(e) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入表格~');
            return;
        }
        this.alert({ title: '插入表格', animation: 'scale', content: UITableComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击表格UI弹窗确认时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveTableHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 插入超链接调起插入超链接UI
     * @param {?} e 事件
     * @return {?}
     */
    insertLink(e) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入链接~');
            return;
        }
        this.alert({ title: '插入链接', animation: 'scale', content: UILinkComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击超链接UI弹窗确认时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveLinkHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        /** @type {?} */
        let el = CursorUtil.getRangeCommonParent();
        el = this.render2.parentNode(el);
        if (el.style) {
            this.render2.removeAttribute(el, 'style');
        }
        return true;
    }
    /**
     * 插入图片调起插入图片UI
     * @param {?} e 事件
     * @return {?}
     */
    insertFile(e) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入文件~');
            return;
        }
        this.alert({ title: '插入文件', animation: 'scale', content: UIAnnexComponent, handler: this, theme: this.theme });
    }
    /**
     * 点击上传文件UI弹窗上传本地文件时嵌入base64时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveLocalFileHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 点击上传文件UI弹窗“插入外链”时回调
     * @param {?} html 插入的html
     * @return {?}
     */
    recieveFileLinkHTML(html) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 发射选择文件事件
     * @param {?} type 文件类型
     * @param {?} file 文件
     * @param {?} parser 传入src获取html
     * @param {?} close  关闭弹窗和遮罩
     * @return {?}
     */
    emitUploadFile(type, file, parser, close) {
        this.uploadFile.emit({
            type, file, callback: (/**
             * @param {?} src
             * @param {?=} t
             * @return {?}
             */
            (src, t) => {
                if (!!src) {
                    this.recieveFileLinkHTML(parser((/** @type {?} */ (src))));
                }
                close(!!src, t);
            })
        });
    }
    /**
     * 插入hr
     * @param {?} e
     * @return {?}
     */
    insertHorizontalRule(e) {
        this.ensureFocus(e);
        this.cmd('insertHorizontalRule', false, '');
    }
    /**
     * 粘贴
     * @param {?} e
     * @return {?}
     */
    paste(e) {
        this.ensureFocus(e);
        this.cmd('paste', false, '');
    }
    /**
     * 剪切
     * @param {?} e
     * @return {?}
     */
    cut(e) {
        this.ensureFocus(e);
        this.cmd('cut', false, '');
    }
    /**
     * 复制
     * @param {?} e
     * @return {?}
     */
    copy(e) {
        this.ensureFocus(e);
        this.cmd('copy', false, '');
    }
    /**
     * 选中所有
     * @param {?} e
     * @return {?}
     */
    selectAll(e) {
        this.ensureFocus(e);
        this.cmd('selectAll', false, '');
    }
    /**
     * 重做
     * @param {?} e
     * @return {?}
     */
    redo(e) {
        this.ensureFocus(e);
        this.cmd('redo', false, '');
    }
    /**
     * 撤销
     * @param {?} e
     * @return {?}
     */
    undo(e) {
        this.ensureFocus(e);
        this.cmd('undo', false, '');
    }
    /**
     * 删除选中
     * @param {?} e
     * @return {?}
     */
    deleteSelect(e) {
        this.ensureFocus(e);
        this.cmd('delete', false, '');
    }
    /**
     * 获取历史输入
     * @return {?}
     */
    history() {
        this.vhtml = window.localStorage.getItem('editor_input') || '';
    }
    /**
     * 清除格式，不阻止失焦，重新聚焦时会设置历史格式
     * @return {?}
     */
    removeFormat() {
        this.cmd('removeFormat', false);
        this.initFormatData();
    }
    /**
     * 隐藏各类下拉框
     * @param {?} e 事件
     * @return {?}
     */
    hideSwitchPannel(e) {
        /** @type {?} */
        const target = e.target || e.srcElement;
        if (this.switchFontFamilyPannel && !CommonUtil.contains(this.fontNameEl, target)) {
            this.switchFontFamilyPannel = false;
            return;
        }
        if (this.switchFontSizePannel && !CommonUtil.contains(this.fontSizeEl, target)) {
            this.switchFontSizePannel = false;
            return;
        }
        if (this.switchForeColorPannel && !CommonUtil.contains(this.foreColorEl, target)) {
            this.switchForeColorPannel = false;
            return;
        }
        if (this.switchBackColorPannel && !CommonUtil.contains(this.backColorEl, target)) {
            this.switchBackColorPannel = false;
            return;
        }
        if (this.switchFormatBlockPannel && !CommonUtil.contains(this.formatBlockEl, target)) {
            this.switchFormatBlockPannel = false;
            return;
        }
        if (this.switchCodePannel && !CommonUtil.contains(this.codeEl, target)) {
            this.switchCodePannel = false;
            return;
        }
    }
    /**
     * 全屏或取消全屏
     * @return {?}
     */
    SwitchScreen() {
        /** @type {?} */
        const editor = this.editor;
        /** @type {?} */
        const header = this.header;
        /** @type {?} */
        const pannel = this.pannel;
        /** @type {?} */
        const footer = this.footer;
        this.full = !this.full;
        if (this.full) { // 全屏
            editor.style.cssText = 'position:fixed;z-index:99999;top:0;left:0;transform:none;width:100%;height:100%;';
            pannel.style.cssText = `max-height:unset;height:${window.innerHeight - header.offsetHeight - footer.offsetHeight}px;`;
            document.body.appendChild(editor);
        }
        else { // 还原
            editor.style.cssText = '';
            pannel.style.cssText = '';
            this.parent.appendChild(editor);
        }
    }
    /**
     * 查询是否支持命令
     * @param {?} cmd 命令
     * @return {?}
     */
    isSupport(cmd) {
        return document.queryCommandSupported(cmd);
    }
    /**
     * 执行封装的编辑命令
     * @param {?} k 命令名称
     * @param {?} ui 打开ui弹窗
     * @param {?=} v 设置命令值
     * @return {?} true-设置成功，false-设置失败
     */
    cmd(k, ui, v) {
        if (!this.isSupport(k)) {
            this.toast('系统不支持该命令~');
            return false;
        }
        /** @type {?} */
        const whiteList = 'insertHTML,paste,cut,copy,removeFormat,delete,selectAll,redo,undo,insertBrOnReturn';
        if (whiteList.indexOf(k) < 0 && this.isRangeInCode()) {
            this.toast('代码区内无法执行该命令~');
            return false;
        }
        /** @type {?} */
        const r = document.execCommand(k, ui, v || '');
        return r;
    }
    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     * @return {?}
     */
    setRange() {
        this.range = CursorUtil.getRange(0, this.pannel);
    }
    /**
     * 监听按键事件 (处理tab缩进)
     * @param {?} e 按键事件
     * @return {?}
     */
    keydown(e) {
        /** @type {?} */
        const key = e.keyCode || e.which || e.charCode;
        if (key !== 9) {
            return;
        }
        // 按下tab键，增加缩进2个空格
        /** @type {?} */
        const tab = new Array(5).join('&nbsp;');
        this.cmd('insertHTML', false, tab);
        e.preventDefault();
        return;
    }
    /**
     * 点击面板
     * @return {?}
     */
    pannelOnClick() {
        this.initEdit();
        this.setRange();
    }
    /**
     * 在编辑面板中粘贴（若在代码区内粘贴则清除格式！！！）
     * @param {?} e
     * @return {?}
     */
    pannelOnPaste(e) {
        if (!this.isRangeInCode()) {
            return;
        }
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        const obj = (/** @type {?} */ (CommonUtil.isIE())) ? window : e;
        if (!obj.clipboardData) {
            return;
        }
        // 只复制文本，并将多个换行（文字换行和p标签在获取文本时会变成两个换行）转为单个换行
        /** @type {?} */
        const text = obj.clipboardData.getData('text')
            .replace(/(\r\n)+/gm, '\r\n');
        /** @type {?} */
        const df = document.createDocumentFragment();
        df.appendChild(document.createTextNode(text));
        CursorUtil.insertNode(df);
        e.preventDefault();
        e.returnValue = false;
        this.setRangeAndEmitValue(0);
    }
    /**
     * 输入时记住光变位置 && input事件发射value && 记住输入
     * @param {?} arg0
     * @return {?}
     */
    setRangeAndEmitValue(arg0) {
        if (typeof arg0 !== 'number') {
            arg0 = 300;
        }
        this.setRange();
        this.debounce((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const innerHTML = this.pannel.innerHTML;
            if (this.vhtml === innerHTML) {
                return;
            }
            // 有内容时才保存到本地
            /** @type {?} */
            const len = (this.pannel.innerText || this.pannel.textContent).length;
            if (len > 1) {
                window.localStorage.setItem('editor_input', innerHTML);
            }
            // 1.发射innerHTML,input事件接收
            this.onInput.emit(innerHTML);
            // 2.触发ngModelChange事件
            this.onChange(innerHTML);
        }), arg0);
    }
    /**
     * 发射编辑内容
     * @return {?}
     */
    emitContent() {
        /** @type {?} */
        let size = 0;
        /** @type {?} */
        const editPannel = (/** @type {?} */ (this.pannel));
        // 检测编辑内容大小
        /** @type {?} */
        let innerHTML = editPannel.innerHTML;
        for (let i = 0, len = innerHTML.length; i < len; i++) {
            /** @type {?} */
            const c = innerHTML.charCodeAt(i);
            if (c > 0 && c < 255) {
                size++;
            }
            else {
                size += 2;
            }
        }
        if (size > this.options$.maxsize) {
            this.toast('编辑内容超出大小~');
            innerHTML = innerHTML.substr(0, this.options$.maxsize);
        }
        /** @type {?} */
        const image = this.getUrlsByTag(this.pannel, 'img');
        /** @type {?} */
        const audio = this.getUrlsByTag(this.pannel, 'audio');
        /** @type {?} */
        const video = this.getUrlsByTag(this.pannel, 'video');
        /** @type {?} */
        const obj = {
            innerHTML,
            innerTEXT: editPannel.innerText || editPannel.textContent,
            urls: { image, audio, video }
        };
        this.recieveContent.emit(obj);
    }
    /**
     * 找目标元素的的某个标签的urls和base64的url
     * @param {?} target 元素
     * @param {?} tag 标签
     * @return {?}
     */
    getUrlsByTag(target, tag) {
        /** @type {?} */
        const arr = (/** @type {?} */ ([]));
        /** @type {?} */
        const tags = target.getElementsByTagName(tag.toUpperCase());
        Array.prototype.forEach.call(tags, (/**
         * @param {?} elem
         * @return {?}
         */
        elem => {
            /** @type {?} */
            const item = (/** @type {?} */ ({}));
            /** @type {?} */
            const src = elem.src;
            if (src.indexOf('data:image/png;base64,') === -1) {
                item.type = 'url';
            }
            else {
                item.type = 'base64';
            }
            item.src = src;
            arr.push(item);
        }));
        return arr;
    }
    /**
     * 判断范围Range是否和代码区有交集
     * @return {?} true - 有交集，false - 无交集
     */
    isRangeInCode() {
        this.pannelFocus();
        /** @type {?} */
        let parent = (/** @type {?} */ (CursorUtil.getRangeCommonParent()));
        if (!parent) {
            return false;
        }
        // 如果是文本节点则找其父元素
        if (parent.nodeType === 3) {
            parent = parent.parentNode;
        }
        return ((/**
         * @return {?}
         */
        () => {
            // 被包含
            /** @type {?} */
            let parent$ = parent;
            // tslint:disable-next-line: no-conditional-assignment
            while (parent$ = parent$.parentNode) {
                if (parent$.tagName === 'CODE') {
                    return true;
                }
                if (parent$ === this.pannel) {
                    return false;
                }
            }
            return false;
        }))() || ((/**
         * @return {?}
         */
        () => {
            // 包含
            /** @type {?} */
            const nodes = parent.querySelectorAll('code');
            return nodes && nodes.length;
        }))();
    }
    /**
     * toast提示
     * @param {?=} text
     * @param {?=} obj
     * @return {?}
     */
    toast(text = '设置无效~', obj) {
        return this.domService.tost(Object.assign({ text }, obj));
    }
    /**
     * 弹窗
     * @param {?} obj
     * @return {?}
     */
    alert(obj) {
        return this.domService.alert(obj);
    }
    /**
     * 防抖
     * @param {?} f 回调
     * @param {?=} t
     * @return {?}
     */
    debounce(f, t = 300) {
        /** @type {?} */
        const o = (/** @type {?} */ (this.debounce));
        clearTimeout(o.timer);
        o.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            f();
        }), t);
    }
}
/**
 * 默认格式
 */
AppZeditorComponent.FORMAT = {
    formatBlock: 'p',
    foreColor: 'black',
    backColor: 'white',
    justifyActive: 'justifyLeft',
    fontSize: { key: 'small', value: '3' },
    fontFamily: { key: '微软雅黑', value: 'Microsoft Yahei' }
};
AppZeditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-zeditor',
                template: "<div [ngClass]=\"theme\">\r\n  <div class=\"z-editor\" #editorRef (click)=\"hideSwitchPannel($event)\">\r\n    <!-- \u7F16\u8F91\u6761\u5F00\u59CB -->\r\n    <div class=\"wd-editor-bar fn-clearfix\" #headerRef>\r\n      <!-- \u4E8B\u4EF6\u6267\u884C\u5BCC\u6587\u672C\u547D\u4EE4[\u5931\u7126\u65F6\uFF0C\u547D\u4EE4\u6267\u884C\u65E0\u6548\uFF0C\u6240\u4EE5\u8981\u963B\u6B62\u5931\u7126\uFF0C\u6216\u8005\u5728\u4E8B\u4EF6\u6267\u884C\u524D\u805A\u7126] -->\r\n      <!-- \u5907\u6CE8!!!! -->\r\n      <!-- mousedown\u4E8B\u4EF6\u5728\u81EA\u8EAB\u805A\u7126\u4E4B\u524D[\u5373\u5176\u4ED6\u5143\u7D20\u5931\u7126\u805A\u7126\u4E4B\u524D]\u6267\u884C -->\r\n      <!-- \u4E0B\u9762\u4F7F\u7528mousedown\u4E8B\u4EF6\u662F\u56E0\u4E3A\u53EF\u4EE5\u4F7F\u7528e.preventDefault()\u963B\u6B62\u9ED8\u8BA4\u4E8B\u4EF6\uFF0C\u963B\u6B62\u7F16\u8F91\u9762\u677F\u5931\u7126 -->\r\n      <!-- \u800C\u9488\u5BF9\u5FC5\u5B9A\u8981\u5931\u7126\u7684\u60C5\u51B5\uFF0C\u5219\u91C7\u7528\u8BB0\u4F4F\u5149\u6807\uFF0C\u518D\u8BBE\u7F6E\u4E0A\u6B21\u8BB0\u4F4F\u7684\u5149\u6807\u7684\u65B9\u5F0F\u6765\u505A\u5230\u4F2A\u5931\u7126\u3002 -->\r\n      <!-- \u5B57\u4F53 -->\r\n      <div #fontNameRef class=\"wd-edit-link-box fontName\" (mousedown)=\"setFontName($event)\">\r\n        <a data-tip=\"\u5B57\u4F53\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span [ngStyle]=\"{'font-family': fontFamily.value}\">{{fontFamily.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontFamilyPannel\" class=\"wd-font-name-list\">\r\n          <li *ngFor=\"let ff of fontFamilys, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [ngStyle]=\"{'font-family': ff.value}\">{{ff.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u5B57\u53F7 -->\r\n      <div #fontSizeRef class=\"wd-edit-link-box fontSize\" (mousedown)=\"setFontSize($event)\">\r\n        <a data-tip=\"\u5B57\u53F7\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{fontSize.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontSizePannel\" class=\"wd-font-size-list\">\r\n          <li *ngFor=\"let fs of fontSizes, index as i\">\r\n            <!-- \u6CE8\u610F\u8FD9\u91CCstyle\u7684fontSize\u7ED1\u5B9A\u7684\u662Fx-small\uFF0Csmall\u8FD9\u79CD\u503C -->\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [ngStyle]=\"{'font-size': fs.key}\">{{fs.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u683C\u5F0F -->\r\n      <div #formatBlockRef class=\"wd-edit-link-box formatBlock\" (mousedown)=\"setFormatBlock($event)\">\r\n        <a data-tip=\"\u6587\u672C\u683C\u5F0F\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{formatBlock}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFormatBlockPannel\" class=\"wd-format-block-list\">\r\n          <li *ngFor=\"let fb of formatBlocks, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [innerHTML]=\"fb.value | safeHTML\"></a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u8272 -->\r\n      <div #foreColorRef class=\"wd-edit-link-box foreColor\" (mousedown)=\"setForeColor($event)\">\r\n        <a data-tip=\"\u5B57\u8272\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-font-color\" [ngStyle]=\"{'border-bottom-color': foreColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchForeColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u9AD8\u4EAE\u8272 -->\r\n      <div #backColorRef class=\"wd-edit-link-box backColor\" (mousedown)=\"setBackColor($event)\">\r\n        <a data-tip=\"\u9AD8\u4EAE\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-pencil\" [ngStyle]=\"{'border-bottom-color': backColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchBackColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u662F\u5426\u52A0\u7C97 -->\r\n      <div class=\"wd-edit-link-box bold\" (mousedown)=\"switchBold($event)\">\r\n        <a data-tip=\"\u52A0\u7C97\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u659C\u4F53 -->\r\n      <div class=\"wd-edit-link-box italic\" (mousedown)=\"switchItalic($event)\">\r\n        <a data-tip=\"\u659C\u4F53\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-italic\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u4E0B\u5212\u7EBF -->\r\n      <div class=\"wd-edit-link-box underline\" (mousedown)=\"switchUnderline($event)\">\r\n        <a data-tip=\"\u4E0B\u5212\u7EBF\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-underline\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664\u7EBF -->\r\n      <div class=\"wd-edit-link-box strikeThrough\" (mousedown)=\"switchStrikeThrough($event)\">\r\n        <a data-tip=\"\u5220\u9664\u7EBF\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-strikethrough\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0A\u6807 - \u4E0D\u53EF\u5173 -->\r\n      <div class=\"wd-edit-link-box superscript\" (mousedown)=\"superscript($event)\">\r\n        <a data-tip=\"\u4E0A\u6807\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-superscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0B\u6807 - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box subscript\" (mousedown)=\"subscript($event)\">\r\n        <a data-tip=\"\u4E0B\u6807\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-subscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u5DE6 - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box justifyLeft\" (mousedown)=\"setJustifyactive($event, 'Left')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyLeft'}\" data-tip=\"\u5C45\u5DE6\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-left\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u4E2D - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box justifyCenter\" (mousedown)=\"setJustifyactive($event, 'Center')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyCenter'}\" data-tip=\"\u5C45\u4E2D\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-center\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u53F3 - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box justifyRight\" (mousedown)=\"setJustifyactive($event, 'Right')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyRight'}\" data-tip=\"\u5C45\u53F3\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-right\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5DE6\u53F3\u5BF9\u9F50 - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box justifyFull\" (mousedown)=\"setJustifyactive($event, 'Full')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyFull'}\" data-tip=\"\u5DE6\u53F3\u5BF9\u9F50\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-justify\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u7F29\u8FDB - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box indent\" (mousedown)=\"indent($event)\">\r\n        <a data-tip=\"\u7F29\u8FDB\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-increase\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u589E\u8FDB  - \u4E0D\u53EF\u5173-->\r\n      <div class=\"wd-edit-link-box outdent\" (mousedown)=\"outdent($event)\">\r\n        <a data-tip=\"\u51CF\u5C11\u7F29\u8FDB\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-decrease\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6E05\u9664\u683C\u5F0F -->\r\n      <div class=\"wd-edit-link-box removeFormat\" (mousedown)=\"removeFormat()\">\r\n        <a data-tip=\"\u6E05\u9664\u683C\u5F0F\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clear-formatting\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6709\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertOrderedList\" (mousedown)=\"insertOrderedList($event)\">\r\n        <a data-tip=\"\u6709\u5E8F\u5217\u8868\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list-numbered\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u65E0\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertUnorderedList\" (mousedown)=\"insertUnorderedList($event)\">\r\n        <a data-tip=\"\u65E0\u5E8F\u5217\u8868\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list2\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u8868\u683C mdn\u65E0api\uFF0C\u7528insertHTML\u5B9E\u73B0 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"insertTable($event)\">\r\n        <a data-tip=\"\u8868\u683C\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-table\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u8D85\u94FE\u63A5\uFF0C\u5F39\u7A97 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"insertLink($event)\">\r\n        <a data-tip=\"\u94FE\u63A5\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-link\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6C34\u5E73\u7EBFhr -->\r\n      <div class=\"wd-edit-link-box insertHorizontalRule\" (mousedown)=\"insertHorizontalRule($event)\">\r\n        <a data-tip=\"\u6C34\u5E73\u7EBF\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-page-break\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6587\u4EF6 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"insertFile($event)\">\r\n        <a data-tip=\"\u6587\u4EF6\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-upload-cloud\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u4EE3\u7801 -->\r\n      <div #codeRef class=\"wd-edit-link-box insertHTML\" (mousedown)=\"insertCode($event)\">\r\n        <a data-tip=\"\u4EE3\u7801\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-embed\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchCodePannel\" class=\"wd-code-list\">\r\n          <li *ngFor=\"let code of codes, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\">{{code}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6362\u884C -->\r\n      <div class=\"wd-edit-link-box insertBrOnReturn\" (mousedown)=\"insertBrOnReturn($event)\">\r\n        <a data-tip=\"\u6362\u884C(shift+enter)\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-arrow-down\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u7C98\u8D34 -->\r\n      <div class=\"wd-edit-link-box paste\" (mousedown)=\"paste($event)\">\r\n        <a data-tip=\"\u7C98\u8D34\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clipboard\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u590D\u5236 -->\r\n      <div class=\"wd-edit-link-box copy\" (mousedown)=\"copy($event)\">\r\n        <a data-tip=\"\u590D\u5236\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-copy\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u526A\u5207 -->\r\n      <div class=\"wd-edit-link-box cut\" (mousedown)=\"cut($event)\">\r\n        <a data-tip=\"\u526A\u5207\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-scissors-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u9009\u62E9\u5168\u90E8 -->\r\n      <div class=\"wd-edit-link-box selectAll\" (mousedown)=\"selectAll($event)\">\r\n        <a data-tip=\"\u9009\u62E9\u5168\u90E8\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-select_all\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u64A4\u9500 -->\r\n      <div class=\"wd-edit-link-box undo\" (mousedown)=\"undo($event)\">\r\n        <a data-tip=\"\u64A4\u9500\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-undo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u91CD\u505A -->\r\n      <div class=\"wd-edit-link-box redo\" (mousedown)=\"redo($event)\">\r\n        <a data-tip=\"\u91CD\u505A\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-redo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664 -->\r\n      <div class=\"wd-edit-link-box delete\" (mousedown)=\"deleteSelect($event)\">\r\n        <a data-tip=\"\u5220\u9664\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-eraser\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box history\" (mousedown)=\"history()\">\r\n        <a data-tip=\"\u5386\u53F2\u8F93\u5165\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-database\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box full\" (mousedown)=\"SwitchScreen()\">\r\n        <a data-tip=\"\u5168\u5C4F/\u53D6\u6D88\u5168\u5C4F\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon\" [ngClass]=\"full?'icon-minimize':'icon-maximize'\"></i>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <!-- \u7F16\u8F91\u6761\u7ED3\u675F -->\r\n    <!-- \u7F16\u8F91\u4F53\u5F00\u59CB -->\r\n    <!-- input,selectionchange,click\u4E8B\u4EF6\u8BB0\u5F55\u4E0A\u6B21\u7F16\u8F91\u7684\u5149\u6807 -->\r\n    <!-- mousedown\u4E8B\u4EF6\u5728\u9F20\u6807\u6309\u4E0B\uFF0C\u5224\u65AD\u662F\u5426\u8981\u8BBE\u7F6E\u805A\u7126\u5E76\u8BBE\u7F6E\u4E0A\u6B21\u5149\u6807\u548C\u91CD\u8BBE\u7F16\u8F91\u6837\u5F0F -->\r\n\r\n    <div #pannelRef (keyup)=\"setRange()\" (click)=\"pannelOnClick()\" (keydown)=\"keydown($event)\"\r\n      (blur)=\"isInEditStatus=false\" (paste)=\"pannelOnPaste($event)\" (beforepaste)=\"pannelOnPaste($event)\"\r\n      (input)=\"setRangeAndEmitValue($event)\" class=\"wd-deitor-content\" contenteditable=\"true\" [innerHTML]=\"vhtml|safeHTML\">\r\n    </div>\r\n    <!-- \u7F16\u8F91\u4F53\u7ED3\u675F -->\r\n    <div class=\"wd-edit-footer fn-clearfix\" #footerRef>\r\n      <div class=\"wd-edit-footer-btn\" *ngIf=\"hasBtn\">\r\n        <button (click)=\"emitContent\">\u4FDD\u5B58</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AppZeditorComponent)),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None,
                styles: ["@charset \"UTF-8\";a,a:after,a:before,audio,div,div:after,div:before,h1,h2,h3,h4,h5,h6,i,i:after,i:before,img,li,li:after,li:before,ol,p,pre,span,span:after,span:before,table,ul,video{-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}em,i{font-style:italic}table{border-collapse:collapse;border-spacing:0}img{border:none;height:auto;vertical-align:middle;width:100%}a:active,a:hover,a:link,a:visited{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:#000;cursor:pointer;text-decoration:none;user-select:none}hr{background-color:#e1e1e1;border:0;color:#000;height:1PX;margin:0;*margin:0}li,ul{list-style-type:none}button,input[type=button],input[type=reset],input[type=submit]{-moz-appearance:button;-ms-appearance:button;-o-appearance:button;-webkit-appearance:button;appearance:button;border:none}button,button:focus,input,input:focus{background-color:#fff;outline:none;outline-style:none}input{border:1px solid #e6e6e6}::-ms-clear,::-ms-reveal{display:none}input:-ms-clear,input:-ms-reveal{display:none}[tappable]{-ms-touch-action:manipulation;cursor:pointer;touch-action:manipulation}.z-editor-icomoon,[class*=\" icon-\"],[class^=icon-]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:z-editor-icomoon!important;font-size:.75rem;font-style:normal;font-variant:normal;font-weight:400;line-height:.75rem;line-height:1;speak:never;text-transform:none}@font-face{font-display:block;font-family:z-editor-icomoon;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64,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\") format(\"woff\")}.icon-square-m:before{content:\"\uE911\"}.icon-link:before{content:\"\uF0C1\"}.icon-caret-down:before{content:\"\uF0D7\"}.icon-unlink:before{content:\"\uF127\"}.icon-select_all:before{content:\"\uE904\"}.icon-copy:before{content:\"\uE93A\"}.icon-undo:before{content:\"\uE967\"}.icon-redo:before{content:\"\uE968\"}.icon-clipboard:before{content:\"\uE9E2\"}.icon-list-numbered:before{content:\"\uE9F3\"}.icon-list2:before{content:\"\uE9FC\"}.icon-scissors-bold:before{content:\"\uEA5A\"}.icon-bold:before{content:\"\uEA62\"}.icon-underline:before{content:\"\uEA63\"}.icon-italic:before{content:\"\uEA64\"}.icon-strikethrough:before{content:\"\uEA65\"}.icon-page-break:before{content:\"\uEA68\"}.icon-clear-formatting:before{content:\"\uEA6F\"}.icon-table:before{content:\"\uEA71\"}.icon-paragraph-left:before{content:\"\uEA77\"}.icon-paragraph-center:before{content:\"\uEA78\"}.icon-paragraph-right:before{content:\"\uEA79\"}.icon-paragraph-justify:before{content:\"\uEA7A\"}.icon-indent-increase:before{content:\"\uEA7B\"}.icon-indent-decrease:before{content:\"\uEA7C\"}.icon-embed:before{content:\"\uEA80\"}.icon-arrow-down:before{content:\"\uE90A\"}.icon-database:before{content:\"\uE94C\"}.icon-loader:before{content:\"\uE981\"}.icon-maximize:before{content:\"\uE989\"}.icon-minimize:before{content:\"\uE990\"}.icon-upload-cloud:before{content:\"\uE9E4\"}.icon-x-square:before{content:\"\uE9F9\"}.icon-smile-o:before{content:\"\uF118\"}.icon-font-color:before{content:\"\uF031\"}.icon-pencil:before{content:\"\uF040\"}.icon-check-circle-thin:before{content:\"\uF058\"}.icon-square-o:before{content:\"\uF096\"}.icon-superscript:before{content:\"\uF12B\"}.icon-subscript:before{content:\"\uF12C\"}.icon-eraser:before{content:\"\uF12D\"}.icon-check-square:before{content:\"\uF14A\"}.icon-circle-thin:before{content:\"\uF1DB\"}.z-editor-alert .wd-content,.z-editor-alert .wd-mask{height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999}.z-editor-alert .wd-content{overflow:auto}#z-editor-tip .wd-tip,#z-editor-tip .wd-tip-for-scale{background-color:#333;border-radius:.3rem;color:#fff;filter:alpha(opacity=70);font-size:.75rem;left:50%;line-height:1;max-width:12rem;opacity:.7;padding:.7rem .8rem;position:fixed;text-align:center;z-index:9999999}#z-editor-tip .wd-tip{transform:translateX(-50%)}#z-editor-tip .trans1-enter{top:100%}#z-editor-tip .trans1-active{top:40%}#z-editor-tip .trans1-leave{top:100%}#z-editor-tip .trans2-enter{top:-100%}#z-editor-tip .trans2-active{top:40%}#z-editor-tip .trans2-leave{top:-100%}#z-editor-tip .scale-enter{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .scale-active{filter:alpha(opacity=70);opacity:.7;top:50%;transform:translate(-50%,-50%) scale(1)}#z-editor-tip .scale-leave{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .icon-loader{-webkit-animation:myloading 1s infinite forwards;animation:myloading 1s infinite forwards;display:inline-block}@-webkit-keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}#z-editor-window .wd-mask{background-color:#3a3434;filter:alpha(opacity=20);opacity:.2}#z-editor-window .wd-window{background-color:#fff;border-radius:.3rem;position:absolute;z-index:99999}#z-editor-window .wd-window-tool{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:#f4f4f4;border-radius:.3rem .3rem 0 0;cursor:pointer;line-height:2rem;user-select:none}#z-editor-window .wd-window-tool h3{float:left;font-size:1rem;padding-left:.7rem}#z-editor-window .wd-window-tool p{float:right;padding-right:.7rem}#z-editor-window .wd-window-tool .z-editor-icomoon{cursor:pointer;font-size:1rem;line-height:2rem}#z-editor-window .wd-window-tool:after{clear:both;content:\"\";display:block}#z-editor-window .wd-window-pannel{overflow:auto;padding:.7rem}#z-editor-window .trans1-enter{top:100%}#z-editor-window .trans1-active{top:20%}#z-editor-window .trans1-leave{top:100%}#z-editor-window .trans2-enter{top:-100%}#z-editor-window .trans2-active{top:20%}#z-editor-window .trans2-leave{top:-100%}#z-editor-window .scale-enter{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}#z-editor-window .scale-active{filter:alpha(opacity=100);opacity:1;top:20%;transform:scale(1)}#z-editor-window .scale-leave{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}.z-editor-checkbox{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;width:1rem}.z-editor-checkbox input{display:none}.z-editor-checkbox .z-editor-icomoon{cursor:pointer;font-size:1rem;vertical-align:middle}.z-editor-checkbox .wd-checkbox-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-checkbox .icon-check-square{color:#fa6464}.p .z-editor-checkbox .icon-check-square{color:#00c}.b .z-editor-checkbox .icon-check-square{color:#3b86cc}.g .z-editor-checkbox .icon-check-square{color:#19a519}.z-editor-radios{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.z-editor-radios .input-radio{display:none}.z-editor-radios .z-editor-icomoon{cursor:pointer;font-size:1rem}.z-editor-radios .z-editor-icomoon,.z-editor-radios span{line-height:1;vertical-align:middle}.z-editor-radios .wd-radio-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-radios .icon-check-circle-thin{color:#fa6464}.p .z-editor-radios .icon-check-circle-thin{color:#00c}.b .z-editor-radios .icon-check-circle-thin{color:#3b86cc}.g .z-editor-radios .icon-check-circle-thin{color:#19a519}.z-editor-link{color:grey;padding:0 1rem}.z-editor-link li{line-height:2.5rem}.z-editor-link li label{font-size:.875rem}.z-editor-link li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:20rem}.z-editor-link .wd-btn-group{text-align:right}.z-editor-link .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-link button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-link button:last-child{background-color:#fa6464}.p .z-editor-link button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-link button:last-child{background-color:#00c}.b .z-editor-link button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-link button:last-child{background-color:#3b86cc}.g .z-editor-link button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-link button:last-child{background-color:#19a519}.z-editor-table{color:grey;padding:0 1rem}.z-editor-table li{line-height:2rem}.z-editor-table li label{font-size:.875rem}.z-editor-table li input{border-radius:.2rem;height:1.5rem;margin-left:1rem;padding:0 .5rem;width:4rem}.z-editor-table .wd-btn-group{margin-top:.5rem;text-align:center}.z-editor-table .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-table button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-table button:last-child{background-color:#fa6464}.p .z-editor-table button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-table button:last-child{background-color:#00c}.b .z-editor-table button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-table button:last-child{background-color:#3b86cc}.g .z-editor-table button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-table button:last-child{background-color:#19a519}.z-editor-annex{color:grey;padding:0 1rem}.z-editor-annex .wd-edit-file{display:none}.z-editor-annex li{line-height:2.5rem}.z-editor-annex li>label{display:inline-block;font-size:.875rem}.z-editor-annex li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:17rem}.z-editor-annex .wd-radio-group-type{margin-left:1rem}.z-editor-annex .wd-radio-group-type label{margin-right:1.5rem}.z-editor-annex .wd-radio-group-type label::nth-child(3){margin-right:none}.z-editor-annex .wd-upload-local,.z-editor-annex .wd-use-link-confirm{border-radius:.3rem;color:#fff;cursor:pointer;font-weight:700;line-height:2.2rem;width:100%}.z-editor-annex .wd-upload-local{vertical-align:middle}.z-editor-annex .wd-upload-local .z-editor-icomoon{font-size:1rem;line-height:2.2rem}.z-editor-annex .wd-use-link-confirm{margin:.5rem 0}.r .z-editor-annex .wd-upload-local{background-color:#ef6ea8}.r .z-editor-annex .wd-use-link-confirm{background-color:#fa6464}.p .z-editor-annex .wd-upload-local{background-color:#5a06f5}.p .z-editor-annex .wd-use-link-confirm{background-color:#00c}.b .z-editor-annex .wd-upload-local{background-color:#00aeef}.b .z-editor-annex .wd-use-link-confirm{background-color:#3b86cc}.g .z-editor-annex .wd-upload-local{background-color:#0ebd0e}.g .z-editor-annex .wd-use-link-confirm{background-color:#19a519}.z-editor{background-color:#fff;text-align:left}.z-editor .fn-clearfix:after{clear:both;content:\"\";display:block;height:0;width:0}.z-editor .wd-editor-bar{border-bottom:1px solid #e6e6e6;border-top:1px solid #e6e6e6;font-size:.875rem;padding:.5rem 0 0}.z-editor .wd-edit-link-box{float:left;position:relative}.z-editor .wd-edit-link{border-radius:.2rem;cursor:pointer;display:inline-block;height:1.7rem;line-height:1.7rem;padding:0 .5rem;position:relative;text-align:center}.z-editor .wd-edit-link:hover{background-color:#e6e6e6}.z-editor .wd-edit-link:hover:before{border:.2rem solid transparent;border-bottom-color:#222;content:\"\";top:1.6rem}.z-editor .wd-edit-link:hover:after,.z-editor .wd-edit-link:hover:before{display:block;left:50%;opacity:.8;position:absolute;transform:translateX(-50%);z-index:1}.z-editor .wd-edit-link:hover:after{background-color:#222;border-radius:.3rem;color:#fff;content:attr(data-tip);font-size:.75rem;padding:0 .4rem;top:2rem;white-space:nowrap}.z-editor .wd-edit-link .z-editor-icomoon{font-size:.875rem}.z-editor .fontName .wd-edit-link{text-align:left;width:6.2rem}.z-editor .fontName .wd-edit-link .icon-caret-down{display:inline-block;line-height:1.7rem;position:absolute;right:.6rem}.z-editor .fontSize .wd-edit-link{width:6rem}.z-editor .formatBlock .wd-edit-link{width:3rem}.z-editor .wd-edit-link-active{background-color:#e6e6e6}.z-editor .backColor i,.z-editor .fontSize i,.z-editor .foreColor i,.z-editor .formatBlock i{margin-left:.5rem}.z-editor .wd-code-list,.z-editor .wd-font-name-list,.z-editor .wd-font-size-list,.z-editor .wd-format-block-list{background-color:#222;border-radius:.3rem;color:#fff;position:absolute;top:1.6rem;z-index:4}.z-editor .wd-code-list a,.z-editor .wd-font-name-list a,.z-editor .wd-font-size-list a,.z-editor .wd-format-block-list a{border-radius:.3rem;color:#fff;display:inline-block;padding:.2rem .5rem;width:100%}.z-editor .wd-code-list a:hover,.z-editor .wd-font-name-list a:hover,.z-editor .wd-font-size-list a:hover,.z-editor .wd-format-block-list a:hover{background-color:#444}.z-editor .wd-color-list{background-color:#fff;border:1px solid #f4f4f4;border-radius:.3rem;padding:.3rem;position:absolute;top:1.6rem;width:16.8rem;z-index:4}.z-editor .wd-color-list .wd-tr{height:1.6rem}.z-editor .wd-color-list .wd-td{float:left;height:1.2rem;margin:.2rem;position:relative;width:1.2rem}.z-editor .wd-color-list a{border-radius:.1rem;display:block;left:0;padding:.6rem;position:absolute;top:0}.z-editor .wd-color-list a:hover{left:-.1rem;padding:.7rem;top:-.1rem}.z-editor .wd-font-name-list{width:8rem}.z-editor .wd-font-size-list{width:10rem}.z-editor .wd-format-block-list{width:3rem}.z-editor .wd-code-list{width:6rem}.z-editor .backColor .icon-pencil,.z-editor .foreColor .icon-font-color{border-bottom:2px solid transparent;display:inline-block}.z-editor .wd-deitor-content{font-family:Microsoft Yahei;font-size:.75rem;max-height:15rem;min-height:8rem;outline:none;overflow:auto;padding:.6rem}.z-editor .wd-deitor-content font[size=\"3\"]{font-size:.75rem!important}.z-editor .wd-deitor-content div,.z-editor .wd-deitor-content p{word-break:break-all}.z-editor .wd-deitor-content ol,.z-editor .wd-deitor-content ul{list-style-position:inside}.z-editor .wd-deitor-content ul li{list-style-type:disc}.z-editor .wd-deitor-content ol li{list-style-type:decimal}.z-editor .wd-deitor-content a{text-decoration:underline}.z-editor .wd-deitor-content table{width:100%}.z-editor .wd-deitor-content td{border:1px solid grey;min-width:4rem;padding:.5rem;word-break:break-all;word-wrap:break-word}.z-editor .wd-deitor-content pre{border-radius:.3rem;overflow:auto;padding:.5rem .2rem;white-space:pre}.z-editor .wd-edit-footer{padding:.5rem}.z-editor .wd-edit-footer-btn{float:right}.z-editor .wd-edit-footer-btn button{border-radius:.3rem;color:#fff;line-height:1.5rem;padding:0 .5rem}.r .z-editor .wd-code-list a:hover,.r .z-editor .wd-font-name-list a:hover,.r .z-editor .wd-font-size-list a:hover,.r .z-editor .wd-format-block-list a:hover{color:#ef6ea8}.r .z-editor .wd-deitor-content a{color:#fa6464}.r .z-editor .wd-deitor-content pre{background-color:#f1e9e9;color:#ef6ea8}.r .z-editor .wd-edit-footer-btn button{background-color:#ef6ea8}.p .z-editor .wd-code-list a:hover,.p .z-editor .wd-font-name-list a:hover,.p .z-editor .wd-font-size-list a:hover,.p .z-editor .wd-format-block-list a:hover{color:#5a06f5}.p .z-editor .wd-deitor-content a{color:#00c}.p .z-editor .wd-deitor-content pre{background-color:#e6ebf3;color:#5a06f5}.p .z-editor .wd-edit-footer-btn button{background-color:#5a06f5}.b .z-editor .wd-code-list a:hover,.b .z-editor .wd-font-name-list a:hover,.b .z-editor .wd-font-size-list a:hover,.b .z-editor .wd-format-block-list a:hover{color:#00aeef}.b .z-editor .wd-deitor-content a{color:#3b86cc}.b .z-editor .wd-deitor-content pre{background-color:#e2f0f3;color:#00aeef}.b .z-editor .wd-edit-footer-btn button{background-color:#00aeef}.g .z-editor .wd-code-list a:hover,.g .z-editor .wd-font-name-list a:hover,.g .z-editor .wd-font-size-list a:hover,.g .z-editor .wd-format-block-list a:hover{color:#0ebd0e}.g .z-editor .wd-deitor-content a{color:#19a519}.g .z-editor .wd-deitor-content pre{background-color:#e0f3e8;color:#0ebd0e}.g .z-editor .wd-edit-footer-btn button{background-color:#0ebd0e}"]
            }] }
];
/** @nocollapse */
AppZeditorComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DomService }
];
AppZeditorComponent.propDecorators = {
    options: [{ type: Input }],
    vhtml: [{ type: Input }],
    onInput: [{ type: Output }],
    hasBtn: [{ type: Input }],
    recieveContent: [{ type: Output }],
    theme: [{ type: Input }],
    uploadFile: [{ type: Output }],
    headerRef: [{ type: ViewChild, args: ['headerRef', { read: ElementRef, static: true },] }],
    editorRef: [{ type: ViewChild, args: ['editorRef', { read: ElementRef, static: true },] }],
    pannelRef: [{ type: ViewChild, args: ['pannelRef', { read: ElementRef, static: true },] }],
    footerRef: [{ type: ViewChild, args: ['footerRef', { read: ElementRef, static: true },] }],
    fontNameRef: [{ type: ViewChild, args: ['fontNameRef', { read: ElementRef, static: true },] }],
    fontSizeRef: [{ type: ViewChild, args: ['fontSizeRef', { read: ElementRef, static: true },] }],
    formatBlockRef: [{ type: ViewChild, args: ['formatBlockRef', { read: ElementRef, static: true },] }],
    foreColorRef: [{ type: ViewChild, args: ['foreColorRef', { read: ElementRef, static: true },] }],
    backColorRef: [{ type: ViewChild, args: ['backColorRef', { read: ElementRef, static: true },] }],
    codeRef: [{ type: ViewChild, args: ['codeRef', { read: ElementRef, static: true },] }]
};
if (false) {
    /**
     * 默认格式
     * @type {?}
     */
    AppZeditorComponent.FORMAT;
    /**
     * 传入的html
     * @type {?}
     */
    AppZeditorComponent.prototype.vhtml;
    /** @type {?} */
    AppZeditorComponent.prototype.onInput;
    /**
     * 是否有按钮
     * @type {?}
     */
    AppZeditorComponent.prototype.hasBtn;
    /** @type {?} */
    AppZeditorComponent.prototype.recieveContent;
    /** @type {?} */
    AppZeditorComponent.prototype.disabled;
    /**
     * 参数配置
     * @type {?}
     */
    AppZeditorComponent.prototype.options$;
    /**
     * 主题
     * @type {?}
     */
    AppZeditorComponent.prototype.theme;
    /**
     * 上传文件
     * @type {?}
     */
    AppZeditorComponent.prototype.uploadFile;
    /**
     * 编辑条视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.headerRef;
    /**
     * 编辑器整体视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.editorRef;
    /**
     * pannel视图引用
     * @type {?}
     */
    AppZeditorComponent.prototype.pannelRef;
    /** @type {?} */
    AppZeditorComponent.prototype.footerRef;
    /** @type {?} */
    AppZeditorComponent.prototype.fontNameRef;
    /** @type {?} */
    AppZeditorComponent.prototype.fontSizeRef;
    /** @type {?} */
    AppZeditorComponent.prototype.formatBlockRef;
    /** @type {?} */
    AppZeditorComponent.prototype.foreColorRef;
    /** @type {?} */
    AppZeditorComponent.prototype.backColorRef;
    /** @type {?} */
    AppZeditorComponent.prototype.codeRef;
    /**
     * 字体样式
     * @type {?}
     */
    AppZeditorComponent.prototype.fontFamilys;
    /**
     * 文本格式
     * @type {?}
     */
    AppZeditorComponent.prototype.formatBlocks;
    /**
     * 颜色
     * @type {?}
     */
    AppZeditorComponent.prototype.colors;
    /**
     * 字体大小
     * @type {?}
     */
    AppZeditorComponent.prototype.fontSizes;
    /**
     * code
     * @type {?}
     */
    AppZeditorComponent.prototype.codes;
    /**
     * 选中的字样
     * @type {?}
     */
    AppZeditorComponent.prototype.fontFamily;
    /**
     * 选中的字号
     * @type {?}
     */
    AppZeditorComponent.prototype.fontSize;
    /**
     * 文本格式
     * @type {?}
     */
    AppZeditorComponent.prototype.formatBlock;
    /**
     * 字体颜色
     * @type {?}
     */
    AppZeditorComponent.prototype.foreColor;
    /**
     * 高亮色
     * @type {?}
     */
    AppZeditorComponent.prototype.backColor;
    /**
     * 当前代码语言
     * @type {?}
     */
    AppZeditorComponent.prototype.code;
    /**
     * 是否打开字样面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFontFamilyPannel;
    /**
     * 是否打开字号面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFontSizePannel;
    /**
     * 是否打开文本格式面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchFormatBlockPannel;
    /**
     * 是否打开字体颜色面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchForeColorPannel;
    /**
     * 是否打开背景色面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchBackColorPannel;
    /**
     * 是否打开代码语言面板
     * @type {?}
     */
    AppZeditorComponent.prototype.switchCodePannel;
    /**
     * 默认左对齐
     * @type {?}
     */
    AppZeditorComponent.prototype.justifyActive;
    /**
     * 是否处于编辑状态中
     * @type {?}
     */
    AppZeditorComponent.prototype.isInEditStatus;
    /**
     * 记住的range
     * @type {?}
     */
    AppZeditorComponent.prototype.range;
    /**
     * 是否全屏, 默认false
     * @type {?}
     */
    AppZeditorComponent.prototype.full;
    /**
     * 父元素
     * @type {?}
     */
    AppZeditorComponent.prototype.parent;
    /** @type {?} */
    AppZeditorComponent.prototype.onChange;
    /** @type {?} */
    AppZeditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    AppZeditorComponent.prototype.render2;
    /**
     * @type {?}
     * @private
     */
    AppZeditorComponent.prototype.domService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9uZy16ZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBTSxVQUFVOztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQyxDQUFHLFNBQVM7O0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDLENBQUcsU0FBUzs7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDLENBQVEsU0FBUzs7QUFDbkUsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUMsQ0FBZSxTQUFTOztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFlLFFBQVE7Ozs7O0FBR2xFLHNCQXNCQzs7Ozs7O0lBcEJHLDBCQUFnQjs7Ozs7SUFFaEIsMEJBQWdCOzs7OztJQUVoQix3QkFLRTs7Ozs7SUFFRix3QkFHRTs7Ozs7SUFFRix3QkFHRTs7QUFjTixNQUFNLE9BQU8sbUJBQW1COzs7OztJQXVDNUIsWUFDWSxPQUFrQixFQUNsQixVQUFzQjtRQUR0QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFhekIsVUFBSyxHQUFHLGVBQWUsQ0FBQzs7UUFFdkIsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBRTVELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDOzs7O1FBR3RFLGFBQVEsR0FBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Ozs7UUFFeEgsVUFBSyxHQUEwQixHQUFHLENBQUM7Ozs7UUFFbEMsZUFBVSxHQUFxQixJQUFJLFlBQVksRUFBTSxDQUFDOzs7OztRQWdCaEUsZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7O1FBRzFkLGlCQUFZLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLENBQUMsQ0FBQzs7Ozs7UUFHeFgsV0FBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztRQUcxeEIsY0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFB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LElBQUksRUFBRTs7Ozs7OztJQWxDeEQsMkJBT0U7Ozs7O0lBRUYsb0NBQWlDOztJQUVqQyxzQ0FBcUU7Ozs7O0lBRXJFLHFDQUF3Qjs7SUFDeEIsNkNBQXNFOztJQUN0RSx1Q0FBa0I7Ozs7O0lBRWxCLHVDQUFpSTs7Ozs7SUFFakksb0NBQTRDOzs7OztJQUU1Qyx5Q0FBZ0U7Ozs7O0lBRWhFLHdDQUFrRjs7Ozs7SUFFbEYsd0NBQWtGOzs7OztJQUVsRix3Q0FBa0Y7O0lBQ2xGLHdDQUFrRjs7SUFDbEYsMENBQXNGOztJQUN0RiwwQ0FBc0Y7O0lBQ3RGLDZDQUE0Rjs7SUFDNUYsMkNBQXdGOztJQUN4RiwyQ0FBd0Y7O0lBQ3hGLHNDQUE4RTs7Ozs7SUFHOUUsMENBQTBkOzs7OztJQUcxZCwyQ0FBd1g7Ozs7O0lBR3hYLHFDQUEweEI7Ozs7O0lBRzF4Qix3Q0FBK1c7Ozs7O0lBRS9XLG9DQUEyRjs7Ozs7SUFFM0YseUNBQTREOzs7OztJQUU1RCx1Q0FBMkM7Ozs7O0lBRTNDLDBDQUFrQjs7Ozs7SUFFbEIsd0NBQW9COzs7OztJQUVwQix3Q0FBb0I7Ozs7O0lBRXBCLG1DQUFvQjs7Ozs7SUFFcEIscURBQStCOzs7OztJQUUvQixtREFBNkI7Ozs7O0lBRTdCLHNEQUFnQzs7Ozs7SUFFaEMsb0RBQThCOzs7OztJQUU5QixvREFBOEI7Ozs7O0lBRTlCLCtDQUF5Qjs7Ozs7SUFFekIsNENBQThCOzs7OztJQUU5Qiw2Q0FBdUI7Ozs7O0lBRXZCLG9DQUFXOzs7OztJQUVYLG1DQUFhOzs7OztJQUViLHFDQUFxQjs7SUFDckIsdUNBQW1EOztJQUNuRCx3Q0FBd0M7Ozs7O0lBekZwQyxzQ0FBMEI7Ozs7O0lBQzFCLHlDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IOe8lui+keWZqOe7hOS7tlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNzoyMyBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIE9uSW5pdCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBXaW5kb3dPcHRpb25zIH0gZnJvbSAnLi9fYWxlcnQvd2luZG93L3dpbmRvdyc7ICAgLy8g56qX5L2T5by556qXXHJcbmltcG9ydCB7IFVJTGlua0NvbXBvbmVudCB9IGZyb20gJy4vdWktbGluay91aS1saW5rJzsgICAgICAvLyDotoXpk77mjqVVSee7hOS7tlxyXG5pbXBvcnQgeyBVSVRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi91aS10YWJsZS91aS10YWJsZSc7ICAgLy8g6KGo5qC8VUnnu4Tku7ZcclxuaW1wb3J0IHsgVUlBbm5leENvbXBvbmVudCB9IGZyb20gJy4vdWktYW5uZXgvdWktYW5uZXgnOyAgIC8vIOmZhOS7tlVJ57uE5Lu2XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvRG9tU2VydmljZSc7ICAgICAgICAvLyBkb23mj5DkvpvllYZcclxuaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnLi91dGlsL0NvbW1vblV0aWwnOyAgICAgICAgICAgICAgIC8vIGRvbeW3peWFt+exu1xyXG5pbXBvcnQgQ3Vyc29yVXRpbCBmcm9tICcuL3V0aWwvQ3Vyc29yVXRpbCc7ICAgICAgICAgICAgICAgLy8g5YWJ5qCH5bel5YW357G7XHJcblxyXG4vKiog57yW6L6R5Zmo6YWN572u5Y+C5pWwICovXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIC8qKiDnvJbovpHlhoXlrrnnmoTmnIDlpKflrZfoioLmlbAgKi9cclxuICAgIG1heHNpemU6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDotoXml7YgbXMgKi9cclxuICAgIHRpbWVvdXQ6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDlm77niYfnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIGltYWdlOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+WbvueJh+aVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICAgICAgLyoqIOWwj+S6juaMh+WumuWtl+iKguaVsOS8mui/m+ihjGJhc2U2NOe8lueggSAqL1xyXG4gICAgICAgIGJhc2U2NDogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIC8qKiDkuIrkvKDop4bpopHnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIHZpZGVvOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+inhumikeaVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS4iuS8oOmfs+mikeeahOmFjee9ruWPguaVsCAqL1xyXG4gICAgbXVzaWM6IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn6Z+z6aKR5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH07XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtemVkaXRvcicsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZy16ZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctemVkaXRvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXBwWmVkaXRvckNvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1dLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwWmVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBvcHRpb25zKHY6IGFueSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zJCwgdik7XHJcbiAgICB9XHJcbiAgICAvKiog57yW6L6R5p2hICovXHJcbiAgICBnZXQgaGVhZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIC8qKiDnvJbovpHlmaggKi9cclxuICAgIGdldCBlZGl0b3IoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLyoqIOe8lui+kemdouadvyAqL1xyXG4gICAgZ2V0IHBhbm5lbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFubmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgZm9vdGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb290ZXJSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb250TmFtZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb250TmFtZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGZvbnRTaXplRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvbnRTaXplUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgZm9ybWF0QmxvY2tFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0QmxvY2tSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb3JlQ29sb3JFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZUNvbG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgYmFja0NvbG9yRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tDb2xvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvZGVFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyMjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICAvKiog6buY6K6k5qC85byPICovXHJcbiAgICBzdGF0aWMgRk9STUFUID0ge1xyXG4gICAgICAgIGZvcm1hdEJsb2NrOiAncCcsXHJcbiAgICAgICAgZm9yZUNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgIGJhY2tDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICBqdXN0aWZ5QWN0aXZlOiAnanVzdGlmeUxlZnQnLFxyXG4gICAgICAgIGZvbnRTaXplOiB7IGtleTogJ3NtYWxsJywgdmFsdWU6ICczJyB9LFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHsga2V5OiAn5b6u6L2v6ZuF6buRJywgdmFsdWU6ICdNaWNyb3NvZnQgWWFoZWknIH1cclxuICAgIH07XHJcbiAgICAvKiog5Lyg5YWl55qEaHRtbCAqL1xyXG4gICAgQElucHV0KCkgdmh0bWwgPSAnPHA+6K+36L6T5YWl5YaF5a65fjwvcD4nO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1vdXRwdXQtb24tcHJlZml4XHJcbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIC8qKiDmmK/lkKbmnInmjInpkq4gKi9cclxuICAgIEBJbnB1dCgpIGhhc0J0biA9IGZhbHNlO1xyXG4gICAgQE91dHB1dCgpIHJlY2lldmVDb250ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAvKiog5Y+C5pWw6YWN572uICovXHJcbiAgICBvcHRpb25zJDogYW55ID0geyBtYXhzaXplOiA2NTUzNSwgdGltZW91dDogMTAwMDAsIGltYWdlOiB7IGNvdW50OiA1LCBiYXNlNjQ6IDYwMDAwIH0sIGF1ZGlvOiB7IGNvdW50OiAxIH0sIHZpZGVvOiB7IGNvdW50OiAxIH0gfTtcclxuICAgIC8qKiDkuLvpopggKi9cclxuICAgIEBJbnB1dCgpIHRoZW1lOiAncicgfCAncCcgfCAnYicgfCAnZycgPSAnZyc7XHJcbiAgICAvKiog5LiK5Lyg5paH5Lu2ICovXHJcbiAgICBAT3V0cHV0KCkgdXBsb2FkRmlsZTogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e30+KCk7XHJcbiAgICAvKiog57yW6L6R5p2h6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBoZWFkZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiog57yW6L6R5Zmo5pW05L2T6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdlZGl0b3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBlZGl0b3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiogcGFubmVs6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdwYW5uZWxSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBwYW5uZWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb290ZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb290ZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb250TmFtZVJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGZvbnROYW1lUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZm9udFNpemVSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb250U2l6ZVJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Zvcm1hdEJsb2NrUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9ybWF0QmxvY2tSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb3JlQ29sb3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb3JlQ29sb3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdiYWNrQ29sb3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBiYWNrQ29sb3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdjb2RlUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgY29kZVJlZjogRWxlbWVudFJlZjtcclxuICAgIC8qKiDlrZfkvZPmoLflvI8gKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBmb250RmFtaWx5cyA9IFt7IGtleTogJ2FyaWFsJywgdmFsdWU6ICdhcmlhbCcgfSwgeyBrZXk6ICflvq7ova/pm4Xpu5EnLCB2YWx1ZTogJ01pY3Jvc29mdCBZYWhlaScgfSwgeyBrZXk6ICflrovkvZMnLCB2YWx1ZTogJ1NpbVN1bicgfSwgeyBrZXk6ICfpu5HkvZMnLCB2YWx1ZTogJ1NpbUhlaScgfSwgeyBrZXk6ICfmpbfkvZMnLCB2YWx1ZTogJ0thaVRpJyB9LCB7IGtleTogJ+Wui+S9kycsIHZhbHVlOiAnU2ltU3VuJyB9LCB7IGtleTogJ+aWsOWui+S9kycsIHZhbHVlOiAnTlNpbVN1bicgfSwgeyBrZXk6ICfku7/lrosnLCB2YWx1ZTogJ0ZhbmdTb25nJyB9LCB7IGtleTogJ+W+rui9r+ato+m7keS9kycsIHZhbHVlOiAnTWljcm9zb2Z0IEpoZW5nSGVpJyB9LCB7IGtleTogJ+WNjuaWh+eQpeePgCcsIHZhbHVlOiAnU1RIdXBvJyB9LCB7IGtleTogJ+WNjuaWh+W9qeS6kScsIHZhbHVlOiAnU1RDYWl5dW4nIH0sIHsga2V5OiAn5bm85ZyGJywgdmFsdWU6ICdZb3VZdWFuJyB9LCB7IGtleTogJ+WNjuaWh+ihjOaltycsIHZhbHVlOiAnU1RYaW5na2FpJyB9XTtcclxuICAgIC8qKiDmlofmnKzmoLzlvI8gKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBmb3JtYXRCbG9ja3MgPSBbeyBrZXk6ICdwJywgdmFsdWU6ICc8cCBkYXRhLWluZGV4PVwiMFwiPnA8L3A+JyB9LCB7IGtleTogJ2g2JywgdmFsdWU6ICc8aDYgZGF0YS1pbmRleD1cIjFcIj5oNjwvaDY+JyB9LCB7IGtleTogJ2g1JywgdmFsdWU6ICc8aDUgZGF0YS1pbmRleD1cIjJcIj5oNTwvaDU+JyB9LCB7IGtleTogJ2g0JywgdmFsdWU6ICc8aDQgZGF0YS1pbmRleD1cIjNcIj5oNDwvaDQ+JyB9LCB7IGtleTogJ2gzJywgdmFsdWU6ICc8aDMgZGF0YS1pbmRleD1cIjRcIj5oMzwvaDM+JyB9LCB7IGtleTogJ2gyJywgdmFsdWU6ICc8aDIgZGF0YS1pbmRleD1cIjVcIj5oMjwvaDI+JyB9LCB7IGtleTogJ2gxJywgdmFsdWU6ICc8aDEgZGF0YS1pbmRleD1cIjZcIj5oMTwvaDE+JyB9XTtcclxuICAgIC8qKiDpopzoibIgKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb2xvcnMgPSBbWycjZmZmZmZmJywgJyMwMDAwMDAnLCAnI2VlZWNlMScsICcjMWY0OTdkJywgJyM0ZjgxYmQnLCAnI2MwNTA0ZCcsICcjOWJiYjU5JywgJyM4MDY0YTInLCAnIzRiYWNjNicsICcjZjc5NjQ2J10sIFsnI2YyZjJmMicsICcjN2Y3ZjdmJywgJyNkZGQ5YzMnLCAnI2M2ZDlmMCcsICcjZGJlNWYxJywgJyNmMmRjZGInLCAnI2ViZjFkZCcsICcjZTVlMGVjJywgJyNkYmVlZjMnLCAnI2ZkZWFkYSddLCBbJyNkOGQ4ZDgnLCAnIzU5NTk1OScsICcjYzRiZDk3JywgJyM4ZGIzZTInLCAnI2I4Y2NlNCcsICcjZTViOWI3JywgJyNkN2UzYmMnLCAnI2NjYzFkOScsICcjYjdkZGU4JywgJyNmYmQ1YjUnXSwgWycjYmZiZmJmJywgJyMzZjNmM2YnLCAnIzkzODk1MycsICcjNTQ4ZGQ0JywgJyM5NWIzZDcnLCAnI2Q5OTY5NCcsICcjYzNkNjliJywgJyNiMmEyYzcnLCAnIzkyY2RkYycsICcjZmFjMDhmJ10sIFsnI2E1YTVhNScsICcjMjYyNjI2JywgJyM0OTQ0MjknLCAnIzE3MzY1ZCcsICcjMzY2MDkyJywgJyM5NTM3MzQnLCAnIzc2OTIzYycsICcjNWY0OTdhJywgJyMzMTg1OWInLCAnI2UzNmMwOSddLCBbJyM3ZjdmN2YnLCAnIzBjMGMwYycsICcjMWQxYjEwJywgJyMwZjI0M2UnLCAnIzI0NDA2MScsICcjNjMyNDIzJywgJyM0ZjYxMjgnLCAnIzNmMzE1MScsICcjMjA1ODY3JywgJyM5NzQ4MDYnXSwgWycjYzAwMDAwJywgJyNmZjAwMDAnLCAnI2ZmYzAwMCcsICcjZmZmZjAwJywgJyM5MmQwNTAnLCAnIzAwYjA1MCcsICcjMDBiMGYwJywgJyMwMDcwYzAnLCAnIzAwMjA2MCcsICcjNzAzMGEwJ11dO1xyXG4gICAgLyoqIOWtl+S9k+Wkp+WwjyAqL1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgIGZvbnRTaXplcyA9IFt7IGtleTogJ3h4LXNtYWxsJywgdmFsdWU6ICcxJywgdmFsdWUkOiA5IC8gMTYgfSwgeyBrZXk6ICd4LXNtYWxsJywgdmFsdWU6ICcyJywgdmFsdWUkOiAxMCAvIDE2IH0sIHsga2V5OiAnc21hbGwnLCB2YWx1ZTogJzMnLCB2YWx1ZSQ6ICcnIC8qKiAxMy8xNuiwg+aVtOS4uuepuuWtl+espuS4siAqLyB9LCB7IGtleTogJ21lZGl1bScsIHZhbHVlOiAnNCcsIHZhbHVlJDogMTYgLyAxNiB9LCB7IGtleTogJ2xhcmdlJywgdmFsdWU6ICc1JywgdmFsdWUkOiAxOCAvIDE2IH0sIHsga2V5OiAneC1sYXJnZScsIHZhbHVlOiAnNicsIHZhbHVlJDogMjQgLyAxNiB9LCB7IGtleTogJ3h4LWxhcmdlJywgdmFsdWU6ICc3JywgdmFsdWUkOiAzMiAvIDE2IH1dO1xyXG4gICAgLyoqIGNvZGUgKi9cclxuICAgIGNvZGVzID0gWydIdG1sJywgJ0NzcycsICdKYXZhc2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnU2FzcycsICdKYXZhJywgJ1htbCcsICdTcWwnLCAnU2hlbGwnXTtcclxuICAgIC8qKiDpgInkuK3nmoTlrZfmoLcgKi9cclxuICAgIGZvbnRGYW1pbHk6IGFueSA9IHsga2V5OiAn5b6u6L2v6ZuF6buRJywgdmFsdWU6ICdNaWNyb3NvZnQgWWFoZWknIH07XHJcbiAgICAvKiog6YCJ5Lit55qE5a2X5Y+3ICovXHJcbiAgICBmb250U2l6ZTogYW55ID0geyBrZXk6ICdzbWFsbCcsIHZhbHVlOiAzIH07IC8vIOm7mOiupDFyZW07XHJcbiAgICAvKiog5paH5pys5qC85byPICovXHJcbiAgICBmb3JtYXRCbG9jayA9ICdwJztcclxuICAgIC8qKiDlrZfkvZPpopzoibIgKi9cclxuICAgIGZvcmVDb2xvciA9ICdibGFjayc7XHJcbiAgICAvKiog6auY5Lqu6ImyICovXHJcbiAgICBiYWNrQ29sb3IgPSAnd2hpdGUnO1xyXG4gICAgLyoqIOW9k+WJjeS7o+eggeivreiogCAqL1xyXG4gICAgY29kZSA9ICdKYXZhc2NyaXB0JztcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDlrZfmoLfpnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvbnRGYW1pbHlQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDlrZflj7fpnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvbnRTaXplUGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5paH5pys5qC85byP6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+S9k+minOiJsumdouadvyAqL1xyXG4gICAgc3dpdGNoRm9yZUNvbG9yUGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA6IOM5pmv6Imy6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hCYWNrQ29sb3JQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDku6PnoIHor63oqIDpnaLmnb8gKi9cclxuICAgIHN3aXRjaENvZGVQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDpu5jorqTlt6blr7npvZAgKi9cclxuICAgIGp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeUxlZnQnO1xyXG4gICAgLyoqIOaYr+WQpuWkhOS6jue8lui+keeKtuaAgeS4rSAqL1xyXG4gICAgaXNJbkVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgIC8qKiDorrDkvY/nmoRyYW5nZSAqL1xyXG4gICAgcmFuZ2U6IGFueTtcclxuICAgIC8qKiDmmK/lkKblhajlsY8sIOm7mOiupGZhbHNlICovXHJcbiAgICBmdWxsID0gZmFsc2U7XHJcbiAgICAvKiog54i25YWD57SgICovXHJcbiAgICBwYXJlbnQhOiBIVE1MRWxlbWVudDtcclxuICAgIG9uQ2hhbmdlOiAoaHRtbDogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZodG1sID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRGb3JtYXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLnJlbmRlcjIucGFyZW50Tm9kZSh0aGlzLmVkaXRvcik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlum7mOiupOagvOW8j1xyXG4gICAgICovXHJcbiAgICBpbml0Rm9ybWF0RGF0YSgpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFUKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWmguaenOmdouadv+S4jeiBmueEpuWImeS9v+mdouadv+iBmueEplxyXG4gICAgICovXHJcbiAgICBwYW5uZWxGb2N1cygpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7nvJbovpHpnaLmnb/kuIrmrKHlhYnmoIfkuLrlvZPliY3lhYnmoIdcclxuICAgICAqL1xyXG4gICAgcmVjb3ZlclJhbmdlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wYW5uZWwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8g56Gu5L+d57yW6L6R6Z2i5p2/5YWI5piv6IGa54Sm55qEXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFubmVsLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7IC8vIOWtmOWcqOS4iuasoeWFieagh++8jOWImeiuvue9ruS4iuasoeWFieagh1xyXG4gICAgICAgICAgICBDdXJzb3JVdGlsLnNldEZpcnN0UmFuZ2UodGhpcy5yYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3Vyc29yVXRpbC5zZXRTZWxlY3Rpb25Ub0VsZW1lbnQodGhpcy5wYW5uZWwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIDEu6IGa54Sm6Z2i5p2/5bm26I635Y+W5LiK5qyh5YWJ5qCH5L2N572uLOiuvue9ruW9k+WJjeWOhuWPsue8lui+keagt+W8j1xyXG4gICAgICogMi7ngrnlh7vnvJbovpHmnaHnmoTlkb3ku6TmiJbogIXnvJbovpHpnaLmnb/lkI7vvIzlsIbop4bkuLrnvJbovpHnirbmgIFcclxuICAgICAqIEBwYXJhbSAgcmVjb3Zlcj8g5piv5ZCm6ZyA6KaB5oGi5aSN5LiK5qyh5YWJ5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0RWRpdChyZWNvdmVyOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIOaBouWkjeS4iuasoeWFieagh++8iOeCueWHu+e8lui+kemdouadv+S4jemcgOimgeaBouWkjeS4iuasoeWFieagh++8jOeCueWHu+e8lui+keadoemcgOimgeaBouWkjeS4iuasoeWFieagh++8iVxyXG4gICAgICAgIGlmIChyZWNvdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlclJhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdEVkaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYu+atoum7mOiupOS6i+S7tumYsuatouWkseeEpu+8jOehruS/nee8lui+kemdouadv+iBmueEpu+8jOiuvue9ruWOhuWPsuWFieagh+WSjOagvOW8j1xyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIGVuc3VyZUZvY3VzKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8g6Zi75q2i5aSx54SmXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIOe8lui+keWIneWni+WMllxyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbnlKjooYzlhoVzdHlsZVxyXG4gICAgICogQHBhcmFtIGYg5piv5ZCm5ZCv55Soc3R5bGXvvIzpu5jorqTkvb/nlKhcclxuICAgICAqL1xyXG4gICAgc3R5bGVXaXRoQ1NTKGY6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3N0eWxlV2l0aENTUycsIGZhbHNlLCBmKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keWIneWni+WMluWSjOiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICovXHJcbiAgICBpbml0RWRpdCgpIHtcclxuICAgICAgICAvLyDlnKjnvJbovpHnirbmgIHkuI3lho3mrKHov5vooYzliJ3lp4vljJZcclxuICAgICAgICBpZiAodGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOagh+iusOmdouadv+WkhOS6jue8lui+keeKtuaAgVxyXG4gICAgICAgIGlmICghdGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5FZGl0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIC8vIOWcqOS7o+eggeWMuuS4jeiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOWFieagh+WRqOWbtOacieWGheWuueWImeS4jeiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIGNvbnN0IGVsID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpO1xyXG4gICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCB0aGlzLmZvcm1hdEJsb2NrKTtcclxuICAgICAgICAvLyDlpoLmnpznvJbovpHlmajlhoXmsqHmnInmlofmnKzmoIfnrb7vvIzmloflrZflr7npvZDlkb3ku6TkuI3og73nrKzkuIDkuKrmiafooYxcclxuICAgICAgICAvLyDlkKbliJnkvJrlsIblhYnmoIforr7liLDkuIvkuIDkuKrmlofmnKzmoIfnrb7lhoVcclxuICAgICAgICB0aGlzLmNtZCh0aGlzLmp1c3RpZnlBY3RpdmUsIGZhbHNlKTtcclxuICAgICAgICAvLyBjc3PkuK1mb250LWZhbWlseem7mOiupOaYr+W+rui9r+mbhem7kVxyXG4gICAgICAgIGlmICh0aGlzLmZvbnRGYW1pbHkua2V5ICE9PSAn5b6u6L2v6ZuF6buRJykgeyB0aGlzLmNtZCgnZm9udE5hbWUnLCBmYWxzZSwgdGhpcy5mb250RmFtaWx5LnZhbHVlKTsgfVxyXG4gICAgICAgIHRoaXMuY21kKCdmb3JlQ29sb3InLCBmYWxzZSwgdGhpcy5mb3JlQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY21kKCdiYWNrQ29sb3InLCBmYWxzZSwgdGhpcy5iYWNrQ29sb3IpO1xyXG4gICAgICAgIC8vIGNzc+S4rWZvbnQtc2l6Zem7mOiupOaYry43NXJlbVxyXG4gICAgICAgIGlmICh0aGlzLmZvbnRTaXplLnZhbHVlICE9PSAnJykgeyB0aGlzLmNtZCgnZm9udFNpemUnLCBmYWxzZSwgdGhpcy5mb250U2l6ZS52YWx1ZSk7IH1cclxuICAgICAgICAvLyDlr7norr7nva7lrZfkvZPlpKflsI/lgZrnibnmrorlpITnkIZcclxuICAgICAgICB0aGlzLmFkanVzdEZvbnRTaXplV2l0aFN0eWxlKHRoaXMuZm9udFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5a2X5qC3XHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgc2V0Rm9udE5hbWUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCA9ICF0aGlzLnN3aXRjaEZvbnRGYW1pbHlQYW5uZWw7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5c1tpbmRleCAqIDFdO1xyXG4gICAgICAgIHRoaXMuY21kKCdmb250TmFtZScsIGZhbHNlLCB0aGlzLmZvbnRGYW1pbHkudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5a2X5Y+3XHJcbiAgICAgKi9cclxuICAgIHNldEZvbnRTaXplKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgY29uc3QgdCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICB0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsID0gIXRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWw7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0aGlzLmZvbnRTaXplc1tpbmRleCAqIDFdO1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICB0aGlzLmNtZCgnZm9udFNpemUnLCBmYWxzZSwgZm9udFNpemUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuYWRqdXN0Rm9udFNpemVXaXRoU3R5bGUoZm9udFNpemUgYXMgYW55KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6LCD5pW05a2X5L2T5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gZm9udFNpemUg5a2X5L2T5aSn5bCP5a+56LGhXHJcbiAgICAgKi9cclxuICAgIGFkanVzdEZvbnRTaXplV2l0aFN0eWxlKGZvbnRTaXplOiB7IHZhbHVlOiBudW1iZXIsIHZhbHVlJDogc3RyaW5nIH0pIHtcclxuICAgICAgICAvLyDpu5jorqTlrZfkvZPkuI3lgZrlpITnkIZcclxuICAgICAgICBpZiAoZm9udFNpemUudmFsdWUkID09PSAnJykgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBlbCA9IEN1cnNvclV0aWwuZ2V0UmFuZ2VDb21tb25QYXJlbnQoKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBmb250cyA9IENvbW1vblV0aWwucGFyZW50KGVsLCAyKS5xdWVyeVNlbGVjdG9yQWxsKGBmb250W3NpemU9XCIke2ZvbnRTaXplLnZhbHVlfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9udFNpemUudmFsdWUkO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZm9udHMsIGZvbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcjIucmVtb3ZlQXR0cmlidXRlKGZvbnQsICdzaXplJyk7XHJcbiAgICAgICAgICAgIGZvbnQuc3R5bGUuZm9udFNpemUgPSB2YWx1ZSA9PT0gJ2luaGVyaXQnID8gJ2luaGVyaXQnIDogZm9udFNpemUudmFsdWUkICsgJ3JlbSc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKzmoLzlvI9cclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb3JtYXRCbG9jayhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbCA9ICF0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGZvcm1hdEJsb2NrID0gdGhpcy5mb3JtYXRCbG9ja3NbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gZm9ybWF0QmxvY2sua2V5O1xyXG4gICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAnPCcgKyB0aGlzLmZvcm1hdEJsb2NrICsgJz4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWJjeaZr+iJslxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvcmVDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuZm9yZUNvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvcmVDb2xvcicsIGZhbHNlLCB0aGlzLmZvcmVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7og4zmma/oibIo6auY5Lqu6ImyKVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEJhY2tDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuYmFja0NvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2JhY2tDb2xvcicsIGZhbHNlLCB0aGlzLmJhY2tDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ku6PnoIHor63oqIBcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRDb2RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+S7o+eggeWMuuaXoOazleaPkuWFpeS7o+eggeWMun4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN3aXRjaENvZGVQYW5uZWwgPSAhdGhpcy5zd2l0Y2hDb2RlUGFubmVsO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuY29kZSA9IHRoaXMuY29kZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmNvZGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxwPjxici8+PC9wPjxwcmUgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlXCIgdGl0bGU9XCLku6PnoIHljLpcIj48Y29kZSBjbGFzcz1cIiR7Y29kZX1cIj48cD48YnIvPjwvcD48L2NvZGU+PC9wcmU+PHA+PGJyLz48L3A+YDtcclxuICAgICAgICB0aGlzLnJlbW92ZUZvcm1hdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIGNvbnN0IHBlbCA9IEN1cnNvclV0aWwuZ2V0UmFuZ2VDb21tb25QYXJlbnQoKTtcclxuICAgICAgICBjb25zdCBib3ggPSBDb21tb25VdGlsLnByZVNpYmxpbmcocGVsKSBhcyBhbnk7XHJcbiAgICAgICAgLy8g5o+S5YWlaHRtbOWQju+8jOWwhuWFieagh+enu+iHs+S7o+eggeWMuueahHDmoIfnrb7kuK1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFJhbmdlVG9FbGVtZW50KGJveC5jaGlsZHJlblswXS5jaGlsZHJlblswXSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpOyAvLyDmiYvliqjorr7nva7kuIDkuItcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOihjOWGheaNouihjO+8iHNoaWZ0K2VudGVy77yJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0QnJPblJldHVybihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoJ2luc2VydEJyT25SZXR1cm4nKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAnPGJyPjxicj4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0QnJPblJldHVybicsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueyl+S9k1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hCb2xkKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2JvbGQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pac5L2TXHJcbiAgICAgKi9cclxuICAgIHN3aXRjaEl0YWxpYyhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpdGFsaWMnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5LiL5YiS57q/XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFVuZGVybGluZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCd1bmRlcmxpbmUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Yig6Zmk57q/XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFN0cmlrZVRocm91Z2goZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnc3RyaWtlVGhyb3VnaCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva4v5Y+W5raI5LiK5qCHXHJcbiAgICAgKi9cclxuICAgIHN1cGVyc2NyaXB0KGU6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnc3VwZXJzY3JpcHQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uL+WPlua2iOS4i+agh1xyXG4gICAgICovXHJcbiAgICBzdWJzY3JpcHQoZTogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdzdWJzY3JpcHQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5paH5a2X5a+56b2Q5pa55ZCRXHJcbiAgICAgKiBAcGFyYW0gIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEp1c3RpZnlhY3RpdmUoZTogRXZlbnQsIHN0cjogJ0xlZnQnIHwgJ1JpZ2h0JyB8ICdDZW50ZXInIHwgJ0Z1bGwnKSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeScgKyBzdHI7XHJcbiAgICAgICAgdGhpcy5jbWQodGhpcy5qdXN0aWZ5QWN0aXZlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnov5tcclxuICAgICAqL1xyXG4gICAgaW5kZW50KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luZGVudCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4/lsJHnvKnov5tcclxuICAgICAqL1xyXG4gICAgb3V0ZGVudChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdvdXRkZW50JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeacieW6j+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRPcmRlcmVkTGlzdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRPcmRlcmVkTGlzdCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXml6Dluo/liJfooahcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0VW5vcmRlcmVkTGlzdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRVbm9yZGVyZWRMaXN0JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeihqOagvOiwg+i1t+aPkuWFpeihqOagvFVJXHJcbiAgICAgKi9cclxuICAgIGluc2VydFRhYmxlKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXooajmoLx+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiAn5o+S5YWl6KGo5qC8JywgYW5pbWF0aW9uOiAnc2NhbGUnLCBjb250ZW50OiBVSVRhYmxlQ29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76KGo5qC8VUnlvLnnqpfnoa7orqTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZVRhYmxlSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6LaF6ZO+5o6l6LCD6LW35o+S5YWl6LaF6ZO+5o6lVUlcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRMaW5rKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXpk77mjqV+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiAn5o+S5YWl6ZO+5o6lJywgYW5pbWF0aW9uOiAnc2NhbGUnLCBjb250ZW50OiBVSUxpbmtDb21wb25lbnQsIGhhbmRsZXI6IHRoaXMsIHRoZW1lOiB0aGlzLnRoZW1lIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7votoXpk77mjqVVSeW8ueeql+ehruiupOaXtuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGh0bWwg5o+S5YWl55qEaHRtbFxyXG4gICAgICovXHJcbiAgICByZWNpZXZlTGlua0hUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICBsZXQgZWw6IGFueSA9IEN1cnNvclV0aWwuZ2V0UmFuZ2VDb21tb25QYXJlbnQoKTtcclxuICAgICAgICBlbCA9IHRoaXMucmVuZGVyMi5wYXJlbnROb2RlKGVsKTtcclxuICAgICAgICBpZiAoZWwuc3R5bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIyLnJlbW92ZUF0dHJpYnV0ZShlbCwgJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl5Zu+54mH6LCD6LW35o+S5YWl5Zu+54mHVUlcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRGaWxlKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXmlofku7Z+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiAn5o+S5YWl5paH5Lu2JywgYW5pbWF0aW9uOiAnc2NhbGUnLCBjb250ZW50OiBVSUFubmV4Q29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfkuIrkvKDmnKzlnLDmlofku7bml7bltYzlhaViYXNlNjTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUxvY2FsRmlsZUhUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfigJzmj5LlhaXlpJbpk77igJ3ml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUZpbGVMaW5rSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsITpgInmi6nmlofku7bkuovku7ZcclxuICAgICAqIEBwYXJhbSAgdHlwZSDmlofku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAgZmlsZSDmlofku7ZcclxuICAgICAqIEBwYXJhbSAgcGFyc2VyIOS8oOWFpXNyY+iOt+WPlmh0bWxcclxuICAgICAqIEBwYXJhbSAgY2xvc2UgIOWFs+mXreW8ueeql+WSjOmBrue9qVxyXG4gICAgICovXHJcbiAgICBlbWl0VXBsb2FkRmlsZSh0eXBlOiAnaW1hZ2UnIHwgJ2F1ZGlvJyB8ICd2aWRlbycsIGZpbGU6IGFueSwgcGFyc2VyOiAodjogc3RyaW5nKSA9PiBzdHJpbmcsIGNsb3NlOiAoYjogYm9vbGVhbiwgdD86IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZS5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZSwgZmlsZSwgY2FsbGJhY2s6IChzcmM6IHN0cmluZyB8IGJvb2xlYW4sIHQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIXNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjaWV2ZUZpbGVMaW5rSFRNTChwYXJzZXIoc3JjIGFzIHN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xvc2UoISFzcmMsIHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaVoclxyXG4gICAgICovXHJcbiAgICBpbnNlcnRIb3Jpem9udGFsUnVsZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIb3Jpem9udGFsUnVsZScsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnspjotLRcclxuICAgICAqL1xyXG4gICAgcGFzdGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgncGFzdGUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Ymq5YiHXHJcbiAgICAgKi9cclxuICAgIGN1dChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdjdXQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIGNvcHkoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnY29weScsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInkuK3miYDmnIlcclxuICAgICAqL1xyXG4gICAgc2VsZWN0QWxsKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3NlbGVjdEFsbCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43lgZpcclxuICAgICAqL1xyXG4gICAgcmVkbyhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdyZWRvJywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSpOmUgFxyXG4gICAgICovXHJcbiAgICB1bmRvKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3VuZG8nLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YCJ5LitXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZVNlbGVjdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdkZWxldGUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6G5Y+y6L6T5YWlXHJcbiAgICAgKi9cclxuICAgIGhpc3RvcnkoKSB7XHJcbiAgICAgICAgdGhpcy52aHRtbCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWRpdG9yX2lucHV0JykgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmoLzlvI/vvIzkuI3pmLvmraLlpLHnhKbvvIzph43mlrDogZrnhKbml7bkvJrorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRm9ybWF0KCkge1xyXG4gICAgICAgIHRoaXMuY21kKCdyZW1vdmVGb3JtYXQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9ybWF0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5ZCE57G75LiL5ouJ5qGGXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaGlkZVN3aXRjaFBhbm5lbChlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmZvbnROYW1lRWwsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb250U2l6ZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JlQ29sb3JFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvcmVDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmJhY2tDb2xvckVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQmFja0NvbG9yUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JtYXRCbG9ja0VsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hDb2RlUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuY29kZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQ29kZVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGP5oiW5Y+W5raI5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIFN3aXRjaFNjcmVlbigpIHtcclxuICAgICAgICBjb25zdCBlZGl0b3I6IGFueSA9IHRoaXMuZWRpdG9yO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcjogYW55ID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgY29uc3QgcGFubmVsOiBhbnkgPSB0aGlzLnBhbm5lbDtcclxuICAgICAgICBjb25zdCBmb290ZXI6IGFueSA9IHRoaXMuZm9vdGVyO1xyXG4gICAgICAgIHRoaXMuZnVsbCA9ICF0aGlzLmZ1bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuZnVsbCkgeyAvLyDlhajlsY9cclxuICAgICAgICAgICAgZWRpdG9yLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5OTt0b3A6MDtsZWZ0OjA7dHJhbnNmb3JtOm5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTsnO1xyXG4gICAgICAgICAgICBwYW5uZWwuc3R5bGUuY3NzVGV4dCA9IGBtYXgtaGVpZ2h0OnVuc2V0O2hlaWdodDoke3dpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlci5vZmZzZXRIZWlnaHQgLSBmb290ZXIub2Zmc2V0SGVpZ2h0fXB4O2A7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgLy8g6L+Y5Y6fXHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHBhbm5lbC5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVkaXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5piv5ZCm5pSv5oyB5ZG95LukXHJcbiAgICAgKiBAcGFyYW0gY21kIOWRveS7pFxyXG4gICAgICovXHJcbiAgICBpc1N1cHBvcnQoY21kOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkKGNtZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiafooYzlsIHoo4XnmoTnvJbovpHlkb3ku6RcclxuICAgICAqIEBwYXJhbSBrIOWRveS7pOWQjeensFxyXG4gICAgICogQHBhcmFtIHVpIOaJk+W8gHVp5by556qXXHJcbiAgICAgKiBAcGFyYW0gdiDorr7nva7lkb3ku6TlgLxcclxuICAgICAqIEByZXR1cm5zIHRydWUt6K6+572u5oiQ5Yqf77yMZmFsc2Ut6K6+572u5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIGNtZChrOiBzdHJpbmcsIHVpOiBib29sZWFuLCB2PzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydChrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfns7vnu5/kuI3mlK/mjIHor6Xlkb3ku6R+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgd2hpdGVMaXN0ID0gJ2luc2VydEhUTUwscGFzdGUsY3V0LGNvcHkscmVtb3ZlRm9ybWF0LGRlbGV0ZSxzZWxlY3RBbGwscmVkbyx1bmRvLGluc2VydEJyT25SZXR1cm4nO1xyXG4gICAgICAgIGlmICh3aGl0ZUxpc3QuaW5kZXhPZihrKSA8IDAgJiYgdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn5Luj56CB5Yy65YaF5peg5rOV5omn6KGM6K+l5ZG95LukficpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5leGVjQ29tbWFuZChrLCB1aSwgdiB8fCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbnB1dCxjbGljayxzZWxlY3Rpb25jaGFuZ2Xkuovku7borrDlvZXnvJbovpHpnaLmnb/lhYnmoIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgc2V0UmFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IEN1cnNvclV0aWwuZ2V0UmFuZ2UoMCwgdGhpcy5wYW5uZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5oyJ6ZSu5LqL5Lu2ICjlpITnkIZ0YWLnvKnov5spXHJcbiAgICAgKiBAcGFyYW0gZSDmjInplK7kuovku7ZcclxuICAgICAqL1xyXG4gICAga2V5ZG93bihlOiBFdmVudCB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZSB8fCBlLndoaWNoIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgaWYgKGtleSAhPT0gOSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaMieS4i3RhYumUru+8jOWinuWKoOe8qei/mzLkuKrnqbrmoLxcclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgQXJyYXkoNSkuam9pbignJm5ic3A7Jyk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdGFiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76Z2i5p2/XHJcbiAgICAgKi9cclxuICAgIHBhbm5lbE9uQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOe8lui+kemdouadv+S4reeymOi0tO+8iOiLpeWcqOS7o+eggeWMuuWGheeymOi0tOWImea4hemZpOagvOW8j++8ge+8ge+8ge+8iVxyXG4gICAgICovXHJcbiAgICBwYW5uZWxPblBhc3RlKGU6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgY29uc3Qgb2JqID0gPGFueT4gQ29tbW9uVXRpbC5pc0lFKCkgPyB3aW5kb3cgOiBlO1xyXG4gICAgICAgIGlmICghb2JqLmNsaXBib2FyZERhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8g5Y+q5aSN5Yi25paH5pys77yM5bm25bCG5aSa5Liq5o2i6KGM77yI5paH5a2X5o2i6KGM5ZKMcOagh+etvuWcqOiOt+WPluaWh+acrOaXtuS8muWPmOaIkOS4pOS4quaNouihjO+8iei9rOS4uuWNleS4quaNouihjFxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBvYmouY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHJcXG4pKy9nbSwgJ1xcclxcbicpO1xyXG4gICAgICAgIGNvbnN0IGRmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcclxuICAgICAgICBDdXJzb3JVdGlsLmluc2VydE5vZGUoZGYpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZUFuZEVtaXRWYWx1ZSgwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeaXtuiusOS9j+WFieWPmOS9jee9riAmJiBpbnB1dOS6i+S7tuWPkeWwhHZhbHVlICYmIOiusOS9j+i+k+WFpVxyXG4gICAgICovXHJcbiAgICBzZXRSYW5nZUFuZEVtaXRWYWx1ZShhcmcwOiBudW1iZXIgfCBFdmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgYXJnMCA9IDMwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbm5lckhUTUwgPSB0aGlzLnBhbm5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZodG1sID09PSBpbm5lckhUTUwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIC8vIOacieWGheWuueaXtuaJjeS/neWtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSAodGhpcy5wYW5uZWwuaW5uZXJUZXh0IHx8IHRoaXMucGFubmVsLnRleHRDb250ZW50KS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkaXRvcl9pbnB1dCcsIGlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMS7lj5HlsIRpbm5lckhUTUwsaW5wdXTkuovku7bmjqXmlLZcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgLy8gMi7op6blj5FuZ01vZGVsQ2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoaW5uZXJIVE1MKTtcclxuICAgICAgICB9LCBhcmcwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWwhOe8lui+keWGheWuuVxyXG4gICAgICovXHJcbiAgICBlbWl0Q29udGVudCgpIHtcclxuICAgICAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICAgICAgY29uc3QgZWRpdFBhbm5lbCA9IHRoaXMucGFubmVsIGFzIGFueTtcclxuICAgICAgICAvLyDmo4DmtYvnvJbovpHlhoXlrrnlpKflsI9cclxuICAgICAgICBsZXQgaW5uZXJIVE1MOiBzdHJpbmcgPSBlZGl0UGFubmVsLmlubmVySFRNTDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5uZXJIVE1MLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSBpbm5lckhUTUwuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgaWYgKGMgPiAwICYmIGMgPCAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgKz0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2l6ZSA+IHRoaXMub3B0aW9ucyQubWF4c2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfnvJbovpHlhoXlrrnotoXlh7rlpKflsI9+Jyk7XHJcbiAgICAgICAgICAgIGlubmVySFRNTCA9IGlubmVySFRNTC5zdWJzdHIoMCwgdGhpcy5vcHRpb25zJC5tYXhzaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmdldFVybHNCeVRhZyh0aGlzLnBhbm5lbCwgJ2ltZycpO1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICdhdWRpbycpO1xyXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICd2aWRlbycpO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICBpbm5lclRFWFQ6IGVkaXRQYW5uZWwuaW5uZXJUZXh0IHx8IGVkaXRQYW5uZWwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgICAgIHVybHM6IHsgaW1hZ2UsIGF1ZGlvLCB2aWRlbyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlY2lldmVDb250ZW50LmVtaXQob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJvuebruagh+WFg+e0oOeahOeahOafkOS4quagh+etvueahHVybHPlkoxiYXNlNjTnmoR1cmxcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gdGFnIOagh+etvlxyXG4gICAgICovXHJcbiAgICBnZXRVcmxzQnlUYWcodGFyZ2V0OiBIVE1MRWxlbWVudCwgdGFnOiBzdHJpbmcpOiB7IHR5cGU6ICd1cmwnIHwgJ2Jhc2U2NCcsIHNyYzogc3RyaW5nIH1bXSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gW10gYXMgYW55O1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGFncywgZWxlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7fSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNyYyA9IGVsZW0uc3JjO1xyXG4gICAgICAgICAgICBpZiAoc3JjLmluZGV4T2YoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9ICd1cmwnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID0gJ2Jhc2U2NCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3ojIPlm7RSYW5nZeaYr+WQpuWSjOS7o+eggeWMuuacieS6pOmbhlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSAtIOacieS6pOmbhu+8jGZhbHNlIC0g5peg5Lqk6ZuGXHJcbiAgICAgKi9cclxuICAgIGlzUmFuZ2VJbkNvZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5wYW5uZWxGb2N1cygpO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkgYXMgYW55O1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIC8vIOWmguaenOaYr+aWh+acrOiKgueCueWImeaJvuWFtueItuWFg+e0oFxyXG4gICAgICAgIGlmIChwYXJlbnQubm9kZVR5cGUgPT09IDMpIHsgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7IH1cclxuICAgICAgICByZXR1cm4gKCgpID0+IHsgLy8g6KKr5YyF5ZCrXHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQkID0gcGFyZW50O1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbmRpdGlvbmFsLWFzc2lnbm1lbnRcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCQgPSBwYXJlbnQkLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQkLnRhZ05hbWUgPT09ICdDT0RFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCQgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KSgpIHx8ICgoKSA9PiB7IC8vIOWMheWQq1xyXG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlcyAmJiBub2Rlcy5sZW5ndGg7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRvYXN05o+Q56S6XHJcbiAgICAgKiBAcGFyYW0gIHRleHQ/IHRvYXN05o+Q56S6IOm7mOiupOS4uuKAmOiuvue9ruaXoOaViH7igJlcclxuICAgICAqIEBwYXJhbSAgZHVyYXRpb24/IOWBnOeVmeaXtumXtFxyXG4gICAgICovXHJcbiAgICB0b2FzdCh0ZXh0OiBzdHJpbmcgPSAn6K6+572u5peg5pWIficsIG9iaj86IHsgZHVyYXRpb246IG51bWJlciwgZW50ZXI6IG51bWJlciwgbGVhdmU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS50b3N0KHsgdGV4dCwgLi4ub2JqIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by556qXXHJcbiAgICAgKi9cclxuICAgIGFsZXJ0KG9iajogV2luZG93T3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNlcnZpY2UuYWxlcnQob2JqKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLLmipZcclxuICAgICAqIEBwYXJhbSAgZiDlm57osINcclxuICAgICAqIEBwYXJhbSAgdD8g6Ziy5oqW5pe25bu2IOm7mOiupDMwMG1zXHJcbiAgICAgKi9cclxuICAgIGRlYm91bmNlKGY6ICgpID0+IHZvaWQsIHQ6IG51bWJlciA9IDMwMCkge1xyXG4gICAgICAgIGNvbnN0IG8gPSB0aGlzLmRlYm91bmNlIGFzIGFueTtcclxuICAgICAgICBjbGVhclRpbWVvdXQoby50aW1lcik7XHJcbiAgICAgICAgby50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmKCk7XHJcbiAgICAgICAgfSwgdCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==