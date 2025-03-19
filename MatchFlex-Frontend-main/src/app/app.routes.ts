import { Routes } from '@angular/router';
import {SmartBandListComponent} from './features/components/smart-band-list/smart-band-list.component';
import {HomeComponent} from './features/components/home/home.component';
import {AboutPageComponent} from './features/components/about-page/about-page.component';
import {ContactComponent} from './features/components/contact/contact.component';
import {ProfilComponent} from './features/components/profil/profil.component';
import {DetailsGroupsComponent} from './features/components/details-groups/details-groups.component';
import {AllGroupsComponent} from './features/components/all-groups/all-groups.component';
import {ColorBandChoiceComponent} from './features/components/order/color-band-choice/color-band-choice.component';
import {UserInfoComponent} from './features/components/order/user-info/user-info.component';
import {PaymentComponent} from './features/components/order/payment/payment.component';
import {ConfirmationComponent} from './features/components/order/confirmation/confirmation.component';
import {TrackOrderComponent} from './features/components/track-order/track-order.component';
import {DashboardComponent} from './features/components/Admin/dashboard/dashboard.component';
import {TablesComponent} from './features/components/Admin/braceltTables/tables.component';
import {UserComponent} from './features/components/Admin/user/user.component';
import {ProfileComponent} from './features/components/Admin/profile/profile.component';
import {MatchComponent} from './features/components/Admin/match/match.component';
import {PackagesComponent} from './features/components/Admin/packages/packages.component';
import {LoginComponent} from './features/components/Auth/login/login.component';
import {RegisterComponent} from './features/components/Auth/register/register.component';
import { MyMatchesComponent } from './features/components/my-matches/my-matches.component';

export const routes: Routes = [
  /* Page*/
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'smart-bands', component: SmartBandListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'details-groups/:groupName', component: DetailsGroupsComponent },
  { path: 'all-groups', component: AllGroupsComponent },

  /* Validation Steps */
  { path: 'color-band-choice/:groupName', component: ColorBandChoiceComponent },
  { path: "user-info", component: UserInfoComponent },
  { path: "payment", component: PaymentComponent},
  { path: "confirmation", component: ConfirmationComponent},
  { path: "track-order/:id", component: TrackOrderComponent},

  /* Dashboard */
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-tables', component: TablesComponent },
  { path: 'dashboard-user', component: UserComponent },
  { path: 'dashboard-profil', component: ProfileComponent },
  { path: 'dashboard-matchs', component: MatchComponent },
  { path: 'dashboard-package', component: PackagesComponent },
  { path: 'my-matches', component: MyMatchesComponent },

  /* Auth */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
