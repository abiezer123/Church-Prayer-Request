const InputName = document.getElementById("name");
const prayerRequest = document.getElementById("prayer")
const submitPrayer = document.getElementById("submit-prayer")

submitPrayer.addEventListener("submit", function(){
    const visibility = document.querySelector('input[name="visibility"]:checked');
    const anonymousInput = document.querySelector('input[name="anonymous"]') 


    event.preventDefault();

    if(!prayerRequest.value.trim()){
        alert("please write your prayer request")
        return
    }
    const userPrayer = {
        userName: InputName.value,
        prayerRequest: prayerRequest.value,
        visibility: visibility.value,
        anonymous: anonymousInput.checked
    }


    const prayerCard = document.getElementById("prayer-wall");
    const newPrayerCard = document.createElement("div");
    const newH2 = document.createElement("strong");
    const newP = document.createElement("p");
    const newArticle = document.createElement("article");
    const newAvatar = document.createElement("div");

    newAvatar.classList.add("avatar");
    newAvatar.textContent= userPrayer.userName[0].toUpperCase();
    newH2.textContent = !userPrayer.anonymous ? userPrayer.userName : "anonymous" ;
    newP.textContent = userPrayer.prayerRequest;
    newPrayerCard.classList.add("prayer-card-header");
    newArticle.classList.add("prayer-card");
    newArticle.appendChild(newPrayerCard);
    newArticle.appendChild(newH2);
    newArticle.appendChild(newP);
    newArticle.appendChild(newAvatar)
    
    prayerCard.appendChild(newArticle);

})

    