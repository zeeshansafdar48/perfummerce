import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  _id: string
  productId: mongoose.Types.ObjectId
  userId?: mongoose.Types.ObjectId
  rating: number
  title?: string
  comment: string
  author: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
ReviewSchema.index({ productId: 1 })
ReviewSchema.index({ userId: 1 })
ReviewSchema.index({ rating: 1 })
ReviewSchema.index({ createdAt: -1 })

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)