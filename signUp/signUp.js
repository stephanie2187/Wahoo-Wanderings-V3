const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

document.addEventListener('keypress',function(event){
    if (event.key=="Enter"){
        const username = usernameInput.value
        const password = passwordInput.value

        const url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/addUser/${username}/${password}`;

        let validity;
        let placesVisited;
        var interval = setInterval(function () {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    validity = JSON.parse(data[0]);
                    placesVisited = data.slice(1);
                    clearInterval(interval);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }, 200);


        if (validity===true){
            localStorage.setItem('username',JSON.stringify(username))
            localStorage.setItem('placesVisited',JSON.stringify(placesVisited))
            localStorage.setItem('isLoggedIn',JSON.stringify(true))
            window.location.href = 'https://wahoowanderings.co'
        }
    }
})