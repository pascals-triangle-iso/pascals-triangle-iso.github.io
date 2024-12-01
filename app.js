function setLanguage(languageCode) {
    localStorage.setItem('language', languageCode);

    fetch('language/' + languageCode + '.json')
        .then(response => response.json())
        .then(data => {
            const currentPage = window.location.pathname;

            document.title = data.title || 'Pascal\'s Triangle';

            document.getElementById('selected-lang').textContent = data.language || 'Null';
            document.getElementById('selected-lang').style.setProperty('--flag-image', 'url(res/flags/' + languageCode + '.png)' || '#000');
            document.getElementById('navbar-history').textContent = data.navbar_history || 'Null';
            document.getElementById('navbar-modelling').textContent = data.navbar_modelling || 'Null';
            document.getElementById('navbar-quiz').textContent = data.navbar_quiz || 'Null';

            if(currentPage === '/index.html' || currentPage === '/') {
                document.querySelector('.introduction .text').innerHTML = data.introduction_text || 'Null';
                document.querySelector('.text-container.history .text').innerHTML = data.history_text || 'Null';
                document.querySelector('.text-container.modelling .text').innerHTML = data.modelling_text || 'Null';
                document.querySelector('.text-container.quiz .text').innerHTML = data.quiz_text || 'Null';
            }
            
            if(currentPage === '/history.html') {
                document.getElementById('history-paragraph').innerHTML = data.history_paragraph || 'Null';
            }
        })
        .catch(error => {
            console.error('Error loading language file:', error);
        });
}

window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
};
