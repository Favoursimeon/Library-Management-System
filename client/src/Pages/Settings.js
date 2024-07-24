import Sidebar from './Sidebar'
import React, { useState, useEffect } from 'react';
import './Settings.css';


const Settings = () => {
  const [libraryName, setLibraryName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = {
        libraryName: 'King`s Books Hub',
        address: 'GA 211-3241 Swaniker St, Accra, Ghana',
        contact: '+233 50 687 5081',
        hours: 'Mon-Fri: 9am - 8pm',
      };
      setLibraryName(settingsData.libraryName);
      setAddress(settingsData.address);
      setContact(settingsData.contact);
      setHours(settingsData.hours);
    };
    fetchSettings();
  }, []);

  const handleSave = () => {
    const updatedSettings = { libraryName, address, contact, hours };
    console.log('Settings saved:', updatedSettings);
  };

  return (
    <div className="settings-container">
      <Sidebar />
      <h1>Library Settings</h1>
      <form className="settings-form">
        <label>
          Library Name:
          <input
            type="text"
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Contact Information:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>
        <label>
          Operational Hours:
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save 
        </button>
      </form>
    </div>
  );
};

export default Settings;