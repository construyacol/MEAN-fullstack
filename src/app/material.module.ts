import { NgModule } from "@angular/core";
import {
	MatButtonModule,
	MatCheckboxModule,
	MatGridListModule,
	MatRadioModule,
	MatProgressSpinnerModule,
	MatMenuModule,
	MatSnackBarModule
} from "@angular/material";

import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

const modules = [MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule, MatRadioModule, MatGridListModule, MatIconModule, MatListModule, MatInputModule, NoopAnimationsModule, MatCardModule, MatButtonModule, MatCheckboxModule];

@NgModule({
	imports: modules,
	exports: modules
})

export class MaterialModule { }
