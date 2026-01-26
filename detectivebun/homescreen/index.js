function startGame(){
    window.location.href="../level1.html"
}
function showCredits(){
    const credits = document.getElementById("hiddencredits")
    const menu = document.getElementById("menu")
    menu.style.display = "none"
    credits.style.display="flex"

}
function back(){
    const credits = document.getElementById("hiddencredits")
    const menu = document.getElementById("menu")
    menu.style.display = "flex"
    credits.style.display="none"

}
function quitGame(){
    const messages = ["₍ ᐢ.ˬ.ᐢ₎: lets be reasonable here :( i still have cases to solve ! ", "₍ ᐢ.ˬ.ᐢ₎: why are you going so soon :(", "₍ ᐢ.ˬ.ᐢ₎: if you must leave, click the x in the top right corner", "₍ ᐢ.ˬ.ᐢ₎: pls stay :(",  "₍ ᐢ.ˬ.ᐢ₎: i want more adventure!!!" ]
    const random = Math.floor(Math.random() * messages.length);
    alert(messages[random])

}