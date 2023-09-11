document.querySelector("#button-second-modal").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
  document.querySelector("#modal2").style.display = "flex";
});

document.querySelector("#left-arrow").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "flex";
  document.querySelector("#modal2").style.display = "none";
});

document.querySelector("#close-first-modal").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#close-second-modal").addEventListener("click", () => {
  document.querySelector("#modal2").style.display = "none";
});

async function deleteWork (id) {
    return await fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}
 
function getModalArticles() {
  fetch("http://localhost:5678/api/works")
    .then(function (res) {
      return res.json();
    })
    .then(function (resultatAPI) {
      console.log(resultatAPI);
      const articles = resultatAPI;
      for (const article in articles) {
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = resultatAPI[article].categoryId;
        document.querySelector("#gallerie_modal").appendChild(figureElement);
        figureElement.classList.add("card_img");

        const ImgDiv = document.createElement("div");
        figureElement.appendChild(ImgDiv);
        ImgDiv.classList.add("travaux__img");

        const imageElement = document.createElement("img");
        ImgDiv.appendChild(imageElement);
        imageElement.src = resultatAPI[article].imageUrl;
        imageElement.alt = "Photo de " + resultatAPI[article].title;

        const imageFigcaption = document.createElement("figcaption");
        figureElement.appendChild(imageFigcaption);
        imageFigcaption.classList.add("title_img");
        imageFigcaption.innerHTML = "éditer";

        const trashElement = document.createElement('img')
        trashElement.src = './assets/icons/trash.svg';
        trashElement.classList.add('trash');

        trashElement.addEventListener('click', async () => {
            const response = await deleteWork(resultatAPI[article].id)
            console.log(response)

            if (response.status === 204) {
              // MEttre à jour ton HTML
              document.querySelector(".gallery").innerHTML = ""
              document.querySelector("#gallerie_modal").innerHTML = ""
              getArticles()
              getModalArticles()
            }
        })

        figureElement.appendChild(trashElement)
      }
    });
}

getModalArticles();
console.log(localStorage.getItem('token'))
