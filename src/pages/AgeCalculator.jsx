import React, { useState } from "react";
import dayjs from "dayjs";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [ageData, setAgeData] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = dayjs();
    const birth = dayjs(birthDate);

    if (birth.isAfter(today)) return alert("Birthdate cannot be in the future!");

    // Years, months, days
    const years = today.diff(birth, "year");
    const months = today.diff(birth.add(years, "year"), "month");
    const days = today.diff(birth.add(years, "year").add(months, "month"), "day");

    // Total time units
    const totalDays = today.diff(birth, "day");
    const totalHours = today.diff(birth, "hour");
    const totalMinutes = today.diff(birth, "minute");
    const totalSeconds = today.diff(birth, "second");

    // Next Birthday
    let nextBirthday = birth.add(years + 1, "year");
    const daysToGo = nextBirthday.diff(today, "day");

    // Extra fun facts
    const weeksLived = Math.floor(totalDays / 7);
    const heartBeats = Math.floor(totalMinutes * 72 / 60); // avg 72 bpm
    const breaths = Math.floor(totalMinutes * 16 / 60); // avg 16 breaths/min
    const newYears = years; // new years celebrations experienced
    const hoursSlept = Math.floor(totalHours / 3); // assuming ~8 hrs/day

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToGo,
      nextAge: years + 1,
      weeksLived,
      heartBeats,
      breaths,
      newYears,
      hoursSlept,
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center my-20 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Age Calculator</h1>

        {/* Date Input */}
        <div className="flex gap-3 justify-center mb-6">
          <input
            type="date"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={calculateAge}
          >
            Calculate Age
          </button>
        </div>

        {ageData && (
          <>
            {/* Current Age */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Your Current Age</h2>
              <div className="flex justify-center gap-8 text-2xl font-bold">
                <div>
                  <p className="text-green-600">{ageData.years}</p>
                  <p className="text-sm">Years</p>
                </div>
                <div>
                  <p className="text-blue-600">{ageData.months}</p>
                  <p className="text-sm">Months</p>
                </div>
                <div>
                  <p className="text-purple-600">{ageData.days}</p>
                  <p className="text-sm">Days</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox label="Total Days" value={ageData.totalDays} />
              <StatBox label="Total Hours" value={ageData.totalHours} />
              <StatBox label="Total Minutes" value={ageData.totalMinutes} />
              <StatBox label="Total Seconds" value={ageData.totalSeconds} />
            </div>

            {/* Next Birthday */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">🎂 Next Birthday</h2>
              <div className="flex justify-center gap-8 text-2xl font-bold">
                <div>
                  <p className="text-pink-600">{ageData.daysToGo}</p>
                  <p className="text-sm">Days to go</p>
                </div>
                <div>
                  <p className="text-purple-600">{ageData.nextAge}</p>
                  <p className="text-sm">Years old</p>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="flex flex-wrap gap-3 justify-center">
              <FunFact label={`You've lived ${ageData.weeksLived} weeks`} icon="⏱️" />
              <FunFact label={`Your heart has beaten ~${ageData.heartBeats.toLocaleString()} times`} icon="💓" />
              <FunFact label={`You've taken ~${ageData.breaths.toLocaleString()} breaths`} icon="🌬️" />
              <FunFact label={`You've experienced ${ageData.newYears} New Year's celebrations`} icon="🎉" />
              <FunFact label={`You've slept ~${ageData.hoursSlept.toLocaleString()} hours`} icon="🛌" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow-sm bg-white">
      <p className="text-lg font-bold">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function FunFact({ label, icon }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm text-sm font-medium">
      <span>{icon}</span>
      {label}
    </div>
  );
}
