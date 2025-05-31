import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import { useClientStore, Client } from "../stores/useClientStore";
import { Table, Column, Card, CardHeader, CardContent, Button, Modal } from "../design-system";
import {
  UsersIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CreditCardIcon,
  EnvelopeIcon,
  UserIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminClientManagement: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { clients, isLoading, fetchData, removeClient, totalClients } = useClientStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDeleteClick = (client: Client, event: React.MouseEvent) => {
    event.stopPropagation();
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (clientToDelete) {
      try {
        await removeClient(clientToDelete.id);
        toast.success(`Client ${clientToDelete.firstName} ${clientToDelete.lastName} deleted successfully`);
        setDeleteModalOpen(false);
        setClientToDelete(null);
      } catch (error) {
        toast.error('Failed to delete client');
      }
    }
  };

  const handleTransactionClick = (client: Client) => {
    localStorage.setItem('id2', String(client.id));
    navigate('/admin/clients/form');
  };

  const handleEditClick = (client: Client) => {
    // Navigate to edit client page (to be implemented)
    console.log('Edit client:', client);
  };

  const columns: Column<Client>[] = [
    {
      key: 'name',
      title: 'Client Name',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {record.firstName.charAt(0).toUpperCase()}{record.lastName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-neutral-900">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-sm text-neutral-500">ID: {record.id}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-4 w-4 text-neutral-500" />
          <span className="text-neutral-700">{value}</span>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
      align: 'center',
      render: (value: string) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'ADMIN'
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </div>
      )
    },
    {
      key: 'montant',
      title: 'Current Balance',
      dataIndex: 'montant',
      sortable: true,
      align: 'right',
      render: (value: number) => (
        <div className="font-semibold text-accent-600">{formatCurrency(value)}</div>
      )
    },
    {
      key: 'maxAmount',
      title: 'Credit Limit',
      dataIndex: 'maxAmount',
      sortable: true,
      align: 'right',
      render: (value: number) => (
        <div className="font-semibold text-primary-600">{formatCurrency(value)}</div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleTransactionClick(record)}
            leftIcon={<CreditCardIcon className="h-4 w-4" />}
          >
            Transaction
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEditClick(record)}
            leftIcon={<PencilIcon className="h-4 w-4" />}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => handleDeleteClick(record, e)}
            leftIcon={<TrashIcon className="h-4 w-4" />}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <AdminSideBar open={open} toggleSidebar={() => setOpen(!open)} />
      <ToastContainer position="top-right" />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                  Client Management
                </h1>
                <p className="text-xl text-neutral-600">
                  Manage and monitor all client accounts
                </p>
              </div>
              <Button
                onClick={() => navigate('/admin/clients/add')}
                leftIcon={<PlusIcon className="h-5 w-5" />}
                size="lg"
              >
                Add New Client
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Total Clients</p>
                    <p className="text-2xl font-bold text-neutral-900">{totalClients}</p>
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
                    <p className="text-sm text-neutral-600">Total Credit</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {formatCurrency(clients?.reduce((sum, client) => sum + client.maxAmount, 0) || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Active Balance</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {formatCurrency(clients?.reduce((sum, client) => sum + client.montant, 0) || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Active Users</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {clients?.filter(client => client.role === 'USER').length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clients Table */}
          {isLoading ? (
            <Card variant="elevated" className="text-center py-16">
              <CardContent>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-8"></div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Loading Clients</h2>
                <p className="text-neutral-600">Please wait while we fetch client data...</p>
              </CardContent>
            </Card>
          ) : clients && clients.length > 0 ? (
            <Card variant="elevated">
              <CardHeader
                title="Client Directory"
                subtitle="Complete list of all registered clients"
              />
              <Table
                columns={columns}
                data={clients}
                pagination={true}
                pageSize={10}
                striped={true}
                hoverable={true}
                size="md"
                emptyText="No clients found"
              />
            </Card>
          ) : (
            <Card variant="elevated" className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UsersIcon className="h-12 w-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No Clients Found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Get started by adding your first client to the system.
                </p>
                <Button
                  onClick={() => navigate('/admin/clients/add')}
                  leftIcon={<PlusIcon className="h-5 w-5" />}
                >
                  Add First Client
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
            >
              Delete Client
            </Button>
          </div>
        }
      >
        {clientToDelete && (
          <div>
            <p className="text-neutral-700 mb-4">
              Are you sure you want to delete the client{" "}
              <strong>{clientToDelete.firstName} {clientToDelete.lastName}</strong>?
            </p>
            <p className="text-sm text-neutral-500">
              This action cannot be undone and will permanently remove all client data.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminClientManagement;

