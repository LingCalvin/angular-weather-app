import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SettingsComponent } from './settings/settings.component';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LocationSearchComponent } from './location-search/location-search.component';
import { MatInputModule } from '@angular/material/input';
import { AboutComponent } from './about/about.component';
import { SecondaryToolbarComponent } from './secondary-toolbar/secondary-toolbar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { MatCardModule } from '@angular/material/card';
import { TemperaturePipe } from './temperature.pipe';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { WeatherTileComponent } from './weather-tile/weather-tile.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpeedPipe } from './speed.pipe';
import { PressurePipe } from './pressure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ToolbarComponent,
    SettingsComponent,
    LocationSearchComponent,
    AboutComponent,
    SecondaryToolbarComponent,
    CurrentWeatherComponent,
    TemperaturePipe,
    HourlyForecastComponent,
    WeatherTileComponent,
    DailyForecastComponent,
    SpeedPipe,
    PressurePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
