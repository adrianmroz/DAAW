import { Router, RouterModule } from '@angular/router';

import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AuthComponent } from './auth/auth.component';

export const routing = RouterModule.forRoot([
    { path: '', component: BookmarksComponent },
    { path: 'auth', component: AuthComponent }
]);