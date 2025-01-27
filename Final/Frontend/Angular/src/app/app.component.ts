//Imports
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

//These are sevices we use to connect to stuff
import { FirebaseService } from './services/firebase.service';
import { ApiService } from './services/api.service'; 

//
import { RestApiService } from "./shared/rest-api.service";



//Component defintion
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

//Basiclly the main() of the compnent 
export class AppComponent  {

  //Variable declerations
  title = 'helius';
  isSignedIn = false;

  public currentUid = "";
  hide = true;

  
  //For reading firestore data
  Users: Observable<any[]>;

  //Initializes firebase and all its services
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    firestore : AngularFirestore,
    public restApi: RestApiService
     ) {
    
      //Firestore reading logic
      this.Users = firestore.collection('Users').valueChanges();

    }
    
  ngOnInit(){

    //Checking if user is signed in
    if(localStorage.getItem('user')!== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false

  }

  //Handles signup functionality
  //TODO
  /*
  async onSignup(email: string, password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  */

  //Handles signin functionality
  async onSignin(email: string, password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true

  }

  //Logout functionality
  handleLogout(){
    this.isSignedIn = false
  }

}
