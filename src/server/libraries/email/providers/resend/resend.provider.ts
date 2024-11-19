import { Resend } from 'resend'
import { Provider, SendOptions } from '../provider'

import { EmailTemplate } from './email-template'

export class ResendProvider implements Provider {
  private client: Resend

  constructor() {
    this.initialise()
  }

  private initialise(): void {
    // const isProduction = process.env.NODE_ENV === 'production'

    // if (!isProduction) {
    //   console.warn(`Resend is disabled in development`)
    //   return
    // }

    try {
      const apiKey = process.env.SERVER_EMAIL_RESEND_API_KEY

      if (!apiKey) {
        console.warn(`Set SERVER_EMAIL_RESEND_API_KEY to activate Resend`)
        return
      }

      this.client = new Resend(apiKey)

      console.log(`Resend service active`)
    } catch (error) {
      console.error(`Could not start Resend service`)
      console.error(error)
    }
  }

  async send(options: SendOptions): Promise<void> {
    if (!this.client) {
      console.warn('Resend client not initialized')
      return
    }

    try {
      const { data, error } = await this.client.emails.send({
        from: 'Marblism <no-reply@gmail.com>',
        to: options.to.map(recipient => recipient.email),
        subject: options.subject,
        react: EmailTemplate({ firstName: 'John' }),
      })

      if (error) {
        throw error
      }

      console.log(`Emails sent`, data)
    } catch (error) {
      console.error(`Could not send emails`)
      console.error(error)
    }
  }
}
