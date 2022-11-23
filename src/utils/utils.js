import Swal from "sweetalert2";
export const successMessage = (msg) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
};
export const failureMessage = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    focusConfirm: true,
  });
};
