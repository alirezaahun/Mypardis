import fa from '~/i18n/translations/fa.json';

export const __ = (key, args = {}) => {
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;

  const translationValue = fa[key];

  const replaceFields = (_substring, value) => {
    if (args) {
      value = args[value];
    }

    return value;
  };

  const replaceFieldsForArrays = (item) =>
    item.replace(templateMatcher, replaceFields);

  if (typeof translationValue === 'object' && Array.isArray(translationValue)) {
    return translationValue.map(replaceFieldsForArrays);
  }

  if (typeof translationValue === 'string') {
    return translationValue.replace(templateMatcher, replaceFields);
  }
};
