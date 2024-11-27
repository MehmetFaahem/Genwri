import { HTMLAttributes, ReactNode } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import Typewriter from 'typewriter-effect'
import { DesignSystemUtility } from '../helpers/utility'
import LandingButton from './LandingButton'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  buttonText: string
  pictureUrl?: string
  socialProof?: ReactNode
}

export const LandingHero: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  pictureUrl,
  socialProof = '',
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames(
        'relative h-screen flex items-center justify-center text-white px-4',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0">
        <img
          src={pictureUrl}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-100 blur-sm brightness-50"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          Create Professional{' '}
          <span className="">
            <Typewriter
              options={{
                strings: ['Images', 'Articles'],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
          in Seconds with AI
        </h1>
        <p className="text-xl md:text-2xl mb-8 mt-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <LandingButton
          href={'/login'}
          className="bg-white w-fit hover:text-black text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition duration-300 flex items-center mx-auto"
          rel="noopener"
          size="lg"
        >
          {buttonText}
          <FiArrowRight className="ml-2" />
        </LandingButton>
        {/* {socialProof && <div className="mt-6">{socialProof}</div>} */}
      </div>
    </section>
  )
}
