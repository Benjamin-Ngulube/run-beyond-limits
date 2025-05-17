export interface Registration {
  id: string
  created_at: string
  user_id: string
  package_id: number
  distance: string
  status: 'pending' | 'verified' | 'rejected'
  payment_proof: string
  amount: number
}

export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  country: string
  tshirt_size: string
}

export interface Result {
  id: number
  position: number
  registration_id: string
  finish_time: string
  category: string
  year: number
  bib_number: string
  registration?: {
    user: {
      full_name: string
      country: string
    }
  }
}

export interface TeamMember {
  id: number
  name: string
  role: string
  photo_url: string
  bio: string
}

export interface Sponsor {
  id: number
  name: string 
  logo_url: string
  level: 'platinum' | 'gold' | 'silver'
  website: string
}
