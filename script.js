let allIssues = [];

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
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data.length);
  allIssues = data.data;
  displayAllIssues(allIssues);
  issuesCount("all");
};

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
    <div class="shadow-lg border border-gray-100 ${item.status === "open" ? "high-border-top" : "low-border-top"} space-y-4">
               <div class="card-upper p-3">
                <div class="card-head flex justify-between">
                  <div>
                      <img ${item.status === "open" ? "src='./assets/Open-Status.png'" : "src='./assets/Closed-Status.png'"} alt="">
                  </div>
                  <div class="badge badge-lg high">
                      HIGH
                  </div>
                
                </div> 
                <div class="card-middle space-y-2">
                    <div class="pt-2 space-y-1">
                        <h2 class="font-semibold text-lg">
                            Fix navigation menu on mobile devices
                        </h2>
                        <p class="text-sm text-gray-500 line-clamp-2">
                            The navigation menu doesn't collapse properly on mobile devices
                        </p>
                    </div>
                    <div id="card-badges" class="flex justify-start gap-1">
                        <div class="badge badge-lg ">
                            Bug
                        </div>
                        <div class="badge badge-lg ">
                            Help wanted
                        </div>
                    </div>
                </div>
               </div>
                <hr class="text-gray-200">
                <div class="card-lower p-3">
                  <p class="text-gray-500">
                    #1 by john_doe
                  </p>
                  <p class="text-gray-500">
                    1/15/2024
                  </p>
                </div>
            </div>
    `;
    issuesContainer.appendChild(newCard);
  });
}

loadAllIssues();
