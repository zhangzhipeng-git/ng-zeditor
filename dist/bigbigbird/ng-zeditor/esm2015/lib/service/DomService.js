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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2JpZ2JpZ2JpcmQvbmctemVkaXRvci9zcmMvbGliL3NlcnZpY2UvRG9tU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSxPQUFPLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsWUFBWSxFQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBaUIsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2hDLE1BQU0sT0FBTyxVQUFVOzs7OztJQUtuQixZQUNZLFFBQWtCLEVBQ2xCLHdCQUFrRDtRQURsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDMUQsQ0FBQzs7Ozs7SUFFTCxJQUFJLENBQUMsT0FBaUI7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7O2tCQUNmLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDOztrQkFDN0UsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLE9BQXVCOztjQUNuQixPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQzs7O2NBRWhGLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQzs7Y0FDbkcsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztjQUN2QyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVE7UUFDdEMsUUFBUSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUE5QkosVUFBVTs7OztZQUxvQyxRQUFRO1lBQWxDLHdCQUF3Qjs7Ozs7Ozs7SUFTekMsbUNBQW9DOzs7OztJQUdoQyw4QkFBMEI7Ozs7O0lBQzFCLDhDQUEwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENyZWF0ZWQgRGF0ZTogRnJpZGF5LCBBdWd1c3QgMjFzdCAyMDIwLCAxMDozMjoxNSBwbVxyXG4gKiBBdXRob3I6IOacqOaHteOBrueLl+e6uFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRGVzY3JpcHRpb246IGRvbeaPkOS+m+WVhlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTGFzdCBNb2RpZmllZDogU2F0dXJkYXkgQXVndXN0IDIybmQgMjAyMCAxMTozNDoxMiBhbVxyXG4gKiBNb2RpZmllZCBCeTog5pyo5oe144Gu54uX57q4XHJcbiAqIENvbnRhY3Q6IDEwMjk1MTI5NTZAcXEuY29tXHJcbiAqIENvcHlyaWdodCAoYykgMjAyMCBaWFdPUktcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yLCBSZWZsZWN0aXZlSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGlwQ29tcG9uZW50LCBPcHRpb25zIH0gZnJvbSAnLi4vX2FsZXJ0L3RpcC90aXAnO1xyXG5pbXBvcnQgeyBXaW5kb3dDb21wb25lbnQsIFdpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9fYWxlcnQvd2luZG93L3dpbmRvdyc7XHJcbmltcG9ydCB7IFRZUEUgfSBmcm9tICcuL3Rva2Vucyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEb21TZXJ2aWNlIHtcclxuXHJcbiAgICAvKiogdG9zdOWunuS+iyAqL1xyXG4gICAgcHJpdmF0ZSB0b2FzdEluc3RhbmNlOiBUaXBDb21wb25lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRSZXNvbHZlckZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG4gICAgKSB7IH1cclxuXHJcbiAgICB0b3N0KG9wdGlvbnM/OiBPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvYXN0SW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50UmVzb2x2ZXJGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFRpcENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RJbnN0YW5jZS5jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudG9hc3RJbnN0YW5jZS5vcGVuKG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0SW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgYWxlcnQob3B0aW9ucz86IFdpbmRvd09wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRSZXNvbHZlckZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoV2luZG93Q29tcG9uZW50KTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXHJcbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSBSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbe3Byb3ZpZGU6IFRZUEUsIHVzZVZhbHVlOiB0eXBlb2Ygb3B0aW9ucy5jb250ZW50fV0pO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGluamVjdG9yKTtcclxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgICBpbnN0YW5jZS5jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XHJcbiAgICAgICAgaW5zdGFuY2Uub3BlbihvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19