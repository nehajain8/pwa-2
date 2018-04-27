(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/

  /*****************************************************************************
   *
   * Methods to update/refresh the FlightSchedule
   *
   ****************************************************************************/

   //Update data in html
  app.updateJSON = function(data){
   
    data.Flight.forEach(function(v, i) {
      var div = document.getElementsByClassName('main')[0];
      //Create Template DIV
      var template= document.createElement('div');
      template.className = "FlightTemplate";
      var main1=  document.createElement('div'); //Create LEFT DIV for flight journey and time details
      main1.className = "leftDiv"; 
      template.appendChild(main1);
      div.appendChild(template);

      var frag1 = document.createDocumentFragment();
      var new_div1 = document.createElement('div');
      new_div1.className = "Flightjourney"; //Create flight journey div
      var new_div2 = document.createElement('div');
      new_div2.className = "FlightTime";   //Create flight time div
      frag1.appendChild(new_div1).innerHTML = v.flightJourney;
      frag1.appendChild(new_div2).innerHTML = v.flightTime;
      main1.appendChild(frag1); // adding both the divs in left div

        var main2=  document.createElement('div'); //Create RIGHT DIV for flight status detail
        main2.className = "rightDiv"; 
        template.appendChild(main2);
        var frag2 = document.createDocumentFragment();
        var new_div3 = document.createElement('div');
        new_div3.className = "FlightStatus"; //Create flight statuts div
        frag2.appendChild(new_div3).innerHTML = v.flightStatus; 
        main2.appendChild(frag2); //adding flight status div to right div
    });
    
   };

  //Load JSON data from local JSON file  
  app.loadJSON= function() {     

    var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', './scripts/flightDetails.json', true); // xml request to json file url
      xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            var response = xobj.responseText;
            var data = JSON.parse(response);
            app.updateJSON(data);  
          }
    };
    xobj.send();  
  };
  
  app.loadFlightSchedule = function() {
    app.loadJSON();
    
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

 

  // Load flight schedule
  app.loadFlightSchedule();

  // service worker code added here
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() { console.log('Service Worker Registered'); });
  } 
})();
