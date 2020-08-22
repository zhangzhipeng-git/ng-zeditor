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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvbmctemVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBTSxVQUFVOztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQyxDQUFHLFNBQVM7O0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDLENBQUcsU0FBUzs7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDLENBQVEsU0FBUzs7QUFDbkUsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUMsQ0FBZSxTQUFTOztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFlLFFBQVE7Ozs7O0FBR2xFLHNCQXNCQzs7Ozs7O0lBcEJHLDBCQUFnQjs7Ozs7SUFFaEIsMEJBQWdCOzs7OztJQUVoQix3QkFLRTs7Ozs7SUFFRix3QkFHRTs7Ozs7SUFFRix3QkFHRTs7QUFjTixNQUFNLE9BQU8sbUJBQW1COzs7OztJQXlINUIsWUFDWSxPQUFrQixFQUNsQixVQUFzQjtRQUR0QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUF6SHpCLFVBQUssR0FBRyxlQUFlLENBQUM7O1FBRXZCLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7OztRQUU1RCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2QsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7OztRQUd0RSxhQUFRLEdBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7O1FBTXhILFVBQUssR0FBMEIsR0FBRyxDQUFDOzs7O1FBRWxDLGVBQVUsR0FBcUIsSUFBSSxZQUFZLEVBQU0sQ0FBQzs7OztRQWdEaEUsZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7UUFFMWQsaUJBQVksR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDOzs7O1FBRXhYLFdBQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzs7OztRQUUxeEIsY0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxH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QU1sRix3Q0FBa0Y7O0lBS2xGLHdDQUFrRjs7SUFJbEYsMENBQXNGOztJQUl0RiwwQ0FBc0Y7O0lBSXRGLDZDQUE0Rjs7SUFJNUYsMkNBQXdGOztJQUl4RiwyQ0FBd0Y7O0lBSXhGLHNDQUE4RTs7Ozs7SUFLOUUsMENBQTBkOzs7OztJQUUxZCwyQ0FBd1g7Ozs7O0lBRXhYLHFDQUEweEI7Ozs7O0lBRTF4Qix3Q0FBc1g7Ozs7O0lBRXRYLG9DQUFtRjs7Ozs7SUFFbkYseUNBQTREOzs7OztJQUU1RCx1Q0FBMkM7Ozs7O0lBRTNDLDBDQUFrQjs7Ozs7SUFFbEIsd0NBQW9COzs7OztJQUVwQix3Q0FBb0I7Ozs7O0lBRXBCLG1DQUFZOzs7OztJQUVaLHFEQUF3Qzs7Ozs7SUFFeEMsbURBQXNDOzs7OztJQUV0QyxzREFBeUM7Ozs7O0lBRXpDLG9EQUF1Qzs7Ozs7SUFFdkMsb0RBQXVDOzs7OztJQUV2QywrQ0FBa0M7Ozs7O0lBRWxDLDRDQUE4Qjs7Ozs7SUFFOUIsNkNBQWdDOzs7OztJQUVoQyxvQ0FBVzs7Ozs7SUFFWCxtQ0FBc0I7Ozs7O0lBRXRCLHFDQUFxQjs7SUFVckIsdUNBQW1EOztJQUNuRCx3Q0FBd0M7Ozs7O0lBR3BDLHNDQUEwQjs7Ozs7SUFDMUIseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog57yW6L6R5Zmo57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM3OjIzIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgT25Jbml0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFdpbmRvd09wdGlvbnMgfSBmcm9tIFwiLi9fYWxlcnQvd2luZG93L3dpbmRvd1wiOyAgIC8vIOeql+S9k+W8ueeql1xyXG5pbXBvcnQgeyBVSUxpbmtDb21wb25lbnQgfSBmcm9tIFwiLi91aS1saW5rL3VpLWxpbmtcIjsgICAgICAvLyDotoXpk77mjqVVSee7hOS7tlxyXG5pbXBvcnQgeyBVSVRhYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4vdWktdGFibGUvdWktdGFibGVcIjsgICAvLyDooajmoLxVSee7hOS7tlxyXG5pbXBvcnQgeyBVSUFubmV4Q29tcG9uZW50IH0gZnJvbSBcIi4vdWktYW5uZXgvdWktYW5uZXhcIjsgICAvLyDpmYTku7ZVSee7hOS7tlxyXG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL0RvbVNlcnZpY2UnOyAgICAgICAgLy8gZG9t5o+Q5L6b5ZWGXHJcbmltcG9ydCBDb21tb25VdGlsIGZyb20gXCIuL3V0aWwvQ29tbW9uVXRpbFwiOyAgICAgICAgICAgICAgIC8vIGRvbeW3peWFt+exu1xyXG5pbXBvcnQgQ3Vyc29yVXRpbCBmcm9tICcuL3V0aWwvQ3Vyc29yVXRpbCc7ICAgICAgICAgICAgICAgLy8g5YWJ5qCH5bel5YW357G7XHJcblxyXG4vKiog57yW6L6R5Zmo6YWN572u5Y+C5pWwICovXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIC8qKiDnvJbovpHlhoXlrrnnmoTmnIDlpKflrZfoioLmlbAgKi9cclxuICAgIG1heHNpemU6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDotoXml7YgbXMgKi9cclxuICAgIHRpbWVvdXQ6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDlm77niYfnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIGltYWdlOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+WbvueJh+aVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICAgICAgLyoqIOWwj+S6juaMh+WumuWtl+iKguaVsOS8mui/m+ihjGJhc2U2NOe8lueggSAqL1xyXG4gICAgICAgIGJhc2U2NDogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIC8qKiDkuIrkvKDop4bpopHnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIHZpZGVvOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+inhumikeaVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS4iuS8oOmfs+mikeeahOmFjee9ruWPguaVsCAqL1xyXG4gICAgbXVzaWM6IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn6Z+z6aKR5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH07XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtemVkaXRvcicsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZy16ZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctemVkaXRvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXBwWmVkaXRvckNvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1dLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwWmVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG4gICAgLyoqIOS8oOWFpeeahGh0bWwgKi9cclxuICAgIEBJbnB1dCgpIHZodG1sID0gJzxwPuivt+i+k+WFpeWGheWuuX48L3A+JztcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW9uLXByZWZpeFxyXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICAvKiog5piv5ZCm5pyJ5oyJ6ZKuICovXHJcbiAgICBASW5wdXQoKSBoYXNCdG4gPSBmYWxzZTtcclxuICAgIEBPdXRwdXQoKSByZWNpZXZlQ29udGVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgLyoqIOWPguaVsOmFjee9riAqL1xyXG4gICAgb3B0aW9ucyQ6IGFueSA9IHsgbWF4c2l6ZTogNjU1MzUsIHRpbWVvdXQ6IDEwMDAwLCBpbWFnZTogeyBjb3VudDogNSwgYmFzZTY0OiA2MDAwMCB9LCBhdWRpbzogeyBjb3VudDogMSB9LCB2aWRlbzogeyBjb3VudDogMSB9IH07XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG9wdGlvbnModjogYW55KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMkLCB2KTtcclxuICAgIH1cclxuICAgIC8qKiDkuLvpopggKi9cclxuICAgIEBJbnB1dCgpIHRoZW1lOiAncicgfCAncCcgfCAnYicgfCAnZycgPSAnZyc7XHJcbiAgICAvKiog5LiK5Lyg5paH5Lu2ICovXHJcbiAgICBAT3V0cHV0KCkgdXBsb2FkRmlsZTogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e30+KCk7XHJcbiAgICAvKiog57yW6L6R5p2h6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBoZWFkZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiog57yW6L6R5p2hICovXHJcbiAgICBnZXQgaGVhZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIC8qKiDnvJbovpHlmajmlbTkvZPop4blm77lvJXnlKggKi9cclxuICAgIEBWaWV3Q2hpbGQoJ2VkaXRvclJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGVkaXRvclJlZjogRWxlbWVudFJlZjtcclxuICAgIC8qKiDnvJbovpHlmaggKi9cclxuICAgIGdldCBlZGl0b3IoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLyoqIHBhbm5lbOinhuWbvuW8leeUqCAqL1xyXG4gICAgQFZpZXdDaGlsZCgncGFubmVsUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgcGFubmVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLyoqIOe8lui+kemdouadvyAqL1xyXG4gICAgZ2V0IHBhbm5lbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFubmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBAVmlld0NoaWxkKCdmb290ZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb290ZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgZm9vdGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb290ZXJSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2ZvbnROYW1lUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9udE5hbWVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgZm9udE5hbWVFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9udE5hbWVSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2ZvbnRTaXplUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9udFNpemVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgZm9udFNpemVFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9udFNpemVSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2Zvcm1hdEJsb2NrUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9ybWF0QmxvY2tSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgZm9ybWF0QmxvY2tFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0QmxvY2tSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIEBWaWV3Q2hpbGQoJ2ZvcmVDb2xvclJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGZvcmVDb2xvclJlZjogRWxlbWVudFJlZjtcclxuICAgIGdldCBmb3JlQ29sb3JFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZUNvbG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBAVmlld0NoaWxkKCdiYWNrQ29sb3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBiYWNrQ29sb3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgYmFja0NvbG9yRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tDb2xvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgQFZpZXdDaGlsZCgnY29kZVJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGNvZGVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBnZXQgY29kZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2RlUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICAvKiog5a2X5L2T5qC35byPICovXHJcbiAgICBmb250RmFtaWx5cyA9IFt7IGtleTogXCJhcmlhbFwiLCB2YWx1ZTogXCJhcmlhbFwiIH0sIHsga2V5OiBcIuW+rui9r+mbhem7kVwiLCB2YWx1ZTogXCJNaWNyb3NvZnQgWWFoZWlcIiB9LCB7IGtleTogXCLlrovkvZNcIiwgdmFsdWU6IFwiU2ltU3VuXCIgfSwgeyBrZXk6IFwi6buR5L2TXCIsIHZhbHVlOiBcIlNpbUhlaVwiIH0sIHsga2V5OiBcIualt+S9k1wiLCB2YWx1ZTogXCJLYWlUaVwiIH0sIHsga2V5OiBcIuWui+S9k1wiLCB2YWx1ZTogXCJTaW1TdW5cIiB9LCB7IGtleTogXCLmlrDlrovkvZNcIiwgdmFsdWU6IFwiTlNpbVN1blwiIH0sIHsga2V5OiBcIuS7v+Wui1wiLCB2YWx1ZTogXCJGYW5nU29uZ1wiIH0sIHsga2V5OiBcIuW+rui9r+ato+m7keS9k1wiLCB2YWx1ZTogXCJNaWNyb3NvZnQgSmhlbmdIZWlcIiB9LCB7IGtleTogXCLljY7mlofnkKXnj4BcIiwgdmFsdWU6IFwiU1RIdXBvXCIgfSwgeyBrZXk6IFwi5Y2O5paH5b2p5LqRXCIsIHZhbHVlOiBcIlNUQ2FpeXVuXCIgfSwgeyBrZXk6IFwi5bm85ZyGXCIsIHZhbHVlOiBcIllvdVl1YW5cIiB9LCB7IGtleTogXCLljY7mlofooYzmpbdcIiwgdmFsdWU6IFwiU1RYaW5na2FpXCIgfV07XHJcbiAgICAvKiog5paH5pys5qC85byPICovXHJcbiAgICBmb3JtYXRCbG9ja3MgPSBbeyBrZXk6IFwicFwiLCB2YWx1ZTogJzxwIGRhdGEtaW5kZXg9XCIwXCI+cDwvcD4nIH0sIHsga2V5OiBcImg2XCIsIHZhbHVlOiAnPGg2IGRhdGEtaW5kZXg9XCIxXCI+aDY8L2g2PicgfSwgeyBrZXk6IFwiaDVcIiwgdmFsdWU6ICc8aDUgZGF0YS1pbmRleD1cIjJcIj5oNTwvaDU+JyB9LCB7IGtleTogXCJoNFwiLCB2YWx1ZTogJzxoNCBkYXRhLWluZGV4PVwiM1wiPmg0PC9oND4nIH0sIHsga2V5OiBcImgzXCIsIHZhbHVlOiAnPGgzIGRhdGEtaW5kZXg9XCI0XCI+aDM8L2gzPicgfSwgeyBrZXk6IFwiaDJcIiwgdmFsdWU6ICc8aDIgZGF0YS1pbmRleD1cIjVcIj5oMjwvaDI+JyB9LCB7IGtleTogXCJoMVwiLCB2YWx1ZTogJzxoMSBkYXRhLWluZGV4PVwiNlwiPmgxPC9oMT4nIH1dO1xyXG4gICAgLyoqIOminOiJsiAqL1xyXG4gICAgY29sb3JzID0gW1tcIiNmZmZmZmZcIiwgXCIjMDAwMDAwXCIsIFwiI2VlZWNlMVwiLCBcIiMxZjQ5N2RcIiwgXCIjNGY4MWJkXCIsIFwiI2MwNTA0ZFwiLCBcIiM5YmJiNTlcIiwgXCIjODA2NGEyXCIsIFwiIzRiYWNjNlwiLCBcIiNmNzk2NDZcIl0sIFtcIiNmMmYyZjJcIiwgXCIjN2Y3ZjdmXCIsIFwiI2RkZDljM1wiLCBcIiNjNmQ5ZjBcIiwgXCIjZGJlNWYxXCIsIFwiI2YyZGNkYlwiLCBcIiNlYmYxZGRcIiwgXCIjZTVlMGVjXCIsIFwiI2RiZWVmM1wiLCBcIiNmZGVhZGFcIl0sIFtcIiNkOGQ4ZDhcIiwgXCIjNTk1OTU5XCIsIFwiI2M0YmQ5N1wiLCBcIiM4ZGIzZTJcIiwgXCIjYjhjY2U0XCIsIFwiI2U1YjliN1wiLCBcIiNkN2UzYmNcIiwgXCIjY2NjMWQ5XCIsIFwiI2I3ZGRlOFwiLCBcIiNmYmQ1YjVcIl0sIFtcIiNiZmJmYmZcIiwgXCIjM2YzZjNmXCIsIFwiIzkzODk1M1wiLCBcIiM1NDhkZDRcIiwgXCIjOTViM2Q3XCIsIFwiI2Q5OTY5NFwiLCBcIiNjM2Q2OWJcIiwgXCIjYjJhMmM3XCIsIFwiIzkyY2RkY1wiLCBcIiNmYWMwOGZcIl0sIFtcIiNhNWE1YTVcIiwgXCIjMjYyNjI2XCIsIFwiIzQ5NDQyOVwiLCBcIiMxNzM2NWRcIiwgXCIjMzY2MDkyXCIsIFwiIzk1MzczNFwiLCBcIiM3NjkyM2NcIiwgXCIjNWY0OTdhXCIsIFwiIzMxODU5YlwiLCBcIiNlMzZjMDlcIl0sIFtcIiM3ZjdmN2ZcIiwgXCIjMGMwYzBjXCIsIFwiIzFkMWIxMFwiLCBcIiMwZjI0M2VcIiwgXCIjMjQ0MDYxXCIsIFwiIzYzMjQyM1wiLCBcIiM0ZjYxMjhcIiwgXCIjM2YzMTUxXCIsIFwiIzIwNTg2N1wiLCBcIiM5NzQ4MDZcIl0sIFtcIiNjMDAwMDBcIiwgXCIjZmYwMDAwXCIsIFwiI2ZmYzAwMFwiLCBcIiNmZmZmMDBcIiwgXCIjOTJkMDUwXCIsIFwiIzAwYjA1MFwiLCBcIiMwMGIwZjBcIiwgXCIjMDA3MGMwXCIsIFwiIzAwMjA2MFwiLCBcIiM3MDMwYTBcIl1dO1xyXG4gICAgLyoqIOWtl+S9k+Wkp+WwjyAqL1xyXG4gICAgZm9udFNpemVzID0gW3sga2V5OiBcInh4LXNtYWxsXCIsIHZhbHVlOiBcIjFcIiwgdmFsdWUkOiA5IC8gMTYgfSwgeyBrZXk6IFwieC1zbWFsbFwiLCB2YWx1ZTogXCIyXCIsIHZhbHVlJDogMTAgLyAxNiB9LCB7IGtleTogXCJzbWFsbFwiLCB2YWx1ZTogXCIzXCIsIHZhbHVlJDogJ2luaGVyaXQnIC8qKiAxMy8xNuiwg+aVtOS4uuKAnOe7p+aJv+KAnSAqLyB9LCB7IGtleTogXCJtZWRpdW1cIiwgdmFsdWU6IFwiNFwiLCB2YWx1ZSQ6IDE2IC8gMTYgfSwgeyBrZXk6IFwibGFyZ2VcIiwgdmFsdWU6IFwiNVwiLCB2YWx1ZSQ6IDE4IC8gMTYgfSwgeyBrZXk6IFwieC1sYXJnZVwiLCB2YWx1ZTogXCI2XCIsIHZhbHVlJDogMjQgLyAxNiB9LCB7IGtleTogXCJ4eC1sYXJnZVwiLCB2YWx1ZTogXCI3XCIsIHZhbHVlJDogMzIgLyAxNiB9XTtcclxuICAgIC8qKiBjb2RlICovXHJcbiAgICBjb2RlcyA9IFsnSHRtbCcsICdDc3MnLCAnSnMnLCAnVHlwZVNjcmlwdCcsICdTYXNzJywgJ0phdmEnLCAnWG1sJywgJ1NxbCcsICdTaGVsbCddO1xyXG4gICAgLyoqIOmAieS4reeahOWtl+agtyAqL1xyXG4gICAgZm9udEZhbWlseTogYW55ID0geyBrZXk6IFwi5b6u6L2v6ZuF6buRXCIsIHZhbHVlOiBcIk1pY3Jvc29mdCBZYWhlaVwiIH07XHJcbiAgICAvKiog6YCJ5Lit55qE5a2X5Y+3ICovXHJcbiAgICBmb250U2l6ZTogYW55ID0geyBrZXk6IFwic21hbGxcIiwgdmFsdWU6IDMgfTsgLy8g6buY6K6kMXJlbTtcclxuICAgIC8qKiDmlofmnKzmoLzlvI8gKi9cclxuICAgIGZvcm1hdEJsb2NrID0gXCJwXCI7XHJcbiAgICAvKiog5a2X5L2T6aKc6ImyICovXHJcbiAgICBmb3JlQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAvKiog6auY5Lqu6ImyICovXHJcbiAgICBiYWNrQ29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAvKiog5b2T5YmN5Luj56CB6K+t6KiAICovXHJcbiAgICBjb2RlID0gJ0pzJztcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDlrZfmoLfpnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvbnRGYW1pbHlQYW5uZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDlrZflj7fpnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvbnRTaXplUGFubmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5paH5pys5qC85byP6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+S9k+minOiJsumdouadvyAqL1xyXG4gICAgc3dpdGNoRm9yZUNvbG9yUGFubmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA6IOM5pmv6Imy6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hCYWNrQ29sb3JQYW5uZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDku6PnoIHor63oqIDpnaLmnb8gKi9cclxuICAgIHN3aXRjaENvZGVQYW5uZWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDpu5jorqTlt6blr7npvZAgKi9cclxuICAgIGp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeUxlZnQnO1xyXG4gICAgLyoqIOaYr+WQpuWkhOS6jue8lui+keeKtuaAgeS4rSAqL1xyXG4gICAgaXNJbkVkaXRTdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKiDorrDkvY/nmoRyYW5nZSAqL1xyXG4gICAgcmFuZ2U6IGFueTtcclxuICAgIC8qKiDmmK/lkKblhajlsY8sIOm7mOiupGZhbHNlICovXHJcbiAgICBmdWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKiog54i25YWD57SgICovXHJcbiAgICBwYXJlbnQhOiBIVE1MRWxlbWVudDtcclxuICAgIC8qKiDpu5jorqTmoLzlvI8gKi9cclxuICAgIHN0YXRpYyBGT1JNQVQgPSB7XHJcbiAgICAgICAgZm9ybWF0QmxvY2s6ICdwJyxcclxuICAgICAgICBmb3JlQ29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgYmFja0NvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgIGp1c3RpZnlBY3RpdmU6ICdqdXN0aWZ5TGVmdCcsXHJcbiAgICAgICAgZm9udFNpemU6IHsga2V5OiBcInNtYWxsXCIsIHZhbHVlOiBcIjNcIiB9LFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHsga2V5OiBcIuW+rui9r+mbhem7kVwiLCB2YWx1ZTogXCJNaWNyb3NvZnQgWWFoZWlcIiB9XHJcbiAgICB9O1xyXG4gICAgb25DaGFuZ2U6IChodG1sOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB1bmRlZmluZWQ7XHJcbiAgICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgcHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgIH1cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52aHRtbCA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9ybWF0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gdGhpcy5yZW5kZXIyLnBhcmVudE5vZGUodGhpcy5lZGl0b3IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbpu5jorqTmoLzlvI9cclxuICAgICAqL1xyXG4gICAgaW5pdEZvcm1hdERhdGEoKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpoLmnpzpnaLmnb/kuI3ogZrnhKbliJnkvb/pnaLmnb/ogZrnhKZcclxuICAgICAqL1xyXG4gICAgcGFubmVsRm9jdXMoKSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFubmVsLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56Gu5L+d57yW6L6R6Z2i5p2/6IGa54Sm77yM6K6+572u57yW6L6R6Z2i5p2/5LiK5qyh5YWJ5qCH5Li65b2T5YmN5YWJ5qCHXHJcbiAgICAgKiBAcGFyYW0gZVxyXG4gICAgICovXHJcbiAgICByZWNvdmVyUmFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhbm5lbCkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDnoa7kv53nvJbovpHpnaLmnb/lhYjmmK/ogZrnhKbnmoRcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHsgLy8g5a2Y5Zyo5LiK5qyh5YWJ5qCH77yM5YiZ6K6+572u5LiK5qyh5YWJ5qCHXHJcbiAgICAgICAgICAgIEN1cnNvclV0aWwuc2V0Rmlyc3RSYW5nZSh0aGlzLnJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFNlbGVjdGlvblRvRWxlbWVudCh0aGlzLnBhbm5lbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogMS7ogZrnhKbpnaLmnb/lubbojrflj5bkuIrmrKHlhYnmoIfkvY3nva4s6K6+572u5b2T5YmN5Y6G5Y+y57yW6L6R5qC35byPXHJcbiAgICAgKiAyLueCueWHu+e8lui+keadoeeahOWRveS7pOaIluiAhee8lui+kemdouadv+WQju+8jOWwhuinhuS4uue8lui+keeKtuaAgVxyXG4gICAgICogQHBhcmFtICByZWNvdmVyPyDmmK/lkKbpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIdcclxuICAgICAqL1xyXG4gICAgc3RhcnRFZGl0KHJlY292ZXI6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgLy8g5oGi5aSN5LiK5qyh5YWJ5qCH77yI54K55Ye757yW6L6R6Z2i5p2/5LiN6ZyA6KaB5oGi5aSN5LiK5qyh5YWJ5qCH77yM54K55Ye757yW6L6R5p2h6ZyA6KaB5oGi5aSN5LiK5qyh5YWJ5qCH77yJXHJcbiAgICAgICAgaWYgKHJlY292ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvdmVyUmFuZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0RWRpdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Zi75q2i6buY6K6k5LqL5Lu26Ziy5q2i5aSx54Sm77yM56Gu5L+d57yW6L6R6Z2i5p2/6IGa54Sm77yM6K6+572u5Y6G5Y+y5YWJ5qCH5ZKM5qC85byPXHJcbiAgICAgKiBAcGFyYW0gIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBlbnN1cmVGb2N1cyhlOiBFdmVudCkge1xyXG4gICAgICAgIC8vIOmYu+atouWkseeEplxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyDnvJbovpHliJ3lp4vljJZcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm55So6KGM5YaFc3R5bGVcclxuICAgICAqIEBwYXJhbSBmIOaYr+WQpuWQr+eUqHN0eWxl77yM6buY6K6k5L2/55SoXHJcbiAgICAgKi9cclxuICAgIHN0eWxlV2l0aENTUyhmOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuY21kKCdzdHlsZVdpdGhDU1MnLCBmYWxzZSwgZik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvJbovpHliJ3lp4vljJblkozorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAqL1xyXG4gICAgaW5pdEVkaXQoKSB7XHJcbiAgICAgICAgLy8g5Zyo57yW6L6R54q25oCB5LiN5YaN5qyh6L+b6KGM5Yid5aeL5YyWXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbkVkaXRTdGF0dXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmoIforrDpnaLmnb/lpITkuo7nvJbovpHnirbmgIFcclxuICAgICAgICBpZiAoIXRoaXMuaXNJbkVkaXRTdGF0dXMpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0luRWRpdFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAgICAvLyDlnKjku6PnoIHljLrkuI3orr7nva7ljoblj7LmoLzlvI9cclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpoLmnpzlhYnmoIflkajlm7TmnInlhoXlrrnliJnkuI3orr7nva7ljoblj7LmoLzlvI9cclxuICAgICAgICBjb25zdCBlbCA9IEN1cnNvclV0aWwuZ2V0UmFuZ2VDb21tb25QYXJlbnQoKTtcclxuICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNtZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgdGhpcy5mb3JtYXRCbG9jayk7XHJcbiAgICAgICAgLy8g5aaC5p6c57yW6L6R5Zmo5YaF5rKh5pyJ5paH5pys5qCH562+77yM5paH5a2X5a+56b2Q5ZG95Luk5LiN6IO956ys5LiA5Liq5omn6KGMXHJcbiAgICAgICAgLy8g5ZCm5YiZ5Lya5bCG5YWJ5qCH6K6+5Yiw5LiL5LiA5Liq5paH5pys5qCH562+5YaFXHJcbiAgICAgICAgdGhpcy5jbWQodGhpcy5qdXN0aWZ5QWN0aXZlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJmb250TmFtZVwiLCBmYWxzZSwgdGhpcy5mb250RmFtaWx5LnZhbHVlKTtcclxuICAgICAgICB0aGlzLmNtZChcImZvcmVDb2xvclwiLCBmYWxzZSwgdGhpcy5mb3JlQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiYmFja0NvbG9yXCIsIGZhbHNlLCB0aGlzLmJhY2tDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnRTaXplJywgZmFsc2UsIHRoaXMuZm9udFNpemUudmFsdWUpO1xyXG4gICAgICAgIC8vIOWvueiuvue9ruWtl+S9k+Wkp+Wwj+WBmueJueauiuWkhOeQhlxyXG4gICAgICAgIHRoaXMuYWRqdXN0Rm9udFNpemVXaXRoU3R5bGUodGhpcy5mb250U2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZfmoLdcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb250TmFtZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKTtcclxuICAgICAgICB0aGlzLnN3aXRjaEZvbnRGYW1pbHlQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseXNbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmNtZChcImZvbnROYW1lXCIsIGZhbHNlLCB0aGlzLmZvbnRGYW1pbHkudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5a2X5Y+3XHJcbiAgICAgKi9cclxuICAgIHNldEZvbnRTaXplKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgY29uc3QgdCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb250U2l6ZVBhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMuZm9udFNpemVzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuY21kKFwiZm9udFNpemVcIiwgZmFsc2UsIGZvbnRTaXplLnZhbHVlKTtcclxuICAgICAgICB0aGlzLmFkanVzdEZvbnRTaXplV2l0aFN0eWxlKGZvbnRTaXplIGFzIGFueSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiwg+aVtOWtl+S9k+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtICBmb250U2l6ZVxyXG4gICAgICogQHBhcmFtICB2YWx1ZSRcclxuICAgICAqL1xyXG4gICAgYWRqdXN0Rm9udFNpemVXaXRoU3R5bGUoZm9udFNpemU6IHsgdmFsdWU6IG51bWJlciwgdmFsdWUkOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGZvbnRzID0gQ29tbW9uVXRpbC5wYXJlbnQoZWwsIDIpLnF1ZXJ5U2VsZWN0b3JBbGwoYGZvbnRbc2l6ZT1cIiR7Zm9udFNpemUudmFsdWV9XCJdYCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb250U2l6ZS52YWx1ZSQ7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmb250cywgZm9udCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyMi5yZW1vdmVBdHRyaWJ1dGUoZm9udCwgJ3NpemUnKTtcclxuICAgICAgICAgICAgZm9udC5zdHlsZS5mb250U2l6ZSA9IHZhbHVlID09PSAnaW5oZXJpdCcgPyAnaW5oZXJpdCcgOiBmb250U2l6ZS52YWx1ZSQgKyAncmVtJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWh+acrOagvOW8j1xyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvcm1hdEJsb2NrKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgY29uc3QgdCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBmb3JtYXRCbG9jayA9IHRoaXMuZm9ybWF0QmxvY2tzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5mb3JtYXRCbG9jayA9IGZvcm1hdEJsb2NrLmtleTtcclxuICAgICAgICB0aGlzLmNtZChcImZvcm1hdEJsb2NrXCIsIGZhbHNlLCBcIjxcIiArIHRoaXMuZm9ybWF0QmxvY2sgKyBcIj5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7liY3mma/oibJcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb3JlQ29sb3IoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgeCA9IHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaW0xXCIpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZShcImRhdGEtZGltMlwiKTtcclxuICAgICAgICB0aGlzLnN3aXRjaEZvcmVDb2xvclBhbm5lbCA9ICF0aGlzLnN3aXRjaEZvcmVDb2xvclBhbm5lbDtcclxuICAgICAgICBpZiAoeCA9PT0gbnVsbCB8fCB5ID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5mb3JlQ29sb3IgPSB0aGlzLmNvbG9yc1t4XVt5XTtcclxuICAgICAgICB0aGlzLmNtZChcImZvcmVDb2xvclwiLCBmYWxzZSwgdGhpcy5mb3JlQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6IOM5pmv6ImyKOmrmOS6ruiJsilcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRCYWNrQ29sb3IoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgeCA9IHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaW0xXCIpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZShcImRhdGEtZGltMlwiKTtcclxuICAgICAgICB0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCA9ICF0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbDtcclxuICAgICAgICBpZiAoeCA9PT0gbnVsbCB8fCB5ID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSB0aGlzLmNvbG9yc1t4XVt5XTtcclxuICAgICAgICB0aGlzLmNtZChcImJhY2tDb2xvclwiLCBmYWxzZSwgdGhpcy5iYWNrQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Luj56CB6K+t6KiAXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0Q29kZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXku6PnoIHljLp+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hDb2RlUGFubmVsID0gIXRoaXMuc3dpdGNoQ29kZVBhbm5lbDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmNvZGUgPSB0aGlzLmNvZGVzW2luZGV4XTtcclxuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5jb2RlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8cD48YnIvPjwvcD48cHJlIHN0eWxlPVwid2hpdGUtc3BhY2U6IHByZVwiIHRpdGxlPVwi5Luj56CB5Yy6XCI+PGNvZGUgY2xhc3M9XCIke2NvZGV9XCI+PHA+PGJyLz48L3A+PC9jb2RlPjwvcHJlPjxwPjxici8+PC9wPmA7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVGb3JtYXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICBjb25zdCBwZWwgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCk7XHJcbiAgICAgICAgY29uc3QgYm94ID0gQ29tbW9uVXRpbC5wcmVTaWJsaW5nKHBlbCkgYXMgYW55O1xyXG4gICAgICAgIC8vIOaPkuWFpWh0bWzlkI7vvIzlsIblhYnmoIfnp7voh7Pku6PnoIHljLrnmoRw5qCH562+5LitXHJcbiAgICAgICAgQ3Vyc29yVXRpbC5zZXRSYW5nZVRvRWxlbWVudChib3guY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0sIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTsgLy8g5omL5Yqo6K6+572u5LiA5LiLXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooYzlhoXmjaLooYzvvIhzaGlmdCtlbnRlcu+8iVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGluc2VydEJyT25SZXR1cm4oZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0KCdpbnNlcnRCck9uUmV0dXJuJykpIHtcclxuICAgICAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgJzxicj48YnI+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEJyT25SZXR1cm4nLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nspfkvZNcclxuICAgICAqL1xyXG4gICAgc3dpdGNoQm9sZChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiYm9sZFwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlpzkvZNcclxuICAgICAqL1xyXG4gICAgc3dpdGNoSXRhbGljKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJpdGFsaWNcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5LiL5YiS57q/XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFVuZGVybGluZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwidW5kZXJsaW5lXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWIoOmZpOe6v1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hTdHJpa2VUaHJvdWdoKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJzdHJpa2VUaHJvdWdoXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ri/lj5bmtojkuIrmoIdcclxuICAgICAqL1xyXG4gICAgc3VwZXJzY3JpcHQoZTogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwic3VwZXJzY3JpcHRcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572uL+WPlua2iOS4i+agh1xyXG4gICAgICovXHJcbiAgICBzdWJzY3JpcHQoZTogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwic3Vic2NyaXB0XCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWh+Wtl+Wvuem9kOaWueWQkVxyXG4gICAgICogQHBhcmFtICBlIOS6i+S7tlxyXG4gICAgICogQHBhcmFtICBzdHJcclxuICAgICAqL1xyXG4gICAgc2V0SnVzdGlmeWFjdGl2ZShlOiBFdmVudCwgc3RyOiAnTGVmdCcgfCAnUmlnaHQnIHwgJ0NlbnRlcicgfCAnRnVsbCcpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5JyArIHN0cjtcclxuICAgICAgICB0aGlzLmNtZCh0aGlzLmp1c3RpZnlBY3RpdmUsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qei/m1xyXG4gICAgICovXHJcbiAgICBpbmRlbnQoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImluZGVudFwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4/lsJHnvKnov5tcclxuICAgICAqL1xyXG4gICAgb3V0ZGVudChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwib3V0ZGVudFwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXmnInluo/liJfooahcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0T3JkZXJlZExpc3QoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImluc2VydE9yZGVyZWRMaXN0XCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeaXoOW6j+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRVbm9yZGVyZWRMaXN0KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJpbnNlcnRVbm9yZGVyZWRMaXN0XCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeihqOagvOiwg+i1t+aPkuWFpeihqOagvFVJXHJcbiAgICAgKi9cclxuICAgIGluc2VydFRhYmxlKGU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfku6PnoIHljLrml6Dms5Xmj5LlhaXooajmoLx+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiBcIuaPkuWFpeihqOagvFwiLCBhbmltYXRpb246IFwic2NhbGVcIiwgY29udGVudDogVUlUYWJsZUNvbXBvbmVudCwgaGFuZGxlcjogdGhpcywgdGhlbWU6IHRoaXMudGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+ihqOagvFVJ5by556qX56Gu6K6k5pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVUYWJsZUhUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpei2hemTvuaOpeiwg+i1t+aPkuWFpei2hemTvuaOpVVJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0TGluayhlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn5Luj56CB5Yy65peg5rOV5o+S5YWl6ZO+5o6lficpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxlcnQoeyB0aXRsZTogXCLmj5LlhaXpk77mjqVcIiwgYW5pbWF0aW9uOiBcInNjYWxlXCIsIGNvbnRlbnQ6IFVJTGlua0NvbXBvbmVudCwgaGFuZGxlcjogdGhpcywgdGhlbWU6IHRoaXMudGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+i2hemTvuaOpVVJ5by556qX56Gu6K6k5pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVMaW5rSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIGxldCBlbDogYW55ID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpO1xyXG4gICAgICAgIGVsID0gdGhpcy5yZW5kZXIyLnBhcmVudE5vZGUoZWwpO1xyXG4gICAgICAgIGlmIChlbC5zdHlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcjIucmVtb3ZlQXR0cmlidXRlKGVsLCAnc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXlm77niYfosIPotbfmj5LlhaXlm77niYdVSVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGluc2VydEZpbGUoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+S7o+eggeWMuuaXoOazleaPkuWFpeaWh+S7tn4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFsZXJ0KHsgdGl0bGU6IFwi5o+S5YWl5paH5Lu2XCIsIGFuaW1hdGlvbjogXCJzY2FsZVwiLCBjb250ZW50OiBVSUFubmV4Q29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfkuIrkvKDmnKzlnLDmlofku7bml7bltYzlhaViYXNlNjTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUxvY2FsRmlsZUhUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfigJzmj5LlhaXlpJbpk77igJ3ml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUZpbGVMaW5rSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsITpgInmi6nmlofku7bkuovku7ZcclxuICAgICAqIEBwYXJhbSAgdHlwZSDmlofku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAgZmlsZSDmlofku7ZcclxuICAgICAqIEBwYXJhbSAgcGFyc2VyIOS8oOWFpXNyY+iOt+WPlmh0bWxcclxuICAgICAqIEBwYXJhbSAgY2xvc2UgIOWFs+mXreW8ueeql+WSjOmBrue9qVxyXG4gICAgICovXHJcbiAgICBlbWl0VXBsb2FkRmlsZSh0eXBlOiAnaW1hZ2UnIHwgJ2F1ZGlvJyB8ICd2aWRlbycsIGZpbGU6IGFueSwgcGFyc2VyOiAodjogc3RyaW5nKSA9PiBzdHJpbmcsIGNsb3NlOiAoYjogYm9vbGVhbiwgdD86IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZS5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZSwgZmlsZSwgY2FsbGJhY2s6IChzcmM6IHN0cmluZyB8IGJvb2xlYW4sIHQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIXNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjaWV2ZUZpbGVMaW5rSFRNTChwYXJzZXIoc3JjIGFzIHN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xvc2UoISFzcmMsIHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaVoclxyXG4gICAgICovXHJcbiAgICBpbnNlcnRIb3Jpem9udGFsUnVsZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwiaW5zZXJ0SG9yaXpvbnRhbFJ1bGVcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57KY6LS0XHJcbiAgICAgKi9cclxuICAgIHBhc3RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJwYXN0ZVwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliarliIdcclxuICAgICAqL1xyXG4gICAgY3V0KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJjdXRcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIGNvcHkoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImNvcHlcIiwgZmFsc2UsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5Lit5omA5pyJXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdEFsbChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKFwic2VsZWN0QWxsXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeWBmlxyXG4gICAgICovXHJcbiAgICByZWRvKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJyZWRvXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSpOmUgFxyXG4gICAgICovXHJcbiAgICB1bmRvKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJ1bmRvXCIsIGZhbHNlLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOmAieS4rVxyXG4gICAgICovXHJcbiAgICBkZWxldGVTZWxlY3QoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZChcImRlbGV0ZVwiLCBmYWxzZSwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bljoblj7LovpPlhaVcclxuICAgICAqL1xyXG4gICAgaGlzdG9yeSgpIHtcclxuICAgICAgICB0aGlzLnZodG1sID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlZGl0b3JfaW5wdXQnKSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOagvOW8j++8jOS4jemYu+atouWkseeEpu+8jOmHjeaWsOiBmueEpuaXtuS8muiuvue9ruWOhuWPsuagvOW8j1xyXG4gICAgICovXHJcbiAgICByZW1vdmVGb3JtYXQoKSB7XHJcbiAgICAgICAgdGhpcy5jbWQoXCJyZW1vdmVGb3JtYXRcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvcm1hdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WQhOexu+S4i+aLieahhlxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGhpZGVTd2l0Y2hQYW5uZWwoZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvbnRGYW1pbHlQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb250TmFtZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9udFNpemVFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9yZUNvbG9yUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9yZUNvbG9yRWwsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5iYWNrQ29sb3JFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9ybWF0QmxvY2tFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoQ29kZVBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmNvZGVFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaENvZGVQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxj+aIluWPlua2iOWFqOWxj1xyXG4gICAgICovXHJcbiAgICBTd2l0Y2hTY3JlZW4oKSB7XHJcbiAgICAgICAgY29uc3QgZWRpdG9yOiBhbnkgPSB0aGlzLmVkaXRvcjtcclxuICAgICAgICBjb25zdCBoZWFkZXI6IGFueSA9IHRoaXMuaGVhZGVyO1xyXG4gICAgICAgIGNvbnN0IHBhbm5lbDogYW55ID0gdGhpcy5wYW5uZWw7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyOiBhbnkgPSB0aGlzLmZvb3RlcjtcclxuICAgICAgICB0aGlzLmZ1bGwgPSAhdGhpcy5mdWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bGwpIHsgLy8g5YWo5bGPXHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6OTk5OTk7dG9wOjA7bGVmdDowO3RyYW5zZm9ybTpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7JztcclxuICAgICAgICAgICAgcGFubmVsLnN0eWxlLmNzc1RleHQgPSBgbWF4LWhlaWdodDp1bnNldDtoZWlnaHQ6JHt3aW5kb3cuaW5uZXJIZWlnaHQgLSBoZWFkZXIub2Zmc2V0SGVpZ2h0IC0gZm9vdGVyLm9mZnNldEhlaWdodH1weDtgO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVkaXRvcik7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgIC8vIOi/mOWOn1xyXG4gICAgICAgICAgICBlZGl0b3Iuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgICAgICBwYW5uZWwuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChlZGl0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouaYr+WQpuaUr+aMgeWRveS7pFxyXG4gICAgICogQHBhcmFtIGNtZCDlkb3ku6RcclxuICAgICAqL1xyXG4gICAgaXNTdXBwb3J0KGNtZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZChjbWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omn6KGM5bCB6KOF55qE57yW6L6R5ZG95LukXHJcbiAgICAgKiBAcGFyYW0gayDlkb3ku6TlkI3np7BcclxuICAgICAqIEBwYXJhbSB1aSDmiZPlvIB1aeW8ueeql1xyXG4gICAgICogQHBhcmFtIHYg6K6+572u5ZG95Luk5YC8XHJcbiAgICAgKiBAcmV0dXJucyB0cnVlLeiuvue9ruaIkOWKn++8jGZhbHNlLeiuvue9ruWksei0pVxyXG4gICAgICovXHJcbiAgICBjbWQoazogc3RyaW5nLCB1aTogYm9vbGVhbiwgdj86IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoaykpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn57O757uf5LiN5pSv5oyB6K+l5ZG95LukficpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdoaXRlTGlzdCA9ICdpbnNlcnRIVE1MLHBhc3RlLGN1dCxjb3B5LHJlbW92ZUZvcm1hdCxkZWxldGUsc2VsZWN0QWxsLHJlZG8sdW5kbyxpbnNlcnRCck9uUmV0dXJuJztcclxuICAgICAgICBpZiAod2hpdGVMaXN0LmluZGV4T2YoaykgPCAwICYmIHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+S7o+eggeWMuuWGheaXoOazleaJp+ihjOivpeWRveS7pH4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoaywgdWksIHYgfHwgXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbnB1dCxjbGljayxzZWxlY3Rpb25jaGFuZ2Xkuovku7borrDlvZXnvJbovpHpnaLmnb/lhYnmoIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgc2V0UmFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IEN1cnNvclV0aWwuZ2V0UmFuZ2UoMCwgdGhpcy5wYW5uZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5oyJ6ZSu5LqL5Lu2ICjlpITnkIZ0YWLnvKnov5spXHJcbiAgICAgKiBAcGFyYW0gZSDmjInplK7kuovku7ZcclxuICAgICAqL1xyXG4gICAga2V5ZG93bihlOiBFdmVudCB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZSB8fCBlLndoaWNoIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgaWYgKGtleSAhPT0gOSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaMieS4i3RhYumUru+8jOWinuWKoOe8qei/mzLkuKrnqbrmoLxcclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgQXJyYXkoNSkuam9pbignJm5ic3A7Jyk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdGFiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76Z2i5p2/XHJcbiAgICAgKi9cclxuICAgIHBhbm5lbE9uQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOe8lui+kemdouadv+S4reeymOi0tFxyXG4gICAgICovXHJcbiAgICBwYW5uZWxPblBhc3RlKGU6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3Qgb2JqID0gQ29tbW9uVXRpbC5pc0lFKCkgYXMgYW55ID8gd2luZG93IDogZTtcclxuICAgICAgICBpZiAoIW9iai5jbGlwYm9hcmREYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBvYmouY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcclxuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgICAgICBDdXJzb3JVdGlsLmluc2VydE5vZGUocCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldFJhbmdlQW5kRW1pdFZhbHVlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6T5YWl5pe26K6w5L2P5YWJ5Y+Y5L2N572uICYmIGlucHV05LqL5Lu25Y+R5bCEdmFsdWUgJiYg6K6w5L2P6L6T5YWlXHJcbiAgICAgKiBAcGFyYW0gIGFyZzBcclxuICAgICAqL1xyXG4gICAgc2V0UmFuZ2VBbmRFbWl0VmFsdWUoYXJnMDogbnVtYmVyIHwgRXZlbnQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzAgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGFyZzAgPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLmRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5uZXJIVE1MID0gdGhpcy5wYW5uZWwuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52aHRtbCA9PT0gaW5uZXJIVE1MKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAvLyDmnInlhoXlrrnml7bmiY3kv53lrZjliLDmnKzlnLBcclxuICAgICAgICAgICAgY29uc3QgbGVuID0gKHRoaXMucGFubmVsLmlubmVyVGV4dCB8fCB0aGlzLnBhbm5lbC50ZXh0Q29udGVudCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobGVuID4gMSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZGl0b3JfaW5wdXQnLCBpbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIDEu5Y+R5bCEaW5uZXJIVE1MLGlucHV05LqL5Lu25o6l5pS2XHJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIC8vIDIu6Kem5Y+RbmdNb2RlbENoYW5nZeS6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGlubmVySFRNTCk7XHJcbiAgICAgICAgfSwgYXJnMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsITnvJbovpHlhoXlrrlcclxuICAgICAqL1xyXG4gICAgZW1pdENvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IHNpemUgPSAwO1xyXG4gICAgICAgIGNvbnN0IGVkaXRQYW5uZWwgPSB0aGlzLnBhbm5lbCBhcyBhbnk7XHJcbiAgICAgICAgLy8g5qOA5rWL57yW6L6R5YaF5a655aSn5bCPXHJcbiAgICAgICAgbGV0IGlubmVySFRNTDogc3RyaW5nID0gZWRpdFBhbm5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGlubmVySFRNTC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjID0gaW5uZXJIVE1MLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjID4gMCAmJiBjIDwgMjU1KSB7XHJcbiAgICAgICAgICAgICAgICBzaXplKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUgPiB0aGlzLm9wdGlvbnMkLm1heHNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn57yW6L6R5YaF5a656LaF5Ye65aSn5bCPficpO1xyXG4gICAgICAgICAgICBpbm5lckhUTUwgPSBpbm5lckhUTUwuc3Vic3RyKDAsIHRoaXMub3B0aW9ucyQubWF4c2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGltYWdlID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICdpbWcnKTtcclxuICAgICAgICBjb25zdCBhdWRpbyA9IHRoaXMuZ2V0VXJsc0J5VGFnKHRoaXMucGFubmVsLCAnYXVkaW8nKTtcclxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMuZ2V0VXJsc0J5VGFnKHRoaXMucGFubmVsLCAndmlkZW8nKTtcclxuICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgIGlubmVySFRNTCxcclxuICAgICAgICAgICAgaW5uZXJURVhUOiBlZGl0UGFubmVsLmlubmVyVGV4dCB8fCBlZGl0UGFubmVsLnRleHRDb250ZW50LFxyXG4gICAgICAgICAgICB1cmxzOiB7IGltYWdlLCBhdWRpbywgdmlkZW8gfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWNpZXZlQ29udGVudC5lbWl0KG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmib7nm67moIflhYPntKDnmoTnmoTmn5DkuKrmoIfnrb7nmoR1cmxz5ZKMYmFzZTY055qEdXJsXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWFg+e0oFxyXG4gICAgICogQHBhcmFtIHRhZyDmoIfnrb5cclxuICAgICAqL1xyXG4gICAgZ2V0VXJsc0J5VGFnKHRhcmdldDogSFRNTEVsZW1lbnQsIHRhZzogc3RyaW5nKTogeyB0eXBlOiAndXJsJyB8ICdiYXNlNjQnLCBzcmM6IHN0cmluZyB9W10ge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFtdIGFzIGFueTtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGFyZ2V0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZy50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhZ3MsIGVsZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0ge30gYXMgYW55O1xyXG4gICAgICAgICAgICBjb25zdCBzcmMgPSBlbGVtLnNyYztcclxuICAgICAgICAgICAgaWYgKHNyYy5pbmRleE9mKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSAndXJsJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9ICdiYXNlNjQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0uc3JjID0gc3JjO1xyXG4gICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6IyD5Zu0UmFuZ2XmmK/lkKblkozku6PnoIHljLrmnInkuqTpm4ZcclxuICAgICAqIEByZXR1cm5zIHRydWUgLSDmnInkuqTpm4bvvIxmYWxzZSAtIOaXoOS6pOmbhlxyXG4gICAgICovXHJcbiAgICBpc1JhbmdlSW5Db2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMucGFubmVsRm9jdXMoKTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpIGFzIGFueTtcclxuICAgICAgICBpZiAoIXBhcmVudCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAvLyDlpoLmnpzmmK/mlofmnKzoioLngrnliJnmib7lhbbniLblhYPntKBcclxuICAgICAgICBpZiAocGFyZW50Lm5vZGVUeXBlID09PSAzKSB7IHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlOyB9XHJcbiAgICAgICAgcmV0dXJuICgoKSA9PiB7IC8vIOiiq+WMheWQq1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50JCA9IHBhcmVudDtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1jb25kaXRpb25hbC1hc3NpZ25tZW50XHJcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQkID0gcGFyZW50JC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50JC50YWdOYW1lID09PSAnQ09ERScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQkID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSkoKSB8fCAoKCkgPT4geyAvLyDljIXlkKtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnY29kZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZXMgJiYgbm9kZXMubGVuZ3RoO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2FzdOaPkOekulxyXG4gICAgICogQHBhcmFtICB0ZXh0PyB0b2FzdOaPkOekuiDpu5jorqTkuLrigJjorr7nva7ml6DmlYh+4oCZXHJcbiAgICAgKiBAcGFyYW0gIGR1cmF0aW9uPyDlgZznlZnml7bpl7RcclxuICAgICAqL1xyXG4gICAgdG9hc3QodGV4dDogc3RyaW5nID0gJ+iuvue9ruaXoOaViH4nLCBvYmo/OiB7IGR1cmF0aW9uOiBudW1iZXIsIGVudGVyOiBudW1iZXIsIGxlYXZlOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbVNlcnZpY2UudG9zdCh7IHRleHQsIC4uLm9iaiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8ueeql1xyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICovXHJcbiAgICBhbGVydChvYmo6IFdpbmRvd09wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb21TZXJ2aWNlLmFsZXJ0KG9iaik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Ziy5oqWXHJcbiAgICAgKiBAcGFyYW0gIGYg5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gIHQ/IOmYsuaKluaXtuW7tiDpu5jorqQzMDBtc1xyXG4gICAgICovXHJcbiAgICBkZWJvdW5jZShmOiAoKSA9PiB2b2lkLCB0OiBudW1iZXIgPSAzMDApIHtcclxuICAgICAgICBjb25zdCBvID0gdGhpcy5kZWJvdW5jZSBhcyBhbnk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KG8udGltZXIpO1xyXG4gICAgICAgIG8udGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZigpO1xyXG4gICAgICAgIH0sIHQpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=