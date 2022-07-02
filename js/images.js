const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field').querySelector('input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const propertyPictureChooser = document.querySelector('.ad-form__upload input');
const propertyPicturePreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = ALLOWED_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

propertyPictureChooser.addEventListener('change', () => {
  const file = propertyPictureChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = ALLOWED_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const imageElement = document.createElement('img');
    imageElement.width = '70';
    imageElement.height = '70';
    imageElement.src = URL.createObjectURL(file);
    propertyPicturePreview.appendChild(imageElement);
  }
});
