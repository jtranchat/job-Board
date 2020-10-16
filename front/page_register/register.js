axios: {
    baseURL: 'http://localhost:3000';
};

const submitClick= function() {

    let civil = document.getElementById('civilSelect').value
    let status = document.getElementById('statusSelect').value
    let lastName = document.getElementById('name').value
    let firstName = document.getElementById('firstName').value
    let mail = document.getElementById('mail').value
    let phone = document.getElementById('phone').value
    let identifiant = document.getElementById('identifiant').value
    let password = document.getElementById('password').value
    let confirm = document.getElementById('confirm').value

    if(confirmPassword(password, confirm)) {
        register(civil, status, lastName, firstName, mail, phone, identifiant, password);
    }
}

const confirmPassword= function(password, confirm) {
    if (password == confirm){
        return true;
    } else {
        window.alert("confirmation du mot de passe incorrect!!");
    }
}

const register = function(civil, status, lastName, firstName, mail, phone, identifiant, password) {
    console.log("fonction register : " + mail);

    addUser(civil, status, lastName, firstName, phone, identifiant, password, mail);
    alterUser(mail, civil, status, lastName, firstName, phone, identifiant, password);
    document.location.href="../index.html";
}

const alterUser = function(mail, civil, status, lastName, firstName, phone, identifiant, password) {
    axios({
        method: 'put',
        url: '/updatePersonne/' + mail,
        data: {
        "nom": lastName,
        "prenom": firstName,
        "sexe": civil,
        "telephone": phone,
        "identifiant": identifiant,
        "motDePasse": password,
        "status": status 
        }
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
    });
}

const addUser = function(civil, status, lastName, firstName, phone, identifiant, password, mail) {
    axios({
        method: 'post',
        url: '/addPersonne',
        data: {
        "nom": lastName,
        "prenom": firstName,
        "sexe": civil,
        "mail": mail,
        "telephone": phone,
        "identifiant": identifiant,
        "motDePasse": password,
        "status": status
        }
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
    });
}
