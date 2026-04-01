import { useState } from 'react';
import CalendarView from './components/CalendarView';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import { format } from 'date-fns';

type Page = 'calendar' | 'form' | 'confirmation';

interface BookingData {
  date: Date;
  time: string;
  name: string;
  email: string;
  service: string;
  notes: string;
}

function App() {
  const [page, setPage] = useState<Page>('calendar');
  const [booking, setBooking] = useState<Partial<BookingData>>({});

  const handleCalendarContinue = (date: Date, time: string) => {
    setBooking(prev => ({ ...prev, date, time }));
    setPage('form');
  };

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    service: string;
    notes: string;
  }) => {
    const fullBooking = { ...booking, ...data } as BookingData;
    setBooking(fullBooking);

    try {
      const response = await fetch('http://localhost:8000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullBooking.name,
          email: fullBooking.email,
          appointment_at: fullBooking.date
            ? new Date(
                fullBooking.date.getFullYear(),
                fullBooking.date.getMonth(),
                fullBooking.date.getDate(),
                ...parseTime(fullBooking.time)
              ).toISOString()
            : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to book appointment');
      setPage('confirmation');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleCancel = async () => {
    // Future: hit DELETE endpoint with appointment ID
    setBooking({});
    setPage('calendar');
  };

  const handleBackToCalendar = () => {
    setBooking({});
    setPage('calendar');
  };

  const formattedDate = booking.date
    ? format(booking.date, 'EEE, MMMM d')
    : '';

  return (
    <>
      {page === 'calendar' && (
        <CalendarView onContinue={handleCalendarContinue} />
      )}
      {page === 'form' && (
        <BookingForm
          date={formattedDate}
          time={booking.time ?? ''}
          onBack={() => setPage('calendar')}
          onSubmit={handleFormSubmit}
        />
      )}
      {page === 'confirmation' && (
        <Confirmation
          date={formattedDate}
          time={booking.time ?? ''}
          name={booking.name ?? ''}
          email={booking.email ?? ''}
          service={booking.service ?? ''}
          onCancel={handleCancel}
          onBackToCalendar={handleBackToCalendar}
        />
      )}
    </>
  );
}

function parseTime(time: string = ''): [number, number] {
  const [rawTime, period] = time.split(' ');
  let [hours, minutes] = rawTime.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return [hours, minutes];
}

export default App;