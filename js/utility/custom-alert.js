const customAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '10px 10px';
  alertContainer.style.margin = '10px 10px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'left';
  alertContainer.style.backgroundColor = '#f5f5f5';
  alertContainer.textContent = message;
  alertContainer.style.border = '4px solid';
  alertContainer.style.borderColor = '#ff6547';
  alertContainer.style.borderRadius = '8px';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export {customAlert};
