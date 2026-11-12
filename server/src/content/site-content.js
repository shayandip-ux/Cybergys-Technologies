export const banner = {
  eyebrow: 'WE ARE SKILLED IN',
  serviceLines: ['WEB', 'DESIGN'],
  connector: 'AND',
  highlight: 'development',
  customerMessage: 'We have 24k+ customers worldwide',
  video: {
    label: 'Play company video',
    assetKey: 'company-video',
  },
}

export const services = [
  {
    slug: 'web-designing',
    number: '01.',
    title: 'Web Designing',
    description: 'We craft custom designs with unparalleled creativity. Our goal is to balance innovation and user-experience to promote engagement as well as conversion!',
    image: { assetKey: 'web-designing', alt: 'Web designer working at a computer' },
  },
  {
    slug: 'web-development',
    number: '02.',
    title: 'Web Development',
    description: 'Experience tailored website development services at affordable prices. Get in touch with our professional developers and benefit from their expertise in cutting edge technologies.',
    image: { assetKey: 'web-development', alt: 'Web developer working at a computer' },
  },
  {
    slug: 'app-development',
    number: '03.',
    title: 'App Development',
    description: 'Our in-house application developers offer you top-notch services within the stipulated time. At Cybergys, we aim at developing robust mobile applications and offer the best user experience too.',
    image: { assetKey: 'app-development', alt: 'Application development illustration' },
  },
  {
    slug: 'digital-marketing',
    number: '04.',
    title: 'Digital Marketing',
    description: 'Cybergys team includes efficient professionals to offer the best digital marketing services. SEO, SMM, Content creation and marketing—we have it all at a reasonable cost.',
    image: { assetKey: 'digital-marketing', alt: 'Digital marketing illustration' },
  },
  {
    slug: 'ecommerce-customer-service',
    number: '05.',
    title: 'Ecommerce Customer Service',
    description: 'Applying some photoshop skills to upgrade product images and optimizing their titles and descriptions with high-ranking keywords are essential to run your online store!',
    image: { assetKey: 'ecommerce-customer-service', alt: 'Customer service representative illustration' },
  },
]

export const testimonials = [
  {
    id: 'ceyhan-ozcivit',
    rating: 4.9,
    review: 'We full service digital agency that build’s fascinating users experiences...',
    name: 'Ceyhan Özçivit',
    position: 'Mid-Level Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
  },
  {
    id: 'sophia-williams',
    rating: 5,
    review: 'Amazing experience working with this team. Their creativity and attention to detail made everything better...',
    name: 'Sophia Williams',
    position: 'Product Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
  },
  {
    id: 'james-anderson',
    rating: 4.8,
    review: 'Professional, reliable and incredibly talented. They delivered exactly what our business needed...',
    name: 'James Anderson',
    position: 'Marketing Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    id: 'olivia-martin',
    rating: 5,
    review: 'A fantastic digital partner. The entire process was smooth, creative and results driven...',
    name: 'Olivia Martin',
    position: 'Business Owner',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
  },
]

export const technologies = [
  'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'jQuery', 'PHP', 'MySQL', 'Laravel',
  'Python', 'Angular', 'WordPress', 'HighLevel', 'LeadsHook', 'Webflow', 'Photoshop', 'Figma',
].map((name) => ({ name, assetKey: name.toLowerCase().replaceAll(' ', '-') }))

export const portfolio = [
  { id: 'web-development-one', title: 'Web Development', category: 'Branding', year: 2026, image: { assetKey: 'portfolio-web-development-one', alt: 'Web design project illustration' } },
  { id: 'web-design-one', title: 'Web Design', category: 'Branding', year: 2026, image: { assetKey: 'portfolio-web-design-one', alt: 'Web development project illustration' } },
  { id: 'web-development-two', title: 'Web Development', category: 'Branding', year: 2026, image: { assetKey: 'portfolio-web-development-two', alt: 'Application development project illustration' } },
  { id: 'web-design-two', title: 'Web Design', category: 'Branding', year: 2026, image: { assetKey: 'portfolio-web-design-two', alt: 'Digital marketing project illustration' } },
]

export const contact = {
  phone: '+91 9007753459',
  email: 'info@cybergys.com',
  address: '15th Floor, Module 18, Bengal Eco Intelligent Park, EM-3, Sector V, Salt Lake, Kolkata – 700091',
  subjects: ['Web Designing', 'Web Development', 'App Development', 'Digital Marketing', 'Other'],
}
