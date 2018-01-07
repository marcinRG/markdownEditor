export function setEnabled(val: boolean, elem: HTMLInputElement | HTMLTextAreaElement) {
    if (elem) {
        elem.disabled = !val;
    }
}

export function setValue(val: string, elem: HTMLInputElement | HTMLTextAreaElement) {
    if (elem) {
        elem.value = val;
    }
}

// const debounce = <A>(f: (a: A) => void, delay: number) => {
//     let timer: number = null;
//     return (a: A) => {
//         if (!timer) {
//             timer = setTimeout(() => f(a), delay);
//         } else {
//             clearTimeout(timer);
//             timer = setTimeout(() => f(a), delay);
//         }
//     };
// };

export function debounce<A>(f: (a: A) => void, delay: number) {
    let timer: number = null;
    return (a: A) => {
        if (!timer) {
            timer = setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => f(a), delay);
        }
    };
}
