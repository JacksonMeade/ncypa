const LAST_SLIDE = 3;
let currentSlide = 0;

function updateFormData() {
    // Get the input values from the first three fieldsets
    const name = $('input[name="name"]').val();
    const email = $('input[name="email"]').val();
    const phone = $('input[name="phone"]').val();
    const address = $('input[name="address"]').val();
  
    // Update the text and textarea fields in the third fieldset with street number, street name, city, state, and zip
    $('p[name="name"]').text(name);
    $('p[name="email"]').text(email);
    $('p[name="phone"]').text(phone);
    $('p[name="address"]').text(address);
    
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
        const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${a_address}&key=AIzaSyAnrUsAM4UGHyotngXazEsHwxbYpCL2Whg`);
        const data = await response.json();
        console.log(data);

        if (data.error) {
          throw data.error;
        }
        
        // replace loading div with success message
        $('#loading').replaceWith(`<div data-process="true"></div>`);

        data.offices.forEach(office => {
            const representatives = getRepresentativesByOffice(data, office);
            $('div[data-process="true"]').append(representatives);
        });

      } catch (error) {
        console.error(error);
        // replace loading div with error message
        $('#loading').replaceWith(`<div data-process="true">${error}. This is a malfunction. Please contact site administrator. </div>`); 
      }
    })(m_address);
  }

  function getRepresentativesByOffice(data, office) {
    const container = document.createElement('div');
    container.classList.add('representatives-container');
  
    office.officialIndices.forEach(index => {
      const representative = data.officials[index];
      const profile = createRepresentativeProfile(representative, office.name);
      container.appendChild(profile);
    });
  
    return container;
  }
  
  function createRepresentativeProfile(data, office) {
    const container = document.createElement('div');
    container.classList.add('profile-container');
  
    // Create profile picture
    const profilePicture = document.createElement('div');
    profilePicture.classList.add('profile-picture');
    container.appendChild(profilePicture);
  
    // Create officer name
    const officerName = document.createElement('h2');
    officerName.textContent = data.name;
    container.appendChild(officerName);
  
    // Create officer title
    const officerTitle = document.createElement('h4');
    officerTitle.classList.add('italic');
    officerTitle.textContent = office;
    container.appendChild(officerTitle);
  
    // Create links section
    const links = document.createElement('div');
    container.appendChild(links);
  
    // Add links for each URL in the data
    data.urls.forEach(url => {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url;
      links.appendChild(link);
    });
  
    // Add links for each channel in the data
    data.channels.forEach(channel => {
      const link = document.createElement('a');
      link.href = `https://${channel.type.toLowerCase()}.com/${channel.id}`;
      link.textContent = `${channel.type}: ${channel.id}`;
      links.appendChild(link);
    });
  
    return container;
  }
  
  