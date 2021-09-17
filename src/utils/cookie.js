// эта функция нормализует работу с временем жизни куки и обрабатывает те случаи, когда время жизни куки не было передано.
// { expires: 20 * 60 } - передать такое в качестве аргумента props, чтобы выставить время жизни куки на 20 минут
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  // console.log(`cookie named ${name} updated:`);
  // console.log(updatedCookie);
  document.cookie = updatedCookie;
}

// Authorization: 'Bearer ' + getCookie('accessToken')
export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      //eslint-disable-next-line
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}