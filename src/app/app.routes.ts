import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { JsonUploadComponent } from './json-upload/json-upload.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'home', pathMatch: 'full', component: HomeComponent},
    {path: 'quiz', pathMatch: 'full', component: QuizComponent},
    {path: 'create-quiz', pathMatch: 'full', component: CreateQuizComponent},
    {path: 'profile', pathMatch: 'full', component: ProfileComponent},
    {path: 'json-upload', pathMatch: 'full', component: JsonUploadComponent}, // to load json data into localstorage only.
    {path: '**', component: ErrorComponent}
];
