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
      holders {
        holder_address
      }
    }
    status
    seller_address
  }
} 
`;
  
  const result = await graphQlClient.request(query);
  
  let newprice = price;
  
  let finalList = [];
  result.listing.map(function(aList) {
    
      if(aList.seller_address == aList.token.holders[aList.token.holders.length - 1].holder_address){
        const list = {};
        list.id = aList.token.token_id;
        list.price = aList.price/1000000.0;
        newprice = aList.price;
        finalList.push(list);
      }
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





export let allThePrices = [];


export const getPriceV2 = async (price, firstloop) => { 
  
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
      holders {
        holder_address
      }
    }
    status
    seller_address
  }
} 
`;
  
  const result = await graphQlClient.request(query);
  
  let newprice = price;
  
  let finalList = [];
  result.listing.map(function(aList) {
    
      if(aList.seller_address == aList.token.holders[aList.token.holders.length - 1].holder_address){
        const list = {};
        list.id = aList.token.token_id;
        list.price = aList.price/1000000.0;
        newprice = aList.price;
        finalList.push(list);
      }
    })
  
  if (result.listing.length == 500){
    const resultFromLoop = await getPriceV2(newprice, false);
    finalList = finalList.concat(resultFromLoop);
  }
  if (firstloop){
    console.log("Price update test loop");
    allThePrices = finalList;
  }
  

  
  
  return finalList;
}







