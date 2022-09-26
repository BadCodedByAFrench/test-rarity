import { config } from "../config";
import { request, gql, GraphQLClient  } from 'graphql-request'

const OBJKT_API_URL = `https://data.objkt.com/v2/graphql`;

const graphQLClient = new GraphQLClient(OBJKT_API_URL, {
  headers: {}
});
   
const graphQlClient = new GraphQLClient(OBJKT_API_URL, { headers: {} })

export const getPrice = async (nfts, price, firstloop) => { 
  
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
  
  const result = await graphQlClient.request(query);
  
  let newprice = price;
  
  const finalList = [];
  result.listing.map(function(aList) {
      const list = {};
      list.id = aList.token.token_id;
      list.price = aList.price/1000000.0;
      newprice = aList.price;
      finalList.push(list);
    })
  
  if (result.listing.length == 500){
    const resultFromLoop = await getPrice(nfts, newprice, false);
    finalList = finalList.concat(resultFromLoop);
  }
  if (firstloop){
      nfts.map(function(nft) {
      nft.price = "Not to sale";
     
      finalList.map(function(aPrice) {
        if(parseInt(aPrice.id,10) == nft.id){
          nft.price = aPrice.price;
        }
        })
    })
    console.log("Price update");
  }
  

  
  
  return finalList;
}






