export default function inputCheckout(user) {
    const error = {};
 if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\d/?~]/.test(user.name)) {
    error.name = "El Nombre no debe contener caracteres especiales";
  } else if (!user.name) {
    error.name = "Name cannot be empty";
  }

//   if (user.summary.length < 50) {
//     error.summary = "Summary must be more descriptive";
//   } else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\d/?~]/.test(user.summary)) {
//     error.summary = "Summary must be a text without expecial caracters";
//   }  else if (!user.summary) {
//     error.summary = "Summaty cannot be empty";
//   }

  return error;
}