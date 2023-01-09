const exploreContent = document.querySelector(".explore");
const topOfCenter = document.querySelector(".top-of-center");
const tweetType = document.querySelector(".tweet-type-container");
const happening = document.querySelector(".happening");
const rightContainer = document.querySelector(".right-content-section");
const rightSearch = document.querySelector(".right-content-section input");
const notification = document.querySelector(".notification");
const tweetPostContainer = document.querySelector(".tweets-post-container");
const msgUsers = document.querySelector(".message-users");
const selectMsg = document.querySelector(".message-select");
const bookmarks = document.querySelector(".bookmarks-container");
const lists = document.querySelector(".lists-container");
const profiles = document.querySelector(".profile-view");

const checker = document.querySelector(".my-tweet-post");

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("explorer")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'block';
        happening.style.display = "none";
        rightSearch.style.display = "none";
        notification.style.display = 'none';
        tweetPostContainer.style.display = "block";
        rightContainer.style.display = "block";
        msgUsers.style.display = "none";
        selectMsg.style.display = "none";
        bookmarks.style.display = "none";
        lists.style.display = "none";
        profiles.style.display = "none";
        checker.style.display = "none";
    }
    if(e.target.classList.contains("Home")){
        window.location.href = "index.html";
    }
    if(e.target.classList.contains("notify-btn")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'none';
        happening.style.display = "block";
        rightSearch.style.display = "block";
        notification.style.display = 'block';
        tweetPostContainer.style.display = "none";
        rightContainer.style.display = "block";
        msgUsers.style.display = "none";
        selectMsg.style.display = "none";
        bookmarks.style.display = "none";
        lists.style.display = "none";
        profiles.style.display = "none";
        checker.style.display = "none";
    }
    if(e.target.classList.contains("message")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'none';
        happening.style.display = "none";
        rightSearch.style.display = "none";
        notification.style.display = 'none';
        tweetPostContainer.style.display = "none";
        rightContainer.style.display = "none";
        msgUsers.style.display = "block";
        selectMsg.style.display = "block";
        bookmarks.style.display = "none";
        lists.style.display = "none";
        profiles.style.display = "none";
        checker.style.display = "none";
    }
    if(e.target.classList.contains("bookmarks")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'none';
        notification.style.display = 'none';
        tweetPostContainer.style.display = "none";
        msgUsers.style.display = "none";
        selectMsg.style.display = "none";
        bookmarks.style.display = "block";
        happening.style.display = "block";
        rightSearch.style.display = "block";
        rightContainer.style.display = "block";
        lists.style.display = "none";
        profiles.style.display = "none";
        checker.style.display = "none";
    }
    if(e.target.classList.contains("lists")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'none';
        notification.style.display = 'none';
        tweetPostContainer.style.display = "none";
        msgUsers.style.display = "none";
        selectMsg.style.display = "none";
        bookmarks.style.display = "none";
        happening.style.display = "block";
        rightSearch.style.display = "block";
        rightContainer.style.display = "block";
        lists.style.display = "block";
        profiles.style.display = "none";
        checker.style.display = "none";
    }
    if(e.target.classList.contains("profile")){
        topOfCenter.style.display = "none";
        tweetType.style.display = "none";
        exploreContent.style.display = 'none';
        notification.style.display = 'none';
        tweetPostContainer.style.display = "none";
        msgUsers.style.display = "none";
        selectMsg.style.display = "none";
        bookmarks.style.display = "none";
        happening.style.display = "block";
        rightSearch.style.display = "block";
        lists.style.display = "none";
        profiles.style.display = "block";
        checker.style.display = 'block';
        getTweetsAndHTML()
    }
    if(window.innerWidth <980){
        rightContainer.style.display = "none";
    }
})
window.onload = () =>{
    if(window.innerWidth <980){
        rightContainer.style.display = "none";
    }
}

window.addEventListener('resize',()=>{
    if(window.innerWidth <=980){
        rightContainer.style.display = "none";
    } else {
        rightContainer.style.display = "block";
    }
})

