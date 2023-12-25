<<<<<<< HEAD
import React from 'react'

function TransictionHistory() {
  return (
    <div>
      {/* UI Elements:
        Table displaying a list of transactions.
        Details such as date, item purchased, and amount. */}
    </div>
  )
}

export default TransictionHistory
=======
import React from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';
import { FooterWithLogo } from './Layout/Footer';

const transactions = [
  {
    date: "11/06/2022",
    item: "foods",
    amount: "2570"
  },
  // Add more transactions as needed
];

const TransactionHistory = () => {
  return (
    <div >
    <NavbarWithMegaMenu></NavbarWithMegaMenu>
    <div className="container px-40 py-40 mx-auto">
    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Item Purchased</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b">{transaction.date}</td>
              <td className="py-2 px-4 border-b">{transaction.item}</td>
              <td className="py-2 px-4 border-b">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <FooterWithLogo></FooterWithLogo>
    </div>
  );
};

export default TransactionHistory;
>>>>>>> origin/MarwenChebbi
