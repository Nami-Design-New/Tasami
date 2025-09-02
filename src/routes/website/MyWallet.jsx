import BalanceProfile from "../../ui/website/wallet/BalanceProfile";
import TransactionsList from "../../ui/website/wallet/TransactionsList";

export default function MyWallet() {
  return (
    <div className="wallet-page">
      <BalanceProfile />
      <TransactionsList />
    </div>
  );
}
