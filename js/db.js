db.enablePersistence().catch(err => {
    if(err.code == 'failed-precondition'){
      console.log('persistence failed.')
    } else if (err.code == 'unimplemented') {
      console.log('Persistence not supported.')
    }
    }
)

// Real-time listener for changes in the 'contacts' collection
db.collection('contacts').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
          renderContact(change.doc.data(), change.doc.id);
      }
      if (change.type === 'removed') {
          removeContact(change.doc.id)
      }
  })
})


/// add new contact
const form = document.querySelector('form')

form.addEventListener('submit', event => {
  event.preventDefault()

  const contact = {
    name: form.name.value,
    number: form.numbers.value
  }

  db.collection('contacts').add(contact)
  .catch(err => {
    console.log(err);
  })

  form.name.value = ''
  form.numbers.value = ''
})

// delete contact
const contactContainer = document.querySelector('.contacts')

contactContainer.addEventListener('click', event => {
  if(event.target.tagName === 'I') {
    const id = event.target.getAttribute('data-id')
    db.collection('contacts').doc(id).delete()
  }
})


