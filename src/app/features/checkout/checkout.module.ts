import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CheckoutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [CheckoutComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class CheckoutModule {}
