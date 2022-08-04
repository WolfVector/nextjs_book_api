import Swal from 'sweetalert2'

function alertMessage(obj_alert: any) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    Toast.fire({
        title: obj_alert.message,
        icon: obj_alert.icon,
    });
}

export { alertMessage };
