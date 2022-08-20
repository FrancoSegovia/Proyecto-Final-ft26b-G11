export default function inputCheckout(user) {
  const error = {};
  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\d/?~]/.test(user.name.trim())) {
    error.name = "El Nombre no debe contener caracteres especiales";
  } else if (user.name.length < 1) {
    error.name = "Campo Obligatorio";
  }

  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\d/?~]/.test(user.lastname.trim())) {
    error.lastname = "El Nombre no debe contener caracteres especiales";
  } else if (user.lastname.length < 1) {
    error.lastname = "Campo Obligatorio";
  }

  // if (/\S+@\S+\.\S+/.test(user.email.trim())) {
  //   error.email = "El email no es valido";
  // } else
  if (user.email.length < 1) {
    error.email = "Campo Obligatorio";
  }

  if (user.password.length < 1) {
    error.password = "Campo Obligatorio";
  }

  if (user.cPassword.trim() !== user.password.trim()) {
    error.cPassword = "Las contraseñas no coinciden";
  } 

  return error;
}
