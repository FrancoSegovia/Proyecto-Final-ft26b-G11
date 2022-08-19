export default function inputCheckout(user) {
  const error = {};
  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\d/?~]/.test(user.name)) {
    error.name = "El Nombre no debe contener caracteres especiales";
  } else if (user.name.length < 1) {
    error.name = "Name cannot be empty";
  }

  return error;
}