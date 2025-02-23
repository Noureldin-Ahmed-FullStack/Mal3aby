export interface SocialPost {
    content?: string
    comments?: Comments[]
    createdBy?: userType
    createdAt?: string
    role?: string
    isNews?: boolean
    Images?: string[]
    _id?: string
}
export interface userType {
    name: string,
    _id: string,
    userPFP: string,
    email: string,
    About?: string
    role: 'user' | 'admin' | 'owner' | 'dev'
    wallet: number
  }
export interface Comments {
    comment: string
    userID: userType
    createdAt: string
}
export interface rating {
    userId: string
    rating: number,
}
export interface response {
    Images: [string]
    tags: [string]
    createdAt: string
    location: string
    address: string
    coverImage: string
    note: string
    ratings: [rating]
    price: number
    ownedBy: string
    ownerPhone?: string
    type: string
    title: string
    _id: string
    hourCount: number
    startTime: '12 pm' | '1 pm' | '2 pm' | '3 pm' | '4 pm' | '5 pm' | '6 pm' | '7 pm' | '8 pm' | '9 pm' | '10 pm' | '11 pm' | '12 am' | '1 am' | '2 am' | '3 am' | '4 am' | '5 am' | '6 am' | '7 am' | '8 am' | '9 am' | '10 am' | '11 am'
};