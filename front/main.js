axios: {
    baseURL: 'http://localhost:3000';
};

document.addEventListener('DOMContentLoaded', function() {
    axios.get('annonce').then( function(res) {
        let div = document.getElementById('allAnnonce');
        div.innerHTML = allAnnonce(res);
    }).catch(function(error) {
        console.log(error);
    })
});

const allAnnonce = function(res) {
    let annonce = '';
    for(let i = 0; i < res.data.length; ++i) {
        annonce += displayAnnonce(res.data[i]);
    }
    return annonce;
}

const clickButtonMore = function(id) {
    let button = document.getElementById(id);
    let parent = button.parentNode;

    axios.get('information/' + button.getAttribute('id')).then( function(res) {
        parent.innerHTML = informationCard(res.data);
    }).catch(function(error) {
        console.log(error);
    })
};

const displayAnnonce = function(data) {
    let annonce =  '<div id="annonce">' +
        '<h1>'+ data.nomEntreprise +'</h1>' +
        '<p>' + data.description +'</p>' +
        '<input type="button" value="learn more" class="buttonMore" id="' + data.idAnnonce + '" onclick="clickButtonMore(id)">' +
    '</div>' +
    '<br>'

    return annonce;
};

const informationCard = function (data) {

    let information = '<div class="col-md-8 themed-grid-col" id="divMore">'+
                        '<h1>' + data[0].nom +'</h1>'+
                        '<p>' + data[0].description+ '</p>'+   
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col" id="divMore">'+
                        '<p>- Entreprise: ' + data[0].nomEntreprise + '<br><br>- salaires: ' + data[0].salaires + ' euro <br><br>- contrat: '+ data[0].Contrat + '</p>'+
                        '<p><button type="button" id="' + data[0].idAnnonce + '" class="trigger btn btn-success" onclick="displayForm(id)"" >'+
                            '  Postuler  '+
                            '</button></p>'+
                    '</div>'

    return information;
};

const Form = function(idAnnonce) {
    let form =  '<h1>Forms</h1>' +
                '<form>'+
                    '<label for="fname">First name:</label>' +
                    '<input type="text" id="fname" name="fname" required><br><br>' +
                    '<label for="lname">Last name:</label>' +
                    '<input type="text" id="lname" name="lname" required><br><br>' +
                    '<label for="phone">Phone:</label>' +
                    '<input type="text" id="phone" name="phone" minlength="10" maxlength="10" required><br><br>' +
                    '<label for="email">Email :</label>' +
                    '<input type="text" id="email" name="email" required><br><br>' +
                    '<label for="message">Message :</label>' +
                    '<textarea id="message" name="message" rows="10" cols="40" required></textarea><br><br>' +
                    '<label for="submit"></label>' +
                    '<input type="button" value="Submit" id="submitButton" onclick="clickSubmit('+ idAnnonce +')"' +
                '</form>'

    return form;
}

const displayForm = function(idAnnonce) {
    let button = document.getElementById(idAnnonce);
    let parent = button.parentNode;

    parent.innerHTML = Form(idAnnonce);
}

const clickSubmit = function(idAnnonce) {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    axios({
        method: 'post',
        url: '/addPersonne',
        data: {
        "nom": lname,
        "prenom": fname,
        "mail": email,
        "telephone": phone
        }
        })
        .then(function (res) {
        console.log(res);
        })
        .catch(function (err) {
    });

    console.log("avant get");
    
    axios.get('personne/' + email).then( function(res) {
        if(res.data[0].idPersonne > 0) {
            console.log(res.data[0].idPersonne , +" et " + message);
            addCandidacy(res.data[0].idPersonne, idAnnonce, message)
        }
    }).catch(function(error) {
        console.log(error);
    })
}

function addCandidacy(idPersonne, idAnnonce, message) {
    axios({
        method: 'post',
        url: '/candidature',
        data: {
        "idAnnonce": idAnnonce,
        "idPersonne": idPersonne,
        "message": message
        }
        })
        .then(function (res) {
        console.log(res);
        })
        .catch(function (err) {
        console.log(err);
    });
}
