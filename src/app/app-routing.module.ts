
/*
 * @Author: your name
 * @Date: 2021-12-21 10:50:14
 * @LastEditTime: 2021-12-22 14:48:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \manage-ui\src\app\app-routing.module.ts
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdatedataComponent } from './components/home/updatedata/updatedata.component';
import { UserComponent } from './components/home/user/user.component';
import { TranslateComponent } from './components/home/translate/translate.component';
import { AuthGuard } from './shared/AuthGuard/authGuardA'

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'home/user', component: UserComponent },
  { path: 'home/updatedata', component: UpdatedataComponent },
  { path: 'home/translate', component: TranslateComponent },
  { path: '', component: HomeComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
