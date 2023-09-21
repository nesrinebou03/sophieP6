//filtrer les travaux//
function getArticles() {
    const filterButtonElement = document.createElement('li');
    filterButtonElement.classList.add('filtre');
    filterButtonElement.innerText = 'Tous';
    filterButtonElement.dataset.id = 0;
    //console.log('Filter button', filterButtonElement);
    document.querySelector('.categorie').appendChild(filterButtonElement);

    fetch("http://localhost:5678/api/categories")
    .then(function(res) {
        return res.json()
    })
    .then(function(resultatAPI){
            const articles = resultatAPI;
            articles.forEach(element => {
                const filterButtonElement = document.createElement('li');
                filterButtonElement.classList.add('filtre');
                filterButtonElement.innerText = element.name;
                filterButtonElement.dataset.id = element.id;
                //console.log('Filter button', filterButtonElement);
                document.querySelector('.categorie').appendChild(filterButtonElement);
            });
        
            Array.from(document.querySelectorAll('.filtre')).forEach(element => {
                //console.log('Dynamic element', element);
                element.addEventListener('click', (event) => {
                     event.preventDefault();
                    const categoryId = parseInt(event.target.dataset.id);
                    //console.log('Category id of event', categoryId);

                    Array.from(document.querySelectorAll('div.gallery > figure')).forEach(element => {
                        const elementCategoryId = parseInt(element.dataset.id);
                        //console.log('Figure Element', elementCategoryId);
                        if(categoryId === 0){
                            element.style.display = '';
                        }else{
                            if(elementCategoryId === categoryId){
                                element.style.display = '';
                            }else{
                                element.style.display = 'none';
                            }
                        }
                    });
                });
            });
    });


};
    

getArticles();
if (localStorage.getItem("token")){
    document.querySelector(".categorie").style.display = "none";
}