import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Hero } from '../models/hero.modle';
import { Router } from '@angular/router';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  private heroesService: HeroesService;
  heroes : Hero[] = [];

  constructor(
    heroesService: HeroesService,
    private router: Router,
    private ref: ChangeDetectorRef,

  ) { 
    this.heroesService = heroesService;
  }


  ngOnInit(): void {
    this.heroesService.getAll().subscribe((heros: Hero[]) => {
      this.heroes = heros;
      this.ref.detectChanges()
    });
  }
  // real name, hero name, publisher, first appearance date, list of abilities / powers and list of team affiliations
  goToDetails(hero: Hero): void {
    this.router.navigate(['/hero', hero.id]);
  }

  createHero(): void {
    this.router.navigate(['/hero', '_new_']);
  }

  deleteHero(hero: Hero): void {
    this.heroesService.delete(hero.id).subscribe(() => {
      this.heroes = this.heroes.filter(h => h.id !== hero.id);
      console.log(this.heroes);
      this.ref.detectChanges();
    });
  }
}
