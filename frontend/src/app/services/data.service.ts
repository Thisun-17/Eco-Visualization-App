import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ElephantData {
  _id: string;
  year: number;
  region: string;
  nationalPark: string;
  population: number;
  area_km2: number;
  province: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: ElephantData[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getElephantData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/elephants`);
  }
}