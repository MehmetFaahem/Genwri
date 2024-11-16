# AI tRPC Api

The codebase includes a complete AI library router that uses Cloudflare Workers AI to generate text from prompts, generate structured output (JSON), and generate images from prompts.

## Generate text from prompt

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

const handleGenerateText = async (value: string) => {
  const { answer } = await generateText({
    prompt: `My prompt: ${value}`,
  })
}
```

## Generate text from prompt and picture

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

const handleGenerateText = async (value: string) => {
  const { answer } = await generateText({
    prompt: `My prompt: ${value}`,
    attachmentUrls: ['https://pictureurl.jpg'],
  })
}
```

## Generate picture from prompt

```tsx
import { Api } from '@/core/trpc'

const { mutateAsync: generateImage } = Api.ai.generateImage.useMutation()

const handleGeneratePicture = async (value: string) => {
  const { url } = await generateImage({
    prompt: `Generate a picture like: ${value}`,
  })
}
```
