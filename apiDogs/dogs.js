document.addEventListener('DOMContentLoaded', function () {
    const fetchBut = document.getElementById('fetchBut');
    const picture = document.getElementById('img');
    const raca = document.getElementById('raca');

    fetchBut.addEventListener('click', function () {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    const breedList = data.message;
                    const breeds = Object.keys(breedList);
                    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

                    fetch(`https://dog.ceo/api/breed/${randomBreed}/images/random`)
                        .then(response => response.json())
                        .then(data => {
                            if (data && data.message) {
                                const imageUrl = data.message;
                                const img = document.createElement('img');
                                img.src = imageUrl;
                                picture.innerHTML = '';
                                picture.appendChild(img);
                                raca.textContent = `Raça: ${randomBreed}`;
                            } else {
                                raca.textContent = 'Não foi possível obter informações sobre a raça do cachorro.';
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao buscar imagem da raça:', error);
                            raca.textContent = 'Ocorreu um erro ao buscar imagem da raça do cachorro.';
                        });
                } else {
                    raca.textContent = 'Não foi possível obter informações sobre a raça do cachorro.';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados sobre o cachorro:', error);
                raca.textContent = 'Ocorreu um erro ao buscar dados sobre o cachorro.';
            });
    });
});
