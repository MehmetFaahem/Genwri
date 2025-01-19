import { v2 as cloudinary } from 'cloudinary'
import {
  FromPrivateToPublicUrlOptions,
  UploadPrivateOptions,
  UploadPrivateReturn,
  UploadProvider,
  UploadPublicOptions,
  UploadPublicReturn,
} from '../../../upload.provider'

export class UploadProviderCloudinary extends UploadProvider {
  public async initialise(): Promise<void> {
    try {
      cloudinary.config({
        cloud_name: 'devvizeuo',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      console.log('Cloudinary upload provider initialized')
    } catch (error) {
      console.error('Failed to initialize Cloudinary:', error)
      throw error
    }
  }

  async uploadPublic({
    file,
  }: UploadPublicOptions): Promise<UploadPublicReturn> {
    try {
      // Convert buffer to base64
      const base64Data = file.buffer.toString('base64')
      const dataUri = `data:${file.mimetype};base64,${base64Data}`

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'genoai/public',
      })

      return { url: result.secure_url }
    } catch (error) {
      console.error('Failed to upload to Cloudinary:', error)
      throw error
    }
  }

  async uploadPrivate({
    file,
  }: UploadPrivateOptions): Promise<UploadPrivateReturn> {
    try {
      const base64Data = file.buffer.toString('base64')
      const dataUri = `data:${file.mimetype};base64,${base64Data}`

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'genoai/private',
        type: 'private',
      })

      return { url: result.secure_url }
    } catch (error) {
      console.error('Failed to upload to Cloudinary:', error)
      throw error
    }
  }

  async fromPrivateToPublicUrl({
    url,
  }: FromPrivateToPublicUrlOptions): Promise<UploadPrivateReturn> {
    // For Cloudinary, we can return the same URL as it handles access control
    return { url }
  }
}
