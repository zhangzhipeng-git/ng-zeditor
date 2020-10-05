import { OnInit, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomService } from './service/DomService';
export declare class AppZeditorComponent implements ControlValueAccessor, OnInit {
    private render2;
    private domService;
    options: any;
    /** 编辑条 */
    readonly header: HTMLElement;
    /** 编辑器 */
    readonly editor: HTMLElement;
    /** 编辑面板 */
    readonly pannel: HTMLElement;
    readonly footer: HTMLElement;
    readonly fontNameEl: HTMLElement;
    readonly fontSizeEl: HTMLElement;
    readonly formatBlockEl: HTMLElement;
    readonly foreColorEl: HTMLElement;
    readonly backColorEl: HTMLElement;
    readonly codeEl: HTMLElement;
    constructor(render2: Renderer2, domService: DomService);
    /** 默认格式 */
    static FORMAT: {
        isBold: boolean;
        isItalic: boolean;
        isUnderline: boolean;
        isStrikeThrough: boolean;
        scriptActive: string;
        formatBlock: string;
        foreColor: string;
        backColor: string;
        justifyActive: string;
        fontSize: {
            key: string;
            value: string;
            value$: string;
        };
        fontFamily: {
            key: string;
            value: string;
        };
    };
    /** 传入的html */
    vhtml: string;
    onInput: EventEmitter<string>;
    /** 是否有按钮 */
    hasBtn: boolean;
    recieveContent: EventEmitter<any>;
    disabled: boolean;
    /** 参数配置 */
    options$: any;
    /** 主题 */
    theme: 'r' | 'p' | 'b' | 'g';
    /** 上传文件 */
    uploadFile: EventEmitter<{}>;
    /** 编辑条视图引用 */
    headerRef: ElementRef;
    /** 编辑器整体视图引用 */
    editorRef: ElementRef;
    /** pannel视图引用 */
    pannelRef: ElementRef;
    footerRef: ElementRef;
    fontNameRef: ElementRef;
    fontSizeRef: ElementRef;
    formatBlockRef: ElementRef;
    foreColorRef: ElementRef;
    backColorRef: ElementRef;
    codeRef: ElementRef;
    /** 字体样式 */
    fontFamilys: {
        key: string;
        value: string;
    }[];
    /** 文本格式 */
    formatBlocks: {
        key: string;
        value: string;
    }[];
    /** 颜色 */
    colors: string[][];
    /** 字体大小 */
    fontSizes: {
        key: string;
        value: string;
        value$: number;
    }[];
    /** code */
    codes: string[];
    /** 选中的字样 */
    fontFamily: any;
    /** 选中的字号 */
    fontSize: any;
    /** 文本格式 */
    formatBlock: string;
    /** 字体颜色 */
    foreColor: string;
    /** 高亮色 */
    backColor: string;
    /** 当前代码语言 */
    code: string;
    /** 是否打开字样面板 */
    switchFontFamilyPannel: boolean;
    /** 是否打开字号面板 */
    switchFontSizePannel: boolean;
    /** 是否打开文本格式面板 */
    switchFormatBlockPannel: boolean;
    /** 是否打开字体颜色面板 */
    switchForeColorPannel: boolean;
    /** 是否打开背景色面板 */
    switchBackColorPannel: boolean;
    /** 是否打开代码语言面板 */
    switchCodePannel: boolean;
    /** 是否加粗 */
    isBold: boolean;
    /** 是否斜体 */
    isItalic: boolean;
    /** 是否下划线 */
    isUnderline: boolean;
    /** 是否删除线 */
    isStrikeThrough: boolean;
    /** 默认无上下标 */
    scriptActive: string;
    /** 默认左对齐 */
    justifyActive: string;
    /** 是否处于编辑状态中 */
    isInEditStatus: boolean;
    /** 记住的range */
    range: any;
    /** 是否全屏, 默认false */
    full: boolean;
    /** 父元素 */
    parent: HTMLElement;
    /** 是否在代码区, 默认false */
    inCode: boolean;
    onChange: (html: string) => void;
    onTouched: () => void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    ngOnInit(): void;
    /**
     * 初始化默认格式
     */
    initFormatData(): void;
    /**
     * 如果面板不聚焦则使面板聚焦
     */
    pannelFocus(): void;
    /**
     * 设置字样
     * @param e 事件
     */
    setFontName(e: any): void;
    /**
     * 设置字号
     */
    setFontSize(e: any): void;
    /**
     * 设置文本格式
     * @param e 事件
     */
    setFormatBlock(e: any): void;
    /**
     * 设置前景色
     * @param e 事件
     */
    setForeColor(e: any): void;
    /**
     * 设置背景色(高亮色)
     * @param e 事件
     */
    setBackColor(e: any): void;
    /**
     * 设置代码语言
     * @param e 事件
     */
    insertCode(e: any): void;
    /**
     * 行内换行（shift+enter）
     * @param e 事件
     */
    insertBrOnReturn(e: any): void;
    /**
     * 设置粗体
     */
    switchBold(e: any): void;
    /**
     * 设置斜体
     */
    switchItalic(e: any): void;
    /**
     * 设置下划线
     */
    switchUnderline(e: any): void;
    /**
     * 设置删除线
     */
    switchStrikeThrough(e: any): void;
    /**
     * 设置/取消上/下标
     */
    setScript(e: Event, cmd: 'superscript' | 'subscript'): void;
    /**
     * 设置文字对齐方向
     * @param  e 事件
     */
    setJustifyactive(e: Event, str: 'Left' | 'Right' | 'Center' | 'Full'): void;
    /**
     * 缩进
     */
    indent(e: any): void;
    /**
     * 减少缩进
     */
    outdent(e: any): void;
    /**
     * 插入有序列表
     */
    insertOrderedList(e: any): void;
    /**
     * 插入无序列表
     */
    insertUnorderedList(e: any): void;
    /**
     * 插入表格调起插入表格UI
     */
    insertTable(e: any): void;
    /**
     * 点击表格UI弹窗确认时回调
     * @param html 插入的html
     */
    recieveTableHTML(html: string): boolean;
    /**
     * 插入超链接调起插入超链接UI
     * @param e 事件
     */
    insertLink(e: any): void;
    /**
     * 点击超链接UI弹窗确认时回调
     * @param html 插入的html
     */
    recieveLinkHTML(html: string): boolean;
    /**
     * 插入图片调起插入图片UI
     * @param e 事件
     */
    insertFile(e: any): void;
    /**
     * 点击上传文件UI弹窗上传本地文件时嵌入base64时回调
     * @param html 插入的html
     */
    recieveLocalFileHTML(html: string): boolean;
    /**
     * 点击上传文件UI弹窗“插入外链”时回调
     * @param html 插入的html
     */
    recieveFileLinkHTML(html: string): boolean;
    /**
     * 发射选择文件事件
     * @param  type 文件类型
     * @param  file 文件
     * @param  parser 传入src获取html
     * @param  close  关闭弹窗和遮罩
     */
    emitUploadFile(type: 'image' | 'audio' | 'video', file: any, parser: (v: string) => string, close: (b: boolean, t?: number) => void): void;
    /**
     * 插入hr
     */
    insertHorizontalRule(e: any): void;
    /**
     * 粘贴
     */
    paste(e: any): void;
    /**
     * 剪切
     */
    cut(e: any): void;
    /**
     * 复制
     */
    copy(e: any): void;
    /**
     * 选中所有
     */
    selectAll(e: any): void;
    /**
     * 重做
     */
    redo(e: any): void;
    /**
     * 撤销
     */
    undo(e: any): void;
    /**
     * 删除选中
     */
    deleteSelect(e: any): void;
    /**
     * 获取历史输入
     */
    history(): void;
    /**
     * 清除格式，不阻止失焦，重新聚焦时会设置历史格式
     */
    removeFormat(): void;
    /**
     * 隐藏各类下拉框
     * @param e 事件
     */
    hideSwitchPannel(e: any): void;
    /**
     * 全屏或取消全屏
     */
    SwitchScreen(): void;
    /**
     * 监听按键事件 (处理tab缩进)
     * @param e 按键事件
     */
    keydown(e: Event | any): void;
    /**
     * 监听按键弹起事件
     * @param e 按键弹起事件
     */
    keyup(e: Event | any): void;
    /**
     * 点击面板
     */
    pannelOnClick(): void;
    /**
     * 在编辑面板中粘贴（若在代码区内粘贴则清除格式！！！）
     */
    pannelOnPaste(e: any): void;
    /**
     * 输入时记住光变位置 && input事件发射value && 记住输入
     */
    setRangeAndEmitValue(arg0: number | Event): void;
    /**
     * 发射编辑内容
     */
    emitContent(): void;
    /**
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     */
    private recoverRange;
    /**
     * 1.聚焦面板并获取上次光标位置,设置当前历史编辑样式
     * 2.点击编辑条的命令或者编辑面板后，将视为编辑状态
     * @param  recover? 是否需要恢复上次光标
     */
    private startEdit;
    /**
     * 阻止默认事件防止失焦，确保编辑面板聚焦，设置历史光标和格式
     * @param e 事件对象
     */
    private ensureFocus;
    /**
     * 编辑初始化和设置历史格式
     */
    private initEdit;
    /**
     * 查询是否支持命令
     * @param cmd 命令
     */
    private isSupport;
    /**
     * 兼容insertHTML命令
     * @param html html
     */
    private insertHTML;
    /**
     * 执行封装的编辑命令
     * @param k 命令名称
     * @param ui 打开ui弹窗
     * @param v 设置命令值
     * @returns true-设置成功，false-设置失败
     */
    private cmd;
    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     */
    private setRange;
    /**
     * 自动检测文字格式激活样式（加粗，斜体，下划线，删除线，上标，下标......）
     */
    private autoActive;
    /**
     * 从最深层节点到最外层节点执行回调
     * @param start 最深层节点
     * @param end 最外层节点
     * @param fn 回调 直到回调返回true时才会终止回调的执行
     */
    private grandChildTograndParent;
    /**
     * 找目标元素的的某个标签的urls和base64的url
     * @param target 元素
     * @param tag 标签
     */
    private getUrlsByTag;
    /**
     * 判断范围Range是否和代码区有交集
     * @returns true - 有交集，false - 无交集
     */
    private isRangeInCode;
    /**
     * toast提示
     * @param  text? toast提示 默认为‘设置无效~’
     * @param  duration? 停留时间
     */
    private toast;
    /**
     * 弹窗
     */
    private alert;
    /**
     * 防抖
     * @param  f 回调
     * @param  t? 防抖时延 默认300ms
     */
    private debounce;
}
