const submitClick= function() {

    let civil = document.getElementById('civilSelect').value
    let status = document.getElementById('statusSelect').value
    let name = document.getElementById('name').value
    let firstname = document.getElementById('firstName').value
    let mail = document.getElementById('mail').value
    let phone = document.getElementById('phone').value
    let identifiant = document.getElementById('identifiant').value
    let password = document.getElementById('password').value
    let confirm = document.getElementById('confirm').value

    if(confirmPassword(password, confirm)) {

    }
}

const confirmPassword= function(password, confirm) {
    if (password == confirm){
        console.log("issou")
        return true;
    } else {
        window.alert("confirmation du mot de passe incorrect!!");
    }
}