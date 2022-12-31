const navLink = document.querySelectorAll("nav ul li a");

navLink.forEach(function(eachLink){
    eachLink.addEventListener("click",smoothScroll);
});

function smoothScroll(event){
    event.preventDefault();
    const targetID = event.target.getAttribute("href");
    const targetSection = document.querySelector(targetID);
    const originalTop = Math.floor(targetSection.getBoundingClientRect().top) -200;
    window.scrollBy({top: originalTop, left:0, behavior: "smooth"});
    console.log(originalTop);
}

window.addEventListener("load",function(){
    const posts = document.querySelectorAll("section");
    let postTops = [];
    let pageTop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;

    resetpagePosition();
    

    this.window.addEventListener("scroll",function(){
        pageTop = window.pageYOffset + 250;
        // console.log(pageTop) + 250;

        if(pageTop > postTops[counter]){
            counter++;
            // console.log(`scrolling down ${counter}`);
        }
        else if(counter >1 && pageTop < postTops[counter-1]){
            counter--;
            // console.log(`scrolling up ${counter}`);
        }
        if(counter != prevCounter){
            navLink.forEach(function(eachLink){
                eachLink.removeAttribute("class");
            });

            const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thisLink.className = "selected";
            prevCounter =counter;
        }
    });


    this.window.addEventListener("resize", function(){
        clearTimeout(doneResizing);
        doneResizing = this.setTimeout(function(){
            resetpagePosition();
        }, 500);
    });

    function resetpagePosition(){
        postTops = [];

        posts.forEach(function(posts){
            postTops.push(Math.floor(posts.getBoundingClientRect().top + window.pageYOffset) );
        });

        const pagePosition = window.pageYOffset + 250;
        counter = 0;

        postTops.forEach(function(post){
            if(pagePosition > post){
                counter++;
            }
        });

        navLink.forEach(function(eachLink){
            eachLink.removeAttribute("class");
        });

        const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
        thisLink.className = "selected"; 
    }
});