import { setLocale, object, string, date } from 'yup'

setLocale({
  mixed: {
    required: 'You must fill this field',
    oneOf: 'You have to choose an alternative',
    notType: 'The field is not in the correct format',
  },
  string: {
    email: 'The field must be a valid email address',
    url: 'The field must be an address for a web page',
  },
  number: {
    integer: 'The field must be a valid number',
  },
})

export const jobSchema = object().shape({
  company: string().required(),
  location: string().required(),
  title: string().required(),
  link: string().url().required(),
  description: string().required(),
  type: string().oneOf(['full', 'part', 'summer', 'other']),
  deadline: date().required(),
})
