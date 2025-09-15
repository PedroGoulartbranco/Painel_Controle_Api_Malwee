let div_teste = document.getElementById("teste");

fetch('http://localhost:5000/produtos')

    .then(response => response.json())

    .then(data => {
        console.log(data)
    })

    .catch(error => console.log(error));