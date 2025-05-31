import React, { useEffect, useState } from 'react';
import Navbar from './Layout/Navbar';
import { useTransactionStore, Transaction } from '../stores/useTransactionStore';
import { Table, Column, Card, CardContent, Button } from '../design-system';
import {
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ArrowDownTrayIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const InvoicesPage = () => {
  const { clientPurchases, fetchClientPurchases } = useTransactionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const iduser = localStorage.getItem('id');
      if (iduser) {
        await fetchClientPurchases(Number(iduser));
      }
      setLoading(false);
    };

    fetchData();
  }, [fetchClientPurchases]);

  const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const generateInvoiceId = (transaction: Transaction, index: number): string => {
    return `INV-${new Date(transaction.purchaseDate).getFullYear()}-${String(index + 1).padStart(4, '0')}`;
  };

  const handleDownloadInvoice = (transaction: Transaction, index: number) => {
    // Simulate invoice download
    const invoiceId = generateInvoiceId(transaction, index);
    console.log(`Downloading invoice ${invoiceId}`);
    // Here you would implement actual PDF generation/download
  };

  const handlePrintInvoice = (transaction: Transaction, index: number) => {
    // Simulate invoice printing
    const invoiceId = generateInvoiceId(transaction, index);
    console.log(`Printing invoice ${invoiceId}`);
    // Here you would implement actual printing functionality
  };

  const columns: Column<Transaction>[] = [
    {
      key: 'invoiceId',
      title: 'Invoice ID',
      render: (_, record, index) => (
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-4 w-4 text-primary-600" />
          <span className="font-medium text-neutral-900">
            {generateInvoiceId(record, index)}
          </span>
        </div>
      )
    },
    {
      key: 'purchaseName',
      title: 'Product',
      dataIndex: 'purchaseName',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="h-4 w-4 text-neutral-500" />
          <span className="font-medium text-neutral-900">{value}</span>
        </div>
      )
    },
    {
      key: 'quantity',
      title: 'Quantity',
      dataIndex: 'quantity',
      sortable: true,
      align: 'center',
      render: (value: number) => (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {value}
        </div>
      )
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount',
      sortable: true,
      align: 'right',
      render: (value: number) => (
        <div className="font-semibold text-accent-600">{formatCurrency(value)}</div>
      )
    },
    {
      key: 'purchaseDate',
      title: 'Date',
      dataIndex: 'purchaseDate',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2 text-neutral-600">
          <CalendarIcon className="h-4 w-4" />
          {formatDate(value)}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record, index) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDownloadInvoice(record, index)}
            leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
          >
            Download
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handlePrintInvoice(record, index)}
            leftIcon={<PrinterIcon className="h-4 w-4" />}
          >
            Print
          </Button>
        </div>
      )
    }
  ];

  const totalAmount = clientPurchases?.reduce((sum, purchase) => sum + purchase.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Invoices & Receipts
            </h1>
            <p className="text-xl text-neutral-600">
              View and manage all your purchase invoices
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Total Invoices</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {clientPurchases?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Total Amount</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {formatCurrency(totalAmount)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">This Month</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {clientPurchases?.filter(p =>
                        new Date(p.purchaseDate).getMonth() === new Date().getMonth()
                      ).length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          {clientPurchases && clientPurchases.length > 0 ? (
            <Card variant="elevated">
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900">Invoice History</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  All your purchase invoices and receipts
                </p>
              </div>
              <Table
                columns={columns}
                data={clientPurchases}
                pagination={true}
                pageSize={10}
                striped={true}
                hoverable={true}
                size="md"
                loading={loading}
                emptyText="No invoices found"
              />
            </Card>
          ) : (
            <Card variant="elevated" className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DocumentTextIcon className="h-12 w-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No Invoices Yet
                </h3>
                <p className="text-neutral-600 mb-6">
                  You haven't made any purchases yet. Start shopping to see your invoices here.
                </p>
                <Button onClick={() => window.location.href = '/client/dashboard'}>
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;