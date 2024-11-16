'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  DollarOutlined,
  EditOutlined,
  PictureOutlined,
  RocketOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Powered Image Generation`,
      description: `Create stunning visuals instantly with our advanced AI technology - no design skills needed.`,
      icon: <PictureOutlined />,
    },
    {
      heading: `SEO-Optimized Content`,
      description: `Generate articles that rank higher on search engines and drive organic traffic to your site.`,
      icon: <SearchOutlined />,
    },
    {
      heading: `Lightning Fast Creation`,
      description: `Save hours of work with instant content generation that maintains quality and relevance.`,
      icon: <ThunderboltOutlined />,
    },
    {
      heading: `Professional Writing`,
      description: `Get polished, engaging articles that resonate with your target audience.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Cost-Effective Solution`,
      description: `Eliminate expensive subscriptions and freelancer fees with our all-in-one platform.`,
      icon: <DollarOutlined />,
    },
    {
      heading: `Unlimited Potential`,
      description: `Scale your content creation without limits - generate as much as you need, whenever you need it.`,
      icon: <RocketOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Digital Marketing Manager`,
      content: `Genwri has transformed our content strategy. We're now producing twice the content in half the time, and our engagement metrics have never been better.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `James Wilson`,
      designation: `Small Business Owner`,
      content: `As a solo entrepreneur, Genwri has been a game-changer. I can maintain a professional online presence without breaking the bank.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Maria Rodriguez`,
      designation: `Content Creator`,
      content: `The quality of AI-generated images is incredible. I've cancelled all my stock photo subscriptions since discovering Genwri.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for individuals and small projects`,
      monthly: 0,
      yearly: 0,
      features: [
        `5 AI Images per day`,
        `3 Articles per day`,
        `Basic SEO optimization`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing businesses`,
      monthly: 29,
      yearly: 290,
      features: [
        `Unlimited AI Images`,
        `Unlimited Articles`,
        `Advanced SEO tools`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For large teams and organizations`,
      monthly: 99,
      yearly: 990,
      features: [
        `Everything in Pro`,
        `API Access`,
        `Custom AI training`,
        `Dedicated support`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the AI image generation work?`,
      answer: `Our AI technology transforms your text descriptions into high-quality images in seconds. Simply describe what you want, and our system will generate unique visuals that match your requirements.`,
    },
    {
      question: `Is the content truly SEO-optimized?`,
      answer: `Yes! Our AI writer is trained on current SEO best practices and automatically optimizes content for search engines while maintaining readability and engagement.`,
    },
    {
      question: `Can I use the generated content commercially?`,
      answer: `Absolutely! All content generated through Genwri is yours to use for any purpose, including commercial use.`,
    },
    {
      question: `What makes Genwri different from other AI content tools?`,
      answer: `Genwri uniquely combines both image and text generation in one platform, offering unlimited creation capabilities at an unbeatable price point.`,
    },
  ]

  const steps = [
    {
      heading: `Describe Your Vision`,
      description: `Tell us what type of content or images you need using simple text prompts.`,
    },
    {
      heading: `AI Magic at Work`,
      description: `Our advanced AI instantly generates high-quality content and visuals based on your description.`,
    },
    {
      heading: `Review and Refine`,
      description: `Make quick adjustments to perfect your content with our intuitive editing tools.`,
    },
    {
      heading: `Publish and Succeed`,
      description: `Share your professional content across any platform and watch your engagement soar.`,
    },
  ]

  const painPoints = [
    {
      emoji: `💰`,
      title: `Spending too much on content creation`,
    },
    {
      emoji: `⏰`,
      title: `Hours wasted searching for perfect images`,
    },
    {
      emoji: `😓`,
      title: `Struggling to maintain consistent quality`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  const logos = [
    // Add your logo URLs here
    // Example:
    // { src: 'https://example.com/logo1.png' },
    // { src: 'https://example.com/logo2.png' },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Create Professional Content in Seconds with AI`}
        subtitle={`Generate unlimited AI images and SEO-optimized articles. No design skills needed. No writing expertise required.`}
        buttonText={`Start Creating For Free`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/kGR4VC-genwri-phTP`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`content creators trust Genwri`}
          />
        }
      />
      {/* <LandingSocialProof logos={logos} title={`Featured on`} /> */}
      <LandingPainPoints
        title={`47% of businesses struggle with content creation, costing them $5000+ annually in outsourcing fees`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Content Creation Journey Made Simple`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Create Professional Content`}
        subtitle={`Powerful tools that transform your ideas into engaging content`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Satisfied Creators`}
        subtitle={`See how Genwri is helping businesses save time and money while creating better content`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Start Creating Professional Content Today`}
        subtitle={`Choose the perfect plan for your content needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Genwri`}
        subtitle={`Everything you need to know about our AI-powered content creation platform`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Transform Your Content Creation Today`}
        subtitle={`Join thousands of creators who are already saving time and money with Genwri`}
        buttonText={`Start Creating For Free`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
