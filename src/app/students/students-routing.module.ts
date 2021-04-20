import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: 'students',
    // component: StudentListComponent,
    children: [
      { path: '', component: StudentListComponent },

      {
        path: 'addStudent',
        component: StudentAddComponent,
      },

      {
        path: ':id',
        // component: StudentDetailComponent,
        children: [
          { path: '', component: StudentDetailComponent },
          {
            path: 'edit',
            component: StudentEditComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
