export interface Guard {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  profilePicture: string
  rating: number
  location: {
    city: string
    state: string
    zipCode: string
  }
  certifications: string[]
  specialties: string[]
  payRate: number
  availability: Array<{
    start: string
    end: string
  }>
  documents: {
    w9: string
    ein: string
    certifications: string[]
  }
  status: string
  verificationStatus: string
}