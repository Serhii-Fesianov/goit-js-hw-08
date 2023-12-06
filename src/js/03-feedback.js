import throttle from 'lodash.throttle';
import storage from './localStorage';

// localStorage
const STORAGE_KEY = 'feedback-form-state';

// set form
const form = document.querySelector('form');

// set event listener
form.addEventListener('input', throttle(onIput, 500));

form.addEventListener('submit', onFormSubmit);

// clean form when submit information
function onFormSubmit(event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const message = event.target.elements.message.value;
  console.log(email, message);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onIput(event) {
  const { name, value } = event.target;
  const savedFormData = storage.load(STORAGE_KEY) || {};
  savedFormData[name] = value;
  storage.save(STORAGE_KEY, savedFormData);
}

// get not saved information

function outPut(form) {
  const savedFormData = storage.load(STORAGE_KEY);

  if (savedFormData) {
    form.elements.email.value = savedFormData.email || '';
    form.elements.message.value = savedFormData.message || '';
  }
}

outPut(form);
