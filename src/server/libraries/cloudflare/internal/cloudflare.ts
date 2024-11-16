import { ReadStream } from 'fs'
import { z, ZodType } from 'zod'
import { AiGenerateTextOptions } from '../'

export class Cloudflare {
  private apiKey: string
  private accountId: string
  private baseUrl: string

  constructor() {
    this.initialize()
  }

  private initialize(): void {
    try {
      this.apiKey = process.env.SERVER_CLOUDFLARE_API_KEY
      this.accountId = process.env.SERVER_CLOUDFLARE_ACCOUNT_ID

      if (!this.apiKey || !this.accountId) {
        console.log(
          `Set SERVER_CLOUDFLARE_API_KEY and SERVER_CLOUDFLARE_ACCOUNT_ID in your .env to activate Cloudflare AI`,
        )
        return
      }

      this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run`
      console.log(`Cloudflare AI is active`)
    } catch (error) {
      console.error(`Cloudflare AI failed to start`)
    }
  }

  isActive(): boolean {
    return Boolean(this.apiKey && this.accountId)
  }

  async generateText(options: AiGenerateTextOptions): Promise<string> {
    const { prompt } = options

    const response = await fetch(
      `${this.baseUrl}/@cf/meta/llama-2-7b-chat-int8`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Cloudflare AI request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result.response
  }

  async generateJson<SchemaType extends ZodType>(
    instruction: string,
    content: string,
    schema: SchemaType,
  ): Promise<z.infer<SchemaType>> {
    const prompt = `${instruction}\n\nContent: ${content}\n\nRespond only with valid JSON matching this schema: ${schema}`

    const response = await fetch(
      `${this.baseUrl}/@cf/meta/llama-2-7b-chat-int8`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Cloudflare AI request failed: ${response.statusText}`)
    }

    const data = await response.json()
    const jsonResponse = JSON.parse(data.result.response)
    return schema.parse(jsonResponse)
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      },
    )

    if (!response.ok) {
      throw new Error(
        `Cloudflare AI image generation failed: ${response.statusText}`,
      )
    }

    // Get the image data as an ArrayBuffer
    const imageBuffer = await response.arrayBuffer()

    // Convert to base64
    const base64Image = Buffer.from(imageBuffer).toString('base64')

    // Return as a data URL that can be used in an <img> src
    return `data:image/png;base64,${base64Image}`
  }

  // Note: Cloudflare currently doesn't support audio transcription/generation
  // These methods are kept for API compatibility but will throw errors
  async fromAudioToText(readStream: ReadStream): Promise<string> {
    throw new Error('Audio transcription not supported by Cloudflare AI')
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    throw new Error('Text to audio conversion not supported by Cloudflare AI')
  }
}
