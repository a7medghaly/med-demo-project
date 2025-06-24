import { Product } from '../types';

export const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'جهاز قياس ضغط الدم الرقمي',
    price: 299,
    originalPrice: 349,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'أجهزة طبية',
    description: 'جهاز قياس ضغط الدم الرقمي عالي الدقة مع ذاكرة تخزين للقراءات السابقة وشاشة كبيرة سهلة القراءة.',
    ingredients: 'جهاز إلكتروني معتمد طبياً',
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    sku: 'BP-001',
    featured: true
  },
  {
    id: '2',
    title: 'فيتامين د3 5000 وحدة دولية',
    price: 89,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'مكملات غذائية',
    description: 'فيتامين د3 عالي التركيز لدعم صحة العظام والمناعة. 60 كبسولة جيلاتينية سهلة البلع.',
    ingredients: 'كولي كالسيفيرول (فيتامين د3) 5000 وحدة دولية، زيت جوز الهند، جيلاتين',
    stock: 150,
    rating: 4.6,
    reviewCount: 89,
    sku: 'VD3-001',
    featured: true
  },
  {
    id: '3',
    title: 'ميزان حرارة رقمي بالأشعة تحت الحمراء',
    price: 159,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'أجهزة طبية',
    description: 'ميزان حرارة سريع ودقيق بدون لمس، مثالي للاستخدام المنزلي والمهني.',
    ingredients: 'جهاز إلكتروني معتمد طبياً',
    stock: 75,
    rating: 4.7,
    reviewCount: 156,
    sku: 'THERM-001',
    featured: false
  },
  {
    id: '4',
    title: 'مجموعة العناية الشخصية الطبية',
    price: 199,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'العناية الشخصية',
    description: 'مجموعة شاملة للعناية الشخصية تشمل المطهرات والكريمات الطبية المعتمدة.',
    ingredients: 'مكونات طبيعية ومعتمدة طبياً',
    stock: 50,
    rating: 4.5,
    reviewCount: 67,
    sku: 'CARE-001',
    featured: true
  },
  {
    id: '5',
    title: 'أوميجا 3 تركيز عالي',
    price: 129,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'مكملات غذائية',
    description: 'كبسولات أوميجا 3 عالية التركيز لدعم صحة القلب والدماغ.',
    ingredients: 'زيت السمك، EPA، DHA، فيتامين E',
    stock: 200,
    rating: 4.9,
    reviewCount: 203,
    sku: 'OMEGA-001',
    featured: false
  },
  {
    id: '6',
    title: 'جهاز السكر المنزلي',
    price: 189,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'أجهزة طبية',
    description: 'جهاز قياس السكر في الدم سهل الاستخدام مع شرائط الاختبار.',
    ingredients: 'جهاز إلكتروني معتمد طبياً',
    stock: 40,
    rating: 4.6,
    reviewCount: 98,
    sku: 'GLU-001',
    featured: true
  },
  {
    id: '7',
    title: 'كريم مرطب طبي للبشرة الحساسة',
    price: 79,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'العناية الشخصية',
    description: 'كريم مرطب خالي من العطور والمواد الكيميائية القاسية، مناسب للبشرة الحساسة.',
    ingredients: 'مكونات طبيعية، خالي من البارابين والكبريتات',
    stock: 120,
    rating: 4.4,
    reviewCount: 75,
    sku: 'CREAM-001',
    featured: false
  },
  {
    id: '8',
    title: 'مالتي فيتامين يومي',
    price: 99,
    image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'مكملات غذائية',
    description: 'مكمل غذائي شامل يحتوي على جميع الفيتامينات والمعادن الأساسية.',
    ingredients: 'فيتامينات A, C, D, E, K، مجمع فيتامين B، معادن أساسية',
    stock: 180,
    rating: 4.7,
    reviewCount: 142,
    sku: 'MULTI-001',
    featured: false
  }
];

export const categories = [
  { id: '1', name: 'أجهزة طبية', count: 45 },
  { id: '2', name: 'مكملات غذائية', count: 127 },
  { id: '3', name: 'العناية الشخصية', count: 89 }
];