import type { Guard } from '@/types/guard';

export const mockGuards: Guard[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.5,
    location: { city: 'New York', state: 'NY', zipCode: '10001' },
    certifications: ['CPR Certified', 'First Aid', 'Armed Security'],
    specialties: ['Event Security', 'Corporate Security'],
    payRate: 25,
    availability: [{ start: '2024-02-20T09:00:00', end: '2024-02-20T17:00:00' }],
    documents: { w9: 'w9.pdf', ein: 'ein.pdf', certifications: ['cpr.pdf'] },
    status: 'active',
    verificationStatus: 'verified'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '(555) 234-5678',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4.8,
    location: { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
    certifications: ['CPR Certified', 'Crisis Management'],
    specialties: ['VIP Protection', 'Event Security'],
    payRate: 30,
    availability: [{ start: '2024-02-20T10:00:00', end: '2024-02-20T18:00:00' }],
    documents: { w9: 'w9.pdf', ein: 'ein.pdf', certifications: ['cpr.pdf'] },
    status: 'active',
    verificationStatus: 'verified'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael@example.com',
    phone: '(555) 345-6789',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 4.2,
    location: { city: 'Chicago', state: 'IL', zipCode: '60601' },
    certifications: ['CCTV Operations', 'First Aid'],
    specialties: ['Loss Prevention', 'Corporate Security'],
    payRate: 22,
    availability: [{ start: '2024-02-20T08:00:00', end: '2024-02-20T16:00:00' }],
    documents: { w9: 'w9.pdf', ein: 'ein.pdf', certifications: ['cctv.pdf'] },
    status: 'active',
    verificationStatus: 'pending'
  }
];