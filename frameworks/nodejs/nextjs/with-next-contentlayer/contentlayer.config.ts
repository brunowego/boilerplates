import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
  },
}))

export default makeSource({
  contentDirPath: './data',
  documentTypes: [Post],
})
