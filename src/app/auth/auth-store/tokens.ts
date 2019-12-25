import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const AuthToken = new InjectionToken<Observable<string>>('Provides auth token');