import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// For MDB Angular Free
import { CarouselModule, WavesModule } from "angular-bootstrap-md";
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppComponent } from './app.component';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { RechercheComponent } from './views/recherche/recherche.component';
import { RechercheSingleComponent } from './views/recherche/recherche-single/recherche-single.component';
import { Error404Component } from './views/error404/error404.component';
import { MedecinCabinetComponent } from './views/medecin-cabinet/medecin-cabinet.component';


//Component Formulaire
import { InscriptionComponent } from './views/formulaire/inscription/inscription.component';
import { InscripMedecinComponent } from './views/formulaire/inscrip-medecin/inscrip-medecin.component';
import { InscripClientComponent } from './views/formulaire/inscrip-client/inscrip-client.component';
import { InscripSecretaireComponent } from './views/formulaire/inscrip-secretaire/inscrip-secretaire.component';
import { NewMdpComponent } from './views/formulaire/new-mdp/new-mdp.component';
import { ConnexionComponent } from './views/formulaire/connexion-client/connexion.component';
import { ConnexionMedecinComponent } from './views/formulaire/connexion-medecin/connexion-medecin.component';
import { FormPriseRdvComponent } from './views/formulaire/form-prise-rdv/form-prise-rdv.component';



//Component CLient
import { UserProfilComponent } from './views/interface-client/user-profil/user-profil.component';
import { RdvComponent } from './views/interface-client/rdv-client/rdv/rdv.component';
import { RdvSingleComponent } from './views/interface-client/rdv-client/rdv-single/rdv-single.component';

//Component Medecin
import { MedecinProfilComponent } from './views/interface-medecin/medecin-profil/medecin-profil.component';
import { EspaceMedecinComponent } from './views/interface-medecin/espace-medecin/espace-medecin.component';
import { CabinetComponent } from './views/interface-medecin/cabinet/cabinet.component';
import { RdvMedecinComponent } from './views/interface-medecin/rdv-medecin/rdv-medecin.component';
import { RdvMedecinSingleComponent } from './views/interface-medecin/rdv-medecin-single/rdv-medecin-single.component';



//Services
import { apiMedecin } from './services/apiMedecin.service';
import { apiSpecialite } from './services/apiSpecialiter.service';
import { apiClient } from './services/apiClient.service';
import { apiRdv } from './services/apiRdv.service';
import { apiSecretaire } from './services/apiSecretaire.service';
import { authService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

//Routing
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
  { path: 'home', component: AcceuilComponent },
  { path: 'register', component: InscriptionComponent },
  { path: 'register/medecin', component: InscripMedecinComponent },
  { path: 'register/client', component: InscripClientComponent },
  { path: 'register/secretaire', component: InscripSecretaireComponent, canActivate: [AuthGuard] },
  { path: 'log-in/client', component: ConnexionComponent },
  { path: 'log-in/medecin', component: ConnexionMedecinComponent },
  { path: 'search', component: RechercheComponent },
  { path: 'userProfil', component: UserProfilComponent, canActivate: [AuthGuard] },
  { path: 'medecinProfil', component: MedecinProfilComponent, canActivate: [AuthGuard] },
  { path: 'espaceMedecin', component: EspaceMedecinComponent, canActivate: [AuthGuard] },
  { path: 'newPassword', component: NewMdpComponent, canActivate: [AuthGuard] },
  { path: 'rdv', component: RdvComponent, canActivate: [AuthGuard] },
  { path: 'rdv-medecin', component: RdvMedecinComponent, canActivate: [AuthGuard] },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard] },
  { path: 'medecin/:id', component: MedecinCabinetComponent },
  { path: 'prendreRdv/:idmedecin', component: FormPriseRdvComponent },


  { path: '', component: AcceuilComponent },
  { path: '**', component: Error404Component }
];


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    InscriptionComponent,
    ConnexionComponent,
    RechercheComponent,
    InscripMedecinComponent,
    InscripClientComponent,
    Error404Component,
    ConnexionMedecinComponent,
    UserProfilComponent,
    MedecinProfilComponent,
    EspaceMedecinComponent,
    InscripSecretaireComponent,
    RdvComponent,
    CabinetComponent,
    RdvSingleComponent,
    RechercheSingleComponent,
    NewMdpComponent,
    RdvMedecinComponent,
    RdvMedecinSingleComponent,
    MedecinCabinetComponent,
    FormPriseRdvComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    FormsModule,
    CarouselModule,
    WavesModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    apiMedecin,
    apiSpecialite,
    apiClient,
    apiRdv,
    apiSecretaire,
    authService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
