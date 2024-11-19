import * as NodemailerSDK from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Provider, SendOptions } from '../provider'

export class NodemailerProvider implements Provider {
  private client: Mail

  constructor() {
    this.initialise()
  }

  private initialise() {
    try {
      const host = process.env.SERVER_EMAIL_HOST ?? 'smtp.ethereal.email'

      const port = process.env.SERVER_EMAIL_PORT ?? 587
      const user =
        process.env.SERVER_EMAIL_SENDER_ADDRESS ??
        'raquel.dickinson66@ethereal.email'
      const pass =
        process.env.SERVER_EMAIL_SENDER_PASSWORD ?? 'ctGKdb2gzWYpessyGp'

      this.client = NodemailerSDK.createTransport({
        host,
        port,
        auth: {
          user,
          pass,
        },
      })

      console.log(`Nodemailer is active (${host}:${port})`)
    } catch (error) {
      console.error(`Nodemailer failed to start: ${error.message}`)
    }
  }

  async send(options: SendOptions): Promise<void> {
    for (const to of options.to) {
      await this.client
        .sendMail({
          from: `Marblism <no-reply@marblism.com>`,
          to: to.email,
          subject: options.subject,
          html: options.content,
        })
        .then(result => {
          console.log(`Emails sent`)
        })
        .catch(error => {
          console.error(`Could not send emails (${error.statusCode})`)
          console.error(error)
        })
    }
  }
}
