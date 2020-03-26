import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progetto';
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-db1efc4d-8341-4f10-97b1-772b75753341.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }
  postObserver : Observable<Object>;
postData : Object;
addUnit(newUnit: HTMLInputElement,newRange:HTMLInputElement,newType:HTMLInputElement,newRarity:HTMLInputElement,newTarget:HTMLInputElement,newCount:HTMLInputElement,newTransport:HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement,newSpeed: HTMLInputElement,newDeploytime: HTMLInputElement): boolean {
    let newData: Unit = new Unit();
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    newData.Speed= newSpeed.value;
    newData.DeployTime=newDeploytime.value;
    newData.Range =newRange.value;
    newData.Target= newTarget.value;
    newData.Count=newCount.value;
    newData.Transport=newTransport.value;
    newData.Type=newType.value;
    newData.Rarity=newRarity.value;


    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-db1efc4d-8341-4f10-97b1-772b75753341.ws-eu01.gitpod.io/users', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }


}


