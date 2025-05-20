import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material opcional
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Componentes propios
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PagoComponent } from './pages/pago/pago.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { FutbolComponent } from './pages/futbol/futbol.component';
import { PersonalizacionComponent } from './pages/personalizacion/personalizacion.component';
import { FutbolistasHistoricosComponent } from './pages/futbolistas-historicos/futbolistas-historicos.component';
import { FutbolistaDetalleComponent } from './pages/futbolista-detalle/futbolista-detalle.component';
import { VideosComponent } from './pages/videos/videos.component';
import { DetalleVideoComponent } from './pages/detalle-video/detalle-video.component';
import { CalendarioEventosComponent } from './pages/calendario-eventos/calendario-eventos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


// Servicios
import { FutbolistasService } from './services/futbolistas.service';
import { VideosService } from './services/videos.service';
import { EventosService } from './services/eventos.service';
import { GelatoService } from './services/gelato.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TiendaComponent,
    DetalleProductoComponent,
    CarritoComponent,
    ContactoComponent,
    PagoComponent,
    RegistroComponent,
    LoginComponent,
    FutbolComponent,
    PersonalizacionComponent,
    FutbolistasHistoricosComponent,
    FutbolistaDetalleComponent,
    VideosComponent,
    DetalleVideoComponent,
    CalendarioEventosComponent,
    PerfilComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [FutbolistasService, VideosService, EventosService,GelatoService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
