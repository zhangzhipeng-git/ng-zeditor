import { ComponentFactoryResolver, Injector } from '@angular/core';
import { TipComponent, Options } from '../_alert/tip/tip';
import { WindowOptions } from '../_alert/window/window';
export declare class DomService {
    private injector;
    private componentResolverFactory;
    /** tost实例 */
    private toastInstance;
    constructor(injector: Injector, componentResolverFactory: ComponentFactoryResolver);
    tost(options?: Options): TipComponent;
    alert(options?: WindowOptions): void;
}
