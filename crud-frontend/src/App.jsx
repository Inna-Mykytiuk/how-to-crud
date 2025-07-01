import { useState } from 'react';
import './App.css'
import ModalForm from './components/ModalForm'
import Navbar from './components/Navbar'
import TableList from './components/TableList'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      // Handle add item
    } else {
      // Handle edit item
    }
    setIsOpen(false);
  };


  return (
    <>
      {/* ++ py-5 px-5 */}
      <div className="py-5 px-5 ">
        <Navbar onOpen={() => handleOpen('add')} />
        <TableList onOpen={() => handleOpen('edit')} />
        <ModalForm isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          onSubmit={handleSubmit} />
      </div>

    </>
  )
}

export default App
