import axios from "axios";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { json2query } from ".";
import { config } from "../config";

let basePath =
  config.env == "local"
    ? `http://${config.LOCAL_API_URL}`
    : `https://${config.API_URL}`;

const API_URL = `https://data.objkt.com/v2/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {}
});

export const useListedPrice() = async () => {
  return useQuery("get-ListedPrice", async () => {
    const { getListedPrice } = await graphQLClient.request(gql`
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
          }
    `);
    return getListedPrice;
  });
};



export const getNFT = async (id) => {
  try {
    const { data } = await axios.get(`${basePath}/api/nft?id=${id}`);
    //  console.log("hum", { data });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getNFTs = async (query) => {
  const res = await fetch(`${basePath}/api/nfts?${json2query(query)}`);
  const data = await res.json();
  return data;
};

export const getFilters = async (query) => {
  const res = await fetch(`${basePath}/api/filters?${json2query(query)}`);
  const data = await res.json();
  return data;
};

export const getNFTInfo = async (id) => {
  const res = await fetch(
    `https://ipfs.io/ipfs/QmSawZEASXSak5HrhxrKH5YH2fBmshZE3gkU6zxBcBuSm7/${id}.json`
  );
  const data = await res.json();
  return data;
};

export const getNFTPrice = async (id) => {
  const res = await fetch(
    `https://ipfs.io/ipfs/QmSawZEASXSak5HrhxrKH5YH2fBmshZE3gkU6zxBcBuSm7/${id}.json`
  );
  const data = await res.json();
  return data;
};

