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
import { Component, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
        this.vhtml$ = '<p>请输入内容~</p>';
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
        this.fontSizes = [{ key: 'x-small', value: '1', value$: 10 / 16 }, { key: 'small', value: '2', value$: 12 / 16 }, { key: 'medium', value: '3', value$: 16 / 16 }, { key: 'large', value: '4', value$: 18 / 16 }, { key: 'x-large', value: '5', value$: 24 / 16 }, { key: 'xx-large', value: '6', value$: 32 / 16 }, { key: 'xxx-large', value: '7', value$: 48 / 16 }];
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
        this.fontSize = { key: 'small', value: 2, value$: 12 / 16 }; // 默认.75rem;
        // 默认.75rem;
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
         * 是否加粗
         */
        this.isBold = false;
        /**
         * 是否斜体
         */
        this.isItalic = false;
        /**
         * 是否下划线
         */
        this.isUnderline = false;
        /**
         * 是否删除线
         */
        this.isStrikeThrough = false;
        /**
         * 默认无上下标
         */
        this.scriptActive = '';
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
        /**
         * 是否在代码区, 默认false
         */
        this.inCode = false;
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
        return (this.footerRef || { nativeElement: { offsetHeight: 0 } }).nativeElement;
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
     * 传入的html
     * @param {?} v
     * @return {?}
     */
    set vhtml(v) {
        this.vhtml$ = v;
        this.range = null;
        this.inCode = false;
    }
    /**
     * @return {?}
     */
    get vhtml() {
        return this.vhtml$;
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
        const id = (Math.random() + '').slice(2, 8);
        /** @type {?} */
        const html = `<pre style="white-space:pre;" title="代码区"><code class="${code}"><p id="${id}"><br/></p></code></pre><p><br/></p>`;
        this.cmd('insertHTML', false, html);
        // 插入html后，将光标移至代码区的p标签中
        CursorUtil.setSelectionToElement((CommonUtil.id(id)), true);
        this.detectCode();
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
        this.isBold = !this.isBold;
    }
    /**
     * 设置斜体
     * @param {?} e
     * @return {?}
     */
    switchItalic(e) {
        this.ensureFocus(e);
        this.cmd('italic', false, '');
        this.isItalic = !this.isItalic;
    }
    /**
     * 设置下划线
     * @param {?} e
     * @return {?}
     */
    switchUnderline(e) {
        this.ensureFocus(e);
        this.cmd('underline', false, '');
        this.isUnderline = !this.isUnderline;
    }
    /**
     * 设置删除线
     * @param {?} e
     * @return {?}
     */
    switchStrikeThrough(e) {
        this.ensureFocus(e);
        this.cmd('strikeThrough', false, '');
        this.isStrikeThrough = !this.isStrikeThrough;
    }
    /**
     * 设置/取消上/下标
     * @param {?} e
     * @param {?} cmd
     * @return {?}
     */
    setScript(e, cmd) {
        this.ensureFocus(e);
        if (this.scriptActive === cmd) { // 取消上/下标
            this.cmd(cmd, false, '');
            this.scriptActive = '';
            return;
        }
        // 设置上/下标
        this.scriptActive = cmd;
        this.cmd(cmd, false, '');
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
        return true;
    }
    /**
     * 插入图片调起插入图片UI
     * @param {?} e 事件
     * @return {?}
     */
    insertFile(e) {
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
     * @param {?} e
     * @return {?}
     */
    history(e) {
        this.ensureFocus(e);
        this.vhtml = window.localStorage.getItem('editor_input') || '';
        setTimeout((/**
         * @return {?}
         */
        () => {
            // 重设光标
            CursorUtil.setSelectionToElement(this.pannel, false);
            this.setRange();
            this.autoActive();
        }));
        // 1.发射innerHTML,input事件接收
        this.onInput.emit(this.vhtml);
        // 2.触发ngModelChange事件
        this.onChange(this.vhtml);
    }
    /**
     * 清除格式，不阻止失焦，重新聚焦时会设置历史格式
     * @return {?}
     */
    removeFormat() {
        this.cmd('removeFormat', false);
        this.initFormatData();
        this.setDefaultFormat();
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
     * 监听按键弹起事件
     * @param {?} e 按键弹起事件
     * @return {?}
     */
    keyup(e) {
        this.setRange();
        if (this.detectCode()) {
            return;
        }
        // tslint:disable-next-line: deprecation
        e = e || window.event;
        /** @type {?} */
        const key = e.keyCode || e.which || e.charCode;
        // 监听home,end和上下左右按键，或后退键或删除键或enter键，设置激活文字格式
        if ((key >= 35 && key <= 40) || key === 8 || key === 46 || key === 13) {
            this.autoActive();
            return;
        }
    }
    /**
     * 点击面板
     * @return {?}
     */
    pannelOnClick() {
        this.initEdit();
        this.setRange();
        this.autoActive();
        // 点击后检测是否在代码区内，光标在click后出现，
        // 所以这里需要设置延时任务触发检测。
        setTimeout((/**
         * @return {?}
         */
        () => this.detectCode()));
    }
    /**
     * 在编辑面板中粘贴（若在代码区内粘贴则清除格式！！！）
     * @param {?} e
     * @return {?}
     */
    pannelOnPaste(e) {
        setTimeout((/**
         * @return {?}
         */
        () => { this.autoActive(); }));
        if (!this.inCode) { // 不在代码区
            this.setRangeAndEmitValue(0);
            return;
        }
        /** @type {?} */
        const obj = CommonUtil.isIE() ? window : e;
        if (!obj.clipboardData) {
            return;
        }
        /** @type {?} */
        const text = obj.clipboardData.getData('text');
        /** @type {?} */
        const df = document.createDocumentFragment();
        df.appendChild(document.createTextNode(text));
        CursorUtil.insertNode(df);
        e.preventDefault();
        e.returnValue = false;
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
     * @private
     * @return {?}
     */
    recoverRange() {
        if (!this.pannel) {
            return;
        }
        // 确保编辑面板先是聚焦的
        this.pannelFocus();
        if (this.range) { // 存在上次光标，则设置上次光标
            CursorUtil.setFirstRange(this.range);
            return;
        }
        CursorUtil.setSelectionToElement(this.pannel, false);
    }
    /**
     * 1.聚焦面板并获取上次光标位置,设置当前历史编辑样式
     * 2.点击编辑条的命令或者编辑面板后，将视为编辑状态
     * @private
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
     * @private
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
     * 编辑初始化和设置历史格式
     * @private
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
        // 如果光标周围有内容则不设置默认格式
        /** @type {?} */
        const el = CursorUtil.getRangeCommonParent();
        if (!el || el.nodeType === 3) {
            return;
        }
        // 在代码区不设置默认格式
        if (this.inCode) {
            return;
        }
        // 如果没有内容，则格式化默认格式
        if (!this.pannel.children || !this.pannel.children.length) {
            this.setDefaultFormat();
        }
    }
    /**
     * @return {?}
     */
    setDefaultFormat() {
        this.cmd('formatBlock', false, this.formatBlock);
        this.cmd('fontName', false, this.fontFamily.value);
        this.cmd('fontSize', false, this.fontSize.value);
    }
    /**
     * 查询是否支持命令
     * @private
     * @param {?} cmd 命令
     * @return {?}
     */
    isSupport(cmd) {
        return document.queryCommandSupported(cmd);
    }
    /**
     * 兼容insertHTML命令
     * @private
     * @param {?} html html
     * @return {?}
     */
    insertHTML(html) {
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        const range = (/** @type {?} */ (CursorUtil.getRange(0)));
        range.deleteContents();
        /** @type {?} */
        const df = document.createDocumentFragment();
        /** @type {?} */
        let name = 'div';
        if (html.indexOf('<a>') > -1) {
            name = 'span';
        }
        /** @type {?} */
        const el = document.createElement(name);
        el.innerHTML = html;
        df.appendChild(el);
        range.insertNode(df);
        return true;
    }
    /**
     * 执行封装的编辑命令
     * @private
     * @param {?} k 命令名称
     * @param {?} ui 打开ui弹窗
     * @param {?=} v 设置命令值
     * @return {?} true-设置成功，false-设置失败
     */
    cmd(k, ui, v) {
        if (!this.isSupport(k)) { // 不支持该命令
            // 尝试兼容命令
            if ('insertHTML' === k) {
                return this.insertHTML(v);
            }
            this.toast('系统不支持该命令~');
            return false;
        }
        /** @type {?} */
        const r = document.execCommand(k, ui, v || '');
        // 执行完以下命令后，非代码区内需要自动检测文字格式（样式）
        /** @type {?} */
        const blackList = 'redo,undo,delete,insertHTML,insertHorizontalRule,insertUnorderedList,insertOrderedList';
        if (r && blackList.indexOf(k) > -1 && !this.inCode) {
            this.autoActive();
        }
        return r;
    }
    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     * @private
     * @return {?}
     */
    setRange() {
        this.range = CursorUtil.getRange(0, this.pannel);
    }
    /**
     * 自动检测文字格式激活样式（加粗，斜体，下划线，删除线，上标，下标......）
     * @private
     * @return {?}
     */
    autoActive() {
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        /** @type {?} */
        let p = (/** @type {?} */ ((CursorUtil.getRangeCommonParent())));
        if (!p) {
            return;
        }
        // 如果选取对象的节点是文本节点，则将p变为其父节点
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        if (p.nodeName === '#text') {
            p = (/** @type {?} */ (p.parentNode));
        }
        if (!p) {
            return;
        }
        // 段落格式
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.formatBlock = AppZeditorComponent.FORMAT.formatBlock;
                return true;
            }
            /** @type {?} */
            const formatBlock = e.nodeName;
            /** @type {?} */
            const formatBlock$ = this.formatBlocks.find((/**
             * @param {?} fb
             * @return {?}
             */
            (fb) => {
                return fb.key.toUpperCase() === formatBlock;
            }));
            if (formatBlock$) {
                this.formatBlock = formatBlock$.key;
                return true;
            }
        }));
        // 字样
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.fontFamily = AppZeditorComponent.FORMAT.fontFamily;
                return true;
            }
            /** @type {?} */
            const fontFamily = e.getAttribute('face');
            if (!fontFamily) {
                return;
            }
            /** @type {?} */
            const fontFamily$ = this.fontFamilys.find((/**
             * @param {?} ff
             * @return {?}
             */
            (ff) => {
                return ff.value.toLowerCase() === fontFamily.toLowerCase();
            }));
            if (fontFamily$) {
                this.fontFamily = fontFamily$;
                return true;
            }
        }));
        // 字号
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.fontSize = AppZeditorComponent.FORMAT.fontSize;
                return true;
            }
            /** @type {?} */
            const fontSize = e.getAttribute('size');
            if (!fontSize) {
                return;
            }
            /** @type {?} */
            const fontSize$ = this.fontSizes.find((/**
             * @param {?} fs
             * @return {?}
             */
            (fs) => {
                return fs.value === fontSize;
            }));
            if (fontSize$) {
                this.fontSize = fontSize$;
                return true;
            }
        }));
        // 前景色
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.foreColor = AppZeditorComponent.FORMAT.foreColor;
                return true;
            }
            /** @type {?} */
            const foreColor = CommonUtil.rgbToHex(e.getAttribute('color'));
            /** @type {?} */
            const foreColor$ = CommonUtil.flat(this.colors).find((/**
             * @param {?} cr
             * @return {?}
             */
            (cr) => {
                return cr.toLowerCase() === foreColor.toLowerCase();
            }));
            if (foreColor$) {
                this.foreColor = foreColor$;
                return true;
            }
        }));
        // 背景色
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.backColor = AppZeditorComponent.FORMAT.backColor;
                return true;
            }
            /** @type {?} */
            const backColor = CommonUtil.rgbToHex(e.style.backgroundColor);
            /** @type {?} */
            const backColor$ = CommonUtil.flat(this.colors).find((/**
             * @param {?} cr
             * @return {?}
             */
            (cr) => {
                return cr.toLowerCase() === backColor.toLowerCase();
            }));
            if (backColor$) {
                this.backColor = backColor$;
                return true;
            }
        }));
        // 加粗
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isBold = AppZeditorComponent.FORMAT.isBold;
                return true;
            }
            if (e.nodeName === 'STRONG' || e.nodeName === 'B') {
                return this.isBold = true;
            }
        }));
        // 斜体
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isItalic = AppZeditorComponent.FORMAT.isItalic;
                return true;
            }
            if (e.nodeName === 'EM' || e.nodeName === 'I') {
                return this.isItalic = true;
            }
        }));
        // 下划线
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isUnderline = AppZeditorComponent.FORMAT.isUnderline;
                return true;
            }
            if (e.nodeName === 'U') {
                return this.isUnderline = true;
            }
        }));
        // 删除线
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.isStrikeThrough = AppZeditorComponent.FORMAT.isStrikeThrough;
                return true;
            }
            if (e.nodeName === 'STRIKE') {
                return this.isStrikeThrough = true;
            }
        }));
        // 上标，下标
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.scriptActive = AppZeditorComponent.FORMAT.scriptActive;
                return true;
            }
            if (e.nodeName === 'SUP') {
                return this.scriptActive = 'superscript';
            }
            if (e.nodeName === 'SUB') {
                return this.scriptActive = 'subscript';
            }
        }));
        // 对齐方式
        this.grandChildTograndParent(p, (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e === this.pannel) {
                this.justifyActive = AppZeditorComponent.FORMAT.justifyActive;
                return true;
            }
            /** @type {?} */
            const textAlign = e.getAttribute('align') || e.style.textAlign;
            if (textAlign === 'left') {
                return this.justifyActive = 'justifyLeft';
            }
            else if (textAlign === 'center') {
                return this.justifyActive = 'justifyCenter';
            }
            else if (textAlign === 'right') {
                return this.justifyActive = 'justifyRight';
            }
            else if (textAlign === 'justify') {
                return this.justifyActive = 'justifyFull';
            }
        }));
    }
    /**
     * 从最深层节点到最外层节点执行回调
     * @private
     * @param {?} start 最深层节点
     * @param {?} fn 回调 直到回调返回true时才会终止回调的执行
     * @return {?}
     */
    grandChildTograndParent(start, fn) {
        /** @type {?} */
        let o = start;
        while (!!o) {
            if (fn(o)) {
                return;
            }
            o = o.parentNode;
        }
    }
    /**
     * 找目标元素的的某个标签的urls和base64的url
     * @private
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
     * @private
     * @return {?} true - 有交集，false - 无交集
     */
    detectCode() {
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
        return this.inCode = ((/**
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
            const range = (/** @type {?} */ (CursorUtil.getRange(0)));
            if (range.cloneContents) { // 新标准
                // 新标准
                /** @type {?} */
                const ele = range.cloneContents();
                /** @type {?} */
                const childs = CommonUtil.getAllChilds(ele);
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (childs[i].nodeName === 'CODE') {
                        return true;
                    }
                }
                return false;
            }
            // 旧标准
            /** @type {?} */
            const html = range.htmlText || '';
            return /<code|<\/code>/.test(html);
        }))();
    }
    /**
     * toast提示
     * @private
     * @param {?=} text
     * @param {?=} obj
     * @return {?}
     */
    toast(text = '设置无效~', obj) {
        return this.domService.tost(Object.assign({ text }, obj));
    }
    /**
     * 弹窗
     * @private
     * @param {?} obj
     * @return {?}
     */
    alert(obj) {
        return this.domService.alert(obj);
    }
    /**
     * 防抖
     * @private
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
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikeThrough: false,
    scriptActive: '',
    formatBlock: 'p',
    foreColor: '#000000',
    backColor: '#ffffff',
    justifyActive: 'justifyLeft',
    fontSize: { key: 'small', value: '2', value$: '' },
    fontFamily: { key: '微软雅黑', value: 'Microsoft Yahei' }
};
AppZeditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-zeditor',
                template: "<div [ngClass]=\"theme\">\r\n  <div class=\"z-editor\" #editorRef (click)=\"hideSwitchPannel($event)\">\r\n    <!-- \u7F16\u8F91\u6761\u5F00\u59CB -->\r\n    <div class=\"wd-editor-bar fn-clearfix\" #headerRef>\r\n      <!-- \u4E8B\u4EF6\u6267\u884C\u5BCC\u6587\u672C\u547D\u4EE4[\u5931\u7126\u65F6\uFF0C\u547D\u4EE4\u6267\u884C\u65E0\u6548\uFF0C\u6240\u4EE5\u8981\u963B\u6B62\u5931\u7126\uFF0C\u6216\u8005\u5728\u4E8B\u4EF6\u6267\u884C\u524D\u805A\u7126] -->\r\n      <!-- \u5907\u6CE8!!!! -->\r\n      <!-- mousedown\u4E8B\u4EF6\u5728\u81EA\u8EAB\u805A\u7126\u4E4B\u524D[\u5373\u5176\u4ED6\u5143\u7D20\u5931\u7126\u805A\u7126\u4E4B\u524D]\u6267\u884C -->\r\n      <!-- \u4E0B\u9762\u4F7F\u7528mousedown\u4E8B\u4EF6\u662F\u56E0\u4E3A\u53EF\u4EE5\u4F7F\u7528e.preventDefault()\u963B\u6B62\u9ED8\u8BA4\u4E8B\u4EF6\uFF0C\u963B\u6B62\u7F16\u8F91\u9762\u677F\u5931\u7126 -->\r\n      <!-- \u800C\u9488\u5BF9\u5FC5\u5B9A\u8981\u5931\u7126\u7684\u60C5\u51B5\uFF0C\u5219\u91C7\u7528\u8BB0\u4F4F\u5149\u6807\uFF0C\u518D\u8BBE\u7F6E\u4E0A\u6B21\u8BB0\u4F4F\u7684\u5149\u6807\u7684\u65B9\u5F0F\u6765\u505A\u5230\u4F2A\u5931\u7126\u3002 -->\r\n      <!-- \u5B57\u4F53 -->\r\n      <div #fontNameRef class=\"wd-edit-link-box fontName\" (mousedown)=\"!inCode&&setFontName($event)\">\r\n        <a data-tip=\"\u5B57\u4F53\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span [ngStyle]=\"{'font-family': fontFamily.value}\">{{fontFamily.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontFamilyPannel\" class=\"wd-font-name-list\">\r\n          <li *ngFor=\"let ff of fontFamilys, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [ngStyle]=\"{'font-family': ff.value}\">{{ff.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u5B57\u53F7 -->\r\n      <div #fontSizeRef class=\"wd-edit-link-box fontSize\" (mousedown)=\"!inCode&&setFontSize($event)\">\r\n        <a data-tip=\"\u5B57\u53F7\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{fontSize.key}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFontSizePannel\" class=\"wd-font-size-list\">\r\n          <li *ngFor=\"let fs of fontSizes, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\">{{fs.key}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u683C\u5F0F -->\r\n      <div #formatBlockRef class=\"wd-edit-link-box formatBlock\" (mousedown)=\"!inCode&&setFormatBlock($event)\">\r\n        <a data-tip=\"\u6587\u672C\u683C\u5F0F\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <span>{{formatBlock}}</span>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchFormatBlockPannel\" class=\"wd-format-block-list\">\r\n          <li *ngFor=\"let fb of formatBlocks, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\" [innerHTML]=\"fb.value | safeHTML\"></a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6587\u672C\u8272 -->\r\n      <div #foreColorRef class=\"wd-edit-link-box foreColor\" (mousedown)=\"!inCode&&setForeColor($event)\">\r\n        <a data-tip=\"\u5B57\u8272\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-font-color\" [ngStyle]=\"{'border-bottom-color': foreColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchForeColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u9AD8\u4EAE\u8272 -->\r\n      <div #backColorRef class=\"wd-edit-link-box backColor\" (mousedown)=\"!inCode&&setBackColor($event)\">\r\n        <a data-tip=\"\u9AD8\u4EAE\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-pencil\" [ngStyle]=\"{'border-bottom-color': backColor}\"></i>\r\n          <i class=\"z-editor-icomoon icon-caret-down\"></i>\r\n        </a>\r\n        <div class=\"wd-color-list\" [hidden]=\"!switchBackColorPannel\">\r\n          <ul>\r\n            <li class=\"wd-tr\" *ngFor=\"let color of colors, index as i\">\r\n              <ul>\r\n                <li class=\"wd-td\" *ngFor=\"let e of color, index as j\">\r\n                  <a href=\"javascript:void 0\" [attr.data-dim1]=\"i\" [attr.data-dim2]=\"j\"\r\n                    [ngStyle]=\"{'background-color': e}\"></a>\r\n                </li>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <!-- \u662F\u5426\u52A0\u7C97 -->\r\n      <div class=\"wd-edit-link-box bold\" (mousedown)=\"!inCode&&switchBold($event)\">\r\n        <a data-tip=\"\u52A0\u7C97\"  [ngClass]=\"{active:isBold,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u659C\u4F53 -->\r\n      <div class=\"wd-edit-link-box italic\" (mousedown)=\"!inCode&&switchItalic($event)\">\r\n        <a data-tip=\"\u659C\u4F53\" [ngClass]=\"{active:isItalic,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-italic\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u662F\u5426\u4E0B\u5212\u7EBF -->\r\n      <div class=\"wd-edit-link-box underline\" (mousedown)=\"!inCode&&switchUnderline($event)\">\r\n        <a data-tip=\"\u4E0B\u5212\u7EBF\" [ngClass]=\"{active:isUnderline,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-underline\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664\u7EBF -->\r\n      <div class=\"wd-edit-link-box strikeThrough\" (mousedown)=\"!inCode&&switchStrikeThrough($event)\">\r\n        <a data-tip=\"\u5220\u9664\u7EBF\" [ngClass]=\"{active:isStrikeThrough,disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-strikethrough\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0A\u6807  -->\r\n      <div class=\"wd-edit-link-box superscript\" (mousedown)=\"!inCode&&setScript($event, 'superscript')\">\r\n        <a data-tip=\"\u4E0A\u6807\" [ngClass]=\"{active:scriptActive==='superscript',disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-superscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u4E0B\u6807 -->\r\n      <div class=\"wd-edit-link-box subscript\" (mousedown)=\"!inCode&&setScript($event, 'subscript')\">\r\n        <a data-tip=\"\u4E0B\u6807\" [ngClass]=\"{active:scriptActive==='subscript',disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-subscript\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u5DE6 -->\r\n      <div class=\"wd-edit-link-box justifyLeft\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Left')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyLeft',disabled:inCode}\" data-tip=\"\u5C45\u5DE6\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-left\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u4E2D -->\r\n      <div class=\"wd-edit-link-box justifyCenter\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Center')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyCenter',disabled:inCode}\" data-tip=\"\u5C45\u4E2D\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-center\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5C45\u53F3 -->\r\n      <div class=\"wd-edit-link-box justifyRight\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Right')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyRight',disabled:inCode}\" data-tip=\"\u5C45\u53F3\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-right\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5DE6\u53F3\u5BF9\u9F50 -->\r\n      <div class=\"wd-edit-link-box justifyFull\" (mousedown)=\"!inCode&&setJustifyactive($event, 'Full')\">\r\n        <a [ngClass]=\"{'wd-edit-link-active': justifyActive === 'justifyFull',disabled:inCode}\" data-tip=\"\u5DE6\u53F3\u5BF9\u9F50\" class=\"wd-edit-link\"\r\n          href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-paragraph-justify\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u7F29\u8FDB -->\r\n      <div class=\"wd-edit-link-box indent\" (mousedown)=\"!inCode&&indent($event)\">\r\n        <a data-tip=\"\u7F29\u8FDB\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-increase\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6587\u672C\u589E\u8FDB  -->\r\n      <div class=\"wd-edit-link-box outdent\" (mousedown)=\"!inCode&&outdent($event)\">\r\n        <a data-tip=\"\u51CF\u5C11\u7F29\u8FDB\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-indent-decrease\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6E05\u9664\u683C\u5F0F -->\r\n      <div class=\"wd-edit-link-box removeFormat\" (mousedown)=\"!inCode&&removeFormat()\">\r\n        <a data-tip=\"\u6E05\u9664\u683C\u5F0F\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clear-formatting\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u6709\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertOrderedList\" (mousedown)=\"!inCode&&insertOrderedList($event)\">\r\n        <a data-tip=\"\u6709\u5E8F\u5217\u8868\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list-numbered\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u65E0\u5E8F\u5217\u8868 -->\r\n      <div class=\"wd-edit-link-box insertUnorderedList\" (mousedown)=\"!inCode&&insertUnorderedList($event)\">\r\n        <a data-tip=\"\u65E0\u5E8F\u5217\u8868\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-list2\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u8868\u683C mdn\u65E0api\uFF0C\u7528insertHTML\u5B9E\u73B0 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertTable($event)\">\r\n        <a data-tip=\"\u8868\u683C\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-table\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u8D85\u94FE\u63A5\uFF0C\u5F39\u7A97 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertLink($event)\">\r\n        <a data-tip=\"\u94FE\u63A5\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-link\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6C34\u5E73\u7EBFhr -->\r\n      <div class=\"wd-edit-link-box insertHorizontalRule\" (mousedown)=\"!inCode&&insertHorizontalRule($event)\">\r\n        <a data-tip=\"\u6C34\u5E73\u7EBF\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-page-break\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u6587\u4EF6 -->\r\n      <div class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertFile($event)\">\r\n        <a data-tip=\"\u6587\u4EF6\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-upload-cloud\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u63D2\u5165\u4EE3\u7801 -->\r\n      <div #codeRef class=\"wd-edit-link-box insertHTML\" (mousedown)=\"!inCode&&insertCode($event)\">\r\n        <a data-tip=\"\u4EE3\u7801\" [ngClass]=\"{disabled: inCode}\" class=\"wd-edit-link\" href=\"javascript:void 0\">\r\n          <i class=\"z-editor-icomoon icon-embed\"></i>\r\n        </a>\r\n        <ul [hidden]=\"!switchCodePannel\" class=\"wd-code-list\">\r\n          <li *ngFor=\"let code of codes, index as i\">\r\n            <a href=\"javascript:void 0\" [attr.data-index]=\"i\">{{code}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <!-- \u6362\u884C -->\r\n      <div class=\"wd-edit-link-box insertBrOnReturn\" (mousedown)=\"insertBrOnReturn($event)\">\r\n        <a data-tip=\"\u6362\u884C(shift+enter)\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-arrow-down\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u7C98\u8D34 -->\r\n      <div class=\"wd-edit-link-box paste\" (mousedown)=\"paste($event)\">\r\n        <a data-tip=\"\u7C98\u8D34\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-clipboard\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u590D\u5236 -->\r\n      <div class=\"wd-edit-link-box copy\" (mousedown)=\"copy($event)\">\r\n        <a data-tip=\"\u590D\u5236\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-copy\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u526A\u5207 -->\r\n      <div class=\"wd-edit-link-box cut\" (mousedown)=\"cut($event)\">\r\n        <a data-tip=\"\u526A\u5207\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-scissors-bold\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u9009\u62E9\u5168\u90E8 -->\r\n      <div class=\"wd-edit-link-box selectAll\" (mousedown)=\"selectAll($event)\">\r\n        <a data-tip=\"\u9009\u62E9\u5168\u90E8\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-select_all\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u64A4\u9500 -->\r\n      <div class=\"wd-edit-link-box undo\" (mousedown)=\"undo($event)\">\r\n        <a data-tip=\"\u64A4\u9500\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-undo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u91CD\u505A -->\r\n      <div class=\"wd-edit-link-box redo\" (mousedown)=\"redo($event)\">\r\n        <a data-tip=\"\u91CD\u505A\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-redo\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5220\u9664 -->\r\n      <div class=\"wd-edit-link-box delete\" (mousedown)=\"deleteSelect($event)\">\r\n        <a data-tip=\"\u5220\u9664\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-eraser\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box history\" (mousedown)=\"history($event)\">\r\n        <a data-tip=\"\u5386\u53F2\u8F93\u5165\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon icon-database\"></i>\r\n        </a>\r\n      </div>\r\n      <!-- \u5168\u5C4F -->\r\n      <div class=\"wd-edit-link-box full\" (mousedown)=\"SwitchScreen()\">\r\n        <a data-tip=\"\u5168\u5C4F/\u53D6\u6D88\u5168\u5C4F\" class=\"wd-edit-link\" href=\"javascript: void 0\">\r\n          <i class=\"z-editor-icomoon\" [ngClass]=\"full?'icon-minimize':'icon-maximize'\"></i>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <!-- \u7F16\u8F91\u6761\u7ED3\u675F -->\r\n    <!-- \u7F16\u8F91\u4F53\u5F00\u59CB -->\r\n    <!-- input,selectionchange,click\u4E8B\u4EF6\u8BB0\u5F55\u4E0A\u6B21\u7F16\u8F91\u7684\u5149\u6807 -->\r\n    <!-- mousedown\u4E8B\u4EF6\u5728\u9F20\u6807\u6309\u4E0B\uFF0C\u5224\u65AD\u662F\u5426\u8981\u8BBE\u7F6E\u805A\u7126\u5E76\u8BBE\u7F6E\u4E0A\u6B21\u5149\u6807\u548C\u91CD\u8BBE\u7F16\u8F91\u6837\u5F0F -->\r\n\r\n    <div #pannelRef (keyup)=\"keyup($event)\" (click)=\"pannelOnClick()\" (keydown)=\"keydown($event)\"\r\n      (blur)=\"isInEditStatus=false\" (paste)=\"pannelOnPaste($event)\" (beforepaste)=\"pannelOnPaste($event)\"\r\n      (input)=\"setRangeAndEmitValue($event)\" class=\"wd-deitor-content\" contenteditable=\"true\" [innerHTML]=\"vhtml|safeHTML\">\r\n    </div>\r\n    <!-- \u7F16\u8F91\u4F53\u7ED3\u675F -->\r\n    <div *ngIf=\"hasBtn\" class=\"wd-edit-footer fn-clearfix\" #footerRef>\r\n      <div class=\"wd-edit-footer-btn\">\r\n        <button (click)=\"emitContent()\">\u4FDD\u5B58</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AppZeditorComponent)),
                        multi: true
                    }],
                // 没有Shadow Dom，样式没有封装，全局可以使用。
                encapsulation: ViewEncapsulation.None,
                // 只会在input引用值改变时才去做变更检测
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@charset \"UTF-8\";a,a:after,a:before,audio,div,div:after,div:before,h1,h2,h3,h4,h5,h6,i,i:after,i:before,img,li,li:after,li:before,ol,p,pre,span,span:after,span:before,table,ul,video{-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-weight:400}em,i{font-style:italic}table{border-collapse:collapse;border-spacing:0}img{border:none;height:auto;vertical-align:middle;width:100%}a:active,a:hover,a:link,a:visited{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:#000;cursor:pointer;text-decoration:none;user-select:none}hr{background-color:#e1e1e1;border:0;color:#000;height:1PX;margin:0;*margin:0}li,ul{list-style-type:none}button,input[type=button],input[type=reset],input[type=submit]{-moz-appearance:button;-ms-appearance:button;-o-appearance:button;-webkit-appearance:button;appearance:button;border:none}button,button:focus,input,input:focus{background-color:#fff;outline:none;outline-style:none}input{border:1px solid #e6e6e6}::-ms-clear,::-ms-reveal{display:none}input:-ms-clear,input:-ms-reveal{display:none}[tappable]{-ms-touch-action:manipulation;cursor:pointer;touch-action:manipulation}.z-editor-icomoon,[class*=\" icon-\"],[class^=icon-]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:z-editor-icomoon!important;font-size:.75rem;font-style:normal;font-variant:normal;font-weight:400;line-height:.75rem;line-height:1;speak:never;text-transform:none}@font-face{font-display:block;font-family:z-editor-icomoon;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64,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\") format(\"woff\")}.icon-square-m:before{content:\"\uE911\"}.icon-link:before{content:\"\uF0C1\"}.icon-caret-down:before{content:\"\uF0D7\"}.icon-unlink:before{content:\"\uF127\"}.icon-select_all:before{content:\"\uE904\"}.icon-copy:before{content:\"\uE93A\"}.icon-undo:before{content:\"\uE967\"}.icon-redo:before{content:\"\uE968\"}.icon-clipboard:before{content:\"\uE9E2\"}.icon-list-numbered:before{content:\"\uE9F3\"}.icon-list2:before{content:\"\uE9FC\"}.icon-scissors-bold:before{content:\"\uEA5A\"}.icon-bold:before{content:\"\uEA62\"}.icon-underline:before{content:\"\uEA63\"}.icon-italic:before{content:\"\uEA64\"}.icon-strikethrough:before{content:\"\uEA65\"}.icon-page-break:before{content:\"\uEA68\"}.icon-clear-formatting:before{content:\"\uEA6F\"}.icon-table:before{content:\"\uEA71\"}.icon-paragraph-left:before{content:\"\uEA77\"}.icon-paragraph-center:before{content:\"\uEA78\"}.icon-paragraph-right:before{content:\"\uEA79\"}.icon-paragraph-justify:before{content:\"\uEA7A\"}.icon-indent-increase:before{content:\"\uEA7B\"}.icon-indent-decrease:before{content:\"\uEA7C\"}.icon-embed:before{content:\"\uEA80\"}.icon-arrow-down:before{content:\"\uE90A\"}.icon-database:before{content:\"\uE94C\"}.icon-loader:before{content:\"\uE981\"}.icon-maximize:before{content:\"\uE989\"}.icon-minimize:before{content:\"\uE990\"}.icon-upload-cloud:before{content:\"\uE9E4\"}.icon-x-square:before{content:\"\uE9F9\"}.icon-smile-o:before{content:\"\uF118\"}.icon-font-color:before{content:\"\uF031\"}.icon-pencil:before{content:\"\uF040\"}.icon-check-circle-thin:before{content:\"\uF058\"}.icon-square-o:before{content:\"\uF096\"}.icon-superscript:before{content:\"\uF12B\"}.icon-subscript:before{content:\"\uF12C\"}.icon-eraser:before{content:\"\uF12D\"}.icon-check-square:before{content:\"\uF14A\"}.icon-circle-thin:before{content:\"\uF1DB\"}.z-editor-alert .wd-content,.z-editor-alert .wd-mask{height:100%;left:0;position:fixed;top:0;width:100%;z-index:99999}.z-editor-alert .wd-content{overflow:auto}#z-editor-tip .wd-tip,#z-editor-tip .wd-tip-for-scale{background-color:#333;border-radius:.3rem;color:#fff;filter:alpha(opacity=70);font-size:.75rem;left:50%;line-height:1;max-width:12rem;opacity:.7;padding:.7rem .8rem;position:fixed;text-align:center;z-index:9999999}#z-editor-tip .wd-tip{transform:translateX(-50%)}#z-editor-tip .trans1-enter{top:100%}#z-editor-tip .trans1-active{top:40%}#z-editor-tip .trans1-leave{top:100%}#z-editor-tip .trans2-enter{top:-100%}#z-editor-tip .trans2-active{top:40%}#z-editor-tip .trans2-leave{top:-100%}#z-editor-tip .scale-enter{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .scale-active{filter:alpha(opacity=70);opacity:.7;top:50%;transform:translate(-50%,-50%) scale(1)}#z-editor-tip .scale-leave{filter:alpha(opacity=0);opacity:0;top:50%;transform:translate(-50%,-50%) scale(0)}#z-editor-tip .icon-loader{-webkit-animation:myloading 1s infinite forwards;animation:myloading 1s infinite forwards;display:inline-block}@-webkit-keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes myloading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}#z-editor-window .wd-mask{background-color:#3a3434;filter:alpha(opacity=20);opacity:.2}#z-editor-window .wd-window{background-color:#fff;border-radius:.3rem;position:absolute;z-index:99999}#z-editor-window .wd-window-tool{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background-color:#f4f4f4;border-radius:.3rem .3rem 0 0;cursor:pointer;line-height:2rem;user-select:none}#z-editor-window .wd-window-tool h3{float:left;font-size:1rem;padding-left:.7rem}#z-editor-window .wd-window-tool p{float:right;padding-right:.7rem}#z-editor-window .wd-window-tool .z-editor-icomoon{cursor:pointer;font-size:1rem;line-height:2rem}#z-editor-window .wd-window-tool:after{clear:both;content:\"\";display:block}#z-editor-window .wd-window-pannel{overflow:auto;padding:.7rem}#z-editor-window .trans1-enter{top:100%}#z-editor-window .trans1-active{top:20%}#z-editor-window .trans1-leave{top:100%}#z-editor-window .trans2-enter{top:-100%}#z-editor-window .trans2-active{top:20%}#z-editor-window .trans2-leave{top:-100%}#z-editor-window .scale-enter{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}#z-editor-window .scale-active{filter:alpha(opacity=100);opacity:1;top:20%;transform:scale(1)}#z-editor-window .scale-leave{filter:alpha(opacity=0);opacity:0;top:20%;transform:scale(0)}.z-editor-checkbox{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;width:1rem}.z-editor-checkbox input{display:none}.z-editor-checkbox .z-editor-icomoon{cursor:pointer;font-size:1rem;vertical-align:middle}.z-editor-checkbox .wd-checkbox-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-checkbox .icon-check-square{color:#fa6464}.p .z-editor-checkbox .icon-check-square{color:#00c}.b .z-editor-checkbox .icon-check-square{color:#3b86cc}.g .z-editor-checkbox .icon-check-square{color:#19a519}.z-editor-radios{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.z-editor-radios .input-radio{display:none}.z-editor-radios .z-editor-icomoon{cursor:pointer;font-size:1rem}.z-editor-radios .z-editor-icomoon,.z-editor-radios span{line-height:1;vertical-align:middle}.z-editor-radios .wd-radio-disabled{cursor:not-allowed;opacity:.8}.r .z-editor-radios .icon-check-circle-thin{color:#fa6464}.p .z-editor-radios .icon-check-circle-thin{color:#00c}.b .z-editor-radios .icon-check-circle-thin{color:#3b86cc}.g .z-editor-radios .icon-check-circle-thin{color:#19a519}.z-editor-link{color:grey;padding:0 1rem}.z-editor-link li{line-height:2.5rem}.z-editor-link li label{font-size:.875rem}.z-editor-link li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:20rem}.z-editor-link .wd-btn-group{text-align:right}.z-editor-link .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-link button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-link button:last-child{background-color:#fa6464}.p .z-editor-link button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-link button:last-child{background-color:#00c}.b .z-editor-link button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-link button:last-child{background-color:#3b86cc}.g .z-editor-link button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-link button:last-child{background-color:#19a519}.z-editor-table{color:grey;padding:0 1rem}.z-editor-table li{line-height:2rem}.z-editor-table li label{font-size:.875rem}.z-editor-table li input{border-radius:.2rem;height:1.5rem;margin-left:1rem;padding:0 .5rem;width:4rem}.z-editor-table .wd-btn-group{margin-top:.5rem;text-align:center}.z-editor-table .wd-btn-group button{border-radius:.3rem;color:#fff;cursor:pointer;margin-left:.5rem;padding:.2rem .5rem}.r .z-editor-table button:first-child{border:1px solid #fa6464;color:#fa6464}.r .z-editor-table button:last-child{background-color:#fa6464}.p .z-editor-table button:first-child{border:1px solid #00c;color:#00c}.p .z-editor-table button:last-child{background-color:#00c}.b .z-editor-table button:first-child{border:1px solid #3b86cc;color:#3b86cc}.b .z-editor-table button:last-child{background-color:#3b86cc}.g .z-editor-table button:first-child{border:1px solid #19a519;color:#19a519}.g .z-editor-table button:last-child{background-color:#19a519}.z-editor-annex{color:grey;padding:0 1rem}.z-editor-annex .wd-edit-file{display:none}.z-editor-annex li{line-height:2.5rem}.z-editor-annex li>label{display:inline-block;font-size:.875rem}.z-editor-annex li input{border-radius:.2rem;height:2rem;margin-left:1rem;padding:0 .5rem;width:17rem}.z-editor-annex .wd-radio-group-type{margin-left:1rem}.z-editor-annex .wd-radio-group-type label{margin-right:1.5rem}.z-editor-annex .wd-radio-group-type label::nth-child(3){margin-right:none}.z-editor-annex .wd-upload-local,.z-editor-annex .wd-use-link-confirm{border-radius:.3rem;color:#fff;cursor:pointer;font-weight:700;line-height:2.2rem;width:100%}.z-editor-annex .wd-upload-local{vertical-align:middle}.z-editor-annex .wd-upload-local .z-editor-icomoon{font-size:1rem;line-height:2.2rem}.z-editor-annex .wd-use-link-confirm{margin:.5rem 0}.r .z-editor-annex .wd-upload-local{background-color:#ef6ea8}.r .z-editor-annex .wd-use-link-confirm{background-color:#fa6464}.p .z-editor-annex .wd-upload-local{background-color:#5a06f5}.p .z-editor-annex .wd-use-link-confirm{background-color:#00c}.b .z-editor-annex .wd-upload-local{background-color:#00aeef}.b .z-editor-annex .wd-use-link-confirm{background-color:#3b86cc}.g .z-editor-annex .wd-upload-local{background-color:#0ebd0e}.g .z-editor-annex .wd-use-link-confirm{background-color:#19a519}.z-editor{background-color:#fff;text-align:left}.z-editor .fn-clearfix:after{clear:both;content:\"\";display:block;height:0;width:0}.z-editor .wd-editor-bar{border-bottom:1px solid #e6e6e6;border-top:1px solid #e6e6e6;font-size:.875rem;padding:.5rem 0 0}.z-editor .wd-edit-link-box{float:left;position:relative}.z-editor .wd-edit-link{border-radius:.2rem;cursor:pointer;display:inline-block;height:1.7rem;line-height:1.7rem;padding:0 .5rem;position:relative;text-align:center}.z-editor .wd-edit-link:hover{background-color:#e6e6e6}.z-editor .wd-edit-link:hover:before{border:.2rem solid transparent;border-bottom-color:#222;content:\"\";top:1.6rem}.z-editor .wd-edit-link:hover:after,.z-editor .wd-edit-link:hover:before{display:block;left:50%;opacity:.8;position:absolute;transform:translateX(-50%);z-index:1}.z-editor .wd-edit-link:hover:after{background-color:#222;border-radius:.3rem;color:#fff;content:attr(data-tip);font-size:.75rem;padding:0 .4rem;top:2rem;white-space:nowrap}.z-editor .wd-edit-link .z-editor-icomoon{font-size:.875rem}.z-editor .fontName .wd-edit-link,.z-editor .fontSize .wd-edit-link{text-align:left;width:6.2rem}.z-editor .fontName .wd-edit-link i,.z-editor .fontSize .wd-edit-link i{display:inline-block;line-height:1.7rem;position:absolute;right:.6rem}.z-editor .fontSize .wd-edit-link{width:6rem}.z-editor .formatBlock .wd-edit-link{width:4rem}.z-editor .wd-edit-link-active{background-color:#e6e6e6}.z-editor .backColor i,.z-editor .fontSize i,.z-editor .foreColor i,.z-editor .formatBlock i{margin-left:.5rem}.z-editor .wd-code-list,.z-editor .wd-font-name-list,.z-editor .wd-font-size-list,.z-editor .wd-format-block-list{background-color:#222;border-radius:.3rem;color:#fff;position:absolute;top:1.6rem;z-index:4}.z-editor .wd-code-list a,.z-editor .wd-font-name-list a,.z-editor .wd-font-size-list a,.z-editor .wd-format-block-list a{border-radius:.3rem;color:#fff;display:inline-block;padding:.2rem .5rem;width:100%}.z-editor .wd-code-list a:hover,.z-editor .wd-font-name-list a:hover,.z-editor .wd-font-size-list a:hover,.z-editor .wd-format-block-list a:hover{background-color:#444}.z-editor .wd-color-list{background-color:#fff;border:1px solid #f4f4f4;border-radius:.3rem;padding:.3rem;position:absolute;top:1.6rem;width:16.8rem;z-index:4}.z-editor .wd-color-list .wd-tr{height:1.6rem}.z-editor .wd-color-list .wd-td{float:left;height:1.2rem;margin:.2rem;position:relative;width:1.2rem}.z-editor .wd-color-list a{border-radius:.1rem;display:block;left:0;padding:.6rem;position:absolute;top:0}.z-editor .wd-color-list a:hover{left:-.1rem;padding:.7rem;top:-.1rem}.z-editor .wd-font-name-list{width:6.2rem}.z-editor .wd-font-size-list{width:6rem}.z-editor .wd-format-block-list{width:4rem}.z-editor .wd-code-list{width:6rem}.z-editor .backColor .icon-pencil,.z-editor .foreColor .icon-font-color{border-bottom:2px solid transparent;display:inline-block}.z-editor .wd-deitor-content{font-family:Microsoft Yahei;max-height:15rem;min-height:8rem;outline:none;overflow:auto;padding:.6rem}.z-editor .wd-deitor-content div,.z-editor .wd-deitor-content p{word-break:break-all}.z-editor .wd-deitor-content ol,.z-editor .wd-deitor-content ul{list-style-position:inside}.z-editor .wd-deitor-content ul li{list-style-type:disc}.z-editor .wd-deitor-content ol li{list-style-type:decimal}.z-editor .wd-deitor-content a{text-decoration:underline}.z-editor .wd-deitor-content table{width:100%}.z-editor .wd-deitor-content td{border:1px solid grey;min-width:4rem;padding:.5rem;word-break:break-all;word-wrap:break-word}.z-editor .wd-deitor-content pre{border-radius:.3rem;overflow:auto;padding:.5rem .2rem;pointer-events:none;white-space:pre}.z-editor .wd-edit-footer{padding:.5rem}.z-editor .wd-edit-footer-btn{float:right}.z-editor .wd-edit-footer-btn button{border-radius:.3rem;color:#fff;line-height:1.5rem;padding:0 .5rem}.z-editor .active{background-color:#e6e6e6}.z-editor .disabled{cursor:not-allowed;opacity:.5}.z-editor .disabled:hover{background-color:transparent}.z-editor .disabled:hover:after,.z-editor .disabled:hover:before{content:none}.r .z-editor .wd-code-list a:hover,.r .z-editor .wd-font-name-list a:hover,.r .z-editor .wd-font-size-list a:hover,.r .z-editor .wd-format-block-list a:hover{color:#ef6ea8}.r .z-editor .wd-deitor-content pre{background-color:#f1e9e9;color:#ef6ea8}.r .z-editor .wd-edit-footer-btn button{background-color:#ef6ea8}.p .z-editor .wd-code-list a:hover,.p .z-editor .wd-font-name-list a:hover,.p .z-editor .wd-font-size-list a:hover,.p .z-editor .wd-format-block-list a:hover{color:#5a06f5}.p .z-editor .wd-deitor-content pre{background-color:#e6ebf3;color:#5a06f5}.p .z-editor .wd-edit-footer-btn button{background-color:#5a06f5}.b .z-editor .wd-code-list a:hover,.b .z-editor .wd-font-name-list a:hover,.b .z-editor .wd-font-size-list a:hover,.b .z-editor .wd-format-block-list a:hover{color:#00aeef}.b .z-editor .wd-deitor-content pre{background-color:#e2f0f3;color:#00aeef}.b .z-editor .wd-edit-footer-btn button{background-color:#00aeef}.g .z-editor .wd-code-list a:hover,.g .z-editor .wd-font-name-list a:hover,.g .z-editor .wd-font-size-list a:hover,.g .z-editor .wd-format-block-list a:hover{color:#0ebd0e}.g .z-editor .wd-deitor-content pre{background-color:#e0f3e8;color:#0ebd0e}.g .z-editor .wd-edit-footer-btn button{background-color:#0ebd0e}"]
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
    /** @type {?} */
    AppZeditorComponent.prototype.vhtml$;
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
     * 是否加粗
     * @type {?}
     */
    AppZeditorComponent.prototype.isBold;
    /**
     * 是否斜体
     * @type {?}
     */
    AppZeditorComponent.prototype.isItalic;
    /**
     * 是否下划线
     * @type {?}
     */
    AppZeditorComponent.prototype.isUnderline;
    /**
     * 是否删除线
     * @type {?}
     */
    AppZeditorComponent.prototype.isStrikeThrough;
    /**
     * 默认无上下标
     * @type {?}
     */
    AppZeditorComponent.prototype.scriptActive;
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
    /**
     * 是否在代码区, 默认false
     * @type {?}
     */
    AppZeditorComponent.prototype.inCode;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9uZy16ZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekssT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBTSxVQUFVOztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQyxDQUFHLFNBQVM7O0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDLENBQUcsU0FBUzs7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDLENBQVEsU0FBUzs7QUFDbkUsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUMsQ0FBZSxTQUFTOztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFlLFFBQVE7Ozs7O0FBR2xFLHNCQXNCQzs7Ozs7O0lBcEJHLDBCQUFnQjs7Ozs7SUFFaEIsMEJBQWdCOzs7OztJQUVoQix3QkFLRTs7Ozs7SUFFRix3QkFHRTs7Ozs7SUFFRix3QkFHRTs7QUFpQk4sTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUF1QzVCLFlBQ1ksT0FBa0IsRUFDbEIsVUFBc0I7UUFEdEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBaUJsQyxXQUFNLEdBQVcsZUFBZSxDQUFDOztRQVl2QixZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFFNUQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNkLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7Ozs7UUFHdEUsYUFBUSxHQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7OztRQUV4SCxVQUFLLEdBQTBCLEdBQUcsQ0FBQzs7OztRQUVsQyxlQUFVLEdBQXFCLElBQUksWUFBWSxFQUFNLENBQUM7Ozs7O1FBZ0JoRSxnQkFBVyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQzs7Ozs7UUFHMWQsaUJBQVksR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDOzs7OztRQUd4WCxXQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBRzF4QixjQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFF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aEMsb0RBQThCOzs7OztJQUU5QixvREFBOEI7Ozs7O0lBRTlCLCtDQUF5Qjs7Ozs7SUFFekIscUNBQWU7Ozs7O0lBRWYsdUNBQWlCOzs7OztJQUVqQiwwQ0FBb0I7Ozs7O0lBRXBCLDhDQUF3Qjs7Ozs7SUFFeEIsMkNBQWtCOzs7OztJQUVsQiw0Q0FBOEI7Ozs7O0lBRTlCLDZDQUF1Qjs7Ozs7SUFFdkIsb0NBQVc7Ozs7O0lBRVgsbUNBQWE7Ozs7O0lBRWIscUNBQXFCOzs7OztJQUVyQixxQ0FBZTs7SUFDZix1Q0FBbUQ7O0lBQ25ELHdDQUF3Qzs7Ozs7SUFuSHBDLHNDQUEwQjs7Ozs7SUFDMUIseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog57yW6L6R5Zmo57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM3OjIzIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgT25Jbml0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBXaW5kb3dPcHRpb25zIH0gZnJvbSAnLi9fYWxlcnQvd2luZG93L3dpbmRvdyc7ICAgLy8g56qX5L2T5by556qXXHJcbmltcG9ydCB7IFVJTGlua0NvbXBvbmVudCB9IGZyb20gJy4vdWktbGluay91aS1saW5rJzsgICAgICAvLyDotoXpk77mjqVVSee7hOS7tlxyXG5pbXBvcnQgeyBVSVRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi91aS10YWJsZS91aS10YWJsZSc7ICAgLy8g6KGo5qC8VUnnu4Tku7ZcclxuaW1wb3J0IHsgVUlBbm5leENvbXBvbmVudCB9IGZyb20gJy4vdWktYW5uZXgvdWktYW5uZXgnOyAgIC8vIOmZhOS7tlVJ57uE5Lu2XHJcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvRG9tU2VydmljZSc7ICAgICAgICAvLyBkb23mj5DkvpvllYZcclxuaW1wb3J0IENvbW1vblV0aWwgZnJvbSAnLi91dGlsL0NvbW1vblV0aWwnOyAgICAgICAgICAgICAgIC8vIGRvbeW3peWFt+exu1xyXG5pbXBvcnQgQ3Vyc29yVXRpbCBmcm9tICcuL3V0aWwvQ3Vyc29yVXRpbCc7ICAgICAgICAgICAgICAgLy8g5YWJ5qCH5bel5YW357G7XHJcblxyXG4vKiog57yW6L6R5Zmo6YWN572u5Y+C5pWwICovXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIC8qKiDnvJbovpHlhoXlrrnnmoTmnIDlpKflrZfoioLmlbAgKi9cclxuICAgIG1heHNpemU6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDotoXml7YgbXMgKi9cclxuICAgIHRpbWVvdXQ6IG51bWJlcjtcclxuICAgIC8qKiDkuIrkvKDlm77niYfnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIGltYWdlOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+WbvueJh+aVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICAgICAgLyoqIOWwj+S6juaMh+WumuWtl+iKguaVsOS8mui/m+ihjGJhc2U2NOe8lueggSAqL1xyXG4gICAgICAgIGJhc2U2NDogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIC8qKiDkuIrkvKDop4bpopHnmoTphY3nva7lj4LmlbAgKi9cclxuICAgIHZpZGVvOiB7XHJcbiAgICAgICAgLyoqIOS4iuS8oOeahOacgOWkp+inhumikeaVsOmHjyAqL1xyXG4gICAgICAgIGNvdW50OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS4iuS8oOmfs+mikeeahOmFjee9ruWPguaVsCAqL1xyXG4gICAgbXVzaWM6IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn6Z+z6aKR5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH07XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcHAtemVkaXRvcicsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZy16ZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctemVkaXRvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXBwWmVkaXRvckNvbXBvbmVudCksXHJcbiAgICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1dLFxyXG4gICAgLy8g5rKh5pyJU2hhZG93IERvbe+8jOagt+W8j+ayoeacieWwgeijhe+8jOWFqOWxgOWPr+S7peS9v+eUqOOAglxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICAgIC8vIOWPquS8muWcqGlucHV05byV55So5YC85pS55Y+Y5pe25omN5Y675YGa5Y+Y5pu05qOA5rWLXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwWmVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBvcHRpb25zKHY6IGFueSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zJCwgdik7XHJcbiAgICB9XHJcbiAgICAvKiog57yW6L6R5p2hICovXHJcbiAgICBnZXQgaGVhZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIC8qKiDnvJbovpHlmaggKi9cclxuICAgIGdldCBlZGl0b3IoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLyoqIOe8lui+kemdouadvyAqL1xyXG4gICAgZ2V0IHBhbm5lbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFubmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgZm9vdGVyKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZm9vdGVyUmVmIHx8IHsgbmF0aXZlRWxlbWVudDogeyBvZmZzZXRIZWlnaHQ6IDAgfSB9KS5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGZvbnROYW1lRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvbnROYW1lUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgZm9udFNpemVFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9udFNpemVSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb3JtYXRCbG9ja0VsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRCbG9ja1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGZvcmVDb2xvckVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JlQ29sb3JSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBiYWNrQ29sb3JFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja0NvbG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgY29kZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2RlUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgcHJpdmF0ZSBkb21TZXJ2aWNlOiBEb21TZXJ2aWNlXHJcbiAgICApIHtcclxuICAgIH1cclxuICAgIC8qKiDpu5jorqTmoLzlvI8gKi9cclxuICAgIHN0YXRpYyBGT1JNQVQgPSB7XHJcbiAgICAgICAgaXNCb2xkOiBmYWxzZSxcclxuICAgICAgICBpc0l0YWxpYzogZmFsc2UsXHJcbiAgICAgICAgaXNVbmRlcmxpbmU6IGZhbHNlLFxyXG4gICAgICAgIGlzU3RyaWtlVGhyb3VnaDogZmFsc2UsXHJcbiAgICAgICAgc2NyaXB0QWN0aXZlOiAnJyxcclxuICAgICAgICBmb3JtYXRCbG9jazogJ3AnLFxyXG4gICAgICAgIGZvcmVDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGJhY2tDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGp1c3RpZnlBY3RpdmU6ICdqdXN0aWZ5TGVmdCcsXHJcbiAgICAgICAgZm9udFNpemU6IHsga2V5OiAnc21hbGwnLCB2YWx1ZTogJzInLCB2YWx1ZSQ6ICcnIH0sXHJcbiAgICAgICAgZm9udEZhbWlseTogeyBrZXk6ICflvq7ova/pm4Xpu5EnLCB2YWx1ZTogJ01pY3Jvc29mdCBZYWhlaScgfVxyXG4gICAgfTtcclxuICAgIHZodG1sJDogc3RyaW5nID0gJzxwPuivt+i+k+WFpeWGheWuuX48L3A+JztcclxuICAgIC8qKiDkvKDlhaXnmoRodG1sICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZodG1sKHY6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudmh0bWwkID0gdjtcclxuICAgICAgICB0aGlzLnJhbmdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluQ29kZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZodG1sKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZodG1sJDtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW9uLXByZWZpeFxyXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICAvKiog5piv5ZCm5pyJ5oyJ6ZKuICovXHJcbiAgICBASW5wdXQoKSBoYXNCdG4gPSBmYWxzZTtcclxuICAgIEBPdXRwdXQoKSByZWNpZXZlQ29udGVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgLyoqIOWPguaVsOmFjee9riAqL1xyXG4gICAgb3B0aW9ucyQ6IGFueSA9IHsgbWF4c2l6ZTogNjU1MzUsIHRpbWVvdXQ6IDEwMDAwLCBpbWFnZTogeyBjb3VudDogNSwgYmFzZTY0OiA2MDAwMCB9LCBhdWRpbzogeyBjb3VudDogMSB9LCB2aWRlbzogeyBjb3VudDogMSB9IH07XHJcbiAgICAvKiog5Li76aKYICovXHJcbiAgICBASW5wdXQoKSB0aGVtZTogJ3InIHwgJ3AnIHwgJ2InIHwgJ2cnID0gJ2cnO1xyXG4gICAgLyoqIOS4iuS8oOaWh+S7tiAqL1xyXG4gICAgQE91dHB1dCgpIHVwbG9hZEZpbGU6IEV2ZW50RW1pdHRlcjx7fT4gPSBuZXcgRXZlbnRFbWl0dGVyPHt9PigpO1xyXG4gICAgLyoqIOe8lui+keadoeinhuWbvuW8leeUqCAqL1xyXG4gICAgQFZpZXdDaGlsZCgnaGVhZGVyUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgaGVhZGVyUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLyoqIOe8lui+keWZqOaVtOS9k+inhuWbvuW8leeUqCAqL1xyXG4gICAgQFZpZXdDaGlsZCgnZWRpdG9yUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZWRpdG9yUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgLyoqIHBhbm5lbOinhuWbvuW8leeUqCAqL1xyXG4gICAgQFZpZXdDaGlsZCgncGFubmVsUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgcGFubmVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZm9vdGVyUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9vdGVyUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZm9udE5hbWVSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb250TmFtZVJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2ZvbnRTaXplUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9udFNpemVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb3JtYXRCbG9ja1JlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGZvcm1hdEJsb2NrUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZm9yZUNvbG9yUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9yZUNvbG9yUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnYmFja0NvbG9yUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgYmFja0NvbG9yUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnY29kZVJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGNvZGVSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiog5a2X5L2T5qC35byPICovXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgZm9udEZhbWlseXMgPSBbeyBrZXk6ICdhcmlhbCcsIHZhbHVlOiAnYXJpYWwnIH0sIHsga2V5OiAn5b6u6L2v6ZuF6buRJywgdmFsdWU6ICdNaWNyb3NvZnQgWWFoZWknIH0sIHsga2V5OiAn5a6L5L2TJywgdmFsdWU6ICdTaW1TdW4nIH0sIHsga2V5OiAn6buR5L2TJywgdmFsdWU6ICdTaW1IZWknIH0sIHsga2V5OiAn5qW35L2TJywgdmFsdWU6ICdLYWlUaScgfSwgeyBrZXk6ICflrovkvZMnLCB2YWx1ZTogJ1NpbVN1bicgfSwgeyBrZXk6ICfmlrDlrovkvZMnLCB2YWx1ZTogJ05TaW1TdW4nIH0sIHsga2V5OiAn5Lu/5a6LJywgdmFsdWU6ICdGYW5nU29uZycgfSwgeyBrZXk6ICflvq7ova/mraPpu5HkvZMnLCB2YWx1ZTogJ01pY3Jvc29mdCBKaGVuZ0hlaScgfSwgeyBrZXk6ICfljY7mlofnkKXnj4AnLCB2YWx1ZTogJ1NUSHVwbycgfSwgeyBrZXk6ICfljY7mloflvankupEnLCB2YWx1ZTogJ1NUQ2FpeXVuJyB9LCB7IGtleTogJ+W5vOWchicsIHZhbHVlOiAnWW91WXVhbicgfSwgeyBrZXk6ICfljY7mlofooYzmpbcnLCB2YWx1ZTogJ1NUWGluZ2thaScgfV07XHJcbiAgICAvKiog5paH5pys5qC85byPICovXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgZm9ybWF0QmxvY2tzID0gW3sga2V5OiAncCcsIHZhbHVlOiAnPHAgZGF0YS1pbmRleD1cIjBcIj5wPC9wPicgfSwgeyBrZXk6ICdoNicsIHZhbHVlOiAnPGg2IGRhdGEtaW5kZXg9XCIxXCI+aDY8L2g2PicgfSwgeyBrZXk6ICdoNScsIHZhbHVlOiAnPGg1IGRhdGEtaW5kZXg9XCIyXCI+aDU8L2g1PicgfSwgeyBrZXk6ICdoNCcsIHZhbHVlOiAnPGg0IGRhdGEtaW5kZXg9XCIzXCI+aDQ8L2g0PicgfSwgeyBrZXk6ICdoMycsIHZhbHVlOiAnPGgzIGRhdGEtaW5kZXg9XCI0XCI+aDM8L2gzPicgfSwgeyBrZXk6ICdoMicsIHZhbHVlOiAnPGgyIGRhdGEtaW5kZXg9XCI1XCI+aDI8L2gyPicgfSwgeyBrZXk6ICdoMScsIHZhbHVlOiAnPGgxIGRhdGEtaW5kZXg9XCI2XCI+aDE8L2gxPicgfV07XHJcbiAgICAvKiog6aKc6ImyICovXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxyXG4gICAgY29sb3JzID0gW1snI2ZmZmZmZicsICcjMDAwMDAwJywgJyNlZWVjZTEnLCAnIzFmNDk3ZCcsICcjNGY4MWJkJywgJyNjMDUwNGQnLCAnIzliYmI1OScsICcjODA2NGEyJywgJyM0YmFjYzYnLCAnI2Y3OTY0NiddLCBbJyNmMmYyZjInLCAnIzdmN2Y3ZicsICcjZGRkOWMzJywgJyNjNmQ5ZjAnLCAnI2RiZTVmMScsICcjZjJkY2RiJywgJyNlYmYxZGQnLCAnI2U1ZTBlYycsICcjZGJlZWYzJywgJyNmZGVhZGEnXSwgWycjZDhkOGQ4JywgJyM1OTU5NTknLCAnI2M0YmQ5NycsICcjOGRiM2UyJywgJyNiOGNjZTQnLCAnI2U1YjliNycsICcjZDdlM2JjJywgJyNjY2MxZDknLCAnI2I3ZGRlOCcsICcjZmJkNWI1J10sIFsnI2JmYmZiZicsICcjM2YzZjNmJywgJyM5Mzg5NTMnLCAnIzU0OGRkNCcsICcjOTViM2Q3JywgJyNkOTk2OTQnLCAnI2MzZDY5YicsICcjYjJhMmM3JywgJyM5MmNkZGMnLCAnI2ZhYzA4ZiddLCBbJyNhNWE1YTUnLCAnIzI2MjYyNicsICcjNDk0NDI5JywgJyMxNzM2NWQnLCAnIzM2NjA5MicsICcjOTUzNzM0JywgJyM3NjkyM2MnLCAnIzVmNDk3YScsICcjMzE4NTliJywgJyNlMzZjMDknXSwgWycjN2Y3ZjdmJywgJyMwYzBjMGMnLCAnIzFkMWIxMCcsICcjMGYyNDNlJywgJyMyNDQwNjEnLCAnIzYzMjQyMycsICcjNGY2MTI4JywgJyMzZjMxNTEnLCAnIzIwNTg2NycsICcjOTc0ODA2J10sIFsnI2MwMDAwMCcsICcjZmYwMDAwJywgJyNmZmMwMDAnLCAnI2ZmZmYwMCcsICcjOTJkMDUwJywgJyMwMGIwNTAnLCAnIzAwYjBmMCcsICcjMDA3MGMwJywgJyMwMDIwNjAnLCAnIzcwMzBhMCddXTtcclxuICAgIC8qKiDlrZfkvZPlpKflsI8gKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBmb250U2l6ZXMgPSBbeyBrZXk6ICd4LXNtYWxsJywgdmFsdWU6ICcxJywgdmFsdWUkOiAxMCAvIDE2IH0sIHsga2V5OiAnc21hbGwnLCB2YWx1ZTogJzInLCB2YWx1ZSQ6IDEyIC8gMTYgfSwgeyBrZXk6ICdtZWRpdW0nLCB2YWx1ZTogJzMnLCB2YWx1ZSQ6IDE2IC8gMTYgfSwgeyBrZXk6ICdsYXJnZScsIHZhbHVlOiAnNCcsIHZhbHVlJDogMTggLyAxNiB9LCB7IGtleTogJ3gtbGFyZ2UnLCB2YWx1ZTogJzUnLCB2YWx1ZSQ6IDI0IC8gMTYgfSwgeyBrZXk6ICd4eC1sYXJnZScsIHZhbHVlOiAnNicsIHZhbHVlJDogMzIgLyAxNiB9LCB7IGtleTogJ3h4eC1sYXJnZScsIHZhbHVlOiAnNycsIHZhbHVlJDogNDggLyAxNiB9XTtcclxuICAgIC8qKiBjb2RlICovXHJcbiAgICBjb2RlcyA9IFsnSHRtbCcsICdDc3MnLCAnSmF2YXNjcmlwdCcsICdUeXBlU2NyaXB0JywgJ1Nhc3MnLCAnSmF2YScsICdYbWwnLCAnU3FsJywgJ1NoZWxsJ107XHJcbiAgICAvKiog6YCJ5Lit55qE5a2X5qC3ICovXHJcbiAgICBmb250RmFtaWx5OiBhbnkgPSB7IGtleTogJ+W+rui9r+mbhem7kScsIHZhbHVlOiAnTWljcm9zb2Z0IFlhaGVpJyB9O1xyXG4gICAgLyoqIOmAieS4reeahOWtl+WPtyAqL1xyXG4gICAgZm9udFNpemU6IGFueSA9IHsga2V5OiAnc21hbGwnLCB2YWx1ZTogMiwgdmFsdWUkOiAxMiAvIDE2IH07IC8vIOm7mOiupC43NXJlbTtcclxuICAgIC8qKiDmlofmnKzmoLzlvI8gKi9cclxuICAgIGZvcm1hdEJsb2NrID0gJ3AnO1xyXG4gICAgLyoqIOWtl+S9k+minOiJsiAqL1xyXG4gICAgZm9yZUNvbG9yID0gJ2JsYWNrJztcclxuICAgIC8qKiDpq5jkuq7oibIgKi9cclxuICAgIGJhY2tDb2xvciA9ICd3aGl0ZSc7XHJcbiAgICAvKiog5b2T5YmN5Luj56CB6K+t6KiAICovXHJcbiAgICBjb2RlID0gJ0phdmFzY3JpcHQnO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+agt+mdouadvyAqL1xyXG4gICAgc3dpdGNoRm9udEZhbWlseVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOWtl+WPt+mdouadvyAqL1xyXG4gICAgc3dpdGNoRm9udFNpemVQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDmlofmnKzmoLzlvI/pnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvcm1hdEJsb2NrUGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5a2X5L2T6aKc6Imy6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDog4zmma/oibLpnaLmnb8gKi9cclxuICAgIHN3aXRjaEJhY2tDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOS7o+eggeivreiogOmdouadvyAqL1xyXG4gICAgc3dpdGNoQ29kZVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuWKoOeylyAqL1xyXG4gICAgaXNCb2xkID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5pac5L2TICovXHJcbiAgICBpc0l0YWxpYyA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuS4i+WIkue6vyAqL1xyXG4gICAgaXNVbmRlcmxpbmUgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbliKDpmaTnur8gKi9cclxuICAgIGlzU3RyaWtlVGhyb3VnaCA9IGZhbHNlO1xyXG4gICAgLyoqIOm7mOiupOaXoOS4iuS4i+aghyAqL1xyXG4gICAgc2NyaXB0QWN0aXZlID0gJyc7XHJcbiAgICAvKiog6buY6K6k5bem5a+56b2QICovXHJcbiAgICBqdXN0aWZ5QWN0aXZlID0gJ2p1c3RpZnlMZWZ0JztcclxuICAgIC8qKiDmmK/lkKblpITkuo7nvJbovpHnirbmgIHkuK0gKi9cclxuICAgIGlzSW5FZGl0U3RhdHVzID0gZmFsc2U7XHJcbiAgICAvKiog6K6w5L2P55qEcmFuZ2UgKi9cclxuICAgIHJhbmdlOiBhbnk7XHJcbiAgICAvKiog5piv5ZCm5YWo5bGPLCDpu5jorqRmYWxzZSAqL1xyXG4gICAgZnVsbCA9IGZhbHNlO1xyXG4gICAgLyoqIOeItuWFg+e0oCAqL1xyXG4gICAgcGFyZW50ITogSFRNTEVsZW1lbnQ7XHJcbiAgICAvKiog5piv5ZCm5Zyo5Luj56CB5Yy6LCDpu5jorqRmYWxzZSAqL1xyXG4gICAgaW5Db2RlID0gZmFsc2U7XHJcbiAgICBvbkNoYW5nZTogKGh0bWw6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHVuZGVmaW5lZDtcclxuICAgIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHVuZGVmaW5lZDtcclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy52aHRtbCA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9ybWF0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gdGhpcy5yZW5kZXIyLnBhcmVudE5vZGUodGhpcy5lZGl0b3IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbpu5jorqTmoLzlvI9cclxuICAgICAqL1xyXG4gICAgaW5pdEZvcm1hdERhdGEoKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZfmoLdcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb250TmFtZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsID0gIXRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnROYW1lJywgZmFsc2UsIHRoaXMuZm9udEZhbWlseS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZflj7dcclxuICAgICAqL1xyXG4gICAgc2V0Rm9udFNpemUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb250U2l6ZVBhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMuZm9udFNpemVzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuY21kKCdmb250U2l6ZScsIGZhbHNlLCBmb250U2l6ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKzmoLzlvI9cclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb3JtYXRCbG9jayhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbCA9ICF0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGZvcm1hdEJsb2NrID0gdGhpcy5mb3JtYXRCbG9ja3NbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gZm9ybWF0QmxvY2sua2V5O1xyXG4gICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAnPCcgKyB0aGlzLmZvcm1hdEJsb2NrICsgJz4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWJjeaZr+iJslxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvcmVDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuZm9yZUNvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvcmVDb2xvcicsIGZhbHNlLCB0aGlzLmZvcmVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7og4zmma/oibIo6auY5Lqu6ImyKVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEJhY2tDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuYmFja0NvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2JhY2tDb2xvcicsIGZhbHNlLCB0aGlzLmJhY2tDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ku6PnoIHor63oqIBcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRDb2RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hDb2RlUGFubmVsID0gIXRoaXMuc3dpdGNoQ29kZVBhbm5lbDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmNvZGUgPSB0aGlzLmNvZGVzW2luZGV4XTtcclxuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5jb2RlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgaWQgPSAoTWF0aC5yYW5kb20oKSArICcnKS5zbGljZSgyLCA4KTtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxwcmUgc3R5bGU9XCJ3aGl0ZS1zcGFjZTpwcmU7XCIgdGl0bGU9XCLku6PnoIHljLpcIj48Y29kZSBjbGFzcz1cIiR7Y29kZX1cIj48cCBpZD1cIiR7aWR9XCI+PGJyLz48L3A+PC9jb2RlPjwvcHJlPjxwPjxici8+PC9wPmA7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgLy8g5o+S5YWlaHRtbOWQju+8jOWwhuWFieagh+enu+iHs+S7o+eggeWMuueahHDmoIfnrb7kuK1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFNlbGVjdGlvblRvRWxlbWVudCgoQ29tbW9uVXRpbC5pZChpZCkpLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmRldGVjdENvZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOihjOWGheaNouihjO+8iHNoaWZ0K2VudGVy77yJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0QnJPblJldHVybihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoJ2luc2VydEJyT25SZXR1cm4nKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAnPGJyPjxicj4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0QnJPblJldHVybicsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueyl+S9k1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hCb2xkKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2JvbGQnLCBmYWxzZSwgJycpO1xyXG4gICAgICAgIHRoaXMuaXNCb2xkID0gIXRoaXMuaXNCb2xkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pac5L2TXHJcbiAgICAgKi9cclxuICAgIHN3aXRjaEl0YWxpYyhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpdGFsaWMnLCBmYWxzZSwgJycpO1xyXG4gICAgICAgIHRoaXMuaXNJdGFsaWMgPSAhdGhpcy5pc0l0YWxpYztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4i+WIkue6v1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hVbmRlcmxpbmUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgndW5kZXJsaW5lJywgZmFsc2UsICcnKTtcclxuICAgICAgICB0aGlzLmlzVW5kZXJsaW5lID0gIXRoaXMuaXNVbmRlcmxpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7liKDpmaTnur9cclxuICAgICAqL1xyXG4gICAgc3dpdGNoU3RyaWtlVGhyb3VnaChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdzdHJpa2VUaHJvdWdoJywgZmFsc2UsICcnKTtcclxuICAgICAgICB0aGlzLmlzU3RyaWtlVGhyb3VnaCA9ICF0aGlzLmlzU3RyaWtlVGhyb3VnaDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ri/lj5bmtojkuIov5LiL5qCHXHJcbiAgICAgKi9cclxuICAgIHNldFNjcmlwdChlOiBFdmVudCwgY21kOiAnc3VwZXJzY3JpcHQnIHwgJ3N1YnNjcmlwdCcpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGlmICh0aGlzLnNjcmlwdEFjdGl2ZSA9PT0gY21kKSB7IC8vIOWPlua2iOS4ii/kuIvmoIdcclxuICAgICAgICAgICAgdGhpcy5jbWQoY21kLCBmYWxzZSwgJycpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcmlwdEFjdGl2ZSA9ICcnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiuvue9ruS4ii/kuIvmoIdcclxuICAgICAgICB0aGlzLnNjcmlwdEFjdGl2ZSA9IGNtZDtcclxuICAgICAgICB0aGlzLmNtZChjbWQsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mloflrZflr7npvZDmlrnlkJFcclxuICAgICAqIEBwYXJhbSAgZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgc2V0SnVzdGlmeWFjdGl2ZShlOiBFdmVudCwgc3RyOiAnTGVmdCcgfCAnUmlnaHQnIHwgJ0NlbnRlcicgfCAnRnVsbCcpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5JyArIHN0cjtcclxuICAgICAgICB0aGlzLmNtZCh0aGlzLmp1c3RpZnlBY3RpdmUsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qei/m1xyXG4gICAgICovXHJcbiAgICBpbmRlbnQoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5kZW50JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHj+Wwkee8qei/m1xyXG4gICAgICovXHJcbiAgICBvdXRkZW50KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ291dGRlbnQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl5pyJ5bqP5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIGluc2VydE9yZGVyZWRMaXN0KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydE9yZGVyZWRMaXN0JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeaXoOW6j+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRVbm9yZGVyZWRMaXN0KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydFVub3JkZXJlZExpc3QnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6KGo5qC86LCD6LW35o+S5YWl6KGo5qC8VUlcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0VGFibGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiAn5o+S5YWl6KGo5qC8JywgYW5pbWF0aW9uOiAnc2NhbGUnLCBjb250ZW50OiBVSVRhYmxlQ29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76KGo5qC8VUnlvLnnqpfnoa7orqTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZVRhYmxlSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl6LaF6ZO+5o6l6LCD6LW35o+S5YWl6LaF6ZO+5o6lVUlcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRMaW5rKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYWxlcnQoeyB0aXRsZTogJ+aPkuWFpemTvuaOpScsIGFuaW1hdGlvbjogJ3NjYWxlJywgY29udGVudDogVUlMaW5rQ29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76LaF6ZO+5o6lVUnlvLnnqpfnoa7orqTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUxpbmtIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXlm77niYfosIPotbfmj5LlhaXlm77niYdVSVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGluc2VydEZpbGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hbGVydCh7IHRpdGxlOiAn5o+S5YWl5paH5Lu2JywgYW5pbWF0aW9uOiAnc2NhbGUnLCBjb250ZW50OiBVSUFubmV4Q29tcG9uZW50LCBoYW5kbGVyOiB0aGlzLCB0aGVtZTogdGhpcy50aGVtZSB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfkuIrkvKDmnKzlnLDmlofku7bml7bltYzlhaViYXNlNjTml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUxvY2FsRmlsZUhUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LiK5Lyg5paH5Lu2VUnlvLnnqpfigJzmj5LlhaXlpJbpk77igJ3ml7blm57osINcclxuICAgICAqIEBwYXJhbSBodG1sIOaPkuWFpeeahGh0bWxcclxuICAgICAqL1xyXG4gICAgcmVjaWV2ZUZpbGVMaW5rSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsITpgInmi6nmlofku7bkuovku7ZcclxuICAgICAqIEBwYXJhbSAgdHlwZSDmlofku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAgZmlsZSDmlofku7ZcclxuICAgICAqIEBwYXJhbSAgcGFyc2VyIOS8oOWFpXNyY+iOt+WPlmh0bWxcclxuICAgICAqIEBwYXJhbSAgY2xvc2UgIOWFs+mXreW8ueeql+WSjOmBrue9qVxyXG4gICAgICovXHJcbiAgICBlbWl0VXBsb2FkRmlsZSh0eXBlOiAnaW1hZ2UnIHwgJ2F1ZGlvJyB8ICd2aWRlbycsIGZpbGU6IGFueSwgcGFyc2VyOiAodjogc3RyaW5nKSA9PiBzdHJpbmcsIGNsb3NlOiAoYjogYm9vbGVhbiwgdD86IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZS5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZSwgZmlsZSwgY2FsbGJhY2s6IChzcmM6IHN0cmluZyB8IGJvb2xlYW4sIHQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghIXNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjaWV2ZUZpbGVMaW5rSFRNTChwYXJzZXIoc3JjIGFzIHN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xvc2UoISFzcmMsIHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaVoclxyXG4gICAgICovXHJcbiAgICBpbnNlcnRIb3Jpem9udGFsUnVsZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIb3Jpem9udGFsUnVsZScsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnspjotLRcclxuICAgICAqL1xyXG4gICAgcGFzdGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgncGFzdGUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Ymq5YiHXHJcbiAgICAgKi9cclxuICAgIGN1dChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdjdXQnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIGNvcHkoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnY29weScsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInkuK3miYDmnIlcclxuICAgICAqL1xyXG4gICAgc2VsZWN0QWxsKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3NlbGVjdEFsbCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43lgZpcclxuICAgICAqL1xyXG4gICAgcmVkbyhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdyZWRvJywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSpOmUgFxyXG4gICAgICovXHJcbiAgICB1bmRvKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3VuZG8nLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk6YCJ5LitXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZVNlbGVjdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdkZWxldGUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6G5Y+y6L6T5YWlXHJcbiAgICAgKi9cclxuICAgIGhpc3RvcnkoZTogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMudmh0bWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VkaXRvcl9pbnB1dCcpIHx8ICcnO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDph43orr7lhYnmoIdcclxuICAgICAgICAgICAgQ3Vyc29yVXRpbC5zZXRTZWxlY3Rpb25Ub0VsZW1lbnQodGhpcy5wYW5uZWwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9BY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyAxLuWPkeWwhGlubmVySFRNTCxpbnB1dOS6i+S7tuaOpeaUtlxyXG4gICAgICAgIHRoaXMub25JbnB1dC5lbWl0KHRoaXMudmh0bWwpO1xyXG4gICAgICAgIC8vIDIu6Kem5Y+RbmdNb2RlbENoYW5nZeS6i+S7tlxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52aHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmoLzlvI/vvIzkuI3pmLvmraLlpLHnhKbvvIzph43mlrDogZrnhKbml7bkvJrorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRm9ybWF0KCkge1xyXG4gICAgICAgIHRoaXMuY21kKCdyZW1vdmVGb3JtYXQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbml0Rm9ybWF0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdEZvcm1hdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5ZCE57G75LiL5ouJ5qGGXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaGlkZVN3aXRjaFBhbm5lbChlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmZvbnROYW1lRWwsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb250U2l6ZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JlQ29sb3JFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvcmVDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmJhY2tDb2xvckVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQmFja0NvbG9yUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb3JtYXRCbG9ja0VsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hDb2RlUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuY29kZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoQ29kZVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGP5oiW5Y+W5raI5YWo5bGPXHJcbiAgICAgKi9cclxuICAgIFN3aXRjaFNjcmVlbigpIHtcclxuICAgICAgICBjb25zdCBlZGl0b3I6IGFueSA9IHRoaXMuZWRpdG9yO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcjogYW55ID0gdGhpcy5oZWFkZXI7XHJcbiAgICAgICAgY29uc3QgcGFubmVsOiBhbnkgPSB0aGlzLnBhbm5lbDtcclxuICAgICAgICBjb25zdCBmb290ZXI6IGFueSA9IHRoaXMuZm9vdGVyO1xyXG4gICAgICAgIHRoaXMuZnVsbCA9ICF0aGlzLmZ1bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuZnVsbCkgeyAvLyDlhajlsY9cclxuICAgICAgICAgICAgZWRpdG9yLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5OTt0b3A6MDtsZWZ0OjA7dHJhbnNmb3JtOm5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTsnO1xyXG4gICAgICAgICAgICBwYW5uZWwuc3R5bGUuY3NzVGV4dCA9IGBtYXgtaGVpZ2h0OnVuc2V0O2hlaWdodDoke3dpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlci5vZmZzZXRIZWlnaHQgLSBmb290ZXIub2Zmc2V0SGVpZ2h0fXB4O2A7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgLy8g6L+Y5Y6fXHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHBhbm5lbC5zdHlsZS5jc3NUZXh0ID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKGVkaXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5oyJ6ZSu5LqL5Lu2ICjlpITnkIZ0YWLnvKnov5spXHJcbiAgICAgKiBAcGFyYW0gZSDmjInplK7kuovku7ZcclxuICAgICAqL1xyXG4gICAga2V5ZG93bihlOiBFdmVudCB8IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZSB8fCBlLndoaWNoIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgaWYgKGtleSAhPT0gOSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaMieS4i3RhYumUru+8jOWinuWKoOe8qei/mzLkuKrnqbrmoLxcclxuICAgICAgICBjb25zdCB0YWIgPSBuZXcgQXJyYXkoNSkuam9pbignJm5ic3A7Jyk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgdGFiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5oyJ6ZSu5by56LW35LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gZSDmjInplK7lvLnotbfkuovku7ZcclxuICAgICAqL1xyXG4gICAga2V5dXAoZTogRXZlbnQgfCBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldFJhbmdlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0Q29kZSgpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cclxuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gZS5rZXlDb2RlIHx8IGUud2hpY2ggfHwgZS5jaGFyQ29kZTtcclxuICAgICAgICAvLyDnm5HlkKxob21lLGVuZOWSjOS4iuS4i+W3puWPs+aMiemUru+8jOaIluWQjumAgOmUruaIluWIoOmZpOmUruaIlmVudGVy6ZSu77yM6K6+572u5r+A5rS75paH5a2X5qC85byPXHJcbiAgICAgICAgaWYgKChrZXkgPj0gMzUgJiYga2V5IDw9IDQwKSB8fCBrZXkgPT09IDggfHwga2V5ID09PSA0NiB8fCBrZXkgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0FjdGl2ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye76Z2i5p2/XHJcbiAgICAgKi9cclxuICAgIHBhbm5lbE9uQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLmF1dG9BY3RpdmUoKTtcclxuICAgICAgICAvLyDngrnlh7vlkI7mo4DmtYvmmK/lkKblnKjku6PnoIHljLrlhoXvvIzlhYnmoIflnKhjbGlja+WQjuWHuueOsO+8jFxyXG4gICAgICAgIC8vIOaJgOS7pei/memHjOmcgOimgeiuvue9ruW7tuaXtuS7u+WKoeinpuWPkeajgOa1i+OAglxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kZXRlY3RDb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo57yW6L6R6Z2i5p2/5Lit57KY6LS077yI6Iul5Zyo5Luj56CB5Yy65YaF57KY6LS05YiZ5riF6Zmk5qC85byP77yB77yB77yB77yJXHJcbiAgICAgKi9cclxuICAgIHBhbm5lbE9uUGFzdGUoZTogYW55KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuYXV0b0FjdGl2ZSgpOyB9KTtcclxuICAgICAgICBpZiAoIXRoaXMuaW5Db2RlKSB7IC8vIOS4jeWcqOS7o+eggeWMulxyXG4gICAgICAgICAgICB0aGlzLnNldFJhbmdlQW5kRW1pdFZhbHVlKDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9iaiA9IENvbW1vblV0aWwuaXNJRSgpID8gd2luZG93IDogZTtcclxuICAgICAgICBpZiAoIW9iai5jbGlwYm9hcmREYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBvYmouY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICAgICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgZGYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xyXG4gICAgICAgIEN1cnNvclV0aWwuaW5zZXJ0Tm9kZShkZik7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeaXtuiusOS9j+WFieWPmOS9jee9riAmJiBpbnB1dOS6i+S7tuWPkeWwhHZhbHVlICYmIOiusOS9j+i+k+WFpVxyXG4gICAgICovXHJcbiAgICBzZXRSYW5nZUFuZEVtaXRWYWx1ZShhcmcwOiBudW1iZXIgfCBFdmVudCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgYXJnMCA9IDMwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbm5lckhUTUwgPSB0aGlzLnBhbm5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZodG1sID09PSBpbm5lckhUTUwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIC8vIOacieWGheWuueaXtuaJjeS/neWtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSAodGhpcy5wYW5uZWwuaW5uZXJUZXh0IHx8IHRoaXMucGFubmVsLnRleHRDb250ZW50KS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VkaXRvcl9pbnB1dCcsIGlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gMS7lj5HlsIRpbm5lckhUTUwsaW5wdXTkuovku7bmjqXmlLZcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgLy8gMi7op6blj5FuZ01vZGVsQ2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoaW5uZXJIVE1MKTtcclxuICAgICAgICB9LCBhcmcwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWwhOe8lui+keWGheWuuVxyXG4gICAgICovXHJcbiAgICBlbWl0Q29udGVudCgpIHtcclxuICAgICAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICAgICAgY29uc3QgZWRpdFBhbm5lbCA9IHRoaXMucGFubmVsIGFzIGFueTtcclxuICAgICAgICAvLyDmo4DmtYvnvJbovpHlhoXlrrnlpKflsI9cclxuICAgICAgICBsZXQgaW5uZXJIVE1MOiBzdHJpbmcgPSBlZGl0UGFubmVsLmlubmVySFRNTDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5uZXJIVE1MLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSBpbm5lckhUTUwuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgaWYgKGMgPiAwICYmIGMgPCAyNTUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgKz0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2l6ZSA+IHRoaXMub3B0aW9ucyQubWF4c2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KCfnvJbovpHlhoXlrrnotoXlh7rlpKflsI9+Jyk7XHJcbiAgICAgICAgICAgIGlubmVySFRNTCA9IGlubmVySFRNTC5zdWJzdHIoMCwgdGhpcy5vcHRpb25zJC5tYXhzaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmdldFVybHNCeVRhZyh0aGlzLnBhbm5lbCwgJ2ltZycpO1xyXG4gICAgICAgIGNvbnN0IGF1ZGlvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICdhdWRpbycpO1xyXG4gICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICd2aWRlbycpO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICBpbm5lclRFWFQ6IGVkaXRQYW5uZWwuaW5uZXJUZXh0IHx8IGVkaXRQYW5uZWwudGV4dENvbnRlbnQsXHJcbiAgICAgICAgICAgIHVybHM6IHsgaW1hZ2UsIGF1ZGlvLCB2aWRlbyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlY2lldmVDb250ZW50LmVtaXQob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWmguaenOmdouadv+S4jeiBmueEpuWImeS9v+mdouadv+iBmueEplxyXG4gICAgICovXHJcbiAgICBwYW5uZWxGb2N1cygpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7nvJbovpHpnaLmnb/kuIrmrKHlhYnmoIfkuLrlvZPliY3lhYnmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWNvdmVyUmFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhbm5lbCkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDnoa7kv53nvJbovpHpnaLmnb/lhYjmmK/ogZrnhKbnmoRcclxuICAgICAgICB0aGlzLnBhbm5lbEZvY3VzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHsgLy8g5a2Y5Zyo5LiK5qyh5YWJ5qCH77yM5YiZ6K6+572u5LiK5qyh5YWJ5qCHXHJcbiAgICAgICAgICAgIEN1cnNvclV0aWwuc2V0Rmlyc3RSYW5nZSh0aGlzLnJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFNlbGVjdGlvblRvRWxlbWVudCh0aGlzLnBhbm5lbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogMS7ogZrnhKbpnaLmnb/lubbojrflj5bkuIrmrKHlhYnmoIfkvY3nva4s6K6+572u5b2T5YmN5Y6G5Y+y57yW6L6R5qC35byPXHJcbiAgICAgKiAyLueCueWHu+e8lui+keadoeeahOWRveS7pOaIluiAhee8lui+kemdouadv+WQju+8jOWwhuinhuS4uue8lui+keeKtuaAgVxyXG4gICAgICogQHBhcmFtICByZWNvdmVyPyDmmK/lkKbpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydEVkaXQocmVjb3ZlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvLyDmgaLlpI3kuIrmrKHlhYnmoIfvvIjngrnlh7vnvJbovpHpnaLmnb/kuI3pnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIzngrnlh7vnvJbovpHmnaHpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIlcclxuICAgICAgICBpZiAocmVjb3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJSYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLvmraLpu5jorqTkuovku7bpmLLmraLlpLHnhKbvvIznoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7ljoblj7LlhYnmoIflkozmoLzlvI9cclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuc3VyZUZvY3VzKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8g6Zi75q2i5aSx54SmXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIOe8lui+keWIneWni+WMllxyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvJbovpHliJ3lp4vljJblkozorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RWRpdCgpIHtcclxuICAgICAgICAvLyDlnKjnvJbovpHnirbmgIHkuI3lho3mrKHov5vooYzliJ3lp4vljJZcclxuICAgICAgICBpZiAodGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOagh+iusOmdouadv+WkhOS6jue8lui+keeKtuaAgVxyXG4gICAgICAgIGlmICghdGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5FZGl0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aaC5p6c5YWJ5qCH5ZGo5Zu05pyJ5YaF5a655YiZ5LiN6K6+572u6buY6K6k5qC85byPXHJcbiAgICAgICAgY29uc3QgZWwgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcqOS7o+eggeWMuuS4jeiuvue9rum7mOiupOagvOW8j1xyXG4gICAgICAgIGlmICh0aGlzLmluQ29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOayoeacieWGheWuue+8jOWImeagvOW8j+WMlum7mOiupOagvOW8j1xyXG4gICAgICAgIGlmICghdGhpcy5wYW5uZWwuY2hpbGRyZW4gfHwgIXRoaXMucGFubmVsLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRGb3JtYXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdEZvcm1hdCgpIHtcclxuICAgICAgICB0aGlzLmNtZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgdGhpcy5mb3JtYXRCbG9jayk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnROYW1lJywgZmFsc2UsIHRoaXMuZm9udEZhbWlseS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnRTaXplJywgZmFsc2UsIHRoaXMuZm9udFNpemUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5piv5ZCm5pSv5oyB5ZG95LukXHJcbiAgICAgKiBAcGFyYW0gY21kIOWRveS7pFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU3VwcG9ydChjbWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoY21kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFvOWuuWluc2VydEhUTUzlkb3ku6RcclxuICAgICAqIEBwYXJhbSBodG1sIGh0bWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbnNlcnRIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gPFJhbmdlPkN1cnNvclV0aWwuZ2V0UmFuZ2UoMCk7XHJcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuICAgICAgICBjb25zdCBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBsZXQgbmFtZSA9ICdkaXYnO1xyXG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxhPicpID4gLTEpIHsgbmFtZSA9ICdzcGFuJzsgfVxyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcclxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGRmKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJp+ihjOWwgeijheeahOe8lui+keWRveS7pFxyXG4gICAgICogQHBhcmFtIGsg5ZG95Luk5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gdWkg5omT5byAdWnlvLnnqpdcclxuICAgICAqIEBwYXJhbSB2IOiuvue9ruWRveS7pOWAvFxyXG4gICAgICogQHJldHVybnMgdHJ1ZS3orr7nva7miJDlip/vvIxmYWxzZS3orr7nva7lpLHotKVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbWQoazogc3RyaW5nLCB1aTogYm9vbGVhbiwgdj86IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoaykpIHsgLy8g5LiN5pSv5oyB6K+l5ZG95LukXHJcbiAgICAgICAgICAgIC8vIOWwneivleWFvOWuueWRveS7pFxyXG4gICAgICAgICAgICBpZiAoJ2luc2VydEhUTUwnID09PSBrKSB7IHJldHVybiB0aGlzLmluc2VydEhUTUwodik7IH1cclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn57O757uf5LiN5pSv5oyB6K+l5ZG95LukficpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHIgPSBkb2N1bWVudC5leGVjQ29tbWFuZChrLCB1aSwgdiB8fCAnJyk7XHJcbiAgICAgICAgLy8g5omn6KGM5a6M5Lul5LiL5ZG95Luk5ZCO77yM6Z2e5Luj56CB5Yy65YaF6ZyA6KaB6Ieq5Yqo5qOA5rWL5paH5a2X5qC85byP77yI5qC35byP77yJXHJcbiAgICAgICAgY29uc3QgYmxhY2tMaXN0ID0gJ3JlZG8sdW5kbyxkZWxldGUsaW5zZXJ0SFRNTCxpbnNlcnRIb3Jpem9udGFsUnVsZSxpbnNlcnRVbm9yZGVyZWRMaXN0LGluc2VydE9yZGVyZWRMaXN0JztcclxuICAgICAgICBpZiAociAmJiBibGFja0xpc3QuaW5kZXhPZihrKSA+IC0xICYmICF0aGlzLmluQ29kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9BY3RpdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbnB1dCxjbGljayxzZWxlY3Rpb25jaGFuZ2Xkuovku7borrDlvZXnvJbovpHpnaLmnb/lhYnmoIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRSYW5nZSgpIHtcclxuICAgICAgICB0aGlzLnJhbmdlID0gQ3Vyc29yVXRpbC5nZXRSYW5nZSgwLCB0aGlzLnBhbm5lbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rliqjmo4DmtYvmloflrZfmoLzlvI/mv4DmtLvmoLflvI/vvIjliqDnspfvvIzmlpzkvZPvvIzkuIvliJLnur/vvIzliKDpmaTnur/vvIzkuIrmoIfvvIzkuIvmoIcuLi4uLi7vvIlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdXRvQWN0aXZlKCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGxldCBwID0gPEhUTUxFbGVtZW50PihDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkpO1xyXG4gICAgICAgIGlmICghcCkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDlpoLmnpzpgInlj5blr7nosaHnmoToioLngrnmmK/mlofmnKzoioLngrnvvIzliJnlsIZw5Y+Y5Li65YW254i26IqC54K5XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKHAubm9kZU5hbWUgPT09ICcjdGV4dCcpIHsgcCA9IDxIVE1MRWxlbWVudD5wLnBhcmVudE5vZGU7IH1cclxuICAgICAgICBpZiAoIXApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8g5q616JC95qC85byPXHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuZm9ybWF0QmxvY2s7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXRCbG9jayA9IGUubm9kZU5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdEJsb2NrJCA9IHRoaXMuZm9ybWF0QmxvY2tzLmZpbmQoKGZiOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYi5rZXkudG9VcHBlckNhc2UoKSA9PT0gZm9ybWF0QmxvY2s7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0QmxvY2skKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gZm9ybWF0QmxvY2skLmtleTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5a2X5qC3XHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5mb250RmFtaWx5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZm9udEZhbWlseSA9IGUuZ2V0QXR0cmlidXRlKCdmYWNlJyk7XHJcbiAgICAgICAgICAgIGlmICghZm9udEZhbWlseSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgY29uc3QgZm9udEZhbWlseSQgPSB0aGlzLmZvbnRGYW1pbHlzLmZpbmQoKGZmOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmZi52YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBmb250RmFtaWx5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZm9udEZhbWlseSQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9udEZhbWlseSA9IGZvbnRGYW1pbHkkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDlrZflj7dcclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9udFNpemUgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5mb250U2l6ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplID0gZS5nZXRBdHRyaWJ1dGUoJ3NpemUnKTtcclxuICAgICAgICAgICAgaWYgKCFmb250U2l6ZSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgY29uc3QgZm9udFNpemUkID0gdGhpcy5mb250U2l6ZXMuZmluZCgoZnM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZzLnZhbHVlID09PSBmb250U2l6ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChmb250U2l6ZSQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9udFNpemUgPSBmb250U2l6ZSQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWJjeaZr+iJslxyXG4gICAgICAgIHRoaXMuZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQocCwgKGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JlQ29sb3IgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5mb3JlQ29sb3I7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBmb3JlQ29sb3IgPSBDb21tb25VdGlsLnJnYlRvSGV4KGUuZ2V0QXR0cmlidXRlKCdjb2xvcicpKTtcclxuICAgICAgICAgICAgY29uc3QgZm9yZUNvbG9yJCA9IENvbW1vblV0aWwuZmxhdCh0aGlzLmNvbG9ycykuZmluZCgoY3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyLnRvTG93ZXJDYXNlKCkgPT09IGZvcmVDb2xvci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZvcmVDb2xvciQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yZUNvbG9yID0gZm9yZUNvbG9yJDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g6IOM5pmv6ImyXHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDb2xvciA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULmJhY2tDb2xvcjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGJhY2tDb2xvciA9IENvbW1vblV0aWwucmdiVG9IZXgoZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWNrQ29sb3IkID0gQ29tbW9uVXRpbC5mbGF0KHRoaXMuY29sb3JzKS5maW5kKChjcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3IudG9Mb3dlckNhc2UoKSA9PT0gYmFja0NvbG9yLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoYmFja0NvbG9yJCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBiYWNrQ29sb3IkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDliqDnspdcclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNCb2xkID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuaXNCb2xkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUubm9kZU5hbWUgPT09ICdTVFJPTkcnIHx8IGUubm9kZU5hbWUgPT09ICdCJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNCb2xkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOaWnOS9k1xyXG4gICAgICAgIHRoaXMuZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQocCwgKGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0l0YWxpYyA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULmlzSXRhbGljO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUubm9kZU5hbWUgPT09ICdFTScgfHwgZS5ub2RlTmFtZSA9PT0gJ0knKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0l0YWxpYyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDkuIvliJLnur9cclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNVbmRlcmxpbmUgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5pc1VuZGVybGluZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVOYW1lID09PSAnVScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVW5kZXJsaW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWIoOmZpOe6v1xyXG4gICAgICAgIHRoaXMuZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQocCwgKGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1N0cmlrZVRocm91Z2ggPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5pc1N0cmlrZVRocm91Z2g7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5ub2RlTmFtZSA9PT0gJ1NUUklLRScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU3RyaWtlVGhyb3VnaCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDkuIrmoIfvvIzkuIvmoIdcclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0QWN0aXZlID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuc2NyaXB0QWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUubm9kZU5hbWUgPT09ICdTVVAnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY3JpcHRBY3RpdmUgPSAnc3VwZXJzY3JpcHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVOYW1lID09PSAnU1VCJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NyaXB0QWN0aXZlID0gJ3N1YnNjcmlwdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDlr7npvZDmlrnlvI9cclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuanVzdGlmeUFjdGl2ZSA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULmp1c3RpZnlBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0ZXh0QWxpZ24gPSBlLmdldEF0dHJpYnV0ZSgnYWxpZ24nKSB8fCBlLnN0eWxlLnRleHRBbGlnbjtcclxuICAgICAgICAgICAgaWYgKHRleHRBbGlnbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qdXN0aWZ5QWN0aXZlID0gJ2p1c3RpZnlMZWZ0JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0QWxpZ24gPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qdXN0aWZ5QWN0aXZlID0gJ2p1c3RpZnlDZW50ZXInO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRleHRBbGlnbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5UmlnaHQnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRleHRBbGlnbiA9PT0gJ2p1c3RpZnknKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qdXN0aWZ5QWN0aXZlID0gJ2p1c3RpZnlGdWxsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5pyA5rex5bGC6IqC54K55Yiw5pyA5aSW5bGC6IqC54K55omn6KGM5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gc3RhcnQg5pyA5rex5bGC6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gZW5kIOacgOWkluWxguiKgueCuVxyXG4gICAgICogQHBhcmFtIGZuIOWbnuiwgyDnm7TliLDlm57osIPov5Tlm550cnVl5pe25omN5Lya57uI5q2i5Zue6LCD55qE5omn6KGMXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQoc3RhcnQ6IGFueSwgZm46IGFueSkge1xyXG4gICAgICAgIGxldCBvID0gc3RhcnQ7XHJcbiAgICAgICAgd2hpbGUgKCEhbykge1xyXG4gICAgICAgICAgICBpZiAoZm4obykpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIG8gPSBvLnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+55uu5qCH5YWD57Sg55qE55qE5p+Q5Liq5qCH562+55qEdXJsc+WSjGJhc2U2NOeahHVybFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDlhYPntKBcclxuICAgICAqIEBwYXJhbSB0YWcg5qCH562+XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VXJsc0J5VGFnKHRhcmdldDogSFRNTEVsZW1lbnQsIHRhZzogc3RyaW5nKTogeyB0eXBlOiAndXJsJyB8ICdiYXNlNjQnLCBzcmM6IHN0cmluZyB9W10ge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IFtdIGFzIGFueTtcclxuICAgICAgICBjb25zdCB0YWdzID0gdGFyZ2V0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZy50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhZ3MsIGVsZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0ge30gYXMgYW55O1xyXG4gICAgICAgICAgICBjb25zdCBzcmMgPSBlbGVtLnNyYztcclxuICAgICAgICAgICAgaWYgKHNyYy5pbmRleE9mKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSAndXJsJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9ICdiYXNlNjQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0uc3JjID0gc3JjO1xyXG4gICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6IyD5Zu0UmFuZ2XmmK/lkKblkozku6PnoIHljLrmnInkuqTpm4ZcclxuICAgICAqIEByZXR1cm5zIHRydWUgLSDmnInkuqTpm4bvvIxmYWxzZSAtIOaXoOS6pOmbhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRldGVjdENvZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5wYW5uZWxGb2N1cygpO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkgYXMgYW55O1xyXG4gICAgICAgIGlmICghcGFyZW50KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIC8vIOWmguaenOaYr+aWh+acrOiKgueCueWImeaJvuWFtueItuWFg+e0oFxyXG4gICAgICAgIGlmIChwYXJlbnQubm9kZVR5cGUgPT09IDMpIHsgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7IH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbkNvZGUgPSAoKCkgPT4geyAvLyDooqvljIXlkKtcclxuICAgICAgICAgICAgbGV0IHBhcmVudCQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uZGl0aW9uYWwtYXNzaWdubWVudFxyXG4gICAgICAgICAgICB3aGlsZSAocGFyZW50JCA9IHBhcmVudCQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCQudGFnTmFtZSA9PT0gJ0NPREUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50JCA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pKCkgfHwgKCgpID0+IHsgLy8g5YyF5ZCrXHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gQ3Vyc29yVXRpbC5nZXRSYW5nZSgwKSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGlmIChyYW5nZS5jbG9uZUNvbnRlbnRzKSB7IC8vIOaWsOagh+WHhlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlID0gcmFuZ2UuY2xvbmVDb250ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRzID0gQ29tbW9uVXRpbC5nZXRBbGxDaGlsZHMoZWxlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRzW2ldLm5vZGVOYW1lID09PSAnQ09ERScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOaXp+agh+WHhlxyXG4gICAgICAgICAgICBjb25zdCBodG1sID0gcmFuZ2UuaHRtbFRleHQgfHwgJyc7XHJcbiAgICAgICAgICAgIHJldHVybiAvPGNvZGV8PFxcL2NvZGU+Ly50ZXN0KGh0bWwpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2FzdOaPkOekulxyXG4gICAgICogQHBhcmFtICB0ZXh0PyB0b2FzdOaPkOekuiDpu5jorqTkuLrigJjorr7nva7ml6DmlYh+4oCZXHJcbiAgICAgKiBAcGFyYW0gIGR1cmF0aW9uPyDlgZznlZnml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b2FzdCh0ZXh0OiBzdHJpbmcgPSAn6K6+572u5peg5pWIficsIG9iaj86IHsgZHVyYXRpb246IG51bWJlciwgZW50ZXI6IG51bWJlciwgbGVhdmU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS50b3N0KHsgdGV4dCwgLi4ub2JqIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by556qXXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWxlcnQob2JqOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS5hbGVydChvYmopO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYsuaKllxyXG4gICAgICogQHBhcmFtICBmIOWbnuiwg1xyXG4gICAgICogQHBhcmFtICB0PyDpmLLmipbml7blu7Yg6buY6K6kMzAwbXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWJvdW5jZShmOiAoKSA9PiB2b2lkLCB0OiBudW1iZXIgPSAzMDApIHtcclxuICAgICAgICBjb25zdCBvID0gdGhpcy5kZWJvdW5jZSBhcyBhbnk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KG8udGltZXIpO1xyXG4gICAgICAgIG8udGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZigpO1xyXG4gICAgICAgIH0sIHQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==