import { useState, useEffect } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch clients from API
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reindex IDs after deletion (optional - only if you want to update database IDs)
  const reindexClientIds = async () => {
    try {
      await axios.post('http://localhost:3000/api/clients/reindex');
      const response = await axios.get('http://localhost:3000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error reindexing client IDs:', error.message);
    }
  };

  // Load clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = (mode, client = null) => {
    setModalMode(mode);
    setClientData(client);
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => {
    try {
      setLoading(true);

      if (modalMode === 'add') {
        // Add new client
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Client added:', response.data);

        // Refresh data to get correct IDs
        await fetchClients();
      } else if (modalMode === 'edit') {
        // Update existing client
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);

        // Update local state
        setClients(prevClients =>
          prevClients.map(client =>
            client.id === clientData.id ? response.data : client
          )
        );
      }

      setIsOpen(false);
      setClientData(null);
    } catch (error) {
      console.error('Error submitting client data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/clients/${clientId}`);
      console.log('Client deleted:', clientId);

      // Оновити локальний стан перед реіндексацією
      setClients(prevClients => prevClients.filter(client => client.id !== clientId));

      // Потім виконати реіндексацію
      await reindexClientIds();

    } catch (error) {
      console.error('Error deleting client:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-5 px-5">
        <Navbar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
        <TableList
          onOpen={handleOpen}
          searchTerm={searchTerm}
          clients={clients}
          onDelete={handleDelete}
          loading={loading}
        />
        <ModalForm
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setClientData(null);
          }}
          mode={modalMode}
          onSubmit={handleSubmit}
          clientData={clientData}
        />
      </div>
    </>
  )
}

export default App
