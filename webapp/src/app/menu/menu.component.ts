import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Menus = { id:string, name:string, items: { name: string, price: number }[] }[];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus$?: Observable<Menus>;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.menus$ = this.apollo.watchQuery<{ menu:Menus }>({
      query: gql`
        query GetAllMenus {
          menu {
            name
            id
            status
            items {
              name
              price
            }
          }
        }
      `,
      pollInterval: 10000
    }).valueChanges.pipe(
      map(res => res.data.menu)
    );
  }

}
