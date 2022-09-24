import { request, gql } from 'graphql-request'

const OBJKT_API_URL = `https://data.objkt.com/v2/graphql`;

const graphQLClient = new GraphQLClient(OBJKT_API_URL, {
  headers: {}
});

    const query = gql`
         query {
            listing(where: {fa_contract: {_eq: "KT1CwSgYmZewFazZsW348RAQYn1nthiGP3Qa"}, status: {_eq: "active"}}, order_by: {price: asc}) {
              fa_contract
              amount
              price
              token {
                name
                token_id
                display_uri
              }
              status
            }
          `;
   
export const getPrice = async() => { const datatoreturn = request('OBJKT_API_URL', query).then((data) => console.log(data)); return data; }


