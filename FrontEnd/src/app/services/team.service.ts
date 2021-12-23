import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:3000/api/teams';
  constructor(private http: HttpClient) { }

  /**
   * Get all courses
   * @returns Observable<Course[]>
   */
   all() {
    return this.http.get(this.apiUrl);
  }


  /**
   * Get a team with the given id
   * @param id : team id
   * @returns Observable<Team>
   */
  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id)
  }

  /**
   * Create a new team
   * @param team new team to create
   */
  create(team: any) {
    return this.http.post(this.apiUrl, team);
  }

  /**
   * Update a team with the given id
   * @param id team id to update
   * @param team new team data
   */
  update(id: string, team: any) {
    return this.http.put(this.apiUrl + '/' + id, team);
  }

  /**
   * Delete a team with the given id
   * @param id team id to delete
   */
  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id)
  }
}
