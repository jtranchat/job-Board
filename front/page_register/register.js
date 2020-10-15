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
    let idPersonne = checkUserExist(mail);
    console.log("fonction register " + idPersonne);
    if(idPersonne > 0) {
        //modifier le user existant
        alterUser(idPersonne, civil, status, lastName, firstName, phone, identifiant, password);
    }else{
        //créer un nouveau user
        addUser(civil, status, lastName, firstName, phone, identifiant, password, mail);
    }
}

const checkUserExist = function(email) {
    let idPersonne = 0;
    axios.get('personne/' + email).then( function(res) {
        console.log(res.data[0].idPersonne);
        if(res.data[0].idPersonne > 0) {
            idPersonne = res.data[0].idPersonne;
        } else {
            idPersonne = 0;
        }
    }).catch(function(error) {
        console.log(error);
    })

    return idPersonne;
}

const alterUser = function(idPersonne, civil, status, lastName, firstName, phone, identifiant, password) {
    axios({
        method: 'post',
        url: '/alterPersonne/' + idPersonne,
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
