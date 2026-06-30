let products = JSON.parse(localStorage.getItem("products")) || [];
let currentFilter = "all";

// نمایش منو
function render() {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";

  products
    .filter(p => currentFilter === "all" || p.category === currentFilter)
    .forEach(p => {
      menu.innerHTML += `
        <div class="card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.price} تومان</p>
          <small>${p.category}</small>
        </div>
      `;
    });
}

render();

// فیلتر
function filter(cat) {
  currentFilter = cat;
  render();
}

// پنل
function openAdmin() {
  let pass = prompt("رمز را وارد کنید:");
  if (pass === "4030") {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    alert("رمز اشتباه است");
  }
}

function closeAdmin() {
  document.getElementById("adminPanel").classList.add("hidden");
}

// افزودن محصول
function saveProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;
  let file = document.getElementById("image").files[0];

  let reader = new FileReader();
  reader.onload = function(e) {
    products.push({
      name,
      price,
      category,
      image: e.target.result
    });

    localStorage.setItem("products", JSON.stringify(products));
    render();
    alert("ثبت شد");
  };

  if (file) reader.readAsDataURL(file);
}

// رسانه‌ها
function saveMedia() {
  let logo = document.getElementById("logo").files[0];
  let video = document.getElementById("video").files[0];

  if (logo) {
    let r = new FileReader();
    r.onload = e => document.getElementById("logoPreview").src = e.target.result;
    r.readAsDataURL(logo);
  }

  if (video) {
    let v = new FileReader();
    v.onload = e => document.getElementById("adVideo").src = e.target.result;
    v.readAsDataURL(video);
  }

  alert("رسانه ثبت شد");
}
