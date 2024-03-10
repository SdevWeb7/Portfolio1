import * as yup from 'yup'

const namePhrase = 'Le nom est invalide (entre 4 et 30 caractères)'
const descPhrase = 'La description est invalide (entre 5 et 50 caractères)'
const lienPhrase = 'Le lien est invalide (format: https://www.youtube.com/watch?v=OazLgc1WKx)'

export const newVideoSchemas = yup.object().shape({
   name: yup.string().required(namePhrase).min(4, namePhrase).max(30, namePhrase).typeError(namePhrase),
   description: yup.string().required(descPhrase).min(5, descPhrase).max(50, descPhrase).typeError(descPhrase),
   url: yup.string().required(lienPhrase).url().typeError(lienPhrase)
})

export const editVideoSchemas = yup.object().shape({
   id: yup.string(),
   name: yup.string().required(namePhrase).min(4, namePhrase).max(30, namePhrase).typeError(namePhrase),
   url: yup.string().required(lienPhrase).url().typeError(lienPhrase)
})


export const searchSchemas = yup.object().shape({
   searchKey: yup.string().typeError('Veuillez entrer un mot valide')
})

export const likeSchemas = yup.object().shape({
   videoId: yup.string().typeError('Le schéma ne correspond pas')
})

export const findVideosByCategorySchemas = yup.object().shape({
   categoryName: yup.string()
})

export const deleteVideoSchemas = yup.object().shape({
   videoId: yup.string()
})