import throttle from 'lodash.throttle';
import storage from './localStorage';

// localStorage
const STORAGE_KEY = 'feedback-form-state';

// object form
const refs = {
  form: document.querySelector('form'),
  eMail: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

console.log(refs);

// set event listener
refs.form.addEventListener('input', throttle(onIput, 500));

refs.form.addEventListener('submit', onFormSubmit);

// clean form when submit information

function onFormSubmit(event) {
  event.preventDefault();
  console.log(refs.eMail.value, refs.message.value);
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

function outPut() {
  const savedFormData = storage.load(STORAGE_KEY);

  if (savedFormData) {
    refs.eMail.value = savedFormData.email || '';
    refs.message.value = savedFormData.message || '';
  }
}

outPut();
