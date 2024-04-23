import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.modle';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl = environment.apiKey;
  constructor(
    private httpClient: HttpClient
  ) { }



  getAll() {
    console.log(this.baseUrl);
    return this.httpClient.get<Hero[]>(this.baseUrl + '/api/heroes');
  }

  get(id: number) {
    return this.httpClient.get<Hero>(this.baseUrl + `/api/hero/${id}`);
  }

  create(hero: Hero) {
    return this.httpClient.post<Hero>(`${this.baseUrl}/api/hero`, hero);
  }

  update(hero: Hero, id: number) {
    return this.httpClient.put<Hero>(this.baseUrl +  `/api/hero/${id}`, {
     payload: hero
    });
  }

  delete(id: number) {
    return this.httpClient.delete<Hero>(this.baseUrl + `/api/hero/${id}`);
  }

  search(term: string) {
    return this.httpClient.get<Hero[]>(`api/heroes/?name=${term}`);
  }


}
