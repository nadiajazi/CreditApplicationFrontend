import React, {useEffect} from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import { useTransactionStore } from '../stores/useTransactionStore';




const TransactionHistory = () => {
  const { clientPurchases, fetchClientPurchases } = useTransactionStore();

  useEffect(() => {
    const iduser = localStorage.getItem('id')
    console.log(iduser)
    fetchClientPurchases(Number(iduser));
  }, [fetchClientPurchases]);

  return (
    <div>
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <div className="container px-40 py-40 mx-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {clientPurchases?.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{transaction.purchaseName}</td>
                <td className="py-2 px-4 border-b">{transaction.quantity}</td>
                <td className="py-2 px-4 border-b">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;