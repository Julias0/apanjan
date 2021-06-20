import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { setContext } from "@apollo/client/link/context";
import { HttpHeaders } from '@angular/common/http';

const uri = environment.graphql; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const auth = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const authToken = localStorage.getItem('authToken');
    // return the headers to the context so httpLink can read them
    // in this example we assume headers property exists
    // and it is an instance of HttpHeaders
    if (!headers) {
      headers = new HttpHeaders();
    }

    if (!authToken) {
      return {};
    } else {
      return {
        headers: headers.append('Authorization', `Bearer ${authToken}`)
      };
    }
  });


  return {
    link: auth.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
