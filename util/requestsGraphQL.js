import { config } from "../config";
import { request, gql, GraphQLClient  } from 'graphql-request'

const OBJKT_API_URL = `https://data.objkt.com/v2/graphql`;

let price = 0 

const graphQLClient = new GraphQLClient(OBJKT_API_URL, {
  headers: {}
});

    let query = gql`
         query MyQuery {
  listing(where: {fa_contract: {_eq: "${config.COLLECTION_CONTRACT}"}, status: {_eq: "active"}, price: {_gt: "${price}"}}, order_by: {price: asc}) {
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
} 
`;
   
const graphQlClient = new GraphQLClient(OBJKT_API_URL, { headers: {} })

export const getPrice = async (nfts) => { 
  const result = await graphQlClient.request(query);
  
  
  
  const finalList = [];
  result.listing.map(function(aList) {
      const list = {};
      list.id = aList.token.token_id;
      list.price = aList.price/1000000.0;
      price = list.price;
      finalList.push(list);
    })
  
  /*if (result.listing.length == 500){
      const resultFromLoop = await getPrice(nfts);
      finalList.concat(resultFromLoop);
  }
  else{*/
      nfts.map(function(nft) {
      nft.price = "Not to sale";
     
      finalList.map(function(aPrice) {
        if(parseInt(aPrice.id,10) == nft.id){
          nft.price = aPrice.price;
        }
        })
    })
    console.log("Price update");
  //}
  

  
  
  return result.listing;
}






