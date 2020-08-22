/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './util/safeHtml.pipe';
import { DomService } from './service/DomService';
import { TipComponent } from './_alert/tip/tip';
import { WindowComponent } from './_alert/window/window';
import { UILinkComponent } from './ui-link/ui-link';
import { UITableComponent } from './ui-table/ui-table';
import { UIAnnexComponent } from './ui-annex/ui-annex';
import { CheckBoxComponent } from './_form/checkbox/checkbox';
import { RadioGroupComponent } from './_form/radio-group/radio-group';
import { AppZeditorComponent } from './ng-zeditor.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export class NgZeditorModule {
}
NgZeditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    AppZeditorComponent,
                    TipComponent,
                    WindowComponent,
                    UILinkComponent,
                    UITableComponent,
                    UIAnnexComponent,
                    CheckBoxComponent,
                    RadioGroupComponent,
                    SafeHtmlPipe
                ],
                providers: [
                    DomService
                ],
                entryComponents: [
                    TipComponent,
                    WindowComponent,
                    UILinkComponent,
                    UITableComponent,
                    UIAnnexComponent
                ],
                exports: [
                    AppZeditorComponent,
                    FormsModule,
                    CommonModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9AYmlnYmlnYmlyZC9uZy16ZWRpdG9yL3NyYy9saWIvbmctemVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBa0MvQyxNQUFNLE9BQU8sZUFBZTs7O1lBaEMzQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLFlBQVk7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLFVBQVU7aUJBQ2I7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLFlBQVk7aUJBQ2Y7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbFBpcGUgfSBmcm9tICcuL3V0aWwvc2FmZUh0bWwucGlwZSc7XG5pbXBvcnQgeyBEb21TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL0RvbVNlcnZpY2UnO1xuaW1wb3J0IHsgVGlwQ29tcG9uZW50IH0gZnJvbSAnLi9fYWxlcnQvdGlwL3RpcCc7XG5pbXBvcnQgeyBXaW5kb3dDb21wb25lbnQgfSBmcm9tICcuL19hbGVydC93aW5kb3cvd2luZG93JztcbmltcG9ydCB7IFVJTGlua0NvbXBvbmVudCB9IGZyb20gJy4vdWktbGluay91aS1saW5rJztcbmltcG9ydCB7IFVJVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3VpLXRhYmxlL3VpLXRhYmxlJztcbmltcG9ydCB7IFVJQW5uZXhDb21wb25lbnQgfSBmcm9tICcuL3VpLWFubmV4L3VpLWFubmV4JztcbmltcG9ydCB7IENoZWNrQm94Q29tcG9uZW50IH0gZnJvbSAnLi9fZm9ybS9jaGVja2JveC9jaGVja2JveCc7XG5pbXBvcnQgeyBSYWRpb0dyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9fZm9ybS9yYWRpby1ncm91cC9yYWRpby1ncm91cCc7XG5pbXBvcnQgeyBBcHBaZWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy16ZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBaZWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBUaXBDb21wb25lbnQsXG4gICAgICAgIFdpbmRvd0NvbXBvbmVudCxcbiAgICAgICAgVUlMaW5rQ29tcG9uZW50LFxuICAgICAgICBVSVRhYmxlQ29tcG9uZW50LFxuICAgICAgICBVSUFubmV4Q29tcG9uZW50LFxuICAgICAgICBDaGVja0JveENvbXBvbmVudCxcbiAgICAgICAgUmFkaW9Hcm91cENvbXBvbmVudCxcbiAgICAgICAgU2FmZUh0bWxQaXBlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRG9tU2VydmljZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFRpcENvbXBvbmVudCxcbiAgICAgICAgV2luZG93Q29tcG9uZW50LFxuICAgICAgICBVSUxpbmtDb21wb25lbnQsXG4gICAgICAgIFVJVGFibGVDb21wb25lbnQsXG4gICAgICAgIFVJQW5uZXhDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQXBwWmVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdaZWRpdG9yTW9kdWxlIHsgfVxuIl19