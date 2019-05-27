import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// For MDB Angular Free
import { CarouselModule, WavesModule } from "angular-bootstrap-md";

//Component
import { AppComponent } from './app.component';
import { AcceuilComponent } from './views/acceuil/acceuil.component';
import { InscriptionComponent } from './views/formulaire/inscription/inscription.component';
import { ConnexionComponent } from './views/formulaire/connexion/connexion.component';
import { RechercheComponent } from './views/recherche/recherche.component';
import { MaquetteComponent } from './views/maquette/maquette.component';
import { InscripMedecinComponent } from './views/formulaire/inscrip-medecin/inscrip-medecin.component';
import { InscripClientComponent } from './views/formulaire/inscrip-client/inscrip-client.component';
import { Error404Component } from './views/error404/error404.component';



//Services
import { apiMedecin } from './services/apiMedecin.service';
import { apiSpecialite } from './services/apiSpecialiter.service';
import { apiClient } from './services/apiClient.service';
import { apiRdv} from './services/apiRdv.service';
import { apiSecretaire } from './services/apiSecretaire.service';


//Routing
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [ 
  { path: 'home', component: AcceuilComponent},
  { path: 'register', component: InscriptionComponent},
  { path: 'register/medecin', component: InscripMedecinComponent},
  { path: 'register/client', component: InscripClientComponent},
  { path: 'log-in', component: ConnexionComponent},
  { path: 'search', component: RechercheComponent },
  { path: '', component: AcceuilComponent },
  { path: '**', component: Error404Component}
];


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    InscriptionComponent,
    ConnexionComponent,
    RechercheComponent,
    MaquetteComponent,
    InscripMedecinComponent,
    InscripClientComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    FormsModule,
    CarouselModule,
    WavesModule,
    HttpClientModule
    
  ],
  providers: [
    apiMedecin,
    apiSpecialite,
    apiClient,
    apiRdv,
    apiSecretaire
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
