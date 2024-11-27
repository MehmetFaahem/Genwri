import { HTMLAttributes, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { DesignSystemUtility } from '../helpers/utility'

type Testimonial = {
  name: string
  content: string
  designation?: string
  avatar?: string
}

interface Props extends HTMLAttributes<HTMLElement> {
  anchorId?: string
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export const LandingTestimonials: React.FC<Props> = ({
  title,
  subtitle,
  testimonials,
  className,
  ...props
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500) // Match the duration of the CSS transition
  }

  const prevTestimonial = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial(prev =>
        prev === 0 ? testimonials.length - 1 : prev - 1,
      )
      setIsAnimating(false)
    }, 500) // Match the duration of the CSS transition
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 10000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-24', className)}
      {...props}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 -translate-x-12"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 translate-x-12"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div
            className={`bg-white p-8 rounded-xl shadow-lg text-center transition-transform duration-500 ease-in-out ${
              isAnimating
                ? 'transform scale-95 opacity-50'
                : 'transform scale-100 opacity-100'
            }`}
          >
            <img
              src={testimonials[currentTestimonial].avatar}
              alt={testimonials[currentTestimonial].name}
              className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
            />
            <p className="text-xl italic mb-6">
              {testimonials[currentTestimonial].content}
            </p>
            <h4 className="font-bold">
              {testimonials[currentTestimonial].name}
            </h4>
            <p className="text-gray-600">
              {testimonials[currentTestimonial].designation}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
