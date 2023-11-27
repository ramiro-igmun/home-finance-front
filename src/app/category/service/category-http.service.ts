import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Category} from "../../positions/model/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {
  private readonly url = 'http://localhost:8080/api/v0/categories'

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<{categories: Category[]}>(this.url).pipe(
      map(response => response.categories)
    );
  }

  public getByGroupTag(groupTag: string): Observable<Category[]> {
    const tag = groupTag.replace(/_/g, ' ');
    return this.httpClient.get<{categories: Category[]}>(`${this.url}/${btoa(tag)}`).pipe(
      map(response => response.categories)
    );
  }

  public deleteCategory(tag: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${btoa(tag)}`);
  }

  public createCategory(tag: string): Observable<void> {
    return this.httpClient.post<void>(this.url, {tag});
  }

  public addSubCategory(groupTag: string, tag: string): Observable<void> {
    const group = groupTag.replace(/_/g, ' ');
    return this.httpClient.post<void>(`${this.url}/${btoa(group)}`, {tag});
  }
}
