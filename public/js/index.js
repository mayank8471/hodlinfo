const timerElement = document.getElementById('timer');
let timeLeft = 60;

const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    timeLeft = 60
    timerElement.textContent = "60";
    fetched()
    location.reload();
  }
}, 1000);


function fetched() {
  fetch("http://localhost:4000/get-all-books")
    .then(res => res.json())
    .then((result) => {
      console.log(result)

      const { data } = result
      data.map((e, i) => {

        const parentdiv = document.getElementById("details1")
        const div = document.createElement("div")
        div.className = "details-row-second"
        div.id = `pid${i}`
        parentdiv.appendChild(div)

        const elements = document.getElementById(`pid${i}`)
        const p_sn = document.createElement("p")
        const p_name = document.createElement("p")
        const p_last = document.createElement("p")
        const p_buy = document.createElement("p")
        const volume = document.createElement("p")
        const base_unit = document.createElement("p")
        p_sn.textContent = i + 1
        p_name.textContent = e.name
        p_last.textContent = `₹ ${e.last}`
        p_buy.textContent = `₹ ${e.buy}/ ₹ ${e.sell}`
        volume.textContent = `₹ ${e.volume}`
        base_unit.textContent = e.base_unit
        elements.appendChild(p_sn)
        elements.appendChild(p_name)
        elements.appendChild(p_last)
        elements.appendChild(p_buy)
        elements.appendChild(volume)
        elements.appendChild(base_unit)

      })

    })
}
fetched()
const selected = document.getElementById("myselect")
const btn = document.getElementById("btn_buy")
selected.addEventListener("change", () => {
  btn.textContent = `BUY ${selected.value}`
})

const toggleSwitch = document.getElementById('mode-toggle');
const body = document.body;

// Function to toggle the mode
function switchMode() {
  if (toggleSwitch.checked) {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  }
}

// Event listener for the slider toggle
toggleSwitch.addEventListener('change', switchMode);

// Set default mode to dark mode on page load
body.classList.add('dark-mode');