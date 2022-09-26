const helpers: object = {
  func: {
    getAvatarName(name: string): string{
      if (name){
        const firstLetter = name.charAt(0)
        const lastSpace = name.lastIndexOf(" ")
        let lastLetter = ""

        if(lastSpace > 0) {
          lastLetter = name.substring(lastSpace + 1, lastSpace + 2);
        }

        return (firstLetter + lastLetter).toUpperCase()
      }

      return ''
    },

    getFirstName(name: string): string {
      if (name){
        return name.split(' ').slice(0, -1).join(' ')
      }

      return ''
    }
  },

  fonts: {
    // returns a custom poppins font
    poppins(fSize = '12px', hexColor = '#FFFFFF',
            fWeight = '600', lHeight = '19px',
            lSpacing = '0px'): string
    {
      const font = "font-family: 'Poppins', sans-serif;"
      const fontSize = `font-size: ${fSize};`
      const fontWeight = `font-weight: ${fWeight};`
      const lineHeight = `line-height: ${lHeight};`
      const letterSpacing = `letter-spacing: ${lSpacing};`
      const fontColor = `color: ${hexColor};`

      return `${font} ${fontSize} ${fontWeight}
              ${lineHeight} ${letterSpacing} ${fontColor}`
    }
  },

  rules: {
    // Checks if exists value in input
    required: (value: string) => !!value || 'Campo obrigatório.',

    // Checks if input value is an email
    validateEmail: (value: string) => {
      /* eslint-disable */
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(value) ? true : 'Email Inválido.'
    },

    // Checks if the input value contains more than 8 characters, uppercase letter, lowercase letter and numbers
    validatePassword: (value: string) => {
      let hasDigits = false
      let hasUppercase = false
      let hasLowercase = false
      let hasSpecial = false
      const specialChars = ` !"#$%&'()*+,-./:;<=>?@[^_\`{|}~`
      const upperCase = `QWERTYUIOPASDFGHJKLÇZXCVBNM`
      const lowerCase = `qwertyuiopasdfghjklçzxcvbnm`

      if(value && value.length > 0){
        for (let index = 0; index < value.length; index++) {
          if(upperCase.includes(value.charAt(index))){
            hasUppercase = true
          }

          if(lowerCase.includes(value.charAt(index))){
            hasLowercase = true
          }

          if(!isNaN(Number(value.charAt(index)))){
            hasDigits = true
          }

          if(specialChars.includes(value.charAt(index))){
            hasSpecial = true
          }
        }

        return (hasDigits && hasUppercase && hasLowercase && hasSpecial && value.length >= 8) ? true :
          'A senha deve conter no mínimo 8 caracteres, incluindo letras minúsculas, maiúsculas, números e caracteres especiais.'

      } else {
        return true
      }

    }
  }
}
export default helpers

export type VForm = Vue & { validate: () => boolean }