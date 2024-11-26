// localStorage.setItem("name", "Medina");
// sessionStorage.setItem("hobby", "drawing");

const photos = document.querySelector("#photos");

async function fetchPhotos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await res.json();

    data.splice(0, 21).forEach((photo) => {
      const photoElement = document.createElement("div");
      photoElement.innerHTML = `
            <div class='w-[300px] shadow-2xl'>
                <img src=${photo.url} class='w-[300px] rounded-[50px]'>
                <p class='text-xl font-bold'>${photo.title}</p>
                <button id='add-to-cart' class='border py-[5px] w-full font-bold hover:bg-gray-400 hover:text-white'>добавить в корзину</button>
            </div>
        `;

      const button = photoElement.querySelector("#add-to-cart");
      button.addEventListener("click", () => addToCard(photo));
      photos.appendChild(photoElement);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function addToCard(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  setTimeout(() => {
    alert("Товар успешно добавлен в корзину");
  }, 1000);
}

fetchPhotos();
