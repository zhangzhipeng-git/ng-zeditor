/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { TipComponent } from '../_alert/tip/tip';
import { WindowComponent } from '../_alert/window/window';
import { TYPE } from './tokens';
export class DomService {
    /**
     * @param {?} injector
     * @param {?} componentResolverFactory
     */
    constructor(injector, componentResolverFactory) {
        this.injector = injector;
        this.componentResolverFactory = componentResolverFactory;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    tost(options) {
        if (!this.toastInstance) {
            /** @type {?} */
            const factory = this.componentResolverFactory.resolveComponentFactory(TipComponent);
            /** @type {?} */
            const componentRef = factory.create(this.injector);
            this.toastInstance = componentRef.instance;
            this.toastInstance.componentRef = componentRef;
        }
        this.toastInstance.open(options);
        return this.toastInstance;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    alert(options) {
        /** @type {?} */
        const factory = this.componentResolverFactory.resolveComponentFactory(WindowComponent);
        // tslint:disable-next-line: deprecation
        /** @type {?} */
        const injector = ReflectiveInjector.resolveAndCreate([{ provide: TYPE, useValue: typeof options.content }]);
        /** @type {?} */
        const componentRef = factory.create(injector);
        /** @type {?} */
        const instance = componentRef.instance;
        instance.componentRef = componentRef;
        instance.open(options);
    }
}
DomService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomService.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver }
];
if (false) {
    /**
     * tost实例
     * @type {?}
     * @private
     */
    DomService.prototype.toastInstance;
    /**
     * @type {?}
     * @private
     */
    DomService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    DomService.prototype.componentResolverFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL0BiaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9zZXJ2aWNlL0RvbVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLFlBQVksRUFBVyxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQWlCLE1BQU0seUJBQXlCLENBQUM7QUFDekUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdoQyxNQUFNLE9BQU8sVUFBVTs7Ozs7SUFLbkIsWUFDWSxRQUFrQixFQUNsQix3QkFBa0Q7UUFEbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQzFELENBQUM7Ozs7O0lBRUwsSUFBSSxDQUFDLE9BQWlCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFOztrQkFDZixPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQzs7a0JBQzdFLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxPQUF1Qjs7Y0FDbkIsT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7OztjQUVoRixRQUFRLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7O2NBQ25HLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7Y0FDdkMsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRO1FBQ3RDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7O1lBOUJKLFVBQVU7Ozs7WUFMb0MsUUFBUTtZQUFsQyx3QkFBd0I7Ozs7Ozs7O0lBU3pDLG1DQUFvQzs7Ozs7SUFHaEMsOEJBQTBCOzs7OztJQUMxQiw4Q0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDcmVhdGVkIERhdGU6IEZyaWRheSwgQXVndXN0IDIxc3QgMjAyMCwgMTA6MzI6MTUgcG1cclxuICogQXV0aG9yOiDmnKjmh7Xjga7ni5fnurhcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIERlc2NyaXB0aW9uOiBkb23mj5DkvpvllYZcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExhc3QgTW9kaWZpZWQ6IFNhdHVyZGF5IEF1Z3VzdCAyMm5kIDIwMjAgMTE6MzQ6MTIgYW1cclxuICogTW9kaWZpZWQgQnk6IOacqOaHteOBrueLl+e6uFxyXG4gKiBDb250YWN0OiAxMDI5NTEyOTU2QHFxLmNvbVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgWlhXT1JLXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciwgUmVmbGVjdGl2ZUluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpcENvbXBvbmVudCwgT3B0aW9ucyB9IGZyb20gJy4uL19hbGVydC90aXAvdGlwJztcclxuaW1wb3J0IHsgV2luZG93Q29tcG9uZW50LCBXaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vX2FsZXJ0L3dpbmRvdy93aW5kb3cnO1xyXG5pbXBvcnQgeyBUWVBFIH0gZnJvbSAnLi90b2tlbnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRG9tU2VydmljZSB7XHJcblxyXG4gICAgLyoqIHRvc3Tlrp7kvosgKi9cclxuICAgIHByaXZhdGUgdG9hc3RJbnN0YW5jZTogVGlwQ29tcG9uZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50UmVzb2x2ZXJGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuICAgICkgeyB9XHJcblxyXG4gICAgdG9zdChvcHRpb25zPzogT3B0aW9ucykge1xyXG4gICAgICAgIGlmICghdGhpcy50b2FzdEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudFJlc29sdmVyRmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUaXBDb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcclxuICAgICAgICAgICAgdGhpcy50b2FzdEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0SW5zdGFuY2UuY29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRvYXN0SW5zdGFuY2Uub3BlbihvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2FzdEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFsZXJ0KG9wdGlvbnM/OiBXaW5kb3dPcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50UmVzb2x2ZXJGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFdpbmRvd0NvbXBvbmVudCk7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxyXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW3twcm92aWRlOiBUWVBFLCB1c2VWYWx1ZTogdHlwZW9mIG9wdGlvbnMuY29udGVudH1dKTtcclxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShpbmplY3Rvcik7XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xyXG4gICAgICAgIGluc3RhbmNlLm9wZW4ob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==