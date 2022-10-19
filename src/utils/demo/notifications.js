import Swal from "sweetalert2";

var toastMixin = Swal.mixin({
  toast: true,
  icon: "success",
  title: "General Title",
  position: "top-right",
  showConfirmButton: false,
  timer: 15000,
  timerProgressBar: true,
  showCloseButton: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default async function Notifications(type, title, message) {
  let themeColor = "#136762";
  let fontColor = "#ffffff";

  toastMixin.fire({
    title: title,
    text: message,
    icon: type,
    color: fontColor,
    background: themeColor,
  });
}
