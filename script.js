const form = document.getElementById("leaveForm");
const leaveList = document.getElementById("leaveList");
const filterType = document.getElementById("filterType");

let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const employeeName = document.getElementById("employeeName").value;
  const leaveType = document.getElementById("leaveType").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const reason = document.getElementById("reason").value;

  if (new Date(fromDate) > new Date(toDate)) {
    alert("From Date cannot be after To Date");
    return;
  }

  const leave = {
    id: Date.now(),
    employeeName,
    leaveType,
    fromDate,
    toDate,
    reason,
    status: "Pending"
  };

  leaves.unshift(leave);
  localStorage.setItem("leaves", JSON.stringify(leaves));
  form.reset();
  renderLeaves();
});

filterType.addEventListener("change", renderLeaves);

function renderLeaves() {
  leaveList.innerHTML = "";

  const filteredLeaves =
    filterType.value === "All"
      ? leaves
      : leaves.filter(l => l.leaveType === filterType.value);

  filteredLeaves.forEach(leave => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${leave.employeeName}</strong><br/>
      Type: ${leave.leaveType}<br/>
      Date: ${leave.fromDate} → ${leave.toDate}<br/>
      Reason: ${leave.reason}<br/>
      Status: ${leave.status}<br/>
      <div class="actions">
        <button onclick="deleteLeave(${leave.id})">Delete</button>
      </div>
    `;
    leaveList.appendChild(li);
  });
}

function deleteLeave(id) {
  leaves = leaves.filter(l => l.id !== id);
  localStorage.setItem("leaves", JSON.stringify(leaves));
  renderLeaves();
}

renderLeaves();