let tweetOff = 0;
let runningCritical = false;
async function getTweetsAndHTML() {
    if(runningCritical) {
        return;
    }
    runningCritical = true;
    
    let res = await fetch(`https://twitter-backend-6yot.onrender.com/tweet/recent?offset=${tweetOff}`);

    let result = await res.json();

    console.log(result);

    tweetOffset = tweetOff+20;
    if(result.data.length <= 1){
        tweetOff = 0;
    }

    let imgSrc = "";

    checker.insertAdjacentHTML('beforeend', result.data.map((tweet) => {
        let imageArray = ["https://th.bing.com/th/id/OIP.PeOsGY_M-uqMPGZKCgKEKwHaLc?pid=ImgDet&rs=1","https://i.pinimg.com/736x/b3/c9/df/b3c9dfa78c7a93bbd84f9c8fcbcc2a0e.jpg","https://th.bing.com/th/id/R.bdd8b5e5e571e35fec93c14e0b9f3154?rik=w70dp9b5LNxyBw&riu=http%3a%2f%2fimagecollegemagtv.com%2fITCL_film_studio%2fmovie_site%2fOne_more_photo_please%2fimages%2fteam%2fte.jpg&ehk=5SNk%2f82IvneScbt3G1RkbvUN68OkaFr38dkY82GO%2f%2bI%3d&risl=&pid=ImgRaw&r=0","https://i.pinimg.com/originals/64/f6/eb/64f6eb26e3197a113b53fa1cc23ee638.jpg","https://assets.mycast.io/actor_images/actor-thiago-zambrano-206814_large.jpg?1619563616","https://th.bing.com/th/id/OIP.1QJyrTaB09VcWCu1NuefkAHaHa?pid=ImgDet&rs=1","https://th.bing.com/th/id/R.b38f00a3a01540d1c870a85646099b11?rik=W5aEivCxhUT0WQ&riu=http%3a%2f%2fwww.davidyiu.com%2fadmin%2fresources%2fphilip-protheroe-w400h400.jpg&ehk=Wic1qc%2bK6%2bd1Ol70f52c0qN6Lhki14gCM1PejKCYMWY%3d&risl=&pid=ImgRaw&r=0","https://th.bing.com/th/id/OIP.ITeUkAbSMb0og9pVMN5LIgAAAA?pid=ImgDet&w=400&h=400&rs=1"]

        let randomImage = imageArray[Math.floor(imageArray.length*(Math.random()))]
        if(tweet.userId == "SouvikRoyOfficial"){
            imgSrc = "https://media.licdn.com/dms/image/D5603AQFZ9a9_lbEUPw/profile-displayphoto-shrink_800_800/0/1665894833770?e=1678320000&v=beta&t=y6f0qd66TkAHG9TUerdd8ZLsITDUQbOgKLIjwEMyiYM";
            return `<div class="tweet-post">
        <button class="who-posted"><img src="${imgSrc}"></button>
        <div class="posted-text">
            <p class="name-who-posted">${tweet.text}<span id="at-the-rate">@${tweet.userId}</span></p>
            <p class="posted-text-content">${tweet.title}</p>
            <p class="time">${tweet["creationDatetime"].slice(0,21)}</p>
        </div>
        <button class="click-action1"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        <button class="click-action2"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="tweet-action">
                <button data-id=${tweet._id} class="tweet-edit" id="tweet-edit">
                Edit
                </button>
                <button data-id=${tweet._id} class="tweet-delete" id="tweet-delete">
                    Delete
                </button>
            </div>
            <div class="tweet-body">
                <span id='span-${tweet._id}'>${tweet.title}
                </span>
            </div>
    </div>`
        } else {
            imgSrc = `${randomImage}`;
        }
        
    })
)
runningCritical = false;
};


checker.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    // console.log(scrollTop, scrollHeight, clientHeight);

    if((scrollTop + clientHeight) >= (scrollHeight - 20)) {
        getTweetsAndHTML();
    }
})





