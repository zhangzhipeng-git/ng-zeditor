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
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        CursorUtil.setSelectionToElement((/** @type {?} */ ((CommonUtil.id(id)))), true);
        this.setRange(); // 手动记录一下光标位置
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
        if (this.scriptActive === cmd) {
            this.cmd(cmd, false, '');
            this.scriptActive = '';
            return;
        }
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
        this.autoActive();
        this.setRangeAndEmitValue(0);
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
        if (this.isRangeInCode()) {
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
        if (!this.isRangeInCode()) {
            // tslint:disable-next-line: no-angle-bracket-type-assertion
            /** @type {?} */
            const obj = (/** @type {?} */ (CommonUtil.isIE())) ? window : e;
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
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     * @private
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
        // 在代码区不设置默认格式
        if (this.isRangeInCode()) {
            return;
        }
        // 如果光标周围有内容则不设置默认格式
        /** @type {?} */
        const el = CursorUtil.getRangeCommonParent();
        if (!el || el.nodeType === 3) {
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
        if (!this.isSupport(k)) {
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
        if (r && blackList.indexOf(k) > -1 && !this.isRangeInCode()) {
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
        if (this.isRangeInCode()) {
            this.inCode = true;
        }
        else {
            this.inCode = false;
        }
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
                this.cmd('formatBlock', false, 'p');
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
                encapsulation: ViewEncapsulation.None,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9uZy16ZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBTSxVQUFVOztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQyxDQUFHLFNBQVM7O0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDLENBQUcsU0FBUzs7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDLENBQVEsU0FBUzs7QUFDbkUsT0FBTyxVQUFVLE1BQU0sbUJBQW1CLENBQUMsQ0FBZSxTQUFTOztBQUNuRSxPQUFPLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQyxDQUFlLFFBQVE7Ozs7O0FBR2xFLHNCQXNCQzs7Ozs7O0lBcEJHLDBCQUFnQjs7Ozs7SUFFaEIsMEJBQWdCOzs7OztJQUVoQix3QkFLRTs7Ozs7SUFFRix3QkFHRTs7Ozs7SUFFRix3QkFHRTs7QUFjTixNQUFNLE9BQU8sbUJBQW1COzs7OztJQXVDNUIsWUFDWSxPQUFrQixFQUNsQixVQUFzQjtRQUR0QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFrQnpCLFVBQUssR0FBRyxlQUFl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U0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFHMXhCLGNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7OztRQUVsVyxVQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7O1FBRTNGLGVBQVUsR0FBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLENBQUM7Ozs7UUFFNUQsYUFBUSxHQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZOzs7OztRQUV6RSxnQkFBVyxHQUFHLEdBQUcsQ0FBQzs7OztRQUVsQixjQUFTLEdBQUcsT0FBTyxDQUFDOzs7O1FBRXBCLGNBQVMsR0FBRyxPQUFPLENBQUM7Ozs7UUFFcEIsU0FBSSxHQUFHLFlBQVksQ0FBQzs7OztRQUVwQiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFFL0IseUJBQW9CLEdBQUcsS0FBSyxDQUFDOzs7O1FBRTdCLDRCQUF1QixHQUFHLEtBQUssQ0FBQzs7OztRQUVoQywwQkFBcUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFFOUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDOzs7O1FBRTlCLHFCQUFnQixHQUFHLEtBQUssQ0FBQzs7OztRQUV6QixXQUFNLEdBQUcsS0FBSyxDQUFDOzs7O1FBRWYsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUVqQixnQkFBVyxHQUFHLEtBQUssQ0FBQzs7OztRQUVwQixvQkFBZSxHQUFHLEtBQUssQ0FBQzs7OztRQUV4QixpQkFBWSxHQUFHLEVBQUUsQ0FBQzs7OztRQUVsQixrQkFBYSxHQUFHLGFBQWEsQ0FBQzs7OztRQUU5QixtQkFBYyxHQUFHLEtBQUssQ0FBQzs7OztRQUl2QixTQUFJLEdBQUcsS0FBSyxDQUFDOzs7O1FBSWIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGFBQVE7OztRQUEyQixHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUM7UUFDbkQsY0FBUzs7O1FBQWUsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFDO0lBdkd4QyxDQUFDOzs7OztJQTFDRCxJQUNJLE9BQU8sQ0FBQyxDQUFNO1FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxJQUFJLE1BQU07UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFDLGFBQWEsRUFBRSxFQUFDLFlBQVksRUFBRSxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ2hGLENBQUM7Ozs7SUFDRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7Ozs7SUFDRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7Ozs7SUFDRCxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7Ozs7SUFDRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFDRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFDRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBOEdELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQzs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Ozs7SUFDRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7O0lBSUQsY0FBYztRQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBS0QsV0FBVztRQUNQLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDOzs7Ozs7SUFNRCxXQUFXLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBQ2QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOztjQUNaLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDM0QsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFLRCxXQUFXLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O2NBQ2QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNOztjQUNaLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDdkQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFBRSxPQUFPO1NBQUU7O2NBQ2hELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7SUFNRCxjQUFjLENBQUMsQ0FBTTtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUNkLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7Y0FDWixLQUFLLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDMUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzdELElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUNoRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBTUQsWUFBWSxDQUFDLENBQU07UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUNkLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7Y0FDWixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7O2NBQy9CLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBTUQsWUFBWSxDQUFDLENBQU07UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUNkLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7Y0FDWixDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7O2NBQy9CLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBTUQsVUFBVSxDQUFDLENBQU07UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzs7Y0FDekMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUNqRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7O2NBQzlCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Y0FDckMsSUFBSSxHQUFHLDBEQUEwRCxJQUFJLFlBQVksRUFBRSxzQ0FBc0M7UUFDL0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLHdCQUF3QjtRQUN4Qiw0REFBNEQ7UUFDNUQsVUFBVSxDQUFDLHFCQUFxQixDQUFDLG1CQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsYUFBYTtJQUNsQyxDQUFDOzs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxDQUFNO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDMUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFLRCxVQUFVLENBQUMsQ0FBTTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUtELFlBQVksQ0FBQyxDQUFNO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBS0QsZUFBZSxDQUFDLENBQU07UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBS0QsbUJBQW1CLENBQUMsQ0FBTTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7O0lBS0QsU0FBUyxDQUFDLENBQVEsRUFBRSxHQUFnQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsQ0FBUSxFQUFFLEdBQXlDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFLRCxNQUFNLENBQUMsQ0FBTTtRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUtELE9BQU8sQ0FBQyxDQUFNO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBS0QsaUJBQWlCLENBQUMsQ0FBTTtRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUtELG1CQUFtQixDQUFDLENBQU07UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFLRCxXQUFXLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ILENBQUM7Ozs7OztJQUtELGdCQUFnQixDQUFDLElBQVk7UUFDekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFNRCxVQUFVLENBQUMsQ0FBTTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsSCxDQUFDOzs7Ozs7SUFLRCxlQUFlLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQU1ELFVBQVUsQ0FBQyxDQUFNO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkgsQ0FBQzs7Ozs7O0lBS0Qsb0JBQW9CLENBQUMsSUFBWTtRQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUtELG1CQUFtQixDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7Ozs7SUFRRCxjQUFjLENBQUMsSUFBaUMsRUFBRSxJQUFTLEVBQUUsTUFBNkIsRUFBRSxLQUF1QztRQUMvSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNqQixJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVE7Ozs7O1lBQUUsQ0FBQyxHQUFxQixFQUFFLENBQVUsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxtQkFBQSxHQUFHLEVBQVUsQ0FBQyxDQUFDLENBQUM7aUJBQ25EO2dCQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQTtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUtELG9CQUFvQixDQUFDLENBQU07UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7SUFLRCxLQUFLLENBQUMsQ0FBTTtRQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUtELEdBQUcsQ0FBQyxDQUFNO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBS0QsSUFBSSxDQUFDLENBQU07UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFLRCxTQUFTLENBQUMsQ0FBTTtRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUtELElBQUksQ0FBQyxDQUFNO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBS0QsSUFBSSxDQUFDLENBQU07UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFLRCxZQUFZLENBQUMsQ0FBTTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUtELE9BQU8sQ0FBQyxDQUFRO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBS0QsWUFBWTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxDQUFNOztjQUNiLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVO1FBQ3ZDLElBQUksSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDcEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztZQUNsQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7WUFDbkMsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsdUJBQXVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbEYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztZQUNyQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLE9BQU87U0FDVjtJQUNMLENBQUM7Ozs7O0lBS0QsWUFBWTs7Y0FDRixNQUFNLEdBQVEsSUFBSSxDQUFDLE1BQU07O2NBQ3pCLE1BQU0sR0FBUSxJQUFJLENBQUMsTUFBTTs7Y0FDekIsTUFBTSxHQUFRLElBQUksQ0FBQyxNQUFNOztjQUN6QixNQUFNLEdBQVEsSUFBSSxDQUFDLE1BQU07UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxrRkFBa0YsQ0FBQztZQUMxRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRywyQkFBMkIsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLEtBQUssQ0FBQztZQUN0SCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzthQUFNLEVBQVMsS0FBSztZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Ozs7O0lBTUQsT0FBTyxDQUFDLENBQWM7O2NBQ1osR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsUUFBUTtRQUM5QyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7OztjQUVLLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsT0FBTztJQUNYLENBQUM7Ozs7OztJQU1ELEtBQUssQ0FBQyxDQUFjO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNyQyx3Q0FBd0M7UUFDeEMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDOztjQUNoQixHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBQzlDLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE9BQU87U0FDVjtJQUNMLENBQUM7Ozs7O0lBS0QsYUFBYTtRQUNULElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQUtELGFBQWEsQ0FBQyxDQUFNO1FBQ2hCLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7OztrQkFFakIsR0FBRyxHQUFHLG1CQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7Z0JBQUUsT0FBTzthQUFFOztrQkFDN0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7a0JBQ3hDLEVBQUUsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDNUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBS0Qsb0JBQW9CLENBQUMsSUFBb0I7UUFDckMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFROzs7UUFBQyxHQUFHLEVBQUU7O2tCQUNULFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFBRSxPQUFPO2FBQUU7OztrQkFFbkMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNO1lBQ3JFLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDVCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDMUQ7WUFDRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0Isc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7SUFLRCxXQUFXOztZQUNILElBQUksR0FBRyxDQUFDOztjQUNOLFVBQVUsR0FBRyxtQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFPOzs7WUFFakMsU0FBUyxHQUFXLFVBQVUsQ0FBQyxTQUFTO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2tCQUM1QyxDQUFDLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLElBQUksRUFBRSxDQUFDO2FBQ1Y7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsQ0FBQzthQUNiO1NBQ0o7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hCLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFEOztjQUNLLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDOztjQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7Y0FDL0MsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7O2NBQy9DLEdBQUcsR0FBRztZQUNSLFNBQVM7WUFDVCxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUMsV0FBVztZQUN6RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtTQUNoQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUtPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDN0IsY0FBYztRQUNkLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxpQkFBaUI7WUFDL0IsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsT0FBTztTQUNWO1FBQ0QsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7SUFPTyxTQUFTLENBQUMsVUFBbUIsSUFBSTtRQUNyQyx3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQU1PLFdBQVcsQ0FBQyxDQUFRO1FBQ3hCLE9BQU87UUFDUCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsUUFBUTtRQUNSLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFLTyxRQUFRO1FBQ1osZ0JBQWdCO1FBQ2hCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixPQUFPO1NBQ1Y7UUFDRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFDRCxjQUFjO1FBQ2QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDdEIsT0FBTztTQUNWOzs7Y0FFSyxFQUFFLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixFQUFFO1FBQzVDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTztTQUNWO1FBQ0Qsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7Ozs7SUFNTyxTQUFTLENBQUMsR0FBVztRQUN6QixPQUFPLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7O0lBTU8sVUFBVSxDQUFDLElBQVk7OztjQUVyQixLQUFLLEdBQUcsbUJBQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQTtRQUMzQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O2NBQ2pCLEVBQUUsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7O1lBQ3hDLElBQUksR0FBRyxLQUFLO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUFFLElBQUksR0FBRyxNQUFNLENBQUM7U0FBRTs7Y0FDMUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7Ozs7SUFTTyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQVcsRUFBRSxDQUFPO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtZQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOztjQUNLLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O2NBRXhDLFNBQVMsR0FBRyx3RkFBd0Y7UUFDMUcsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUtPLFFBQVE7UUFDWixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7Ozs7SUFLTyxVQUFVOzs7WUFFVixDQUFDLEdBQUcsbUJBQWEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFBO1FBQ3hELElBQUksQ0FBQyxDQUFDLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDbkIsMkJBQTJCO1FBQzNCLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQUUsQ0FBQyxHQUFHLG1CQUFhLENBQUMsQ0FBQyxVQUFVLEVBQUEsQ0FBQztTQUFFO1FBQzlELElBQUksQ0FBQyxDQUFDLEVBQUU7WUFBQyxPQUFPO1NBQUU7UUFDbEIsT0FBTztRQUNQLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDMUQsT0FBTyxJQUFJLENBQUM7YUFDZjs7a0JBQ0ssV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFROztrQkFDeEIsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTs7OztZQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7Z0JBQ3BELE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUM7WUFDaEQsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDO2dCQUNwQyxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxLQUFLO1FBQ0wsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Ozs7UUFBRSxDQUFDLENBQWMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDeEQsT0FBTyxJQUFJLENBQUM7YUFDZjs7a0JBQ0ssVUFBVSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQUUsT0FBTzthQUFFOztrQkFDdEIsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztZQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7Z0JBQ2xELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0QsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILEtBQUs7UUFDTCxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7OztRQUFFLENBQUMsQ0FBYyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNwRCxPQUFPLElBQUksQ0FBQzthQUNmOztrQkFDSyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtnQkFDOUMsT0FBTyxFQUFFLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUNqQyxDQUFDLEVBQUM7WUFDRixJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsTUFBTTtRQUNOLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3RELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7O2tCQUNLLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7O2tCQUN4RCxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7Z0JBQzdELE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4RCxDQUFDLEVBQUM7WUFDRixJQUFJLFVBQVUsRUFBRTtnQkFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztnQkFDNUIsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsTUFBTTtRQUNOLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3RELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7O2tCQUNLLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDOztrQkFDeEQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO2dCQUM3RCxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEQsQ0FBQyxFQUFDO1lBQ0YsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILEtBQUs7UUFDTCxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7OztRQUFFLENBQUMsQ0FBYyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoRCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtnQkFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM3QjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsS0FBSztRQUNMLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3BELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxNQUFNO1FBQ04sSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Ozs7UUFBRSxDQUFDLENBQWMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDMUQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDbEM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE1BQU07UUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7OztRQUFFLENBQUMsQ0FBYyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2dCQUNsRSxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUN0QztRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsUUFBUTtRQUNSLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQzthQUMxQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTztRQUNQLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7O1FBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBQzlELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7O2tCQUNLLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUztZQUM5RCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFDN0M7aUJBQU0sSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDO2FBQy9DO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQzthQUM5QztpQkFBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7YUFDN0M7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7Ozs7O0lBUU8sdUJBQXVCLENBQUMsS0FBVSxFQUFFLEVBQU87O1lBQzNDLENBQUMsR0FBRyxLQUFLO1FBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQ3RCLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFPTyxZQUFZLENBQUMsTUFBbUIsRUFBRSxHQUFXOztjQUMzQyxHQUFHLEdBQUcsbUJBQUEsRUFBRSxFQUFPOztjQUNmLElBQUksR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJOzs7O1FBQUUsSUFBSSxDQUFDLEVBQUU7O2tCQUNoQyxJQUFJLEdBQUcsbUJBQUEsRUFBRSxFQUFPOztrQkFDaEIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHO1lBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUNyQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUN4QjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBTU8sYUFBYTtRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBQ2YsTUFBTSxHQUFHLG1CQUFBLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxFQUFPO1FBQ3JELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBQzlCLGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FBRTtRQUMxRCxPQUFPOzs7UUFBQyxHQUFHLEVBQUU7OztnQkFDTCxPQUFPLEdBQUcsTUFBTTtZQUNwQixzREFBc0Q7WUFDdEQsT0FBTyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDakMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtvQkFDNUIsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDekIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLEVBQUMsRUFBRSxJQUFJOzs7UUFBQyxHQUFHLEVBQUU7OztrQkFDSixLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUM3QyxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxFQUFFLENBQUM7SUFDVCxDQUFDOzs7Ozs7OztJQU9PLEtBQUssQ0FBQyxPQUFlLE9BQU8sRUFBRSxHQUF3RDtRQUMxRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxpQkFBRyxJQUFJLElBQUssR0FBRyxFQUFHLENBQUM7SUFDbEQsQ0FBQzs7Ozs7OztJQUtPLEtBQUssQ0FBQyxHQUFrQjtRQUM1QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7O0lBUU8sUUFBUSxDQUFDLENBQWEsRUFBRSxJQUFZLEdBQUc7O2NBQ3JDLENBQUMsR0FBRyxtQkFBQSxJQUFJLENBQUMsUUFBUSxFQUFPO1FBQzlCLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDdEIsQ0FBQyxFQUFFLENBQUM7UUFDUixDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDOzs7OztBQXRoQ00sMEJBQU0sR0FBRztJQUNaLE1BQU0sRUFBRSxLQUFLO0lBQ2IsUUFBUSxFQUFFLEtBQUs7SUFDZixXQUFXLEVBQUUsS0FBSztJQUNsQixlQUFlLEVBQUUsS0FBSztJQUN0QixZQUFZLEVBQUUsRUFBRTtJQUNoQixXQUFXLEVBQUUsR0FBRztJQUNoQixTQUFTLEVBQUUsU0FBUztJQUNwQixTQUFTLEVBQUUsU0FBUztJQUNwQixhQUFhLEVBQUUsYUFBYTtJQUM1QixRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUNsRCxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtDQUN4RCxDQUFDOztZQXBFTCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBRXZCLDh1aUJBQTBDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFDO3dCQUNsRCxLQUFLLEVBQUUsSUFBSTtxQkFDZCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQTdDeUQsU0FBUztZQU0xRCxVQUFVOzs7c0JBeUNkLEtBQUs7b0JBMERMLEtBQUs7c0JBRUwsTUFBTTtxQkFFTixLQUFLOzZCQUNMLE1BQU07b0JBS04sS0FBSzt5QkFFTCxNQUFNO3dCQUVOLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBRXpELFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBRXpELFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBQ3pELFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MEJBQ3pELFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MEJBQzNELFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7NkJBQzNELFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsyQkFDOUQsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsyQkFDNUQsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtzQkFDNUQsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7Ozs7OztJQXZDeEQsMkJBWUU7Ozs7O0lBRUYsb0NBQWlDOztJQUVqQyxzQ0FBcUU7Ozs7O0lBRXJFLHFDQUF3Qjs7SUFDeEIsNkNBQXNFOztJQUN0RSx1Q0FBa0I7Ozs7O0lBRWxCLHVDQUFpSTs7Ozs7SUFFakksb0NBQTRDOzs7OztJQUU1Qyx5Q0FBZ0U7Ozs7O0lBRWhFLHdDQUFrRjs7Ozs7SUFFbEYsd0NBQWtGOzs7OztJQUVsRix3Q0FBa0Y7O0lBQ2xGLHdDQUFrRjs7SUFDbEYsMENBQXNGOztJQUN0RiwwQ0FBc0Y7O0lBQ3RGLDZDQUE0Rjs7SUFDNUYsMkNBQXdGOztJQUN4RiwyQ0FBd0Y7O0lBQ3hGLHNDQUE4RTs7Ozs7SUFHOUUsMENBQTBkOzs7OztJQUcxZCwyQ0FBd1g7Ozs7O0lBR3hYLHFDQUEweEI7Ozs7O0lBRzF4Qix3Q0FBa1c7Ozs7O0lBRWxXLG9DQUEyRjs7Ozs7SUFFM0YseUNBQTREOzs7OztJQUU1RCx1Q0FBNEQ7Ozs7O0lBRTVELDBDQUFrQjs7Ozs7SUFFbEIsd0NBQW9COzs7OztJQUVwQix3Q0FBb0I7Ozs7O0lBRXBCLG1DQUFvQjs7Ozs7SUFFcEIscURBQStCOzs7OztJQUUvQixtREFBNkI7Ozs7O0lBRTdCLHNEQUFnQzs7Ozs7SUFFaEMsb0RBQThCOzs7OztJQUU5QixvREFBOEI7Ozs7O0lBRTlCLCtDQUF5Qjs7Ozs7SUFFekIscUNBQWU7Ozs7O0lBRWYsdUNBQWlCOzs7OztJQUVqQiwwQ0FBb0I7Ozs7O0lBRXBCLDhDQUF3Qjs7Ozs7SUFFeEIsMkNBQWtCOzs7OztJQUVsQiw0Q0FBOEI7Ozs7O0lBRTlCLDZDQUF1Qjs7Ozs7SUFFdkIsb0NBQVc7Ozs7O0lBRVgsbUNBQWE7Ozs7O0lBRWIscUNBQXFCOzs7OztJQUVyQixxQ0FBZTs7SUFDZix1Q0FBbUQ7O0lBQ25ELHdDQUF3Qzs7Ozs7SUExR3BDLHNDQUEwQjs7Ozs7SUFDMUIseUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ3JlYXRlZCBEYXRlOiBGcmlkYXksIEF1Z3VzdCAyMXN0IDIwMjAsIDEwOjMyOjE1IHBtXHJcbiAqIEF1dGhvcjog5pyo5oe144Gu54uX57q4XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBEZXNjcmlwdGlvbjog57yW6L6R5Zmo57uE5Lu2XHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMYXN0IE1vZGlmaWVkOiBTYXR1cmRheSBBdWd1c3QgMjJuZCAyMDIwIDExOjM3OjIzIGFtXHJcbiAqIE1vZGlmaWVkIEJ5OiDmnKjmh7Xjga7ni5fnurhcclxuICogQ29udGFjdDogMTAyOTUxMjk1NkBxcS5jb21cclxuICogQ29weXJpZ2h0IChjKSAyMDIwIFpYV09SS1xyXG4gKi9cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgT25Jbml0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFdpbmRvd09wdGlvbnMgfSBmcm9tICcuL19hbGVydC93aW5kb3cvd2luZG93JzsgICAvLyDnqpfkvZPlvLnnqpdcclxuaW1wb3J0IHsgVUlMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi91aS1saW5rL3VpLWxpbmsnOyAgICAgIC8vIOi2hemTvuaOpVVJ57uE5Lu2XHJcbmltcG9ydCB7IFVJVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3VpLXRhYmxlL3VpLXRhYmxlJzsgICAvLyDooajmoLxVSee7hOS7tlxyXG5pbXBvcnQgeyBVSUFubmV4Q29tcG9uZW50IH0gZnJvbSAnLi91aS1hbm5leC91aS1hbm5leCc7ICAgLy8g6ZmE5Lu2VUnnu4Tku7ZcclxuaW1wb3J0IHsgRG9tU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9Eb21TZXJ2aWNlJzsgICAgICAgIC8vIGRvbeaPkOS+m+WVhlxyXG5pbXBvcnQgQ29tbW9uVXRpbCBmcm9tICcuL3V0aWwvQ29tbW9uVXRpbCc7ICAgICAgICAgICAgICAgLy8gZG9t5bel5YW357G7XHJcbmltcG9ydCBDdXJzb3JVdGlsIGZyb20gJy4vdXRpbC9DdXJzb3JVdGlsJzsgICAgICAgICAgICAgICAvLyDlhYnmoIflt6XlhbfnsbtcclxuXHJcbi8qKiDnvJbovpHlmajphY3nva7lj4LmlbAgKi9cclxuaW50ZXJmYWNlIE9wdGlvbnMge1xyXG4gICAgLyoqIOe8lui+keWGheWuueeahOacgOWkp+Wtl+iKguaVsCAqL1xyXG4gICAgbWF4c2l6ZTogbnVtYmVyO1xyXG4gICAgLyoqIOS4iuS8oOi2heaXtiBtcyAqL1xyXG4gICAgdGltZW91dDogbnVtYmVyO1xyXG4gICAgLyoqIOS4iuS8oOWbvueJh+eahOmFjee9ruWPguaVsCAqL1xyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn5Zu+54mH5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgICAgICAvKiog5bCP5LqO5oyH5a6a5a2X6IqC5pWw5Lya6L+b6KGMYmFzZTY057yW56CBICovXHJcbiAgICAgICAgYmFzZTY0OiBudW1iZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqIOS4iuS8oOinhumikeeahOmFjee9ruWPguaVsCAqL1xyXG4gICAgdmlkZW86IHtcclxuICAgICAgICAvKiog5LiK5Lyg55qE5pyA5aSn6KeG6aKR5pWw6YePICovXHJcbiAgICAgICAgY291bnQ6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICAvKiog5LiK5Lyg6Z+z6aKR55qE6YWN572u5Y+C5pWwICovXHJcbiAgICBtdXNpYzoge1xyXG4gICAgICAgIC8qKiDkuIrkvKDnmoTmnIDlpKfpn7PpopHmlbDph48gKi9cclxuICAgICAgICBjb3VudDogbnVtYmVyO1xyXG4gICAgfTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC16ZWRpdG9yJyxcclxuICAgIHN0eWxlVXJsczogWycuL25nLXplZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZy16ZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW3tcclxuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBcHBaZWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV0sXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBaZWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG9wdGlvbnModjogYW55KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMkLCB2KTtcclxuICAgIH1cclxuICAgIC8qKiDnvJbovpHmnaEgKi9cclxuICAgIGdldCBoZWFkZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLyoqIOe8lui+keWZqCAqL1xyXG4gICAgZ2V0IGVkaXRvcigpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICAvKiog57yW6L6R6Z2i5p2/ICovXHJcbiAgICBnZXQgcGFubmVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYW5uZWxSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb290ZXIoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5mb290ZXJSZWYgfHwge25hdGl2ZUVsZW1lbnQ6IHtvZmZzZXRIZWlnaHQ6IDB9fSkubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb250TmFtZUVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb250TmFtZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGZvbnRTaXplRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvbnRTaXplUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgZm9ybWF0QmxvY2tFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0QmxvY2tSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldCBmb3JlQ29sb3JFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZUNvbG9yUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBnZXQgYmFja0NvbG9yRWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tDb2xvclJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvZGVFbCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29kZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyMjogUmVuZGVyZXIyLFxyXG4gICAgICAgIHByaXZhdGUgZG9tU2VydmljZTogRG9tU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcbiAgICAvKiog6buY6K6k5qC85byPICovXHJcbiAgICBzdGF0aWMgRk9STUFUID0ge1xyXG4gICAgICAgIGlzQm9sZDogZmFsc2UsXHJcbiAgICAgICAgaXNJdGFsaWM6IGZhbHNlLFxyXG4gICAgICAgIGlzVW5kZXJsaW5lOiBmYWxzZSxcclxuICAgICAgICBpc1N0cmlrZVRocm91Z2g6IGZhbHNlLFxyXG4gICAgICAgIHNjcmlwdEFjdGl2ZTogJycsXHJcbiAgICAgICAgZm9ybWF0QmxvY2s6ICdwJyxcclxuICAgICAgICBmb3JlQ29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBiYWNrQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBqdXN0aWZ5QWN0aXZlOiAnanVzdGlmeUxlZnQnLFxyXG4gICAgICAgIGZvbnRTaXplOiB7IGtleTogJ3NtYWxsJywgdmFsdWU6ICcyJywgdmFsdWUkOiAnJyB9LFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHsga2V5OiAn5b6u6L2v6ZuF6buRJywgdmFsdWU6ICdNaWNyb3NvZnQgWWFoZWknIH1cclxuICAgIH07XHJcbiAgICAvKiog5Lyg5YWl55qEaHRtbCAqL1xyXG4gICAgQElucHV0KCkgdmh0bWwgPSAnPHA+6K+36L6T5YWl5YaF5a65fjwvcD4nO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1vdXRwdXQtb24tcHJlZml4XHJcbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIC8qKiDmmK/lkKbmnInmjInpkq4gKi9cclxuICAgIEBJbnB1dCgpIGhhc0J0biA9IGZhbHNlO1xyXG4gICAgQE91dHB1dCgpIHJlY2lldmVDb250ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAvKiog5Y+C5pWw6YWN572uICovXHJcbiAgICBvcHRpb25zJDogYW55ID0geyBtYXhzaXplOiA2NTUzNSwgdGltZW91dDogMTAwMDAsIGltYWdlOiB7IGNvdW50OiA1LCBiYXNlNjQ6IDYwMDAwIH0sIGF1ZGlvOiB7IGNvdW50OiAxIH0sIHZpZGVvOiB7IGNvdW50OiAxIH0gfTtcclxuICAgIC8qKiDkuLvpopggKi9cclxuICAgIEBJbnB1dCgpIHRoZW1lOiAncicgfCAncCcgfCAnYicgfCAnZycgPSAnZyc7XHJcbiAgICAvKiog5LiK5Lyg5paH5Lu2ICovXHJcbiAgICBAT3V0cHV0KCkgdXBsb2FkRmlsZTogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e30+KCk7XHJcbiAgICAvKiog57yW6L6R5p2h6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBoZWFkZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiog57yW6L6R5Zmo5pW05L2T6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdlZGl0b3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBlZGl0b3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICAvKiogcGFubmVs6KeG5Zu+5byV55SoICovXHJcbiAgICBAVmlld0NoaWxkKCdwYW5uZWxSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBwYW5uZWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb290ZXJSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb290ZXJSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb250TmFtZVJlZicsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGZvbnROYW1lUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZm9udFNpemVSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb250U2l6ZVJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Zvcm1hdEJsb2NrUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZm9ybWF0QmxvY2tSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdmb3JlQ29sb3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBmb3JlQ29sb3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdiYWNrQ29sb3JSZWYnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBiYWNrQ29sb3JSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdjb2RlUmVmJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgY29kZVJlZjogRWxlbWVudFJlZjtcclxuICAgIC8qKiDlrZfkvZPmoLflvI8gKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBmb250RmFtaWx5cyA9IFt7IGtleTogJ2FyaWFsJywgdmFsdWU6ICdhcmlhbCcgfSwgeyBrZXk6ICflvq7ova/pm4Xpu5EnLCB2YWx1ZTogJ01pY3Jvc29mdCBZYWhlaScgfSwgeyBrZXk6ICflrovkvZMnLCB2YWx1ZTogJ1NpbVN1bicgfSwgeyBrZXk6ICfpu5HkvZMnLCB2YWx1ZTogJ1NpbUhlaScgfSwgeyBrZXk6ICfmpbfkvZMnLCB2YWx1ZTogJ0thaVRpJyB9LCB7IGtleTogJ+Wui+S9kycsIHZhbHVlOiAnU2ltU3VuJyB9LCB7IGtleTogJ+aWsOWui+S9kycsIHZhbHVlOiAnTlNpbVN1bicgfSwgeyBrZXk6ICfku7/lrosnLCB2YWx1ZTogJ0ZhbmdTb25nJyB9LCB7IGtleTogJ+W+rui9r+ato+m7keS9kycsIHZhbHVlOiAnTWljcm9zb2Z0IEpoZW5nSGVpJyB9LCB7IGtleTogJ+WNjuaWh+eQpeePgCcsIHZhbHVlOiAnU1RIdXBvJyB9LCB7IGtleTogJ+WNjuaWh+W9qeS6kScsIHZhbHVlOiAnU1RDYWl5dW4nIH0sIHsga2V5OiAn5bm85ZyGJywgdmFsdWU6ICdZb3VZdWFuJyB9LCB7IGtleTogJ+WNjuaWh+ihjOaltycsIHZhbHVlOiAnU1RYaW5na2FpJyB9XTtcclxuICAgIC8qKiDmlofmnKzmoLzlvI8gKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBmb3JtYXRCbG9ja3MgPSBbeyBrZXk6ICdwJywgdmFsdWU6ICc8cCBkYXRhLWluZGV4PVwiMFwiPnA8L3A+JyB9LCB7IGtleTogJ2g2JywgdmFsdWU6ICc8aDYgZGF0YS1pbmRleD1cIjFcIj5oNjwvaDY+JyB9LCB7IGtleTogJ2g1JywgdmFsdWU6ICc8aDUgZGF0YS1pbmRleD1cIjJcIj5oNTwvaDU+JyB9LCB7IGtleTogJ2g0JywgdmFsdWU6ICc8aDQgZGF0YS1pbmRleD1cIjNcIj5oNDwvaDQ+JyB9LCB7IGtleTogJ2gzJywgdmFsdWU6ICc8aDMgZGF0YS1pbmRleD1cIjRcIj5oMzwvaDM+JyB9LCB7IGtleTogJ2gyJywgdmFsdWU6ICc8aDIgZGF0YS1pbmRleD1cIjVcIj5oMjwvaDI+JyB9LCB7IGtleTogJ2gxJywgdmFsdWU6ICc8aDEgZGF0YS1pbmRleD1cIjZcIj5oMTwvaDE+JyB9XTtcclxuICAgIC8qKiDpopzoibIgKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb2xvcnMgPSBbWycjZmZmZmZmJywgJyMwMDAwMDAnLCAnI2VlZWNlMScsICcjMWY0OTdkJywgJyM0ZjgxYmQnLCAnI2MwNTA0ZCcsICcjOWJiYjU5JywgJyM4MDY0YTInLCAnIzRiYWNjNicsICcjZjc5NjQ2J10sIFsnI2YyZjJmMicsICcjN2Y3ZjdmJywgJyNkZGQ5YzMnLCAnI2M2ZDlmMCcsICcjZGJlNWYxJywgJyNmMmRjZGInLCAnI2ViZjFkZCcsICcjZTVlMGVjJywgJyNkYmVlZjMnLCAnI2ZkZWFkYSddLCBbJyNkOGQ4ZDgnLCAnIzU5NTk1OScsICcjYzRiZDk3JywgJyM4ZGIzZTInLCAnI2I4Y2NlNCcsICcjZTViOWI3JywgJyNkN2UzYmMnLCAnI2NjYzFkOScsICcjYjdkZGU4JywgJyNmYmQ1YjUnXSwgWycjYmZiZmJmJywgJyMzZjNmM2YnLCAnIzkzODk1MycsICcjNTQ4ZGQ0JywgJyM5NWIzZDcnLCAnI2Q5OTY5NCcsICcjYzNkNjliJywgJyNiMmEyYzcnLCAnIzkyY2RkYycsICcjZmFjMDhmJ10sIFsnI2E1YTVhNScsICcjMjYyNjI2JywgJyM0OTQ0MjknLCAnIzE3MzY1ZCcsICcjMzY2MDkyJywgJyM5NTM3MzQnLCAnIzc2OTIzYycsICcjNWY0OTdhJywgJyMzMTg1OWInLCAnI2UzNmMwOSddLCBbJyM3ZjdmN2YnLCAnIzBjMGMwYycsICcjMWQxYjEwJywgJyMwZjI0M2UnLCAnIzI0NDA2MScsICcjNjMyNDIzJywgJyM0ZjYxMjgnLCAnIzNmMzE1MScsICcjMjA1ODY3JywgJyM5NzQ4MDYnXSwgWycjYzAwMDAwJywgJyNmZjAwMDAnLCAnI2ZmYzAwMCcsICcjZmZmZjAwJywgJyM5MmQwNTAnLCAnIzAwYjA1MCcsICcjMDBiMGYwJywgJyMwMDcwYzAnLCAnIzAwMjA2MCcsICcjNzAzMGEwJ11dO1xyXG4gICAgLyoqIOWtl+S9k+Wkp+WwjyAqL1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgIGZvbnRTaXplcyA9IFt7IGtleTogJ3gtc21hbGwnLCB2YWx1ZTogJzEnLCB2YWx1ZSQ6IDEwIC8gMTYgfSwgeyBrZXk6ICdzbWFsbCcsIHZhbHVlOiAnMicsIHZhbHVlJDogMTIgLyAxNiB9LCB7IGtleTogJ21lZGl1bScsIHZhbHVlOiAnMycsIHZhbHVlJDogMTYgLyAxNiB9LCB7IGtleTogJ2xhcmdlJywgdmFsdWU6ICc0JywgdmFsdWUkOiAxOCAvIDE2IH0sIHsga2V5OiAneC1sYXJnZScsIHZhbHVlOiAnNScsIHZhbHVlJDogMjQgLyAxNiB9LCB7IGtleTogJ3h4LWxhcmdlJywgdmFsdWU6ICc2JywgdmFsdWUkOiAzMiAvIDE2IH0sIHsga2V5OiAneHh4LWxhcmdlJywgdmFsdWU6ICc3JywgdmFsdWUkOiA0OCAvIDE2IH1dO1xyXG4gICAgLyoqIGNvZGUgKi9cclxuICAgIGNvZGVzID0gWydIdG1sJywgJ0NzcycsICdKYXZhc2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnU2FzcycsICdKYXZhJywgJ1htbCcsICdTcWwnLCAnU2hlbGwnXTtcclxuICAgIC8qKiDpgInkuK3nmoTlrZfmoLcgKi9cclxuICAgIGZvbnRGYW1pbHk6IGFueSA9IHsga2V5OiAn5b6u6L2v6ZuF6buRJywgdmFsdWU6ICdNaWNyb3NvZnQgWWFoZWknIH07XHJcbiAgICAvKiog6YCJ5Lit55qE5a2X5Y+3ICovXHJcbiAgICBmb250U2l6ZTogYW55ID0geyBrZXk6ICdzbWFsbCcsIHZhbHVlOiAyLCB2YWx1ZSQ6IDEyIC8gMTYgfTsgLy8g6buY6K6kLjc1cmVtO1xyXG4gICAgLyoqIOaWh+acrOagvOW8jyAqL1xyXG4gICAgZm9ybWF0QmxvY2sgPSAncCc7XHJcbiAgICAvKiog5a2X5L2T6aKc6ImyICovXHJcbiAgICBmb3JlQ29sb3IgPSAnYmxhY2snO1xyXG4gICAgLyoqIOmrmOS6ruiJsiAqL1xyXG4gICAgYmFja0NvbG9yID0gJ3doaXRlJztcclxuICAgIC8qKiDlvZPliY3ku6PnoIHor63oqIAgKi9cclxuICAgIGNvZGUgPSAnSmF2YXNjcmlwdCc7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5a2X5qC36Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb250RmFtaWx5UGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5a2X5Y+36Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hGb250U2l6ZVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOaWh+acrOagvOW8j+mdouadvyAqL1xyXG4gICAgc3dpdGNoRm9ybWF0QmxvY2tQYW5uZWwgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmiZPlvIDlrZfkvZPpopzoibLpnaLmnb8gKi9cclxuICAgIHN3aXRjaEZvcmVDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuaJk+W8gOiDjOaZr+iJsumdouadvyAqL1xyXG4gICAgc3dpdGNoQmFja0NvbG9yUGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5omT5byA5Luj56CB6K+t6KiA6Z2i5p2/ICovXHJcbiAgICBzd2l0Y2hDb2RlUGFubmVsID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5Yqg57KXICovXHJcbiAgICBpc0JvbGQgPSBmYWxzZTtcclxuICAgIC8qKiDmmK/lkKbmlpzkvZMgKi9cclxuICAgIGlzSXRhbGljID0gZmFsc2U7XHJcbiAgICAvKiog5piv5ZCm5LiL5YiS57q/ICovXHJcbiAgICBpc1VuZGVybGluZSA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuWIoOmZpOe6vyAqL1xyXG4gICAgaXNTdHJpa2VUaHJvdWdoID0gZmFsc2U7XHJcbiAgICAvKiog6buY6K6k5peg5LiK5LiL5qCHICovXHJcbiAgICBzY3JpcHRBY3RpdmUgPSAnJztcclxuICAgIC8qKiDpu5jorqTlt6blr7npvZAgKi9cclxuICAgIGp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeUxlZnQnO1xyXG4gICAgLyoqIOaYr+WQpuWkhOS6jue8lui+keeKtuaAgeS4rSAqL1xyXG4gICAgaXNJbkVkaXRTdGF0dXMgPSBmYWxzZTtcclxuICAgIC8qKiDorrDkvY/nmoRyYW5nZSAqL1xyXG4gICAgcmFuZ2U6IGFueTtcclxuICAgIC8qKiDmmK/lkKblhajlsY8sIOm7mOiupGZhbHNlICovXHJcbiAgICBmdWxsID0gZmFsc2U7XHJcbiAgICAvKiog54i25YWD57SgICovXHJcbiAgICBwYXJlbnQhOiBIVE1MRWxlbWVudDtcclxuICAgIC8qKiDmmK/lkKblnKjku6PnoIHljLosIOm7mOiupGZhbHNlICovXHJcbiAgICBpbkNvZGUgPSBmYWxzZTtcclxuICAgIG9uQ2hhbmdlOiAoaHRtbDogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZodG1sID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRGb3JtYXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLnJlbmRlcjIucGFyZW50Tm9kZSh0aGlzLmVkaXRvcik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlum7mOiupOagvOW8j1xyXG4gICAgICovXHJcbiAgICBpbml0Rm9ybWF0RGF0YSgpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFUKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWmguaenOmdouadv+S4jeiBmueEpuWImeS9v+mdouadv+iBmueEplxyXG4gICAgICovXHJcbiAgICBwYW5uZWxGb2N1cygpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZfmoLdcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb250TmFtZShlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb250RmFtaWx5UGFubmVsID0gIXRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHlzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnROYW1lJywgZmFsc2UsIHRoaXMuZm9udEZhbWlseS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lrZflj7dcclxuICAgICAqL1xyXG4gICAgc2V0Rm9udFNpemUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBjb25zdCB0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoRm9udFNpemVQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb250U2l6ZVBhbm5lbDtcclxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMuZm9udFNpemVzW2luZGV4ICogMV07XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuY21kKCdmb250U2l6ZScsIGZhbHNlLCBmb250U2l6ZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKzmoLzlvI9cclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBzZXRGb3JtYXRCbG9jayhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JtYXRCbG9ja1Bhbm5lbCA9ICF0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGZvcm1hdEJsb2NrID0gdGhpcy5mb3JtYXRCbG9ja3NbaW5kZXggKiAxXTtcclxuICAgICAgICB0aGlzLmZvcm1hdEJsb2NrID0gZm9ybWF0QmxvY2sua2V5O1xyXG4gICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAnPCcgKyB0aGlzLmZvcm1hdEJsb2NrICsgJz4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWJjeaZr+iJslxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEZvcmVDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuZm9yZUNvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvcmVDb2xvcicsIGZhbHNlLCB0aGlzLmZvcmVDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7og4zmma/oibIo6auY5Lqu6ImyKVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEJhY2tDb2xvcihlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCB4ID0gdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGltMScpO1xyXG4gICAgICAgIGNvbnN0IHkgPSB0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaW0yJyk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWwgPSAhdGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWw7XHJcbiAgICAgICAgaWYgKHggPT09IG51bGwgfHwgeSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuYmFja0NvbG9yID0gdGhpcy5jb2xvcnNbeF1beV07XHJcbiAgICAgICAgdGhpcy5jbWQoJ2JhY2tDb2xvcicsIGZhbHNlLCB0aGlzLmJhY2tDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ku6PnoIHor63oqIBcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRDb2RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hDb2RlUGFubmVsID0gIXRoaXMuc3dpdGNoQ29kZVBhbm5lbDtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICB0aGlzLmNvZGUgPSB0aGlzLmNvZGVzW2luZGV4XTtcclxuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5jb2RlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgaWQgPSAoTWF0aC5yYW5kb20oKSArICcnKS5zbGljZSgyLCA4KTtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxwcmUgc3R5bGU9XCJ3aGl0ZS1zcGFjZTpwcmU7XCIgdGl0bGU9XCLku6PnoIHljLpcIj48Y29kZSBjbGFzcz1cIiR7Y29kZX1cIj48cCBpZD1cIiR7aWR9XCI+PGJyLz48L3A+PC9jb2RlPjwvcHJlPjxwPjxici8+PC9wPmA7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgLy8g5o+S5YWlaHRtbOWQju+8jOWwhuWFieagh+enu+iHs+S7o+eggeWMuueahHDmoIfnrb7kuK1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWFuZ2xlLWJyYWNrZXQtdHlwZS1hc3NlcnRpb25cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFNlbGVjdGlvblRvRWxlbWVudCg8YW55PihDb21tb25VdGlsLmlkKGlkKSksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTsgLy8g5omL5Yqo6K6w5b2V5LiA5LiL5YWJ5qCH5L2N572uXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooYzlhoXmjaLooYzvvIhzaGlmdCtlbnRlcu+8iVxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGluc2VydEJyT25SZXR1cm4oZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTdXBwb3J0KCdpbnNlcnRCck9uUmV0dXJuJykpIHtcclxuICAgICAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgJzxicj48YnI+Jyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEJyT25SZXR1cm4nLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nspfkvZNcclxuICAgICAqL1xyXG4gICAgc3dpdGNoQm9sZChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdib2xkJywgZmFsc2UsICcnKTtcclxuICAgICAgICB0aGlzLmlzQm9sZCA9ICF0aGlzLmlzQm9sZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWnOS9k1xyXG4gICAgICovXHJcbiAgICBzd2l0Y2hJdGFsaWMoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnaXRhbGljJywgZmFsc2UsICcnKTtcclxuICAgICAgICB0aGlzLmlzSXRhbGljID0gIXRoaXMuaXNJdGFsaWM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7kuIvliJLnur9cclxuICAgICAqL1xyXG4gICAgc3dpdGNoVW5kZXJsaW5lKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3VuZGVybGluZScsIGZhbHNlLCAnJyk7XHJcbiAgICAgICAgdGhpcy5pc1VuZGVybGluZSA9ICF0aGlzLmlzVW5kZXJsaW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Yig6Zmk57q/XHJcbiAgICAgKi9cclxuICAgIHN3aXRjaFN0cmlrZVRocm91Z2goZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnc3RyaWtlVGhyb3VnaCcsIGZhbHNlLCAnJyk7XHJcbiAgICAgICAgdGhpcy5pc1N0cmlrZVRocm91Z2ggPSAhdGhpcy5pc1N0cmlrZVRocm91Z2g7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva4v5Y+W5raI5LiKL+S4i+agh1xyXG4gICAgICovXHJcbiAgICBzZXRTY3JpcHQoZTogRXZlbnQsIGNtZDogJ3N1cGVyc2NyaXB0JyB8ICdzdWJzY3JpcHQnKSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICBpZiAodGhpcy5zY3JpcHRBY3RpdmUgPT09IGNtZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNtZChjbWQsIGZhbHNlLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyaXB0QWN0aXZlID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY3JpcHRBY3RpdmUgPSBjbWQ7XHJcbiAgICAgICAgdGhpcy5jbWQoY21kLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5paH5a2X5a+56b2Q5pa55ZCRXHJcbiAgICAgKiBAcGFyYW0gIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHNldEp1c3RpZnlhY3RpdmUoZTogRXZlbnQsIHN0cjogJ0xlZnQnIHwgJ1JpZ2h0JyB8ICdDZW50ZXInIHwgJ0Z1bGwnKSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeScgKyBzdHI7XHJcbiAgICAgICAgdGhpcy5jbWQodGhpcy5qdXN0aWZ5QWN0aXZlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnov5tcclxuICAgICAqL1xyXG4gICAgaW5kZW50KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luZGVudCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh4/lsJHnvKnov5tcclxuICAgICAqL1xyXG4gICAgb3V0ZGVudChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdvdXRkZW50JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeacieW6j+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBpbnNlcnRPcmRlcmVkTGlzdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRPcmRlcmVkTGlzdCcsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5LlhaXml6Dluo/liJfooahcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0VW5vcmRlcmVkTGlzdChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRVbm9yZGVyZWRMaXN0JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpeihqOagvOiwg+i1t+aPkuWFpeihqOagvFVJXHJcbiAgICAgKi9cclxuICAgIGluc2VydFRhYmxlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYWxlcnQoeyB0aXRsZTogJ+aPkuWFpeihqOagvCcsIGFuaW1hdGlvbjogJ3NjYWxlJywgY29udGVudDogVUlUYWJsZUNvbXBvbmVudCwgaGFuZGxlcjogdGhpcywgdGhlbWU6IHRoaXMudGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+ihqOagvFVJ5by556qX56Gu6K6k5pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVUYWJsZUhUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkuWFpei2hemTvuaOpeiwg+i1t+aPkuWFpei2hemTvuaOpVVJXHJcbiAgICAgKiBAcGFyYW0gZSDkuovku7ZcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0TGluayhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmFsZXJ0KHsgdGl0bGU6ICfmj5LlhaXpk77mjqUnLCBhbmltYXRpb246ICdzY2FsZScsIGNvbnRlbnQ6IFVJTGlua0NvbXBvbmVudCwgaGFuZGxlcjogdGhpcywgdGhlbWU6IHRoaXMudGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+i2hemTvuaOpVVJ5by556qX56Gu6K6k5pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVMaW5rSFRNTChodG1sOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RWRpdCgpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWl5Zu+54mH6LCD6LW35o+S5YWl5Zu+54mHVUlcclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBpbnNlcnRGaWxlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYWxlcnQoeyB0aXRsZTogJ+aPkuWFpeaWh+S7ticsIGFuaW1hdGlvbjogJ3NjYWxlJywgY29udGVudDogVUlBbm5leENvbXBvbmVudCwgaGFuZGxlcjogdGhpcywgdGhlbWU6IHRoaXMudGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+S4iuS8oOaWh+S7tlVJ5by556qX5LiK5Lyg5pys5Zyw5paH5Lu25pe25bWM5YWlYmFzZTY05pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVMb2NhbEZpbGVIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2luc2VydEhUTUwnLCBmYWxzZSwgaHRtbCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+S4iuS8oOaWh+S7tlVJ5by556qX4oCc5o+S5YWl5aSW6ZO+4oCd5pe25Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaHRtbCDmj5LlhaXnmoRodG1sXHJcbiAgICAgKi9cclxuICAgIHJlY2lldmVGaWxlTGlua0hUTUwoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEVkaXQoKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5bCE6YCJ5oup5paH5Lu25LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gIHR5cGUg5paH5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gIGZpbGUg5paH5Lu2XHJcbiAgICAgKiBAcGFyYW0gIHBhcnNlciDkvKDlhaVzcmPojrflj5ZodG1sXHJcbiAgICAgKiBAcGFyYW0gIGNsb3NlICDlhbPpl63lvLnnqpflkozpga7nvalcclxuICAgICAqL1xyXG4gICAgZW1pdFVwbG9hZEZpbGUodHlwZTogJ2ltYWdlJyB8ICdhdWRpbycgfCAndmlkZW8nLCBmaWxlOiBhbnksIHBhcnNlcjogKHY6IHN0cmluZykgPT4gc3RyaW5nLCBjbG9zZTogKGI6IGJvb2xlYW4sIHQ/OiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnVwbG9hZEZpbGUuZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGUsIGZpbGUsIGNhbGxiYWNrOiAoc3JjOiBzdHJpbmcgfCBib29sZWFuLCB0PzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2lldmVGaWxlTGlua0hUTUwocGFyc2VyKHNyYyBhcyBzdHJpbmcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsb3NlKCEhc3JjLCB0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+S5YWlaHJcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0SG9yaXpvbnRhbFJ1bGUoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnaW5zZXJ0SG9yaXpvbnRhbFJ1bGUnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57KY6LS0XHJcbiAgICAgKi9cclxuICAgIHBhc3RlKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ3Bhc3RlJywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWJquWIh1xyXG4gICAgICovXHJcbiAgICBjdXQoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnY3V0JywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkjeWItlxyXG4gICAgICovXHJcbiAgICBjb3B5KGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZW5zdXJlRm9jdXMoZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2NvcHknLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5Lit5omA5pyJXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdEFsbChlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCdzZWxlY3RBbGwnLCBmYWxzZSwgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5YGaXHJcbiAgICAgKi9cclxuICAgIHJlZG8oZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgncmVkbycsIGZhbHNlLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkqTplIBcclxuICAgICAqL1xyXG4gICAgdW5kbyhlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmVuc3VyZUZvY3VzKGUpO1xyXG4gICAgICAgIHRoaXMuY21kKCd1bmRvJywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOmAieS4rVxyXG4gICAgICovXHJcbiAgICBkZWxldGVTZWxlY3QoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLmNtZCgnZGVsZXRlJywgZmFsc2UsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWOhuWPsui+k+WFpVxyXG4gICAgICovXHJcbiAgICBoaXN0b3J5KGU6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1cyhlKTtcclxuICAgICAgICB0aGlzLnZodG1sID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlZGl0b3JfaW5wdXQnKSB8fCAnJztcclxuICAgICAgICB0aGlzLmF1dG9BY3RpdmUoKTtcclxuICAgICAgICB0aGlzLnNldFJhbmdlQW5kRW1pdFZhbHVlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5qC85byP77yM5LiN6Zi75q2i5aSx54Sm77yM6YeN5paw6IGa54Sm5pe25Lya6K6+572u5Y6G5Y+y5qC85byPXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUZvcm1hdCgpIHtcclxuICAgICAgICB0aGlzLmNtZCgncmVtb3ZlRm9ybWF0JywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvcm1hdERhdGEoKTtcclxuICAgICAgICB0aGlzLnNldERlZmF1bHRGb3JtYXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WQhOexu+S4i+aLieahhlxyXG4gICAgICogQHBhcmFtIGUg5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGhpZGVTd2l0Y2hQYW5uZWwoZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvbnRGYW1pbHlQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5mb250TmFtZUVsLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRm9udEZhbWlseVBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9udFNpemVFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvbnRTaXplUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoRm9yZUNvbG9yUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9yZUNvbG9yRWwsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hGb3JlQ29sb3JQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zd2l0Y2hCYWNrQ29sb3JQYW5uZWwgJiYgIUNvbW1vblV0aWwuY29udGFpbnModGhpcy5iYWNrQ29sb3JFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEJhY2tDb2xvclBhbm5lbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsICYmICFDb21tb25VdGlsLmNvbnRhaW5zKHRoaXMuZm9ybWF0QmxvY2tFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaEZvcm1hdEJsb2NrUGFubmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoQ29kZVBhbm5lbCAmJiAhQ29tbW9uVXRpbC5jb250YWlucyh0aGlzLmNvZGVFbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaENvZGVQYW5uZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxj+aIluWPlua2iOWFqOWxj1xyXG4gICAgICovXHJcbiAgICBTd2l0Y2hTY3JlZW4oKSB7XHJcbiAgICAgICAgY29uc3QgZWRpdG9yOiBhbnkgPSB0aGlzLmVkaXRvcjtcclxuICAgICAgICBjb25zdCBoZWFkZXI6IGFueSA9IHRoaXMuaGVhZGVyO1xyXG4gICAgICAgIGNvbnN0IHBhbm5lbDogYW55ID0gdGhpcy5wYW5uZWw7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyOiBhbnkgPSB0aGlzLmZvb3RlcjtcclxuICAgICAgICB0aGlzLmZ1bGwgPSAhdGhpcy5mdWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bGwpIHsgLy8g5YWo5bGPXHJcbiAgICAgICAgICAgIGVkaXRvci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6OTk5OTk7dG9wOjA7bGVmdDowO3RyYW5zZm9ybTpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7JztcclxuICAgICAgICAgICAgcGFubmVsLnN0eWxlLmNzc1RleHQgPSBgbWF4LWhlaWdodDp1bnNldDtoZWlnaHQ6JHt3aW5kb3cuaW5uZXJIZWlnaHQgLSBoZWFkZXIub2Zmc2V0SGVpZ2h0IC0gZm9vdGVyLm9mZnNldEhlaWdodH1weDtgO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVkaXRvcik7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgIC8vIOi/mOWOn1xyXG4gICAgICAgICAgICBlZGl0b3Iuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgICAgICBwYW5uZWwuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChlZGl0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOaMiemUruS6i+S7tiAo5aSE55CGdGFi57yp6L+bKVxyXG4gICAgICogQHBhcmFtIGUg5oyJ6ZSu5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGtleWRvd24oZTogRXZlbnQgfCBhbnkpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBlLmtleUNvZGUgfHwgZS53aGljaCB8fCBlLmNoYXJDb2RlO1xyXG4gICAgICAgIGlmIChrZXkgIT09IDkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmjInkuIt0YWLplK7vvIzlop7liqDnvKnov5sy5Liq56m65qC8XHJcbiAgICAgICAgY29uc3QgdGFiID0gbmV3IEFycmF5KDUpLmpvaW4oJyZuYnNwOycpO1xyXG4gICAgICAgIHRoaXMuY21kKCdpbnNlcnRIVE1MJywgZmFsc2UsIHRhYik7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOaMiemUruW8uei1t+S6i+S7tlxyXG4gICAgICogQHBhcmFtIGUg5oyJ6ZSu5by56LW35LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGtleXVwKGU6IEV2ZW50IHwgYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRSYW5nZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2VJbkNvZGUoKSkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXHJcbiAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZSB8fCBlLndoaWNoIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgLy8g55uR5ZCsaG9tZSxlbmTlkozkuIrkuIvlt6blj7PmjInplK7vvIzmiJblkI7pgIDplK7miJbliKDpmaTplK7miJZlbnRlcumUru+8jOiuvue9rua/gOa0u+aWh+Wtl+agvOW8j1xyXG4gICAgICAgIGlmICgoa2V5ID49IDM1ICYmIGtleSA8PSA0MCkgfHwga2V5ID09PSA4IHx8IGtleSA9PT0gNDYgfHwga2V5ID09PSAxMykge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9BY3RpdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+mdouadv1xyXG4gICAgICovXHJcbiAgICBwYW5uZWxPbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEVkaXQoKTtcclxuICAgICAgICB0aGlzLnNldFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5hdXRvQWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjnvJbovpHpnaLmnb/kuK3nspjotLTvvIjoi6XlnKjku6PnoIHljLrlhoXnspjotLTliJnmuIXpmaTmoLzlvI/vvIHvvIHvvIHvvIlcclxuICAgICAqL1xyXG4gICAgcGFubmVsT25QYXN0ZShlOiBhbnkpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5hdXRvQWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IDxhbnk+IENvbW1vblV0aWwuaXNJRSgpID8gd2luZG93IDogZTtcclxuICAgICAgICAgICAgaWYgKCFvYmouY2xpcGJvYXJkRGF0YSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IG9iai5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcclxuICAgICAgICAgICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIGRmLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcclxuICAgICAgICAgICAgQ3Vyc29yVXRpbC5pbnNlcnROb2RlKGRmKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2VBbmRFbWl0VmFsdWUoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXml7borrDkvY/lhYnlj5jkvY3nva4gJiYgaW5wdXTkuovku7blj5HlsIR2YWx1ZSAmJiDorrDkvY/ovpPlhaVcclxuICAgICAqL1xyXG4gICAgc2V0UmFuZ2VBbmRFbWl0VmFsdWUoYXJnMDogbnVtYmVyIHwgRXZlbnQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzAgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGFyZzAgPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgICAgICB0aGlzLmRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5uZXJIVE1MID0gdGhpcy5wYW5uZWwuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52aHRtbCA9PT0gaW5uZXJIVE1MKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAvLyDmnInlhoXlrrnml7bmiY3kv53lrZjliLDmnKzlnLBcclxuICAgICAgICAgICAgY29uc3QgbGVuID0gKHRoaXMucGFubmVsLmlubmVyVGV4dCB8fCB0aGlzLnBhbm5lbC50ZXh0Q29udGVudCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobGVuID4gMSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZGl0b3JfaW5wdXQnLCBpbm5lckhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIDEu5Y+R5bCEaW5uZXJIVE1MLGlucHV05LqL5Lu25o6l5pS2XHJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIC8vIDIu6Kem5Y+RbmdNb2RlbENoYW5nZeS6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGlubmVySFRNTCk7XHJcbiAgICAgICAgfSwgYXJnMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HlsITnvJbovpHlhoXlrrlcclxuICAgICAqL1xyXG4gICAgZW1pdENvbnRlbnQoKSB7XHJcbiAgICAgICAgbGV0IHNpemUgPSAwO1xyXG4gICAgICAgIGNvbnN0IGVkaXRQYW5uZWwgPSB0aGlzLnBhbm5lbCBhcyBhbnk7XHJcbiAgICAgICAgLy8g5qOA5rWL57yW6L6R5YaF5a655aSn5bCPXHJcbiAgICAgICAgbGV0IGlubmVySFRNTDogc3RyaW5nID0gZWRpdFBhbm5lbC5pbm5lckhUTUw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGlubmVySFRNTC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjID0gaW5uZXJIVE1MLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjID4gMCAmJiBjIDwgMjU1KSB7XHJcbiAgICAgICAgICAgICAgICBzaXplKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUgPiB0aGlzLm9wdGlvbnMkLm1heHNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdCgn57yW6L6R5YaF5a656LaF5Ye65aSn5bCPficpO1xyXG4gICAgICAgICAgICBpbm5lckhUTUwgPSBpbm5lckhUTUwuc3Vic3RyKDAsIHRoaXMub3B0aW9ucyQubWF4c2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGltYWdlID0gdGhpcy5nZXRVcmxzQnlUYWcodGhpcy5wYW5uZWwsICdpbWcnKTtcclxuICAgICAgICBjb25zdCBhdWRpbyA9IHRoaXMuZ2V0VXJsc0J5VGFnKHRoaXMucGFubmVsLCAnYXVkaW8nKTtcclxuICAgICAgICBjb25zdCB2aWRlbyA9IHRoaXMuZ2V0VXJsc0J5VGFnKHRoaXMucGFubmVsLCAndmlkZW8nKTtcclxuICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgIGlubmVySFRNTCxcclxuICAgICAgICAgICAgaW5uZXJURVhUOiBlZGl0UGFubmVsLmlubmVyVGV4dCB8fCBlZGl0UGFubmVsLnRleHRDb250ZW50LFxyXG4gICAgICAgICAgICB1cmxzOiB7IGltYWdlLCBhdWRpbywgdmlkZW8gfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWNpZXZlQ29udGVudC5lbWl0KG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7nvJbovpHpnaLmnb/kuIrmrKHlhYnmoIfkuLrlvZPliY3lhYnmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWNvdmVyUmFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhbm5lbCkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDnoa7kv53nvJbovpHpnaLmnb/lhYjmmK/ogZrnhKbnmoRcclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5wYW5uZWwuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHsgLy8g5a2Y5Zyo5LiK5qyh5YWJ5qCH77yM5YiZ6K6+572u5LiK5qyh5YWJ5qCHXHJcbiAgICAgICAgICAgIEN1cnNvclV0aWwuc2V0Rmlyc3RSYW5nZSh0aGlzLnJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDdXJzb3JVdGlsLnNldFNlbGVjdGlvblRvRWxlbWVudCh0aGlzLnBhbm5lbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogMS7ogZrnhKbpnaLmnb/lubbojrflj5bkuIrmrKHlhYnmoIfkvY3nva4s6K6+572u5b2T5YmN5Y6G5Y+y57yW6L6R5qC35byPXHJcbiAgICAgKiAyLueCueWHu+e8lui+keadoeeahOWRveS7pOaIluiAhee8lui+kemdouadv+WQju+8jOWwhuinhuS4uue8lui+keeKtuaAgVxyXG4gICAgICogQHBhcmFtICByZWNvdmVyPyDmmK/lkKbpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydEVkaXQocmVjb3ZlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvLyDmgaLlpI3kuIrmrKHlhYnmoIfvvIjngrnlh7vnvJbovpHpnaLmnb/kuI3pnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIzngrnlh7vnvJbovpHmnaHpnIDopoHmgaLlpI3kuIrmrKHlhYnmoIfvvIlcclxuICAgICAgICBpZiAocmVjb3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJSYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLvmraLpu5jorqTkuovku7bpmLLmraLlpLHnhKbvvIznoa7kv53nvJbovpHpnaLmnb/ogZrnhKbvvIzorr7nva7ljoblj7LlhYnmoIflkozmoLzlvI9cclxuICAgICAqIEBwYXJhbSBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuc3VyZUZvY3VzKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8g6Zi75q2i5aSx54SmXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIOe8lui+keWIneWni+WMllxyXG4gICAgICAgIHRoaXMuc3RhcnRFZGl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvJbovpHliJ3lp4vljJblkozorr7nva7ljoblj7LmoLzlvI9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RWRpdCgpIHtcclxuICAgICAgICAvLyDlnKjnvJbovpHnirbmgIHkuI3lho3mrKHov5vooYzliJ3lp4vljJZcclxuICAgICAgICBpZiAodGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOagh+iusOmdouadv+WkhOS6jue8lui+keeKtuaAgVxyXG4gICAgICAgIGlmICghdGhpcy5pc0luRWRpdFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5FZGl0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Zyo5Luj56CB5Yy65LiN6K6+572u6buY6K6k5qC85byPXHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aaC5p6c5YWJ5qCH5ZGo5Zu05pyJ5YaF5a655YiZ5LiN6K6+572u6buY6K6k5qC85byPXHJcbiAgICAgICAgY29uc3QgZWwgPSBDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOayoeacieWGheWuue+8jOWImeagvOW8j+WMlum7mOiupOagvOW8j1xyXG4gICAgICAgIGlmICghdGhpcy5wYW5uZWwuY2hpbGRyZW4gfHwgIXRoaXMucGFubmVsLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERlZmF1bHRGb3JtYXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdEZvcm1hdCgpIHtcclxuICAgICAgICB0aGlzLmNtZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgdGhpcy5mb3JtYXRCbG9jayk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnROYW1lJywgZmFsc2UsIHRoaXMuZm9udEZhbWlseS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5jbWQoJ2ZvbnRTaXplJywgZmFsc2UsIHRoaXMuZm9udFNpemUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5piv5ZCm5pSv5oyB5ZG95LukXHJcbiAgICAgKiBAcGFyYW0gY21kIOWRveS7pFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU3VwcG9ydChjbWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoY21kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFvOWuuWluc2VydEhUTUzlkb3ku6RcclxuICAgICAqIEBwYXJhbSBodG1sIGh0bWxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbnNlcnRIVE1MKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gPFJhbmdlPkN1cnNvclV0aWwuZ2V0UmFuZ2UoMCk7XHJcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuICAgICAgICBjb25zdCBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBsZXQgbmFtZSA9ICdkaXYnO1xyXG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxhPicpID4gLTEpIHsgbmFtZSA9ICdzcGFuJzsgfVxyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcclxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgIGRmLmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGRmKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJp+ihjOWwgeijheeahOe8lui+keWRveS7pFxyXG4gICAgICogQHBhcmFtIGsg5ZG95Luk5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gdWkg5omT5byAdWnlvLnnqpdcclxuICAgICAqIEBwYXJhbSB2IOiuvue9ruWRveS7pOWAvFxyXG4gICAgICogQHJldHVybnMgdHJ1ZS3orr7nva7miJDlip/vvIxmYWxzZS3orr7nva7lpLHotKVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbWQoazogc3RyaW5nLCB1aTogYm9vbGVhbiwgdj86IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnQoaykpIHtcclxuICAgICAgICAgICAgaWYgKCdpbnNlcnRIVE1MJyA9PT0gaykgeyByZXR1cm4gdGhpcy5pbnNlcnRIVE1MKHYpOyB9XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QoJ+ezu+e7n+S4jeaUr+aMgeivpeWRveS7pH4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoaywgdWksIHYgfHwgJycpO1xyXG4gICAgICAgIC8vIOaJp+ihjOWujOS7peS4i+WRveS7pOWQju+8jOmdnuS7o+eggeWMuuWGhemcgOimgeiHquWKqOajgOa1i+aWh+Wtl+agvOW8j++8iOagt+W8j++8iVxyXG4gICAgICAgIGNvbnN0IGJsYWNrTGlzdCA9ICdyZWRvLHVuZG8sZGVsZXRlLGluc2VydEhUTUwsaW5zZXJ0SG9yaXpvbnRhbFJ1bGUsaW5zZXJ0VW5vcmRlcmVkTGlzdCxpbnNlcnRPcmRlcmVkTGlzdCc7XHJcbiAgICAgICAgaWYgKHIgJiYgYmxhY2tMaXN0LmluZGV4T2YoaykgPiAtMSAmJiAhdGhpcy5pc1JhbmdlSW5Db2RlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvQWN0aXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW5wdXQsY2xpY2ssc2VsZWN0aW9uY2hhbmdl5LqL5Lu26K6w5b2V57yW6L6R6Z2i5p2/5YWJ5qCH5L2N572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UmFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZUluQ29kZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5Db2RlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluQ29kZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJhbmdlID0gQ3Vyc29yVXRpbC5nZXRSYW5nZSgwLCB0aGlzLnBhbm5lbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rliqjmo4DmtYvmloflrZfmoLzlvI/mv4DmtLvmoLflvI/vvIjliqDnspfvvIzmlpzkvZPvvIzkuIvliJLnur/vvIzliKDpmaTnur/vvIzkuIrmoIfvvIzkuIvmoIcuLi4uLi7vvIlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdXRvQWN0aXZlKCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYW5nbGUtYnJhY2tldC10eXBlLWFzc2VydGlvblxyXG4gICAgICAgIGxldCBwID0gPEhUTUxFbGVtZW50PihDdXJzb3JVdGlsLmdldFJhbmdlQ29tbW9uUGFyZW50KCkpO1xyXG4gICAgICAgIGlmICghcCkgeyByZXR1cm47IH1cclxuICAgICAgICAvLyDlpoLmnpzpgInlj5blr7nosaHnmoToioLngrnmmK/mlofmnKzoioLngrnvvIzliJnlsIZw5Y+Y5Li65YW254i26IqC54K5XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1hbmdsZS1icmFja2V0LXR5cGUtYXNzZXJ0aW9uXHJcbiAgICAgICAgaWYgKHAubm9kZU5hbWUgPT09ICcjdGV4dCcpIHsgcCA9IDxIVE1MRWxlbWVudD5wLnBhcmVudE5vZGU7IH1cclxuICAgICAgICBpZiAoIXApIHtyZXR1cm47IH1cclxuICAgICAgICAvLyDmrrXokL3moLzlvI9cclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY21kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCAncCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRCbG9jayA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULmZvcm1hdEJsb2NrO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0QmxvY2sgPSBlLm5vZGVOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXRCbG9jayQgPSB0aGlzLmZvcm1hdEJsb2Nrcy5maW5kKChmYjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmIua2V5LnRvVXBwZXJDYXNlKCkgPT09IGZvcm1hdEJsb2NrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdEJsb2NrJCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRCbG9jayA9IGZvcm1hdEJsb2NrJC5rZXk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWtl+agt1xyXG4gICAgICAgIHRoaXMuZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQocCwgKGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5ID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuZm9udEZhbWlseTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSBlLmdldEF0dHJpYnV0ZSgnZmFjZScpO1xyXG4gICAgICAgICAgICBpZiAoIWZvbnRGYW1pbHkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkkID0gdGhpcy5mb250RmFtaWx5cy5maW5kKChmZjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmYudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gZm9udEZhbWlseS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGZvbnRGYW1pbHkkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSBmb250RmFtaWx5JDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5a2X5Y+3XHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRTaXplID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuZm9udFNpemU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBmb250U2l6ZSA9IGUuZ2V0QXR0cmlidXRlKCdzaXplJyk7XHJcbiAgICAgICAgICAgIGlmICghZm9udFNpemUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplJCA9IHRoaXMuZm9udFNpemVzLmZpbmQoKGZzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcy52YWx1ZSA9PT0gZm9udFNpemU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZm9udFNpemUkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRTaXplID0gZm9udFNpemUkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDliY3mma/oibJcclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yZUNvbG9yID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuZm9yZUNvbG9yO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZm9yZUNvbG9yID0gQ29tbW9uVXRpbC5yZ2JUb0hleChlLmdldEF0dHJpYnV0ZSgnY29sb3InKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcmVDb2xvciQgPSBDb21tb25VdGlsLmZsYXQodGhpcy5jb2xvcnMpLmZpbmQoKGNyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjci50b0xvd2VyQ2FzZSgpID09PSBmb3JlQ29sb3IudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChmb3JlQ29sb3IkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVDb2xvciA9IGZvcmVDb2xvciQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOiDjOaZr+iJslxyXG4gICAgICAgIHRoaXMuZ3JhbmRDaGlsZFRvZ3JhbmRQYXJlbnQocCwgKGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ29sb3IgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5iYWNrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBiYWNrQ29sb3IgPSBDb21tb25VdGlsLnJnYlRvSGV4KGUuc3R5bGUuYmFja2dyb3VuZENvbG9yKTtcclxuICAgICAgICAgICAgY29uc3QgYmFja0NvbG9yJCA9IENvbW1vblV0aWwuZmxhdCh0aGlzLmNvbG9ycykuZmluZCgoY3I6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyLnRvTG93ZXJDYXNlKCkgPT09IGJhY2tDb2xvci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGJhY2tDb2xvciQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NvbG9yID0gYmFja0NvbG9yJDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5Yqg57KXXHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQm9sZCA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULmlzQm9sZDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVOYW1lID09PSAnU1RST05HJyB8fCBlLm5vZGVOYW1lID09PSAnQicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQm9sZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDmlpzkvZNcclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJdGFsaWMgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5pc0l0YWxpYztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVOYW1lID09PSAnRU0nIHx8IGUubm9kZU5hbWUgPT09ICdJJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGFsaWMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5LiL5YiS57q/XHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVW5kZXJsaW5lID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuaXNVbmRlcmxpbmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5ub2RlTmFtZSA9PT0gJ1UnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1VuZGVybGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDliKDpmaTnur9cclxuICAgICAgICB0aGlzLmdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHAsIChlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZSA9PT0gdGhpcy5wYW5uZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHJpa2VUaHJvdWdoID0gQXBwWmVkaXRvckNvbXBvbmVudC5GT1JNQVQuaXNTdHJpa2VUaHJvdWdoO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUubm9kZU5hbWUgPT09ICdTVFJJS0UnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1N0cmlrZVRocm91Z2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5LiK5qCH77yM5LiL5qCHXHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdEFjdGl2ZSA9IEFwcFplZGl0b3JDb21wb25lbnQuRk9STUFULnNjcmlwdEFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVOYW1lID09PSAnU1VQJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NyaXB0QWN0aXZlID0gJ3N1cGVyc2NyaXB0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5ub2RlTmFtZSA9PT0gJ1NVQicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmlwdEFjdGl2ZSA9ICdzdWJzY3JpcHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5a+56b2Q5pa55byPXHJcbiAgICAgICAgdGhpcy5ncmFuZENoaWxkVG9ncmFuZFBhcmVudChwLCAoZTogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUgPT09IHRoaXMucGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmp1c3RpZnlBY3RpdmUgPSBBcHBaZWRpdG9yQ29tcG9uZW50LkZPUk1BVC5qdXN0aWZ5QWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGV4dEFsaWduID0gZS5nZXRBdHRyaWJ1dGUoJ2FsaWduJykgfHwgZS5zdHlsZS50ZXh0QWxpZ247XHJcbiAgICAgICAgICAgIGlmICh0ZXh0QWxpZ24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5TGVmdCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4dEFsaWduID09PSAnY2VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5Q2VudGVyJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0QWxpZ24gPT09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmp1c3RpZnlBY3RpdmUgPSAnanVzdGlmeVJpZ2h0JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0QWxpZ24gPT09ICdqdXN0aWZ5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuanVzdGlmeUFjdGl2ZSA9ICdqdXN0aWZ5RnVsbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juacgOa3seWxguiKgueCueWIsOacgOWkluWxguiKgueCueaJp+ihjOWbnuiwg1xyXG4gICAgICogQHBhcmFtIHN0YXJ0IOacgOa3seWxguiKgueCuVxyXG4gICAgICogQHBhcmFtIGVuZCDmnIDlpJblsYLoioLngrlcclxuICAgICAqIEBwYXJhbSBmbiDlm57osIMg55u05Yiw5Zue6LCD6L+U5ZuedHJ1ZeaXtuaJjeS8mue7iOatouWbnuiwg+eahOaJp+ihjFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdyYW5kQ2hpbGRUb2dyYW5kUGFyZW50KHN0YXJ0OiBhbnksIGZuOiBhbnkpIHtcclxuICAgICAgICBsZXQgbyA9IHN0YXJ0O1xyXG4gICAgICAgIHdoaWxlICghIW8pIHtcclxuICAgICAgICAgICAgaWYgKGZuKG8pKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBvID0gby5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJvuebruagh+WFg+e0oOeahOeahOafkOS4quagh+etvueahHVybHPlkoxiYXNlNjTnmoR1cmxcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gdGFnIOagh+etvlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFVybHNCeVRhZyh0YXJnZXQ6IEhUTUxFbGVtZW50LCB0YWc6IHN0cmluZyk6IHsgdHlwZTogJ3VybCcgfCAnYmFzZTY0Jywgc3JjOiBzdHJpbmcgfVtdIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgY29uc3QgdGFncyA9IHRhcmdldC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YWdzLCBlbGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHt9IGFzIGFueTtcclxuICAgICAgICAgICAgY29uc3Qgc3JjID0gZWxlbS5zcmM7XHJcbiAgICAgICAgICAgIGlmIChzcmMuaW5kZXhPZignZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID0gJ3VybCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSAnYmFzZTY0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreiMg+WbtFJhbmdl5piv5ZCm5ZKM5Luj56CB5Yy65pyJ5Lqk6ZuGXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIC0g5pyJ5Lqk6ZuG77yMZmFsc2UgLSDml6DkuqTpm4ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1JhbmdlSW5Db2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMucGFubmVsRm9jdXMoKTtcclxuICAgICAgICBsZXQgcGFyZW50ID0gQ3Vyc29yVXRpbC5nZXRSYW5nZUNvbW1vblBhcmVudCgpIGFzIGFueTtcclxuICAgICAgICBpZiAoIXBhcmVudCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAvLyDlpoLmnpzmmK/mlofmnKzoioLngrnliJnmib7lhbbniLblhYPntKBcclxuICAgICAgICBpZiAocGFyZW50Lm5vZGVUeXBlID09PSAzKSB7IHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlOyB9XHJcbiAgICAgICAgcmV0dXJuICgoKSA9PiB7IC8vIOiiq+WMheWQq1xyXG4gICAgICAgICAgICBsZXQgcGFyZW50JCA9IHBhcmVudDtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1jb25kaXRpb25hbC1hc3NpZ25tZW50XHJcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQkID0gcGFyZW50JC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50JC50YWdOYW1lID09PSAnQ09ERScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQkID09PSB0aGlzLnBhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSkoKSB8fCAoKCkgPT4geyAvLyDljIXlkKtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnY29kZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZXMgJiYgbm9kZXMubGVuZ3RoO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0b2FzdOaPkOekulxyXG4gICAgICogQHBhcmFtICB0ZXh0PyB0b2FzdOaPkOekuiDpu5jorqTkuLrigJjorr7nva7ml6DmlYh+4oCZXHJcbiAgICAgKiBAcGFyYW0gIGR1cmF0aW9uPyDlgZznlZnml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b2FzdCh0ZXh0OiBzdHJpbmcgPSAn6K6+572u5peg5pWIficsIG9iaj86IHsgZHVyYXRpb246IG51bWJlciwgZW50ZXI6IG51bWJlciwgbGVhdmU6IG51bWJlciB9KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS50b3N0KHsgdGV4dCwgLi4ub2JqIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by556qXXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWxlcnQob2JqOiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tU2VydmljZS5hbGVydChvYmopO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYsuaKllxyXG4gICAgICogQHBhcmFtICBmIOWbnuiwg1xyXG4gICAgICogQHBhcmFtICB0PyDpmLLmipbml7blu7Yg6buY6K6kMzAwbXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWJvdW5jZShmOiAoKSA9PiB2b2lkLCB0OiBudW1iZXIgPSAzMDApIHtcclxuICAgICAgICBjb25zdCBvID0gdGhpcy5kZWJvdW5jZSBhcyBhbnk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KG8udGltZXIpO1xyXG4gICAgICAgIG8udGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgZigpO1xyXG4gICAgICAgIH0sIHQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==