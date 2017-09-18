(function () {
    var tabsContainer  = document.getElementsByClassName('tabs')[0],
        tabsNavigation = tabsContainer.querySelector('.tabs-navigation'),
        tabContent     =  tabsNavigation.nextElementSibling;


        function updateContent(e, navigation, content){
            // update the top nav
           var  queryVal = 'li' + e.target.hash;
            e.preventDefault();
            navigation.querySelector('a.selected').classList.remove('selected');
            e.target.classList.add('selected');

            //update the content
            content.querySelector('li.selected').classList.remove('selected');
            content.querySelector(queryVal).classList.add('selected');
        }
    // listen to click event on the listener
        tabsNavigation.addEventListener('click', function(event){
                // check if the element is an anchor element
               if(event.target.tagName.toLowerCase() === 'a'){
                   // show the new content
                    updateContent(event,tabsNavigation,tabContent);
               }
        });

})();