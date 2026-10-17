import builderImg from '@/public/images/builder-site.webp';
import plumberImg from '@/public/images/plumber.webp';
import salonImg from '@/public/images/salon.webp';
import dentalImg from '@/public/images/dental.webp';
import realEstateImg from '@/public/images/real-estate.webp';
import legalImg from '@/public/images/legal.webp';
import restaurantImg from '@/public/images/restaurant.webp';
import garageImg from '@/public/images/garage.webp';
import tutorImg from '@/public/images/tutor.webp';
import fitnessImg from '@/public/images/fitness.webp';

export const PHOTOS = {
  builder: { src: builderImg, alt: 'Site manager checking an enquiry on his phone on a building site', pos: '50% 30%' },
  plumber: { src: plumberImg, alt: 'Plumber in a customer kitchen showing a confirmed appointment on his phone', pos: '50% 30%' },
  salon: { src: salonImg, alt: 'Salon counter with a phone showing a new booking message beside styling tools', pos: '50% 60%' },
  dental: { src: dentalImg, alt: 'Dental receptionist at the front desk reading a patient text on her phone', pos: '40% 40%' },
  realEstate: { src: realEstateImg, alt: 'Estate agent with keys outside a red-brick terraced house checking a viewing request', pos: '50% 35%' },
  legal: { src: legalImg, alt: 'Accountant at her desk with a laptop and client folder reading an enquiry on her phone', pos: '60% 40%' },
  restaurant: { src: restaurantImg, alt: 'Restaurant manager at the pass checking a group booking message beside the bookings diary', pos: '50% 45%' },
  garage: { src: garageImg, alt: 'Mechanic in a garage bay reading a text with a car raised on the ramp behind him', pos: '50% 40%' },
  tutor: { src: tutorImg, alt: 'Tutor at a kitchen table with workbooks and a laptop replying to a parent', pos: '40% 45%' },
  fitness: { src: fitnessImg, alt: 'Studio owner checking a class enquiry at the front desk of a reformer studio', pos: '40% 45%' },
} as const;
