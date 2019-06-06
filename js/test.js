///.................................................................................
(function() {
  var $modalContainer = document.querySelector('#modal-container');

  console.log("start loading the page");
  // testing modal container

  var $form = document.querySelector('#register-form');
  var $emailInput = document.querySelector('#email');
  var $passwordInput = document.querySelector('#password');

  // validate email
  function validateEmail() {
    var value = $emailInput.value;

    // check if empty
    if (!value || value.length == -1) {
      showErrorMessage($emailInput, 'Email is a required field.');
      return false;
    }

    // check that it has the correct @ and . that make up an email address
    var hasAtSign = value.indexOf('@') > -1;
    var hasDot =  value.indexOf('.') > -1;
    if (!hasAtSign || !hasDot) {
      showErrorMessage($emailInput, 'You must enter a valid email address.');
      return false;
    }

    // clear the error message is all is good.
    showErrorMessage($emailInput, null);

    //if all tests pass it can return true.
    return value && hasAtSign && hasDot;
  }


  //validate password
  function validatePassword() {
      var value = $passwordInput.value;
      var isLongEnough = value.length > 7;

      //if no value has been entered, show an error message.
      if (!value) {
        showErrorMessage($passwordInput, 'Password is a required field.');
        return false;
      }

      // if password is not long enough. show an error message.
      if (!isLongEnough) {
        showErrorMessage($passwordInput, 'The password needs to be at least 8 characters long.');
        return false;
      }

      // if the password is long enough, do not show an error message.
      showErrorMessage($passwordInput, null);

    // if there is a value and it is long enough then this can return true.
    return value && isLongEnough;
  }

  // validate form - returns validateEmail and validatePassword
  function validateForm() {
    var isValidEmail = validateEmail();
    var isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  // show any error message in the labels
  function showErrorMessage($input, message) {
    var $container = $input.parentElement; // The .input-wrapper

    // Remove an existing error
    var error = $container.querySelector('.error-message');
    if (error) {
      $container.removeChild(error);
    }

    // Now add the error if the message isn’t empty
    if (message) {
      var error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      $container.appendChild(error);
    } else {
      var error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = '';
    }
}

  $emailInput.addEventListener('input', validateEmail);
  $passwordInput.addEventListener('input', validatePassword);

function showModal(title, text) {
     // Clear all existing modal content
     $modalContainer.innerHTML = '';

     var modal = document.createElement('div');
     modal.classList.add('modal');

     // Add the new modal content
     var closeButtonElement = document.createElement('button');
     closeButtonElement.classList.add('modal-close');
     closeButtonElement.innerText = 'Close';
     closeButtonElement.addEventListener('click', hideModal);

     var titleElement = document.createElement('h1');
     titleElement.innerText = title;

     var contentElement = document.createElement('p');
     contentElement.innerText = text;

     modal.appendChild(closeButtonElement);
     modal.appendChild(titleElement);
     modal.appendChild(contentElement);
     $modalContainer.appendChild(modal);

     $modalContainer.classList.add('is-visible');
}

// a subtype of showModal.
function showDialog(title, text) {
    showModal(title, text);
    // We want to add a confirm and cancel button to the modal
    var modal = $modalContainer.querySelector('.modal');

    var confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    var cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus();
      // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', () => {
        hideModal();
        reject();
      });
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });
      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
}

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');
    if (dialogPromiseReject) {
     dialogPromiseReject();
     dialogPromiseReject = null;
    }
  }


  document.querySelector('.button-register').addEventListener('click', (e) => {
      e.preventDefault();
      showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
          alert('confirmed');
        }, () => {
          alert('not confirmed');
        });
    });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
})();
