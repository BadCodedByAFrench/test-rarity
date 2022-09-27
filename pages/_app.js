import 'tailwindcss/tailwind.css'
import { getPriceV2 } from "../util/requestsGraphQL.js";

function MyApp({ Component, pageProps }) {
  await getPriceV2(0, true);
  return <Component {...pageProps} />
}

export const allPrices = setInterval(()=>  getPriceV2(0, true), 60*1*1000);


export default MyApp
