import * as yup from 'yup'

const namePhrase = 'Le nom est invalide (entre 4 et 30 caractères)'
const descPhrase = 'La description est invalide (entre 5 et 50 caractères)'
const lienPhrase = 'Le lien est invalide (format: https://www.youtube.com/watch?v=OazLgc1WKx)'

export const newVideoSchemas = yup.object().shape({
   name: yup.string().required(namePhrase).min(4, namePhrase).max(30, namePhrase).typeError(namePhrase),
   description: yup.string().required(descPhrase).min(5, descPhrase).max(50, descPhrase).typeError(descPhrase),
   lien: yup.string().required(lienPhrase).url().typeError(lienPhrase)
})

export const editVideoSchemas = yup.object().shape({
   name: yup.string().required(namePhrase).min(4, namePhrase).max(30, namePhrase).typeError(namePhrase),
   url: yup.string().required(lienPhrase).url().typeError(lienPhrase)
})
