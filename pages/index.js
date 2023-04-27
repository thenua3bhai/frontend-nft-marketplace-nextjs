import { Fragment } from "react";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";

/** DESIGN FRONTEND
 * 1. HomePage
 *     1. Show Recently Listed NFTs
 *         1.If you own the nft you can update the listing
 *         2. If not you can buy the listing

 * 2.Sell Page
 *      1 you can list your nft on market place which is not listed yet
 *
 * we will read events from database that has all the mappings of indexed events in an  easier to read data structure..

 */

export default function Home() {
  const { chainId, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : null;
  //only polygon have listings,,crosschain listing show ie. marketplace on another chain but user is connected to diffrent chain they able to see all chain listings or at least 1 common place so we are putting only polygon mumbai here
  const marketplaceAddress = chainId ? networkMapping["80001"].NftMarketplace[0] : null;

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
  console.log(listedNfts);
  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled && chainId ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft;
              return marketplaceAddress ? (
                <NFTBox price={price} nftAddress={nftAddress} tokenId={tokenId} marketplaceAddress={marketplaceAddress} seller={seller} key={`${nftAddress}${tokenId}`} />
              ) : (
                <div>Network error, please switch to a supported network. </div>
              );
            })
          )
        ) : (
          <div>Metamask not Connected ,please connect your wallet</div>
        )}
      </div>
      <div>{chainId == "80001" ? "Connected to Polygon Mumbai" : "Metamsk connected to different chain, Please  switch to<b>Polygon Mumbai</b> to test this"}</div>
    </div>
  );
}
