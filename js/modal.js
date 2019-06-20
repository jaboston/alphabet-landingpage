/* eslint spaced-comment: 0, no-unused-vars: 0, space-before-function-paren: 0, indent: 0, no-undef: 0, brace-style: 0, curly: 0*/
/* global $, console*/

// MODAL closure
///.................................................................................
function modal(shouldShowModal,
  shouldShowDialog,
  title,
  text,
  secondaryText,
  imageUrl, extraUrl) {
  var $modalContainer = $('#modal-container')
  var $baseModal = $(
      '<div class="modal created rubberBand animated"></div>'
    )
    // <div class="modal created rubberBand animated" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"></div></div></div></div>

  console.log('start loading the page')
    // testing modal container

  function showModal(title, text, secondaryText, imageUrl, extraUrl) {
    // Clear all existing modal content
    $modalContainer.empty()
    $('#modal-container').innerHTML = ''

    // Add the new modal content
    var closeButtonElement = $(
      '<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">Close</button>'
    )
    closeButtonElement.on('click', hideModal)

    var titleElement = $('<h1 class="modal-title">' + title + '</h1>')
    titleElement.innerText = title

    var contentElement = $('<p class="modal-content">' + text + '</p>')
    contentElement.innerText = text

    var content2Element = $('<p class="modal-body">' + secondaryText + '</p>')
    content2Element.innerText = secondaryText

    var image = $("<img class='pokemon-image' src=" + imageUrl + '></img>')
    image.src = imageUrl

    $baseModal.append(closeButtonElement)
    $baseModal.append(titleElement)
    $baseModal.append(contentElement)
    $baseModal.append(content2Element)
    $baseModal.append(image)
    if ($baseModal.parentElement !== $('#modal-container')) {
      $('#modal-container').append($baseModal)
    }
    $('#modal-container').addClass('is-visible')
  }

  // a subtype of showModal.
  function showDialog(title, text, secondaryText, imageUrl, extraUrl) {
    showModal(title, text, secondaryText, imageUrl, extraUrl)
      // We want to add a confirm and cancel button to the modal

    var confirmButton = $(
      "<button class='modal-confirm'>Show more details</button>")

    $baseModal.append(confirmButton)

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus()
      // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      confirmButton.on('click', () => {
          dialogPromiseReject = null
          console.log('extra url: ' + extraUrl)
          window.open(extraUrl, 'www.google.com')
          resolve()
        })
        // This can be used to reject from other functions
      dialogPromiseReject = reject
    })
  }
  var dialogPromiseReject // This can be set later, by showDialog

  function hideModal() {
    var $modalContainer = $('#modal-container')
    $('#modal-container').removeClass('is-visible')
    $('#modal-container').empty()
    $baseModal.empty()
    $modalContainer.remove($modal)
    console.log($('#modal-container').children().length)
  }

  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.hasClass(
        'is-visible')) {
      hideModal()
    }
  })

  $('#modal-container').on('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target
    if (target.getAttribute('id') === 'modal-container') {
      hideModal()
    }
  })

  if (shouldShowModal) showModal(title, text, secondaryText, imageUrl,
    extraUrl)
  if (shouldShowDialog) showDialog(title, text, secondaryText, imageUrl,
    extraUrl)
};
