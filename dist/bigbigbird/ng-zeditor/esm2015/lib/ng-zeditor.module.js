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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctemVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9iaWdiaWdiaXJkL25nLXplZGl0b3Ivc3JjL2xpYi9uZy16ZWRpdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFrQy9DLE1BQU0sT0FBTyxlQUFlOzs7WUFoQzNCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDVixtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLG1CQUFtQjtvQkFDbkIsWUFBWTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsVUFBVTtpQkFDYjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsWUFBWTtvQkFDWixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixnQkFBZ0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLFdBQVc7b0JBQ1gsWUFBWTtpQkFDZjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sUGlwZSB9IGZyb20gJy4vdXRpbC9zYWZlSHRtbC5waXBlJztcbmltcG9ydCB7IERvbVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvRG9tU2VydmljZSc7XG5pbXBvcnQgeyBUaXBDb21wb25lbnQgfSBmcm9tICcuL19hbGVydC90aXAvdGlwJztcbmltcG9ydCB7IFdpbmRvd0NvbXBvbmVudCB9IGZyb20gJy4vX2FsZXJ0L3dpbmRvdy93aW5kb3cnO1xuaW1wb3J0IHsgVUlMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi91aS1saW5rL3VpLWxpbmsnO1xuaW1wb3J0IHsgVUlUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdWktdGFibGUvdWktdGFibGUnO1xuaW1wb3J0IHsgVUlBbm5leENvbXBvbmVudCB9IGZyb20gJy4vdWktYW5uZXgvdWktYW5uZXgnO1xuaW1wb3J0IHsgQ2hlY2tCb3hDb21wb25lbnQgfSBmcm9tICcuL19mb3JtL2NoZWNrYm94L2NoZWNrYm94JztcbmltcG9ydCB7IFJhZGlvR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL19mb3JtL3JhZGlvLWdyb3VwL3JhZGlvLWdyb3VwJztcbmltcG9ydCB7IEFwcFplZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL25nLXplZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcFplZGl0b3JDb21wb25lbnQsXG4gICAgICAgIFRpcENvbXBvbmVudCxcbiAgICAgICAgV2luZG93Q29tcG9uZW50LFxuICAgICAgICBVSUxpbmtDb21wb25lbnQsXG4gICAgICAgIFVJVGFibGVDb21wb25lbnQsXG4gICAgICAgIFVJQW5uZXhDb21wb25lbnQsXG4gICAgICAgIENoZWNrQm94Q29tcG9uZW50LFxuICAgICAgICBSYWRpb0dyb3VwQ29tcG9uZW50LFxuICAgICAgICBTYWZlSHRtbFBpcGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEb21TZXJ2aWNlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgVGlwQ29tcG9uZW50LFxuICAgICAgICBXaW5kb3dDb21wb25lbnQsXG4gICAgICAgIFVJTGlua0NvbXBvbmVudCxcbiAgICAgICAgVUlUYWJsZUNvbXBvbmVudCxcbiAgICAgICAgVUlBbm5leENvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBBcHBaZWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1plZGl0b3JNb2R1bGUgeyB9XG4iXX0=