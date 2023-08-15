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

                
 let token = localStorage.getItem("token");
  localStorage.removeItem("id");

if (localStorage.getItem("token")) {
  let tableauId = [];
  document.getElementById("login").innerText = "logout";  
};

