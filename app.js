console.clear()

// Category fetch 
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>loadCategory(data.categories)); // call loadCategory function

    
function loadCategory(catObj){
    let categoryContainer =document.getElementById("category-container")
    // get obj one by one with loop append category container in html
    for(i=0; i<catObj.length; i++){
        categoryContainer.innerHTML += 
        `<button id="btn-id-${catObj[i].category_id}" onclick="catID(${catObj[i].category_id})" class="btn hover:bg-red-500 hover:text-white">${catObj[i].category}</button>`;
    }
}

// show data by category and set active class of category
function catID(catId){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${catId}`)
        .then((res)=>res.json())
        .then((data)=>{
            loadContent(data.category);
            removeActiveClass()
            // set active class of category
            const addActiveClass = document.getElementById(`btn-id-${catId}`)
            addActiveClass.classList.add("active")
        })
}   
// remove active class from category
function removeActiveClass(){
    const activeBtnList = document.getElementsByClassName("active")
    for(let getBtn of activeBtnList){
        getBtn.classList.remove("active")
    }
}

    


// fetch all content, if click fetchContent from html of category all
function fetchContent(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response)=>response.json())
    .then((contentData)=>loadContent(contentData.videos))// call loadContent function
    removeActiveClass()
    const addActiveClass = document.getElementById("all-btn")
    addActiveClass.classList.add("active")
}

function loadContent(getContentData){
    console.log()
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML ="";
    if(getContentData.length == 0){
        contentContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center gap-10 py-10">
            <img class="w-60 object-cover" src="./Icon.png" alt="Shoes"/>
            <p class="text-4xl font-bold">Opps! Sorry, There is no content here</p>
        </div>
        `;
        return
    }
    
    getContentData.forEach(dataElement => {
        contentContainer.innerHTML += `
        <div class="card bg-base-100 shadow-md border border-gray-100">
            <figure class="">
                <img class="w-full h-40 object-cover" src="${dataElement.thumbnail}" alt="Shoes"/>
            </figure>
            <div class=" flex gap-4 justify-evenly items-center py-5">
                <img class="h-16 w-16 rounded-full object-cover" src="${dataElement.authors[0].profile_picture}" alt="Shoes"/>
                <div>
                    <h2 class="card-title py-1">${dataElement.title}</h2>
                    <p class="py-1">
                        ${dataElement.authors[0].profile_name}
                        ${dataElement.authors[0].verified == true?`<i class="fa-solid fa-circle-check text-sky-500"></i>`:``}
                    </p>
                    <p class="py-1">${dataElement.others.views} Views</p>
                    
                </div>
            </div>
            <div class="card-actions my-4 px-5">
                <button onclick="getVideoId('${dataElement.video_id}')" class="btn bg-red-400 text-white w-full">Details</button>
            </div>
        </div>
        `
    });
    console.log(getContentData)
}


// details function click
function getVideoId(videoId){
    document.getElementById("video_details_modal").showModal() // modal call
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`).then((res)=>res.json()).then((data)=>{
        const modalContainer =document.getElementById("modal-container")
        console.log(data)
        modalContainer.innerHTML=`
            <h3 class="text-lg font-bold">${data.video.title}<span></span></h3>
            <p class="py-4">${data.video.description}</p>
            <p class="py-2 font-bold">Video Type: ${data.video.video_id}</p>
            <p class="py-2 font-bold">Author Name: ${data.video.authors[0].profile_name}</p>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        `
    })
}

// search by keyword 
document.getElementById("search-input").addEventListener("keyup", (event)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${event.target.value}`)
    .then((res)=>res.json())
    .then((data)=>loadContent(data.videos))
})



// Random Theme
document.getElementById("rand-theme").addEventListener("click", function(e){
    const valueCode = "0123456789ABCDEF";
    let getColorCode = "#"
    for(i = 0; i<6; i=i+1){
        getColorCode = getColorCode + valueCode[Math.floor(Math.random() * 16)];
    }
    document.body.style.backgroundColor = getColorCode;
})




