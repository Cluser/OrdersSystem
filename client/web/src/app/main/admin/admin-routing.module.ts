import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { AdminClientsComponent } from "./admin-clients/admin-clients.component";
import { AdminDistributorsComponent } from "./admin-distributors/admin-distributors.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminContactPersonsComponent } from "./admin-contact-persons/admin-contact-persons.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "projects", component: AdminProjectsComponent },
      { path: "clients", component: AdminClientsComponent },
      { path: "distributors", component: AdminDistributorsComponent },
      { path: "contact-persons", component: AdminContactPersonsComponent },
      { path: "users", component: AdminUsersComponent },
      { path: "categories", component: AdminCategoriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
