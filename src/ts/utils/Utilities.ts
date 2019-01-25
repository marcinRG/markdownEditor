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

export function HTMLElementExists(elem: HTMLElement | HTMLTextAreaElement | HTMLInputElement) {
    return (elem &&
        (elem instanceof HTMLTextAreaElement || elem instanceof HTMLElement));
}

export function getHTMLElement<T extends HTMLElement | HTMLTextAreaElement | HTMLInputElement>(selector: string): T {
    const elem: T = <T> document.querySelector(selector);
    if (HTMLElementExists(elem)) {
        return elem;
    } else {
        return null;
    }
}

export function debounce<A>(f: (a: A) => void, delay: number) {
    let timer: any = null;
    return (a: A) => {
        if (!timer) {
            timer = setTimeout(() => f(a), delay);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => f(a), delay);
        }
    };
}

export function requestParamsValid(params: any): boolean {
    if (params) {
        if (params.id && params.id !== '') {
            return true;
        }
    }
    return false;
}

export function databaseQueryValid(value: any) {
    if (value) {
        if (value.text && value.text !== '') {
            return true;
        }
    }
    return false;
}

export function createErrorMsg(txt: string): string {
    const p = document.createElement('p');
    p.classList.add('error-message');
    p.textContent = txt;
    return p.outerHTML;
}
