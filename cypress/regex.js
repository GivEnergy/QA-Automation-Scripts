export const YYYYMMDD = /^\d{4,4}[-]\d{2,2}[-]\d{2,2}/
export const dateAndTime = /^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}/
export const serialNumber = /^[A-Z]{2,2}\w{5,5}\d{3,3}/
export const batteryFW = /^\d{1,4}$/
export const inverterFW = /^[D][0][.]{1,1}\d{3,3}[-]{1,1}[A][0][.]{1,1}\d{3,3}$/
export const positiveOrNegativeNumber = /^\d{1,}$|^[-]\d{1,}$/
export const positiveNumber = /^\d{1,}$/