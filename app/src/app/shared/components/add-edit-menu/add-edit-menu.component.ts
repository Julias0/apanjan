import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-menu',
  templateUrl: './add-edit-menu.component.html',
  styleUrls: ['./add-edit-menu.component.scss'],
})
export class AddEditMenuComponent implements OnInit {

  @Input() menuId: string;
  currentMenu = null;

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.fg = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.menuId) {
      this.apollo.watchQuery<{ menu: {id: string, name: string, status: string}[] }>({
        query: gql`
          query getMenu($_eq: Int) {
            menu(where: {id: {_eq: $_eq}}) {
              name
              id
              status
            }
          }
        `,
        variables: {
          _eq: this.menuId
        }
      }).valueChanges.pipe(
        take(1),
        map((res) => res.data.menu)
      ).subscribe(menu => {
        this.currentMenu = menu[0];
        this.fg.patchValue({
          name: this.currentMenu?.name
        });
      });
    }
  }

}
