//recuperer les travaux//
function main () {
    getArticles();
}
main ();
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
              ImgDiv.classList.add("travaux_img");

              const imageElement = document.createElement("img");        
              ImgDiv.appendChild(imageElement);
              imageElement.src =  resultatAPI [article].imageUrl;
              imageElement.alt = ("Photo de ") + resultatAPI[article].title;
              
              const imageFigcaption = document.createElement("figcaption");
              figureElement.appendChild(imageFigcaption);
              imageFigcaption.classList.add("title_img");
              imageFigcaption.innerHTML = resultatAPI [article].title;
       
           } }) };
           
//changement pour mode admin         

let token = localStorage.getItem("token");

const logout = () => {
  localStorage.removeItem('token');
  location.reload();
}

if (localStorage.getItem("token")) {
  let tableauId = [];
  document.getElementById("login").innerText = "logout";
  document.getElementById("modifier").style.backgroundColor= "black";
  document.querySelector('.admin-panel').style.display = 'flex';

  document.getElementById("login").addEventListener('click', (e) => {
    e.preventDefault()
    logout()
  })

  const modifier = `
  <div id= "modifier">
  <i class="fa-regular fa-pen-to-square"></i>
  <p>modifier</p> 
   </div>`;
   
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

document.querySelector('#button-first-modal').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#modal').style.display = 'flex';
})
} else {
  document.getElementById("login").innerText = "login";
  document.getElementById("modifier").style.display= "none";
  document.querySelector('.admin-panel').style.display = 'none';
};





