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
import { Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// 窗体弹窗
import { UILinkComponent } from "./ui-link/ui-link"; // 超链接UI组件
// 超链接UI组件
import { UITableComponent } from "./ui-table/ui-table"; // 表格UI组件
// 表格UI组件
import { UIAnnexComponent } from "./ui-annex/ui-annex"; // 附件UI组件
// 附件UI组件
import { DomService } from './service/DomService'; // dom提供商
// dom提供商
import CommonUtil from "./util/CommonUtil"; // dom工具类
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
        this.fontFamilys = [{ key: "arial", value: "arial" }, { key: "微软雅黑", value: "Microsoft Yahei" }, { key: "宋体", value: "SimSun" }, { key: "黑体", value: "SimHei" }, { key: "楷体", value: "KaiTi" }, { key: "宋体", value: "SimSun" }, { key: "新宋体", value: "NSimSun" }, { key: "仿宋", value: "FangSong" }, { key: "微软正黑体", value: "Microsoft JhengHei" }, { key: "华文琥珀", value: "STHupo" }, { key: "华文彩云", value: "STCaiyun" }, { key: "幼圆", value: "YouYuan" }, { key: "华文行楷", value: "STXingkai" }];
        /**
         * 文本格式
         */
        this.formatBlocks = [{ key: "p", value: '<p data-index="0">p</p>' }, { key: "h6", value: '<h6 data-index="1">h6</h6>' }, { key: "h5", value: '<h5 data-index="2">h5</h5>' }, { key: "h4", value: '<h4 data-index="3">h4</h4>' }, { key: "h3", value: '<h3 data-index="4">h3</h3>' }, { key: "h2", value: '<h2 data-index="5">h2</h2>' }, { key: "h1", value: '<h1 data-index="6">h1</h1>' }];
        /**
         * 颜色
         */
        this.colors = [["#ffffff", "#000000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646"], ["#f2f2f2", "#7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada"], ["#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5"], ["#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f"], ["#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09"], ["#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"], ["#c00000", "#ff0000", "#ffc000", "#ffff00", "#92d050", "#00b050", "#00b0f0", "#0070c0", "#002060", "#7030a0"]];
        /**
         * 字体大小
         */
        this.fontSizes = [{ key: "xx-small", value: "1", value$: 9 / 16 }, { key: "x-small", value: "2", value$: 10 / 16 }, { key: "small", value: "3", value$: 'inherit' /** 13/16调整为“继承” */ }, { key: "medium", value: "4", value$: 16 / 16 }, { key: "large", value: "5", value$: 18 / 16 }, { key: "x-large", value: "6", value$: 24 / 16 }, { key: "xx-large", value: "7", value$: 32 / 16 }];
        /**
         * code
         */
        this.codes = ['Html', 'Css', 'Js', 'TypeScript', 'Sass', 'Java', 'Xml', 'Sql', 'Shell'];
        /**
         * 选中的字样
         */
        this.fontFamily = { key: "微软雅黑", value: "Microsoft Yahei" };
        /**
         * 选中的字号
         */
        this.fontSize = { key: "small", value: 3 }; // 默认1rem;
        // 默认1rem;
        /**
         * 文本格式
         */
        this.formatBlock = "p";
        /**
         * 字体颜色
         */
        this.foreColor = "black";
        /**
         * 高亮色
         */
        this.backColor = "white";
        /**
         * 当前代码语言
         */
        this.code = 'Js';
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
     * @param {?} e
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
        this.cmd("fontName", false, this.fontFamily.value);
        this.cmd("foreColor", false, this.foreColor);
        this.cmd("backColor", false, this.backColor);
        this.cmd('fontSize', false, this.fontSize.value);
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
        const index = t.getAttribute("data-index");
        this.switchFontFamilyPannel = !this.switchFontFamilyPannel;
        if (index === null || index === undefined) {
            return;
        }
        this.fontFamily = this.fontFamilys[index * 1];
        this.cmd("fontName", false, this.fontFamily.value);
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
        const index = t.getAttribute("data-index");
        this.switchFontSizePannel = !this.switchFontSizePannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const fontSize = this.fontSizes[index * 1];
        this.fontSize = fontSize;
        this.cmd("fontSize", false, fontSize.value);
        this.adjustFontSizeWithStyle((/** @type {?} */ (fontSize)));
    }
    /**
     * 调整字体大小
     * @param {?} fontSize
     * @return {?}
     */
    adjustFontSizeWithStyle(fontSize) {
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
        const index = t.getAttribute("data-index");
        this.switchFormatBlockPannel = !this.switchFormatBlockPannel;
        if (index === null || index === undefined) {
            return;
        }
        /** @type {?} */
        const formatBlock = this.formatBlocks[index * 1];
        this.formatBlock = formatBlock.key;
        this.cmd("formatBlock", false, "<" + this.formatBlock + ">");
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
        const x = t.getAttribute("data-dim1");
        /** @type {?} */
        const y = t.getAttribute("data-dim2");
        this.switchForeColorPannel = !this.switchForeColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.foreColor = this.colors[x][y];
        this.cmd("foreColor", false, this.foreColor);
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
        const x = t.getAttribute("data-dim1");
        /** @type {?} */
        const y = t.getAttribute("data-dim2");
        this.switchBackColorPannel = !this.switchBackColorPannel;
        if (x === null || y == null) {
            return;
        }
        this.backColor = this.colors[x][y];
        this.cmd("backColor", false, this.backColor);
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
        this.cmd("bold", false, "");
    }
    /**
     * 设置斜体
     * @param {?} e
     * @return {?}
     */
    switchItalic(e) {
        this.ensureFocus(e);
        this.cmd("italic", false, "");
    }
    /**
     * 设置下划线
     * @param {?} e
     * @return {?}
     */
    switchUnderline(e) {
        this.ensureFocus(e);
        this.cmd("underline", false, "");
    }
    /**
     * 设置删除线
     * @param {?} e
     * @return {?}
     */
    switchStrikeThrough(e) {
        this.ensureFocus(e);
        this.cmd("strikeThrough", false, "");
    }
    /**
     * 设置/取消上标
     * @param {?} e
     * @return {?}
     */
    superscript(e) {
        this.ensureFocus(e);
        this.cmd("superscript", false, "");
    }
    /**
     * 设置/取消下标
     * @param {?} e
     * @return {?}
     */
    subscript(e) {
        this.ensureFocus(e);
        this.cmd("subscript", false, "");
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
        this.cmd("indent", false, "");
    }
    /**
     * 减少缩进
     * @param {?} e
     * @return {?}
     */
    outdent(e) {
        this.ensureFocus(e);
        this.cmd("outdent", false, "");
    }
    /**
     * 插入有序列表
     * @param {?} e
     * @return {?}
     */
    insertOrderedList(e) {
        this.ensureFocus(e);
        this.cmd("insertOrderedList", false, "");
    }
    /**
     * 插入无序列表
     * @param {?} e
     * @return {?}
     */
    insertUnorderedList(e) {
        this.ensureFocus(e);
        this.cmd("insertUnorderedList", false, "");
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
        this.alert({ title: "插入表格", animation: "scale", content: UITableComponent, handler: this, theme: this.theme });
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
        this.alert({ title: "插入链接", animation: "scale", content: UILinkComponent, handler: this, theme: this.theme });
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
        this.alert({ title: "插入文件", animation: "scale", content: UIAnnexComponent, handler: this, theme: this.theme });
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
        this.cmd("insertHorizontalRule", false, "");
    }
    /**
     * 粘贴
     * @param {?} e
     * @return {?}
     */
    paste(e) {
        this.ensureFocus(e);
        this.cmd("paste", false, "");
    }
    /**
     * 剪切
     * @param {?} e
     * @return {?}
     */
    cut(e) {
        this.ensureFocus(e);
        this.cmd("cut", false, "");
    }
    /**
     * 复制
     * @param {?} e
     * @return {?}
     */
    copy(e) {
        this.ensureFocus(e);
        this.cmd("copy", false, "");
    }
    /**
     * 选中所有
     * @param {?} e
     * @return {?}
     */
    selectAll(e) {
        this.ensureFocus(e);
        this.cmd("selectAll", false, "");
    }
    /**
     * 重做
     * @param {?} e
     * @return {?}
     */
    redo(e) {
        this.ensureFocus(e);
        this.cmd("redo", false, "");
    }
    /**
     * 撤销
     * @param {?} e
     * @return {?}
     */
    undo(e) {
        this.ensureFocus(e);
        this.cmd("undo", false, "");
    }
    /**
     * 删除选中
     * @param {?} e
     * @return {?}
     */
    deleteSelect(e) {
        this.ensureFocus(e);
        this.cmd("delete", false, "");
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
        this.cmd("removeFormat", false);
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
        const r = document.execCommand(k, ui, v || "");
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
     * 在编辑面板中粘贴
     * @param {?} e
     * @return {?}
     */
    pannelOnPaste(e) {
        if (!this.isRangeInCode()) {
            return;
        }
        /** @type {?} */
        const obj = (/** @type {?} */ (CommonUtil.isIE())) ? window : e;
        if (!obj.clipboardData) {
            return;
        }
        /** @type {?} */
        const text = obj.clipboardData.getData("text")
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
        /** @type {?} */
        const p = document.createElement('P');
        p.innerHTML = text;
        CursorUtil.insertNode(p);
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
    fontSize: { key: "small", value: "3" },
    fontFamily: { key: "微软雅黑", value: "Microsoft Yahei" }
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
                styles: ["@charset \"UTF-8\";a,a:after,a:before,audio,div,div:after,div:before,h1,h2,h3,h4,h5,h6,i,i:after,i:before,img,li,li:after,li:before,ol,p,pre,span,span:after,span:before,table,ul,video{-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}em,i{font-style:italic}table{border-collapse:collapse;border-spacing:0}img{border:none;height:auto;vertical-align:middle;width:100%}a:active,a:hover,a:link,a:visited{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:#000;cursor:pointer;text-decoration:none;user-select:none}hr{background-color:#e1e1e1;border:0;color:#000;height:1PX;margin:0;*margin:0}li,ul{list-style-type:none}button,input[type=button],input[type=reset],input[type=submit]{-moz-appearance:button;-ms-appearance:button;-o-appearance:button;-webkit-appearance:button;appearance:button;border:none}button,button:focus,input,input:focus{background-color:#fff;outline:none;outline-style:none}input{border:1px solid #e6e6e6}::-ms-clear,::-ms-reveal{display:none}input:-ms-clear,input:-ms-reveal{display:none}[tappable]{-ms-touch-action:manipulation;cursor:pointer;touch-action:manipulation}.z-editor-icomoon,[class*=\" icon-\"],[class^=icon-]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:z-editor-icomoon!important;font-size:.75rem;font-style:normal;font-variant:normal;font-weight:400;line-height:.75rem;line-height:1;speak:never;text-transform:none}@font-face{font-display:block;font-family:z-editor-icomoon;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64,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\") format(\"woff\")}.icon-square-m:before{content:\"\uE911\"}.icon-link:before{content:\"\uF0C1\"}.icon-caret-down:before{content:\"\uF0D7\"}.icon-unlink:before{content:\"\uF127\"}.icon-select_all:before{content:\"\uE904\"}.icon-copy:before{content:\"\uE93A\"}.icon-undo:before{content:\"\uE967\"}.icon-redo:before{content:\"\uE968\"}.icon-clipboard:before{content:\"\uE9E2\"}.icon-list-numbered:before{content:\"\uE9F3\"}.icon-list2:before{content:\"\uE9FC\"}.icon-scissors-bold:before{content:\"\uEA5A\"}.icon-bold:before{content:\"\uEA62\"}.icon-underline:before{content:\"\uEA63\"}.icon-italic:before{content:\"\uEA64\"}.icon-strikethrough:before{content:\"\uEA65\"}.icon-page-break:before{content:\"\uEA68\"}.icon-clear-formatting:before{content:\"\uEA6F\"}.icon-table:before{content:\"\uEA71\"}.icon-paragraph-left:before{content:\"\uEA77\"}.icon-paragraph-center:before{content:\"\uEA78\"}.icon-paragraph-right:before{content:\"\uEA79\"}.icon-paragraph-justify:before{content:\"\uEA7A\"}.icon-indent-increase:before{content:\"\uEA7B\"}.icon-indent-decrease:before{content:\"\uEA7C\"}.icon-embed:before{content:\"\uEA80\"}.icon-arrow-down:before{content:\"\uE90A\"}.icon-database:before{content:\"\uE94C\"}.icon-loader:before{content:\"\uE981\"}.icon-maximize:before{content:\"\uE989\"}.icon-minimize:before{content:\"\uE990\"}.icon-upload-cloud:before{content:\"\uE9E4\"}.icon-x-square:before{content:\"\uE9F9\"}.icon-smile-o:before{content:\"\uF118\"}.icon-font-color:before{content:\"\uF031\"}.icon-pencil:before{content:\"\uF040\"}.icon-check-circle-thin:before{content:\"\uF058\"}.icon-square-o:before{content:\"\uF096\"}.icon-superscript:before{content:\"\uF12B\"}.icon-subscript:before{content:\"\uF12C\"}.icon-eraser:before{content:\"\uF12D\"}.icon-check-square:before{content:\"\uF14A\"}.icon-circle-thin:before{content:\"\uF1DB\"}.z-editor-alert .wd-content,.z-editor-alert .wd-mask{height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999}.z-editor-alert .wd-content{overflow:auto}#z-editor-tip .wd-tip,#z-editor-tip .wd-tip-for-scale{background-color:#333;border-radius:.3rem;color:#fff;filter:alpha(opacity=70);font-size:.75rem;left:50%;line-height:1;max-width:12rem;opacity:.7;padding:.7rem .8rem;position:fixed;text-align:center;z-index:9999999}#z-editor-tip .wd-tip{transform:translateX(-50%)}#z-editor-tip .trans1-enter{top:100%}#z-editor-tip .trans1-active{top:40%}#z-editor-tip .trans1-leave{top:100%}#z-editor-tip .trans2-enter{top:-100%}#z-editor-tip .trans2-active{top:40%}#z-editor-tip .trans2-leave{top:-100%}#z-editor-tip .scale-enter{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .scale-active{filter:alpha(opacity=70);opacity:.7;top:50%;transform:translate(-50%,-50%) scale(1)}#z-editor-tip .scale-leave{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .icon-loader{-webkit-animation:myloading 1s infinite forwards;animation:myloading 1s infinite forwards;display:inline-block}@-webkit-keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}#z-editor-window .wd-mask{background-color:#3a3434;filter:alpha(opacity=20);opacity:.2}#z-editor-window .wd-window{background-color:#fff;border-radius:.3rem;position:absolute;z-index:99999}#z-editor-window .wd-window-tool{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:#f4f4f4;border-radius:.3rem .3rem 0 0;cursor:pointer;line-height:2rem;user-select:none}#z-editor-window .wd-window-tool h3{float:left;font-size:1rem;padding-left:.7rem}#z-editor-window .wd-window-tool p{float:right;padding-right:.7rem}#z-editor-window .wd-window-tool .z-editor-icomoon{cursor:pointer;font-size:1rem;line-height:2rem}#z-editor-window .wd-window-tool:after{clear:both;content:\"\";display:block}#z-editor-window .wd-window-pannel{overflow:auto;padding:.7rem}#z-editor-window .trans1-enter{top:100%}#z-editor-window .trans1-active{top:20%}#z-editor-window .trans1-leave{top:100%}#z-editor-window .trans2-enter{top:-100%}#z-editor-window .trans2-active{top:20%}#z-editor-window .trans2-leave{top:-100%}#z-editor-window .scale-enter{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}#z-editor-window .scale-active{filter:alpha(opacity=100);opacity:1;top:20%;transform:scale(1)}#z-editor-window .scale-leave{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}.z-editor-checkbox{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;width:1rem}.z-editor-checkbox input{display:none}.z-editor-checkbox .z-editor-icomoon{cursor:pointer;font-size:1rem;vertical-align:middle}.z-editor-checkbox .wd-checkbox-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-checkbox .icon-check-square{color:#fa6464}.p .z-editor-checkbox .icon-check-square{color:#00c}.b .z-editor-checkbox .icon-check-square{color:#3b86cc}.g .z-editor-checkbox .icon-check-square{color:#19a519}.z-editor-radios{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.z-editor-radios .input-radio{display:none}.z-editor-radios .z-editor-icomoon{cursor:pointer;font-size:1rem}.z-editor-radios .z-editor-icomoon,.z-editor-radios span{line-height:1;vertical-align:middle}.z-editor-radios .wd-radio-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-radios .icon-check-circle-thin{color:#fa6464}.p .z-editor-radios .icon-check-circle-thin{color:#00c}.b .z-editor-radios .icon-check-circle-thin{color:#3b86cc}.g .z-editor-radios .icon-check-circle-thin{color:#19a519}.z-editor-link{color:grey;padding:0 1rem}.z-editor-link li{line-height:2.5rem}.z-editor-link li label{font-size:.875rem}.z-editor-link li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:20rem}.z-editor-link .wd-btn-group{text-align:right}.z-editor-link .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-link button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-link button:last-child{background-color:#fa6464}.p .z-editor-link button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-link button:last-child{background-color:#00c}.b .z-editor-link button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-link button:last-child{background-color:#3b86cc}.g .z-editor-link button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-link button:last-child{background-color:#19a519}.z-editor-table{color:grey;padding:0 1rem}.z-editor-table li{line-height:2rem}.z-editor-table li label{font-size:.875rem}.z-editor-table li input{border-radius:.2rem;height:1.5rem;margin-left:1rem;padding:0 .5rem;width:4rem}.z-editor-table .wd-btn-group{margin-top:.5rem;text-align:center}.z-editor-table .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-table button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-table button:last-child{background-color:#fa6464}.p .z-editor-table button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-table button:last-child{background-color:#00c}.b .z-editor-table button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-table button:last-child{background-color:#3b86cc}.g .z-editor-table button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-table button:last-child{background-color:#19a519}.z-editor-annex{color:grey;padding:0 1rem}.z-editor-annex .wd-edit-file{display:none}.z-editor-annex li{line-height:2.5rem}.z-editor-annex li>label{display:inline-block;font-size:.875rem}.z-editor-annex li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:17rem}.z-editor-annex .wd-radio-group-type{margin-left:1rem}.z-editor-annex .wd-radio-group-type label{margin-right:1.5rem}.z-editor-annex .wd-radio-group-type label::nth-child(3){margin-right:none}.z-editor-annex .wd-upload-local,.z-editor-annex .wd-use-link-confirm{border-radius:.3rem;color:#fff;cursor:pointer;font-weight:700;line-height:2.2rem;width:100%}.z-editor-annex .wd-upload-local{vertical-align:middle}.z-editor-annex .wd-upload-local .z-editor-icomoon{font-size:1rem;line-height:2.2rem}.z-editor-annex .wd-use-link-confirm{margin:.5rem 0}.r .z-editor-annex .wd-upload-local{background-color:#ef6ea8}.r .z-editor-annex .wd-use-link-confirm{background-color:#fa6464}.p .z-editor-annex .wd-upload-local{background-color:#5a06f5}.p .z-editor-annex .wd-use-link-confirm{background-color:#00c}.b .z-editor-annex .wd-upload-local{background-color:#00aeef}.b .z-editor-annex .wd-use-link-confirm{background-color:#3b86cc}.g .z-editor-annex .wd-upload-local{background-color:#0ebd0e}.g .z-editor-annex .wd-use-link-confirm{background-color:#19a519}.z-editor{background-color:#fff;text-align:left}.z-editor .fn-clearfix:after{clear:both;content:\"\";display:block;height:0;width:0}.z-editor .wd-editor-bar{border-bottom:1px solid #e6e6e6;border-top:1px solid #e6e6e6;font-size:.875rem;padding:.5rem 0 0}.z-editor .wd-edit-link-box{float:left;position:relative}.z-editor .wd-edit-link{border-radius:.2rem;cursor:pointer;display:inline-block;height:1.7rem;line-height:1.7rem;padding:0 .5rem;position:relative;text-align:center}.z-editor .wd-edit-link:hover{background-color:#e6e6e6}.z-editor .wd-edit-link:hover:before{border:.2rem solid transparent;border-bottom-color:#222;content:\"\";top:1.6rem}.z-editor .wd-edit-link:hover:after,.z-editor .wd-edit-link:hover:before{display:block;left:50%;opacity:.8;position:absolute;transform:translateX(-50%);z-index:1}.z-editor .wd-edit-link:hover:after{background-color:#222;border-radius:.3rem;color:#fff;content:attr(data-tip);font-size:.75rem;padding:0 .4rem;top:2rem;white-space:nowrap}.z-editor .wd-edit-link .z-editor-icomoon{font-size:.875rem}.z-editor .fontName .wd-edit-link{text-align:left;width:6.2rem}.z-editor .fontName .wd-edit-link .icon-caret-down{display:inline-block;line-height:1.7rem;position:absolute;right:.6rem}.z-editor .fontSize .wd-edit-link{width:6rem}.z-editor .formatBlock .wd-edit-link{width:3rem}.z-editor .wd-edit-link-active{background-color:#e6e6e6}.z-editor .backColor i,.z-editor .fontSize i,.z-editor .foreColor i,.z-editor .formatBlock i{margin-left:.5rem}.z-editor .wd-code-list,.z-editor .wd-font-name-list,.z-editor .wd-font-size-list,.z-editor .wd-format-block-list{background-color:#222;border-radius:.3rem;color:#fff;position:absolute;top:1.6rem;z-index:4}.z-editor .wd-code-list a,.z-editor .wd-font-name-list a,.z-editor .wd-font-size-list a,.z-editor .wd-format-block-list a{border-radius:.3rem;color:#fff;display:inline-block;padding:.2rem .5rem;width:100%}.z-editor .wd-code-list a:hover,.z-editor .wd-font-name-list a:hover,.z-editor .wd-font-size-list a:hover,.z-editor .wd-format-block-list a:hover{background-color:#444}.z-editor .wd-color-list{background-color:#fff;border:1px solid #f4f4f4;border-radius:.3rem;padding:.3rem;position:absolute;top:1.6rem;width:16.8rem;z-index:4}.z-editor .wd-color-list .wd-tr{height:1.6rem}.z-editor .wd-color-list .wd-td{float:left;height:1.2rem;margin:.2rem;position:relative;width:1.2rem}.z-editor .wd-color-list a{border-radius:.1rem;display:block;left:0;padding:.6rem;position:absolute;top:0}.z-editor .wd-color-list a:hover{left:-.1rem;padding:.7rem;top:-.1rem}.z-editor .wd-font-name-list{width:8rem}.z-editor .wd-font-size-list{width:10rem}.z-editor .wd-format-block-list{width:3rem}.z-editor .wd-code-list{width:6rem}.z-editor .backColor .icon-pencil,.z-editor .foreColor .icon-font-color{border-bottom:2px solid transparent;display:inline-block}.z-editor .wd-deitor-content{font-size:.75rem;max-height:15rem;min-height:8rem;outline:none;overflow:auto;padding:.6rem}.z-editor .wd-deitor-content font[size=\"3\"]{font-size:.75rem!important}.z-editor .wd-deitor-content div,.z-editor .wd-deitor-content p{word-break:break-all}.z-editor .wd-deitor-content ol,.z-editor .wd-deitor-content ul{list-style-position:inside}.z-editor .wd-deitor-content ul li{list-style-type:disc}.z-editor .wd-deitor-content ol li{list-style-type:decimal}.z-editor .wd-deitor-content a{text-decoration:underline}.z-editor .wd-deitor-content table{width:100%}.z-editor .wd-deitor-content td{border:1px solid grey;min-width:4rem;padding:.5rem;word-break:break-all;word-wrap:break-word}.z-editor .wd-deitor-content pre{border-radius:.3rem;overflow:auto;padding:.5rem .2rem;white-space:pre}.z-editor .wd-edit-footer{padding:.5rem}.z-editor .wd-edit-footer-btn{float:right}.z-editor .wd-edit-footer-btn button{border-radius:.3rem;color:#fff;line-height:1.5rem;padding:0 .5rem}.r .z-editor .wd-code-list a:hover,.r .z-editor .wd-font-name-list a:hover,.r .z-editor .wd-font-size-list a:hover,.r .z-editor .wd-format-block-list a:hover{color:#ef6ea8}.r .z-editor .wd-deitor-content a{color:#fa6464}.r .z-editor .wd-deitor-content pre{background-color:#f1e9e9;color:#ef6ea8}.r .z-editor .wd-edit-footer-btn button{background-color:#ef6ea8}.p .z-editor .wd-code-list a:hover,.p .z-editor .wd-font-name-list a:hover,.p .z-editor .wd-font-size-list a:hover,.p .z-editor .wd-format-block-list a:hover{color:#5a06f5}.p .z-editor .wd-deitor-content a{color:#00c}.p .z-editor .wd-deitor-content pre{background-color:#e6ebf3;color:#5a06f5}.p .z-editor .wd-edit-footer-btn button{background-color:#5a06f5}.b .z-editor .wd-code-list a:hover,.b .z-editor .wd-font-name-list a:hover,.b .z-editor .wd-font-size-list a:hover,.b .z-editor .wd-format-block-list a:hover{color:#00aeef}.b .z-editor .wd-deitor-content a{color:#3b86cc}.b .z-editor .wd-deitor-content pre{background-color:#e2f0f3;color:#00aeef}.b .z-editor .wd-edit-footer-btn button{background-color:#00aeef}.g .z-editor .wd-code-list a:hover,.g .z-editor .wd-font-name-list a:hover,.g .z-editor .wd-font-size-list a:hover,.g .z-editor .wd-format-block-list a:hover{color:#0ebd0e}.g .z-editor .wd-deitor-content a{color:#19a519}.g .z-editor .wd-deitor-content pre{background-color:#e0f3e8;color:#0ebd0e}.g .z-editor .wd-edit-footer-btn button{background-color:#0ebd0e}"]
            }] }
];
/** @nocollapse */
AppZeditorComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: DomService }
];
AppZeditorComponent.propDecorators = {
    vhtml: [{ type: Input }],
    onInput: [{ type: Output }],
    hasBtn: [{ type: Input }],
    recieveContent: [{ type: Output }],
    options: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9uZy16ZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXpFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFNLFVBQVU7O0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDLENBQUcsU0FBUzs7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUMsQ0FBRyxTQUFTOztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUMsQ0FBUSxTQUFTOztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFlLFNBQVM7O0FBQ25FLE9BQU8sVUFBVSxNQUFNLG1CQUFtQixDQUFDLENBQWUsUUFBUTs7Ozs7QUFHbEUsc0JBc0JDOzs7Ozs7SUFwQkcsMEJBQWdCOzs7OztJQUVoQiwwQkFBZ0I7Ozs7O0lBRWhCLHdCQUtFOzs7OztJQUVGLHdCQUdFOzs7OztJQUVGLHdCQUdFOztBQWNOLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBeUg1QixZQUNZLE9BQWtCLEVBQ2xCLFVBQXNCO1FBRHRCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQXpIekIsVUFBSyxHQUFHLGVBQWUsQ0FBQzs7UUFFdkIsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBRTVELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDOzs7O1FBR3RFLGFBQVEsR0FBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Ozs7UUFNeEgsVUFBSyxHQUEwQixHQUFHLENBQUM7Ozs7UUFFbEMsZUFBVSxHQUFxQixJQUFJLFlBQVksRUFBTSxDQUFDOzs7O1FBZ0RoRSxnQkFBVyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQzs7OztRQUUxZCxpQkFBWSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7Ozs7UUFFeFgsV0FBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O1FBRTF4QixjQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdB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TWxGLHdDQUFrRjs7SUFLbEYsd0NBQWtGOztJQUlsRiwwQ0FBc0Y7O0lBSXRGLDBDQUFzRjs7SUFJdEYsNkNBQTRGOztJQUk1RiwyQ0FBd0Y7O0lBSXhGLDJDQUF3Rjs7SUFJeEYsc0NBQThFOzs7OztJQUs5RSwwQ0FBMGQ7Ozs7O0lBRTFkLDJDQUF3WDs7Ozs7SUFFeFgscUNBQTB4Qjs7Ozs7SUFFMXhCLHdDQUFzWDs7Ozs7SUFFdFgsb0NBQW1GOzs7OztJQUVuRix5Q0FBNEQ7Ozs7O0lBRTVELHVDQUEyQzs7Ozs7SUFFM0MsMENBQWtCOzs7OztJQUVsQix3Q0FBb0I7Ozs7O0lBRXBCLHdDQUFvQjs7Ozs7SUFFcEIsbUNBQVk7Ozs7O0lBRVoscURBQXdDOzs7OztJQUV4QyxtREFBc0M7Ozs7O0lBRXRDLHNEQUF5Qzs7Ozs7SUFFekMsb0RBQXVDOzs7OztJQUV2QyxvREFBdUM7Ozs7O0lBRXZDLCtDQUFrQzs7Ozs7SUFFbEMsNENBQThCOzs7OztJQUU5Qiw2Q0FBZ0M7Ozs7O0lBRWhDLG9DQUFXOzs7OztJQUVYLG1DQUFzQjs7Ozs7SUFFdEIscUNBQXFCOztJQVVyQix1Q0FBbUQ7O0lBQ25ELHdDQUF3Qzs7Ozs7SUFHcEMsc0NBQTBCOzs7OztJQUMxQix5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiDnvJbovpHlmajnu4Tku7ZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6Mzc6MjMgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBPbkluaXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgV2luZG93T3B0aW9ucyB9IGZyb20gXCIuL19hbGVydC93aW5kb3cvd2luZG93XCI7ICAgLy8g56qX5L2T5by556qXXHJcbmltcG9ydCB7IFVJTGlua0NvbXBvbmVudCB9IGZyb20gXCIuL3VpLWxpbmsvdWktbGlua1wiOyAgICAgIC8vIOi2hemTvuaOpVVJ57uE5Lu2XHJcbmltcG9ydCB7IFVJVGFibGVDb21wb25lbnQgfSBmcm9tIFwiLi91aS10YWJsZS91aS10YWJsZVwiOyAgIC8vIOihqOagvFVJ57uE5Lu2XHJcbmltcG9ydCB7IFVJQW5uZXhDb21wb25lbnQgfSBmcm9tIFwiLi91aS1hbm5leC91aS1hbm5leFwiOyAgIC8vIOmZhOS7tlVJ57uE5Lu2XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvRG9tU2VydmljZSc7ICAgICAgICAvLyBkb23mj5DkvpvllYZcclxuaW1wb3J0IENvbW1vblV0aWwgZnJvbSBcIi4vdXRpbC9Db21tb25VdGlsXCI7ICAgICAgICAgICAgICAgLy8gZG9t5bel5YW357G7XHJcbmltcG9ydCBDdXJzb3JVdGlsIGZyb20gJy4vdXRpbC9DdXJzb3JVdGlsJzsgICAgICAgICAgICAgICAvLyDlhYnmoIflt6XlhbfnsbtcclxuXHJcbi8qKiDnvJbovpHlmajphY3nva7lj4LmlbAgKi9cclxuaW50ZXJmYWNlIE9wdGlvbnMge1xyXG4gICAgLyoqIOe8lui+keWGheWuueeahOacgOWkp+Wtl+iKguaVsCAqL1xyXG4gICAgbWF4c2l6ZTogbnVtYmVyO1xyXG4gICAgLyoqIOS4iuS8oOi2heaXtiBtcyAqL1xyXG4gICAgdGltZW91dDogbnVtYmVyO1xyXG4gICAgLyoqIOS4iuS8oOWbvueJh+eahOmFjee9ruWPguaVsCAqL1xyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn5Zu+54mH5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgICAgICAvKiog5bCP5LqO5oyH5a6a5a2X6IqC5pWw5Lya6L+b6KGMYmFzZTY057yW56CBICovXHJcbiAgICAgICAgYmFzZTY0OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS4iuS8oOinhumikeeahOmFjee9ruWPguaVsCAqL1xyXG4gICAgdmlkZW86IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn6KeG6aKR5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICAvKiog5LiK5Lyg6Z+z6aKR55qE6YWN572u5Y+C5pWwICovXHJcbiAgICBtdXNpYzoge1xyXG4gICAgICAgIC8qKiDkuIrkvKDnmoTmnIDlpKfpn7PpopHmlbDph48gKi9cclxuICAgICAgICBjb3VudDogbnVtYmVyO1xyXG4gICAgfTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC16ZWRpdG9yJyxcclxuICAgIHN0eWxlVXJsczogWycuL25nLXplZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZy16ZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW3tcclxuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBcHBaZWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBaZWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XHJcbiAgICAvKiog5Lyg5YWl55qEaHRtbCAqL1xyXG4gICAgQElucHV0KCkgdmh0bWwgPSAnPHA+6K+36L6T5YWl5YaF5a65fjwvcD4nO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1vdXRwdXQtb24tcHJlZml4XHJcbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIC8qKiDmmK/lkKbmnInmjInpkq4gKi9cclxuICAgIEBJbnB1dCgpIGhhc0J0biA9IGZhbHNlO1xyXG4gICAgQE91dHB1dCgpIHJlY2lldmVDb250ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAvKiog5Y+C5pWw6YWN572uICovXHJcbiAgICBvcHRpb25zJDogYW55ID0geyBtYXhzaXplOiA2NTUzNSwgdGltZW91dDogMTAwMDAsIGltYWdlOiB7IGNvdW50OiA1LCBiYXNlNjQ6IDYwMDAwIH0sIGF1ZGlvOiB7IGNvdW50OiAxIH0sIHZpZGVvOiB7IGNvdW50OiAxIH0gfTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgb3B0aW9ucyh2OiBhbnkpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucyQsIHYpO1xyXG4gICAgfVxyXG4gICAgLyoqIOS4u+mimCAqL1xyXG4gICAgQElucHV0KCkgdGhlbWU6ICdyJyB8ICdwJyB8ICdiJyB8ICdnJyA9ICdnJztcclxuICAgIC8qKiDkuIrkvKDmlofku7YgKi9cclxuICAgIEBPdXRwdXQoKSB1cGxvYWRGaWxlOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcjx7fT4oKTtcclxuICAgIC8qKiDnvJbovpHmnaHop4blm77lvJXnlKggKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlclJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGhlYWRlclJlZjogRWxlbWVudFJlZjtcclxuICAgIC8qKiDnvJbovpHmnaEgKi9cclxuICAgIGdldCBoZWFkZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLyoqIOe8lui+keWZqOaVtOS9k+inhuWbvuW8leeUqCAqL1xyXG4gICAgQFZpZXdDaGlsZCgnZWRpdG9yUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZWRpdG9yUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLyoqIOe8lui+keWZqCAqL1xyXG4gICAgZ2V0IGVkaXRvcigpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICAvKiogcGFubmVs6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdwYW5uZWxSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBwYW5uZWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiog57yW6L6R6Z2i5p2/ICovXHJcbiAgICBnZXQgcGFubmVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYW5uZWxSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2Zvb3RlclJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGZvb3RlclJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBmb290ZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvb3RlclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgQFZpZXdDaGlsZCgnZm9udE5hbWVSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb250TmFtZVJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBmb250TmFtZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb250TmFtZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgQFZpZXdDaGlsZCgnZm9udFNpemVSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb250U2l6ZVJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBmb250U2l6ZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb250U2l6ZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgQFZpZXdDaGlsZCgnZm9ybWF0QmxvY2tSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb3JtYXRCbG9ja1JlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBmb3JtYXRCbG9ja0VsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRCbG9ja1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgQFZpZXdDaGlsZCgnZm9yZUNvbG9yUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9yZUNvbG9yUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgZ2V0IGZvcmVDb2xvckVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JlQ29sb3JSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2JhY2tDb2xvclJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGJhY2tDb2xvclJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBiYWNrQ29sb3JFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja0NvbG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBAVmlld0NoaWxkKCdjb2RlUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgY29kZVJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBjb2RlRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvZGVSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIC8qKiDlrZfkvZPmoLflvI8gKi9cclxuICAgIGZvbnRGYW1pbHlzID0gW3sga2V5OiBcImFyaWFsXCIsIHZhbHVlOiBcImFyaWFsXCIgfSwgeyBrZXk6IFwi5b6u6L2v6ZuF6buRXCIsIHZhbHVlOiBcIk1pY3Jvc29mdCBZYWhlaVwiIH0sIHsga2V5OiBcIuWui+S9k1wiLCB2YWx1ZTogXCJTaW1TdW5cIiB9LCB7IGtleTogXCLpu5HkvZNcIiwgdmFsdWU6IFwiU2ltSGVpXCIgfSwgeyBrZXk6IFwi5qW35L2TXCIsIHZhbHVlOiBcIkthaVRpXCIgfSwgeyBrZXk6IFwi5a6L5L2TXCIsIHZhbHVlOiBcIlNpbVN1blwiIH0sIHsga2V5OiBcIuaWsOWui+S9k1wiLCB2YWx1ZTogXCJOU2ltU3VuXCIgfSwgeyBrZXk6IFwi5Lu/5a6LXCIsIHZhbHVlOiBcIkZhbmdTb25nXCIgfSwgeyBrZXk6IFwi5b6u6L2v5q2j6buR5L2TXCIsIHZhbHVlOiBcIk1pY3Jvc29mdCBKaGVuZ0hlaVwiIH0sIHsga2V5OiBcIuWNjuaWh+eQpeePgFwiLCB2YWx1ZTogXCJTVEh1cG9cIiB9LCB7IGtleTogXCLljY7mloflvankupFcIiwgdmFsdWU6IFwiU1RDYWl5dW5cIiB9LCB7IGtleTogXCLlubzlnIZcIiwgdmFsdWU6IFwiWW91WXVhblwiIH0sIHsga2V5OiBcIuWNjuaWh+ihjOalt1wiLCB2YWx1ZTogXCJTVFhpbmdrYWlcIiB9XTtcclxuICAgIC8qKiDmlofmnKzmoLzlvI8gKi9cclxuICAgIGZvcm1hdEJsb2NrcyA9IFt7IGtleTogXCJwXCIsIHZhbHVlOiAnPHAgZGF0YS1pbmRleD1cIjBcIj5wPC9wPicgfSwgeyBrZXk6IFwiaDZcIiwgdmFsdWU6ICc8aDYgZGF0YS1pbmRleD1cIjFcIj5oNjwvaDY+JyB9LCB7IGtleTogXCJoNVwiLCB2YWx1ZTogJzxoNSBkYXRhLWluZGV4PVwiMlwiPmg1PC9oNT4nIH0sIHsga2V5OiBcImg0XCIsIHZhbHVlOiAnPGg0IGRhdGEtaW5kZXg9XCIzXCI+aDQ8L2g0PicgfSwgeyBrZXk6IFwiaDNcIiwgdmFsdWU6ICc8aDMgZGF0YS1pbmRleD1cIjRcIj5oMzwvaDM+JyB9LCB7IGtleTogXCJoMlwiLCB2YWx1ZTogJzxoMiBkYXRhLWluZGV4PVwiNVwiPmgyPC9oMj4nIH0sIHsga2V5OiBcImgxXCIsIHZhbHVlOiAnPGgxIGRhdGEtaW5kZXg9XCI2XCI+aDE8L2gxPicgfV07XHJcbiAgICAvKiog6aKc6ImyICovXHJcbiAgICBjb2xvcnMgPSBbW1wiI2ZmZmZmZlwiLCBcIiMwMDAwMDBcIiwgXCIjZWVlY2UxXCIsIFwiIzFmNDk3ZFwiLCBcIiM0ZjgxYmRcIiwgXCIjYzA1MDRkXCIsIFwiIzliYmI1OVwiLCBcIiM4MDY0YTJcIiwgXCIjNGJhY2M2XCIsIFwiI2Y3OTY0NlwiXSwgW1wiI2YyZjJmMlwiLCBcIiM3ZjdmN2ZcIiwgXCIjZGRkOWMzXCIsIFwiI2M2ZDlmMFwiLCBcIiNkYmU1ZjFcIiwgXCIjZjJkY2RiXCIsIFwiI2ViZjFkZFwiLCBcIiNlNWUwZWNcIiwgXCIjZGJlZWYzXCIsIFwiI2ZkZWFkYVwiXSwgW1wiI2Q4ZDhkOFwiLCBcIiM1OTU5NTlcIiwgXCIjYzRiZDk3XCIsIFwiIzhkYjNlMlwiLCBcIiNiOGNjZTRcIiwgXCIjZTViOWI3XCIsIFwiI2Q3ZTNiY1wiLCBcIiNjY2MxZDlcIiwgXCIjYjdkZGU4XCIsIFwiI2ZiZDViNVwiXSwgW1wiI2JmYmZiZlwiLCBcIiMzZjNmM2ZcIiwgXCIjOTM4OTUzXCIsIFwiIzU0OGRkNFwiLCBcIiM5NWIzZDdcIiwgXCIjZDk5Njk0XCIsIFwiI2MzZDY5YlwiLCBcIiNiMmEyYzdcIiwgXCIjOTJjZGRjXCIsIFwiI2ZhYzA4ZlwiXSwgW1wiI2E1YTVhNVwiLCBcIiMyNjI2MjZcIiwgXCIjNDk0NDI5XCIsIFwiIzE3MzY1ZFwiLCBcIiMzNjYwOTJcIiwgXCIjOTUzNzM0XCIsIFwiIzc2OTIzY1wiLCBcIiM1ZjQ5N2FcIiwgXCIjMzE4NTliXCIsIFwiI2UzNmMwOVwiXSwgW1wiIzdmN2Y3ZlwiLCBcIiMwYzBjMGNcIiwgXCIjMWQxYjEwXCIsIFwiIzBmMjQzZVwiLCBcIiMyNDQwNjFcIiwgXCIjNjMyNDIzXCIsIFwiIzRmNjEyOFwiLCBcIiMzZjMxNTFcIiwgXCIjMjA1ODY3XCIsIFwiIzk3NDgwNlwiXSwgW1wiI2MwMDAwMFwiLCBcIiNmZjAwMDBcIiwgXCIjZmZjMDAwXCIsIFwiI2ZmZmYwMFwiLCBcIiM5MmQwNTBcIiwgXCIjMDBiMDUwXCIsIFwiIzAwYjBmMFwiLCBcIiMwMDcwYzBcIiwgXCIjMDAyMDYwXCIsIFwiIzcwMzBhMFwiXV07XHJcbiAgICAvKiog5a2X5L2T5aSn5bCPICovXHJcbiAgICBmb250U2l6ZXMgPSBbeyBrZXk6IFwieHgtc21hbGxcIiwgdmFsdWU6IFwiMVwiLCB2YWx1ZSQ6IDkgLyAxNiB9LCB7IGtleTogXCJ4LXNtYWxsXCIsIHZhbHVlOiBcIjJcIiwgdmFsdWUkOiAxMCAvIDE2IH0sIHsga2V5OiBcInNtYWxsXCIsIHZhbHVlOiBcIjNcIiwgdmFsdWUkOiAnaW5oZXJpdCcgLyoqIDEzLzE26LCD5pW05Li64oCc57un5om/4oCdICovIH0sIHsga2V5OiBcIm1lZGl1bVwiLCB2YWx1ZTogXCI0XCIsIHZhbHVlJDogMTYgLyAxNiB9LCB7IGtleTogXCJsYXJnZVwiLCB2YWx1ZTogXCI1XCIsIHZhbHVlJDogMTggLyAxNiB9LCB7IGtleTogXCJ4LWxhcmdlXCIsIHZhbHVlOiBcIjZcIiwgdmFsdWUkOiAyNCAvIDE2IH0sIHsga2V5OiBcInh4LWxhcmdlXCIsIHZhbHVlOiBcIjdcIiwgdmFsdWUkOiAzMiAvIDE2IH1dO1xyXG4gICAgLyoqIGNvZGUgKi9cclxuICAgIGNvZGVzID0gWydIdG1sJywgJ0NzcycsICdKcycsICdUeXBlU2NyaXB0JywgJ1Nhc3MnLCAnSmF2YScsICdYbWwnLCAnU3FsJywgJ1NoZWxsJ107XHJcbiAgICAvKiog6YCJ5Lit55qE5a2X5qC3ICovXHJcbiAgICBmb250RmFtaWx5OiBhbnkgPSB7IGtleTogXCLlvq7ova/pm4Xpu5FcIiwgdmFsdWU6IFwiTWljcm9zb2Z0IFlhaGVpXCIgfTtcclxuICAgIC8qKiDpgInkuK3nmoTlrZflj7cgKi9cclxuICAgIGZvbnRTaXplOiBhbnkgPSB7IGtleTogXCJzbWFsbFwiLCB2YWx1ZTogMyB9OyAvLyDpu5jorqQxcmVtO1xyXG4gICAgLyoqIOaWh+acrOagvOW8jyAqL1xyXG4gICAgZm9ybWF0QmxvY2sgPSBcInBcIjtcclxuICAgIC8qKiDlrZfkvZPpopzoibIgKi9cclxuICAgIGZvcmVDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgIC8qKiDpq5jkuq7oibIgKi9cclxuICAgIGJhY2tDb2xvciA9IFwid2hpdGVcIjtcclxuICAgIC8qKiDlvZPliY3ku6PnoIHor63oqIAgKi9cclxuICAgIGNvZGUgPSAnSnMnO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+agt+mdouadvyAqL1xyXG4gICAgc3dpdGNoRm9udEZhbWlseVBhbm5lbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+WPt+mdouadvyAqL1xyXG4gICAgc3dpdGNoRm9udFNpemVQYW5uZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDmlofmnKzmoLzlvI/pnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvcm1hdEJsb2NrUGFubmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5a2X5L2T6aKc6Imy6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb3JlQ29sb3JQYW5uZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDog4zmma/oibLpnaLmnb8gKi9cclxuICAgIHN3aXRjaEJhY2tDb2xvclBhbm5lbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOS7o+eggeivreiogOmdouadvyAqL1xyXG4gICAgc3dpdGNoQ29kZVBhbm5lbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOm7mOiupOW3puWvuem9kCAqL1xyXG4gICAganVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5TGVmdCc7XHJcbiAgICAvKiog5piv5ZCm5aSE5LqO57yW6L6R54q25oCB5LitICovXHJcbiAgICBpc0luRWRpdFN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOiusOS9j+eahHJhbmdlICovXHJcbiAgICByYW5nZTogYW55O1xyXG4gICAgLyoqIOaYr+WQpuWFqOWxjywg6buY6K6kZmFsc2UgKi9cclxuICAgIGZ1bGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDniLblhYPntKAgKi9cclxuICAgIHBhcmVudCE6IEhUTUxFbGVtZW50O1xyXG4gICAgLyoqIOm7mOiupOagvOW8jyAqL1xyXG4gICAgc3RhdGljIEZPUk1BVCA9IHtcclxuICAgICAgICBmb3JtYXRCbG9jazogJ3AnLFxyXG4gICAgICAgIGZvcmVDb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICBiYWNrQ29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAganVzdGlmeUFjdGl2ZTogJ2p1c3RpZnlMZWZ0JyxcclxuICAgICAgICBmb250U2l6ZTogeyBrZXk6IFwic21hbGxcIiwgdmFsdWU6IFwiM1wiIH0sXHJcbiAgICAgICAgZm9udEZhbWlseTogeyBrZXk6IFwi5b6u6L2v6ZuF6buRXCIsIHZhbHVlOiBcIk1pY3Jvc29mdCBZYWhlaVwiIH1cclxuICAgIH07XHJcbiAgICBvbkNoYW5nZTogKGh0bWw6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHVuZGVmaW5lZDtcclxuICAgIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlbmRlcjI6IFJlbmRlcmVyMixcclxuICAgICAgICBwcml2YXRlIGRvbVNlcnZpY2U6IERvbVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZodG1sID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRGb3JtYXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLnJlbmRlcjIucGFyZW50Tm9kZSh0aGlzLmVkaXRvcik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlum7mOiupOagvOW8j1xyXG4gICAgICovXHJcbiAgICBpbml0Rm9ybWF0RGF0YSgpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFUKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWmguaenOmdouadv+S4jeiBmueEpuWImeS9v+mdouadv+iBmueEplxyXG4gICAgICovXHJcbiAgICBwYW5uZWxGb2N1cygpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7nvJbovpHpnaLmnb/kuIrmrKHlhYnmoIfkuLrlvZPliY3lhYnmoIdcclxuICAgICAqIEBwYXJhbSBlXHJcbiAgICAgKi9cclxuICAgIHJlY292ZXJSYW5nZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFubmVsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIC8vIOehruS/nee8lui+kemdouadv+WFiOaYr+iBmueEpueahFxyXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhbm5lbC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yYW5nZSkgeyAvLyDlrZjlnKjkuIrmrKHlhYnmoIfvvIzliJnorr7nva7kuIrmrKHlhYnmoIdcclxuICAgICAgICAgICAgQ3Vyc29yVXRpbC5zZXRGaXJzdFJhbmdlKHRoaXMucmFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEN1cnNvclV0aWwuc2V0U2VsZWN0aW9uVG9FbGVtZW50KHRoaXMucGFubmVsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAxLuiBmueEpumdouadv+W5tuiOt+WPluS4iuasoeWFieagh+S9jee9rizorr7nva7lvZPliY3ljoblj7LnvJbovpHmoLflvI9cclxuICAgICAqIDIu54K55Ye757yW6L6R5p2h55qE5ZG95Luk5oiW6ICF57yW6L6R6Z2i5p2/5ZCO77yM5bCG6KeG5Li657yW6L6R54q25oCBXHJcbiAgICAgKiBAcGFyYW0gIHJlY292ZXI/IOaYr+WQpumcgOimgeaBouWkjeS4iuasoeWFieagh1xyXG4gICAgICovXHJcbiAgICBzdGFydEVkaXQocmVjb3ZlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvLyDmgaLlpI3kuIrmrKHlhYnmoIfvvIjngrnlh7vnvJbovpHpnaLmnb/kuI3pnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIzngrnlh7vnvJbovpHmnaHpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIlcclxuICAgICAgICBpZiAocmVjb3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJSYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLvmraLpu5jorqTkuovku7bpmLLmraLlpLHnhKbvvIznoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7ljoblj7LlhYnmoIflkozmoLzlvI9cclxuICAgICAqIEBwYXJhbSAg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIGVuc3VyZUZvY3VzKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8g6Zi75q2i5aSx54SmXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIOe8lui+keWIneWni+WMllxyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbnlKjooYzlhoVzdHlsZVxyXG4gICAgICogQHBhcmFtIGYg5piv5ZCm5ZCv55Soc3R5bGXvvIzpu5jorqTkvb/nlKhcclxuICAgICAqL1xyXG4gICAgc3R5bGVXaXRoQ1NTKGY6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3N0eWxlV2l0aENTUycsIGZhbHNlLCBmKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keWIneWni+WMluWSjOiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICovXHJcbiAgICBpbml0RWRpdCgpIHtcclxuICAgICAgICAvLyDlnKjnvJbovpHnirbmgIHkuI3lho3mrKHov5vooYzliJ3lp4vljJZcclxuICAgICAgICBpZiAodGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOagh+iusOmdouadv+WkhOS6jue8lui+keeKtuaAgVxyXG4gICAgICAgIGlmICghdGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5FZGl0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIC8vIOWcqOS7o+eggeWMuuS4jeiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOWFieagh+WRqOWbtOacieWGheWuueWImeS4jeiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICAgIGNvbnN0IGVsID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpO1xyXG4gICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCB0aGlzLmZvcm1hdEJsb2NrKTtcclxuICAgICAgICAvLyDlpoLmnpznvJbovpHlmajlhoXmsqHmnInmlofmnKzmoIfnrb7vvIzmloflrZflr7npvZDlkb3ku6TkuI3og73nrKzkuIDkuKrmiafooYxcclxuICAgICAgICAvLyDlkKbliJnkvJrlsIblhYnmoIforr7liLDkuIvkuIDkuKrmlofmnKzmoIfnrb7lhoVcclxuICAgICAgICB0aGlzLmNtZCh0aGlzLmp1c3RpZnlBY3RpdmUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNtZChcImZvbnROYW1lXCIsIGZhbHNlLCB0aGlzLmZvbnRGYW1pbHkudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiZm9yZUNvbG9yXCIsIGZhbHNlLCB0aGlzLmZvcmVDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJiYWNrQ29sb3JcIiwgZmFsc2UsIHRoaXMuYmFja0NvbG9yKTtcclxuICAgICAgICB0aGlzLmNtZCgnZm9udFNpemUnLCBmYWxzZSwgdGhpcy5mb250U2l6ZS52YWx1ZSk7XHJcbiAgICAgICAgLy8g5a+56K6+572u5a2X5L2T5aSn5bCP5YGa54m55q6K5aSE55CGXHJcbiAgICAgICAgdGhpcy5hZGp1c3RGb250U2l6ZVdpdGhTdHlsZSh0aGlzLmZvbnRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWtl+agt1xyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvbnROYW1lKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgY29uc3QgdCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCA9ICF0aGlzLnN3aXRjaEZvbnRGYW1pbHlQYW5uZWw7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsIHx8IGluZGV4ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5c1tpbmRleCAqIDFdO1xyXG4gICAgICAgIHRoaXMuY21kKFwiZm9udE5hbWVcIiwgZmFsc2UsIHRoaXMuZm9udEZhbWlseS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZflj7dcclxuICAgICAqL1xyXG4gICAgc2V0Rm9udFNpemUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIik7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb250U2l6ZVBhbm5lbCA9ICF0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5mb250U2l6ZXNbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJmb250U2l6ZVwiLCBmYWxzZSwgZm9udFNpemUudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuYWRqdXN0Rm9udFNpemVXaXRoU3R5bGUoZm9udFNpemUgYXMgYW55KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6LCD5pW05a2X5L2T5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gIGZvbnRTaXplXHJcbiAgICAgKiBAcGFyYW0gIHZhbHVlJFxyXG4gICAgICovXHJcbiAgICBhZGp1c3RGb250U2l6ZVdpdGhTdHlsZShmb250U2l6ZTogeyB2YWx1ZTogbnVtYmVyLCB2YWx1ZSQ6IHN0cmluZyB9KSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgZm9udHMgPSBDb21tb25VdGlsLnBhcmVudChlbCwgMikucXVlcnlTZWxlY3RvckFsbChgZm9udFtzaXplPVwiJHtmb250U2l6ZS52YWx1ZX1cIl1gKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvbnRTaXplLnZhbHVlJDtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGZvbnRzLCBmb250ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIyLnJlbW92ZUF0dHJpYnV0ZShmb250LCAnc2l6ZScpO1xyXG4gICAgICAgICAgICBmb250LnN0eWxlLmZvbnRTaXplID0gdmFsdWUgPT09ICdpbmhlcml0JyA/ICdpbmhlcml0JyA6IGZvbnRTaXplLnZhbHVlJCArICdyZW0nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5paH5pys5qC85byPXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgc2V0Rm9ybWF0QmxvY2soZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIik7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbCA9ICF0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGZvcm1hdEJsb2NrID0gdGhpcy5mb3JtYXRCbG9ja3NbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gZm9ybWF0QmxvY2sua2V5O1xyXG4gICAgICAgIHRoaXMuY21kKFwiZm9ybWF0QmxvY2tcIiwgZmFsc2UsIFwiPFwiICsgdGhpcy5mb3JtYXRCbG9jayArIFwiPlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWJjeaZr+iJslxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvcmVDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpbTFcIik7XHJcbiAgICAgICAgY29uc3QgeSA9IHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaW0yXCIpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9yZUNvbG9yUGFubmVsID0gIXRoaXMuc3dpdGNoRm9yZUNvbG9yUGFubmVsO1xyXG4gICAgICAgIGlmICh4ID09PSBudWxsIHx8IHkgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmZvcmVDb2xvciA9IHRoaXMuY29sb3JzW3hdW3ldO1xyXG4gICAgICAgIHRoaXMuY21kKFwiZm9yZUNvbG9yXCIsIGZhbHNlLCB0aGlzLmZvcmVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7og4zmma/oibIo6auY5Lqu6ImyKVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEJhY2tDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpbTFcIik7XHJcbiAgICAgICAgY29uc3QgeSA9IHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaW0yXCIpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoQmFja0NvbG9yUGFubmVsID0gIXRoaXMuc3dpdGNoQmFja0NvbG9yUGFubmVsO1xyXG4gICAgICAgIGlmICh4ID09PSBudWxsIHx8IHkgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmJhY2tDb2xvciA9IHRoaXMuY29sb3JzW3hdW3ldO1xyXG4gICAgICAgIHRoaXMuY21kKFwiYmFja0NvbG9yXCIsIGZhbHNlLCB0aGlzLmJhY2tDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ku6PnoIHor63oqIBcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRDb2RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+S7o+eggeWMuuaXoOazleaPkuWFpeS7o+eggeWMun4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN3aXRjaENvZGVQYW5uZWwgPSAhdGhpcy5zd2l0Y2hDb2RlUGFubmVsO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuY29kZSA9IHRoaXMuY29kZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmNvZGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxwPjxici8+PC9wPjxwcmUgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlXCIgdGl0bGU9XCLku6PnoIHljLpcIj48Y29kZSBjbGFzcz1cIiR7Y29kZX1cIj48cD48YnIvPjwvcD48L2NvZGU+PC9wcmU+PHA+PGJyLz48L3A+YDtcclxuICAgICAgICB0aGlzLnJlbW92ZUZvcm1hdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIGNvbnN0IHBlbCA9IEN1cnNvclV0aWwuZ2V0UmFuZ2VDb21tb25QYXJlbnQoKTtcclxuICAgICAgICBjb25zdCBib3ggPSBDb21tb25VdGlsLnByZVNpYmxpbmcocGVsKSBhcyBhbnk7XHJcbiAgICAgICAgLy8g5o+S5YWlaHRtbOWQju+8jOWwhuWFieagh+enu+iHs+S7o+eggeWMuueahHDmoIfnrb7kuK1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFJhbmdlVG9FbGVtZW50KGJveC5jaGlsZHJlblswXS5jaGlsZHJlblswXSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpOyAvLyDmiYvliqjorr7nva7kuIDkuItcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOihjOWGheaNouihjO+8iHNoaWZ0K2VudGVy77yJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0QnJPblJldHVybihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoJ2luc2VydEJyT25SZXR1cm4nKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAnPGJyPjxicj4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0QnJPblJldHVybicsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueyl+S9k1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hCb2xkKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJib2xkXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWnOS9k1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hJdGFsaWMoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcIml0YWxpY1wiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7kuIvliJLnur9cclxuICAgICAqL1xyXG4gICAgc3dpdGNoVW5kZXJsaW5lKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJ1bmRlcmxpbmVcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Yig6Zmk57q/XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFN0cmlrZVRocm91Z2goZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcInN0cmlrZVRocm91Z2hcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uL+WPlua2iOS4iuagh1xyXG4gICAgICovXHJcbiAgICBzdXBlcnNjcmlwdChlOiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJzdXBlcnNjcmlwdFwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva4v5Y+W5raI5LiL5qCHXHJcbiAgICAgKi9cclxuICAgIHN1YnNjcmlwdChlOiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJzdWJzY3JpcHRcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5paH5a2X5a+56b2Q5pa55ZCRXHJcbiAgICAgKiBAcGFyYW0gIGUg5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gIHN0clxyXG4gICAgICovXHJcbiAgICBzZXRKdXN0aWZ5YWN0aXZlKGU6IEV2ZW50LCBzdHI6ICdMZWZ0JyB8ICdSaWdodCcgfCAnQ2VudGVyJyB8ICdGdWxsJykge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5qdXN0aWZ5QWN0aXZlID0gJ2p1c3RpZnknICsgc3RyO1xyXG4gICAgICAgIHRoaXMuY21kKHRoaXMuanVzdGlmeUFjdGl2ZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp6L+bXHJcbiAgICAgKi9cclxuICAgIGluZGVudChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiaW5kZW50XCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHj+Wwkee8qei/m1xyXG4gICAgICovXHJcbiAgICBvdXRkZW50KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJvdXRkZW50XCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeacieW6j+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRPcmRlcmVkTGlzdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiaW5zZXJ0T3JkZXJlZExpc3RcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl5peg5bqP5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIGluc2VydFVub3JkZXJlZExpc3QoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImluc2VydFVub3JkZXJlZExpc3RcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6KGo5qC86LCD6LW35o+S5YWl6KGo5qC8VUlcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0VGFibGUoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+S7o+eggeWMuuaXoOazleaPkuWFpeihqOagvH4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsZXJ0KHsgdGl0bGU6IFwi5o+S5YWl6KGo5qC8XCIsIGFuaW1hdGlvbjogXCJzY2FsZVwiLCBjb250ZW50OiBVSVRhYmxlQ29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76KGo5qC8VUnlvLnnqpfnoa7orqTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZVRhYmxlSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6LaF6ZO+5o6l6LCD6LW35o+S5YWl6LaF6ZO+5o6lVUlcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRMaW5rKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXpk77mjqV+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiBcIuaPkuWFpemTvuaOpVwiLCBhbmltYXRpb246IFwic2NhbGVcIiwgY29udGVudDogVUlMaW5rQ29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76LaF6ZO+5o6lVUnlvLnnqpfnoa7orqTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUxpbmtIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgbGV0IGVsOiBhbnkgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCk7XHJcbiAgICAgICAgZWwgPSB0aGlzLnJlbmRlcjIucGFyZW50Tm9kZShlbCk7XHJcbiAgICAgICAgaWYgKGVsLnN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyMi5yZW1vdmVBdHRyaWJ1dGUoZWwsICdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeWbvueJh+iwg+i1t+aPkuWFpeWbvueJh1VJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0RmlsZShlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn5Luj56CB5Yy65peg5rOV5o+S5YWl5paH5Lu2ficpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnQoeyB0aXRsZTogXCLmj5LlhaXmlofku7ZcIiwgYW5pbWF0aW9uOiBcInNjYWxlXCIsIGNvbnRlbnQ6IFVJQW5uZXhDb21wb25lbnQsIGhhbmRsZXI6IHRoaXMsIHRoZW1lOiB0aGlzLnRoZW1lIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuIrkvKDmlofku7ZVSeW8ueeql+S4iuS8oOacrOWcsOaWh+S7tuaXtuW1jOWFpWJhc2U2NOaXtuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGh0bWwg5o+S5YWl55qEaHRtbFxyXG4gICAgICovXHJcbiAgICByZWNpZXZlTG9jYWxGaWxlSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuIrkvKDmlofku7ZVSeW8ueeql+KAnOaPkuWFpeWklumTvuKAneaXtuWbnuiwg1xyXG4gICAgICogQHBhcmFtIGh0bWwg5o+S5YWl55qEaHRtbFxyXG4gICAgICovXHJcbiAgICByZWNpZXZlRmlsZUxpbmtIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWPkeWwhOmAieaLqeaWh+S7tuS6i+S7tlxyXG4gICAgICogQHBhcmFtICB0eXBlIOaWh+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtICBmaWxlIOaWh+S7tlxyXG4gICAgICogQHBhcmFtICBwYXJzZXIg5Lyg5YWlc3Jj6I635Y+WaHRtbFxyXG4gICAgICogQHBhcmFtICBjbG9zZSAg5YWz6Zet5by556qX5ZKM6YGu572pXHJcbiAgICAgKi9cclxuICAgIGVtaXRVcGxvYWRGaWxlKHR5cGU6ICdpbWFnZScgfCAnYXVkaW8nIHwgJ3ZpZGVvJywgZmlsZTogYW55LCBwYXJzZXI6ICh2OiBzdHJpbmcpID0+IHN0cmluZywgY2xvc2U6IChiOiBib29sZWFuLCB0PzogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlLmVtaXQoe1xyXG4gICAgICAgICAgICB0eXBlLCBmaWxlLCBjYWxsYmFjazogKHNyYzogc3RyaW5nIHwgYm9vbGVhbiwgdD86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhc3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNpZXZlRmlsZUxpbmtIVE1MKHBhcnNlcihzcmMgYXMgc3RyaW5nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbG9zZSghIXNyYywgdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpWhyXHJcbiAgICAgKi9cclxuICAgIGluc2VydEhvcml6b250YWxSdWxlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJpbnNlcnRIb3Jpem9udGFsUnVsZVwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnspjotLRcclxuICAgICAqL1xyXG4gICAgcGFzdGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcInBhc3RlXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWJquWIh1xyXG4gICAgICovXHJcbiAgICBjdXQoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImN1dFwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpI3liLZcclxuICAgICAqL1xyXG4gICAgY29weShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiY29weVwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInkuK3miYDmnIlcclxuICAgICAqL1xyXG4gICAgc2VsZWN0QWxsKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJzZWxlY3RBbGxcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5YGaXHJcbiAgICAgKi9cclxuICAgIHJlZG8oZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcInJlZG9cIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKk6ZSAXHJcbiAgICAgKi9cclxuICAgIHVuZG8oZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcInVuZG9cIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YCJ5LitXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZVNlbGVjdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiZGVsZXRlXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWOhuWPsui+k+WFpVxyXG4gICAgICovXHJcbiAgICBoaXN0b3J5KCkge1xyXG4gICAgICAgIHRoaXMudmh0bWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VkaXRvcl9pbnB1dCcpIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5qC85byP77yM5LiN6Zi75q2i5aSx54Sm77yM6YeN5paw6IGa54Sm5pe25Lya6K6+572u5Y6G5Y+y5qC85byPXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUZvcm1hdCgpIHtcclxuICAgICAgICB0aGlzLmNtZChcInJlbW92ZUZvcm1hdFwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9ybWF0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5ZCE57G75LiL5ouJ5qGGXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaGlkZVN3aXRjaFBhbm5lbChlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmZvbnROYW1lRWwsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb250U2l6ZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JlQ29sb3JFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvcmVDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmJhY2tDb2xvckVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQmFja0NvbG9yUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JtYXRCbG9ja0VsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hDb2RlUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuY29kZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQ29kZVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGP5oiW5Y+W5raI5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIFN3aXRjaFNjcmVlbigpIHtcclxuICAgICAgICBjb25zdCBlZGl0b3I6IGFueSA9IHRoaXMuZWRpdG9yO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcjogYW55ID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgY29uc3QgcGFubmVsOiBhbnkgPSB0aGlzLnBhbm5lbDtcclxuICAgICAgICBjb25zdCBmb290ZXI6IGFueSA9IHRoaXMuZm9vdGVyO1xyXG4gICAgICAgIHRoaXMuZnVsbCA9ICF0aGlzLmZ1bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuZnVsbCkgeyAvLyDlhajlsY9cclxuICAgICAgICAgICAgZWRpdG9yLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5OTt0b3A6MDtsZWZ0OjA7dHJhbnNmb3JtOm5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTsnO1xyXG4gICAgICAgICAgICBwYW5uZWwuc3R5bGUuY3NzVGV4dCA9IGBtYXgtaGVpZ2h0OnVuc2V0O2hlaWdodDoke3dpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlci5vZmZzZXRIZWlnaHQgLSBmb290ZXIub2Zmc2V0SGVpZ2h0fXB4O2A7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgLy8g6L+Y5Y6fXHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHBhbm5lbC5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVkaXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5piv5ZCm5pSv5oyB5ZG95LukXHJcbiAgICAgKiBAcGFyYW0gY21kIOWRveS7pFxyXG4gICAgICovXHJcbiAgICBpc1N1cHBvcnQoY21kOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkKGNtZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiafooYzlsIHoo4XnmoTnvJbovpHlkb3ku6RcclxuICAgICAqIEBwYXJhbSBrIOWRveS7pOWQjeensFxyXG4gICAgICogQHBhcmFtIHVpIOaJk+W8gHVp5by556qXXHJcbiAgICAgKiBAcGFyYW0gdiDorr7nva7lkb3ku6TlgLxcclxuICAgICAqIEByZXR1cm5zIHRydWUt6K6+572u5oiQ5Yqf77yMZmFsc2Ut6K6+572u5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIGNtZChrOiBzdHJpbmcsIHVpOiBib29sZWFuLCB2PzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydChrKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfns7vnu5/kuI3mlK/mjIHor6Xlkb3ku6R+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgd2hpdGVMaXN0ID0gJ2luc2VydEhUTUwscGFzdGUsY3V0LGNvcHkscmVtb3ZlRm9ybWF0LGRlbGV0ZSxzZWxlY3RBbGwscmVkbyx1bmRvLGluc2VydEJyT25SZXR1cm4nO1xyXG4gICAgICAgIGlmICh3aGl0ZUxpc3QuaW5kZXhPZihrKSA8IDAgJiYgdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn5Luj56CB5Yy65YaF5peg5rOV5omn6KGM6K+l5ZG95LukficpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5leGVjQ29tbWFuZChrLCB1aSwgdiB8fCBcIlwiKTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGlucHV0LGNsaWNrLHNlbGVjdGlvbmNoYW5nZeS6i+S7tuiusOW9lee8lui+kemdouadv+WFieagh+S9jee9rlxyXG4gICAgICovXHJcbiAgICBzZXRSYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnJhbmdlID0gQ3Vyc29yVXRpbC5nZXRSYW5nZSgwLCB0aGlzLnBhbm5lbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzmjInplK7kuovku7YgKOWkhOeQhnRhYue8qei/mylcclxuICAgICAqIEBwYXJhbSBlIOaMiemUruS6i+S7tlxyXG4gICAgICovXHJcbiAgICBrZXlkb3duKGU6IEV2ZW50IHwgYW55KSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlIHx8IGUud2hpY2ggfHwgZS5jaGFyQ29kZTtcclxuICAgICAgICBpZiAoa2V5ICE9PSA5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5oyJ5LiLdGFi6ZSu77yM5aKe5Yqg57yp6L+bMuS4quepuuagvFxyXG4gICAgICAgIGNvbnN0IHRhYiA9IG5ldyBBcnJheSg1KS5qb2luKCcmbmJzcDsnKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCB0YWIpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vpnaLmnb9cclxuICAgICAqL1xyXG4gICAgcGFubmVsT25DbGljaygpIHtcclxuICAgICAgICB0aGlzLmluaXRFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo57yW6L6R6Z2i5p2/5Lit57KY6LS0XHJcbiAgICAgKi9cclxuICAgIHBhbm5lbE9uUGFzdGUoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUmFuZ2VJbkNvZGUoKSkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBvYmogPSBDb21tb25VdGlsLmlzSUUoKSBhcyBhbnkgPyB3aW5kb3cgOiBlO1xyXG4gICAgICAgIGlmICghb2JqLmNsaXBib2FyZERhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IG9iai5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xyXG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSB0ZXh0O1xyXG4gICAgICAgIEN1cnNvclV0aWwuaW5zZXJ0Tm9kZShwKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2VBbmRFbWl0VmFsdWUoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXml7borrDkvY/lhYnlj5jkvY3nva4gJiYgaW5wdXTkuovku7blj5HlsIR2YWx1ZSAmJiDorrDkvY/ovpPlhaVcclxuICAgICAqIEBwYXJhbSAgYXJnMFxyXG4gICAgICovXHJcbiAgICBzZXRSYW5nZUFuZEVtaXRWYWx1ZShhcmcwOiBudW1iZXIgfCBFdmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgYXJnMCA9IDMwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbm5lckhUTUwgPSB0aGlzLnBhbm5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZodG1sID09PSBpbm5lckhUTUwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIC8vIOacieWGheWuueaXtuaJjeS/neWtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSAodGhpcy5wYW5uZWwuaW5uZXJUZXh0IHx8IHRoaXMucGFubmVsLnRleHRDb250ZW50KS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkaXRvcl9pbnB1dCcsIGlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMS7lj5HlsIRpbm5lckhUTUwsaW5wdXTkuovku7bmjqXmlLZcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgLy8gMi7op6blj5FuZ01vZGVsQ2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoaW5uZXJIVE1MKTtcclxuICAgICAgICB9LCBhcmcwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWwhOe8lui+keWGheWuuVxyXG4gICAgICovXHJcbiAgICBlbWl0Q29udGVudCgpIHtcclxuICAgICAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICAgICAgY29uc3QgZWRpdFBhbm5lbCA9IHRoaXMucGFubmVsIGFzIGFueTtcclxuICAgICAgICAvLyDmo4DmtYvnvJbovpHlhoXlrrnlpKflsI9cclxuICAgICAgICBsZXQgaW5uZXJIVE1MOiBzdHJpbmcgPSBlZGl0UGFubmVsLmlubmVySFRNTDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5uZXJIVE1MLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSBpbm5lckhUTUwuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgaWYgKGMgPiAwICYmIGMgPCAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgKz0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2l6ZSA+IHRoaXMub3B0aW9ucyQubWF4c2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfnvJbovpHlhoXlrrnotoXlh7rlpKflsI9+Jyk7XHJcbiAgICAgICAgICAgIGlubmVySFRNTCA9IGlubmVySFRNTC5zdWJzdHIoMCwgdGhpcy5vcHRpb25zJC5tYXhzaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmdldFVybHNCeVRhZyh0aGlzLnBhbm5lbCwgJ2ltZycpO1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICdhdWRpbycpO1xyXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICd2aWRlbycpO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICBpbm5lclRFWFQ6IGVkaXRQYW5uZWwuaW5uZXJUZXh0IHx8IGVkaXRQYW5uZWwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgICAgIHVybHM6IHsgaW1hZ2UsIGF1ZGlvLCB2aWRlbyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlY2lldmVDb250ZW50LmVtaXQob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJvuebruagh+WFg+e0oOeahOeahOafkOS4quagh+etvueahHVybHPlkoxiYXNlNjTnmoR1cmxcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gdGFnIOagh+etvlxyXG4gICAgICovXHJcbiAgICBnZXRVcmxzQnlUYWcodGFyZ2V0OiBIVE1MRWxlbWVudCwgdGFnOiBzdHJpbmcpOiB7IHR5cGU6ICd1cmwnIHwgJ2Jhc2U2NCcsIHNyYzogc3RyaW5nIH1bXSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gW10gYXMgYW55O1xyXG4gICAgICAgIGNvbnN0IHRhZ3MgPSB0YXJnZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGFncywgZWxlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7fSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNyYyA9IGVsZW0uc3JjO1xyXG4gICAgICAgICAgICBpZiAoc3JjLmluZGV4T2YoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9ICd1cmwnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID0gJ2Jhc2U2NCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3ojIPlm7RSYW5nZeaYr+WQpuWSjOS7o+eggeWMuuacieS6pOmbhlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSAtIOacieS6pOmbhu+8jGZhbHNlIC0g5peg5Lqk6ZuGXHJcbiAgICAgKi9cclxuICAgIGlzUmFuZ2VJbkNvZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5wYW5uZWxGb2N1cygpO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkgYXMgYW55O1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIC8vIOWmguaenOaYr+aWh+acrOiKgueCueWImeaJvuWFtueItuWFg+e0oFxyXG4gICAgICAgIGlmIChwYXJlbnQubm9kZVR5cGUgPT09IDMpIHsgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7IH1cclxuICAgICAgICByZXR1cm4gKCgpID0+IHsgLy8g6KKr5YyF5ZCrXHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQkID0gcGFyZW50O1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbmRpdGlvbmFsLWFzc2lnbm1lbnRcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCQgPSBwYXJlbnQkLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQkLnRhZ05hbWUgPT09ICdDT0RFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCQgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KSgpIHx8ICgoKSA9PiB7IC8vIOWMheWQq1xyXG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlcyAmJiBub2Rlcy5sZW5ndGg7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRvYXN05o+Q56S6XHJcbiAgICAgKiBAcGFyYW0gIHRleHQ/IHRvYXN05o+Q56S6IOm7mOiupOS4uuKAmOiuvue9ruaXoOaViH7igJlcclxuICAgICAqIEBwYXJhbSAgZHVyYXRpb24/IOWBnOeVmeaXtumXtFxyXG4gICAgICovXHJcbiAgICB0b2FzdCh0ZXh0OiBzdHJpbmcgPSAn6K6+572u5peg5pWIficsIG9iaj86IHsgZHVyYXRpb246IG51bWJlciwgZW50ZXI6IG51bWJlciwgbGVhdmU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS50b3N0KHsgdGV4dCwgLi4ub2JqIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by556qXXHJcbiAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgKi9cclxuICAgIGFsZXJ0KG9iajogV2luZG93T3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNlcnZpY2UuYWxlcnQob2JqKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLLmipZcclxuICAgICAqIEBwYXJhbSAgZiDlm57osINcclxuICAgICAqIEBwYXJhbSAgdD8g6Ziy5oqW5pe25bu2IOm7mOiupDMwMG1zXHJcbiAgICAgKi9cclxuICAgIGRlYm91bmNlKGY6ICgpID0+IHZvaWQsIHQ6IG51bWJlciA9IDMwMCkge1xyXG4gICAgICAgIGNvbnN0IG8gPSB0aGlzLmRlYm91bmNlIGFzIGFueTtcclxuICAgICAgICBjbGVhclRpbWVvdXQoby50aW1lcik7XHJcbiAgICAgICAgby50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBmKCk7XHJcbiAgICAgICAgfSwgdCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==