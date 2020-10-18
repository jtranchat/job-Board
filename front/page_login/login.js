axios: {
    baseURL: 'http://localhost:3000';
};

const loginClick = function() {
    let identifiant = document.getElementById("username").value;
    let motDePasse = document.getElementById("password").value;

    login(identifiant, motDePasse);
}

function login(identifiant, motDePasse) {
    axios.get('personne/' + identifiant + '/' + motDePasse).then( function(res) {
        if(res.data.length == 0) {
            console.log("compte inexistant")
        } else {
            console.log(res.data[0].idPersonne)
            document.location.href="../index.html";
        }
    }).catch(function(error) {
        console.log(error);
    })
}