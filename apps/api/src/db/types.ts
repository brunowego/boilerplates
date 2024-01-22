export interface BaseEntity {
  id: string
  created_at: Date
  updated_at: Date
}

export interface SoftDeletableEntity extends BaseEntity {
  deleted_at: Date | null
}
