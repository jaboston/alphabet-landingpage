function modal(shouldShowModal,shouldShowDialog,title,text,secondaryText,imageUrl,extraUrl){var $modalContainer=$('#modal-container')
var $baseModal=$('<div class="modal created rubberBand animated"></div>')
console.log('start loading the page')
function showModal(title,text,secondaryText,imageUrl,extraUrl){$modalContainer.empty()
$('#modal-container').innerHTML=''
var closeButtonElement=$('<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">Close</button>')
closeButtonElement.on('click',hideModal)
var titleElement=$('<h1 class="modal-title">'+title+'</h1>')
titleElement.innerText=title
var contentElement=$('<p class="modal-content">'+text+'</p>')
contentElement.innerText=text
var content2Element=$('<p class="modal-body">'+secondaryText+'</p>')
content2Element.innerText=secondaryText
var image=$("<img class='pokemon-image' src="+imageUrl+'></img>')
image.src=imageUrl
$baseModal.append(closeButtonElement)
$baseModal.append(titleElement)
$baseModal.append(contentElement)
$baseModal.append(content2Element)
$baseModal.append(image)
if($baseModal.parentElement!==$('#modal-container')){$('#modal-container').append($baseModal)}
$('#modal-container').addClass('is-visible')}
function showDialog(title,text,secondaryText,imageUrl,extraUrl){showModal(title,text,secondaryText,imageUrl,extraUrl)
var confirmButton=$("<button class='modal-confirm'>Show more details</button>")
$baseModal.append(confirmButton)
confirmButton.focus()
return new Promise((resolve,reject)=>{confirmButton.on('click',()=>{dialogPromiseReject=null
console.log('extra url: '+extraUrl)
window.open(extraUrl,'www.google.com')
resolve()})
dialogPromiseReject=reject})}
var dialogPromiseReject
function hideModal(){var $modalContainer=$('#modal-container')
$('#modal-container').removeClass('is-visible')
$('#modal-container').empty()
$baseModal.empty()
$modalContainer.remove($modal)
console.log($('#modal-container').children().length)}
$(window).on('keydown',(e)=>{if(e.key==='Escape'&&$modalContainer.hasClass('is-visible')){hideModal()}})
$('#modal-container').on('click',(e)=>{var target=e.target
if(target.getAttribute('id')==='modal-container'){hideModal()}})
if(shouldShowModal)showModal(title,text,secondaryText,imageUrl,extraUrl)
if(shouldShowDialog)showDialog(title,text,secondaryText,imageUrl,extraUrl)}
