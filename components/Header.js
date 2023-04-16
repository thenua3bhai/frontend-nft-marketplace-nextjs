import React from "react";

import Link from "next/link";
import { ConnectButton } from "@web3uikit/web3";
function Header() {
  return (
    <div>
      <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
        <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
        <div className="flex flex-row items-center">
          <Link href="/" className="bg-red-300 text-base mx-4 rounded p-1 ">
            Home
          </Link>

          <Link href="/sell-nft" className="bg-slate-400 text-base mx-4 p-2 rounded">
            Sell Page
          </Link>
          <ConnectButton moralisAuth={false} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
