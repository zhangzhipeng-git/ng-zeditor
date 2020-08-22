import { DomService } from '../service/DomService';
export declare class UITableComponent {
    private domService;
    /** 行数 */
    row: string;
    /** 列数 */
    col: string;
    handler: any;
    parent: any;
    constructor(domService: DomService);
    emitTableHTML(): void;
}
