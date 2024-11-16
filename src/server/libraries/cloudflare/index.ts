import { ReadStream } from 'fs'
import { ZodType } from 'zod'
import { Cloudflare } from './internal/cloudflare'

export type AiGenerateTextOptions = {
  prompt: string
  attachmentUrls?: string[]
  history?: string[]
  context?: string
}

class Service {
  private ai = new Cloudflare()

  async generateText(options: AiGenerateTextOptions): Promise<string> {
    return this.ai.generateText(options)
  }

  async generateJson<SchemaType extends ZodType>(
    instruction: string,
    content: string,
    schema: SchemaType,
  ) {
    return this.ai.generateJson<SchemaType>(instruction, content, schema)
  }

  async generateImage(prompt: string): Promise<string> {
    return this.ai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.ai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.ai.fromTextToAudio(text)
  }

  isActive(): boolean {
    return this.ai.isActive()
  }
}

class Singleton {
  static service = new Service()
}

export const AiService = Singleton.service
