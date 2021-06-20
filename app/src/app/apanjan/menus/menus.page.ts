import { Component, OnInit } from '@angular/core';
import { gql } from '@apollo/client/core';
import { ModalController } from '@ionic/angular';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { AddEditMenuComponent } from 'src/app/shared/components/add-edit-menu/add-edit-menu.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  menuQuery: QueryRef<{ menu: { id: string, name: string }[] }, EmptyObject>;
  menus$: Observable<{
    id: string;
    name: string;
  }[]>;

  constructor(
    private apollo: Apollo,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.menuQuery = this.apollo.watchQuery<{ menu: { id: string, name: string }[] }>({
      query: gql`
        query MyQuery {
          menu(order_by: {updated_at: desc}) {
            name
            id
          }
        }
      `
    });
    this.menus$ = this.menuQuery.valueChanges.pipe(
      map((res) => res.data.menu)
    );
  }

  async openAddEditMenu(menuId?: string) {
    const modal = await this.modalController.create({
      component: AddEditMenuComponent,
      componentProps: {
        menuId
      }
    });

    await modal.present();

    this.menuQuery.refetch();
  }
}
