function loadTrips() {
  const phone = document.getElementById("driverPhone").value;
  if (!phone) {
    alert("Enter driver phone number");
    return;
  }

  const tripList = document.getElementById("tripList");
  tripList.innerHTML = "";

  firebase.database().ref("bookings").on("value", snapshot => {
    tripList.innerHTML = "";

    snapshot.forEach(child => {
      const b = child.val();
      const id = child.key;

      if (b.driverPhone === phone && b.status === "Accepted") {

        tripList.innerHTML += `
        <div class="card shadow mb-3">
          <div class="card-body">

            <h5>${b.pickup} → ${b.drop}</h5>
            <p>
              <b>Date:</b> ${b.date} ${b.time}<br>
              <b>Fare:</b> ₹${b.fare}<br>
              <b>Status:</b> ${b.tripStatus || "Not Started"}
            </p>

            <div class="d-flex gap-2">
              <button class="btn btn-success"
                onclick="startTrip('${id}')">
                Start Trip
              </button>

              <button class="btn btn-danger"
                onclick="endTrip('${id}')">
                End Trip
              </button>

              <button class="btn btn-primary"
                onclick="whatsappCustomer('${b.mobile}', '${b.pickup}', '${b.drop}')">
                WhatsApp Customer
              </button>
            </div>

          </div>
        </div>`;
      }
    });
  });
}

function startTrip(id) {
  firebase.database().ref("bookings/" + id).update({
    tripStatus: "Started"
  });
}

function endTrip(id) {
  firebase.database().ref("bookings/" + id).update({
    tripStatus: "Completed",
    status: "Completed"
  });
}

function whatsappCustomer(mobile, pickup, drop) {
  const msg = `
🚖 Your cab has started

📍 Route: ${pickup} → ${drop}
Please be ready.
`;
  window.open(`https://wa.me/91${mobile}?text=${encodeURIComponent(msg)}`);
}
