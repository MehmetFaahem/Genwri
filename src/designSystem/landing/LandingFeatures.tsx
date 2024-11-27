import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'

type FeatureType = {
  heading: string
  description: string | any
  icon: any
}

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  features: FeatureType[]
}

export const LandingFeatures: React.FC<Props> = ({
  title,
  subtitle,
  features,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames(
        'py-24 bg-gray-50',
        className,
      )}
      {...props}
    >
      <div className="container mx-auto px-6 max-w-7xl ">
        <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>
        <div className="flex flex-wrap gap-8 justify-center mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white w-full md:w-1/2 lg:w-1/4 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.heading}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
