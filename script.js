// const { text } = require("express");



const name = document.querySelector('input[name="name"]');
const prayerRequest = document.querySelector('textarea[name="prayer"]');
const anonymousInput = document.querySelector('input[name="anonymous"]');
const submitPrayer = document.getElementById("submit-prayer");
const prayerWall = document.getElementById("prayer-wall");

const prayersData = [];
let n = 0;

submitPrayer.addEventListener("submit", async function(){
    
   
    event.preventDefault();
    await postPrayerRequest();
    
    if(prayersData[n].visibility === "public"){getPrayerRequest();};
    
    n++;
})

function postPrayerRequest(){
   
   const visibility = document.querySelector('input[name="visibility"]:checked');
   
   prayersData.push({
    name: name.value,
    prayerRequest: prayerRequest.value,
    visibility: visibility.value,
    anonymousInpt: anonymousInput.checked,

   })

  

}

function getPrayerRequest(){

   const newPrayerCard = document.createElement("article");
   newPrayerCard.classList.add("prayer-card");
   prayerWall.appendChild(newPrayerCard);
   
   const newPrayerCardHeader = document.createElement("div");
   newPrayerCardHeader.classList.add("prayer-card-header");
   newPrayerCard.appendChild(newPrayerCardHeader);
   
   const newUserInfo = document.createElement("div");
   newUserInfo.classList.add("user-info");
   newPrayerCardHeader.appendChild(newUserInfo);

   const newAvatar = document.createElement("div");
   newAvatar.classList.add("avatar");
   newUserInfo.appendChild(newAvatar);
   newAvatar.textContent = prayersData[n].name[n].toUpperCase();

   const newDiv = document.createElement("div");
   newUserInfo.appendChild(newDiv);

   const newName = document.createElement("strong");
   newDiv.appendChild(newName);
   newName.textContent = prayersData[n].name; 

   const newTime = document.createElement("span");
   newDiv.appendChild(newTime);
   newTime.textContent = prayersData[n].time;

   const newPublicLabel = document.createElement("span");
   newPublicLabel.classList.add("public-label");
   newPrayerCardHeader.appendChild(newPublicLabel);
   newPublicLabel.textContent = "🌎 Public"

   const newPrayerText = document.createElement("prayer-text");
   newPrayerText.classList.add("prayer-text");
   newPrayerCard.appendChild(newPrayerText);
   newPrayerText.textContent = prayersData[n].prayerRequest;


   
   
}





// function insertPrayerCArd(name,prayer,visibility,is_anonimous){
// const visibility = document.querySelector('input[name="visibility"]:checked');
//     const anonymousInput = document.querySelector('input[name="anonymous"]') 


//     event.preventDefault();

//     if(!prayerRequest.value.trim()){
//         alert("please write your prayer request")
//         return
//     }
//     const userPrayer = {
//         userName: InputName.value,
//         prayerRequest: prayerRequest.value,
//         visibility: visibility.value,
//         anonymous: anonymousInput.checked
//     }


//     const prayerCard = document.getElementById("prayer-wall");
//     const newPrayerCard = document.createElement("div");
//     const newName = document.createElement("strong");
//     const newPrayerContent = document.createElement("p");
//     const newArticle = document.createElement("article");
//     const newAvatar = document.createElement("div");

//     newAvatar.classList.add("avatar");
//     newAvatar.textContent= userPrayer.userName[0].toUpperCase();
//     newName.textContent = !userPrayer.anonymous ? userPrayer.userName : "anonymous" ;
//     newPrayerContent.textContent = userPrayer.prayerRequest;
//     newPrayerCard.classList.add("prayer-card-header");
//     newArticle.classList.add("prayer-card");
    
//     newArticle.appendChild(newPrayerCard);
//     newArticle.appendChild(newAvatar)
//     newArticle.appendChild(newName);
//     newArticle.appendChild(newPrayerContent);

    
//     prayerCard.appendChild(newArticle);
// }






    