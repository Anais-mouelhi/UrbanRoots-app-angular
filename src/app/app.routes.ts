import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LogicComponent } from './pages/login/login.component';
import { WelcomeScreenComponent } from './pages/welcome-screen/welcome-screen.component';
import { JoinUsComponent } from './pages/join-us/join-us.component';
import { HomeComponent } from './pages/home/home.component';
import { Profile } from './pages/profile/profile.component';
import { ForumComponent } from '../app/pages/forum/forum.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { ReplyPageComponent } from '../app/pages/reply/reply.component';
import {QuizComponent} from '../app/pages/quiz/quiz.component';
import {InteractiveGuideComponent } from '../app/pages/interactive-guide/interactive-guide.component'

export const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: Profile },
  { path: 'forum', component: ForumComponent },
  
  { path: 'reply/:id', component: ReplyPageComponent }, 

 
  { path: 'map', component: LeafletMapComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogicComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'guide-interactif', component: InteractiveGuideComponent },
];
