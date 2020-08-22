/*
 * Created Date: Friday, August 21st 2020, 10:32:15 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: dom提供商
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 11:34:12 am
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import { Injectable, ComponentFactoryResolver, Injector, ReflectiveInjector } from '@angular/core';
import { TipComponent, Options } from '../_alert/tip/tip';
import { WindowComponent, WindowOptions } from '../_alert/window/window';
import { TYPE } from './tokens';

@Injectable()
export class DomService {

    /** tost实例 */
    private toastInstance: TipComponent;

    constructor(
        private injector: Injector,
        private componentResolverFactory: ComponentFactoryResolver
    ) { }

    tost(options?: Options) {
        if (!this.toastInstance) {
            const factory = this.componentResolverFactory.resolveComponentFactory(TipComponent);
            const componentRef = factory.create(this.injector);
            this.toastInstance = componentRef.instance;
            this.toastInstance.componentRef = componentRef;
        }
        this.toastInstance.open(options);
        return this.toastInstance;
    }

    alert(options?: WindowOptions) {
        const factory = this.componentResolverFactory.resolveComponentFactory(WindowComponent);
        // tslint:disable-next-line: deprecation
        const injector = ReflectiveInjector.resolveAndCreate([{provide: TYPE, useValue: typeof options.content}]);
        const componentRef = factory.create(injector);
        const instance = componentRef.instance;
        instance.componentRef = componentRef;
        instance.open(options);
    }

}
