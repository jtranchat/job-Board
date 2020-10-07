axios: {
    baseURL: 'http://localhost:3000';
};

$(document).ready(function(){
    const informationCard = function (data) {
        let information = '<div class="col-md-8 themed-grid-col" id="divMore">'+
                            '<h1>' + data[0].nom +'</h1>'+
                            '<p>' + data[0].description+ '</p>'+   
                        '</div>'+
                        '<div class="col-md-4 themed-grid-col" id="divMore">'+
                            '<p>- Entreprise: ' + data[0].nomEntreprise + '<br><br>- salaires: ' + data[0].salaires + ' euro <br><br>- contrat: '+ data[0].contrat + '</p>'+
                            '<p><button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">'+
                                '  Postuler  '+
                              '</button></p>'+
                        '</div>'
    
        return information;
    };

   $(".buttonMore").click(function(e) {
        let parent = this.parentNode;
        axios.get('information/' + $(this).attr("id")).then( function(res) {
            $(parent).html(informationCard(res.data));
        }).catch(function(error) {
            console.log(error);
        })

        axios.delete()
    });
});