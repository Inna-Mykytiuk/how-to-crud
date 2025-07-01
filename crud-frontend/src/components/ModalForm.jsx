import { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState('Inactive');

  // Update form fields when clientData changes (for edit mode)
  useEffect(() => {
    if (mode === 'edit' && clientData) {
      setName(clientData.name || '');
      setEmail(clientData.email || '');
      setJob(clientData.job || '');
      setRate(clientData.rate || '');
      setStatus(clientData.isactive ? 'Active' : 'Inactive');
    } else {
      // Reset form for add mode
      setName('');
      setEmail('');
      setJob('');
      setRate('');
      setStatus('Inactive');
    }
  }, [mode, clientData, isOpen]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !job.trim() || !rate) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Будь ласка, введіть правильний email');
      return;
    }

    try {
      const clientDataToSubmit = {
        name: name.trim(),
        email: email.trim(),
        job: job.trim(),
        rate: Number(rate),
        isactive: status === 'Active'
      };

      await onSubmit(clientDataToSubmit);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Сталася помилка при збереженні даних');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg py-4">
            {mode === 'edit' ? 'Редагувати клієнта' : 'Додати клієнта'}
          </h3>

          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center my-4 gap-2">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="input input-bordered flex items-center my-4 gap-2">
              Email
              <input
                type="email"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="input input-bordered flex items-center my-4 gap-2">
              Job
              <input
                type="text"
                className="grow"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
            </label>

            <div className="flex mb-4 justify-between">
              <label className="input input-bordered flex mr-4 items-center gap-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </label>

              <select
                className="select select-bordered w-full max-w-xs"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                {mode === 'edit' ? 'Save Changes' : 'Add Client'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
