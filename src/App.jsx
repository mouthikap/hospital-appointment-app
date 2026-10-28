
import React, { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState(
    "Dr. Suresh (Dermatologist)"
  );

  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date().getDate()
  );

  const [timePeriod, setTimePeriod] = useState("Morning");
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [bookedCard, setBookedCard] = useState(null);
  const [activePage, setActivePage] = useState("Home");

  const morningSlots = [
    "09:00 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM"
  ];

  const afternoonSlots = [
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM"
  ];

  const timeSlots =
    timePeriod === "Morning" ? morningSlots : afternoonSlots;

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Monday is the first day of the calendar week.
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  const calendarDays = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const changeMonth = (direction) => {
    const nextMonth = new Date(year, month + direction, 1);

    setCurrentMonth(nextMonth);
    setSelectedDate(1);
    setBookedCard(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setIsLoggedIn(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!patientName.trim()) {
      alert("Please enter the patient name.");
      return;
    }

    const appointmentDate = new Date(year, month, selectedDate);

    const newAppointment = {
      tokenNumber: Math.floor(1000 + Math.random() * 9000),
      patientName: patientName.trim(),
      doctorName,
      appDate: appointmentDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      selectedSlot: selectedTime
    };

    setBookedCard(newAppointment);
    alert("Appointment saved successfully!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setBookedCard(null);
    setActivePage("Home");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#edf2f7",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
      color: "#1e293b",
      boxSizing: "border-box"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "20px",
      padding: "28px",
      boxShadow: "0 10px 35px rgba(0,0,0,0.06)"
    },
    button: {
      padding: "11px 15px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      cursor: "pointer",
      fontSize: "14px"
    },
    primaryButton: {
      padding: "14px",
      width: "100%",
      background: "#0284c7",
      color: "#fff",
      border: "none",
      borderRadius: "9px",
      fontWeight: "bold",
      fontSize: "15px",
      cursor: "pointer"
    },
    input: {
      width: "100%",
      padding: "11px",
      marginTop: "6px",
      boxSizing: "border-box",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "14px"
    },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: "bold",
      color: "#64748b",
      marginTop: "16px"
    }
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div style={styles.page}>
        <div
          style={{
            maxWidth: "420px",
            margin: "65px auto",
            padding: "35px",
            borderRadius: "18px",
            background: "#fff",
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ textAlign: "center", fontSize: "48px" }}>
            🏥
          </div>

          <h2 style={{ textAlign: "center", color: "#0284c7" }}>
            Healthcare Login Portal
          </h2>

          <p style={{ textAlign: "center", color: "#64748b" }}>
            Welcome! Sign in to book your appointment.
          </p>

          <form onSubmit={handleLoginSubmit}>
            <label style={styles.label}>EMAIL ADDRESS</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label style={styles.label}>PASSWORD</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              style={{ ...styles.primaryButton, marginTop: "24px" }}
            >
              Login
            </button>
          </form>

          <p
            style={{
              fontSize: "12px",
              textAlign: "center",
              color: "#94a3b8",
              marginTop: "20px"
            }}
          >
            Demo login: enter any valid email and password.
          </p>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* NAVIGATION BAR */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
            marginBottom: "28px"
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                background: "#e0f2fe",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "25px"
              }}
            >
              🏥
            </div>

            <div>
              <strong style={{ fontSize: "21px" }}>Healthcare</strong>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Medical Clinic
              </div>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap"
            }}
          >
            {["Home", "Appointments", "Medications", "Documents"].map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  style={{
                    ...styles.button,
                    background:
                      activePage === page ? "#e0f2fe" : "#fff",
                    color:
                      activePage === page ? "#0369a1" : "#64748b",
                    borderColor:
                      activePage === page ? "#7dd3fc" : "#fff"
                  }}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={handleLogout}
              style={{
                ...styles.button,
                background: "#ef4444",
                color: "#fff",
                borderColor: "#ef4444"
              }}
            >
              Logout
            </button>
          </nav>
        </header>

        {/* WELCOME BANNER */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "14px",
            padding: "18px 22px",
            marginBottom: "28px"
          }}
        >
          <h3 style={{ color: "#166534", margin: "0 0 8px" }}>
            Your Health, Our Priority
          </h3>
          <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
            Welcome, {email}. Manage your appointments with ease.
          </p>
        </div>

        {/* HOME PAGE */}
        {activePage === "Home" && (
          <>
            <h2 style={{ marginTop: 0 }}>Make an Appointment</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1fr)",
                gap: "30px"
              }}
            >
              {/* PATIENT AND DOCTOR DETAILS */}
              <section>
                <h3 style={{ fontSize: "17px" }}>Patient Information</h3>

                <form onSubmit={handleBookingSubmit}>
                  <label style={styles.label}>PATIENT NAME</label>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />

                  <label style={styles.label}>SELECT DOCTOR</label>
                  <select
                    style={styles.input}
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  >
                    <option value="Dr. Suresh (Dermatologist)">
                      Dr. Suresh (Dermatologist)
                    </option>
                    <option value="Dr. Ramesh (Cardiologist)">
                      Dr. Ramesh (Cardiologist)
                    </option>
                    <option value="Dr. Anitha (Pediatrician)">
                      Dr. Anitha (Pediatrician)
                    </option>
                  </select>

                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "15px",
                      marginTop: "25px"
                    }}
                  >
                    <strong>Booking Steps</strong>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      1. Enter patient details
                    </p>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      2. Select date and time
                    </p>
                    <p style={{ fontSize: "13px", color: "#64748b" }}>
                      3. Confirm appointment
                    </p>
                  </div>

                  {/* CALENDAR AND SLOT SELECTION ARE TO THE RIGHT.
                      THIS BUTTON SUBMITS THE FORM. */}
                  <button
                    type="submit"
                    style={{ ...styles.primaryButton, marginTop: "20px" }}
                  >
                    Confirm Appointment
                  </button>
                </form>
              </section>

              {/* CALENDAR AND TIME SLOTS */}
              <section style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: "19px", marginTop: 0 }}>
                  Choose Date & Time
                </h3>

                {/* CALENDAR */}
                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "18px",
                    maxWidth: "450px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "18px"
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => changeMonth(-1)}
                      style={styles.button}
                    >
                      ‹
                    </button>

                    <strong>{monthName}</strong>

                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => changeMonth(1)}
                      style={styles.button}
                    >
                      ›
                    </button>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                      gap: "5px",
                      textAlign: "center"
                    }}
                  >
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                      (day) => (
                        <div
                          key={day}
                          style={{
                            fontSize: "10px",
                            fontWeight: "bold",
                            color: "#64748b",
                            padding: "8px 0"
                          }}
                        >
                          {day}
                        </div>
                      )
                    )}

                    {calendarDays.map((day, index) =>
                      day === null ? (
                        <div key={`empty-${index}`} />
                      ) : (
                        <button
                          type="button"
                          key={day}
                          onClick={() => {
                            setSelectedDate(day);
                            setBookedCard(null);
                          }}
                          style={{
                            padding: "10px 0",
                            border: "none",
                            borderRadius: "50%",
                            background:
                              selectedDate === day ? "#0284c7" : "#fff",
                            color:
                              selectedDate === day ? "#fff" : "#1e293b",
                            fontWeight:
                              selectedDate === day ? "bold" : "normal",
                            cursor: "pointer"
                          }}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* TIME PERIOD BUTTONS */}
                <h3 style={{ fontSize: "17px", marginTop: "25px" }}>
                  Available Time Slots
                </h3>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Morning", "Afternoon"].map((period) => (
                    <button
                      type="button"
                      key={period}
                      onClick={() => {
                        setTimePeriod(period);
                        setSelectedTime(
                          period === "Morning" ? morningSlots[0] : afternoonSlots[0]
                        );
                        setBookedCard(null);
                      }}
                      style={{
                        ...styles.button,
                        background:
                          timePeriod === period ? "#0284c7" : "#fff",
                        color: timePeriod === period ? "#fff" : "#0284c7",
                        borderColor: "#0284c7"
                      }}
                    >
                      {period === "Morning" ? "☀️" : "🌤️"} {period}
                    </button>
                  ))}
                </div>

                {/* TIME SLOT BUTTONS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    gap: "10px",
                    marginTop: "15px"
                  }}
                >
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => {
                        setSelectedTime(slot);
                        setBookedCard(null);
                      }}
                      style={{
                        ...styles.button,
                        background:
                          selectedTime === slot ? "#e0f2fe" : "#fff",
                        color:
                          selectedTime === slot ? "#0369a1" : "#334155",
                        borderColor:
                          selectedTime === slot ? "#0284c7" : "#cbd5e1",
                        fontWeight:
                          selectedTime === slot ? "bold" : "normal"
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                {/* SUMMARY */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "18px",
                    marginTop: "25px",
                    lineHeight: 1.8
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Appointment Summary</h3>
                  <p>
                    <strong>Patient:</strong>{" "}
                    {patientName || "Not entered"}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {doctorName}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(year, month, selectedDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }
                    )}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                </div>
              </section>
            </div>
          </>
        )}

        {/* APPOINTMENTS PAGE */}
        {activePage === "Appointments" && (
          <section>
            <h2>My Appointments</h2>

            {bookedCard ? (
              <div
                style={{
                  padding: "22px",
                  border: "1px solid #bbf7d0",
                  borderRadius: "14px",
                  background: "#f0fdf4"
                }}
              >
                <h3 style={{ color: "#166534" }}>
                  Appointment #{bookedCard.tokenNumber}
                </h3>
                <p><strong>Patient:</strong> {bookedCard.patientName}</p>
                <p><strong>Doctor:</strong> {bookedCard.doctorName}</p>
                <p><strong>Date:</strong> {bookedCard.appDate}</p>
                <p><strong>Time:</strong> {bookedCard.selectedSlot}</p>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Cancel this appointment?")) {
                      setBookedCard(null);
                      alert("Appointment cancelled.");
                    }
                  }}
                  style={{
                    ...styles.button,
                    background: "#ef4444",
                    color: "#fff",
                    borderColor: "#ef4444"
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <p style={{ color: "#64748b" }}>
                No appointments booked yet. Go to Home to book an appointment.
              </p>
            )}
          </section>
        )}

        {/* MEDICATIONS PAGE */}
        {activePage === "Medications" && (
          <section>
            <h2>Medications</h2>
            <p style={{ color: "#64748b" }}>
              No medication records are available in this demo.
            </p>
          </section>
        )}

        {/* DOCUMENTS PAGE */}
        {activePage === "Documents" && (
          <section>
            <h2>Documents</h2>
            <p style={{ color: "#64748b" }}>
              No documents have been uploaded in this demo.
            </p>
          </section>
        )}

        {/* CONFIRMATION CARD */}
        {bookedCard && activePage === "Home" && (
          <div
            style={{
              marginTop: "30px",
              padding: "24px",
              border: "1px solid #86efac",
              borderRadius: "16px",
              background: "#f0fdf4"
            }}
          >
            <h2 style={{ color: "#166534", marginTop: 0 }}>
              ✓ Appointment Confirmed!
            </h2>

            <p>Your appointment has been created in this demo.</p>

            <div
              style={{
                background: "#fff",
                padding: "18px",
                borderRadius: "10px",
                lineHeight: 1.8
              }}
            >
              <p>
                <strong>Token Number:</strong> {bookedCard.tokenNumber}
              </p>
              <p>
                <strong>Patient:</strong> {bookedCard.patientName}
              </p>
              <p>
                <strong>Doctor:</strong> {bookedCard.doctorName}
              </p>
              <p>
                <strong>Date:</strong> {bookedCard.appDate}
              </p>
              <p>
                <strong>Time:</strong> {bookedCard.selectedSlot}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setBookedCard(null)}
              style={{ ...styles.button, marginTop: "15px" }}
            >
              Close Confirmation
            </button>
          </div>
        )}

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "35px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px"
          }}
        >
          © {new Date().getFullYear()} Healthcare Medical Clinic.
          All rights reserved.
        </footer>
      </div>
    </div>
  );
}
