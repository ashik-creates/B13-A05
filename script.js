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

const loadAllIssues = async () => {
  showLoadingSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data.length);
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
  console.log(status);
  const totalIssues = document.getElementById("total-issues");
  console.log(totalIssues);
  if (status === "all") {
    console.log(allIssues.length);
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
    <div class="shadow-lg border border-gray-100 ${item.status === "open" ? "high-border-top" : "low-border-top"} h-full hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col">
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
