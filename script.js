const hamburger =
    document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const links = document.querySelectorAll('.menu a');

links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const cardContent = card.querySelector('.card-content');
        const fileName = card.dataset.file;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
                c.querySelector('.card-content').style.opacity = 0;
                c.querySelector('.expand-btn').textContent = 'Читати більше';
                c.querySelector('.card-content').innerHTML = '';
            }
        });

        card.classList.toggle('expanded');

        if (card.classList.contains('expanded')) {
            button.textContent = 'Згорнути';

            if (cardContent.innerHTML === '') {
                fetch(fileName)
                    .then(response => response.text())
                    .then(data => {
                        cardContent.innerHTML = data;
                        cardContent.style.opacity = 1;
                    });
            } else {
                cardContent.style.opacity = 1;
            }

        } else {
            button.textContent = 'Читати більше';
            cardContent.style.opacity = 0;
            setTimeout(() => {
                cardContent.innerHTML = '';
            }, 500);
        }
    });
});