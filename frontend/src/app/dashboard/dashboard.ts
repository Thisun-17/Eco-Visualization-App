import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, ElephantData } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  elephantData: ElephantData[] = [];
  loading = true;
  error = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadElephantData();
  }

  loadElephantData(): void {
    console.log('🔍 Loading elephant data from API...');
    
    this.dataService.getElephantData().subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
        this.elephantData = response.data;
        this.loading = false;
        console.log(`📊 Loaded ${this.elephantData.length} elephant records`);
      },
      error: (error) => {
        console.error('❌ Error loading data:', error);
        this.error = 'Failed to load elephant data. Make sure your backend is running on port 3000.';
        this.loading = false;
      }
    });
  }

  getTotalPopulation(): number {
    return this.elephantData.reduce((total, elephant) => total + elephant.population, 0);
  }

  getTotalArea(): number {
    return this.elephantData.reduce((total, elephant) => total + elephant.area_km2, 0);
  }
}