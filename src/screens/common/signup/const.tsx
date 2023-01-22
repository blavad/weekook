import { accent_color } from "@unboared/base-ui.all";

const MIN_LENGTH_PASSWORD = 8
const MAX_LENGTH_PASSWORD = 40

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

export function strengthChecker(password: string) {
    let color, type;
    if (strongPassword.test(password)) {
        color = accent_color.success
        type = 'strong'
    } else if (mediumPassword.test(password)) {
        color = accent_color.error
        type = 'medium'
    } else {
        color = accent_color.warning
        type = 'weak'
    }
    return { color, type }
}
