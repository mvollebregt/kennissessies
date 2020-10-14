import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getCurrentUser(): Observable<{ email: string }> {
    return of({email: 'mvollebregt@ilionx.com'});
  }
}
