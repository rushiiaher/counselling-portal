export interface Counselor {
  id: string
  name: string
  title: string
  specialty: string[]
  bio: string
  avatar: string
  availability: string[]
  rating: number
  reviews: number
  hourlyRate: number
}

export interface Service {
  id: string
  name: string
  description: string
  duration: number // in minutes
  price: number
}

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  counselorId: string
  counselorName: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export const mockCounselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    title: 'Licensed Clinical Psychologist',
    specialty: ['Anxiety', 'Depression', 'Stress Management'],
    bio: 'Over 10 years of experience in cognitive behavioral therapy and holistic wellness.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    rating: 4.8,
    reviews: 127,
    hourlyRate: 120,
  },
  {
    id: '2',
    name: 'James Rodriguez',
    title: 'Licensed Marriage & Family Therapist',
    specialty: ['Relationships', 'Family Counseling', 'Couples Therapy'],
    bio: 'Specializing in improving communication and resolving family conflicts.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    availability: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
    rating: 4.9,
    reviews: 89,
    hourlyRate: 125,
  },
  {
    id: '3',
    name: 'Emily Chen',
    title: 'Career & Life Coach',
    specialty: ['Career Development', 'Life Goals', 'Work-Life Balance'],
    bio: 'Helping individuals achieve their professional and personal aspirations.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
    rating: 4.7,
    reviews: 156,
    hourlyRate: 110,
  },
  {
    id: '4',
    name: 'Michael Brown',
    title: 'Trauma-Informed Therapist',
    specialty: ['PTSD', 'Trauma Recovery', 'Grief Counseling'],
    bio: 'Compassionate approach to healing from traumatic experiences and loss.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    rating: 4.9,
    reviews: 98,
    hourlyRate: 130,
  },
]

export const mockServices: Service[] = [
  { id: '1', name: 'Individual Counseling', description: 'One-on-one therapy sessions', duration: 60, price: 120 },
  { id: '2', name: 'Career Coaching', description: 'Professional development sessions', duration: 60, price: 110 },
  { id: '3', name: 'Family Therapy', description: 'Family counseling sessions', duration: 90, price: 125 },
  { id: '4', name: 'Group Sessions', description: 'Small group therapy', duration: 75, price: 40 },
  { id: '5', name: 'Crisis Support', description: 'Emergency counseling', duration: 30, price: 80 },
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'John Doe',
    counselorId: '1',
    counselorName: 'Dr. Sarah Mitchell',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: 60,
    status: 'scheduled',
  },
  {
    id: '2',
    clientId: '1',
    clientName: 'John Doe',
    counselorId: '2',
    counselorName: 'James Rodriguez',
    date: '2024-01-10',
    time: '2:00 PM',
    duration: 60,
    status: 'completed',
    notes: 'Good session, discussed relationship dynamics',
  },
]
