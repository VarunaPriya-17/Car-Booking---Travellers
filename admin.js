const bookingList = document.getElementById("bookingList");

firebase.database().ref("bookings").on("value", snapshot => {
  bookingList.innerHTML = "";

  snapshot.forEach(child => {
    const b = child.val();
    const id = child.key;

    bookingList.innerHTML += `
    <div class="card shadow mb-3">
      <div class="card-body">

        <h5>${b.pickup} → ${b.drop}</h5>
        <p>
          <b>Name:</b> ${b.name} <br>
          <b>Mobile:</b> ${b.mobile} <br>
          <b>Car:</b> ${b.car} <br>
          <b>Date:</b> ${b.date} ${b.time} <br>
          <b>Distance:</b> ${b.distance} KM <br>
          <b>Fare:</b> ₹${b.fare}
        </p>

        <span class="badge bg-${b.status === "Accepted" ? "success" :
          b.status === "Rejected" ? "danger" : "warning"}">
          ${b.status}
        </span>

        <hr>

        <input type="text" class="form-control mb-2"
          placeholder="Driver Name"
          id="driverName-${id}">

        <input type="text" class="form-control mb-2"
          placeholder="Driver Phone"
          id="driverPhone-${id}">

        <div class="d-flex gap-2">
          <button class="btn btn-success"
            onclick="acceptBooking('${id}')">
            Accept
          </button>

          <button class="btn btn-danger"
            onclick="rejectBooking('${id}')">
            Reject
          </button>

          <button class="btn btn-primary"
            onclick="sendCustomer('${b.mobile}', '${b.pickup}', '${b.drop}', '${b.car}', '${b.date}', '${b.time}')">
            WhatsApp Customer
          </button>
        </div>

      </div>
    </div>`;
  });
});

function acceptBooking(id) {
  const name = document.getElementById(`driverName-${id}`).value;
  const phone = document.getElementById(`driverPhone-${id}`).value;

  if (!name || !phone) {
    alert("Enter driver details");
    return;
  }

  firebase.database().ref("bookings/" + id).update({
    status: "Accepted",
    driverName: name,
    driverPhone: phone
  });

  sendDriver(phone, name);
}

function rejectBooking(id) {
  firebase.database().ref("bookings/" + id).update({
    status: "Rejected"
  });
}

function sendCustomer(mobile, pickup, drop, car, date, time) {
  const msg = `
🚕 Your Cab Booking Confirmed

📍 ${pickup} → ${drop}
🚘 Car: ${car}
📅 ${date}
⏰ ${time}

Thank you for choosing us!
`;

  window.open(`https://wa.me/91${mobile}?text=${encodeURIComponent(msg)}`);
}

function sendDriver(phone, name) {
  const msg = `
🚖 New Trip Assigned

Driver: ${name}
Please check admin panel for details.
`;

  window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`);
}
