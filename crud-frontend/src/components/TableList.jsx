export default function TableList({ onOpen, searchTerm, clients, onDelete, loading }) {

  const filteredData = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (client) => {
    onOpen('edit', client);
  };

  const handleDelete = (clientId) => {
    onDelete(clientId);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8">
                  {searchTerm ? 'Нічого не знайдено' : 'Немає клієнтів'}
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="hover">
                  {/* Використовуємо index + 1 для послідовної нумерації */}
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>${item.rate}</td>
                  <td>
                    <button
                      className={`btn rounded-full w-20 ${item.isactive ? 'btn-primary' : 'btn-outline btn-primary'
                        }`}
                    >
                      {item.isactive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(item)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-accent"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
