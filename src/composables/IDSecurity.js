let alphabets = 'abcdefghijklmnopqrstuvwxyz'

let alphabetsHashTable = {}
for (let index = 0; index < alphabets.length; index++) {
    alphabetsHashTable[alphabets[index]] = index
}

export function ceaserEncryption(pass, shift) {
    let password = pass.toLowerCase()
    let shiftCount = shift % alphabets.length
    let repeatIndex = (alphabets.length) - shiftCount
    let encrypted = ''

    for (let index = 0; index < password.length; index++) {
        let alphabetIndex = alphabetsHashTable[password[index]]
        if (!alphabetIndex && alphabetIndex !== 0) {
            encrypted += password[index]
        }
        else {
            if (alphabetIndex < repeatIndex) {
                encrypted += alphabets[alphabetIndex + shiftCount]
            } else {
                alphabetIndex = Math.abs((alphabets.length) - alphabetIndex -  shiftCount)
                encrypted += alphabets[alphabetIndex]
            }
        }
    }

    return encrypted
}

function ceaserDecryption(encrypt, shift) {
    let encrypted = encrypt.toLowerCase()
    let shiftCount = shift % alphabets.length
    let decrypted = ''

    for (let index = 0; index < encrypted.length; index++) {
        let alphabetIndex = alphabetsHashTable[encrypted[index]]
        if (alphabetIndex) {
            decrypted += encrypted[index]
        }
        else {
            if (alphabetIndex - shiftCount < 0) {
                alphabetIndex = (alphabets.length) - Math.abs(alphabetIndex - shiftCount)
                decrypted += alphabets[alphabetIndex]
            } else if (alphabetIndex - shiftCount >= 0) {
                decrypted += alphabets[alphabetIndex - shiftCount]
            }
        }
    }

    return decrypted
}