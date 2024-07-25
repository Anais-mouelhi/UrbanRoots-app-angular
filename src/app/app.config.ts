import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCvv7OzZIy1Q3VTasTKsgWoautPnBxzN5Q",
  authDomain: "urbanroots-app.firebaseapp.com",
  databaseURL: "https://urbanroots-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urbanroots-app",
  storageBucket: "urbanroots-app.appspot.com",
  messagingSenderId: "616342446887",
  appId: "1:616342446887:web:9d8f4750825be391653f02"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
};
