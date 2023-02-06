// All News Onload Event Handler
const url = `https://openapi.programming-hero.com/api/news/categories`;
const allCategory = async () =>{
   try{
    const res = await fetch(url);
    const data = await res.json();

    // Navigation Bar Showing
    const newsData = data.data.news_category;
    const list = document.getElementById('navSection');
    newsData.forEach(element=>{
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item','navLi');
      listItem.setAttribute('role', 'presentation');
      listItem.innerHTML = `
      <button class="nav-link" onclick="loadNews('${element.category_id}')" type="button" role="tab">${element.category_name}</button>
      `;
      list.appendChild(listItem);
      toggleSpinner(false);
    });
   }
   catch(error){
    console.log(error);
   }
}

//load news API CALLING
const loadNews = async (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayShowNews(data.data);
};

const displayShowNews = (newsAll) => {
  const newsAllContainer = document.getElementById("news-container");
  newsAllContainer.textContent = ``;
  const itemCount = document.getElementById("item-count");
  itemCount.classList.add("item-count",'container');
  if(newsAll.length > 0){
    itemCount.innerText = newsAll.length + ' item found';
    toggleSpinner(false);
  }else{
    itemCount.innerText =  'No result Found';
    toggleSpinner(false);
  }
  // Viewing Sorted
  newsAll.sort(compare);
  
  for(const news of newsAll){
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
    <div class="col-md-4">
    <img src="${news.thumbnail_url}" class=" rounded w-100 h-100 py-3" alt="...">
    </div>
    <div class="col-md-8">
    <div class="card-body pt-4">
      <h5 class="card-title">${news.title}</h5>
      <p class="card-text">${news.details}</p>
      <div class="d-flex pt-5 justify-content-between">
        <div class="author-details">
          <img class="rounded-circle" src="${news.author.img}" alt="">
          <span class="text-primary">${news.author.name ? news.author.name : "not found"}</span>
        </div>
        <div class="view pt-4">
          <i class="fa-solid fa-eye"></i>
          <span class="text-primary">${news.total_view ? news.total_view : "no view"}</span>
          <i class="fa-solid fa-star"></i>
          <span> ${news.rating.number}</span>
        </div>
        <div class="readMore pt-3">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary detailsBtn" onclick="detailsLoad('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Read Details
            </button> 
        </div>
      </div>
    </div>
  </div>
    `;
    newsAllContainer.appendChild(div);
    toggleSpinner(false);
  }
};
// Toggle Spinner
const toggleSpinner = isLoader =>{
  const loaders = document.getElementById('loader');
  if(isLoader){
    loaders.classList.remove('d-none');
  }
  else{
    loaders.classList.add('d-none');
  }
};

// Details loading Api Call
const detailsLoad = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  detailsNewsShows(data.data[0]);
};
// Details Display showing
const detailsNewsShows = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("exampleModalLabel");
  // modalTitle.innerText = news[0].author.published_date
  modalTitle.innerText = news.author.name ? news.author.name:'no name found';
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
        <img class="fluid w-50 rounded-5" src="${news.author.img}" alt="" />
    `;
};

// Compare Most Viewing This Showing item
const compare =(a,b)=>{
  if(a.total_view < b.total_view){
    return 1 ;
  }
  else if(a.total_view > b.total_view) return -1;
  return 0;
}