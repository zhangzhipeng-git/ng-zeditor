import { ElementRef } from '@angular/core';
import { Radio } from '../_form/radio-group/radio-group';
import { DomService } from '../service/DomService';
export declare class UIAnnexComponent {
    private domService;
    /** 图片类型 */
    static IMAGEARR: string[];
    static AUDIOARR: string[];
    static VIDEOARR: string[];
    url: string;
    width: string;
    height: string;
    /** 获取类型对应的名称 */
    typeName: string;
    /** 重渲染input file */
    rebuild: boolean;
    radioGroup: Radio[];
    file: ElementRef;
    _type: 'image' | 'audio' | 'video';
    handler: any;
    parent: any;
    type: 'image' | 'audio' | 'video';
    constructor(domService: DomService);
    /**
     * 点击本地上传
     */
    selectFile(): void;
    /**
     * 选择文件
     */
    fileChange: () => void;
    /**
     * 插入外链
     */
    insertOutLink(): void;
    /**
     * 传入src并根据类型获取文件html
     */
    getFileHTML: (src: string) => string;
    /**
     * 获取插入图片的HTML
     * @param src url或base64
     */
    getImageHTML(src: string): string;
    /**
     * 获取插入音频的HTML
     * @param src url
     */
    getAudioHTML(src: string): string;
    /**
     * 获取插入视频的HTML
     */
    getVideoHTML(src: string): string;
}
