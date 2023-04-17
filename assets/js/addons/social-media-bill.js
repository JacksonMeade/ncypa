const LAST_SLIDE = 3;
let currentSlide = 0;

function updateFormData() {
    // Get the input values from the first three fieldsets
    const name = $('input[name="name"]').val();
    const email = $('input[name="email"]').val();
    const phone = $('input[name="phone"]').val();
    const streetNumber = $('input[name="number"]').val();
    const streetName = $('input[name="streetName"]').val();
    const city = $('input[name="city"]').val();
    const state = $('input[name="state"]').val();
    const zip = $('input[name="zip"]').val();
    
    const address = `${streetNumber} ${streetName}, ${city}, ${state} ${zip}`;
  
    // Update the text and textarea fields in the third fieldset with street number, street name, city, state, and zip
    $('p[name="name"]').text(name);
    $('p[name="email"]').text(email);
    $('p[name="phone"]').text(phone);
    
    currentSlide++;

    if (currentSlide === LAST_SLIDE) {
        getRepresentatives(address);
    }
  }

  function decrement() {
    currentSlide--;
  }
  
  const nextButton = $('input[name="next"]');
  nextButton.each(function() {
    $(this).on('click', updateFormData);
  });

  const prevButton = $('input[name="prev"]');
    prevButton.each(function() {
        $(this).on('click', decrement);
    });
  
  function getIsInputValid(type, value) {
    switch(type) {
      case 'name':
        return value.length > 0;
      case 'email':
        return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      case 'phone':
        return value.match(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/);
      case 'address':
        return true;
      default:
        return false;
    }
  }

  function getRepresentatives(m_address) {
    const processDiv = $('div[data-process="true"]');
  
    // replace process div with loading div
    processDiv.replaceWith('<div data-process="true" id="loading"></div>');
    
  
    // immediately invoke an async function expression
    (async (a_address) => {
      try {
        const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAnrUsAM4UGHyotngXazEsHwxbYpCL2Whg&address=${a_address}`);
        const data = await response.json();
        
        
        $('#loading').replaceWith('<div data-process="true">Got it!</div>');
      } catch (error) {
        console.error(error);
        // replace loading div with error message
        $('#loading').replaceWith(`<div data-process="true">${error}. This is a malfunction. Please contact site administrator. </div>`); 
      }
    })(m_address);
  }
  
  