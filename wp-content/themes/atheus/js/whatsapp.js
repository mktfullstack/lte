/* 
*<!-- Página desarrollada  por fullstack marketing cireña webs, subida y alojada en github para que los desarrolladores puedan ver el codigo y usarlo para test. En FSM ayudamos los jóvenes que van empezando. Siguenos en Facebook: https://www.facebook.com/fullstackmkt/ y github como:https://github.com/mktfullstack-->
*/

const $form = document.querySelector('#form');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'whatsapp://';
const phone = '+5217717786617';  


$form.addEventListener('submit', (event) => {
    event.preventDefault()
    buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'
    buttonSubmit.disabled = true

    setTimeout(() => {
        let name = document.querySelector('#name').value
        let lastname = document.querySelector('#lastname').value
        let email = document.querySelector('#email').value
        let message = 'send?phone=' + phone + '&text=%0A*Hola, mi nombre es:*%0A' + name + '%0A*Mi correo es:*%0A' + lastname + '%0A*Solicito la siguiente información:*%0A' + email + ''


        if (isMobile()) {
            window.open(urlMobile + message, '_blank')
        } else {
            window.open(urlDesktop + message, '_blank')
        }

        buttonSubmit.innerHTML = 'Enviar Mensaje'
        buttonSubmit.disabled = false

    }, 4000);

});