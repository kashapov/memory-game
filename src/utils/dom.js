export const createElement = (tag, options = {}, children = []) => {
  const { className, text, attrs = {}, on = {} } = options;
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = String(text);
  }

  Object.entries(attrs).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  Object.entries(on).forEach(([event, handler]) => {
    element.addEventListener(event, handler);
  });

  element.append(...children);

  return element;
};

export const clearElement = (element) => {
  element.replaceChildren();
};
