


const name = document.querySelector('input[name="name"]');
const prayerRequest = document.querySelector('textarea[name="prayer"]');
const anonymousInput = document.querySelector('input[name="anonymous"]');
const submitPrayer = document.getElementById("submit-prayer");
const prayerWall = document.getElementById("prayer-wall");

function visibilityFunction(){
   const visibility = document.querySelector('input[name="visibility"]:checked');
   return visibility.value
   
}

document.addEventListener("DOMContentLoaded",async ()=>{

   loadPrayersPublic();


})




async function loadPrayers(){
   prayerWall.innerHTML = ""
   const data = await getData();
   getPrayerRequest(data);
}

async function loadPrayersPublic(){
   
   const request = document.getElementsByClassName("prayer-count");

   prayerWall.innerHTML = ""
   const data = await getDataPublic();
   getPrayerRequest(data);
   
   
}

//data for the public
async function getDataPublic(){
   try{
      const response = await fetch("http://localhost:3000/api/prayerPublic")
      if(!response.ok){
         throw new Error(`Response status ${response.status}`);
      }
      return response.json();
   }catch(error){
      console.error(error.message)
      
   }

}

async function getData(){
   try{
      const result = await fetch("http://localhost:3000/api/prayer");

      if(!result.ok){
         throw new Error(`Response status: ${result.status}`);
      } 

     return result.json();
      
      
   } catch (error){
      console.error(error.message);
   }
}

async function postData(){
   
   try{

      const visi = visibilityFunction();
      const now = new Date();
      
      const response = await fetch("http://localhost:3000/api/prayer",{
         method: "POST",
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify({
            name : name.value,
            prayer : prayerRequest.value,
            visibility: visi,
            date: now,
         })

      })
      
      return response.json();

   } catch (error){
      console.error(error.message)
   }
}


//SUBMIT BUTTON CLICK
submitPrayer.addEventListener("submit", async function(){
  
   event.preventDefault();   
   
   postData();
   alert("sent succesfulyy");
   name.value = "";
   prayerRequest.value = "";
   loadPrayersPublic();
   
})

  


//creting new Prayer Cards
function getPrayerRequest(data){

   data.forEach(prayer=>{
      
   const newPrayerCard = document.createElement("article");
   newPrayerCard.classList.add("prayer-card");
   prayerWall.appendChild(newPrayerCard);

   
   newPrayerCard.innerHTML = `
   <div class="prayer-card-header">

      <div class="user-info">

         <div class="avatar">
            ${prayer.name[0].toUpperCase()}
         </div>

         <div>
            <strong>${prayer.name}</strong>

            <span>${formatTime(prayer.created_at)}</span>
         </div>

         </div>

         <span class="public-label">
            🌎 Public
         </span>

         </div>


         <p class="prayer-text">
            ${prayer.prayer}
         </p>


         <div class="prayer-card-footer">

         <button class="pray-button">
         🙏 I'm Praying
         </button>

         <button class="delete-prayer" data-id=${prayer.id}>
            delete
         </button>   

         <span class="pray-count">
            15 people are praying
         </span>

      </div>
   `
   })


   
}

function formatTime(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
        return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
        return "Yesterday";
    }

    if (days < 7) {
        return `${days} days ago`;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
 
   // const newPrayerCardHeader = document.createElement("div");
   // newPrayerCardHeader.classList.add("prayer-card-header");
   // newPrayerCard.appendChild(newPrayerCardHeader);
   
   // const newUserInfo = document.createElement("div");
   // newUserInfo.classList.add("user-info");
   // newPrayerCardHeader.appendChild(newUserInfo);

   // const newAvatar = document.createElement("div");
   // newAvatar.classList.add("avatar");
   // newUserInfo.appendChild(newAvatar);
   // newAvatar.textContent = data[n].name[0].toUpperCase();

   // const newDiv = document.createElement("div");
   // newUserInfo.appendChild(newDiv);

   // const newName = document.createElement("strong");
   // newDiv.appendChild(newName);
   // newName.textContent = data[n].name; 

   // // const newTime = document.createElement("span");
   // // newDiv.appendChild(newTime);
   // // newTime.textContent = prayersData[n].time;

   // const newPublicLabel = document.createElement("span");
   // newPublicLabel.classList.add("public-label");
   // newPrayerCardHeader.appendChild(newPublicLabel);
   // newPublicLabel.textContent = "🌎 Public"

   // const newPrayerText = document.createElement("p");
   // newPrayerText.classList.add("prayer-text");
   // newPrayerCard.appendChild(newPrayerText);
   // newPrayerText.textContent = data[n].prayer;

   // const deleteButton = document.createElement("button")
   // deleteButton.classList.add("delete-button");
   // newPrayerCardHeader.appendChild(deleteButton);
   // deleteButton.textContent = "delete";
   
   


async function deletePrayer(id){
   try{
      const response = await fetch(`http://localhost:3000/api/delete/${id}`,{
         method: "DELETE"
      })

      if(!response.ok){
         throw new Error("failed to delete");
      }

      const data = response.json();
      return data;
      


   }catch(error){
      console.error(error.messages)
   }
}

prayerWall.addEventListener("click", async (event) => {

    if (event.target.classList.contains("delete-prayer")) {

        const id = event.target.dataset.id;
        const confirmDelete= confirm("are you sure you want to delete");
        
        if(confirmDelete == true){
            await deletePrayer(id);
            alert("deleted");
            loadPrayers();
        }else(alert("canceled"));

        
        
       
    }

});





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


