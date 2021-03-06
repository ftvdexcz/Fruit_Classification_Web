const inputs = document.querySelector("#file-uploader");
const preview = document.querySelector(".preview");
const select_btn = document.querySelectorAll(".fruit");
const img_container = document.querySelector(".img-container");
let response_data = {};

inputs.style.opacity = 0;

const display_image = function (id) {
  if (response_data[id].length > 0) {
    response_data[id].forEach((img_path) => {
      html = `<div class="img"><img src="static/${img_path}" alt=""></div>`;
      console.log(html);
      img_container.insertAdjacentHTML("afterbegin", html);
    });
  }
};

inputs.addEventListener("change", (event) => {
  const files = event.target.files;
  preview.textContent = `${files.length} files selected`;
  data = {
    img: [],
  };

  Object.keys(files).forEach((key) => {
    data.img.push(files[key].name);
  });
  console.log(data);

  fetch("http://127.0.0.1:5000/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success: ", data);
      response_data = data;
      const chart_data = Object.keys(data).map((key) => data[key].length);
      img_container.innerHTML = "";
      myChart.data.datasets[0].data = chart_data;
      myChart.update();
      display_image(document.querySelector(".selected").id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

for (let btn of select_btn) {
  btn.addEventListener("click", function (e) {
    if (e.target != document.querySelector(".selected")) {
      img_container.innerHTML = "";
      document.querySelector(".selected").classList.remove("selected");
      btn.classList.add("selected");

      display_image(document.querySelector(".selected").id);
    }
  });
}
