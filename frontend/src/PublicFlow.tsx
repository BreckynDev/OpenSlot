import { useState } from "react";
import { format } from "date-fns";
import CalendarView from "./components/CalendarView";
import BookingForm from "./components/BookingForm";
import Confirmation from "./components/Confirmation";
import Cancellation from "./components/Cancellation";

type Page = "calendar" | "form" | "confirmation" | "cancellation";

interface BookingData {
  date: Date;
  time: string;
  name: string;
  email: string;
  service: string;
  notes: string;
  appointmentId: number;
}

function PublicFlow() {
  const [page, setPage] = useState<Page>("calendar");
  const [booking, setBooking] = useState<Partial<BookingData>>({});

  const handleCalendarContinue = (date: Date, time: string) => {
    setBooking((prev) => ({ ...prev, date, time }));
    setPage("form");
  };

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    service: string;
    notes: string;
  }) => {
    const fullBooking = { ...booking, ...data } as BookingData;

    try {
      const response = await fetch("http://localhost:8000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullBooking.name,
          email: fullBooking.email,
          service: fullBooking.service,
          appointment_at: fullBooking.date
            ? new Date(
                fullBooking.date.getFullYear(),
                fullBooking.date.getMonth(),
                fullBooking.date.getDate(),
                ...parseTime(fullBooking.time),
              ).toISOString()
            : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to book appointment");
      const responseData = await response.json();
      setBooking({ ...fullBooking, appointmentId: responseData.data.id });
      setPage("confirmation");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleConfirmCancel = async () => {
    setBooking({});
    setPage("calendar");
  };

  const handleBackToCalendar = () => {
    setBooking({});
    setPage("calendar");
  };

  const formattedDate = booking.date ? format(booking.date, "EEE, MMMM d") : "";

  return (
    <>
      {page === "calendar" && (
        <CalendarView onContinue={handleCalendarContinue} />
      )}
      {page === "form" && (
        <BookingForm
          date={formattedDate}
          time={booking.time ?? ""}
          onBack={() => setPage("calendar")}
          onSubmit={handleFormSubmit}
        />
      )}
      {page === "confirmation" && (
        <Confirmation
          date={formattedDate}
          time={booking.time ?? ""}
          name={booking.name ?? ""}
          email={booking.email ?? ""}
          service={booking.service ?? ""}
          onCancel={() => setPage("cancellation")}
          onBackToCalendar={handleBackToCalendar}
        />
      )}
      {page === "cancellation" && (
        <Cancellation
          date={formattedDate}
          time={booking.time ?? ""}
          name={booking.name ?? ""}
          email={booking.email ?? ""}
          service={booking.service ?? ""}
          onConfirmCancel={handleConfirmCancel}
          onKeepAppointment={() => setPage("confirmation")}
        />
      )}
    </>
  );
}

function parseTime(time: string = ""): [number, number] {
  const [rawTime, period] = time.split(" ");
  let [hours, minutes] = rawTime.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return [hours, minutes];
}

export default PublicFlow;
