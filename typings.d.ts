export type CommentType = {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

export type PostType = {
  _id: string
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
  }
  comments: CommentType[]
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: object[]
}
