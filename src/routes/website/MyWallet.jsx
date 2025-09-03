
import BalanceProfile from "../../ui/website/wallet/BalanceProfile";
import TransactionsList from "../../ui/website/wallet/TransactionsList";

import { useState } from "react";
import CustomButton from "../../ui/CustomButton";
import ChargeBalanceModal from "../../ui/modals/ChargeBalanceModal";


export default function MyWallet() {
  return (
    <div className="wallet-page">
      <BalanceProfile />
      <TransactionsList />
    </div>
  );
}
