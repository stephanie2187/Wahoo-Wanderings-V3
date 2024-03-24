const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

document.addEventListener('keypress',function(event){
    if (event.key=="Enter"){
        const username = usernameInput.value
        const password = passwordInput.value

        const url = `https://wahoowanderings.co/user/addUser/${username}/${password}`

        var newTab = window.open(url,'_blank')

        let validity;
        let placesVisited;
        var interval = setInterval(function(){
            const xhr = new XMLHttpRequest()
            xhr.open('GET',url,true)
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status===200){
                        const response = JSON.parse(xhr.responseText)
                    validity = JSON.parse(response[0])
                    placesVisited = response.slice(1)


                        clearInterval(interval)
                        newTab.close();
                    }
                }
            }
            xhr.send()
        },200)

        if (validity===true){
            localStorage.setItem('placesVisited',JSON.stringify(placesVisited))
            localStorage.setItem('isLoggedIn',JSON.stringify(true))
            window.location.href = 'https://wahoowanderings.co'
        }
    }
})