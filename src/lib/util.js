export const append = (element,　string) => {
  const div = document.createElement('div');
  div.innerHTML = string;
  while (div.children.length > 0) {
    element.appendChild(div.children[0]);
  }
}

export const getUniqId = () => {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

export const remove = (element) => {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
}

export const triggerEvent = (el, eventName, options) => {
  let event;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, { cancelable: true });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }
  el.dispatchEvent(event);
}

export const removeClass = (element, className) => {
  if (element.classList){
    element.classList.remove(className);
  }else if (hasClass(element, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className=element.className.replace(reg, ' ');
  }
}

export const hasClass = (element, className) => {
  if (element.classList){
    return element.classList.contains(className);
  } else {
    return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
}