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
                        '<p><button type="button" id="' + data[0].idAnnonce + '" class="trigger btn btn-success" >'+
                            '  Postuler  '+
                            '</button></p>'+
                    '</div>'

    return information;
};

const displayForm = function() {
    let form = 'div action="/candidature" method="post" class="form"'+
                    '<label for="fname">First name:</label>' +
                    '<input type="text" id="fname" name="fname" required><br><br>' +
                    '<label for="lname">Last name:</label>' +
                    '<input type="text" id="lname" name="lname" required><br><br>' +
                    '<label for="phone">Phone:</label>' +
                    '<input type="text" id="phone" name="phone" maxlength="10" required>' +
                    '<label for"email>Email :</label>"' +
                    '<textarea name="email" rows="10" cols="40" required></textarea>' +
                    '<label for="submit"></label>' +
                    '<button id="buttonSubmit" type="submit" value="submit">Submit</button>'

    return form;
}
