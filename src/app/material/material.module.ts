import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

const UsedMaterialModules = [MatToolbarModule, MatButtonModule, MatListModule];

@NgModule({
  imports: [UsedMaterialModules],
  exports: [UsedMaterialModules]
})
export class MaterialModule {}
