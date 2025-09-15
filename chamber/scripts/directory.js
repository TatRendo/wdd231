async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  const container = document.getElementById("membersContainer");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p><strong>Category:</strong> ${member.category}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>Email:</strong> ${member.email}</p>
    `;

    container.appendChild(card);
  });
}

document.getElementById("gridView").addEventListener("click", () => {
  document.getElementById("membersContainer").classList.add("grid-view");
  document.getElementById("membersContainer").classList.remove("list-view");
});

document.getElementById("listView").addEventListener("click", () => {
  document.getElementById("membersContainer").classList.add("list-view");
  document.getElementById("membersContainer").classList.remove("grid-view");
});

getMembers();
