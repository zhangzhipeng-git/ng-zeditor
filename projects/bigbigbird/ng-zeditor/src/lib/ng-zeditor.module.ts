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
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
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
})
export class NgZeditorModule { }
