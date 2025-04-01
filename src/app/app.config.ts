import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient ,HttpClient } from '@angular/common/http';

import { provideTranslateService  } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideTranslateService({ defaultLanguage: 'en' }) // تعيين اللغة الافتراضية

    
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../public/assets/i18n/', '.json');
}