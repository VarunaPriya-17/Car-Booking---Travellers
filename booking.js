document.addEventListener("DOMContentLoaded", () => {

  const bookingForm = document.getElementById("bookingForm");

  // Summary elements
  const route = document.getElementById("route");
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const carEl = document.getElementById("car");
  const kmEl = document.getElementById("km");
  const fareEl = document.getElementById("fare");

  // Get stored data
  const bookingData = {
    pickup: localStorage.getItem("pickup"),
    drop: localStorage.getItem("drop"),
    date: localStorage.getItem("date"),
    time: localStorage.getItem("time"),
    car: localStorage.getItem("car"),
    distance: localStorage.getItem("distance"),
    fare: localStorage.getItem("fare")
  };

  // Show summary
  route.innerText = `${bookingData.pickup} → ${bookingData.drop}`;
  dateEl.innerText = bookingData.date;
  timeEl.innerText = bookingData.time;
  carEl.innerText = bookingData.car;
  kmEl.innerText = bookingData.distance;
  fareEl.innerText = bookingData.fare;

  // BOOK NOW
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const booking = {
      ...bookingData,
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      pickupAddress: document.getElementById("pickupAddress").value.trim(),
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    if (!booking.name || !booking.mobile) {
      alert("Please fill required fields");
      return;
    }

    // Save to Firebase
    database.ref("bookings").push({
  name: name,
  mobile: mobile,
  pickup: pickup,
  drop: drop,
  createdAt: new Date().toISOString()
});

  });
});
database.ref("test").set({ status: "OK" });

// ✅ AUTO REDIRECT FUNCTION
function redirectToWhatsApp(data) {

  const adminNumber = "918675744425"; // 91 + number

  const message = `🚖 *New Cab Booking*

👤 Name: ${data.name}
📞 Mobile: ${data.mobile}
📍 Pickup: ${data.pickup}
📍 Drop: ${data.drop}
📅 Date: ${data.date}
⏰ Time: ${data.time}

🚘 Car: ${data.car}
📏 Distance: ${data.distance} KM
💰 Fare: ₹${data.fare}

📌 Pickup Address:
${data.pickupAddress}

Status: Pending`;

  // 🔥 THIS LINE AUTO OPENS WHATSAPP (NO BLOCK)
  window.location.href =
    `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
}
