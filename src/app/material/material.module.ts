import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

const UsedMaterialModules = [MatToolbarModule, MatButtonModule];

@NgModule({
  imports: [UsedMaterialModules],
  exports: [UsedMaterialModules]
})
export class MaterialModule {}
