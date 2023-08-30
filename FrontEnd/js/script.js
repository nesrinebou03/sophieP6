//recuperer les travaux//
main ();
function main () {
    getArticles();
}
function getArticles () {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        return res.json()
    })
    .then(function(resultatAPI){
        console.log(resultatAPI)  
            const articles = resultatAPI;
            for (const article in articles) {
              const figureElement = document.createElement("figure");
              figureElement.dataset.id = resultatAPI[article].categoryId;
              document.querySelector(".gallery").appendChild(figureElement);
              figureElement.classList.add("card_img");
            
              const ImgDiv = document.createElement("div");
              figureElement.appendChild(ImgDiv);
              ImgDiv.classList.add("travaux__img");

              const imageElement = document.createElement("img");        
              ImgDiv.appendChild(imageElement);
              imageElement.src =  resultatAPI [article].imageUrl;
              imageElement.alt = ("Photo de ") + resultatAPI[article].title;
              
              const imageFigcaption = document.createElement("figcaption");
              figureElement.appendChild(imageFigcaption);
              imageFigcaption.classList.add("title_img");
              imageFigcaption.innerHTML = resultatAPI [article].title;
       
           } }) };

    //changement dans la page visiteur pour l'admin//           
 let token = localStorage.getItem("token");
  

if (localStorage.getItem("token")) {
  let tableauId = [];
  document.getElementById("login").innerText = "logout";
  document.getElementById("modifier").style.backgroundColor= "black";
  document.querySelector('.admin-panel').style.display = 'flex'
  const edition = document.createElement("p");
  edition.type = "button";
  const modification = `
  <div>
  <i class="fa-regular fa-pen-to-square"></i>
  <p>Mode édition</p>  </div>`;
  
  edition.insertAdjacentHTML("afterbegin", modification);
  edition.className = "edition";
  const modifier = `
<div id= "modifier">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;
const modifier_model = `
<a href ="#modal" id="button-first-modal">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>
</a>
`;



document.getElementById("travaux")
.insertAdjacentHTML("afterend", modifier_model);
document.getElementById("introduction_article")
.insertAdjacentHTML("afterbegin", modifier);
document.getElementById("introduction_photo")
.insertAdjacentHTML("beforeend", modifier);



document.querySelector('#button-first-modal').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#modal').style.display = 'flex';
})

};




