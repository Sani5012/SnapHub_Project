document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".Form");
  const photographerTable = document.getElementById("photographerTable");
  const photographerTableBody = document.getElementById("photographerTableBody");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const photographerListSection = document.getElementById("photographerList");

    if(photographerList) {
      photographerListSection.scrollIntoView({ behavior: "smooth" });
    }

    const type1 = encodeURIComponent(document.getElementById("type1").value);
    const address1 = encodeURIComponent(document.getElementById("address1").value);

    if (type1.trim() === '' && address1.trim() === '') {
      alert("Please enter at least one search criterion.");
      return;
    }

    fetch(`/findPhotographersByTypeAndAddress?type=${type1}&address=${address1}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        photographerTable.style.display = "table";
        photographerTableBody.innerHTML = "";

        if (data.length > 0) {
          data.forEach((photographer) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td><a href="./portfolio.html">${photographer.name}</a></td>
              <td>${photographer.phoneNumber}</td>
              <td>${photographer.type}</td>
              <td>${photographer.address}</td>
              <td>${photographer.rating}</td>
              <td>${photographer.price}</td>
              `;
              photographerTableBody.appendChild(row);
          });
        } else {
          const noPhotographerRow = document.createElement("tr");
          noPhotographerRow.innerHTML = "<td colspan='6'>No donors found.</td>";
          photographerTableBody.appendChild(noPhotographerRow);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
})

