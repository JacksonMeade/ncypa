const LAST_SLIDE = 3;
const APP_URL = 'https://script.google.com/macros/s/AKfycbzmm99A2hwSprth15KNyhLaHXtXLsDRNzlCXvl6M1DgxfIU5AV7KNqDfDQ2_WNCiId-hQ/exec';
let currentSlide = 0;

function updateFormData() {
    // Get the input values from the first three fieldsets
    const name = $('input[name="name"]').val();
    const email = $('input[name="email"]').val();
    const phone = $('input[name="phone"]').val();
    const address = $('input[name="address"]').val();
    const isJoiningMailList = $('input[name="mailing-list"]').is(':checked');
  
    // Update the text and textarea fields in the third fieldset with street number, street name, city, state, and zip
    $('p[name="name"]').text(name);
    $('p[name="email"]').text(email);
    $('p[name="phone"]').text(phone);
    $('p[name="address"]').text(address);
    
    currentSlide++;

    if (currentSlide === LAST_SLIDE) {
        let formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Phone', phone);

        (isJoiningMailList) && (async (a_formData) => {
            try {
                const response = await fetch(APP_URL, { 
                    method: 'POST',
                    body: JSON.stringify(Object.fromEntries(a_formData))
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        })(formData);

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

  
    // immediately invoke async function to fetch data
    (async (a_address) => {
        await waitforme(1276);

      try {
        const response = await fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${a_address}&key=AIzaSyAnrUsAM4UGHyotngXazEsHwxbYpCL2Whg`);
        const data = await response.json(); 

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
        // replace loading div with error message
        $('#loading').replaceWith(`<div data-process="true" style="color: red">${error.message.toLowerCase()}</div>`); 
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
    let hasPhoto = false;
    const container = document.createElement('div');
    container.classList.add('profile-container');
    container.classList.add('row');

    const picture = document.createElement('div');
    picture.classList.add('profile-picture-container');
    const info = document.createElement('div');
    info.classList.add('profile-info-container');
  
    // Create profile picture
    (hasPhoto) && (() => {
        const profilePicture = document.createElement('img');
        profilePicture.classList.add('profile-picture');
        profilePicture.src = data.photoUrl;
        picture.appendChild(profilePicture);
    })();
  
    // Create officer name
    const officerName = document.createElement('h2');
    officerName.textContent = `${data.name} (${data.party.charAt(0)})`;
    info.appendChild(officerName);


    // Create officer office
    const officerOffice = document.createElement('h3');
    officerOffice.textContent = office;
    info.appendChild(officerOffice);
  
  
    // Create links section
    const links = document.createElement('div');
    links.classList.add('social-links-container');
  
/*     // Add buttons for each URL in the data
    data.urls.forEach(url => {
      const button = document.createElement('button');
      button.classList.add('social-button');
      button.innerHTML = `
        <a target="_blank" href="${url}" class="no-interaction">
          <img src="./assets/img/svg/link.svg" class="social-icon">
        </a>
      `;
      links.appendChild(button);
    }); */
  


    data.phones.forEach(phone => {
      const link = document.createElement('a');
      link.classList.add('no-interaction');
      link.target = '_blank';
      link.href = `tel:${phone}`;
      link.innerHTML = `
        <img src="./assets/img/svg/phone.svg" class="social-icon">
      `;
      links.appendChild(link);
    });

    // Add buttons for each channel in the data
    data.channels.forEach(channel => {
      const link = document.createElement('a');
      link.classList.add('no-interaction');
      link.target = '_blank';
      link.href = `https://${channel.type.toLowerCase()}.com/${channel.id}`;
      link.style.marginLeft = '5px';
      link.style.marginRight = '5px';
      link.innerHTML = `
        <img src="./assets/img/svg/${channel.type.toLowerCase()}.svg" class="social-icon">
      `;
      links.appendChild(link);
    });

    (hasPhoto) && container.appendChild(picture);
    container.appendChild(info);
    container.appendChild(links);
  
    return container;
  }
  
  
  
  function waitforme(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}