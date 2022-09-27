import 'tailwindcss/tailwind.css'
import { getPriceV2 } from "../util/requestsGraphQL.js";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export const allPrices = setInterval(()=> await getPriceV2(0, true), 60*1*1000);


export default MyApp
