// hero-details.component.ts

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../models/hero.modle';
import { HeroesService } from '../heroes/heroes.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  // hero: Hero;
  heroForm: FormGroup;  
  heroId: any;
  hero!: Hero;
  // router: Router;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private heroService: HeroesService,
    private router: Router
  ) 
  { 
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      heroName: ['', Validators.required],
      publisher: ['', Validators.required],
      firstAppearanceDate: ['', Validators.required],
      abilities: this.fb.array([
        this.fb.control('')
      ]), 
      teamAffiliations: this.fb.array([
        this.fb.control('')
      ]),
      powers: this.fb.array([
        this.fb.control('')
      ]),
    });
  }

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');

    if(this.heroId === '_new_') {
      return;
    }

    this.heroService.get(this.heroId).subscribe((hero: Hero) => {
      this.hero = hero;
      this.updateFormSingleValues();
      this.updateFormArrayValues();
    });
    
  }


  get getTeamAffiliations() {
    return this.heroForm.get('teamAffiliations') as FormArray;
  }

  
  get getAbilities() {
    return this.heroForm.get('abilities') as FormArray;
  }


  get getPowers() {
    return this.heroForm.get('powers') as FormArray;
  }
  
  addTeamAffiliation(): void {
    this.getTeamAffiliations.push(this.fb.control(''));
  }

  removeTeamAffiliation(index: number): void {
    this.getTeamAffiliations.removeAt(index);
  }

  addAbility(): void {
    this.getAbilities.push(this.fb.control(''));
  }

  removeAbility(index: number): void {
    this.getAbilities.removeAt(index);
  }

  addPower(): void {
    this.getPowers.push(this.fb.control(''));
  }

  removePower(index: number): void {
    this.getPowers.removeAt(index);
  }

  /**
   * Update the form values with the hero values
   * 
   * @returns void
   */
  updateFormSingleValues(){
    this.heroForm.patchValue({
      name: this.hero.name,
      heroName: this.hero.heroName,
      publisher: this.hero.publisher,
      firstAppearanceDate: this.hero.firstAppearance
    })
  }

  /**
   * Update the form values with the hero values
   * 
   * @returns void
   */
  updateFormArrayValues(){
    this.hero.abilities?.forEach((ability) => {
      if(ability) {
        this.getAbilities.push(this.fb.control(ability))
      };
    });
    
    this.hero.teamAffiliations?.forEach((affiliation) => {
      if(affiliation) {
        this.getTeamAffiliations.push(this.fb.control(affiliation))
      }
    });

    this.hero.powers?.forEach((power) => {
      if(power) {
        this.getPowers.push(this.fb.control(power));
      }
    });
  }

  createHero(): void {
    this.heroService.create(this.heroForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  onSubmit(): void {
    if (this.heroForm.valid) {

      if(this.heroId !== '_new_') {
        this.heroService.update(this.heroForm.value, this.heroId).subscribe((hero) => {
          this.router.navigate(['/']);
        });
      }else {
        this.createHero();
      }

    } else {
      console.error('Form is invalid');
    }
  }


  
}
