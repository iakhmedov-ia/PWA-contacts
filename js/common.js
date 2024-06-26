const contacts = document.querySelector('.contacts')

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
  // add contact form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'right'});
});

//implement render contact

const renderContact = (data, id) => {
  const html = `
  <div class="grey-text text-darken-1 pk-contact">
    <div class="contact-image">
      <img src="img/icons/contact.png" alt="contact thumb">
    </div>
    <div class="contact-details">
      <div class="contact-title">${data.name}</div>
      <div class="contact-numbers">${data.number}</div>
    </div>
    <div class="contact-options">        
      <i class="material-icons">call</i>              
      <i class="material-icons" data-id="${id}">delete_outline</i>              
    </div>
  </div>`

    contacts.innerHTML += html
}


// const renderContact = (data, id) => {
//   // Create a new contact element
//   const contactDiv = document.createElement('div');
//   contactDiv.classList.add('grey-text', 'text-darken-1', 'pk-contact');

//   // Construct the inner HTML
//   contactDiv.innerHTML = `
//     <div class="contact-image">
//       <img src="img/icons/contact.png" alt="contact thumb">
//     </div>
//     <div class="contact-details">
//       <div class="contact-title">${data.name}</div>
//       <div class="contact-numbers">${data.number}</div>
//     </div>
//     <div class="contact-options">        
//       <i class="material-icons">call</i>              
//       <i class="material-icons" data-id="${id}">delete_outline</i>              
//     </div>
//   `;

//   // Append the contact element to the contacts container
//   contacts.appendChild(contactDiv);
// }


