import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface CalendarViewProps {
  onContinue: (date: Date, time: string) => void;
}

const CalendarView = ({ onContinue }: CalendarViewProps) => {
  const [selected, setSelected] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>("1:00 PM");

  const morningSlots = ["10:00 AM", "10:30 AM", "11:00 AM"];
  const afternoonSlots = ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"];

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-6 font-sans">
        <div className="flex items-center gap-2 mb-3">
          <img
            src="/src/assets/logo.png"
            alt="OpenSlot logo"
            className="h-7 w-auto"
          />
          <span className="text-[#2D312E] font-medium text-[15px]">
            OpenSlot
          </span>
        </div>

        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => date && setSelected(date)}
          classNames={{
            months: "flex flex-col",
            month: "space-y-4",
            month_caption: "flex justify-between items-center pb-2",
            caption_label: "text-lg font-medium text-[#2D312E]",
            nav: "flex items-center gap-2",
            button_previous:
              "w-8 h-8 border border-[#e4e6e0] rounded-lg bg-[#F8F9F5] text-[#7a8070] hover:bg-[#eef0ea] flex items-center justify-center text-sm [&>svg]:stroke-[#7a8070]",
            button_next:
              "w-8 h-8 border border-[#e4e6e0] rounded-lg bg-[#F8F9F5] text-[#7a8070] hover:bg-[#eef0ea] flex items-center justify-center text-sm [&>svg]:stroke-[#7a8070]",
            month_grid: "w-full border-collapse",
            weekdays: "flex justify-between",
            weekday: "text-[#A3B18A] w-10 font-medium text-xs pb-3 text-center",
            week: "flex justify-between w-full mt-1",
            day: "w-10 h-10 p-0 text-center",
            day_button:
              "w-10 h-10 flex items-center justify-center text-sm font-medium text-[#2D312E] rounded-full hover:bg-[#d0d8d0] cursor-pointer",
            selected:
              "!bg-[#3D5A42] !text-white [&>button]:!text-white rounded-full",
            outside: "text-[#e4e6e0]",
            disabled:
              "text-[#c8ccc4] opacity-50 cursor-default hover:bg-transparent",
          }}
          disabled={{ before: new Date() }}
        />

        <hr className="border-[#e4e6e0] my-3" />

        <div className="text-[11px] text-[#A3B18A] tracking-widest uppercase font-medium mb-2">
          {format(selected, "EEEE, MMMM dd")}
        </div>

        <div className="mb-3">
          <div className="text-xs text-[#7a8070] mb-2">Morning</div>
          <div className="flex flex-wrap gap-2">
            {morningSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3.5 py-1.5 text-sm rounded-lg border transition-colors ${
                  selectedTime === time
                    ? "bg-[#3D5A42] text-white border-[#3D5A42]"
                    : "bg-white text-[#2D312E] border-[#e4e6e0] hover:bg-[#F8F9F5]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-[#7a8070] mb-2">Afternoon</div>
          <div className="flex flex-wrap gap-2">
            {afternoonSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3.5 py-1.5 text-sm rounded-lg border transition-colors ${
                  selectedTime === time
                    ? "bg-[#3D5A42] text-white border-[#3D5A42]"
                    : "bg-white text-[#2D312E] border-[#e4e6e0] hover:bg-[#F8F9F5]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            selected && selectedTime && onContinue(selected, selectedTime)
          }
          disabled={!selected || !selectedTime}
          className="w-full py-3 bg-[#3D5A42] text-white text-sm font-medium rounded-xl hover:bg-[#344e38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CalendarView;
