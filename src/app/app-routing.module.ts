import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFormComponent } from './shared/components/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    component: PostDashboardComponent,
  },
  {
    path: 'posts',
    component: PostDashboardComponent,
  },
  {
    path: 'posts/add',
    component: PostFormComponent,
  },
  {
    path: 'posts/:postId/edit',
    component: PostFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
