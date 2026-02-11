//- Start Of Script -- Global Vars
var navLinks = document.getElementById("navLinks")
var reviewLarry = document.getElementsByClassName("review-item-wrapper")
var reviewLength = document.getElementsByClassName("review-item-wrapper").length
const reviewTimeout = 30000
const transitionTime = 1500

//state vars 
var reviewCount = 1
let timeoutID = null
var allowClicks = true

const createDot = () =>
{
    const dot = document.createElement("div")
    dot.className = "dot"
    return dot
}
function getVisibleReviews(larry){
    const visibleReviews = []
    for (var i = 0; i < larry.length; i++){
        // Skip .Hidden Class
        if (larry.item(i).classList.contains("hidden")){
            continue
        }
        else{
            visibleReviews.push(larry.item(i))
        }
    }
    return visibleReviews
}

function setActiveReview(i) {
    var dotParent = document.getElementById("carousel-dots")
    var dotLarry = dotParent.childNodes

    allowClicks = false;
    setTimeout(() => {
        allowClicks = true
    }, transitionTime)

    // Interval Between Reviews
    timeoutID = setTimeout(() => {
        setActiveReview(++reviewCount % getVisibleReviews(reviewLarry).length)
        console.log("Current Review: " + reviewCount)
    }, reviewTimeout);

    for (var index = 0; index < getVisibleReviews(reviewLarry).length; index++){
        if (i == index) {
            reviewLarry.item(index).classList.add("active")
            dotLarry.item(index).classList.add("active-dot")
        }
        else if(reviewLarry.item(index).classList.contains("active")){
            reviewLarry.item(index).classList.add("previously-active")
            reviewLarry.item(index).classList.remove("active")
            dotLarry.item(index).classList.remove("active-dot")

            const copyIndex = index
            setTimeout(() => {
                reviewLarry.item(copyIndex).classList.remove("previously-active")
            }, transitionTime)
        }
        else{
            reviewLarry.item(index).classList.remove("active")
            dotLarry.item(index).classList.remove("active-dot")
            reviewLarry.item(index).classList.remove("previously-active")
        }
        // CREATE HELPER FUNCTIONS FOR GETTING ACTIVE REVIEWS!!!
        console.log("Review Larry Item: " + reviewLarry.item(index))
        console.log("Dot Larry Item: " + dotLarry.item(index))
        console.log("Current Index: " + index)
    }
}

function showMenu(){
    navLinks.style.right = 0
}
function hideMenu(){
    navLinks.style.right = -200
}

for (var i = 0; i < reviewLength; i++){
    // Skip .Hidden Class
    if (reviewLarry.item(i).classList.contains("hidden")){
        continue
    }
    // Create Dot
    var dot = createDot()
    document.getElementById("carousel-dots").appendChild(dot)
    // Activate Dot If Current Review Is Active
    if (reviewLarry.item(i).classList.contains("active")){
        dot.className += " active-dot" 
    }
    // Use Getter Functions Instead For Review Count
    const dotIndex = i
    dot.onclick = (e) => {
        if (allowClicks) {
            // Clearing Old Timeout
            clearTimeout(timeoutID)
            console.log("Cleared Timeout: " + timeoutID)
            setActiveReview(dotIndex)
            reviewCount = dotIndex

            //allowClicks = false
            /*
            setTimeout(() => {
                allowClicks = true
            }, transitionTime)
            */
        }
    }
}

setActiveReview(0)


console.log("Amount Of Reviews: " + reviewLength)
