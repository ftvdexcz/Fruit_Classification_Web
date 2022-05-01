const inputs = document.querySelector("#file-uploader");
const preview = document.querySelector(".preview");

inputs.style.opacity = 0;

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
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // $.ajax({
  //   url: "/image",
  //   contentType: "application/json;charset=utf-8",
  //   dataType: "json",
  //   type: "POST",
  //   data: JSON.stringify(data),
  //   success: function (response) {
  //     data = [];
  //     for (var i = 0; i < 6; i++) {
  //       if (i.toString() in response) data.push(response[i.toString()]);
  //       else data.push(0);
  //     }
  //     console.log(data);

  //     myChart.data.datasets[0].data = data;
  //     myChart.update();
  //   },
  //   error: function (error) {
  //     $("#wait-load").modal("hide");
  //     console.log(error);
  //   },
  // });
});
