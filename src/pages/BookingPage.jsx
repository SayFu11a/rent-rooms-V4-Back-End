import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../axios';

function BookingPage() {
   const location = useLocation();
   const { title, tags } = location.state || {};
   const navigate = useNavigate();
   const [step, setStep] = useState(1);
   const [checkInDate, setCheckInDate] = useState('');
   const [checkOutDate, setCheckOutDate] = useState('');
   const [contactInfo, setContactInfo] = useState({ fullName: '', email: '', phoneNumber: '' });
   const [guests, setGuests] = useState([{ id: 1, fullName: '' }]);

   const handleContinue = () => {
      if (step === 1) {
         setStep(2);
      } else if (step === 2) {
         // If you want to navigate to '/guest-info' here, uncomment the next line
         navigate('/guest-info', {
            state: { checkInDate, checkOutDate, contactInfo, guests, title, tags },
         });

         handleBookingConfirmation();

         console.log(title, tags);
      }
   };

   const handleAddGuest = () => {
      setGuests([...guests, { id: guests.length + 1, fullName: '' }]);
   };

   const handleGuestNameChange = (id, fullName) => {
      const updatedGuests = guests.map((guest) =>
         guest.id === id ? { ...guest, fullName } : guest,
      );
      setGuests(updatedGuests);
   };

   const handleBookingConfirmation = () => {
      console.log('Данные о бронировании:', {
         checkInDate,
         checkOutDate,
         contactInfo,
         guests,
         title,
         tags,
      });

      axios
         .post(`${baseURL}/booking`, {
            checkInDate,
            checkOutDate,
            contactInfo,
            guests,
            title,
            tags,
         })
         .then((response) => {
            console.log('Ответ от сервера:', response.data);
         })
         .catch((error) => {
            console.error('Ошибка при отправке данных:', error);
         });
   };

   const containerStyle = {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
   };

   const headingStyle = {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
   };

   const labelStyle = {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: '#555',
   };

   const inputStyle = {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
   };

   const buttonStyle = {
      display: 'inline-block',
      padding: '10px 20px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
   };

   const buttonHoverStyle = {
      backgroundColor: '#0056b3',
   };

   return (
      <div style={containerStyle}>
         <h2 style={headingStyle}>Бронирование номера</h2>
         <label style={labelStyle}>
            Дата заезда:
            <input
               type="date"
               value={checkInDate}
               onChange={(e) => setCheckInDate(e.target.value)}
               style={inputStyle}
            />
         </label>
         <label style={labelStyle}>
            Дата выезда:
            <input
               type="date"
               value={checkOutDate}
               onChange={(e) => setCheckOutDate(e.target.value)}
               style={inputStyle}
            />
         </label>
         <br />
         <label>
            ФИО:
            <input
               type="text"
               value={contactInfo.fullName}
               onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
               style={inputStyle}
            />
         </label>
         <br />
         <label>
            Email:
            <input
               type="email"
               value={contactInfo.email}
               onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
               style={inputStyle}
            />
         </label>
         <br />
         <label>
            Номер телефона:
            <input
               type="tel"
               value={contactInfo.phoneNumber}
               onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
               style={inputStyle}
            />
         </label>
         <br />

         {step === 2 && (
            <div style={{ marginTop: '20px' }}>
               <h2 style={headingStyle}>Информация о гостях</h2>
               {guests.map((guest) => (
                  <div key={guest.id} style={{ marginBottom: '20px' }}>
                     <label>
                        ФИО гостя {guest.id}:
                        <input
                           type="text"
                           value={guest.fullName}
                           onChange={(e) => handleGuestNameChange(guest.id, e.target.value)}
                           style={inputStyle}
                        />
                     </label>
                  </div>
               ))}
               <button
                  style={{ ...buttonStyle, marginBottom: '20px' }}
                  onMouseOver={(e) =>
                     (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                  onClick={handleAddGuest}>
                  Добавить гостя
               </button>
            </div>
         )}

         <button onClick={handleContinue}>
            <button
               onClick={handleContinue}
               style={buttonStyle}
               onMouseOver={(e) =>
                  (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
               }
               onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}>
               {step === 1 ? 'Продолжить' : 'Завершить бронирование'}
            </button>
         </button>
      </div>
   );
}

export default BookingPage;
