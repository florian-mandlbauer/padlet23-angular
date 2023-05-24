import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {User} from "./user";

interface Token {
  exp: number,
  user: {
    id: string,
    name: string,
    isAdmin: boolean
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api = 'http://padlet23.s1910456018.student.kwmhgb.at/api/auth';

  constructor(private http:HttpClient) { }

  login(email:string,password:string){
    return this.http.post(`${this.api}/login`,{
      email:email,
      password:password
    })
  }

  public setSessionStorage(token:string){
    console.log(jwtDecode(token));
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userId",decodedToken.user.id);
  }

  logout(){
    this.http.post(`${this.api}/logout`,{});
    if(confirm('Wollen Sie sich wirklich ausloggen?')) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      console.log("Logged out");
    }
  }

  public isLoggedIn(){
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if(expirationDate < new Date()){
        console.info("token expired");
        sessionStorage.removeItem("token");
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }

  getCurrentUser() : User {
    return this.decodeToken();
  }

  decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwtDecode(<string>sessionStorage.getItem("token")) as Token;
      //console.log(decodedToken);
      return new User(
        +decodedToken.user.id,
        decodedToken.user.name,
        decodedToken.user.isAdmin);
    }
    {
      return new User(0, '', false);
    }
  }
}
