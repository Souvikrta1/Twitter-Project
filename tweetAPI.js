const text = document.querySelector(".posted-text-content");
const time = document.querySelector(".time");

const tweetsContainer = document.querySelector(".center-content-section");
const tweetpostContainer = document.querySelector(".tweets-post-container");

let tweetOffset = 0;
let runningCriticalFunction = false;

async function getTweetsAndInsertHTML() {
    if(runningCriticalFunction) {
        return;
    }
    runningCriticalFunction = true;
    
    let res = await fetch(`https://twitter-backend-6yot.onrender.com/tweet/recent?offset=${tweetOffset}`);

    let result = await res.json();

    console.log(result);

    tweetOffset = tweetOffset+20;
    if(result.data.length <= 1){
        tweetOffset = 0;
    }

    let imgSrc = "";

    tweetpostContainer.insertAdjacentHTML('beforeend', result.data.map((tweet) => {
        let imageArray = ["https://th.bing.com/th/id/OIP.PeOsGY_M-uqMPGZKCgKEKwHaLc?pid=ImgDet&rs=1","https://i.pinimg.com/736x/b3/c9/df/b3c9dfa78c7a93bbd84f9c8fcbcc2a0e.jpg","https://th.bing.com/th/id/R.bdd8b5e5e571e35fec93c14e0b9f3154?rik=w70dp9b5LNxyBw&riu=http%3a%2f%2fimagecollegemagtv.com%2fITCL_film_studio%2fmovie_site%2fOne_more_photo_please%2fimages%2fteam%2fte.jpg&ehk=5SNk%2f82IvneScbt3G1RkbvUN68OkaFr38dkY82GO%2f%2bI%3d&risl=&pid=ImgRaw&r=0","https://i.pinimg.com/originals/64/f6/eb/64f6eb26e3197a113b53fa1cc23ee638.jpg","https://assets.mycast.io/actor_images/actor-thiago-zambrano-206814_large.jpg?1619563616","https://th.bing.com/th/id/OIP.1QJyrTaB09VcWCu1NuefkAHaHa?pid=ImgDet&rs=1","https://th.bing.com/th/id/R.b38f00a3a01540d1c870a85646099b11?rik=W5aEivCxhUT0WQ&riu=http%3a%2f%2fwww.davidyiu.com%2fadmin%2fresources%2fphilip-protheroe-w400h400.jpg&ehk=Wic1qc%2bK6%2bd1Ol70f52c0qN6Lhki14gCM1PejKCYMWY%3d&risl=&pid=ImgRaw&r=0","https://th.bing.com/th/id/OIP.ITeUkAbSMb0og9pVMN5LIgAAAA?pid=ImgDet&w=400&h=400&rs=1"]

        let randomImage = imageArray[Math.floor(imageArray.length*(Math.random()))]
        if(tweet.userId == "SouvikRoyOfficial"){
            imgSrc = "https://media.licdn.com/dms/image/D5603AQFZ9a9_lbEUPw/profile-displayphoto-shrink_800_800/0/1665894833770?e=1678320000&v=beta&t=y6f0qd66TkAHG9TUerdd8ZLsITDUQbOgKLIjwEMyiYM";
        } else {
            imgSrc = `${randomImage}`;
        }
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
    })
)
runningCriticalFunction = false;
};

window.onload = async () =>{
    getTweetsAndInsertHTML();
}

document.addEventListener("click",async(e)=>{
    if(e.target.classList.contains("click-action1")){
        e.target.nextElementSibling.nextElementSibling.style.display = "flex";
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "block";
    }
    if(e.target.classList.contains("click-action2")){
        e.target.nextElementSibling.style.display = "none";
        e.target.previousElementSibling.style.display = "block";
        e.target.style.display = "none"
    }
})


//<img src="https://cdn.britannica.com/63/211663-050-A674D74C/Jonny-Bairstow-batting-semifinal-match-England-Australia-2019.jpg">

document.addEventListener("click",async (e)=>{

    if(e.target.classList.contains("tweet-submit")){
        const tweetText = document.querySelector(".tweet-type-here textarea").value;

        const data = {
            title: tweetText,
            text : "Souvik Roy",
            userId : "SouvikRoyOfficial",
        }

        const tweetResponse = await fetch('https://twitter-backend-6yot.onrender.com/tweet/create', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                    },
            body: JSON.stringify(data)
        })

        const tweet = await tweetResponse.json();

        if(tweet.status != 200){
            alert(tweet.message);
            return;
        }
        document.querySelector('.tweet-type-here textarea').value = "";
        alert(tweet.message)
        window.location.href = "index.html";
    }

    if(e.target.classList.contains('tweet-delete')) {

        if(confirm("Are you sure you want to delete this tweet?")) {
            const tweetId = e.target.getAttribute('data-id');

            const data = {
                tweetId,
                userId: "SouvikRoyOfficial"
            };

            const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const result = await response.json();

            if(result.status !== 200) {
                alert(result.message);
                window.location.href = "index.html";
                return;
            }
            
            alert("Tweet deleted successfuly");
            window.location.href = "index.html";
            document.getElementById(tweetId).remove();
        }
    }
    
    if(e.target.classList.contains('tweet-edit')) {
        const tweetId = e.target.getAttribute('data-id');

        const span = document.getElementById('span-' + tweetId);

        const tweetText = prompt("Enter new tweet text", span.innerText);

        const data = {
            tweetId,
            title: tweetText,
            text: "Souvik Roy",
            userId: "SouvikRoyOfficial"
        }

        const response = await fetch('https://twitter-backend-6yot.onrender.com/tweet/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();

        if(result.status !== 200) {
            alert(result.message);
            window.location.href = "index.html";
            return;
        }

        alert("Updated Successfully");
        span.innerText = tweetText;
        window.location.href = "index.html";
    }
    

})

const rightContent = document.querySelector(".right-content-section");


tweetsContainer.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    // console.log(scrollTop, scrollHeight, clientHeight);

    if((scrollTop + clientHeight) >= (scrollHeight - 20)) {
        getTweetsAndInsertHTML();
    }
})