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
  }
});
