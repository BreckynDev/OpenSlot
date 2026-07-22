import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, startOfToday } from "date-fns";

const logo_path = "/logo.png";

interface CalendarViewProps {
  onContinue: (date: Date, time: string) => void;
}

const CalendarView = ({ onContinue }: CalendarViewProps) => {
  const [selected, setSelected] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex items-center justify-center p-4">
      <div className="w-[420px] max-w-full bg-white border border-[#e4e6e0] rounded-2xl p-6 font-sans">
        <div className="flex items-center mb-3">
          <img src={logo_path} alt="OpenSlot logo" className="h-8 w-auto" />
          <p className="text-[#2D312E] flex items-center justify-between">
            Open
          </p>
          <p className="text-[#A6DB24] flex items-center justify-between">
            Slot
          </p>
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
              "w-8 h-8 border border-[#A6DB24] rounded-lg bg-[#F8F9F5] text-[#7a8070] hover:bg-[#eef0ea] flex items-center justify-center text-sm [&>svg]:stroke-[#7a8070]",
            button_next:
              "w-8 h-8 border border-[#A6DB24] rounded-lg bg-[#F8F9F5] text-[#7a8070] hover:bg-[#eef0ea] flex items-center justify-center text-sm [&>svg]:stroke-[#7a8070]",
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
          disabled={{ before: startOfToday() }}
        />

        <hr className="border-[#e4e6e0] my-3" />

        <div className="text-[11px] text-[#A3B18A] tracking-widest uppercase font-medium mb-2">
          {format(selected, "EEEE, MMMM dd")}
        </div>

        <div className="mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Select Time:{" "}
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="p-2 w-full border border-gray-300 rounded-lg transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value=""></option>
              <option>6:00 AM</option>
              <option>6:30 AM</option>
              <option>7:00 AM</option>
              <option>7:30 AM</option>
              <option>8:00 AM</option>
              <option>8:30 AM</option>
              <option>9:00 AM</option>
              <option>9:30 AM</option>
              <option>10:00 AM</option>
              <option>10:30 AM</option>
              <option>11:00 AM</option>
              <option>11:30 AM</option>
              <option>12:00 PM</option>
              <option>12:30 PM</option>
              <option>1:00 PM</option>
              <option>1:30 PM</option>
              <option>2:00 PM</option>
              <option>2:30 PM</option>
              <option>3:00 PM</option>
              <option>3:30 PM</option>
              <option>4:00 PM</option>
              <option>4:30 PM</option>
              <option>5:00 PM</option>
              <option>5:30 PM</option>
              <option>6:00 PM</option>
            </select>
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
