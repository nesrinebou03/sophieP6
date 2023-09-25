document.querySelector("#button-second-modal").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
  document.querySelector("#modal2").style.display = "flex";
});

document.querySelector("#left-arrow").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "flex";
  document.querySelector("#modal2").style.display = "none";
  resetForm()
});

document.querySelector("#close-first-modal").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});

document.querySelector("#close-second-modal").addEventListener("click", () => {
  resetForm()
  document.querySelector("#modal2").style.display = "none";
});
 
//autorisation de supprimer les travaux
async function deleteWork (id) {
    return await fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}
 //recuperer les travaux dans la modale 1
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
//
        const imageFigcaption = document.createElement("figcaption");
        figureElement.appendChild(imageFigcaption);
        imageFigcaption.classList.add("title_img");
        imageFigcaption.innerHTML = "éditer";
//ajouter l'icon de supprimer (trash)
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

//ajouter une image (btn ajouter une image sur la 2eme modal)

document.querySelector("#image_input").addEventListener("change", (event) => {

  const image = document.createElement('img');
  image.src = URL.createObjectURL(event.target.files[0]);
  image.alt = 'fichier temporaire du formulaire';
  document.querySelector("#telecharger-photo").style.display = "flex";
  document.querySelector("#telecharger-photo").appendChild(image);
  document.querySelector(".photo").style.display = "none";
  document.querySelector("#ajou_ter").style.display = "none";
  document.querySelector("#modal_ajoute_content > p").style.display = "none";

});

const formWork = document.querySelector('#form-work');

//autorisation pour transmettre nouvelle image et l'afficher
const postWork = async(data) => {
  return await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: data
  })
}
//reset ce cadre de telecharger photo comme avant le telechargement
const resetForm = () => {
  formWork.reset()
  document.querySelector("#telecharger-photo").style.display = "none";
  if (document.querySelector("#telecharger-photo > img")) {

    document.querySelector("#telecharger-photo > img").remove()
  }
  document.querySelector(".photo").style.display = "block";
  document.querySelector("#ajou_ter").style.display = "block";
  document.querySelector("#modal_ajoute_content > p").style.display = "block";
}
//il faut remplir les 3 conditions pour valider 
formWork.addEventListener('change', () => {
  const imgValue = document.querySelector("#image_input").files.length
  const titleValue = document.querySelector("#title_input").value
const categoryValue = document.querySelector("#Catégorie").value

  if (imgValue > 0 && titleValue !== '' && categoryValue !== '') {
    document.querySelector('#button_valider').removeAttribute('disabled')
   document.querySelector('#button_valider').classList.add('active')
  } else {
    document.querySelector('#button_valider').setAttribute('disabled', '')
    document.querySelector('#button_valider').classList.remove('active')
  }
})
//l'envoi sur la 1er modal et page vstr apres la creation de travaux et la validation
formWork.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData(formWork)

  const response = await postWork(data)
  console.log(response);

  if (response.status === 201) {
    document.querySelector(".gallery").innerHTML = ""
    document.querySelector("#gallerie_modal").innerHTML = ""
    getArticles()
    getModalArticles()
    resetForm()
    document.querySelector("#modal").style.display = "flex";
    document.querySelector("#modal2").style.display = "none";
  }

})