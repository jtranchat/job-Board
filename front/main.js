axios: {
    baseURL: 'http://localhost:3000';
};

document.addEventListener('DOMContentLoaded', function() {
    axios.get('annonce').then( function(res) {
        console.log(res.data.length);
        let div = document.getElementById('allAnnonce');
        console.log(div);
        div.innerHTML = allAnnonce(res);
    }).catch(function(error) {
        console.log(error);
    })
});

const allAnnonce = function(res) {
    let annonce = '';
    for(let i = 0; i < res.data.length; ++i) {
        console.log("issou");
        annonce += displayAnnonce(res.data[i]);
    }
    return annonce;
}

const displayAnnonce = function(data) {
    let annonce =  '<div id="annonce">' +
        '<h1>'+ data.nomEntreprise +'</h1>' +
        '<p>' + data.description +'</p>' +
        '<input type="button" value="learn more" class="buttonMore" id="' + data.idAnnonce + '" onclick="clickButtonMore(id)">' +
    '</div>' +
    '<br>'

    return annonce;
};

const clickButtonMore = function(id) {
    let button = document.getElementById(id);
    console.log(button);
    let parent = button.parentNode;
    console.log(parent);

    axios.get('information/' + button.getAttribute('id')).then( function(res) {
        parent.innerHTML = informationCard(res.data);
    }).catch(function(error) {
        console.log(error);
    })
};

const informationCard = function (data) {
    let information = '<div class="col-md-8 themed-grid-col" id="divMore">'+
                        '<h1>' + data[0].nom +'</h1>'+
                        '<p>' + data[0].description+ '</p>'+   
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col" id="divMore">'+
                        '<p>- Entreprise: ' + data[0].nomEntreprise + '<br><br>- salaires: ' + data[0].salaires + ' euro <br><br>- contrat: '+ data[0].Contrat + '</p>'+
                        '<p><button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">'+
                            '  Postuler  '+
                            '</button></p>'+
                    '</div>'

    return information;
};


    
        