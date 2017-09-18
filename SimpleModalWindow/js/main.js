(function () {
    var modelTrigger = document.getElementById('modal-trigger'),
        closeModal   = document.getElementById('closeModal'),
        modal        = document.getElementById('modal');

    // detect a click on modal trigger.
    modelTrigger.addEventListener('click', function (event) {
         // prevent the modal url from opening up
        event.preventDefault();
        // add  the attribute to show the modal visibility
        modal.setAttribute('class', 'is-visible');
    });
      console.log(closeModal);
    // close the modal on click
      if(closeModal){
          closeModal.addEventListener('click', function () {
              modal.removeAttribute('class');
          });
      }
})();