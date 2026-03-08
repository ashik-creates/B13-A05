let allIssues = [];

const showArrElement = (arr) => {
  const newArr = arr.map(
    (item) => `<div class="badge badge-sm text-sm ${
      item.toLowerCase() === "bug"
        ? "high"
        : item.toLowerCase() === "help wanted"
          ? "medium"
          : item.toLowerCase() === "enhancement"
            ? "next-eh"
            : item.toLowerCase() === "documentation"
              ? "low"
              : "next-la"
    } ">
      ${item.toUpperCase()}
    </div>`,
  );
  return newArr.join(" ");
};

document.getElementById("tabs-container").addEventListener("click", (event) => {
  const clickedBtn = event.target.closest(".tabs-btn");

  if (clickedBtn) {
    const allBtns = document.querySelectorAll(".tabs-btn");
    allBtns.forEach((btn) => {
      btn.classList.add("btn-second");
      btn.classList.remove("btn-first");
    });
    clickedBtn.classList.add("btn-first");
    clickedBtn.classList.remove("btn-second");
    if (clickedBtn.innerText.trim() === "All") {
      displayAllIssues(allIssues);
      issuesCount("all");
    } else if (clickedBtn.innerText.trim() === "Open") {
      issuesCount("open");
      let openIssues = allIssues.filter((item) => item.status === "open");

      displayAllIssues(openIssues);
    } else if (clickedBtn.innerText.trim() === "Closed") {
      let closedIssues = allIssues.filter((item) => item.status === "closed");

      issuesCount("closed");
      displayAllIssues(closedIssues);
    }
  }
});

function modalLoadingSpinner(status) {
  const modalContainer = document.getElementById("modal-container");
  const modalSpinner = document.getElementById("modal-loading-spinner");
  if (status) {
    modalContainer.classList.add("hidden");
    modalSpinner.classList.remove("hidden");
  } else {
    modalContainer.classList.remove("hidden");
    modalSpinner.classList.add("hidden");
  }
}

const loadIssueDetails = async (id) => {
  document.getElementById("issue_modal").showModal();
  modalLoadingSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayIssueDetails(data.data);
};

function displayIssueDetails(issue) {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
          <h2 class="text-3xl font-bold mb-4">${issue.title}</h2>
          
          <div class="flex items-center gap-3 text-sm text-gray-500 mb-6 flex-wrap">
            <div class="badge badge-lg rounded-full bg-green-500 text-white  font-medium">Opened</div>
            <span >•</span>
            <span>Opened by <span class="font-semibold text-gray-700">Fahim Ahmed</span></span>
            <span>•</span>
            <span>22/02/2026</span>
          </div>

          <div class="flex gap-2 mb-8">
            <div class="badge badge-lg high">
              BUG
            </div>
            <div class="badge badge-lg medium">
              HELP WANTED
            </div>
          </div>

          <p class="text-gray-500 text-lg mb-8">
            The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.
          </p>

          <div class=" rounded-2xl p-6 flex justify-between items-center mb-10">
            <div>
              <p class="text-gray-400 text-sm  mb-1 font-semibold">ASSIGNEE</p>
              <p class="font-bold 
               text-lg">Fahim Ahmed</p>
            </div>
            <div class="text-right">
              <p class="text-gray-400 text-sm  mb-1 font-semibold">PRIORITY</p>
              <div class="badge badge-lg high">HIGH</div>
            </div>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-first">
                Close
              </button>
            </form>
          </div>
  `;
  modalContainer.append(newDiv);
  modalLoadingSpinner(false);
}

const loadAllIssues = async () => {
  showLoadingSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  allIssues = data.data;
  displayAllIssues(allIssues);
  issuesCount("all");
};

function showLoadingSpinner(status) {
  const cardContainer = document.getElementById("card-container");
  const loadingContainer = document.getElementById("loading-spinner");

  if (status) {
    cardContainer.classList.add("hidden");
    loadingContainer.classList.remove("hidden");
  } else {
    cardContainer.classList.remove("hidden");
    loadingContainer.classList.add("hidden");
  }
}

function issuesCount(status) {
  const totalIssues = document.getElementById("total-issues");

  if (status === "all") {
    totalIssues.innerText = allIssues.length;
  } else if (status === "open") {
    let openIssues = allIssues.filter((item) => item.status === "open");

    totalIssues.innerText = openIssues.length;
  } else if (status === "closed") {
    let closedIssues = allIssues.filter((item) => item.status === "closed");

    totalIssues.innerText = closedIssues.length;
  }
}

function displayAllIssues(issues) {
  const issuesContainer = document.getElementById("card-container");
  issuesContainer.innerHTML = "";
  issues.forEach((item) => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div onclick="loadIssueDetails(${item.id})" class="shadow-lg border border-gray-100 ${item.status === "open" ? "high-border-top" : "low-border-top"} h-full hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col">
               <div class="card-upper p-3">
                <div class="card-head flex justify-between">
                  <div>
                      <img src="${item.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}">
                  </div>
                  <div class="badge badge-lg ${
                    item.priority === "high"
                      ? "high"
                      : item.priority === "low"
                        ? "low"
                        : "medium"
                  }">
                      ${item.priority.toUpperCase()}
                  </div>
                
                </div> 
                <div class="card-middle space-y-4 grow">
                    <div class="pt-2 space-y-1">
                        <h2 class="font-semibold text-lg">
                            ${item.title}
                        </h2>
                        <p class="text-sm text-gray-500 line-clamp-2">
                            ${item.description}
                        </p>
                    </div>
                    <div id="card-badges" class="flex justify-start items-center flex-wrap gap-1">
                        ${showArrElement(item.labels)}
                    </div>
                </div>
               </div>
                
                <div class="card-lower mt-auto">
                  <hr class="text-gray-200 mb-4 ">
                  <div class="p-3"> 
                    <p class="text-gray-500">
                    #${item.id} by ${item.author}
                    </p>
                    <p class="text-gray-500">
                      ${new Date(item.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
            </div>
    `;
    issuesContainer.appendChild(newCard);
  });
  showLoadingSpinner(false);
}

loadAllIssues();
