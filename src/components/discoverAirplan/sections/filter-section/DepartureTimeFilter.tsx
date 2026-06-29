import { useState } from "react";

type DepartureTimeFilterProps = {
  tripType: string | null;
  departureOriginLabel: string;
  returnOriginLabel: string;
  timeOptions: string[];
};

export const DepartureTimeFilter = ({
  tripType,
  departureOriginLabel,
  returnOriginLabel,
  timeOptions,
}: DepartureTimeFilterProps) => {
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(
    timeOptions[0],
  );
  const [selectedReturnTime, setSelectedReturnTime] = useState(timeOptions[0]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="time-origin-label">{departureOriginLabel}</p>
        <div className="time-segments">
          {timeOptions.map((option) => (
            <button
              key={option}
              className={`time-segment-btn ${
                selectedDepartureTime === option ? "is-active" : ""
              }`}
              onClick={() => setSelectedDepartureTime(option)}
              type="button">
              {option}
            </button>
          ))}
        </div>
      </div>
      {tripType !== "one" && (
        <div>
          <p className="time-origin-label">{returnOriginLabel}</p>
          <div className="time-segments">
            {timeOptions.map((option) => (
              <button
                key={`return-${option}`}
                className={`time-segment-btn ${
                  selectedReturnTime === option ? "is-active" : ""
                }`}
                onClick={() => setSelectedReturnTime(option)}
                type="button">
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};